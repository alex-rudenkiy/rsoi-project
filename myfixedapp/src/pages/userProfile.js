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
import {isNumber} from "lodash";
import {useBus} from "react-bus";
import TodayIcon from "@material-ui/icons/Today";
import moment from "moment";
// import "fomantic-ui-css/semantic.min.css";

function UserProfilePage() {
    const {
        getUserInfo,
        getOrdersByOwnerId,
        getCountOrdersByOwnerId,
        getUserIdByToken
    } = useBackendApi();


    let userId = useParams()['*'];
    if(!userId>0) {
        userId = -1;
    }

    const {getBackendUrl} = useUrlStore();
    const baseUrl = getBackendUrl();

    const history = useNavigate();


    const [currentUserInfo, setCurrentUserInfo] = useState();
    const [userInfo, setUserInfo] = useState();
    const [userOrdersView, setUserOrdersView] = useState(null);

    const [pagesCount, setPagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [countOrders, setCountOrders] = useState(0);
    const pageSize = 2;


    const bus = useBus()


    console.log("userId", userId);

    useEffect(() => {
        getUserInfo(undefined).then((uinfo)=>{
            setCurrentUserInfo(uinfo)
        })

        getUserInfo(userId === -1 ? undefined : userId).then((uinfo) => {
            setUserInfo(uinfo);

            getOrdersByOwnerId(currentPage, pageSize, userId).then((orders) => {
                console.log("getOrdersByOwnerId ====> ", orders);
                setCountOrders(orders.length);
                setUserOrdersView(
                    orders.map((e) => (
                        <button
                            type="button"
                            className="list-group-item list-group-item-action"
                            onClick={()=>{
                                if(Number(uinfo.id) === Number(userId)) {
                                    history(`/request/${e.id}`)
                                }else{
                                    bus.emit('openAppealCardModal', { orderId: e.id })
                                }
                            }}
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
                                        <TodayIcon fontSize={"small"} />
                                        {moment(e.createdAt).format("YYYY MMM DD HH:mm").toString()} &nbsp;
                                        <MessageIcon fontSize={"small"} />
                                        {e.comments && e.comments.length}
                                    </p>
                                </Col>
                            </Row>
                        </button>
                    ))
                );
            });

        });


        /*const u = (getUserInfo(userId, false)).data;
            console.log('u=',u);*/
    }, []);

    useEffect(() => {
        console.log("let's go");
        //getUserInfo(undefined, true).then(e=>console.log("gg", e));
        try {
            getCountOrdersByOwnerId().then(c => {
                setPagesCount(Math.ceil(c / pageSize));
            })

        } catch (e) {}
    }, [currentPage]);

    return (
        <div className="App">
            <header className="masthead">


                <HeaderNav/>



            </header>


            <section className="container pb-5 pt-5 main-content pl-sm-5">
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

                                {currentUserInfo?.role?.name === "Moderator" &&
                                    <button className={"mini ui primary button my-1"}
                                            onClick={() => history(`/settings/${userId === -1 ? getUserIdByToken() : userId}`)}>Редактировать</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <section className="pb-5 pt-0">
                    <div className="container pl-sm-5 text-left">
                        <p>Зафиксированые недостатки</p>

                        {userOrdersView && userOrdersView.length > 0 ? (
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


            <Footer></Footer>
        </div>
    );
}

export default UserProfilePage;
