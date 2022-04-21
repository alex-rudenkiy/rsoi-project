import logo from '../resources/easylogo.svg';
import React from "react";
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
import TopImagePreview from "../resources/topImagePreview.png";
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
import ViewsIcon from '@material-ui/icons/Visibility';
import MessageIcon from '@material-ui/icons/Message';
import Typography from "@material-ui/core/Typography";
import Pagination from '@material-ui/lab/Pagination';
import {ExampleModalMap} from '../components/ExempleModalMap.js';
import Modal from "react-bootstrap/Modal";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import IconButton from "@material-ui/core/IconButton";
import MapIcon from "../resources/map_icon.svg";
//import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import zvezdi from "../resources/templateImage.png"
import okIcon from "../resources/ok.svg"

import templateImage from "../resources/topImagePreview.png";
import CarouselPage from "../components/CarouselPage";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../resources/avatar.jpg";
import Badge from "@material-ui/core/Badge";
import { Alert, AlertTitle } from '@material-ui/lab';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import SendIcon from '@material-ui/icons/Send';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';
import {Card, Icon} from "semantic-ui-react";
import vkIcon from "../resources/vk_icon.svg";
import googleIcon from "../resources/google_icon.svg";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DateRangeIcon from '@material-ui/icons/DateRange';
import HeaderNav from "../components/headerNav";

