package com.rest

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import org.grails.datastore.mapping.core.Datastore
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Specification

@Integration
@Rollback
class RoleServiceSpec extends Specification {

    RoleService roleService
    @Autowired Datastore datastore

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Role(...).save(flush: true, failOnError: true)
        //new Role(...).save(flush: true, failOnError: true)
        //Role role = new Role(...).save(flush: true, failOnError: true)
        //new Role(...).save(flush: true, failOnError: true)
        //new Role(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //role.id
    }

    void cleanup() {
        assert false, "TODO: Provide a cleanup implementation if using MongoDB"
    }

    void "test get"() {
        setupData()

        expect:
        roleService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Role> roleList = roleService.list(max: 2, offset: 2)

        then:
        roleList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        roleService.count() == 5
    }

    void "test delete"() {
        Long roleId = setupData()

        expect:
        roleService.count() == 5

        when:
        roleService.delete(roleId)
        datastore.currentSession.flush()

        then:
        roleService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Role role = new Role()
        roleService.save(role)

        then:
        role.id != null
    }
}
