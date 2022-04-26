CREATE USER docker;
CREATE DATABASE database_appeal;
GRANT ALL PRIVILEGES ON DATABASE database_appeal TO docker;

CREATE DATABASE database_users;
GRANT ALL PRIVILEGES ON DATABASE database_users TO docker;

-- INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (1, 0, 'Граффити', './resources/sample_graffiti.jpg', 'Вандализм');
-- INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (2, 0, 'Не убирается мусор в контейнере', './resources/sample_trashGarbage.jpg', 'Недостаток');
-- INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (3, 0, 'Нелегальная мусорка', './resources/sample_trash.jpg', 'Нарушение закона');
-- INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (4, 0, 'Ямы на дороге', './resources/sample_roadHole.jpg', 'ГГ');
-- INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (5, 0, 'Автомобиль припоркован на тратуаре', './resources/sample_car.jpg', 'Нарушение закона');
-- INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (6, 0, 'Поломана лавочка', './resources/sample_benchCrash.jpg', 'Вандализм');
-- INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (7, 0, 'Грязный подъезд', './resources/sample_dirtyStaircase.jpg', 'Вандализм');
-- INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (8, 0, 'Грязный лифт', './resources/sample_Dirtyelevator.jpg', 'Вандализм');

