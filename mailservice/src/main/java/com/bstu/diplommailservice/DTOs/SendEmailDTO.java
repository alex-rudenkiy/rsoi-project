package com.bstu.diplommailservice.DTOs;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class SendEmailDTO {
    public String to;
    public String subject;
    public String content;
    public List<String> attachments;
}
