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
import {useHistory, useParams} from "react-router-dom";

function OAuthRegisteredPage() {
    let { token } = useParams();
    const history = useHistory();
    const {        authentication, registration, fileUpload,
        getUserInfo, checkAuth, logout, postOrder,
        getOrderInfoById, getOrdersByOwnerId,
        getCountOrdersByOwnerId, postComment, getAllOrders,
        getLastCreated, addNewCamera, getCameraInfoById,
        putCamMaskById, updateCameraInfoById, deleteCameraById,
        getAllAppealCategory, updateUserInfo, updateUserPassword,
        oAuthAuthentication
    } = useBackendApi();

    useEffect(()=>{

        //const result = oAuthAuthentication();
        //console.log(result);
        if (token != null) {
            localStorage.setItem("token", token);
            window.open("http://localhost:3000/profile", '_blank').focus();

            //history.push('/profile');
        } else {
            window.open("http://localhost:3000/login", '_blank').focus();

            //history.push('/login');
        }
        window.open('','_self').close()



        /*oAuthAuthentication().then((t)=> {
            alert("go");

            if(t!=null){
                    window.open("localhost:3000/profile");

                    //history.push('/profile');
                }else{
                    history.push('/login');
                }
            }
        );*/
        },[]);


    return(<div>
            <p>Hello {token}</p>
        </div>
    );
}

export default OAuthRegisteredPage;
