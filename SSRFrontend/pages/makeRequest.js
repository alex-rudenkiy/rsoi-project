import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React, {useRef, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import MessageIcon from "@material-ui/icons/Message";
import { Alert, AlertTitle } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import useFrontendApi from "../frontendApiHooks";
import { UserAvatar } from "../src/components/UserAvatar";
import { stringAvatar } from "../utils";
import { useListener } from "react-bus";
import ChatBox from "../src/components/ChatBox";
import {format} from "date-fns";
import useUrlStore from "../UrlsStore";
import Button from "@material-ui/core/Button";
import Link from "next/link";

function MakeRequest(props) {
    const { getUserInfo, getOrderInfoById, postComment, deleteComment, checkAuth } = useFrontendApi();
    const [orderInfo, setOrderInfo] = useState();
    const [authorInfo, setAuthorInfo] = useState();
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState();
    const [forceRedraw, setForceRedraw] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const {getBackendUrl} = useUrlStore();
    const baseUrl = getBackendUrl();

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
            <MDBModal style={{display: "inline-table"}} overflowScroll={true} isOpen={isOpen} size="lg">
                <MDBModalHeader style={{ display: "content" }}>
                    <div style={{ display: "flex", width: "100%", alignItems: 'center' }}>
                        <h5 className="font-weight-light text-left flex-grow-1 mb-0">{`Заявка №${orderInfo?.id} (от ${orderInfo !== undefined ? format(new Date(orderInfo?.createdAt), 'dd.MM.yyyy') : ""})`}</h5>

                        {props.WithActions &&
                            <PopupState
                                variant="popover"
                                popupId="demo-popup-menu"
                                style={{float: "right"}}
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
                                            <MoreVertIcon/>
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
                        }
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

                <MDBModalBody style={{ display: "inline-table", border: "none", padding: "0px", width: "70em" }}>
                    <div
                        style={{    width: "100%",
                            height: "100%",
                            display: "flex",
                            marginLeft: "-0.5px",
                            marginTop: "-1px" }}
                    >
                        <div
                            className="col-sm-8 pl-0"
                            style={{
                                backgroundImage: `url(${baseUrl}/file/preview/${orderInfo?.attachments[0]})`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                            }}
                        ></div>
                        <div style={{    paddingLeft: "1em"}} className="col-sm-4 pt-4 pl-4 pr-4 pb-4">

                            {
                                orderInfo?.status === "working" || orderInfo?.status === "done" ? <Alert
                                    className={"mb-3"}
                                    severity={orderInfo?.status === "working"?"info":"success"}
                                    style={{ textAlign: "left", width: "100%" }}
                                >
                                    <AlertTitle>{
                                        orderInfo?.status === "working"?
                                            "Объект ремонтируется": "Объект отремантирован"}</AlertTitle>
                                </Alert> : <></>
                            }

                            {orderInfo?.author &&
                                <div className="ml-1" style={{display: "flex"}}>
                                    <Link href={`/profile/${orderInfo?.author?.id}`}>
                                        <Avatar {...stringAvatar(orderInfo?.author.login)} />
                                    </Link>
                                    <p
                                        style={{
                                            color: "#919191",
                                            fontSize: "11px",
                                        }}
                                    >
                                        &nbsp; {`@${orderInfo?.author?.login}`} &nbsp;
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
                                className={"mt-3"}
                            >{`Комментарии (${orderInfo?.comments.length})`}</p>





                            <ChatBox orderInfo={orderInfo} withActions={props.isAuth}/>


                            {props.isAuth&&<div className={"d-flex"}>
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
                                    onClick={() => {
                                        postComment(currentOrderId, commentTextRef.current.value).then(() => onOpenAppealCardModal({orderId: currentOrderId}));
                                    }}
                                >

                                    <SendIcon/>
                                </IconButton>
                            </div>}


                        </div>
                    </div>
                </MDBModalBody>

            </MDBModal>
        </div>
    );
}

export default MakeRequest;
