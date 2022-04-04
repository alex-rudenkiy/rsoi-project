import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import TextField from "@material-ui/core/TextField";
import 'video-react/dist/video-react.css'; // import css
import {Menu, Segment} from "semantic-ui-react";
import HeaderNav from "../components/headerNav";
import Card from "@material-ui/core/Card";
import useBackendApi from "../logic/BackendApiHook";
import Form from 'react-bootstrap/Form';
import {Col, Row} from "react-bootstrap";
import Button from "@material-ui/core/Button";


function SettingsPage() {
    const {
        authentication, registration, fileUpload,
        getUserInfo, checkAuth, logout, postOrder,
        getOrderInfoById, getOrdersByOwnerId,
        getCountOrdersByOwnerId, postComment, getAllOrders,
        getLastCreated, addNewCamera, getCameraInfoById,
        putCamMaskById, updateCameraInfoById, deleteCameraById,
        getAllAppealCategory, updateUserInfo
    } = useBackendApi();

    const [activeItem, setActiveItem] = useState("Основные данные");
    const [userInfo, setUserInfo] = useState({});

    useEffect(async () => {
        setUserInfo((await getUserInfo()).data);
    },[]);

    useEffect(() => {console.log(userInfo.login)},[userInfo]);

    const handleItemClick = function (e, {name}) {setActiveItem(name)};



    return (
        <div className="App">
{/*
            <RegistrationCarousel/>
*/}
            <div>
                <HeaderNav/>

                {/*Page Content*/}
                <section className="pb-5 pt-5">
                    <div className="container pl-sm-5">

                        <div className="row">

                            <div className="col-2 px-5">
                                <h3 className={"text-left"}>Настройки</h3>
                                <Menu secondary vertical>
                                    <Menu.Item
                                        name='Основные данные'
                                        active={activeItem === 'Основные данные'}
                                        onClick={handleItemClick}
                                        className={"text-left"}
                                    />
                                    <Menu.Item
                                        name='Социальные сети'
                                        active={activeItem === 'Социальные сети'}
                                        onClick={handleItemClick}
                                        className={"text-left"}
                                    />
                                    <Menu.Item
                                        name='Безопасность'
                                        active={activeItem === 'Безопасность'}
                                        onClick={handleItemClick}
                                        className={"text-left"}
                                    />
                                    <br/>
                                    <Menu.Item
                                        name='Удалить аккаунт'
                                        active={activeItem === 'Удалить аккаунт'}
                                        onClick={handleItemClick}
                                        className={"text-left"}
                                    />

                                </Menu>

                            </div>

                            <div className="col-10">

                                <Card className={"w-100 p-4"} style={{minHeight:"30em", height:"20em", display: activeItem === 'Основные данные'? "block" : "none"}}>
                                    <h5 style={{display:"flex"}}>Основные данные</h5>
                                    <Form>
                                        <Form.Group as={Row} controlId="formPlaintextLogin">
                                            <Form.Label column sm="2">
                                                Логин
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control plaintext defaultValue={userInfo.login} style={{display:"flex", width:"16em"}} onChange={(e)=>setUserInfo({...userInfo, ...{"login":e.target.value}})}/>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextSurname">
                                            <Form.Label column sm="2">
                                                Фамилия
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control plaintext defaultValue={userInfo.surname} style={{display:"flex", width:"16em"}} onChange={(e)=>setUserInfo({...userInfo, ...{"login":e.target.value}})}/>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextName">
                                            <Form.Label column sm="2">
                                                Имя
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control plaintext defaultValue={userInfo.name} style={{display:"flex", width:"16em"}} onChange={(e)=>setUserInfo({...userInfo, ...{"login":e.target.value}})}/>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextPatronymic">
                                            <Form.Label column sm="2">
                                                Отчество
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control plaintext defaultValue={userInfo.patronymic} style={{display:"flex", width:"16em"}} onChange={(e)=>setUserInfo({...userInfo, ...{"login":e.target.value}})}/>
                                            </Col>
                                        </Form.Group>
                                        <Button className={"mt-2"} variant="contained" color="primary" style={{display:"flex"}} onClick={()=>updateUserInfo(userInfo)}>Сохранить изменения</Button>

                                    </Form>
                                </Card>
                                <Card className={"w-100"} style={{minHeight:"30em", display: activeItem === 'Социальные сети'? "block" : "none"}}>
                                    <p style={{display:"flex"}}>Социальные сети</p>
                                </Card>
                                <Card className={"w-100 p-4"} style={{minHeight:"30em", display: activeItem === 'Безопасность'? "block" : "none"}}>
                                    <h5 style={{display:"flex"}}>Безопасность</h5>
                                    <Form>
                                        <Form.Group as={Row} controlId="formPlaintextOldPassword">
                                            <Form.Label column sm="2">
                                                Старый пароль
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control type="password" defaultValue={userInfo.login} style={{display:"flex", width:"16em"}} onChange={(e)=>setUserInfo({...userInfo, ...{"oldPassword":e.target.value}})}/>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextNewPassword">
                                            <Form.Label column sm="2">
                                                Новый пароль
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control type="password" defaultValue={userInfo.login} style={{display:"flex", width:"16em"}} onChange={(e)=>setUserInfo({...userInfo, ...{"newPassword":e.target.value}})}/>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextRepeatNewPassword">
                                            <Form.Label column sm="2">
                                                Новый пароль
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control type="password" defaultValue={userInfo.login} style={{display:"flex", width:"16em"}}/>
                                            </Col>
                                        </Form.Group>
                                        <Button className={"mt-2"} variant="contained" color="primary" style={{display:"flex"}}>Сменить пароль</Button>

                                    </Form>

                                </Card>
                                <Card className={"w-100"} style={{minHeight:"30em", display: activeItem === 'Удалить аккаунт'? "block" : "none"}}>
                                    <p style={{display:"flex"}}>Удалить аккаунт</p>
                                </Card>
                            </div>




                        </div>

                    </div>
                </section>






            </div>
        </div>
    );
}

export default SettingsPage;
