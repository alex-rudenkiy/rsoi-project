import React, {forwardRef, useCallback, useEffect, useRef, useState} from "react";
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {useDropzone} from 'react-dropzone';
import 'react-dropzone/examples/theme.css';
import Modal from "react-bootstrap/Modal";
import useFrontendApi from "../frontendApiHooks";
import useUrlStore from "../UrlsStore";
import {useBus} from "react-bus";
import HeaderNav from "../src/components/headerNav";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {InputBase, Paper} from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
// import {EditableOpenMap} from "../src/components/Openmap";
import {useRouter} from "next/router";
import {SelectableHorizontalGallery} from "../src/components/SelectableGallery";
import {getSession} from "next-auth/react";
import useBackendApi from "../backendApiHooks";
import {Alert} from "@material-ui/lab";
import dynamic from "next/dynamic";

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
    const bus = useBus();

    const [files, setFiles] = useState([]);
    const [thumbs, setThumbs] = useState([]);
    const [filesLinks, setFilesLinks] = useState([]);


    const {getBackendUrl} = useUrlStore();
    const baseUrl = getBackendUrl();

    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            bus.emit('openToast', {msg: "Внимание! Подождите пока загрузятся картинки!", style: 'warning'});
            setFiles(acceptedFiles.map(
                    file => Object.assign(file, {
                            preview: URL.createObjectURL(file)
                        }
                    )
                )
            );
        }
    });

    useEffect(() => {
        setThumbs(files.map(file => (
            <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                    <img
                        src={file.preview}
                        style={img}
                    />
                </div>
            </div>
        )));
    }, [files]);

    useEffect(() => {
        console.log('');
    }, [filesLinks])


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
    }, [baseUrl, files]);

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

export async function getServerSideProps({req}) {
    const {getAllAppealCategory} = useBackendApi();
    const {getUserInfoById} = useBackendApi();

    const session = await getSession({req});
    const userInfo = await getUserInfoById(session.user?.id);
    const appealCategories = await getAllAppealCategory();
    return {props: {appealCategories: appealCategories, isAuth: userInfo?.id >=0}}
}

function LazyMap(onChangingAddress) {
/*
    const Map = dynamic(
        () => import('../src/components/Openmap'), // replace '@components/map' with your component's location
        {
            loading: () => <p>A map is loading</p>,
            ssr: false // This line is important. It's what prevents server-side render
        }
    )
*/
    return <Map setChangedAddress={onChangingAddress}/>
}



function OrderingPage(props) {
    const {
        getUserInfo, postOrder,
        getAllAppealCategory
    } = useFrontendApi();

    const descriptionTextBoxRef = useRef();
    const [registrationFieldShow, setRegistrationFieldShow] = useState(true);
    const [textFieldsData, setTextFieldsData] = useState({});
    const [selectableHorizontalGallery, setSelectableHorizontalGallery] = useState();
    const [tileData, setTileData] = useState({});
    const history = useRouter();


    const onChangingAddress = useCallback((display_name, address, lat, lon) => {
        setTextFieldsData({
            ...textFieldsData, ...{
                "geoPosition": {
                    "fullname": display_name,
                    "lat": display_name.lat,
                    "lon": display_name.lon
                }
            }
        })
    }, [textFieldsData]);

    useEffect(() => {
        console.log(textFieldsData);
    }, [textFieldsData]);

    const updateFieldsData = useCallback((e) => {
        let s = "";

        s = _.map(e, 'id').concat();
        console.log(textFieldsData);
        setTextFieldsData({...textFieldsData, ...{"category": s, "status": "opened"}});
        console.log("joined : ", s);
    }, [textFieldsData]);


    useEffect(() => {
        let result = [];
        Array.from(props.appealCategories).forEach(c => {
            result.push({
                id: c.id,
                img: c.imageUrl,
                title: c.name,
                author: c.mergedOrganization?.name
            });
        });
        setSelectableHorizontalGallery(<SelectableHorizontalGallery tileData={result} onChange={(t) => {
            updateFieldsData(t);
        }}/>);


    }, [updateFieldsData]);


    let handleAgree = async () => {
        console.log("agree");
        const result = await postOrder({...textFieldsData, ...{"description": descriptionTextBoxRef.current.value}}, false);
        console.log(result);
        if (result != null) {
            history.push(`/request/${result.data['id']}`);
        }
    };
    const bus = useBus();

    useEffect(()=>{
        let res = LazyMap(onChangingAddress);

    },[])


    const Map = React.useMemo(() => dynamic(() => import('../src/components/Openmap'),
        { loading: () => <p>Loading map...</p>, ssr: false, }), [])


    return (


        <div className="App">
            <div>
                <HeaderNav isAuth={props.isAuth}/>


                <section className="pb-5 pt-5">


                    <div className="container pl-sm-5">

                        <div className="row mt-3">


                            <div className="flex-fill">

                                <h5 className="font-weight-light text-left"><EditOutlinedIcon/> Подробное описание
                                    проблемы </h5>

                                <Paper className={"p-3"} style={{minHeight: "20em"}}>

                                    <InputBase
                                        placeholder="Проблему описывать здесь"
                                        fullWidth
                                        multiline
                                        inputRef={descriptionTextBoxRef}
                                        onClick={() => {
                                            console.log(descriptionTextBoxRef.current.value)
                                        }}
                                    />

                                </Paper>
                            </div>
                        </div>
                    </div>

                </section>



                <section className="pb-5 pt-5">
                    <div className="container pl-sm-5">
                        <h5 className="font-weight-light text-left"><ImageOutlinedIcon/> Местоположение недостатка </h5>
                        <p className={'text-left'}>{textFieldsData["geoPosition"]?.fullname?.display_name}</p>

                        <div data-content="The default theme's basic popup removes the pointing arrow."
                             data-variation="basic">

                        </div>
                        <Map setChangedAddress={onChangingAddress} />

                               {/*                 <Alert className={'mt-2 text-left'} variant={'warning'}>
                            <i className="exclamation icon"></i> Постарайтесь указать позицию происшествия как
                            можно <Alert.Link href="#">более точнее</Alert.Link>, от этого будет зависеть дальнейшая
                            судьба вашего обращения.
                        </Alert>*/}
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


                        <Previews onUploaded={(links) => {
                            setTextFieldsData({...textFieldsData, ...{"attachments": links}});
                            links && bus.emit('openToast', {
                                msg: 'Успех. Картинки загружены. Можете отправлять обращение!',
                                style: 'success'
                            });
                        }}/>


                        <AgreeModal onAgree={handleAgree}/>


                    </div>


                </section>


            </div>

        </div>
    );
}

export default OrderingPage;
