package ru.serovmp.hostmanager.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@Component
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/v1/welcome/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*");

        registry.addMapping("/api/v1/hosts/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*");

        registry.addMapping("/api/v1/tags/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*");

        registry.addMapping("/api/v1/notes/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*");

        registry.addMapping("/api/v1/protocols/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*");

        registry.addMapping("/api/v1/search/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*");

        registry.addMapping("/api/v1/stats/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*");

        registry.addMapping("/auth/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*");

        registry.addMapping("/info/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*");
    }
}
