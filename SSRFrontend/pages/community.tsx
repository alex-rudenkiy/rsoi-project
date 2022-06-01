import React, {useCallback, useEffect, useState} from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import IconButton from "@material-ui/core/IconButton";
//import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import zvezdi from "../public/resources/templateImage.png";

import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import HeaderNav from "../src/components/headerNav";
import useFrontendApi from "../frontendApiHooks";
import {useRouter} from "next/router";
import {useBus} from "react-bus";
import ModalEditor from "../src/components/ModalEditor";
import { Footer } from "../src/components/footer";
import {stringAvatar} from "../utils";
import {Pagination} from "@material-ui/lab";
import {NextApiRequest, NextApiResponse} from "next";
import { getSession } from "next-auth/react"
import useBackendApi from "../backendApiHooks";
import Link from "next/link";

export async function getServerSideProps(context) {
    const {getUserInfoById, getOrderInfoById, getAllUsers} = useBackendApi();
    const {req} = context;

    const session = await getSession({req});

    const authUserInfo = session?.user?.id ? await getUserInfoById(session.user?.id) : null;

    const allUsers = await getAllUsers();


    return {props: {userInfo: authUserInfo, allUsers: allUsers, isAuth: authUserInfo?.id >=0}} //
}

function Community(props) {

    const [users, setUsers] = useState(props.allUsers);
    const [currentUserInfo, setCurrentUserInfo] = useState(props.userInfo);

    const history = useRouter();

    const gotoProfile = useCallback((id) => history.push("/profile/" + id), []);
    const bus = useBus();

    return (
        <div className="App">
             <ModalEditor/>

                <header className="masthead">


                    <HeaderNav isAuth={props.isAuth}/>



                </header>

                <section className="container pb-5 pt-5 main-content pl-sm-5">
                    <div className="container pl-sm-5">
                        <Row>
                            <h5 className="font-weight-light text-left">Общий список участников:</h5>
                        </Row>

                        <div className="list-group pt-3">
                            {users &&
                                users.map((u) => (
                                    <button
                                        type="button"
                                        className="list-group-item list-group-item-action"
                                    >
                                        <Row style={{ marginLeft: "1em" }}>

                                            <Link href={`/profile/${u.id}`} style={{ width: "auto",  margin: "auto" }}>
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

                                            {currentUserInfo?.role?.name === "Moderator" &&
                                                <PopupState
                                                    variant="popover"
                                                    popupId="demo-popup-menu"
                                                    style={{float: "right"}}
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
                                                                <MoreVertIcon/>
                                                            </IconButton>

                                                            <Menu {...bindMenu(popupState)}>
                                                                <MenuItem
                                                                    onClick={() => {
                                                                        popupState.close();
                                                                        history.push(`/settings/${u.id}`);
                                                                    }}
                                                                >
                                                                    Редактировать
                                                                </MenuItem>

                                                            </Menu>
                                                        </React.Fragment>
                                                    )}
                                                </PopupState>
                                            }

                                        </Row>
                                    </button>
                                ))}

                            <div className={"pt-4"} style={{ alignSelf: "center" }}>

                                <Pagination count={1} page={0} />

                            </div>
                        </div>
                    </div>
                </section>

                <Footer/>

        </div>
    );
}

export default Community;
