import React, {useEffect, useRef, useState} from "react";
import {Col, Image, Modal, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import FormControl from "@material-ui/core/FormControl";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDiscord, faTelegram, faVk} from '@fortawesome/free-brands-svg-icons'
import {faAt, faMapMarker, faPhone} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import HeaderNav from "../components/headerNav";
import useBackendApi from "../logic/BackendApiHook";
import ListItem from "@material-ui/core/ListItem";
import AddIcon from '@material-ui/icons/Add';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import {ReactSketchCanvas} from "react-sketch-canvas";
import TextField from "@material-ui/core/TextField";
import {EditableOpenMap} from "../components/Openmap";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {Dropdown, Header, Icon, Placeholder, Segment} from "semantic-ui-react";
import {Alert, AlertTitle} from "@material-ui/lab";
import SaveIcon from '@material-ui/icons/Save';
import ControlledAccordions from "../components/ControlledAccordions";

function WebcamControl() {
    // require('react-responsive-carousel').Carousel;
    const {
        getUserInfo, addNewCamera, getCameraInfoById,
        putCamMaskById, updateCameraInfoById, deleteCameraById
    } = useBackendApi();
    const [show, setShow] = useState(false);
    const [changedAddress, setChangedAddress] = useState("");
    const [textFieldsData, setTextFieldsData] = useState({});
    const [currentCamera, setCurrentCamera] = useState();
    const [listUserCameras, setListUserCameras] = useState();
    const [listTriggeredFrames, setListTriggeredFrames] = useState();
    const [lastFrame, setLastFrame] = useState();
    const [mask, setMask] = useState();
    const [forceRefresh, setForceRefresh] = useState(false);

    const [redrawer, setRedrawer] = useState();

    const refContainer = useRef(null);

    useEffect(()=>{

        setTextFieldsData({...textFieldsData, ...{"geoPosition": {"fullname":changedAddress.display_name, "lat":changedAddress.lat, "lon":changedAddress.lon}}})

    },[changedAddress]);

    const sendMaskForCameraWithId = function(camid){
        const axios = require('axios').default;
        refContainer.current.exportImage("png").then(d => {
            console.log(d);

            const formData = new FormData();
            formData.append('token', '');
            formData.append('fileType', "mask");
            formData.append('file', dataURIToBlob(d));
            axios({
                url: 'http://localhost:8888/file',
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }).then(r=>putCamMaskById(camid,r.data.fileFakeName));
            //.data.fileFakeName);
        });
    };

    const dataURIToBlob = function (dataURI) {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
    }


    useEffect(()=>{
        if(currentCamera!==undefined) {
            setShow(false);
            setTextFieldsData({});

            console.log("interval start");

            const redraw = function () {
                console.log("lol " + currentCamera.id);
                getCameraInfoById(currentCamera.id).then(e => {
                    console.log(e);

                    //{title:"Спалили", subTitle: r.createdAt, description:{<p>lol</p>}}
                    /*setListTriggeredFrames(e.triggeredFrames.map(r=>{
                        const labelId = `checkbox-list-secondary-${r.id}`;
                        return (
                            <ListItem key={r} button>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Avatar n°${r.id + 1}`}
                                        /!*
                                                                                src={`/static/images/avatar/${value + 1}.jpg`}
                                        *!/
                                    />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={`Line item ${r.id}`} />

                            </ListItem>
                        );}
                        )
                    );
*/
                    setListTriggeredFrames(
                        <ControlledAccordions
                            dataSource={
                                Array.from(e.triggeredFrames).map(t=>(
                                    {
                                        heading:<p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16" className="mx-3">>
                                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                <path
                                                    d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                                            </svg>
                                            Снимок зафиксированного возможного нарушения</p>,
                                        secondaryHeading: t.createdAt,
                                        description:
                                            <div>

                                            <Image src={t&&`http:\\\\localhost:8888\\file\\preview\\${t}`}
                                                   style={{width:"100%"}}/>
                                        </div>}))}>
                        </ControlledAccordions>
                    );



                    setLastFrame(e.lastFrame!=null?<Image
                        style={{width: "inherit",     height: "100%"}}
                        key={new Date().getTime()}
                        src={e.lastFrame&&`http:\\\\localhost:8888\\file\\preview\\${e.lastFrame}?random=${new Date().getTime()}`}></Image>:
                        //<p>Stream is failed!</p>
                        <Placeholder style={{margin: "auto",  marginBottom: "2em"}}>
                            <Placeholder.Image rectangular />
                        </Placeholder>
                    );
                    /*setMask(e.lastFrame!=null?<ReactSketchCanvas
                            style={{width: "inherit"}}
                            background={e.lastFrame&&`http:\\\\localhost:8888\\file\\preview\\${e.lastFrame}`}
                            width="600"
                            height="400"
                            strokeWidth={4}
                            strokeColor="red"
                        />:<p>Mask not drawed!</p>
                    );*/
                })}

                if(redrawer!=null){
                    clearInterval(redrawer)
                }
            setRedrawer(setInterval(
                redraw
                , 1000));

            setMask(currentCamera.lastFrame!=null?<div     style={{width: "inherit", height:"100%"}}><ReactSketchCanvas
                    style={{width: "inherit", height:"100%"}}
                    width={640}
                    height={320}
                    //background={`background: url("http://localhost:8888/file/preview/cameraid_31_lastframe.jpg")`}
                    key={new Date().getTime()}
                    background={`no-repeat scroll top / cover url(http://localhost:8888/file/preview/${currentCamera.lastFrame}?random=${new Date().getTime()})`}
                    ref={refContainer}
                    strokeWidth={4}
                    strokeColor="black"
                />
                    {/* eslint-disable-next-line react/jsx-no-undef */}

            </div>:<Placeholder  style={{margin: "auto",  marginBottom: "2em"}}>
                    <Placeholder.Image rectangular />
                </Placeholder>//<p>Mask not drawed!</p>
            );
            //clearInterval(interval); // thanks @Luca D'Amico
        }

    },[currentCamera])

    useEffect(async ()=>{
        const u = (await getUserInfo()).data;


        setListUserCameras(u.selfCameras.map(c=>{
            const labelId = `checkbox-list-secondary-label-${c.id}`;
            var a = document.createElement('a');
            a.href = c.ip;

            // ['href','protocol','host','hostname','port','pathname','search','hash'].forEach(function(k) {
            //     console.log(k+':', a["hostname"]);
            // });

            return (
                <ListItem key={c.id} button onClick={()=>setCurrentCamera(c)}>
                    <ListItemAvatar>
                        <Avatar
                            alt={`Avatar n°${c.id + 1}`}
                            /*
                                                                    src={`/static/images/avatar/${value + 1}.jpg`}
                            */
                        />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={a["hostname"]} />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="delete">
                            <DeleteIcon fontSize="small" onClick={()=>deleteCameraById(c.id)} />
                        </IconButton>
                        <Checkbox
                            edge="end"

                            onChange={(e,k)=>{
                                updateCameraInfoById(c.id, {enabled:k});
                                setForceRefresh(true);
                            }}


                            checked={c.enabled}
                            inputProps={{ 'aria-labelledby': labelId }}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            );}));
        setForceRefresh(false);
    },[forceRefresh]);





    return (

        <div className="App">


            <div>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show = {show}
                    style={{zIndex: 10000}}
                    onClose={()=>setShow(false)}
                    onHide={()=>setShow(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Добавление новой камеры
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Основные данные</h4>
                        <p>
                            Для добавления камеры вам необходимо правильно указать её rtsp адрес, в случае если камера находится в локальной сети без статического адреса, то вы можете подключиться к нашему ipcam vpn pool.
                        </p>
                        <TextField
                            id="outlined-basic"
                            value={textFieldsData.ip}
                            label="rtsp://admin:12345@192.168.1.210:554/Streaming/Channels/101"
                            variant="outlined"
                            onChange={
                                e=>setTextFieldsData({...textFieldsData, ...{"ip": e.target.value}})
                            }
                            fullWidth={true}
                        />
                        <Dropdown
                            className={"mt-2"}
                            placeholder='Режим работы'
                            search selection
                            options={[{key:0, text:"Моментальная фиксация", value:0}, {key:1, text:"Фиксация с пятиминутной задержкой", value:1}]}
                            onChange={(event, data)=>{
                                setTextFieldsData({...textFieldsData, ...{"triggeringMode": data.value}})
                            }}
                            style={{position: "relative", zIndex:100}}
                        />
                        <Alert className={"mb-3 mt-3"} severity="success" style={{textAlign: "left", width: "100%"}}>
                            <AlertTitle>Подсказка</AlertTitle>
                            <p>
                                Режим <strong style={{color:"#4e96ce"}}>моментальная фиксация</strong> подразумевает под собой режим при котором,
                            если автомобиль появляется два раза подряд в выделенной области с интервалом 10 секунд, то сообщение отправляется в ГИБДД (с предварительной модерацией).
                           </p>
                            <p>
                            Режим <strong style={{color:"#4e96ce"}}>фиксация с пятиминутной задержкой</strong> подразумевает под собой режим при котором,
                            если автомобиль появляется два раза подряд в выделенной области в интервале пяти минут, то сообщение отправляется в ГИБДД
                            (с предварительной модерацией) и эвакуаторным службам (без модерации).</p>
                        </Alert>

                        <h4>Географическое расположение камеры</h4>
                        {/*<p className={'text-left'}>{changedAddress.display_name}</p>*/}

                        <div data-content="The default theme's basic popup removes the pointing arrow."
                             data-variation="basic"
                             style={{position: "relative", zIndex:0}}>
                            <EditableOpenMap setChangedAddress={setChangedAddress}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>addNewCamera({...textFieldsData, ...changedAddress}).then(e => setCurrentCamera(e))}>Добавить</Button>
                    </Modal.Footer>
                </Modal>

                <HeaderNav/>

<Row>
    <Col sm={4} md={4} lg={4} xl={2}>
        <section className="pb-5 mt-4 pl-4">
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Доступные действия
                    </ListSubheader>
                }
            >

                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    startIcon={<AddIcon />}
                    onClick={()=>setShow(true)}
                    fullWidth={true}
                >

                    Добавить камеру
                </Button>

                <Alert severity="warning" style={{textAlign: "left", width: "100%"}}>
                    <AlertTitle>Рекомендация</AlertTitle>
                    <p>
                        Если ваша камера не работает или вы не выделили на ней область для мониторинга, пожалуйста <strong style={{color:"rgb(102, 60, 0) "}}>снимите с неё галочку</strong>,
                        либо удалите, чтобы лишний раз не нагружать ресурсы нашей системы.
                    </p>
                </Alert>

            </List>

            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Мои камеры
                    </ListSubheader>
                }
            >
                {listUserCameras}




            </List>

        </section>
    </Col>
    <Col className={"mr-5"} >
        {currentCamera!=null?
            <div><Card>
                <Row>
                <AppBar className={"mb-3"} position="static"  elevation={0}>
                    <Toolbar>
                        <Typography variant="h6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-camera-reels-fill" viewBox="0 0 16 16" className={"mx-3"}>
                                <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                <path
                                    d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7z"/>
                            </svg>

                            Camera #{currentCamera.id} ({currentCamera.ip})
                        </Typography>
                    </Toolbar>
                </AppBar>
        </Row>
            <Row >
                <Col>
                    {lastFrame}
                </Col>
                <Col>
                    <Alert severity="info" style={{textAlign: "left", width: "100%",
                        position: "absolute",
                        background: "#ffffffba",
                        borderRadius: "0",
                        paddingRight: "4em"}}>
                        <AlertTitle>Подсказка</AlertTitle>
                        <p>
                            В данном окне вы можете <strong style={{color:"#4e96ce"}}>аккуратно обвести</strong> ту область, за которой наша система будет следить и фиксировать, находится ли машина на ней или нет.
                        </p>
                    </Alert>
                    {mask}

                </Col>

            </Row></Card>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>sendMaskForCameraWithId(currentCamera.id)}
                    startIcon={<SaveIcon />}
                    style={{display: "flex", marginTop:"1em", marginRight:"1em", marginLeft:"auto"}}
                >
                    Сохранить маску
                </Button>


                <Row>
                    <Typography variant="subtitle1" gutterBottom>
                        Сводка зафиксированных нарушений
                    </Typography>
                </Row>


                {
                    listTriggeredFrames

                }</div>:
            <Segment placeholder style={{height: "100%"}}>
                <Header icon>
                    <Icon  name='camera' />

                    Пожалуйста добавьте или выберите IP камеру.
                </Header>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={()=>setShow(true)}
                    fullWidth={false}
                    style={{width: "fit-content",
                        alignSelf: "center"}}
                    disableRipple={true}
                >
                    Добавить новую камеру
                </Button>
            </Segment>

            }

    </Col>

