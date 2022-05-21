package com.bmstu.mailservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    @Value("#{environment.EMAIL_SMTP_HOST}")
    private String emailSmtpHost;
    @Value("#{environment.EMAIL_SMTP_PORT}")
    private Integer emailSmtpPort;
    @Value("#{environment.EMAIL_USERNAME}")
    private String emailUsername;
    @Value("#{environment.EMAIL_PASSWORD}")
    private String emailPassword;

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(emailSmtpHost);
        mailSender.setPort(emailSmtpPort != null ? emailSmtpPort : 8082);

        mailSender.setUsername(emailUsername);
        mailSender.setPassword(emailPassword);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }

}