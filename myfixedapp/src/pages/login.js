import React, {useCallback, useEffect, useState} from "react";
import {Image, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import {AccountCircle} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import KeyIcon from '@material-ui/icons/VpnKey';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import DividerWithText from "../components/DividerWithText";
import vkIcon from "../resources/vk_icon.svg";
import googleIcon from "../resources/google_icon.svg";
import okIcon from "../resources/ok_icon.svg";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import 'video-react/dist/video-react.css'; // import css
import HeaderNav from "../components/headerNav";
import {Link} from "react-router-dom";
import useBackendApi from "../logic/BackendApiHook";
import useUrlStore from "../logic/UrlsStore";


function LoginPage() {
    const { authentication, checkAuth } = useBackendApi();
    const [ textFieldsData, settextFieldsData ] = useState({"remember":false});
    const {getBackendUrl} = useUrlStore();
    const baseUrl = getBackendUrl();

    useEffect(() => {
        checkAuth();
        // console.log('show');
        // bus.emit('show', true);
    },[checkAuth])


    const handleSubmit = useCallback((e) => {
        console.log('handleSubmit');
        e.preventDefault();
    }, [])


    return (
        <div className="App">

{/*
            <RegistrationCarousel/>
*/}
            <div>
                <HeaderNav/>

                {/*Page Content*/}
                <section className="pb-5 pt-5">
                    <div className="container pl-sm-5">

                        <div className="row">

                            <div className="col-8 px-5"><Container >

                              {/*  <ReactPlayer
                                    url={viderurl}
                                    playing={true}
                                    muted={true}
                                    config={{
                                        file: {
                                            playerVars: { showinfo: 1, playing:true },

                                        }
                                    }}
                                />*/}

                            </Container></div>

                            <div className="col-md-4 col-sm-6 col-xs-6">
                                <h2 className="font-weight-light" > Авторизация </h2>

                                <div className="mt-5" >
                                    <TextField id="input-with-icon-grid" label={<p><AccountCircle /> &nbsp; Логин</p>} variant="filled" type = "text" fullWidth onChange={e=>{settextFieldsData({...textFieldsData,...{"loginOrMobile":e.target.value}})}}/>
                                    <TextField id="input-with-icon-grid" label={<p><KeyIcon /> &nbsp; Пароль</p>} variant="filled" type="password" fullWidth onChange={e=>{settextFieldsData({...textFieldsData,...{"password":e.target.value}})}}/>
                                </div>

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            //checked={state.checkedB}
                                            onChange={e=>settextFieldsData({...textFieldsData,...{"remember":e.target.checked}})}
                                            color="primary"

                                        />
                                    }
                                    label="Запомнить пароль"
                                    style={{marginLeft: "0em",
                                        marginRight: "auto",
                                        display: "flex"}}
                                />

                                <div className="mt-3">
                                {/*<DividerWithText> или </DividerWithText>*/}
                                </div>

                                <Row className="d-flex justify-content-center">
                                    <IconButton style={{width:"2.5em", height:"2.5em"}} color="primary" aria-label="add to shopping cart"
                                                onClick={event =>  window.location.href=`${baseUrl}/oauth2/authorization/google`}
                                                onClick={()=>{
                                                    const childWindow = window.open(`${baseUrl}/oauth2/authorization/google`, "_blank", "width=500, height=650");
                                                }}
                                    >
                                        <Image src={vkIcon} style={{width:"2.5em"}} />
                                    </IconButton>

                                    <IconButton style={{width:"2.6em", height:"2.6em"}} color="primary" aria-label="add to shopping cart"
                                                //onClick={event =>  window.location.href='http://localhost:8888/oauth2/authorization/google'}
                                                onClick={()=>{
                                                    const childWindow = window.open(`${baseUrl}/oauth2/authorization/google`, "_blank", "width=500, height=650");
                                                }}
                                    >
                                        <Image src={googleIcon} style={{width:"3em"}}/>
                                    </IconButton>

                                    <IconButton style={{width:"2.5em", height:"2.5em"}} color="primary" aria-label="add to shopping cart"
                                                //onClick={event =>  window.location.href='http://localhost:8888/oauth2/authorization/google'
                                                onClick={()=>{
                                                    const childWindow = window.open(`${baseUrl}/oauth2/authorization/google`, "_blank", "width=500, height=650");
                                                }}

                                    >
                                        <Image src={okIcon} style={{width:"1.8em", height:"1.8em"}}/>
                                    </IconButton>
                                </Row>

{/*                                <div className="pt-5" style={{display: "flex"}}>
                                    <FormControlLabel
                                        style={{ float: 'left' }}
                                    control={
                                        <Checkbox
                                            //checked={state.checkedB}
                                            //onChange={handleChange}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Запомнить пароль"
                                />
                                    <button type="button" className="btn btn-none" style={{ float: 'right' }}>Забыл пароль</button>

                                </div>*/}

                                <form onSubmit={(e)=>handleSubmit(e)}>

                                <div className="d-flex bd-highlight mt-4">

                                    <button type="button" className="btn btn-outline-primary p-2 w-100 bd-highlight" onClick={()=>authentication(textFieldsData)} style={{}}>Войти</button>
                                        {/*authentication(textFieldsData)*/}

                                    <Link to="/registration" style={{color:'inherit'}}><button type="button" className="btn btn-none p-2 flex-shrink-1 bd-highlight" style={{float:"right", color:"#a7a7a7"}}>зарегистрироваться</button></Link>
                                </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </section>



            </div>
        </div>
    );
}

export default LoginPage;
