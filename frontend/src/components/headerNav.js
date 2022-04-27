import Navbar from "react-bootstrap/Navbar";

import LogoIcon from '../resources/easylogo'
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Image} from "react-bootstrap";
import sponsorLogo1 from "../resources/sponsor1.png";
import IconButton from "@material-ui/core/IconButton";
import "../App.css";
import useBackendApi from "../logic/BackendApiHook";
import {Icon} from "semantic-ui-react";
import SettingsIcon from '@material-ui/icons/Settings';

export default function HeaderNav(props) {
    const {authentication, registration, fileUpload, getUserInfo, checkAuth, logout} = useBackendApi();
    const [logoutShow, setLogoutShow] = useState(false);
    useEffect(() => {
        getUserInfo().then(e => {e&&setLogoutShow(e.id>0)});
    }, []);

    return (
        <Navbar bg="none" expand="lg">
            <Navbar.Brand href="#home"><img style={{width: "235px"}} src={LogoIcon}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/community" style={{color: 'inherit'}}>Участники сообщества</Link></Nav.Link>
                    <Nav.Link><Link to="/makeRequest" style={{color: 'inherit'}}>Создать обращение</Link></Nav.Link>
                    <Nav.Link><Link to="/archive" style={{color: 'inherit'}}>Архив проблем</Link></Nav.Link>
                    <Nav.Link activeKey={false}><Link to="/smartcontrol" style={{color: 'inherit'}}>Активный контроль</Link></Nav.Link>
                    {/*<NavDropdown title="Помощь" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2"></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Архив проблем</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>*/}
                </Nav>
                <Form>
                    {logoutShow == false ?
                        <Link to="/login" style={{color: 'inherit'}}><Button variant="btn btn-outline-primary">Войти в
                            личный кабинет</Button></Link>:
                        <div>
{/*
                            <Icon loading name='setting' />
*/}

                            <Button variant="light"><SettingsIcon />Настройки</Button>

                            <Link to="/login" style={{color: 'inherit'}}><Button variant="btn btn-outline-primary" onClick={logout}>Выйти</Button></Link></div>
                    }
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )

}
