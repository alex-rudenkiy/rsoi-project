package appeals

import com.rest.AppealCategory

import java.sql.Timestamp

class BootStrap {

    def init = { servletContext ->
        (new AppealCategory(
                name: "Граффити",
                description: "Вандализм",
                imageUrl: "./resources/sample_graffiti.jpg"
        )).save();

        (new AppealCategory(
                name: "Не убирается мусор в контейнере",
                description: "Недостаток",
                imageUrl: "./resources/sample_trashGarbage.jpg"
        )).save();

        (new AppealCategory(
                name: "Нелегальная мусорка",
                description: "Нарушение закона",
                imageUrl: "./resources/sample_trash.jpg"
        )).save();

        (new AppealCategory(
                name: "Ямы на дороге",
                description: "ГГ",
                imageUrl: "./resources/sample_roadHole.jpg"
        )).save();

        (new AppealCategory(
                name: "Автомобиль припоркован на тратуаре",
                description: "Нарушение закона",
                imageUrl: "./resources/sample_car.jpg"
        )).save();

        (new AppealCategory(
                name: "Поломана лавочка",
                description: "Вандализм",
                imageUrl: "./resources/sample_benchCrash.jpg"
        )).save();

        (new AppealCategory(
                name: "Грязный подъезд",
                description: "Вандализм",
                imageUrl: "./resources/sample_dirtyStaircase.jpg"
        )).save();

        (new AppealCategory(
                name: "Грязный лифт",
                description: "Вандализм",
                imageUrl: "./resources/sample_Dirtyelevator.jpg"
        )).save();

    }
    def destroy = {
    }
}
