import { Row } from "react-bootstrap";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React, {useRef, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../resources/avatar.jpg";
import MessageIcon from "@material-ui/icons/Message";
import { Alert, AlertTitle } from "@material-ui/lab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import useBackendApi from "../logic/BackendApiHook";
import { UserAvatar } from "../components/UserAvatar";
import { Link } from "react-router-dom";
import { stringAvatar } from "../utils";
import { useListener } from "react-bus";
import ChatBox from "../components/ChatBox";
import {format} from "date-fns";
import './fix.css';

function ModalOrder() {
    const { getUserInfo, getOrderInfoById, postComment, deleteComment } = useBackendApi();
    const [orderInfo, setOrderInfo] = useState();
    const [authorInfo, setAuthorInfo] = useState();
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState();
    const [forceRedraw, setForceRedraw] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState();
    const [isOpen, setIsOpen] = useState(false);

    /*   useEffect(() => {
             orderInfo && getUserInfo(orderInfo.authorid).then(e=>setAuthorInfo(e));
         }, [orderInfo]);*/

    const onOpenAppealCardModal = React.useCallback(async function (props) {
        // alert('opened'+props.orderId);
        const resp = await getOrderInfoById(props.orderId);
        setCurrentOrderId(props.orderId);
        console.log(resp);
        setOrderInfo(resp);
        setIsOpen(true);
    }, []);

    useListener("openAppealCardModal", onOpenAppealCardModal);
    const commentTextRef = useRef();

    //
    return (
        <div>
            <MDBModal overflowScroll={true} isOpen={isOpen} size="lg">
                <MDBModalHeader style={{ display: "content" }}>
                    <div style={{ display: "flex", width: "100%", alignItems: 'center' }}>
                        <h3 className="font-weight-light text-left flex-grow-1 mb-0">{`Заявка №${orderInfo?.id} (от ${orderInfo !== undefined ? format(new Date(orderInfo?.createdAt), 'dd.MM.yyyy') : ""})`}</h3>
                        <PopupState
                            variant="popover"
                            popupId="demo-popup-menu"
                            style={{ float: "right" }}
                        >
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
                                        }}
                                        {...bindTrigger(popupState)}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>

                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={popupState.close}>
                                            Скачать сопутствующие документы
                                        </MenuItem>
                                        <MenuItem onClick={popupState.close}>
                                            Редактировать
                                        </MenuItem>
                                        <MenuItem onClick={popupState.close}>Закрыть</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            style={{
                                width: "1.5em",
                                height: "1.5em",
                                marginRight: "1em",
                            }}
                        >
                            <CloseIcon onClick={() => setIsOpen(false)} />
                        </IconButton>
                    </div>
                </MDBModalHeader>

                <MDBModalBody style={{ border: "none", padding: "0px" }}>
                    <div
                        className="row"
                        style={{ display: "inline-flex", width: "100%" }}
                    >
                        <div
                            className="col-sm-8 pl-0"
                            style={{
                                backgroundImage: `url(http://localhost:8888/file/preview/${orderInfo?.attachments[0]})`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                            }}
                        ></div>
                        <div className="col-sm-4 pt-4 pl-4 pr-4 pb-4">

                            {
                                orderInfo?.status === "closed" ? <Alert
                                    className={"mb-3"}
                                    severity="success"
                                    style={{ textAlign: "left", width: "100%" }}
                                >
                                    <AlertTitle>Объект ремонтируется</AlertTitle>
                                    {/*                 Ремонтом объекта занимается волонтёрская команда{" "}
                                <strong style={{ color: "#4e96ce" }}></strong>*/}
                                </Alert> : <></>
                            }


                            {orderInfo?.author &&
                                <div className="row ml-1">
                                    {/*<Avatar
                                        alt="Remy Sharp"
                                        src={avatar}
                                        style={{width: "1.0em", height: "1.0em"}}
                                    />{" "}




                                    <UserAvatar
                                        userId={orderInfo?.authorid}
                                        clickable
                                        style={{width: "1.5em", height: "1.5em"}}
                                    />*/}
                                    <Link to={`/profile/${orderInfo?.author.id}`}>
                                        <Avatar {...stringAvatar(orderInfo?.author.login)} />
                                    </Link>
                                    <p
                                        style={{
                                            color: "#919191",
                                            fontSize: "11px",
                                        }}
                                    >
                                        &nbsp; {`@${orderInfo?.author.login}`} &nbsp;
                                    </p>
                                    <p
                                        style={{
                                            color: "#919191",
                                            fontSize: "11px",
                                            textAlign: "left",
                                        }}
                                    >
                                        <MessageIcon fontSize={"small"}/>
                                        {orderInfo?.comments.length}
                                    </p>
                                </div>
                            }

                            <p
                                style={{ textAlign: "left" }}
                                className={"mt-3 mb-3"}
                            >{`Комментарии (${orderInfo?.comments.length})`}</p>





                            <ChatBox orderInfo={orderInfo}></ChatBox>

                            <Row className={"d-flex mt-3"}>
                                <TextField
                                    className={"flex-grow-1 ml-3"}
                                    id="filled-basic"
                                    label="Текст сообщения"
                                    variant="filled"
                                    inputRef={commentTextRef}
                                />
                                <IconButton
                                    className={"mx-3"}
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                    onClick={()=>{postComment(currentOrderId, commentTextRef.current.value).then(() => onOpenAppealCardModal({orderId: currentOrderId}));}}
                                >
                                    <SendIcon />
                                </IconButton>
                            </Row>


                        </div>
{/*

*/}
                    </div>
                </MDBModalBody>

                {/*



            <MDBModalFooter>
                <MDBBtn color="secondary" onClick={() => props.selfClose()}>Close</MDBBtn>
                <MDBBtn color="primary">Save changes</MDBBtn>
            </MDBModalFooter>
*/}
            </MDBModal>
        </div>
    );
}

export default ModalOrder;