</Row>
                {/*<div className={"my-auto"}>
                    <AddAPhotoIcon/>
                    <p>Пожалуйста добавьте или выберите видеокамеру!</p>
                </div>*/}


                {/* <section className="pb-5 pt-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <div className="container pl-sm-5 text-left">

                                    <p>Описание</p>
                                    <h5>{userInfo&&userInfo.description}</h5>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="container pl-sm-5 text-left">
                                    <p>Галерея</p>

                                    <div style={{width:"inherit"}}>
                                        <Carousel showArrows={true}  >
                                            <div>
                                                <img src={templateImage} />
                                                <p className="legend">Legend 1</p>
                                            </div>
                                            <div>
                                                <img src={templateImage} />
                                                <p className="legend">Legend 1</p>
                                            </div>
                                            <div>
                                                <img src={templateImage} />
                                                <p className="legend">Legend 1</p>
                                            </div>
                                            <div>
                                                <img src={templateImage} />
                                                <p className="legend">Legend 1</p>
                                            </div>
                                            <div>
                                                <img src={templateImage} />
                                                <p className="legend">Legend 1</p>
                                            </div>
                                        </Carousel>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </section>*/}



                <footer style={{    marginTop: "15em"}} className="footer">
                    <div className="footer-left col-md-2 col-sm-6">
                        <h2> IU7Studio </h2>
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
                            <p><span>г. Москва, ул. Бауманская, д. 46</span></p>
                        </div>
                        <div>
                            <i><FontAwesomeIcon icon={faPhone}/></i>
                            <p> (+7) 800 555 35 35</p>
                        </div>
                        <div>
                            <i><FontAwesomeIcon icon={faEnvelope}/></i>
                            <p><a href="#"> alex-rudenkiy@bmstu.edu</a></p>
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
                    <p className="name mt-5"> Copyright &copy; ИУ7, 2021. Пользовательское соглашение Соглашение об
                        обработке персональных данных. 12+</p>
                </footer>


            </div>
        </div>
    );
}

export default WebcamControl;
