package com.bmstu.mailservice.DTOs;

import lombok.Data;

@Data
public class SendSimpleEmailDTO {
    public String to;
    public String subject;
    public String content;
}
