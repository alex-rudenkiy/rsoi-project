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
import {useNavigate, useParams} from "react-router-dom";
import {stringAvatar} from "../utils";
import * as semantic from 'semantic-ui-react'
import useUrlStore from "../logic/UrlsStore";
import {Footer} from "../components/footer";
// import "fomantic-ui-css/semantic.min.css";

function UserProfilePage() {
    const {
        getUserInfo,
        getOrdersByOwnerId,
        getCountOrdersByOwnerId,
        getUserIdByToken
    } = useBackendApi();

    const {getBackendUrl} = useUrlStore();
    const baseUrl = getBackendUrl();

    const history = useNavigate();

    const [userInfo, setUserInfo] = useState();
    const [userOrdersView, setUserOrdersView] = useState(null);

    const [pagesCount, setPagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [countOrders, setCountOrders] = useState(0);
    const pageSize = 2;
    const { userId = -1 } = useParams();
    console.log("userId", userId);

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
                                    `${baseUrl}/file/preview/${e.attachments[0]}`
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
{/*                                        <div className="col-sm">
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
                                        </div>*/}
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
                                <button className={"mini ui primary button my-1"}  onClick={() => history(`/settings/${userId === -1 ? getUserIdByToken() : userId}`)}>Редактировать</button>
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

            <Footer></Footer>
        </div>
    );
}

export default UserProfilePage;
