package com.bmstu.mailservice;

import com.google.common.collect.Sets;
import com.sun.mail.pop3.POP3Store;
import org.apache.tomcat.util.threads.TaskThread;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.mail.*;
import java.io.IOException;
import java.util.*;

@Component
public class ReceiveMail {
    public void receiveEmail(String pop3Host, int port, String storeType, String user, String password) {
        try {
            Properties properties = new Properties();
            properties.put("mail.pop3.ssl.enable", "true");
            Session emailSession = Session.getDefaultInstance(properties);

            POP3Store emailStore = (POP3Store) emailSession.getStore(storeType);
            emailStore.connect(pop3Host, port, user, password);


            Runnable r = () -> {
                int i = 0;
                Set<Message> oldMessages = null;

                Folder emailFolder = null;
                try {
                    emailFolder = emailStore.getFolder("INBOX");

                } catch (MessagingException e) {
                    e.printStackTrace();
                }
                try {
                    emailFolder.open(Folder.READ_ONLY);
                } catch (MessagingException e) {
                    e.printStackTrace();
                }

                try {
                    oldMessages = new HashSet<>(Arrays.asList(emailFolder.getMessages()));
                } catch (MessagingException e) {
                    e.printStackTrace();
                }

                while (true) {
                    try {
                        emailFolder = emailStore.getFolder("INBOX");
                    } catch (MessagingException e) {
                        e.printStackTrace();
                    }
                    try {
                        emailFolder.open(Folder.READ_ONLY);
                    } catch (MessagingException e) {
                        e.printStackTrace();
                    }

                    try {
                        /*try {
                            Thread.sleep(5000);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }*/

                        Set<Message> newMessages = new HashSet<>(Arrays.asList(emailFolder.getMessages()));
                        Set<Message> deltaMessages = Sets.difference(newMessages, oldMessages);
                        oldMessages = newMessages;
                        System.out.println("deltaMessages.size = " + deltaMessages.size() + " " + ((Message) (newMessages.toArray()[0])).getSubject());

                        /*Object[] al = newMessages.toArray();
                        for (int j = 0; j < al.length; j++) {
                            Message message = (Message) al[j];
                            System.out.println("---------------------------------");
                            System.out.println("Email Number " + (j + 1));
                            System.out.println("Subject: " + message.getSubject());
                            System.out.println("From: " + message.getFrom()[0]);
                            System.out.println("Text: " + message.getContent().toString());
                        }*/

                    } catch (MessagingException e) {
                        e.printStackTrace();
                    }


                    System.out.println("hi " + i++);

                }
            };
            //r.run();


            emailStore.close();

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }


}
