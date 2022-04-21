package com.rest

import grails.gorm.services.Service

@Service(GeoPosition)
interface GeoPositionService {

    GeoPosition get(Serializable id)

    List<GeoPosition> list(Map args)

    Long count()

    GeoPosition delete(Serializable id)

    GeoPosition save(GeoPosition geoPosition)

}
