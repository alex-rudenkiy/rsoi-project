import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import {AutoRotatingCarousel, Slide} from "material-auto-rotating-carousel";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import yellow from "@material-ui/core/colors/yellow";
import orange from "@material-ui/core/colors/orange";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        alignItems: "center"
    },
    border: {
        borderBottom: "1px solid lightgray",
        width: "100%"
    },
    content: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        //fontWeight: 500,
        fontSize: 18,
        color: "lightgray"
    }
}));

const RegistrationCarousel = ({ children }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    return (
        <div className={classes.container}>
            <AutoRotatingCarousel
                label='Подтвердить'
                open={open}
                onClose={() => setOpen(false)}
                onStart={() => setOpen(false)}
                mobile
                autoplay={true}
                interval={4500}
                style={{ position: 'absolute' }}
            >
                <Slide
                    media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' />}
                    mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                    style={{ backgroundColor: blue[600] }}
                    title='Правила сайта'
                    subtitle='Перед тем как вы приступите к регистрации, пожалуйста ознакомьтеся с правилами и требованиями нашего портала.'
                />
                <Slide
                    media={<img src='http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' />}
                    mediaBackgroundStyle={{ backgroundColor: red[400] }}
                    style={{ backgroundColor: red[600] }}
                    title='Запрещается'
                    subtitle='Просить денежную помощь и т.д.'
                />
                <Slide
                    media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
                    mediaBackgroundStyle={{ backgroundColor: red[400] }}
                    style={{ backgroundColor: red[600] }}
                    title='Запрещается'
                    subtitle='Размещать чужую персональную информацию.'
                />
                <Slide
                    media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
                    mediaBackgroundStyle={{ backgroundColor: orange[400] }}
                    style={{ backgroundColor: orange[600] }}
                    title='Требуется'
                    subtitle='При регистрации загрузить картинку со своим лицом!'
                />
                <Slide
                    media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
                    mediaBackgroundStyle={{ backgroundColor: red[400] }}
                    style={{ backgroundColor: red[600] }}
                    title='Запрещается'
                    subtitle='Оскорблять других пользователей, прямой или косвенной форме, а также использовать нецензурную лексику.'
                />
                <Slide
                    media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
                    mediaBackgroundStyle={{ backgroundColor: green[400] }}
                    style={{ backgroundColor: green[600] }}
                    title='Рекомендуется'
                    subtitle='Для удобства обсуждения общих/объёмных/отвлечённых тем заводить отдельные чаты в мессенджерах.'
                />
                <Slide
                    media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
                    mediaBackgroundStyle={{ backgroundColor: red[400] }}
                    style={{ backgroundColor: red[600] }}
                    title='Запрещается'
                    subtitle='Спамить/добавлять рекламные посты/комментарии/материалы.'
                />
                <Slide
                    media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
                    mediaBackgroundStyle={{ backgroundColor: red[400] }}
                    style={{ backgroundColor: red[600] }}
                    title='Запрещается'
                    subtitle='Выкладывать контент непристойного содержания.'
                />
            </AutoRotatingCarousel>
        </div>
    );
};
export default RegistrationCarousel;
