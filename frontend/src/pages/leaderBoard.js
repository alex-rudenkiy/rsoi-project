import React, {useCallback, useEffect, useState} from "react";
import {Button, Col, Image, Row} from 'react-bootstrap';
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
import Pagination from '@material-ui/lab/Pagination';
import {ExampleModalMap} from '../components/ExempleModalMap.js';
import IconButton from "@material-ui/core/IconButton";
//import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import zvezdi from "../resources/templateImage.png"

import Avatar from "@material-ui/core/Avatar";
import avatar from "../resources/avatar.jpg";
import Badge from "@material-ui/core/Badge";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Card, Icon} from "semantic-ui-react";
import vkIcon from "../resources/vk_icon.svg";
import googleIcon from "../resources/google_icon.svg";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DateRangeIcon from '@material-ui/icons/DateRange';
import HeaderNav from "../components/headerNav";
import useBackendApi from "../logic/BackendApiHook";



function LeaderBoardPage() {

    const mdbreact = require('mdbreact');
    const { MDBModal, MDBModalHeader, MDBModalBody, MDBBtn, MDBModalFooter } = mdbreact;
    var Carousel = require('react-responsive-carousel').Carousel;
    var Blur = require('react-blur').default;

    console.log(zvezdi);

    const {                authentication, registration, fileUpload,
        getUserInfo, checkAuth, logout, postOrder,
        getOrderInfoById, getOrdersByOwnerId,
        getCountOrdersByOwnerId, postComment, getAllOrders,
        getLastCreated, addNewCamera, getCameraInfoById,
        putCamMaskById, updateCameraInfoById, deleteCameraById,
        getAllAppealCategory, updateUserInfo, updateUserPassword,
        oAuthAuthentication, patchOrder, deleteComment, getAllUsers,

    } = useBackendApi();

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

    const [users, setUsers] = useState();

    const updateUsers = useCallback(async () => {
        let result;
        result = (await getAllUsers());
        console.log(result);
        setUsers(result);
        return result;
    },[]);

    useEffect(()=>updateUsers(),[]);

    return (
        <div className="App">







            <div>
                <HeaderNav/>


                {/*<IconButton aria-label="delete">
                    <Image style={{maxWidth: "2em"}} src={MapIcon} fluid/>
                </IconButton>*/}

                {/*Page Content*/}


                <section className="pb-5 pt-4">
                    <div className="container pl-sm-5">
                        <Row>
                            <h5 className="font-weight-light text-left">Общий рейтинг</h5>
                        </Row>


                        <div className="list-group pt-3">

                            {users && users.map(u =>
                                <button type="button" className="list-group-item list-group-item-action">
                                    <Row style={{marginLeft:"1em"}}>

                                        <Avatar alt="Remy Sharp" src={avatar} style={{width:"2em", height:"2em", margin:"auto"}}/>

                                        <Col>
                                            <p className="text-left" style={{    marginBottom: "auto"}}>{`@${u.login}`}</p>
                                            <p className="text-left" style={{color:"Silver",     fontSize: "smaller"}}> {`${u.patronymic} ${u.name}`}
{/*
                                                <DoneAllIcon fontSize={"small"}/>12 исправлений &nbsp; <DateRangeIcon fontSize={"small"}/>156 дней с нами
*/}
                                            </p>

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
                                                        <MenuItem onClick={popupState.close}>Назначить роль</MenuItem>
                                                        <MenuItem onClick={popupState.close}>Заблокировать пользователя</MenuItem>
                                                        <MenuItem onClick={popupState.close}>Удалить пользователя</MenuItem>
                                                    </Menu>
                                                </React.Fragment>
                                            )}
                                        </PopupState>

                                    </Row>
                                </button>
                            )}

                            <div className={"pt-4"} style={{alignSelf: "center"}}>
                                <Pagination count={10} page={0} />
                            </div>

                        </div>



                    </div>

                </section>


























                <footer className="footer" style={{position: 'absolute', bottom: '0px'}}>
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
