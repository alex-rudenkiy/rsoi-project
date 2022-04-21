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
class UsersController {

    UsersService usersService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond usersService.list(params), model:[usersCount: usersService.count()]
    }

    def show(Long id) {
        respond usersService.get(id)
    }

    @Transactional
    def save(Users users) {
        if (users == null) {
            render status: NOT_FOUND
            return
        }
        if (users.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond users.errors
            return
        }

        try {
            usersService.save(users)
        } catch (ValidationException e) {
            respond users.errors
            return
        }

        respond users, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Users users) {
        if (users == null) {
            render status: NOT_FOUND
            return
        }
        if (users.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond users.errors
            return
        }

        try {
            usersService.save(users)
        } catch (ValidationException e) {
            respond users.errors
            return
        }

        respond users, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || usersService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }


}
