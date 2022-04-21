package com.rest

import grails.gorm.services.Service

@Service(Comments)
interface CommentsService {

    Comments get(Serializable id)

    List<Comments> list(Map args)

    Long count()

    Comments delete(Serializable id)

    Comments save(Comments comments)

}
