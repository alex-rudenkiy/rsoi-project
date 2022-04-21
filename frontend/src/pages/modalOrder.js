import zvezdi from "../resources/templateImage.png";
import {Row} from "react-bootstrap";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import React, {useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../resources/avatar.jpg";
import ViewsIcon from "@material-ui/icons/Visibility";
import MessageIcon from "@material-ui/icons/Message";
import {Alert, AlertTitle} from "@material-ui/lab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import {MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import useBackendApi from "../logic/BackendApiHook";
import {UserAvatar} from "../components/UserAvatar";
import _ from "lodash";
import {Link} from "react-router-dom";
import {stringAvatar} from '../utils';

function ModalOrder(props) {
    const {
        authentication,
        registration,
        fileUpload,
        getUserInfo,
        checkAuth,
        logout,
        postOrder,
        getOrderInfoById,
        getOrdersByOwnerId,
        getCountOrdersByOwnerId,
        postComment
    } = useBackendApi();
    const [orderInfo, setOrderInfo] = useState();
    const [authorInfo, setAuthorInfo] = useState();
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState();
    const [forceRedraw, setForceRedraw] = useState(false);
    const [authorAvatar, setAuthorAvatar] = useState();


    useEffect(() => {
        //setComments(orderInfo&&Array.from(orderInfo).map(e=>e.));
        //console.log(`http://localhost:8888/file/preview/${orderInfo&&orderInfo.attachments[0]}`);
        orderInfo && getUserInfo(orderInfo.authorid).then(e=>setAuthorInfo(e));

        /*setAuthorAvatar(orderInfo != null ?
            <UserAvatar userId={orderInfo && orderInfo.authorid} clickable style={{width: "1.5em", height: "1.5em"}}/>
            : <></>);*/

    }, [orderInfo]);

    useEffect(async () => {
        console.log((await getOrderInfoById(props.orderId)));
        setOrderInfo((await getOrderInfoById(props.orderId)));
        setForceRedraw(false);
    }, [props.orderId, forceRedraw])

    return (<div><MDBModal overflowScroll={true} isOpen={true} size="lg">

            <MDBModalHeader style={{display: "content"}}>
                <div style={{display: "flex", width: "100%"}}>
                    <h3 className="font-weight-light text-left flex-grow-1">{`Заявка №${orderInfo ? orderInfo.id : ""} (от ${orderInfo ? orderInfo.createdAt : ""})`}</h3>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        style={{
                            width: "1.5em",
                            height: "1.5em", marginRight: "1em"
                        }}
                    >
                        <CloseIcon onClick={() => props.selfClose()}/>
                    </IconButton></div>

            </MDBModalHeader>

            <MDBModalBody style={{border: "none", padding: "0px"}}>
                <div className="row" style={{display: "inline-flex", width: "100%"}}>
                    <div className="col-sm-8 pl-0" style={{
                        backgroundImage: `url(http://localhost:8888/file/preview/${orderInfo && orderInfo.attachments[0]})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}>
                    </div>
                    <div className="col-sm-4 pt-4 pl-4 pr-4 pb-4">

                        <Row className={"d-flex mb-0 ml-1"}>

                            {/*
                            <PopupState variant="popover" popupId="demo-popup-menu" style={{float:"right"}}>
                                {(popupState) => (
                                    <React.Fragment>

                                        <IconButton
                                            aria-label="more"
                                            aria-controls="long-menu"
                                            aria-haspopup="true"
                                            style={{    width: "1.5em",
                                                height: "1.5em", marginRight:"1em"}}
                                            {...bindTrigger(popupState)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>

                                        <Menu {...bindMenu(popupState)}>
                                            <MenuItem onClick={popupState.close}>Скачать сопутствующие документы</MenuItem>
                                            <MenuItem onClick={popupState.close}>Редактировать</MenuItem>
                                            <MenuItem onClick={popupState.close}>Закрыть</MenuItem>
                                        </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
*/}


                        </Row>


                        <Alert className={"mb-3"} severity="success" style={{textAlign: "left", width: "100%"}}>
                            <AlertTitle>Объект ремонтируется</AlertTitle>
                            Ремонтом объекта занимается волонтёрская команда <strong style={{color: "#4e96ce"}}>БГТУ им
                            В.Г.Шухова</strong>
                        </Alert>


                        <div className="row ml-1">
                            {/*<Avatar alt="Remy Sharp" src={avatar} style={{width:"1.0em", height:"1.0em"}}/>    //orderInfo.ownerId*/}
                            {/* src={authorInfo&&`http:\\\\localhost:8888\\file\\preview\\${authorInfo.avatarFileFakeUrl}`}*/}
                            {/*<UserAvatar userId={orderInfo && orderInfo.authorid}  clickable style={{width: "1.5em", height: "1.5em"}}/>*/}
                            <Link to={`/profile/${authorInfo&&authorInfo.id}`}>
                                <Avatar {...stringAvatar(authorInfo?authorInfo.login:". .")} style={props.style}/>
                            </Link>

                            <p style={{
                                color: "#919191",
                                fontSize: "11px"
                            }}>&nbsp; {`@${authorInfo && authorInfo.login}`} &nbsp;</p>


                            <p style={{color: "#919191", fontSize: "11px", textAlign: "left"}}>
                                <MessageIcon fontSize={'small'}/>
                                {orderInfo && orderInfo.comments.length}
                            </p>
                        </div>


                        <p style={{textAlign: "left"}}
                           className={"mt-3 mb-3"}>{`Комментарии (${orderInfo && orderInfo.comments.length})`}</p>
                        <List style={{height: "30em", overflow: "auto"}}>
                            {orderInfo && orderInfo.comments.map(e =>
                                <><ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <UserAvatar clickable userId={e && e.createdBy.id}
                                                    style={{width: "1.5em", height: "1.5em"}}/>
                                        {/*
                                    <Avatar click alt={
                                        e.createdBy.login.length>0?
                                            `${e.createdBy.login}`:`${e.createdBy.name} ${e.createdBy.patronymic}`} src={`http://localhost:8888/file/preview/${e.createdBy.avatarFileFakeUrl}`} />
*/}
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            e.createdBy.login > 0 ?
                                                `@${e.createdBy.login}` : `${e.createdBy.name} ${e.createdBy.patronymic}`}
                                        secondary={
                                            <React.Fragment>
                                                {/*<Typography*/}
                                                {/*    component="span"*/}
                                                {/*    variant="body2"*/}
                                                {/*    color="textPrimary"*/}
                                                {/*>*/}
                                                {/*    Ali Connors*/}
                                                {/*</Typography>*/}
                                                {e.content}
                                            </React.Fragment>
                                        }
                                    />

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
                                </ListItem>
                                    <Divider variant="inset" component="li"/></>
                            )}

                        </List>

                        <Row className={"d-flex mt-3"}>
                            <TextField className={"flex-grow-1 ml-3"} id="filled-basic" value={commentText}
                                       label="Текст сообщения" variant="filled"
                                       onChange={(e) => setCommentText(e.target.value)}/>
                            <IconButton className={"mx-3"} color="primary" aria-label="upload picture" component="span"
                                        onClick={(e) => {
                                            postComment(props.orderId, commentText);
                                            setForceRedraw(true);
                                            setCommentText("")
                                        }}>
                                <SendIcon/>
                            </IconButton>
                        </Row>


                    </div>
                </div>

            </MDBModalBody>

            <MDBModalFooter>
                <MDBBtn color="secondary" onClick={() => props.selfClose()}>Close</MDBBtn>
                <MDBBtn color="primary">Save changes</MDBBtn>
            </MDBModalFooter>

        </MDBModal>
        </div>
    );
}

export default ModalOrder;
