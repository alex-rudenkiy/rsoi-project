package com.bstu.diplommailservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.integration.mail.MailReceiver;
import org.springframework.integration.mail.MailSendingMessageHandler;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class DiplommailserviceApplication {
    final ReceiveMail rm;

    public DiplommailserviceApplication(ReceiveMail rm) {
        this.rm = rm;
    }

    @Bean
    public Map<String, String> config() {
        final Map<String, String> myMap = new HashMap<>();
        myMap.put("pophost", "a");
        myMap.put("username", "a");
        myMap.put("password", "a");
        myMap.put("pophost", "a");
        myMap.put("username", "a");
        myMap.put("password", "a");

        return myMap;
    }


    @Bean
    void init() {
        String host = "pop.gmail.com";
        int port=995;
        String mailStoreType = "pop3";
        String username = "alexrudenkiy2014@gmail.com";
        String password = "GCslCLubiMQkoHv";

        rm.receiveEmail(host, port, mailStoreType, username, password);
    }
    public static void main(String[] args) {
        SpringApplication.run(DiplommailserviceApplication.class, args);
    }

}
