import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import useFrontendApi from "../../frontendApiHooks";
import Link from 'next/link'
import { stringAvatar } from "../../utils";

interface IChatBox {
    orderInfo: any;
    onDelete: any;
}

function ChatBox(props:IChatBox) {
    console.log(props);
    const { deleteComment } = useFrontendApi();
    const {format} = require('date-fns');


    return(<div>
        <List style={{ height: "30em", overflow: "auto" }}>
        {props.orderInfo &&
            props.orderInfo?.comments.map((e) => (
                <>
                    {" "}
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
        {/*                    <UserAvatar
                                clickable
                                userInfo={e && }
                                style={{ width: "1.5em", height: "1.5em" }}
                            />*/}
                            <Link href={`/profile/${e?.createdBy.id}`}>
                                <Avatar {...stringAvatar(e?.createdBy.login)} />
                            </Link>
                        </ListItemAvatar>
                        <ListItemText
                            primary={e && e.content}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        @{e && e.createdBy.login}
                                    </Typography>
                                    {` - ${format(new Date(e?.createdAt), 'dd.MM.yyyy')}`}
                                </React.Fragment>
                            }
                        />

                        {props.withActions&&
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
                                                marginTop: "0.5em",
                                            }}
                                            {...bindTrigger(popupState)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>

                                        <Menu {...bindMenu(popupState)}>
                                            <MenuItem
                                                onClick={() => {
                                                    deleteComment(e.id);
                                                    popupState.close();
                                                    props.onDelete();
                                                }}
                                            >
                                                Удалить сообщение
                                            </MenuItem>
                                            <MenuItem onClick={popupState.close}>
                                                Заблокировать автора
                                            </MenuItem>
                                        </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>}

                    </ListItem>
                    <Divider variant="inset" component="li" />
                </>
            ))}
    </List>

    </div>);
}

export default ChatBox
