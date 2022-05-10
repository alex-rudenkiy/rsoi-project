import React, {useEffect, useState} from "react";
import {Button, Col, Image, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import * as _ from 'lodash';

import TextField from "@material-ui/core/TextField";
import {Reveal, Step} from 'semantic-ui-react'
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import CallIcon from '@material-ui/icons/Call';
import {useDropzone} from 'react-dropzone';
import 'react-dropzone/examples/theme.css';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Modal from "react-bootstrap/Modal";
import HeaderNav from "../components/headerNav";
import {EditableOpenMap} from "../components/Openmap";
import Alert from "react-bootstrap/Alert";
import {SelectableHorizontalGallery} from "../components/SelectableGallery";
import useBackendApi from "../logic/BackendApiHook";
import {useNavigate} from "react-router-dom";
import useUrlStore from "../logic/UrlsStore";
import {default as axios} from "axios";

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};


function Previews(props) {
    const history = useNavigate();

    const [files, setFiles] = useState([]);
    const [filesLinks, setFilesLinks] = useState([]);
    const {        authentication, registration, fileUpload,
        getUserInfo, checkAuth, logout, postOrder,
        getOrderInfoById, getOrdersByOwnerId,
        getCountOrdersByOwnerId, postComment, getAllOrders,
        getLastCreated, addNewCamera, getCameraInfoById,
        putCamMaskById, updateCameraInfoById, deleteCameraById,
        getAllAppealCategory
    } = useBackendApi();

    const {getBackendUrl} = useUrlStore();
    const baseUrl = getBackendUrl();

    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(
                file => Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    }
                )
                )
            );
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        const axios = require('axios').default;



        const links = [];
        let formData = new FormData();
        formData.append('token', '');
        formData.append('fileType', "");
        files.forEach(file => {
            formData.append('uploadedFile[]', file);
        });
        formData.append('files', {'uploadedFile[]': files});

        axios({
            url: `${baseUrl}/file`,
            method: 'POST',
            data: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }).then(e => {
            links.push(e.data.fileFakeName)
            setFilesLinks(e.data.fileFakeName);
            console.log(e.data.fileFakeName);
            props.onUploaded(e.data.fileFakeName);
        })



            /*    for (const file of files) {
                    URL.revokeObjectURL(file.preview);
                }*/
    }, [files]);

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Перетащите сюда несколько файлов или щелкните, чтобы выбрать файлы</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </section>
    );
}

function AgreeModal(props) {
    const [show, setShow] = useState(false);

    return (
        <>

            <Button variant="primary" onClick={() => setShow(true)} style={{
                margin: "auto",
                marginRight: "1em"
            }}>
                Отправить
            </Button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Правила и соглашение
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        1.1. Значимость этих проблем настолько очевидна, что консультация с широким активом играет
                        важную роль в формировании новых предложений. Равным образом постоянный количественный рост и
                        сфера нашей активности играет важную роль в формировании системы обучения кадров, соответствует
                        насущным потребностям.
                    </p>
                    <p>
                        1.2. Товарищи! консультация с широким активом позволяет выполнять важные задания по разработке
                        систем массового участия. Таким образом реализация намеченных плановых заданий позволяет оценить
                        значение новых предложений. Идейные соображения высшего порядка, а также дальнейшее развитие
                        различных форм деятельности позволяет оценить значение новых предложений.
                    </p>

                    <p>
                        2.1. Повседневная практика показывает, что укрепление и развитие структуры обеспечивает широкому
                        кругу (специалистов) участие в формировании дальнейших направлений развития. Не следует, однако
                        забывать, что дальнейшее развитие различных форм деятельности способствует подготовки и
                        реализации форм развития.
                    </p>

                    <p>
                        2.2. Идейные соображения высшего порядка, а также начало повседневной работы по формированию
                        позиции позволяет оценить значение модели развития. Значимость этих проблем настолько очевидна,
                        что дальнейшее развитие различных форм деятельности обеспечивает широкому кругу (специалистов)
                        участие в формировании новых предложений.
                    </p>

                    <p>
                        3.1. Значимость этих проблем настолько очевидна, что консультация с широким активом играет
                        важную роль в формировании новых предложений. Значимость этих проблем настолько очевидна, что
                        дальнейшее развитие различных форм деятельности обеспечивает широкому кругу (специалистов)
                        участие в формировании новых предложений.
                    </p>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Отказываюсь</Button>
                    <Button variant="primary" onClick={props.onAgree}>Соглашаюсь и подтверждаю</Button>
                </Modal.Footer>

            </Modal>
        </>
    );
}

const RevealExampleFade = () => {
    const SemanticImage = require("semantic-ui-react").Image;
    return (
        <Reveal animated='fade'>
            <Reveal.Content visible>
                <SemanticImage src='https://pbs.twimg.com/profile_images/1205883807854923776/8JtuZOpL_400x400.jpg'
                               size='small'/>
            </Reveal.Content>
            <Reveal.Content hidden>
                <SemanticImage src='https://pbs.twimg.com/profile_images/1205883807854923776/8JtuZOpL_400x400.jpg'
                               size='small'/>
            </Reveal.Content>
        </Reveal>
    );
}

