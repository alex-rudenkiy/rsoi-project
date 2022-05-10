import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "react-bootstrap/Navbar";

import Nav from "react-bootstrap/Nav";
import {Link, useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "../App.css";
// import useBackendApi from "../logic/BackendApiHook";
import SettingsIcon from "@material-ui/icons/Settings";
import useBackendApi from "../logic/BackendApiHook";
import {LogoIcon} from "../resources/easylogo";

export default function HeaderNav(props) {
    const history = useNavigate();

    const {
        getUserInfo,
        logout,
    } = useBackendApi();

    const [logoutShow, setLogoutShow] = useState(false);
    useEffect(() => {
        getUserInfo().then((e) => {
            e && setLogoutShow(e.id > 0);
        });
    }, []);

    return (
        <Navbar bg="none" expand="lg" className={"mx-5"}>
            <Navbar.Brand href="#home">

                {/*<img style={{ width: "235px" }} src={LogoIcon} />*/}
                <LogoIcon/>

            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto w-100">
                    <Nav.Link>
                        <Link to="/community" style={{ color: "inherit" }}>
                            Участники сообщества
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/makeRequest" style={{ color: "inherit" }}>
                            Создать обращение
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/archive" style={{ color: "inherit" }}>
                            Архив проблем
                        </Link>
                    </Nav.Link>
                    <Nav.Link activeKey={false}>
                        <Link to="/smartcontrol" style={{ color: "inherit" }}>
                            Активный контроль
                        </Link>
                    </Nav.Link>
                    {/*<NavDropdown title="Помощь" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2"></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Архив проблем</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>*/}
                </Nav>
                <Form>
                    {logoutShow == false ? (
                        <Link to="/login" style={{ color: "inherit" }}>
                            <Button variant="btn btn-outline-primary">
                                Войти в личный кабинет
                            </Button>
                        </Link>
                    ) : (
                        <div>
                            {/*
                            <Icon loading name='setting' />
*/}

                            <Button variant="light" onClick={() => history("/settings")} >
                                <SettingsIcon />
                                Настройки
                            </Button>

                            <Link to="/login" style={{ color: "inherit" }}>
                                <Button variant="btn btn-outline-primary" onClick={logout} style={{width: "max-content"}}>
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
