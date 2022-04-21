package com.rest


import grails.rest.*
import org.apache.commons.codec.digest.DigestUtils

import java.sql.Timestamp;

@Resource(readOnly = false, formats = ['json', 'xml'])
class Users {
    static belongsTo = [role: Role]

    java.sql.Timestamp created_at = new Timestamp(System.currentTimeMillis());

    Boolean enabled = true;

    Boolean confirmed = false;

//    private Boolean temporal = false;

    Role role;

    String login;

    String surname;

    String name;

    String patronymic;

    String description="";

    String mobilenumber;

    String passwordHash;

    String email;

    static constraints = {
//        email email: true, blank: false, unique: true
//        login(validator: {
//            return !Users.findByLoginIlike(it)
//        })
    }

//    static namedQueries = {
//        customSearch { p ->
//            if (p?.login) eq('login', p.login)
//            if (p?.passwordHash) eq('passwordHash', p.passwordHash)
//            if (p?.email) eq('email', p.email)
//        }
//    }



//    private String avatarFileFakeUrl;

//    private Set<SocialLinkDto> socialLink;

//    def afterInsert = {
//        username = this.username;
//        surname = this.username;
//        passwordhash = DigestUtils.md5Hex(this.passwordhash).toUpperCase();
//    }

}