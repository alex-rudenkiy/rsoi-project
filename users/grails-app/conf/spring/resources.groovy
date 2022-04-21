package spring
import grails.rest.render.xml.*
import grails.rest.render.json.JsonRenderer
import com.rest.Users

// Place your Spring DSL code here
beans = {
    usersRenderer(JsonRenderer, Users) {
//        excludes = ['id']
    }
}