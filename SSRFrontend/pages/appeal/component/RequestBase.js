import React, {useCallback, useEffect, useRef, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "react-bootstrap/Card";
import {Icon, Step} from "semantic-ui-react";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import HeaderNav from "../../../src/components/headerNav";
import {useRouter,} from "next/router";
import useFrontendApi from "../../../frontendApiHooks";
import GalleryList from "../../../src/components/Gallery";
import OrderTextBox from "../../../src/components/OrderTextBox";
import DropdownSimple from "../../../src/components/DropdownSimple";
import useUrlStore from "../../../UrlsStore";
import ChatBox from "../../../src/components/ChatBox";
import {getStatusRusStr} from "../../../utils";
import {useBus} from "react-bus";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const AntTabs = withStyles({
    root: {
        borderBottom: "1px solid #e8e8e8",
    },
    indicator: {
        backgroundColor: "#1890ff",
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: "none",
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        marginTop: theme.spacing(2),
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:hover": {
            color: "#40a9ff",
            opacity: 1,
        },
        "&$selected": {
            color: "#1890ff",
            fontWeight: theme.typography.fontWeightMedium,
        },
        "&:focus": {
            color: "#40a9ff",
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(0),
    },
    demo1: {
        backgroundColor: theme.palette.background.paper,
    },
}));

const Statuses = ["closed", "check", "accepted", "working", "done"];

