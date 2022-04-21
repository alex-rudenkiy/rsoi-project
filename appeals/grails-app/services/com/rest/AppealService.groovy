package com.rest

import grails.gorm.services.Service

@Service(Appeal)
interface AppealService {

    Appeal get(Serializable id)

    List<Appeal> list(Map args)

    Long count()

    Appeal delete(Serializable id)

    Appeal save(Appeal appeal)

}
