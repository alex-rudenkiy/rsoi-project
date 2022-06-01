import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "react-bootstrap/Navbar";
import {useRouter} from "next/router";
import Link from 'next/link'
import React, {useEffect, useState} from "react";

// import useBackendApi from "../frontendApiHooks";
import useFrontendApi from "../../frontendApiHooks";
import {LogoIcon} from "../../public/resources/easylogo";
import {Form, Nav} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";

export default function HeaderNav(props) {
    const history = useRouter();

    const { logout } = useFrontendApi();

    const [logoutShow, setLogoutShow] = useState(false);

    return (

                <Navbar bg="none" expand="lg" className={"mx-5"}>
                    <Link href="/" style={{ color: "inherit" }}>
                        <Navbar.Brand>

                            {/*<img style={{ width: "235px" }} src={LogoIcon} />*/}
                            <LogoIcon/>

                        </Navbar.Brand>

                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto w-100">
                            <Nav.Link>
                                <Link href="/community" style={{ color: "inherit" }}>
                                    Участники сообщества
                                </Link>
                            </Nav.Link>
                            {
                                props.isAuth && <Nav.Link>
                                    <Link href="/ordering" style={{ color: "inherit" }}>
                                        Создать обращение
                                    </Link>
                                </Nav.Link>
                            }
                            <Nav.Link>
                                <Link href="/archive" style={{ color: "inherit" }}>
                                    Архив проблем
                                </Link>
                            </Nav.Link>
        {/*                    <Nav.Link activeKey={false}>
                                <Link href="/smartcontrol" style={{ color: "inherit" }}>
                                    Активный контроль
                                </Link>
                            </Nav.Link>*/}
                            {/*<NavDropdown title="Помощь" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2"></NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Архив проблем</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>*/}
                        </Nav>
                        <Form>
                            {
                                !props.isAuth ? (
                                <Link href="/login" style={{ color: "inherit" }}>
                                    <Button variant="btn btn-outline-primary">
                                        Войти в личный кабинет
                                    </Button>
                                </Link>
                            ) : (
                                <div style={{display: "flex", justifyContent: "center"}}>
                                    {/*
                                    <Icon loading name='setting' />
        */}

                                    <Button variant="light" onClick={() => history.push("/settings")} >
                                        <SettingsIcon />
                                        Настройки
                                    </Button>

                                    <Link href="/login" style={{ color: "inherit" }}>
                                        <Button variant="btn btn-outline-primary" onClick={logout} style={{    width: "max-content",
                                            height: "100%",
                                            paddingLeft: "1.5em",
                                            paddingRight: "1.5em"}}>
                                            Выйти
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
    );
}
