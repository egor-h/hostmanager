package ru.serovmp.hostmanager.security;


import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

public class JwtTokenFilter extends OncePerRequestFilter {

    private JwtUtils jwtUtils;

    public JwtTokenFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        if (CorsUtils.isPreFlightRequest(httpServletRequest))  {
            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
        } else {
            extractToken(httpServletRequest)
                    .filter(jwtUtils::isValidToken)
                    .map(jwtUtils::getAuthentication)
                    .ifPresent(SecurityContextHolder.getContext()::setAuthentication);
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private Optional<String> extractToken(HttpServletRequest httpServletRequest) {
        String headerValue = httpServletRequest.getHeader("Authorization");
        if (headerValue == null) {
            return Optional.empty();
        }
        return Optional.ofNullable(headerValue.substring(7));
    }
}

