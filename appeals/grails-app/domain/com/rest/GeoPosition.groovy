package com.rest


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class GeoPosition {
    String fullname;

    double lat;

    double lon;
}