function LeaderBoardPage() {

    const mdbreact = require('mdbreact');
    const { MDBModal, MDBModalHeader, MDBModalBody, MDBBtn, MDBModalFooter } = mdbreact;
    var Carousel = require('react-responsive-carousel').Carousel;
    var Blur = require('react-blur').default;

    console.log(zvezdi);

    const CardExampleCard = () => (
        <Card>
            <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                {(popupState) => (
                    <React.Fragment>

                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                            {...bindTrigger(popupState)}
                        >
                            <MoreVertIcon />
                        </IconButton>

                        <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={popupState.close}>Удалить сообщение</MenuItem>
                            <MenuItem onClick={popupState.close}>Заблокировать автора</MenuItem>
                        </Menu>
                    </React.Fragment>
                )}
            </PopupState>

            <Card.Content>
                <Badge
                    className={"mb-3"}
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={<Row><IconButton style={{width:"1em", height:"1em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                        <Image src={vkIcon} style={{width:"2em"}}/>
                    </IconButton><IconButton style={{width:"1em", height:"1em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                        <Image src={googleIcon} style={{width:"2em"}}/>
                    </IconButton></Row>
                    }
                >
                    <Avatar alt="Remy Sharp" src={avatar} style={{width:"5em", height:"5em", margin:"auto"}}/>
                </Badge>

                <Card.Header>Matthew</Card.Header>
                <Card.Meta>

                                    <p className={"mt-2"} style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                </Card.Meta>
{/*
                <Card.Description>
                    Matthew is a musician living in Nashville.
                </Card.Description>
*/}
            </Card.Content>
{/*
            <Card.Content extra>
                <a>
                    <Icon name='user' />
                    22 Friends
                </a>
            </Card.Content>
*/}
        </Card>
    )


    return (
        <div className="App">







            <div>
                <HeaderNav/>


                {/*<IconButton aria-label="delete">
                    <Image style={{maxWidth: "2em"}} src={MapIcon} fluid/>
                </IconButton>*/}

                {/*Page Content*/}


                <section className="pb-3 pt-0">
                    <div className="container pl-sm-5">
                        <Row>
                            <h5 className="font-weight-light text-left">Лучшие за всё время</h5>
                        </Row>

                        <Row className={"align-items-stretch mt-3"}>
                            <Col>

<CardExampleCard/>
                            </Col>
                            <Col>
                                <CardExampleCard/>
                            </Col>
                            <Col>
                                <CardExampleCard/>
                            </Col>

                        </Row>
                    </div>
                </section>

                <section className="pb-5 pt-3">
                    <div className="container pl-sm-5">
                        <div className="row">

                            <div className="col-6">
                                <Row>
                                    <h5 className="font-weight-light text-left">Лучшие за последний год</h5>
                                </Row>


                                <div className="list-group pt-2">
                                    <button type="button" className="list-group-item list-group-item-action">
                                        <Row style={{marginLeft:"1em"}}>

                                            <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                            <Col>
                                                <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                                <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                            </Col>
                                            <div className="col-2">
                                                <div style={{float:"right", alignSelf: "center"}}>
                                                    <IconButton style={{width:"1em", height:"1em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                        <Image src={vkIcon} style={{width:"2em"}}/>
                                                    </IconButton><IconButton style={{width:"1em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                    <Image src={googleIcon} style={{width:"2em"}}/>
                                                </IconButton>
                                                </div>
                                            </div>





                                            <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                                {(popupState) => (
                                                    <React.Fragment>

                                                        <IconButton
                                                            aria-label="more"
                                                            aria-controls="long-menu"
                                                            aria-haspopup="true"
                                                            style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                            {...bindTrigger(popupState)}
                                                        >
                                                            <MoreVertIcon />
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
                                    <button type="button" className="list-group-item list-group-item-action">
                                        <Row style={{marginLeft:"1em"}}>

                                            <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                            <Col>
                                                <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                                <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                            </Col>
                                            <div className="col-2">
                                                <div style={{float:"right", alignSelf: "center"}}>
                                                    <IconButton style={{width:"1em", height:"1em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                        <Image src={vkIcon} style={{width:"2em"}}/>
                                                    </IconButton><IconButton style={{width:"1em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                    <Image src={googleIcon} style={{width:"2em"}}/>
                                                </IconButton>
                                                </div>
                                            </div>





                                            <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                                {(popupState) => (
                                                    <React.Fragment>

                                                        <IconButton
                                                            aria-label="more"
                                                            aria-controls="long-menu"
                                                            aria-haspopup="true"
                                                            style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                            {...bindTrigger(popupState)}
                                                        >
                                                            <MoreVertIcon />
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
                                    <button type="button" className="list-group-item list-group-item-action">
                                        <Row style={{marginLeft:"1em"}}>

                                            <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                            <Col>
                                                <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                                <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                            </Col>
                                            <div className="col-2">
                                                <div style={{float:"right", alignSelf: "center"}}>
                                                    <IconButton style={{width:"1em", height:"1em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                        <Image src={vkIcon} style={{width:"2em"}}/>
                                                    </IconButton><IconButton style={{width:"1em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                    <Image src={googleIcon} style={{width:"2em"}}/>
                                                </IconButton>
                                                </div>
                                            </div>





                                            <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                                {(popupState) => (
                                                    <React.Fragment>

                                                        <IconButton
                                                            aria-label="more"
                                                            aria-controls="long-menu"
                                                            aria-haspopup="true"
                                                            style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                            {...bindTrigger(popupState)}
                                                        >
                                                            <MoreVertIcon />
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

                                </div>

                            </div>
                            <div className="col-6">
                                <Row>
                                    <h5 className="font-weight-light text-left">Лучшие за последний месяц</h5>
                                </Row>

                                <div className="list-group pt-2">
                                    <button type="button" className="list-group-item list-group-item-action">
                                        <Row style={{marginLeft:"1em"}}>

                                            <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                            <Col>
                                                <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                                <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                            </Col>
                                            <div className="col-2">
                                                <div style={{float:"right", alignSelf: "center"}}>
                                                    <IconButton style={{width:"1em", height:"1em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                        <Image src={vkIcon} style={{width:"2em"}}/>
                                                    </IconButton><IconButton style={{width:"1em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                    <Image src={googleIcon} style={{width:"2em"}}/>
                                                </IconButton>
                                                </div>
                                            </div>





                                            <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                                {(popupState) => (
                                                    <React.Fragment>

                                                        <IconButton
                                                            aria-label="more"
                                                            aria-controls="long-menu"
                                                            aria-haspopup="true"
                                                            style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                            {...bindTrigger(popupState)}
                                                        >
                                                            <MoreVertIcon />
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
                                    <button type="button" className="list-group-item list-group-item-action">
                                        <Row style={{marginLeft:"1em"}}>

                                            <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                            <Col>
                                                <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                                <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                            </Col>
                                            <div className="col-2">
                                                <div style={{float:"right", alignSelf: "center"}}>
                                                    <IconButton style={{width:"1em", height:"1em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                        <Image src={vkIcon} style={{width:"2em"}}/>
                                                    </IconButton><IconButton style={{width:"1em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                    <Image src={googleIcon} style={{width:"2em"}}/>
                                                </IconButton>
                                                </div>
                                            </div>





                                            <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                                {(popupState) => (
                                                    <React.Fragment>

                                                        <IconButton
                                                            aria-label="more"
                                                            aria-controls="long-menu"
                                                            aria-haspopup="true"
                                                            style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                            {...bindTrigger(popupState)}
                                                        >
                                                            <MoreVertIcon />
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
                                    <button type="button" className="list-group-item list-group-item-action">
                                        <Row style={{marginLeft:"1em"}}>

                                            <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                            <Col>
                                                <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                                <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                            </Col>
                                            <div className="col-2">
                                                <div style={{float:"right", alignSelf: "center"}}>
                                                    <IconButton style={{width:"1em", height:"1em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                        <Image src={vkIcon} style={{width:"2em"}}/>
                                                    </IconButton><IconButton style={{width:"1em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                    <Image src={googleIcon} style={{width:"2em"}}/>
                                                </IconButton>
                                                </div>
                                            </div>





                                            <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                                {(popupState) => (
                                                    <React.Fragment>

                                                        <IconButton
                                                            aria-label="more"
                                                            aria-controls="long-menu"
                                                            aria-haspopup="true"
                                                            style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                            {...bindTrigger(popupState)}
                                                        >
                                                            <MoreVertIcon />
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

                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                    <section className="pb-5 pt-0">
                    <div className="container pl-sm-5">
                        <Row>
                            <h5 className="font-weight-light text-left">Общий рэйтинг</h5>
                        </Row>


                            <div className="list-group pt-3">
                                <button type="button" className="list-group-item list-group-item-action">
                                    <Row style={{marginLeft:"1em"}}>

                                            <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                        <Col>
                                            <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                            <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                        </Col>
<Col>
    <div style={{float:"right", alignSelf: "center"}}>
        <IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
            <Image src={vkIcon} style={{width:"2em"}}/>
        </IconButton><IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
        <Image src={googleIcon} style={{width:"2em"}}/>
    </IconButton>
    </div>
</Col>





                                        <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                            {(popupState) => (
                                                <React.Fragment>

                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                        {...bindTrigger(popupState)}
                                                    >
                                                        <MoreVertIcon />
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
                                <button type="button" className="list-group-item list-group-item-action">
                                    <Row style={{marginLeft:"1em"}}>

                                        <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                        <Col>
                                            <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                            <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                        </Col>
                                        <Col>
                                            <div style={{float:"right", alignSelf: "center"}}>
                                                <IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                    <Image src={vkIcon} style={{width:"2em"}}/>
                                                </IconButton><IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                <Image src={googleIcon} style={{width:"2em"}}/>
                                            </IconButton>
                                            </div>
                                        </Col>





                                        <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                            {(popupState) => (
                                                <React.Fragment>

                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                        {...bindTrigger(popupState)}
                                                    >
                                                        <MoreVertIcon />
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
                                <button type="button" className="list-group-item list-group-item-action">
                                    <Row style={{marginLeft:"1em"}}>

                                        <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                        <Col>
                                            <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                            <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                        </Col>
                                        <Col>
                                            <div style={{float:"right", alignSelf: "center"}}>
                                                <IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                    <Image src={vkIcon} style={{width:"2em"}}/>
                                                </IconButton><IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                <Image src={googleIcon} style={{width:"2em"}}/>
                                            </IconButton>
                                            </div>
                                        </Col>





                                        <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                            {(popupState) => (
                                                <React.Fragment>

                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                        {...bindTrigger(popupState)}
                                                    >
                                                        <MoreVertIcon />
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
                                <button type="button" className="list-group-item list-group-item-action">
                                    <Row style={{marginLeft:"1em"}}>

                                        <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                        <Col>
                                            <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                            <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                        </Col>
                                        <Col>
                                            <div style={{float:"right", alignSelf: "center"}}>
                                                <IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                    <Image src={vkIcon} style={{width:"2em"}}/>
                                                </IconButton><IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                <Image src={googleIcon} style={{width:"2em"}}/>
                                            </IconButton>
                                            </div>
                                        </Col>





                                        <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                            {(popupState) => (
                                                <React.Fragment>

                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                        {...bindTrigger(popupState)}
                                                    >
                                                        <MoreVertIcon />
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
                                <button type="button" className="list-group-item list-group-item-action">
                                    <Row style={{marginLeft:"1em"}}>

                                        <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                        <Col>
                                            <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                            <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                        </Col>
                                        <Col>
                                            <div style={{float:"right", alignSelf: "center"}}>
                                                <IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                    <Image src={vkIcon} style={{width:"2em"}}/>
                                                </IconButton><IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                <Image src={googleIcon} style={{width:"2em"}}/>
                                            </IconButton>
                                            </div>
                                        </Col>





                                        <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                            {(popupState) => (
                                                <React.Fragment>

                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                        {...bindTrigger(popupState)}
                                                    >
                                                        <MoreVertIcon />
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
                                <button type="button" className="list-group-item list-group-item-action">
                                    <Row style={{marginLeft:"1em"}}>

                                        <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                        <Col>
                                            <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                            <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                        </Col>
                                        <Col>
                                            <div style={{float:"right", alignSelf: "center"}}>
                                                <IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                    <Image src={vkIcon} style={{width:"2em"}}/>
                                                </IconButton><IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                <Image src={googleIcon} style={{width:"2em"}}/>
                                            </IconButton>
                                            </div>
                                        </Col>





                                        <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                            {(popupState) => (
                                                <React.Fragment>

                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                        {...bindTrigger(popupState)}
                                                    >
                                                        <MoreVertIcon />
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
                                <button type="button" className="list-group-item list-group-item-action">
                                    <Row style={{marginLeft:"1em"}}>

                                        <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                        <Col>
                                            <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                            <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                        </Col>
                                        <Col>
                                            <div style={{float:"right", alignSelf: "center"}}>
                                                <IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                    <Image src={vkIcon} style={{width:"2em"}}/>
                                                </IconButton><IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                <Image src={googleIcon} style={{width:"2em"}}/>
                                            </IconButton>
                                            </div>
                                        </Col>





                                        <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                            {(popupState) => (
                                                <React.Fragment>

                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                        {...bindTrigger(popupState)}
                                                    >
                                                        <MoreVertIcon />
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
                                <button type="button" className="list-group-item list-group-item-action">
                                    <Row style={{marginLeft:"1em"}}>

                                        <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                        <Col>
                                            <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                            <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                        </Col>
                                        <Col>
                                            <div style={{float:"right", alignSelf: "center"}}>
                                                <IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                    <Image src={vkIcon} style={{width:"2em"}}/>
                                                </IconButton><IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                <Image src={googleIcon} style={{width:"2em"}}/>
                                            </IconButton>
                                            </div>
                                        </Col>





                                        <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                            {(popupState) => (
                                                <React.Fragment>

                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                        {...bindTrigger(popupState)}
                                                    >
                                                        <MoreVertIcon />
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
                                <button type="button" className="list-group-item list-group-item-action">
                                    <Row style={{marginLeft:"1em"}}>

                                        <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                        <Col>
                                            <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                            <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                        </Col>
                                        <Col>
                                            <div style={{float:"right", alignSelf: "center"}}>
                                                <IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                    <Image src={vkIcon} style={{width:"2em"}}/>
                                                </IconButton><IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                <Image src={googleIcon} style={{width:"2em"}}/>
                                            </IconButton>
                                            </div>
                                        </Col>





                                        <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                            {(popupState) => (
                                                <React.Fragment>

                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                        {...bindTrigger(popupState)}
                                                    >
                                                        <MoreVertIcon />
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
                                <button type="button" className="list-group-item list-group-item-action">
                                    <Row style={{marginLeft:"1em"}}>

                                        <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                        <Col>
                                            <p className="text-left" style={{    marginBottom: "auto"}}>Когда будет тратуар?!</p>
                                            <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}><DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами</p>

                                        </Col>
                                        <Col>
                                            <div style={{float:"right", alignSelf: "center"}}>
                                                <IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                    <Image src={vkIcon} style={{width:"2em"}}/>
                                                </IconButton><IconButton style={{width:"1.5em", height:"1.5em", padding:"0"}} color="primary" aria-label="add to shopping cart">
                                                <Image src={googleIcon} style={{width:"2em"}}/>
                                            </IconButton>
                                            </div>
                                        </Col>





                                        <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>

                                            {(popupState) => (
                                                <React.Fragment>

                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        style={{ width: "1.5em", height: "1.5em", marginRight:"1em", marginTop:"0em"}}
                                                        {...bindTrigger(popupState)}
                                                    >
                                                        <MoreVertIcon />
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


                                <div className={"pt-4"} style={{alignSelf: "center"}}>
                                    <Pagination count={10} page={0} />
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

export default LeaderBoardPage;