function RequestBase(props) {
    const history = useRouter();
    const bus = useBus();

    const currentUserInfo = props.userInfo;

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const {
        getOrderInfoById,
        patchOrder,
        postComment
    } = useFrontendApi();
    const [order, setOrder] = React.useState(props.orderInfo);
    const [textFieldsData, setTextFieldsData] = useState({});



    const {getBackendUrl} = useUrlStore();
    const baseUrl = getBackendUrl();

    const commentTextRef = useRef();


    const loadAppeal = useCallback(async () => {
        const orderInfo = await getOrderInfoById(order?.id, undefined);
        setOrder(orderInfo);
    },[])

    const onOpenAppealCardModal = React.useCallback(async function () {
        // alert('opened'+props.orderId);
        const resp = await getOrderInfoById(order.id);
        console.log(resp);
        setOrder(resp);
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="App">
            <HeaderNav isAuth={props.isAuth}/>

            <br />

            <div className={"mx-5"}>
                <Row>
                    <Col sm={12} md={12} lg={12} xl={5}>
                        <Row style={{ placeContent: "center" }}>
                            <h2 className="font-weight-light">
                                Заявление №{order && order.id}
                            </h2>
                        </Row>
                        <Row style={{ justifyContent: "center" }}>
                            <p style={{ justifyContent: "center" }}>
                                статус:{" "}
                                <b style={{ color: "#007bff" }}>
                                    {order && getStatusRusStr(order?.status)}
                                </b>
                            </p>
                        </Row>

                        <Step.Group size="mini" className={"mt-4"}>
                            <Step
                                disabled={order && !(Statuses.indexOf(order?.status) >= 1)}
                                active={order && Statuses.indexOf(order?.status) === 1}
                            >
                                <Icon name="pencil alternate" />
                                <Step.Content>
                                    <Step.Title>Этап 1</Step.Title>
                                    <Step.Description>Модерация</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step disabled={order && !(Statuses.indexOf(order?.status) >= 2)}>
                                <Icon name="paper plane outline icon" />
                                <Step.Content>
                                    <Step.Title>Этап 2</Step.Title>
                                    <Step.Description>Отправка</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step
                                disabled={order && !(Statuses.indexOf(order?.status) >= 2)}
                                active={order && Statuses.indexOf(order?.status) === 2}
                            >
                                <Icon name="spinner loading" />
                                <Step.Content>
                                    <Step.Title>Этап 3</Step.Title>
                                    <Step.Description>Рассмотрение</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step
                                disabled={order && !(Statuses.indexOf(order?.status) >= 3)}
                                active={order && Statuses.indexOf(order?.status) === 3}
                            >
                                <Icon name="wrench" />
                                <Step.Content>
                                    <Step.Title>Этап 4</Step.Title>
                                    <Step.Description>Исполнение</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step
                                disabled={order && !(Statuses.indexOf(order?.status) >= 4)}
                                active={order && Statuses.indexOf(order?.status) === 4}
                            >
                                <Icon name="thumbs up outline" />
                                <Step.Content>
                                    <Step.Title>Этап 5</Step.Title>
                                    <Step.Description>Исполнено</Step.Description>
                                </Step.Content>
                            </Step>
                        </Step.Group>

                        <br />
                        <br />

                        {order && (
                            <OrderTextBox
                                order={order}
                                isEdit={true}
                                onChangeDescription={(e) =>
                                    setTextFieldsData({
                                        ...textFieldsData,
                                        ...{description: e.target.value},
                                    })
                                }
                            />
                        )}

                        {currentUserInfo?.role?.name === "Moderator"&&
                            <Button
                                variant="primary"
                                className={"w-100"}
                                onClick={async () => {
                                    console.log("agree");
                                    const result = await patchOrder(textFieldsData, order.id);
                                }}
                            >
                                Сохранить изменения
                            </Button>
                        }
                    </Col>

                    <Col>
                        <div className={classes.root}>
                            <div className={classes.demo1}>
                                <AntTabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="ant example"
                                >
                                    <AntTab
                                        value={1}
                                        label={`Приложения (${order && order?.attachments.length})`}
                                    />
{/*
                                    <AntTab value={2} label="Документы (--)" />
*/}
                                    <AntTab
                                        value={3}
                                        label={`Комментарии (${order && order?.comments.length})`}
                                    />
                                    {(currentUserInfo?.role?.name === "Moderator" || currentUserInfo?.role?.name === "GovMan") &&
                                        <AntTab value={4} label="Действия"/>
                                    }
                                </AntTabs>
                                <Typography className={classes.padding} />

                                <TabPanel value={value} index={1}>
                                    <GalleryList
                                        photos={
                                            order &&
                                            order.attachments.map((e) => ({
                                                src: `${baseUrl}/file/preview/${e}`,
                                                width: 4,
                                                height: 3,
                                            }))
                                        }
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    {/*<List style={{  overflow: "auto" }}>
                                        {order &&
                                            order?.comments.map((e) => (
                                                <>
                                                    {" "}
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <UserAvatar
                                                                clickable
                                                                userId={e && e.createdBy.id}
                                                                style={{ width: "1.5em", height: "1.5em" }}
                                                            />
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
                                                                        {e && e.createdBy.login}
                                                                    </Typography>
                                                                    {` - ${e && e.createdAt}`}
                                                                </React.Fragment>
                                                            }
                                                        />

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
                                                        </PopupState>
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                </>
                                            ))}
                                    </List>*/}

                                    <Row className={"d-flex mt-3"}>
                                        <ChatBox orderInfo={order} onDelete={()=>onOpenAppealCardModal()}/>

                                        <Row className={"d-flex mt-3"}>
                                            <TextField
                                                className={"flex-grow-1 ml-3"}
                                                id="filled-basic"
                                                label="Текст сообщения"
                                                variant="filled"
                                                inputRef={commentTextRef}
                                                style={{width: "auto"}}
                                            />
                                            <IconButton
                                                className={"mx-3"}
                                                color="primary"
                                                aria-label="upload picture"
                                                component="span"
                                                onClick={()=>{postComment(order.id, commentTextRef.current.value).then(() =>
                                                    onOpenAppealCardModal());
                                                }}
                                                style={{width: "auto"}}
                                            >
                                                <SendIcon />
                                            </IconButton>
                                        </Row>

                                        {/*<TextField
                                            className={"flex-grow-1 ml-3"}
                                            id="filled-basic"
                                            label="Текст сообщения"
                                            variant="filled"
                                        />
                                        <IconButton
                                            className={"mx-3"}
                                            color="primary"
                                            aria-label="upload picture"
                                            component="span"
                                        >
                                            <SendIcon />
                                        </IconButton>*/}
                                    </Row>
                                </TabPanel>
                                <TabPanel value={value} index={4}>


                                    { (currentUserInfo?.role?.name === "Moderator" || currentUserInfo?.role?.name === "GovMan") &&
                                        <Card>
                                            <Card.Body style={{textAlign: "left"}}>
                                                <Row>
                                                    <Col sm={2}>
                                                        <DropdownSimple
                                                            text={"Статус"}
                                                            options={[
                                                                {key: 1, text: "Модерация", value: 1, disabled: currentUserInfo.role?.name !== "Moderator"},
                                                                {key: 2, text: "Проверенно", value: 2, disabled: currentUserInfo.role?.name !== "Moderator"},
                                                                {key: 3, text: "Исполнение", value: 3},
                                                                {key: 4, text: "Исполненно", value: 4},
                                                                {key: 0, text: "Закрыто", value: 0},
                                                            ]}
                                                            onChange={(e, data) => {
                                                                console.log(data.value);
                                                                console.log("agree");
                                                                patchOrder(
                                                                    {status: Statuses.at(data.value)},
                                                                    order.id //
                                                                ).then((r) => {
                                                                    console.log(r);
                                                                    loadAppeal();
                                                                })
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        При необходимости можно перевести статус обращения в
                                                        любое положение.
                                                        <br/>
                                                        Внимание! При установке статуса "Проверенно",
                                                        сообщение будет сразу отправленно представителю
                                                        администрации на рассмотрение!!!
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    }
                                </TabPanel>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default RequestBase;
