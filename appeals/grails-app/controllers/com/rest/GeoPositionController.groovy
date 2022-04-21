package com.rest

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class GeoPositionController {

    GeoPositionService geoPositionService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond geoPositionService.list(params), model:[geoPositionCount: geoPositionService.count()]
    }

    def show(Long id) {
        respond geoPositionService.get(id)
    }

    @Transactional
    def save(GeoPosition geoPosition) {
        if (geoPosition == null) {
            render status: NOT_FOUND
            return
        }
        if (geoPosition.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond geoPosition.errors
            return
        }

        try {
            geoPositionService.save(geoPosition)
        } catch (ValidationException e) {
            respond geoPosition.errors
            return
        }

        respond geoPosition, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(GeoPosition geoPosition) {
        if (geoPosition == null) {
            render status: NOT_FOUND
            return
        }
        if (geoPosition.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond geoPosition.errors
            return
        }

        try {
            geoPositionService.save(geoPosition)
        } catch (ValidationException e) {
            respond geoPosition.errors
            return
        }

        respond geoPosition, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || geoPositionService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
