package ru.serovmp.hostmanager.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtils {
    @Value("${security.jwt.secret}")
    private String secret;
    @Value("${security.jwt.ttl}")
    private long ttl;

    private UserDetailsService userDetailsService;

    @Autowired
    public JwtUtils(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostConstruct
    void init() {
        this.secret = Base64.getEncoder().encodeToString(secret.getBytes());
    }

    public String createToken(UserDetails user) {
        Date now = new Date();
        Claims claims = Jwts.claims().setSubject(user.getUsername());
        claims.put("roles", user.getAuthorities().stream().map(a -> a.getAuthority()));

        return Jwts.builder()
                .setIssuedAt(now)
                .setClaims(claims)
                .setExpiration(new Date(now.getTime() + ttl))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public String getUsername(String token) {
        Jws<Claims> claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
        return claims.getBody().getSubject();
    }

    public Authentication getAuthentication(String token) {
        UserDetails user = userDetailsService.loadUserByUsername(getUsername(token));
        return new UsernamePasswordAuthenticationToken(user, "", user.getAuthorities());
    }

    public boolean isValidToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            Date expiration = claims.getBody().getExpiration();
            if (new Date().after(expiration)) {
                return false;
            }

            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
