package com.rest


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Role {
    String name
}