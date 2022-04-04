import logo from '../resources/easylogo.svg';
import React, {useEffect} from "react";
import {Button, Col, Container, Image, ListGroup, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import CustomizedTabs from "../components/menuTabs";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "react-bootstrap/Card";
import {Icon, Step} from 'semantic-ui-react'
import Table from "react-bootstrap/Table";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../resources/avatar.jpg";
import ListItemText from "@material-ui/core/ListItemText";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import FolderList from "../components/FolderList";
import {Link} from "react-router-dom";
import HeaderNav from "../components/headerNav";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import useBackendApi from "../logic/BackendApiHook";
import {UserAvatar} from "../components/UserAvatar";
import GalleryList from "../components/Gallery";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

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
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        marginTop: theme.spacing(2),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
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
    }
}));


function RequestControlPanel() {
    let { orderId } = useParams();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const {authentication, registration, fileUpload, getUserInfo, checkAuth, logout, postOrder, getOrderInfoById} = useBackendApi();
    const [order, setOrder] = React.useState();


    useEffect(async () => {
        const oid = orderId;
        setOrder(await getOrderInfoById(oid));
        console.log(order);
    },[]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="App">

            <HeaderNav/>

            <br/>

            <div className={"mx-5"}>
                <Row>
                    <Col sm={12} md={12} lg={12} xl={5}>

                        <Row style={{placeContent: "center"}}>
                            <h2 className="font-weight-light">Заявление №{order&&order.id}</h2>
                        </Row>
                        <Row style={{justifyContent: "center"}}>
                            <p style={{justifyContent: "center"}}>статус: <b style={{color: "#007bff"}}>на
                                рассмотрении</b></p>
                        </Row>

                        <Step.Group size='mini' className={"mt-4"}>
                            <Step>
                                <Icon name='pencil alternate'/>
                                <Step.Content>
                                    <Step.Title>Этап 1</Step.Title>
                                    <Step.Description>Модерация</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step>
                                <Icon name='paper plane outline icon'/>
                                <Step.Content>
                                    <Step.Title>Этап 2</Step.Title>
                                    <Step.Description>Отправка</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step active>
                                <Icon name='spinner loading'/>
                                <Step.Content>
                                    <Step.Title>Этап 3</Step.Title>
                                    <Step.Description>Рассмотрение</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step disabled>
                                <Icon name='thumbs up outline'/>
                                <Step.Content>
                                    <Step.Title>Этап 4</Step.Title>
                                    <Step.Description>Исполнение</Step.Description>
                                </Step.Content>
                            </Step>
                        </Step.Group>

                        <br/>
                        <br/>

                        <Card className={"mb-5"} style={{width: '100%', textAlign: "left"}}>
                            <Card.Body>
                                <Card.Title>Текст обращения</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{order&&order.createdAt}</Card.Subtitle>
                                <Card.Text>
                                    {order&&order.description}

                                </Card.Text>
                                <Button variant={"outline-primary"}>Редактировать</Button>
                            </Card.Body>
                        </Card>

                    </Col>

                    <Col>


                        <div className={classes.root}>
                            <div className={classes.demo1}>
                                <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                                    <AntTab value={1} label={`Приложения (${order&&order.attachments.length})`}/>
                                    <AntTab value={2} label="Документы (--)"/>
                                    <AntTab value={3} label={`Комментарии (${order&&order.comments.length})`}/>
                                    <AntTab value={4} label="Действия"/>
                                </AntTabs>
                                <Typography className={classes.padding}/>


                                <TabPanel value={value} index={1}>
                                    <GalleryList photos={order&&order.attachments.map(e=>({
                                        src: `http://localhost:8090/file/preview/${ e.shortFilename}`,
                                            width: 4,
                                            height: 3

                                    }))}/>
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    <List style={{height: "30em", overflow: "auto"}}>
                                        {order&&order.comments.map(e=> <> <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <UserAvatar clickable userId={e&&e.createdBy.id} style={{width:"1.5em", height:"1.5em"}}/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={e&&e.content}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textPrimary"
                                                        >
                                                            {e&&e.createdBy.login}
                                                        </Typography>
                                                        {` - ${e&&e.createdAt}`}
                                                    </React.Fragment>
                                                }
                                            />

                                            <PopupState variant="popover" popupId="demo-popup-menu"
                                                        style={{float: "right"}}>
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
                                                            <MenuItem onClick={popupState.close}>Удалить
                                                                сообщение</MenuItem>
                                                            <MenuItem onClick={popupState.close}>Заблокировать
                                                                автора</MenuItem>
                                                        </Menu>
                                                    </React.Fragment>
                                                )}
                                            </PopupState>
                                        </ListItem>
                                            <Divider variant="inset" component="li"/></>
                                            )}

                                    </List>

                                    <Row className={"d-flex mt-3"}>
                                        <TextField className={"flex-grow-1 ml-3"} id="filled-basic"
                                                   label="Текст сообщения" variant="filled"/>
                                        <IconButton className={"mx-3"} color="primary" aria-label="upload picture"
                                                    component="span">
                                            <SendIcon/>
                                        </IconButton>
                                    </Row>
                                </TabPanel>
                                <TabPanel value={value} index={4}>
                                    <Card>
                                        <Card.Body style={{textAlign: "left"}}>
                                            <Row>
                                                <Col sm={2}><Button variant="primary" className={"w-100"}>Закрыть
                                                    заявление</Button></Col>
                                                <Col>Закрыв ваше заявление, мы перестанем его поддерживать и вы больше
                                                    не сможете в дальнейшем его продолжить.</Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <br/>
                                    <Card>
                                        <Card.Body style={{textAlign: "left"}}>
                                            <Row>
                                                <Col sm={2}><Button variant="primary" className={"w-100"}>Получить
                                                    данные агента</Button></Col>
                                                <Col>Данное действие позволит вам получить данные агента который следит
                                                    за вашим делом.</Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <br/>
                                    <Card>
                                        <Card.Body style={{textAlign: "left"}}>
                                            <Row>
                                                <Col sm={2}><Button variant="primary" className={"w-100"}>Сменить
                                                    агента</Button></Col>
                                                <Col>Если агент вас по каким-то причинам не устраивает, то вы можете его
                                                    сменить, но на этапе рассмотрения, это бессмысленно, так как
                                                    скорость рассмотрения от агента ни как не зависит.</Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </TabPanel>
                            </div>

                        </div>
                    </Col>

                </Row>
            </div>


        </div>
    );
}

export default RequestControlPanel;
