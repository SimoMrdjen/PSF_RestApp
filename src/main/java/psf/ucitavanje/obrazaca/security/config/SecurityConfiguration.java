package psf.ucitavanje.obrazaca.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static psf.ucitavanje.obrazaca.security.user.Role.ADMIN;
import static psf.ucitavanje.obrazaca.security.user.Role.USER;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;
    private final CorsConfig corsConfig;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .cors()
                .and()
                .authorizeHttpRequests()
                .requestMatchers(
                        "/api/v1/auth/**",
                        "/login",
                        "/v2/api-docs",
                        "/v3/api-docs",
                        "/v3/api-docs/**",
                        "/swagger-resources",
                        "/swagger-resources/**",
                        "/configuration/ui",
                        "/configuration/security",
                        "/swagger-ui/**",
                        "/webjars/**",
                        "/swagger-ui.html",
                        "/", "/static/**", "/index.html", "/favicon.ico",
                        "/manifest.json", "/APV.png", "/logo192.png"
                )
                .permitAll()

                .requestMatchers("/api/upload/**").hasAnyRole(ADMIN.name(), USER.name())
                .requestMatchers("/api/obrazac_zb/**").hasAnyRole(ADMIN.name(), USER.name())
                .requestMatchers("/api/obrazac_io/**").hasAnyRole(ADMIN.name(), USER.name())
                .requestMatchers("/api/zakljucni_list/**").hasAnyRole(ADMIN.name(), USER.name())
                .requestMatchers("/api/v1/users/**").hasRole(ADMIN.name())
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
//                .formLogin()
//                .loginPage("/login") // Specify the URL of your login page
//                .permitAll() // Allow access to the login page for everyone
//                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(corsConfig.corsFilter(), UsernamePasswordAuthenticationFilter.class) // Add this line
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout()
                .logoutUrl("/api/v1/auth/logout")
                .addLogoutHandler(logoutHandler)
                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
        ;
        return http.build();
    }
}
