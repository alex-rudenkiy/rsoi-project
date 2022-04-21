package com.diplom.backend.EmailService;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class Message {
    String to;
    String subject;
    String content;
    List<String> attachments;
}
