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
class CommentsController {

    CommentsService commentsService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond commentsService.list(params), model:[commentsCount: commentsService.count()]
    }

    def show(Long id) {
        respond commentsService.get(id)
    }

    @Transactional
    def save(Comments comments) {
        if (comments == null) {
            render status: NOT_FOUND
            return
        }
        if (comments.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond comments.errors
            return
        }

        try {
            commentsService.save(comments)
        } catch (ValidationException e) {
            respond comments.errors
            return
        }

        respond comments, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Comments comments) {
        if (comments == null) {
            render status: NOT_FOUND
            return
        }
        if (comments.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond comments.errors
            return
        }

        try {
            commentsService.save(comments)
        } catch (ValidationException e) {
            respond comments.errors
            return
        }

        respond comments, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || commentsService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
