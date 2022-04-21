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
class AppealController {

    AppealService appealService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond appealService.list(params), model:[appealCount: appealService.count()]
    }

    def show(Long id) {
        respond appealService.get(id)
    }

    @Transactional
    def save(Appeal appeal) {
        if (appeal == null) {
            render status: NOT_FOUND
            return
        }
        if (appeal.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond appeal.errors
            return
        }

        try {
            appealService.save(appeal)
        } catch (ValidationException e) {
            respond appeal.errors
            return
        }

        respond appeal, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Appeal appeal) {
        if (appeal == null) {
            render status: NOT_FOUND
            return
        }
        if (appeal.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond appeal.errors
            return
        }

        try {
            appealService.save(appeal)
        } catch (ValidationException e) {
            respond appeal.errors
            return
        }

        respond appeal, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || appealService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
