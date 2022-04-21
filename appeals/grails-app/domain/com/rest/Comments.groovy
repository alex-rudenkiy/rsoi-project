package com.rest

import java.sql.Timestamp

class Comments {

    long createdBy;

    String enabled = true;

    Date createdAt = new Timestamp(System.currentTimeMillis());

    String content = "";

    static belongsTo = [appeal: Appeal]

    static constraints = {
        createdBy nullable: false
    }
}
