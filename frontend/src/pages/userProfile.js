import React, {useEffect, useState} from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import FormControl from "@material-ui/core/FormControl";
import notfounded from "../resources/urban-681.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faTelegram, faVk,} from "@fortawesome/free-brands-svg-icons";
import {faAt, faMapMarker, faPhone} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import Avatar from "@material-ui/core/Avatar";
import ViewsIcon from "@material-ui/icons/Visibility";
import MessageIcon from "@material-ui/icons/Message";
import Pagination from "@material-ui/lab/Pagination";
import HeaderNav from "../components/headerNav";
import useBackendApi from "../logic/BackendApiHook";
import {useHistory, useParams} from "react-router-dom";
import {stringAvatar} from "../utils";
import * as semantic from 'semantic-ui-react'

function UserProfilePage() {
    const {
        getUserInfo,
        getOrdersByOwnerId,
        getCountOrdersByOwnerId,
        getUserIdByToken
    } = useBackendApi();
    const [userInfo, setUserInfo] = useState();
    const [userOrdersView, setUserOrdersView] = useState(null);

    const [pagesCount, setPagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [countOrders, setCountOrders] = useState(0);
    const pageSize = 2;
    const { userId = -1 } = useParams();
    console.log("userId", userId);
    const history = useHistory();

    useEffect(() => {
        getUserInfo(userId === -1 ? undefined : userId).then((e) => {
            setUserInfo(e);
        });

        getOrdersByOwnerId(currentPage, pageSize, userId).then((orders) => {
            console.log("getOrdersByOwnerId ====> ", orders);
            setUserOrdersView(
                orders.map((e) => (
                    <button
                        type="button"
                        className="list-group-item list-group-item-action"
                    >
                        <Row style={{ marginLeft: "1em" }}>
                            <Image
                                style={{ maxWidth: "4em", maxHeight: "4em" }}
                                src={
                                    e.attachments &&
                                    `http:\\\\localhost:8888\\file\\preview\\${e.attachments[0]}`
                                }
                                fluid
                            />
                            <Col>
                                <p className="text-left" style={{ marginBottom: "auto" }}>
                                    {e.title}
                                </p>
                                <p
                                    className="text-left"
                                    style={{ color: "Silver", fontSize: "smaller" }}
                                >
                                    <ViewsIcon fontSize={"small"} />
                                    {e.views && e.views.length}&nbsp;
                                    <MessageIcon fontSize={"small"} />
                                    {e.comments && e.comments.length}
                                </p>
                            </Col>
                        </Row>
                    </button>
                ))
            );
        });

        /*const u = (getUserInfo(userId, false)).data;
            console.log('u=',u);*/
    }, []);

    useEffect(async () => {
        console.log("let's go");
        //getUserInfo(undefined, true).then(e=>console.log("gg", e));
        try {
            const c = await getCountOrdersByOwnerId();
            setPagesCount(Math.ceil(c / pageSize));
            setCountOrders(c);
        } catch (e) {}
    }, [currentPage]);

    return (
        <div className="App">
            <HeaderNav />

            <section className="pb-5 mt-4">
                <div className="container pl-sm-5 mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
                                            <h5 style={{ color: "#276dd5" }}>{countOrders}</h5>
                                            <p style={{ lineHeight: "1em", color: "#6c6c6c" }}>
                                                Выявленно недостатков
                                            </p>
                                        </div>
                                        <div className="col-sm">
                                            <h5 style={{ color: "#276dd5" }}>{0}</h5>
                                            <p style={{ lineHeight: "1em", color: "#6c6c6c" }}>
                                                Устраненил недостатков
                                            </p>
                                        </div>
                                        <div className="col-sm">
                                            <h5 style={{ color: "#276dd5" }}>{84}</h5>
                                            <p style={{ lineHeight: "1em", color: "#6c6c6c" }}>
                                                Место в общем рейтинге
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <Avatar
                                    {...stringAvatar(userInfo ? userInfo.login : ". .")}
                                    style={{ height: "4em", width: "4em", margin: "auto" }}
                                />
                            </div>
                            <div className="col text-left">
                                <h4 className={"my-0"} style={{ color: "#6c6c6c" }}>{`${
                                    userInfo && userInfo.name
                                } ${userInfo && userInfo.patronymic}`}</h4>
                                <h5 className={"my-0"} style={{ color: "#bfb8b8" }}>{`@${
                                    userInfo && userInfo.login
                                }`}</h5>
                                <semantic.Button className={"my-1"} size='mini' onClick={() => history.push(`/settings/${userId === -1 ? getUserIdByToken() : userId}`)}>Редактировать</semantic.Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="pb-5 pt-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <div className="container pl-sm-5 text-left">

                                    <p>Описание</p>
                                    <h5>{userInfo&&userInfo.description}</h5>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="container pl-sm-5 text-left">
                                    <p>Галерея</p>

                                    <div style={{width:"inherit"}}>
                                        <Carousel showArrows={true}  >
                                            <div>
                                                <img src={templateImage} />
                                                <p className="legend">Legend 1</p>
                                            </div>
                                            <div>
                                                <img src={templateImage} />
                                                <p className="legend">Legend 1</p>
                                            </div>
                                            <div>
                                                <img src={templateImage} />
                                                <p className="legend">Legend 1</p>
                                            </div>
                                            <div>
                                                <img src={templateImage} />
                                                <p className="legend">Legend 1</p>
                                            </div>
                                            <div>
                                                <img src={templateImage} />
                                                <p className="legend">Legend 1</p>
                                            </div>
                                        </Carousel>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </section>*/}

            <section className="pb-5 pt-0">
                <div className="container pl-sm-5 text-left">
                    <p>Зафиксированые недостатки</p>

                    {userOrdersView != null ? (
                        <div className="list-group">
                            {userOrdersView}
                            <div className={"pt-4"} style={{ alignSelf: "center" }}>
                                <Pagination
                                    count={pagesCount}
                                    page={currentPage}
                                    onChange={(e, p) => setCurrentPage(p)}
                                />
                            </div>
                        </div>
                    ) : (
                        <div style={{ alignSelf: "center" }}>
                            <Image src={notfounded} style={{ maxWidth: "30em" }} />
                            <p
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    color: "#dcdde2",
                                }}
                            >
                                Нету
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <footer style={{ marginTop: "15em" }} className="footer">
                <div className="footer-left col-md-2 col-sm-6">
                    <h2> IU7Studio </h2>
                    <div className="icons">
                        <a href="#">
                            <i>
                                <FontAwesomeIcon icon={faVk} />
                            </i>
                        </a>
                        <a href="#">
                            <i>
                                <FontAwesomeIcon icon={faTelegram} />
                            </i>
                        </a>
                        <a href="#">
                            <i>
                                <FontAwesomeIcon icon={faDiscord} />
                            </i>
                        </a>
                    </div>
                </div>
                <div className="footer-center col-md-3 col-sm-6">
                    <h5>Контактные данные</h5>
                    <div>
                        <i>
                            <FontAwesomeIcon icon={faMapMarker} />
                        </i>
                        <p>
                            <span>г. Москва, ул. Бауманская, д. 46</span>
                        </p>
                    </div>
                    <div>
                        <i>
                            <FontAwesomeIcon icon={faPhone} />
                        </i>
                        <p> (+7) 800 555 35 35</p>
                    </div>
                    <div>
                        <i>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </i>
                        <p>
                            <a href="#"> alex-rudenkiy@bmstu.edu</a>
                        </p>
                    </div>
                </div>
                <div className="footer-center col-md-3 col-sm-6">
                    <h5>Поддержка</h5>
                    <p className="menu">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">
                                    Партнерские программы
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Видеоинструкции
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Сообщить об ошибке
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#">
                                    Трудоустройство
                                </a>
                            </li>
                        </ul>
                    </p>
                </div>
                <div className="footer-center col-md-4 col-sm-6">
                    <h5>Подписаться на новостную рассылку</h5>
                    <div style={{ maxWidth: "30em" }}>
                        <FormControl
                            className={"mt-3 pl-2 pr-2 pt-2"}
                            variant="filled"
                            style={{ background: "white" }}
                            fullWidth
                        >
                            <Input
                                id="outlined-adornment-weight"
                                //value={values.weight}
                                //onChange={handleChange('weight')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <FontAwesomeIcon icon={faAt} />
                                    </InputAdornment>
                                }
                                placeholder={"ваш электронный адрес"}
                                labelWidth={0}
                            />
                        </FormControl>
                        <Button
                            className={"align-self-end float-right mt-3"}
                            variant="btn btn-outline-light"
                        >
                            Подписаться
                        </Button>
                    </div>
                </div>
                <p className="name mt-5">
                    {" "}
                    Copyright &copy; ИУ7, 2021. Пользовательское соглашение Соглашение об
                    обработке персональных данных. 12+
                </p>
            </footer>
        </div>
    );
}

export default UserProfilePage;
