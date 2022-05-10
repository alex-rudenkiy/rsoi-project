import React, {useCallback, useEffect, useState} from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import FormControl from "@material-ui/core/FormControl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faTelegram, faVk,} from "@fortawesome/free-brands-svg-icons";
import {faAt, faMapMarker, faPhone} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import Pagination from "@material-ui/lab/Pagination";
import {ExampleModalMap} from "../components/ExempleModalMap.js";
import IconButton from "@material-ui/core/IconButton";
//import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import zvezdi from "../resources/templateImage.png";

import Avatar from "@material-ui/core/Avatar";
import avatar from "../resources/avatar.jpg";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {Card} from "semantic-ui-react";
import vkIcon from "../resources/vk_icon.svg";
import googleIcon from "../resources/google_icon.svg";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DateRangeIcon from "@material-ui/icons/DateRange";
import HeaderNav from "../components/headerNav";
import useBackendApi from "../logic/BackendApiHook";
import {Link, useNavigate} from "react-router-dom";
import {useBus} from "react-bus";
import ModalEditor from "../components/ModalEditor";
import { Footer } from "../components/footer";
import {stringAvatar} from "../utils";

function LeaderBoardPage() {
    // const mdbreact = require("mdbreact");
    // const { MDBModal, MDBModalHeader, MDBModalBody, MDBBtn, MDBModalFooter } =
    //     mdbreact;

    console.log(zvezdi);

    const {
        getAllUsers,
    } = useBackendApi();


    const [users, setUsers] = useState();

    const updateUsers = useCallback(() => {
        getAllUsers().then(result => setUsers(result));
        }, []);

    useEffect(() => updateUsers(), []);
    const history = useNavigate();

    const gotoProfile = useCallback((id) => history("/profile/" + id), []);
    const bus = useBus();

    return (
        <div className="App">
             <ModalEditor></ModalEditor>

                <header className="masthead">


                    <HeaderNav/>



                </header>

                <section className="container pb-5 pt-5 main-content pl-sm-5">
                    <div className="container pl-sm-5">
                        <Row>
                            <h5 className="font-weight-light text-left">Общий рейтинг</h5>
                        </Row>

                        <div className="list-group pt-3">
                            {users &&
                                users.map((u) => (
                                    <button
                                        type="button"
                                        className="list-group-item list-group-item-action"
                                    >
                                        <Row style={{ marginLeft: "1em" }}>

                                            <Link to={`/profile/${u.id}`} style={{ width: "auto",  margin: "auto" }}>
                                                <Avatar {...stringAvatar(u.login)}  />
                                            </Link>

                                            <Col onClick={() => gotoProfile(u.id)}>
                                                <p
                                                    className="text-left"
                                                    style={{ marginBottom: "auto" }}
                                                >{`@${u.login}`}</p>
                                                <p
                                                    className="text-left"
                                                    style={{ color: "Silver", fontSize: "smaller" }}
                                                >
                                                    {" "}
                                                    {`${u.name} ${u.patronymic}`}

                                                </p>
                                            </Col>

                                            <PopupState
                                                variant="popover"
                                                popupId="demo-popup-menu"
                                                style={{ float: "right" }}
                                            >
                                                {(popupState) => (
                                                    <React.Fragment>
                                                        <IconButton
                                                            aria-label="more"
                                                            aria-controls="long-menu"
                                                            aria-haspopup="true"
                                                            style={{
                                                                width: "1.5em",
                                                                height: "1.5em",
                                                                marginRight: "1em",
                                                                marginTop: "0em",
                                                            }}
                                                            {...bindTrigger(popupState)}
                                                        >
                                                            <MoreVertIcon />
                                                        </IconButton>

                                                        <Menu {...bindMenu(popupState)}>
                                                            <MenuItem
                                                                onClick={() => {
                                                                    popupState.close();
                                                                    history(`/settings/${u.id}`);
                                                                }}
                                                            >
                                                                Редактировать
                                                            </MenuItem>
                                                            <MenuItem
                                                                onClick={() => {
                                                                    popupState.close();
                                                                    bus.emit("openModal", { data: 456 });
                                                                }}
                                                            >
                                                                Заблокировать пользователя
                                                            </MenuItem>
                                                            <MenuItem
                                                                onClick={() => {
                                                                    popupState.close();
                                                                    bus.emit("openModal", { data: 789 });
                                                                }}
                                                            >
                                                                Удалить пользователя
                                                            </MenuItem>
                                                        </Menu>
                                                    </React.Fragment>
                                                )}
                                            </PopupState>
                                        </Row>
                                    </button>
                                ))}

                            <div className={"pt-4"} style={{ alignSelf: "center" }}>
                                <Pagination count={10} page={0} />
                            </div>
                        </div>
                    </div>
                </section>

                <Footer></Footer>

        </div>
    );
}

export default LeaderBoardPage;
