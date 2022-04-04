import logo from './resources/logo.png';
import React from "react";
import {Button, Col, Image, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import FormControl from "@material-ui/core/FormControl";
import Form from "react-bootstrap/Form";
import col from "react-bootstrap/Col";
import graffityImg from "./resources/graffity_image.png";
import simg1 from "./resources/park.png";
import simg2 from "./resources/vandalism.png";
import simg3 from "./resources/park (1).png";
import simg4 from "./resources/playing.png";
import sponsorLogo1 from "./resources/sponsor1.png";
import sponsorLogo2 from "./resources/sponsor2.png";
import sponsorLogo3 from "./resources/sponsor3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVk, faTelegram, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faMapMarker, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";

function App() {
    return (
        <div className="App">
            <div className="d-md-none">
                <nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
                    <div class="container">
                        <a class="navbar-brand" href="#">Start Bootstrap</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item active">
                                    <a class="nav-link" href="#">Home
                                        <span class="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Services</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <header class="masthead">
                    <div class="container h-100">
                        <div class="row h-100 align-items-center">
                            <div class="col-12 text-center">
                                <h1 class="font-weight-light">Vertically Centered Masthead Content</h1>
                                <p class="lead">A great starter layout for a landing page</p>
                            </div>
                        </div>
                    </div>
                </header>

                <section class="py-5">
                    <div class="container">
                        <h2 class="font-weight-light">Page Content</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus ab nulla dolorum autem
                            nisi officiis blanditiis voluptatem hic, assumenda aspernatur facere ipsam nemo ratione
                            cumque magnam enim fugiat reprehenderit expedita.</p>
                    </div>
                </section>
            </div>

            <div>
                <Navbar className={"mb-5"} bg="none" expand="lg">
                    <Navbar.Brand href="#home"><img style={{width: "235px"}} src={logo}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Доска почёта</Nav.Link>
                            <Nav.Link href="#link1">Карта проблем</Nav.Link>
                            <Nav.Link href="#link">Архив проблем</Nav.Link>
                            <NavDropdown title="Помощь" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2"></NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Архив проблем</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form>
                            <Button variant="btn btn-outline-primary">Войти в личный кабинет</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>

                {/*Page Content*/}
                <section className="pb-5 pt-5">
                    <div className="container pl-sm-5">

                        <Row>
                            <Col xl={4} md={4} sm={10} xs={10}>
                                <Row>
{/*
                                    <h2 className="font-weight-light text-left ">Нашли недостаток?</h2>
*/}
                                    <div className="gradient-all text-left">Нашли недостаток?</div>

                                </Row>
                                <Row>
                                    <p className={"text-left"}>Мы поможем вам исправить</p>
                                </Row>
                                <Row className={"row pr-5"} style={{marginBottom: "1em", marginTop: "2em"}}>
                                    <Button variant="btn btn-primary w-100">Зафиксировать нарушение</Button>
                                </Row>
                                <Row className={"row pr-5"} style={{marginTop: "1em"}}>
                                    <Button variant="btn btn-outline-primary w-100">Проверить статус заявления</Button>
                                </Row>
                            </Col>

                            <Col>
                                <Image style={{maxWidth: "25em"}} src={graffityImg} fluid/>
                            </Col>
                        </Row>

                    </div>
                </section>

                <section className="pb-5 pt-5">
                    <div className="container pl-sm-5">
                        <Row>
                            <h2 className="font-weight-light text-left">За последнюю неделю</h2>
                        </Row>

                        <Row className={"align-items-stretch mt-3"}>
                            <Col>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title"><Image style={{maxWidth: "4em"}} src={simg4} fluid/></h5>
                                        <p className="card-text">Отреставрировано 12 детских площадок</p>
                                        <button type="button" className="btn btn-primary btn-sm btn-block"
                                                onClick="location.href = '';">Посмотреть
                                        </button>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title"><Image style={{maxWidth: "4em"}} src={simg2} fluid/></h5>
                                        <p className="card-text">Закрашено 25 граффити</p>
                                        <button type="button" className="btn btn-primary btn-sm btn-block"
                                                onClick="location.href = '';" style={{marginTop:"auto"}}>Посмотреть
                                        </button>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title"><Image style={{maxWidth: "4em"}} src={simg1} fluid/></h5>
                                        <p className="card-text">Починено 16 лавочек</p>
                                        <button type="button" className="btn btn-primary btn-sm btn-block"
                                                onClick="location.href = '';" style={{marginTop:"auto"}}>Посмотреть
                                        </button>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title"><Image style={{maxWidth: "4em"}} src={simg3} fluid/></h5>
                                        <p className="card-text">Посажено 20 деревьев</p>
                                        <button type="button" className="btn btn-primary btn-sm btn-block"
                                                onClick="location.href = '';" style={{marginTop:"auto"}}>Посмотреть
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </div>

                    <p className={"mt-5"} style={{color: "#a3a2a2"}}>... и ещё 76 новых событий</p>
                </section>

                <section className="pb-5 pt-5" style={{background: "#2e64ff"}}>
                    <div className="container pl-sm-5">
                        <div className="container">
                            <h2 className="font-weight-light" style={{color: "#f8f8f8"}}>Наиболее активные
                                организации</h2>

                            <div className="row">
                                <div className="col">
                                    <div>
                                        <div>
                                            <div style={{marginRight: "3em"}}>
                                                <Image src={sponsorLogo1} style={{
                                                width: "3em"
                                            }} fluid/></div>
                                            <div>
                                                <svg height="100" width="100">
                                                    <circle cx="50" cy="50" r="49" fill="white" stroke="white"/>
                                                </svg>
                                            </div>
                                        </div>

                                    </div>


                                    <p style={{color: "#f8f8f8"}}>ОАО «ЖБК-1»</p>
                                </div>
                                <img className="rounded-circle img-fluid mystyle" src={sponsorLogo1}
                                     style={{
                                         width: "6em",
                                         height: "6em",
                                         background: "white"
                                         
                                     }}
                                     alt="Circle image"/>
                                <div className="col">
                                    <div>
                                        <div>
                                            <div style={{display: "block",
                                                position: "relative",
                                                width: "90%"}}>
                                                <svg height="100" width="100">
                                                    <circle cx="50" cy="50" r="49" fill="white" stroke="white"/>
                                                </svg>
                                            </div>
                                            <div><Image src={sponsorLogo1} style={{
                                                display: "block",
                                                width: "30%", /* это наверное уже у тебя в js будет вычисляться */
                                                position: "absolute",
                                                top: "0%",
                                                left: "30%" /* тоже через js будешь вычислять */


                                            }} fluid/></div>

                                        </div>

                                    </div>


                                    <p style={{color: "#f8f8f8"}}>ОАО «ЖБК-1»</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <section className="pb-5 pt-5">
                    <div className="container pl-sm-5">
                        <Row>
                            <h2 className="font-weight-light text-left">Как работает наша система</h2>
                        </Row>
                        <div className="embed-responsive embed-responsive-16by9 mt-5" style={{maxWidth:"50em", marginLeft:"auto", marginRight:"auto"}}>
                            <iframe
                                    src="https://www.youtube-nocookie.com/embed/40VfZ_nIFWI?controls=0" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                        </div>
                    </div>


                </section>


                <footer className="footer">
                    <div className="footer-left col-md-2 col-sm-6">
                        <h2> POVTAS </h2>
                        <div className="icons">

                            <a href="#"><i><FontAwesomeIcon icon={faVk} /></i></a>
                            <a href="#"><i><FontAwesomeIcon icon={faTelegram} /></i></a>
                            <a href="#"><i><FontAwesomeIcon icon={faDiscord} /></i></a>

                        </div>
                    </div>
                    <div className="footer-center col-md-2 col-sm-6">
                        <h5>Контактные данные</h5>
                        <div>
                            <i><FontAwesomeIcon icon={faMapMarker} /></i>
                            <p><span>г. Белгород, ул. Костюкова 46</span></p>
                        </div>
                        <div>
                            <i><FontAwesomeIcon icon={faPhone} /></i>
                            <p> (+7) 800 555 35 35</p>
                        </div>
                        <div>
                            <i><FontAwesomeIcon icon={faEnvelope} /></i>
                            <p><a href="#"> alex-rudenkiy@bstu.edu</a></p>
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
                    <div className="footer-center col-md-5 col-sm-6">
                        <h5>Подписаться на новостную рассылку</h5>
                        <div style={{maxWidth:"30em"}}><FormControl className={"mt-3 pl-2 pr-2 pt-2"} variant="filled" style={{background:"white"}} fullWidth>
                            <Input
                                id="outlined-adornment-weight"
                                //value={values.weight}
                                //onChange={handleChange('weight')}
                                endAdornment={<InputAdornment position="end"><FontAwesomeIcon icon={faAt} /></InputAdornment>}
                                placeholder={"ваш электронный адрес"}
                                labelWidth={0}
                            />
                        </FormControl>
                            <Button className={"align-self-end float-right mt-3"}
                                    variant="btn btn-outline-light">Подписаться</Button></div>


                    </div>
                    <p className="name mt-5"> Copyright &copy; ПОВТАС, 2021. Пользовательское соглашение Соглашение об обработке персональных данных. 12+</p>
                </footer>

            </div>
        </div>
    );
}

export default App;
