package com.rest

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import org.grails.datastore.mapping.core.Datastore
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Specification

@Integration
@Rollback
class AppealServiceSpec extends Specification {

    AppealService appealService
    @Autowired Datastore datastore

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Appeal(...).save(flush: true, failOnError: true)
        //new Appeal(...).save(flush: true, failOnError: true)
        //Appeal appeal = new Appeal(...).save(flush: true, failOnError: true)
        //new Appeal(...).save(flush: true, failOnError: true)
        //new Appeal(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //appeal.id
    }

    void cleanup() {
        assert false, "TODO: Provide a cleanup implementation if using MongoDB"
    }

    void "test get"() {
        setupData()

        expect:
        appealService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Appeal> appealList = appealService.list(max: 2, offset: 2)

        then:
        appealList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        appealService.count() == 5
    }

    void "test delete"() {
        Long appealId = setupData()

        expect:
        appealService.count() == 5

        when:
        appealService.delete(appealId)
        datastore.currentSession.flush()

        then:
        appealService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Appeal appeal = new Appeal()
        appealService.save(appeal)

        then:
        appeal.id != null
    }
}
