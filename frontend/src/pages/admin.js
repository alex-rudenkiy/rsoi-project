import logo from '../resources/logo.png';
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Button, Col, Image, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import FormControl from "@material-ui/core/FormControl";
import Form from "react-bootstrap/Form";
import col from "react-bootstrap/Col";
import graffityImg from '../resources/graffity_image.png';
import simg1 from "../resources/park.png";
import simg2 from "../resources/vandalism.png";
import simg3 from "../resources/park (1).png";
import simg4 from "../resources/playing.png";
import sponsorLogo1 from "../resources/sponsor1.png";
import sponsorLogo2 from "../resources/sponsor2.png";
import sponsorLogo3 from "../resources/sponsor3.png";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faVk, faTelegram, faDiscord} from '@fortawesome/free-brands-svg-icons'
import {faMapMarker, faPhone} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import {faAt} from "@fortawesome/free-solid-svg-icons";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import "react-resizable/css/styles.css";
import "../resources/draganddrop.css"
import Container from "react-bootstrap/Container";
import TextFieldsIcon from '@material-ui/icons/TextFields';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CancelIcon from '@material-ui/icons/Cancel';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PeopleIcon from '@material-ui/icons/People';
import SettingsInputCompositeIcon from '@material-ui/icons/SettingsInputComposite';
import Badge from "@material-ui/core/Badge";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import Modal from "react-bootstrap/Modal";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {Paper} from "@material-ui/core";
import {Flag, Icon, Segment} from 'semantic-ui-react'
import {Dimmer, Loader} from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import List from "semantic-ui-react/dist/commonjs/elements/List";


