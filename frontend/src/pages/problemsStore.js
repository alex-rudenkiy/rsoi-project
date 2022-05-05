import React, {useEffect, useState} from "react";
import {Button, Col, Container, Image, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import FormControl from "@material-ui/core/FormControl";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faVk, faTelegram, faDiscord} from '@fortawesome/free-brands-svg-icons'
import {faMapMarker, faPhone} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import {faAt} from "@fortawesome/free-solid-svg-icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import ViewsIcon from '@material-ui/icons/Visibility';
import MessageIcon from '@material-ui/icons/Message';
import Pagination from '@material-ui/lab/Pagination';
import {ExampleModalMap} from '../components/ExempleModalMap.js';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import IconButton from "@material-ui/core/IconButton";
//import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { useBus } from 'react-bus'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, {bindTrigger, bindMenu} from 'material-ui-popup-state';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HeaderNav from "../components/headerNav";
import ModalOrder from "./modalOrder";
import useBackendApi from "../logic/BackendApiHook";
import _ from "lodash";

function ProblemsStorePage() {
    const {
        getAllOrders,
        getLastCreated
    } = useBackendApi();

    // require('mdbreact');

    // require('react-responsive-carousel').Carousel;
    var Blur = require('react-blur').default;
    const [, setModalOrderId] = useState();
    const [liveMarkers, setLiveMarkers] = useState();
    const [topAppealBanner, setTopAppealBanner] = useState();
    const [paginationParams, setPaginationParams] = useState({page:0, count:0});
    const [pageListOrders, setPageListOrders] = useState();
    const bus = useBus()
    // useEffect(()=>{
    //     console.log("zmq go");
    //     // subber.js
    //     var sock = zmq.socket('sub');
    //
    //     sock.connect('tcp://127.0.0.1:3000');
    //     sock.subscribe('kitty cats');
    //     console.log('Subscriber connected to port 3000');
    //
    //     sock.on('message', function(topic, message) {
    //         console.log('received a message related to:', topic, 'containing message:', message);
    //     });
    //
    // },[zmq]);
    //modalOrderId

    useEffect(()=>{
        getAllOrders(paginationParams.page, 10).then(o=>{
            setPaginationParams({...paginationParams, ...{count:o.total}});
            setPageListOrders(o.content.map(e=>
                <button type="button" className="list-group-item list-group-item-action" onClick={()=>bus.emit('openAppealCardModal', {orderId: e.id})}>
                    <Row style={{marginLeft: "1em"}}>
                        <Image style={{maxWidth: "4em", maxHeight: "4em"}} src={e.attachments&&`http:\\\\localhost:8888\\file\\preview\\${e.attachments[0]}`}  fluid/>
                        <Col>
                            <p className="text-left" style={{marginBottom: "auto"}}>{e.title}</p>
                            <p className="text-left" style={{color: "Silver", fontSize: "smaller"}}>
                                <ViewsIcon fontSize={"small"}/>{_.isEmpty(e.views)? 0 : e.views.length} &nbsp; <MessageIcon fontSize={"small"}/>{_.isEmpty(e.comments) ? 0 : e.comments.length}
                            </p>
                        </Col>

                        <PopupState variant="popover" popupId="demo-popup-menu" style={{float: "right"}}>
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
                                            marginTop: "0.5em"
                                        }}
                                        {...bindTrigger(popupState)}
                                    >
                                        <MoreVertIcon/>
                                    </IconButton>

                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={popupState.close}>Удалить сообщение</MenuItem>
                                        <MenuItem onClick={popupState.close}>Заблокировать автора</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>

                    </Row>
                </button>
            ));
        });
    },[paginationParams.page]);

    const createAppealBanner = (id, imgUrl, title, description, comments, views)=>{
        return( <Container style={{height: "20em", overflow: "hidden"}}>
                <div className="card text-white">
                    {/*<img className="card-img" src={templateImage} alt="Card image"/>*/}
                    <Blur img={imgUrl}
                          blurRadius={45} enableStyles style={{
                        width: "89em",
                        height: "20em",
                        position: "absolute",
                        transform: "translate(-3em, -1em)",
                    }}>}
                        The content.
                    </Blur>

                    <div className="card-img-overlay">
                        <div className="row pl-5">
                            <div className="col-8">
                                <Row>
                                    <h2 className="font-weight-light text-left mb-0"
                                        style={{color: "white"}}>Заявление №{id}</h2>
                                </Row>
                                <Row>
                                    <p style={{color: "white"}}>статус: &nbsp; </p><p
                                    style={{color: "#68a5ff", fontWeight: "bold"}}>на рассмотрении </p>
                                </Row>
                                <Row>
                                    <p style={{color: "white"}}><ViewsIcon fontSize={'small'}/>{comments?.length} &nbsp;
                                        <MessageIcon fontSize={'small'}/>{views.length}</p>
                                </Row>

                                <Row className="w-75">
                                    <p className={"text-break"}
                                       style={{textAlign: "justify", color: "white"}}>{description}</p>
                                </Row>

                                <Row className={"row pr-5 mt-3"} style={{color: "white"}}>
                                    <Button variant="btn btn-outline-primary w-25 btn-sm"
                                            style={{color: "white"}}
                                            onClick={()=>bus.emit('openAppealCardModal', {orderId: id})}>Открыть</Button>
                                </Row>

                            </div>
                            <div className="col">
                                <Image style={{maxWidth: "18em", maxHeight: "17em"}}
                                       src={imgUrl}
                                       fluid/>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    };

    useEffect(() => {

        getAllOrders().then(o => setLiveMarkers(o.map(e => {console.log(e);return <Marker position={[e.geoPosition.lat, e.geoPosition.lon]}
                                                                   eventHandlers={{
                                                                       click: () => {
                                                                           console.log(e.id);
                                                                           setModalOrderId(e.id)
                                                                       },
                                                                   }}>
            <Popup>
                A pretty CSS3 popup. <br/> Easily customizable.
            </Popup>
        </Marker>})));
        getLastCreated().then((c) => {
            //alert(c.attachments[0]);
            setTopAppealBanner(createAppealBanner(c.id, `http://localhost:8888/file/preview/${ c.attachments[0]}`,c.title,c.description,c.views,c.comments));
        });

    }, [])

    return (
        <div className="App">

            <ModalOrder/>


            <div>
                <HeaderNav/>


                {/*<IconButton aria-label="delete">
                    <Image style={{maxWidth: "2em"}} src={MapIcon} fluid/>
                </IconButton>*/}

                {/*Page Content*/}

                <section className="pb-0 pt-0">

                    {topAppealBanner}

                </section>


                {/*<section className="pb-3 pt-5">
                    <div className="container pl-sm-5">
                        <Row>
                            <h5 className="font-weight-light text-left">Последние созданные</h5>
                        </Row>

                        <Row className={"align-items-stretch mt-3"}>
                            <Col>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title"><Image style={{maxWidth: "8em"}} src={TopImagePreview} fluid/>
                                        </h5>
                                        <p className="card-text">Уже 10 лет одно и тоже!</p>
                                        <button type="button" className="btn btn-primary btn-sm btn-block"
                                                onClick="location.href = '';">открыть
                                        </button>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title"><Image style={{maxWidth: "8em"}} src={TopImagePreview} fluid/>
                                        </h5>
                                        <p className="card-text">Уберите за собой!</p>
                                        <button type="button" className="btn btn-primary btn-sm btn-block"
                                                onClick="location.href = '';" style={{marginTop: "auto"}}>открыть
                                        </button>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title"><Image style={{maxWidth: "8em"}} src={TopImagePreview} fluid/>
                                        </h5>
                                        <p className="card-text">Когда будет тратуар?!</p>
                                        <button type="button" className="btn btn-primary btn-sm btn-block"
                                                onClick="location.href = '';" style={{marginTop: "auto"}}>открыть
                                        </button>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title"><Image style={{maxWidth: "8em"}} src={TopImagePreview} fluid/>
                                        </h5>
                                        <p className="card-text">Качели убиты</p>
                                        <button type="button" className="btn btn-primary btn-sm btn-block"
                                                onClick="location.href = '';" style={{marginTop: "auto"}}>открыть
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>

                <section className="pb-5 pt-0">
                    <div className="container pl-sm-5">
                        <div className="row">

                            <div className="col-6">
                                <Row>
                                    <h5 className="font-weight-light text-left">Наиболее просматриваемые</h5>
                                </Row>


                                <div className="list-group pt-2">
                                    <button type="button" className="list-group-item list-group-item-action">
                                        <Row style={{marginLeft:"1em"}}>
                                        <Image style={{maxWidth: "4em", maxHeight:"4em"}} src={TopImagePreview} fluid/>
                                        <Col>
                                            <p className="text-left" style={{marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                            <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><ViewsIcon fontSize={"small"}/>1082 &nbsp; <MessageIcon fontSize={"small"}/>24</p>
                                        </Col>
                                        </Row>
                                    </button>
                                    <button type="button" className="list-group-item list-group-item-action">
                                        <Row style={{marginLeft:"1em"}}>
                                            <Image style={{maxWidth: "4em", maxHeight:"4em"}} src={TopImagePreview} fluid/>
                                            <Col>
                                                <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                                <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><ViewsIcon fontSize={"small"}/>1082 &nbsp; <MessageIcon fontSize={"small"}/>24</p>
                                            </Col>
                                        </Row>
                                    </button>
                                    <button type="button" className="list-group-item list-group-item-action">
                                        <Row style={{marginLeft:"1em"}}>
                                            <Image style={{maxWidth: "4em", maxHeight:"4em"}} src={TopImagePreview} fluid/>
                                            <Col>
                                                <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                                <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><ViewsIcon fontSize={"small"}/>1082 &nbsp; <MessageIcon fontSize={"small"}/>24</p>
                                            </Col>
                                        </Row>
                                    </button>

                                </div>

                            </div>
                            <div className="col-6">
                                <Row>
                                    <h5 className="font-weight-light text-left">Наиболее комментируемые</h5>
                                </Row>

                                <div className="list-group pt-2">
                                    <button type="button" className="list-group-item list-group-item-action">
                                        <Row style={{marginLeft:"1em"}}>
                                            <Image style={{maxWidth: "4em", maxHeight:"4em"}} src={TopImagePreview} fluid/>
                                            <Col>
                                                <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                                <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><ViewsIcon fontSize={"small"}/>1082 &nbsp; <MessageIcon fontSize={"small"}/>24</p>
                                            </Col>
                                        </Row>
                                    </button>
                                    <button type="button" className="list-group-item list-group-item-action">
                                        <Row style={{marginLeft:"1em"}}>
                                            <Image style={{maxWidth: "4em", maxHeight:"4em"}} src={TopImagePreview} fluid/>
                                            <Col>
                                                <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                                <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><ViewsIcon fontSize={"small"}/>1082 &nbsp; <MessageIcon fontSize={"small"}/>24</p>
                                            </Col>
                                        </Row>
                                    </button>
                                    <button type="button" className="list-group-item list-group-item-action">
                                        <Row style={{marginLeft:"1em"}}>
                                            <Image style={{maxWidth: "4em", maxHeight:"4em"}} src={TopImagePreview} fluid/>
                                            <Col>
                                                <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                                <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><ViewsIcon fontSize={"small"}/>1082 &nbsp; <MessageIcon fontSize={"small"}/>24</p>
                                            </Col>
                                        </Row>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
*/}
                <section className="pb-5 pt-2">
                    <div className="container pl-sm-5">
                        <Row>
                            <h5 className="font-weight-light text-left">Живая карта проблем <span
                                className="badge badge-danger">онлайн</span></h5>

                        </Row>


                        <MapContainer center={[50.5952, 36.5800]} zoom={13} className={"mt-4"} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[50.5952, 36.5800]}>
                                <Popup>
                                    A pretty CSS3 popup. <br/> Easily customizable.
                                </Popup>
                            </Marker>
                            {liveMarkers}
                        </MapContainer>
                    </div>
                </section>

                <section className="pb-5 pt-0">
                    <div className="container pl-sm-5">
                        <Row>
                            <h5 className="font-weight-light text-left">Все</h5>
                        </Row>


                        <div className="list-group pt-3">
{/*
                            <button type="button" className="list-group-item list-group-item-action">
                                <Row style={{marginLeft: "1em"}}>
                                    <Image style={{maxWidth: "4em", maxHeight: "4em"}} src={TopImagePreview} fluid/>
                                    <Col>
                                        <p className="text-left" style={{marginBottom: "auto"}}>Когда будет
                                            тратуар?!</p>
                                        <p className="text-left" style={{color: "Silver", fontSize: "smaller"}}>
                                            <ViewsIcon fontSize={"small"}/>1082 &nbsp; <MessageIcon fontSize={"small"}/>24
                                        </p>
                                    </Col>

                                    <PopupState variant="popover" popupId="demo-popup-menu" style={{float: "right"}}>
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
                                                        marginTop: "0.5em"
                                                    }}
                                                    {...bindTrigger(popupState)}
                                                >
                                                    <MoreVertIcon/>
                                                </IconButton>

                                                <Menu {...bindMenu(popupState)}>
                                                    <MenuItem onClick={popupState.close}>Удалить сообщение</MenuItem>
                                                    <MenuItem onClick={popupState.close}>Заблокировать автора</MenuItem>
                                                </Menu>
                                            </React.Fragment>
                                        )}
                                    </PopupState>

                                </Row>
                            </button>
*/}
                            {pageListOrders}


                            <div className={"pt-4"} style={{alignSelf: "center"}}>
                                <Pagination count={paginationParams.count} page={paginationParams.page} onChange={(e, p)=>{setPaginationParams({...paginationParams, ...{page:p}})}} />
                            </div>

                        </div>


                    </div>

                </section>


                <footer className="footer">
                    <div className="footer-left col-md-2 col-sm-6">
                        <h2> POVTAS </h2>
                        <div className="icons">

                            <a href="#"><i><FontAwesomeIcon icon={faVk}/></i></a>
                            <a href="#"><i><FontAwesomeIcon icon={faTelegram}/></i></a>
                            <a href="#"><i><FontAwesomeIcon icon={faDiscord}/></i></a>

                        </div>
                    </div>
                    <div className="footer-center col-md-3 col-sm-6">
                        <h5>Контактные данные</h5>
                        <div>
                            <i><FontAwesomeIcon icon={faMapMarker}/></i>
                            <p><span>г. Белгород, ул. Костюкова 46</span></p>
                        </div>
                        <div>
                            <i><FontAwesomeIcon icon={faPhone}/></i>
                            <p> (+7) 800 555 35 35</p>
                        </div>
                        <div>
                            <i><FontAwesomeIcon icon={faEnvelope}/></i>
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
                    <div className="footer-center col-md-4 col-sm-6">
                        <h5>Подписаться на новостную рассылку</h5>
                        <div style={{maxWidth: "30em"}}><FormControl className={"mt-3 pl-2 pr-2 pt-2"} variant="filled"
                                                                     style={{background: "white"}} fullWidth>
                            <Input
                                id="outlined-adornment-weight"
                                //value={values.weight}
                                //onChange={handleChange('weight')}
                                endAdornment={<InputAdornment position="end"><FontAwesomeIcon
                                    icon={faAt}/></InputAdornment>}
                                placeholder={"ваш электронный адрес"}
                                labelWidth={0}
                            />
                        </FormControl>
                            <Button className={"align-self-end float-right mt-3"}
                                    variant="btn btn-outline-light">Подписаться</Button></div>


                    </div>
                    <p className="name mt-5"> Copyright &copy; ПОВТАС, 2021. Пользовательское соглашение Соглашение об
                        обработке персональных данных. 12+</p>
                </footer>


                <ExampleModalMap/>


            </div>
        </div>
    );
}

export default ProblemsStorePage;
