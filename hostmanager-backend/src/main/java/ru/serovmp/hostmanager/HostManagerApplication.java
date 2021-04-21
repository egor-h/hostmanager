package ru.serovmp.hostmanager;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.security.SecuritySchemes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.entity.Role;
import ru.serovmp.hostmanager.entity.User;
import ru.serovmp.hostmanager.repository.HostRepository;
import ru.serovmp.hostmanager.repository.RoleRepository;
import ru.serovmp.hostmanager.repository.UserRepository;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@SecurityScheme(name = "bearer-key",
		type = SecuritySchemeType.HTTP,
		in = SecuritySchemeIn.HEADER,
		scheme = "bearer",
		bearerFormat = "JWT")
@SpringBootApplication
@EnableConfigurationProperties
public class HostManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(HostManagerApplication.class, args);
	}

	@Autowired
    UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
    HostRepository hostRepository;

	@Autowired
    PasswordEncoder passwordEncoder;

	@PostConstruct
    void checks() {
	    var adminRole = roleRepository.findRoleByName("ROLE_ADMIN")
                .orElseGet(() -> roleRepository.save(new Role(0, "ROLE_ADMIN", "Admin role", new HashSet<>())));

	    var adminAcc = userRepository.findByLogin("admin").orElseGet(() -> {
            return userRepository.save(new User(0, "admin", "admin admin", "admin@ad.min", passwordEncoder.encode("admin"), true, new HashSet<>(),   new HashSet<>(), new HashSet<>()));
        });

	    adminAcc.setRoles(Set.of(adminRole));
	    userRepository.save(adminAcc);

	    // check root node
        var rootNode = hostRepository.findByName("root")
                .orElseGet(() -> hostRepository.save(Host.builder()
                        .name("root")
                        .address(" ")
                        .createdAt(null)
                        .enabled(true)
                        .isDir(true)
                        .notes(Set.of())
                        .protocols(Set.of())
                        .tags(Set.of())
                        .parent(null)
                        .build()));
    }

}
