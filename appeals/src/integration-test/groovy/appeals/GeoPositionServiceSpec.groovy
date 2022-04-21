package appeals

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import org.grails.datastore.mapping.core.Datastore
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Specification

@Integration
@Rollback
class GeoPositionServiceSpec extends Specification {

    GeoPositionService geoPositionService
    @Autowired Datastore datastore

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new GeoPosition(...).save(flush: true, failOnError: true)
        //new GeoPosition(...).save(flush: true, failOnError: true)
        //GeoPosition geoPosition = new GeoPosition(...).save(flush: true, failOnError: true)
        //new GeoPosition(...).save(flush: true, failOnError: true)
        //new GeoPosition(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //geoPosition.id
    }

    void cleanup() {
        assert false, "TODO: Provide a cleanup implementation if using MongoDB"
    }

    void "test get"() {
        setupData()

        expect:
        geoPositionService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<GeoPosition> geoPositionList = geoPositionService.list(max: 2, offset: 2)

        then:
        geoPositionList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        geoPositionService.count() == 5
    }

    void "test delete"() {
        Long geoPositionId = setupData()

        expect:
        geoPositionService.count() == 5

        when:
        geoPositionService.delete(geoPositionId)
        datastore.currentSession.flush()

        then:
        geoPositionService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        GeoPosition geoPosition = new GeoPosition()
        geoPositionService.save(geoPosition)

        then:
        geoPosition.id != null
    }
}
