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
class AppealCategoryController {

    AppealCategoryService appealCategoryService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond appealCategoryService.list(params), model:[appealCategoryCount: appealCategoryService.count()]
    }

    def show(Long id) {
        respond appealCategoryService.get(id)
    }

    @Transactional
    def save(AppealCategory appealCategory) {
        if (appealCategory == null) {
            render status: NOT_FOUND
            return
        }
        if (appealCategory.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond appealCategory.errors
            return
        }

        try {
            appealCategoryService.save(appealCategory)
        } catch (ValidationException e) {
            respond appealCategory.errors
            return
        }

        respond appealCategory, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(AppealCategory appealCategory) {
        if (appealCategory == null) {
            render status: NOT_FOUND
            return
        }
        if (appealCategory.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond appealCategory.errors
            return
        }

        try {
            appealCategoryService.save(appealCategory)
        } catch (ValidationException e) {
            respond appealCategory.errors
            return
        }

        respond appealCategory, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || appealCategoryService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
