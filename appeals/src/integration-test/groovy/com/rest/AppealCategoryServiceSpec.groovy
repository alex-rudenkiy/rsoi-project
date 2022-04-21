package com.rest

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import org.grails.datastore.mapping.core.Datastore
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Specification

@Integration
@Rollback
class AppealCategoryServiceSpec extends Specification {

    AppealCategoryService appealCategoryService
    @Autowired Datastore datastore

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new AppealCategory(...).save(flush: true, failOnError: true)
        //new AppealCategory(...).save(flush: true, failOnError: true)
        //AppealCategory appealCategory = new AppealCategory(...).save(flush: true, failOnError: true)
        //new AppealCategory(...).save(flush: true, failOnError: true)
        //new AppealCategory(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //appealCategory.id
    }

    void cleanup() {
        assert false, "TODO: Provide a cleanup implementation if using MongoDB"
    }

    void "test get"() {
        setupData()

        expect:
        appealCategoryService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<AppealCategory> appealCategoryList = appealCategoryService.list(max: 2, offset: 2)

        then:
        appealCategoryList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        appealCategoryService.count() == 5
    }

    void "test delete"() {
        Long appealCategoryId = setupData()

        expect:
        appealCategoryService.count() == 5

        when:
        appealCategoryService.delete(appealCategoryId)
        datastore.currentSession.flush()

        then:
        appealCategoryService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        AppealCategory appealCategory = new AppealCategory()
        appealCategoryService.save(appealCategory)

        then:
        appealCategory.id != null
    }
}
