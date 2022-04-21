package com.rest

import grails.gorm.services.Service

@Service(AppealCategory)
interface AppealCategoryService {

    AppealCategory get(Serializable id)

    List<AppealCategory> list(Map args)

    Long count()

    AppealCategory delete(Serializable id)

    AppealCategory save(AppealCategory appealCategory)

}
