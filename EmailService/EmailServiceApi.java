package com.diplom.backend.EmailService;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.client.fluent.Request;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.http.HttpResponse;

@Component
public class EmailServiceApi {
    static String address = "http://localhost:8091/sendAttachmentEmail";

    public EmailServiceApi EmailServiceApi(String address){
        EmailServiceApi.address = address;
        return this;
    }

    public EmailServiceApi EmailServiceApi(){
        return this;
    }

    public void sendAttachmentMessage(Message m) throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        Request.Post(address)
                .bodyString(gson.toJson(m), ContentType.APPLICATION_JSON)
                .execute()
                .returnContent();
    }
}