function AdminPage() {
    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({width: 0, height: 0});

    useEffect(() => {
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    });


    const layout = [
        {i: 'a', x: 0, y: 0, w: 2, h: 3},
        {i: 'b', x: 2, y: 0, w: 2, h: 3},
        {i: 'c', x: 4, y: 0, w: 2, h: 3},
        {i: 'd', x: 6, y: 0, w: 2, h: 3},
        {i: 'e', x: 8, y: 0, w: 2, h: 3},
        {i: 'f', x: 10, y: 0, w: 2, h: 3}

    ];

    function createData(type, title, state, author) {
        return {type, title, state, author};
    }

    const rows = [
        createData('жалоба', 'Frozen yoghurt', '159', 6.0),
        createData('жалоба', 'Ice cream sandwich', '237', 9.0),
        createData('жалоба', 'Eclair', 'проверенно', 16.0),
        createData('жалоба', 'Cupcake', 'не проверено', 3.7),
        createData('жалоба', 'Gingerbread', '356', 16.0),
    ];

    const MaterialButton = require('@material-ui/core/Button').default;
    const SemanticImage = require('semantic-ui-react').Image;

    return (
        <div className="App">
            <Navbar className={"px-5 pt-4"} bg="light" variant="light">
                <Navbar.Brand href="#home">Панель управления</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Главная</Nav.Link>
                    <Nav.Link href="#features">Логи</Nav.Link>
                    <Nav.Link href="#pricing">Статистика</Nav.Link>
                </Nav>
                <Form inline style={{alignItems: "baseline"}}>
                    <div>
                    <p>Руденький Александр &nbsp; &nbsp; </p>
                    <Button variant="outline-primary">Выход</Button>
                    </div>
                </Form>
            </Navbar>



            <div className={"p-5"}>
                <Row>
                    <Col md={6} sm={6} lg={3}>
                        <Badge style={{textAlign: "left", display: "table"}} badgeContent={"live"} color="secondary">
                            <h5>Карта проблем</h5>
                        </Badge>

                        <Segment>
                            <Dimmer.Dimmable as={Segment} blurring dimmed>
                            <Dimmer active inverted>
                                <Loader/>
                            </Dimmer>
                            <MapContainer center={[50.5952, 36.5800]} zoom={13} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[50.5952, 36.5800]}>
                                    <Popup>
                                        A pretty CSS3 popup. <br/> Easily customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer>
                            </Dimmer.Dimmable>
                        </Segment>



                        <div>
                            <Badge className={"mt-5"} style={{textAlign: "left", display: "table"}}
                                   badgeContent={"live"} color="secondary">
                                <h5>Последние заявления и жалобы</h5>
                            </Badge>



                            <TableContainer component={Paper} className={"p-3"} style={{maxHeight:"30em"}}>

                                <List relaxed>
                                    <List.Item>
                                        <SemanticImage floated='left' avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
                                        <List.Content floated='left' style={{textAlign: "left"}}>
                                            <List.Header floated='left' as='a'>Daniel Louise</List.Header>
                                            <List.Description floated='left'>
                                                Last seen watching{' '}
                                                <a>
                                                    <b style={{color:"#1976d2"}}>Проверить</b>
                                                </a>{' '}
                                                just now.
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <SemanticImage floated='left' avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
                                        <List.Content floated='left' style={{textAlign: "left"}}>
                                            <List.Header floated='left' as='a'>Daniel Louise</List.Header>
                                            <List.Description floated='left'>
                                                Last seen watching{' '}
                                                <a>
                                                    <b>Arrested Development</b>
                                                </a>{' '}
                                                just now.
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>

                                </List>


                            </TableContainer>

                        </div>
                    </Col>
                    <Col md={12} sm={6} lg={9}>
                        <h5 style={{textAlign: "left"}}>Быстрые действия</h5>


                        <Row className="px-4 pt-3">
                            <Col className={"plate px-0 my-0"} xl={2} lg={2} md={2} sm={12} xs={12} style={{ height: "8em", margin: "0.5em" }}>
                                <div className={"pt-0"} key="b">
                                    <MaterialButton variant="contained" color="primary" style={{ height: "8em", width: "100%", background:"#1976d2", borderRadius: "0" }} disableElevation>
                                        <div>
                                        <TextFieldsIcon className={"mt-1"} style={{float: "right"}} fontSize="small"/>
                                        <p style={{textAlign: "left", overflowWrap: "anywhere"}}>Изменить основные данные сайта</p>
                                        </div>
                                    </MaterialButton>

                                </div>
                            </Col>

                            <Col className={"plate px-0 my-0"} xl={2} lg={2} md={2} sm={12} xs={12} style={{ height: "8em", margin: "0.5em" }}>
                                <div className={"pt-0"} key="b" >
                                    <MaterialButton variant="contained" color="primary" style={{ height: "8em", width: "100%", background:"#1976d2", borderRadius: "0" }} disableElevation>
                                        <div>
                                    <AccessTimeIcon className={"mt-1"} style={{float: "right"}} fontSize="small"/>
                                    <p style={{textAlign: "left", overflowWrap: "anywhere"}}>Установить локальное время</p>
                                        </div>
                                    </MaterialButton>
                                </div>
                            </Col>

                            <Col className={"plate px-0 my-0"} xl={2} lg={2} md={2} sm={12} xs={12} style={{ height: "8em", margin: "0.5em" }}>
                                <div className={"pt-0"} key="b">
                                    <MaterialButton variant="contained" color="primary" style={{ height: "8em", width: "100%", background:"#1976d2", borderRadius: "0" }} disableElevation>
                                        <div>
                                    <CancelIcon className={"mt-1"} style={{float: "right"}} fontSize="small"/>
                                    <p style={{textAlign: "left", overflowWrap: "anywhere"}}>Установить статус "Тех. обслуж."</p>
                                        </div>
                                    </MaterialButton>
                                </div>
                            </Col>

                            <Col className={"plate px-0 my-0"} xl={2} lg={2} md={2} sm={12} xs={12} style={{ height: "8em", margin: "0.5em" }}>
                                <div className={"pt-0"} key="b">
                                    <MaterialButton variant="contained" color="primary" style={{ height: "8em", width: "100%", background:"#1976d2", borderRadius: "0" }} disableElevation>
                                        <div>
                                    <PeopleAltIcon className={"mt-1"} style={{float: "right"}} fontSize="small"/>
                                    <p style={{textAlign: "left", overflowWrap: "anywhere"}}>Управление пользователями</p>
                                        </div>
                                    </MaterialButton>
                                </div>
                            </Col>

                            <Col className={"plate px-0 my-0"} xl={2} lg={2} md={2} sm={12} xs={12} style={{ height: "8em" }}>
                                <div className={"pt-0"} key="b">
                                    <MaterialButton variant="contained" color="primary" style={{ height: "8em", width: "100%", background:"#1976d2", borderRadius: "0" }} disableElevation>
                                        <div>
                                    <PeopleIcon className={"mt-1"} style={{float: "right"}} fontSize="small"/>
                                    <p style={{textAlign: "left", overflowWrap: "anywhere"}}>Управление организациями</p>
                                        </div>
                                    </MaterialButton>
                                </div>
                            </Col>

                            <Col className={"plate px-0 my-0"} xl={2} lg={2} md={2} sm={12} xs={12} style={{ height: "8em", margin: "0.5em" }}>
                                <div className={"pt-0"} key="b">
                                    <MaterialButton variant="contained" color="primary" style={{ height: "8em", width: "100%", background:"#1976d2", borderRadius: "0" }} disableElevation>
                                        <div>
                                    <SettingsInputCompositeIcon className={"mt-1"} style={{float: "right"}} fontSize="small"/>
                                    <p style={{textAlign: "left", overflowWrap: "anywhere"}}>Управление компонентами системы</p>
                                        </div>
                                    </MaterialButton>
                                </div>
                            </Col>

                        </Row>




                    </Col>

                </Row>
            </div>


        </div>
    );
}

export default AdminPage;
