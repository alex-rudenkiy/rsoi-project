import React, {useCallback, useEffect, useState} from "react";
import { Button, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MessageIcon from '@material-ui/icons/Message';
import Pagination from '@material-ui/lab/Pagination';
import { useBus } from 'react-bus'
import TodayIcon from '@material-ui/icons/Today';
import HeaderNav from "../src/components/headerNav";
import MakeRequest from "./makeRequest";
import useFrontendApi from "../frontendApiHooks";
import { Footer } from "../src/components/footer";
import useUrlStore from "../UrlsStore";
import moment from 'moment';
import {getStatusRusStr} from "../utils";
import Badge from "@material-ui/core/Badge";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {getSession} from "next-auth/react";
import useBackendApi from "../backendApiHooks";
import Image from "next/image";

const {
    getAllOrders,
    getLastCreated,
    getUserInfoById
} = useBackendApi();

export async function getServerSideProps({ req }) {
    const session = await getSession({req});
    const authUserInfo = session?.user?.id ? await getUserInfoById(session.user?.id) : null;

    const allOrders = await getAllOrders();
    const lastCreated = await getLastCreated();

    return { props: { allOrders: allOrders, lastCreatedOrder: lastCreated, authUserInfo: authUserInfo, isAuth: authUserInfo?.id >=0 } }
}

function ProblemsStorePage(props) {

    // require('mdbreact');

    // require('react-responsive-carousel').Carousel;
    const Blur = require('react-blur').default;
    const [, setModalOrderId] = useState();
    const [liveMarkers, setLiveMarkers] = useState();
    const [topAppealBanner, setTopAppealBanner] = useState();
    const [paginationParams, setPaginationParams] = useState({ page: 0, count: 0 });
    const [pageListOrders, setPageListOrders] = useState();
    const bus = useBus()

    const {getBackendUrl} = useUrlStore();
    const baseUrl = getBackendUrl();


    const loadAllOrders = useCallback(()=>{
        getAllOrders(paginationParams.page, 10).then(o => {
            setPaginationParams({ ...paginationParams, ...{ count: o.total } });
            setPageListOrders(o?.content.map(e =>
                <button key={e.id} type="button" className="list-group-item list-group-item-action" onClick={() => bus.emit('openAppealCardModal', { orderId: e.id })}>
                    <Row style={{ marginLeft: "1em" }}>
                        <Image layout='fill' width={"4em"} height={"4em"} style={{ maxWidth: "4em", maxHeight: "4em" }} src={e.attachments && `${baseUrl}/file/preview/${e.attachments[0]}`} fluid />
                        <Col>
                            <p className="text-left" style={{ marginBottom: "auto" }}>{e.title}</p>
                            <p className="text-left" style={{ color: "Silver", fontSize: "smaller" }}>
                                <TodayIcon fontSize={"small"} />{moment(e.createdAt).format("YYYY MMM DD HH:mm").toString()} &nbsp;
                                <MessageIcon fontSize={"small"} />{e.comments.length}
                            </p>
                        </Col>

{/*
                        <PopupState variant="popover" popupId="demo-popup-menu" style={{ float: "right" }}>
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
                                        <MoreVertIcon />
                                    </IconButton>

                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={popupState.close}>Удалить сообщение</MenuItem>
                                        <MenuItem onClick={popupState.close}>Заблокировать автора</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
*/}

                    </Row>
                </button>
            ));
        });
    
    }, [baseUrl, bus, getAllOrders, paginationParams])

    useEffect(()=>{
        loadAllOrders();
        },[]);


    const createAppealBanner = (id, imgUrl, title, description, comments, views, createdAt, status) => {
        return (<Container style={{ height: "20em", overflow: "hidden" }}>
            <div className="card text-white" style={{backgroundColor: "rgb(0 0 0 / 34%)"}}>
                {/*<img className="card-img" src={templateImage} alt="Card image"/>*/}
                <Blur img={imgUrl}
                    blurRadius={45} enableStyles style={{
                        // width: "1364px",
                        height: "20em",width: "100%"


                    }}>
                    {/*The content.*/}
                </Blur>
                <div className="card-img-overlay">
                    <div className="pl-5" style={{    display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center"}}>
                        <div>
                                <h2 className="font-weight-light text-left mb-0"
                                    style={{ color: "white" }}>Заявление №{id}</h2>

                            <div style={{     display: "flex"}}><p style={{ color: "white" }}>статус: &nbsp; </p>
                                <p style={{ color: "#68a5ff", fontWeight: "bold" }}>{status}</p>
                            </div>

                            <div style={{ display: "flex"}}>
                                <p style={{ color: "white" }}>
                                    <TodayIcon fontSize={"small"} />{moment(createdAt).format("YYYY MMM DD HH:mm").toString()} &nbsp;
                                    <MessageIcon fontSize={'small'} />{views.length}
                                </p>
                            </div>

                            <div  style={{ display: "flex"}}>
                                <p className={"text-break"}
                                   style={{ textAlign: "justify", color: "white",
                                       overflow: "hidden",
                                       textOverflow: "ellipsis",
                                       display: "-webkit-box",
                                       webkitLineClamp: "4",
                                       webkitBoxOrient: "vertical",
                                       maxWidth: "40em"

                                   }}>{description}</p>
                            </div>


                            <div className={"pr-5 mt-3"} style={{ display: "flex", color: "white" }}>
                                <Button variant="btn btn-outline-primary btn-sm"
                                        style={{ color: "white", paddingLeft: "2em", paddingRight: "2em" }}
                                        onClick={() => bus.emit('openAppealCardModal', { orderId: id })}>Открыть</Button>
                            </div>


                        </div>
                        <div style={{  width: "29em", height: "15em", position: "relative" }}>
                            <Image
                                       src={imgUrl}
                                   layout="fill"
                                   objectFit="contain" // Scale your image down to fit into the container

                                   fluid />
                        </div>
                    </div>
                </div>

{/*
                <div className="card-img-overlay">
                    <div className="row pl-5">
                        <div className="col-8">
                            <Row>
                                <h2 className="font-weight-light text-left mb-0"
                                    style={{ color: "white" }}>Заявление №{id}</h2>
                            </Row>
                            <Row>
                                <p style={{ color: "white" }}>статус: &nbsp; </p>
                                <p style={{ color: "#68a5ff", fontWeight: "bold" }}>на рассмотрении </p>
                            </Row>
                            <Row>
                                <p style={{ color: "white" }}><ViewsIcon fontSize={'small'} />{comments?.length} &nbsp;
                                    <MessageIcon fontSize={'small'} />{views.length}</p>
                            </Row>

                            <Row className="w-75">
                                <p className={"text-break"}
                                    style={{ textAlign: "justify", color: "white" }}>{description}</p>
                            </Row>

                            <Row className={"row pr-5 mt-3"} style={{ color: "white" }}>
                                <Button variant="btn btn-outline-primary w-25 btn-sm"
                                    style={{ color: "white" }}
                                    onClick={() => bus.emit('openAppealCardModal', { orderId: id })}>Открыть</Button>
                            </Row>

                        </div>
                        <div className="col">
                            <Image style={{ maxWidth: "18em", maxHeight: "17em" }}
                                src={imgUrl}
                                fluid />
                        </div>
                    </div>
                </div>
*/}
            </div>
        </Container>
        );
    };


    useEffect(()=>{
        getLastCreated().then((c) => {
            //alert(c.attachments[0]);
            setTopAppealBanner(createAppealBanner(c.id, `${baseUrl}/file/preview/${c.attachments[0]}`, c.title, c.description, c.views, c.comments, c.createdAt, getStatusRusStr(c.status)));
        });
    },[]);


    /*            console.log(e); return <Marker position={[e.geoPosition.lat, e.geoPosition.lon]}
                                           eventHandlers={{
                                               click: () => {
                                                   console.log(e.id);
                                                   setModalOrderId(e.id);
                                                   bus.emit('openAppealCardModal', { orderId: e.id });
                                               },
                                           }}>*/
    {/*<Popup>*/}
    {/*    A pretty CSS3 popup. <br /> Easily customizable.*/}
    {/*</Popup>*/}
    // </Marker>


    const updateMarkers = useCallback(async () => {
        const orders = await getAllOrders();
        let markers = [];
        for (const o of orders) {
            markers.push(
                {
                    position: [o.geoPosition.lat, o.geoPosition.lon],
                    onClick: () => {
                        console.log(o.id);
                        setModalOrderId(o.id);
                        bus.emit('openAppealCardModal', { orderId: o.id });
                    }
                }
            )
        }

        setLiveMarkers(markers);

        /*getAllOrders().then(o => setLiveMarkers(
                o.map(
                    e => {
                        {
                            position: [e.geoPosition.lat, e.geoPosition.lon]
                        }
                    }
                )
            )
        );*/


    },[]);
    useEffect(
        () => {
            console.log('markers updating');

            let timer = setTimeout(() => {
                updateMarkers();
            }, 10000);
        }
    );

    useEffect(()=>{
        updateMarkers()
    },[]);


    const Map = React.useMemo(() => dynamic(() => import('../src/components/Openmap'),
        { loading: () => <p>Loading map...</p>, ssr: false, }), [])


    return (
        <div className="App">

            <MakeRequest isAuth={props.isAuth}/>




            <header className="masthead">
                <HeaderNav isAuth={props.isAuth}/>
            </header>


            <section className="container pb-5 pt-5 main-content pl-sm-5">
                <section className="pb-0 pt-0">

                    {topAppealBanner}

                </section>

                <section className="pb-5 pt-2">
                    <div className="container pl-sm-5">
                            <div style={{    marginLeft: "1em",     marginRight: "auto",
                                float: "left", marginTop: "2em", marginBottom: "2em"}}>
                                <Badge color="secondary" badgeContent={"онлайн"}>
                                    <h5 className="font-weight-light text-left">
                                        Живая карта проблем
                                    </h5>
                                </Badge>
                            </div>


                        <Container fluid style={{overflow: "hidden"}}>

                            <Map markers={liveMarkers} />

                    </Container>


                    </div>
                </section>

                <section className="pb-5 pt-0">
                    <div className="container pl-sm-5">
                        <Row>
                            <h5 className="font-weight-light text-left">Все</h5>
                        </Row>


                        <div className="list-group pt-3">

                            {props.allOrders.map(e =>
                                <button key={e.id} type="button" className="list-group-item list-group-item-action" onClick={() => bus.emit('openAppealCardModal', { orderId: e.id })}>
                                    <Row style={{ marginLeft: "1em" }}>
                                        <Image width={64} height={16} style={{ maxWidth: "4em", maxHeight: "4em" }}  src={e.attachments && `${baseUrl}/file/preview/${e.attachments[0]}`} fluid />
                                        <Col>
                                            <p className="text-left" style={{ marginBottom: "auto" }}>{e.title}</p>
                                            <p className="text-left" style={{ color: "Silver", fontSize: "smaller" }}>
                                                <TodayIcon fontSize={"small"} />{moment(e.createdAt).format("YYYY MMM DD HH:mm").toString()} &nbsp;
                                                <MessageIcon fontSize={"small"} />{e.comments.length}
                                            </p>
                                        </Col>

                                        {/*
                        <PopupState variant="popover" popupId="demo-popup-menu" style={{ float: "right" }}>
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
                                        <MoreVertIcon />
                                    </IconButton>

                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={popupState.close}>Удалить сообщение</MenuItem>
                                        <MenuItem onClick={popupState.close}>Заблокировать автора</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
*/}

                                    </Row>
                                </button>
                            )
                            }


                            <div className={"pt-4"} style={{ alignSelf: "center" }}>
                                <Pagination count={paginationParams.count} page={paginationParams.page} onChange={(e, p) => { setPaginationParams({ ...paginationParams, ...{ page: p } }) }} />
                            </div>

                        </div>


                    </div>

                </section>
            </section>

            <Footer/>


        </div>
    );
}

export default ProblemsStorePage;
