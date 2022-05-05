import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faVk, faTelegram, faDiscord} from '@fortawesome/free-brands-svg-icons'


export const Footer = () => {
    return (<footer className="footer">
        <div className="footer-left col-md-2 col-sm-6">
            <h2> IU7Studio </h2>
            <div className="icons">

                <a href="#"><i><FontAwesomeIcon icon={faVk}/></i></a>
                <a href="#"><i><FontAwesomeIcon icon={faTelegram}/></i></a>
                <a href="#"><i><FontAwesomeIcon icon={faDiscord}/></i></a>

            </div>
        </div>
{/*
        <div className="footer-center col-md-3 col-sm-6">
            <h5>Контактные данные</h5>
            <div>
                <i><FontAwesomeIcon icon={faMapMarker}/></i>
                <p><span>г. Москва, ул. Бауманская, д. 46</span></p>
            </div>
            <div>
                <i><FontAwesomeIcon icon={faPhone}/></i>
                <p> (+7) 800 555 35 35</p>
            </div>
            <div>
                <i><FontAwesomeIcon icon={faEnvelope}/></i>
                <p><a href="#"> alex-rudenkiy@bmstu.edu</a></p>
            </div>
        </div>
        <div className="footer-center col-md-3 col-sm-6">
            <h5>Поддержка</h5>
            <p className="menu">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Партнерские программы</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Видеоинструкции</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Сообщить об ошибке</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Трудоустройство</a>
                    </li>
                </ul>

            </p>
        </div>
*/}
        {/*<p className="name mt-5"> Copyright &copy; ИУ7, 2022. Пользовательское соглашение Соглашение об
            обработке персональных данных. 12+</p>*/}
    </footer>)
}