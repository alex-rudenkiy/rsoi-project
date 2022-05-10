import useBackendApi from "../logic/BackendApiHook";
import React, {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {Image, Row} from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import vkIcon from "../resources/vk_icon.svg";
import googleIcon from "../resources/google_icon.svg";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../resources/avatar.jpg";
import Badge from "@material-ui/core/Badge";
import {Link} from "react-router-dom";
import {Button, Popup} from "semantic-ui-react";
import useUrlStore from "../logic/UrlsStore";

interface IUserInfo {
    userInfo: any;
}

export function UserAvatar(props: IUserInfo) {
    const {authentication, registration, fileUpload, getUserInfo} = useBackendApi();

    const [userData, setUserData] = useState();
    const [socialLinks, setSocialLinks] = useState();

    const {getBackendUrl} = useUrlStore();
    const baseUrl = getBackendUrl();

    /*    const thumbs = files.map(file => (
            <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                    <img
                        src={file.preview}
                        style={img}
                    />
                </div>
            </div>
        ));*/

  /*  useEffect(() => {
        console.log("here we go");
        getUserInfo(props.userId).then((e) => console.log('e=',e));

        getUserInfo(props.userId).then((e) => setUserData(e.data));

    }, []);*/

/*
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        //files.forEach(file => URL.revokeObjectURL(file.preview));
        //console.log(userData);
        //alert(`http:\\\\localhost:8888\\\\files\\\\preview\\\\${userData.avatarFileFakeUrl}`);
        //console.log(`http:\\\\localhost:8888\\\\file\\\\preview\\\\${userData.avatarFileFakeUrl}`);
    }, [userData]);
*/

    return (
        <Badge
            overlap="circle"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            badgeContent={
                <Row>
                    {/*{userInfo.socialLink&&props.withlinks&&userData.socialLink.map(s =>
                            <Popup content={`${s.socialType.endpoint.replace("%",s.payload)}`}
                                   trigger={ <IconButton style={{width: "1em", height: "1em", padding: "0"}} color="primary" aria-label="add to shopping cart"
                                   onClick={()=>window.open(`${s.socialType.endpoint.replace("%",s.payload)}`)}>

                                <Image src={s.socialType.logoUrl} style={{width: "2em"}}/>

                            </IconButton>
                            } />
                        )}*/}

{/*
                     <Popup content='Add users to your feed' trigger={<Button icon='add' />} />
*/}

                    {/*                    <IconButton style={{width: "1em", height: "1em", padding: "0"}} color="primary"
                                aria-label="add to shopping cart">
                        <Image src={vkIcon} style={{width: "2em"}}/>
                    </IconButton>
                    <IconButton style={{width: "1em", height: "1em", padding: "0"}} color="primary"
                                aria-label="add to shopping cart">
                        <Image src={googleIcon} style={{width: "2em"}}/>
                    </IconButton>*/}


{/*
*/}
                </Row>
            }
        >
            {props.clickable?<Link to={`/profile/${userData&&userData.id}`}>
                <Avatar alt="Remy Sharp" src={userData&&`${baseUrl}/file/preview/${userData.avatarFileFakeUrl}`} style={props.style}/>
            </Link>:<Avatar alt="Remy Sharp" src={userData&&`${baseUrl}/file/preview/${userData.avatarFileFakeUrl}`} style={props.style}/>}

        </Badge>

    );
}
