package users

import com.rest.Role
import com.rest.Users

import java.sql.Timestamp

class BootStrap {
    def init = { servletContext ->
        (new Role(name: 'user')).save();
        (new Role(name: 'moderator')).save();
        (new Role(name: 'gov')).save();

        def a = (new Users(
                created_at: new Timestamp(System.currentTimeMillis()),
                enabled: true,
                confirmed: true,
                role: Role.findById(1),
                login: "rudenkiy",
                surname: "Руденький",
                name: "Олег",
                patronymic: "Александрович",
                mobilenumber: 88005132535,
                passwordHash: "qwerqweerty",
                email: "rudenkiy@yandex.ru"
        )).save();

        def b = (new Users(
                created_at: new Timestamp(System.currentTimeMillis()),
                enabled: true,
                confirmed: true,
                role: Role.findById(1),
                login: "alex-rudenkiy",
                surname: "Руденький",
                name: "Александр",
                patronymic: "Олегович",
                mobilenumber: 88005553535,
                passwordHash: "qwerty",
                email: "alex-rudenkiy@mail.ru"
        )).save();
//        grails.converters.JSON.registerObjectMarshaller( Users) {
//            def output = [:]
//            output['id'] = it.id
//
//            return output;
//        }


    }
    def destroy = {
    }
}
