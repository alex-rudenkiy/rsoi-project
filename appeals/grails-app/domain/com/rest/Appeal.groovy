package com.rest


import grails.rest.*

import java.sql.Timestamp

@Resource(readOnly = false, formats = ['json', 'xml'])
class Appeal {
    Date createdAt = new Timestamp(System.currentTimeMillis());

    static hasMany = [categoris: AppealCategory, comments: Comments]

//    static mapping = {
//        categoris joinTable: [name: 'appeal_categories']
//    }

    String ownerToken

    String status;

    String title;

    String description;

    GeoPosition geoPosition;

    List<String> attachments;

    long authorid

    static constraints = {
        categoris nullable: false
    }

}