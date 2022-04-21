package com.rest

import grails.gorm.services.Service

@Service(Users)
interface UsersService {

    Users get(Serializable id)

    List<Users> list(Map args)

    Long count()

    Users delete(Serializable id)

    Users save(Users users)

}
