package ru.serovmp.hostmanager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.serovmp.hostmanager.entity.User;
import ru.serovmp.hostmanager.repository.UserRepository;

import javax.annotation.PostConstruct;

@SpringBootApplication
public class HostManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(HostManagerApplication.class, args);
	}

	@Autowired
    UserRepository userRepository;

	@Autowired
    PasswordEncoder passwordEncoder;

	@PostConstruct
    void checks() {
	    if (userRepository.findAll().size() == 0) {
	        userRepository.save(new User(0, "admin", "admin admin", "admin@ad.min", passwordEncoder.encode("admin"), "ROLE_USER"));
        }
    }

}