function OrderingPage() {
    const {
        getUserInfo, postOrder,
        getAllAppealCategory
    } = useBackendApi();



    const [changedAddress, setChangedAddress] = useState("");
    const [registrationFieldShow, setRegistrationFieldShow] = useState(true);
    const [textFieldsData, setTextFieldsData] = useState({});
    const [selectableHorizontalGallery,setSelectableHorizontalGallery] = useState();
    const [tileData, setTileData] = useState({});
    const history = useNavigate();

    const updateFieldsData = function (e, olddata, setter) {
        let s = "";

        s = _.map(e,'id').concat();
        console.log(textFieldsData);
        setTextFieldsData({...textFieldsData, ...{"category": s, "status": "opened"}});
        console.log("joined : ", s);
    };

    useEffect(() => {
        getUserInfo().then(e => {
            console.log('id=', e, e.id, !(e.id > 0));
            e && setRegistrationFieldShow(!(e.id > 0));

        }).catch(
            c => {
                setRegistrationFieldShow(true)
            }
        );
    }, []);

    useEffect(()=>{
        //setTileData(
        getAllAppealCategory().then(e=>{
            let result = [];
            Array.from(e).forEach(c=>{
                result.push({
                    id: c.id,
                    img: c.imageUrl,
                    title: c.name,
                    author: c.mergedOrganization?.name
                });
            });
            setSelectableHorizontalGallery(<SelectableHorizontalGallery tileData={result} onChange={(t,d)=>updateFieldsData(t, textFieldsData, setTextFieldsData)}/>);

        });
    },[textFieldsData]);

    useEffect(()=>{

        setTextFieldsData({...textFieldsData, ...{"geoPosition": {
            "fullname":changedAddress.display_name,
                    "lat":changedAddress.lat,
                    "lon":changedAddress.lon}}})

    },[changedAddress]);




    let handleAgree = async () => {
        console.log("agree");
        const result = await postOrder(textFieldsData, registrationFieldShow);
        console.log(result);
        if (result != null) {
            history(`/request/${result.data['id']}`);
        }
    };

    return (


        <div className="App">
            <div>
                <HeaderNav/>


                <section className="pb-5 pt-5">



                    <div className="container pl-sm-5">

                        <div className="row mt-3">
                            {registrationFieldShow ?
                                <div className="col-md-4 col-sm-6 col-xs-6">
                                    <h5 className="font-weight-light text-left"> Основные данные </h5>

                                    <div>
                                        <TextField id="input-with-icon-grid" label={<p>Фамилия</p>}
                                                   variant="filled" fullWidth onChange={e => {

                                            setTextFieldsData({...textFieldsData, ...{"surname": e.target.value}});
                                            console.log(textFieldsData);
                                        }}/>
                                        <TextField id="input-with-icon-grid" label={<p>Имя</p>}
                                                   variant="filled" fullWidth onChange={e => {
                                            setTextFieldsData({...textFieldsData, ...{"name": e.target.value}});
                                            console.log(textFieldsData);
                                        }}/>
                                        <TextField id="input-with-icon-grid" label={<p>Отчество</p>}
                                                   variant="filled" fullWidth onChange={e => {
                                            setTextFieldsData({...textFieldsData, ...{"patronymic": e.target.value}});
                                            console.log(textFieldsData);
                                        }}/>

                                        <TextField id="input-with-icon-grid"
                                                   label={<p><CallIcon/> &nbsp; Мобильный номер</p>}
                                                   variant="filled"
                                                   helperText={<p style={{textAlign: "justify"}}>* Мобильный номер вам
                                                       нужно указать для того, чтобы вы могли создать временный личный
                                                       кабинет и контролировать свою заявку</p>}
                                                   fullWidth
                                                   onChange={e => {
                                                       setTextFieldsData({...textFieldsData, ...{"mobilenumber": e.target.value}});
                                                       console.log(textFieldsData);
                                                   }}
                                        />
                                    </div>
                                </div> : ""}

                            <div className="flex-fill">

                                <h5 className="font-weight-light text-left"><EditOutlinedIcon/> Подробное описание
                                    проблемы </h5>

                                <Paper className={"p-3"} style={{minHeight: "20em"}}>

                                    <InputBase
                                        placeholder="Проблему описывать здесь"
                                        fullWidth
                                        multiline
                                        onChange={(e)=>setTextFieldsData({...textFieldsData, ...{"description": e.target.value}})}
                                    />

                                </Paper>
                            </div>
                        </div>
                    </div>

                </section>

                <section className="pb-5 pt-5">
                    <div className="container pl-sm-5">
                        <h5 className="font-weight-light text-left"><ImageOutlinedIcon/> Местоположение недостатка </h5>
                        <p className={'text-left'}>{changedAddress.display_name}</p>

                        <div data-content="The default theme's basic popup removes the pointing arrow."
                             data-variation="basic">
                            <EditableOpenMap setChangedAddress={setChangedAddress}/>
                        </div>
                        <Alert className={'mt-2 text-left'} variant={'warning'}>
                            <i className="exclamation icon"></i> Постарайтесь указать позицию происшествия как
                            можно <Alert.Link href="#">более точнее</Alert.Link>, от этого будет зависеть дальнейшая
                            судьба вашего обращения.
                        </Alert>
                    </div>
                </section>

                <section className="pb-5 pt-0">
                    <div className="container pl-sm-5">

                        <h5 className="font-weight-light text-left"><ImageOutlinedIcon/> Категория происшествия </h5>

                        {selectableHorizontalGallery}


                    </div>
                </section>

                <section className="pb-5 pt-0">
                    <div className="container pl-sm-5">

                        <h5 className="font-weight-light text-left"><ImageOutlinedIcon/> Приложения </h5>


                        <Previews onUploaded={(links)=>setTextFieldsData({...textFieldsData, ...{"attachments": links}})}/>



                        <AgreeModal onAgree={handleAgree}/>


                    </div>


                </section>


            </div>

        </div>
    );
}

export default OrderingPage;
