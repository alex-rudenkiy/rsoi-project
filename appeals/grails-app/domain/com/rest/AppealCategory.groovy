package com.rest


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class AppealCategory {
    String name;
    String description;
    String imageUrl; //categoryPreview
}