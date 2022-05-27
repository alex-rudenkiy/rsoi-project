package com.bmstu.mailservice;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.net.URL;

@Controller
public class AttachmentEmailExampleController {

    @Autowired
    public JavaMailSender emailSender;

    @ResponseBody
    @RequestMapping("/sendAttachmentEmail")
    public String sendAttachmentEmail(@RequestBody SendEmailDTO d) throws MessagingException, IOException {

        MimeMessage message = emailSender.createMimeMessage();

        boolean multipart = true;

        MimeMessageHelper helper = new MimeMessageHelper(message, multipart);

        helper.setTo(d.getTo());
        helper.setSubject(d.getSubject());
        helper.setText(d.getContent());

        int i = 0;
        for (String mf : d.getAttachments()) {
            String[] attachFilename = mf.split("[.]");

            //InputStream b = new ByteArrayInputStream(IOUtils.toByteArray(new URL(mf).openStream()));
            ByteArrayResource br = new ByteArrayResource(IOUtils.toByteArray(new URL(mf).openStream()));
            helper.addAttachment(String.format("Attachment_%d.%s", i++, attachFilename[attachFilename.length - 1]), br);
        }

        emailSender.send(message);

        return "Email Sent!";
    }
}
