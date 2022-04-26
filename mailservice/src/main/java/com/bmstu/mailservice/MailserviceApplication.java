package com.bmstu.mailservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MailserviceApplication {
    final ReceiveMail rm;

    public MailserviceApplication(ReceiveMail rm) {
        this.rm = rm;
    }

/*    @Bean
    public Map<String, String> config() {
        final Map<String, String> myMap = new HashMap<>();
        myMap.put("pophost", "a");
        myMap.put("username", "a");
        myMap.put("password", "a");
        myMap.put("pophost", "a");
        myMap.put("username", "a");
        myMap.put("password", "a");

        return myMap;
    }*/


    @Bean
    void init() {
        String host = "pop.gmail.com";
        int port=995;
        String mailStoreType = "pop3";
        String username = "alexrudenkiy2014@gmail.com";
        String password = ":)";

        rm.receiveEmail(host, port, mailStoreType, username, password);
    }
    public static void main(String[] args) {
        SpringApplication.run(MailserviceApplication.class, args);
    }

}
