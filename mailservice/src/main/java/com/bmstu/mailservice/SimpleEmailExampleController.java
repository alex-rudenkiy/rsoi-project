package com.bmstu.mailservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SimpleEmailExampleController {

    @Autowired
    public JavaMailSender emailSender;


    @ResponseBody
    @RequestMapping("/sendSimpleEmail")
    public String sendSimpleEmail(@RequestBody SendEmailDTO d) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(d.getTo());
        message.setSubject(d.getSubject());
        message.setText(d.getContent());

        this.emailSender.send(message);

        return "Email Sent!";
    }


}