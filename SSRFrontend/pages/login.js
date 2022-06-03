import React, {useCallback, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {AccountCircle} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import KeyIcon from '@material-ui/icons/VpnKey';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import 'video-react/dist/video-react.css';
import HeaderNav from "../src/components/headerNav";
import useUrlStore from "../UrlsStore";
import Link from 'next/link'
import { signIn } from "next-auth/react"
import {useRouter} from "next/router";
import {useBus} from "react-bus";


function LoginPage() {
    const [ textFieldsData, settextFieldsData ] = useState({"remember":false});
    const {getBackendUrl} = useUrlStore();
    const history = useRouter();
    const bus = useBus();

/*    useEffect(() => {
        checkAuth();
        // console.log('show');
        // bus.emit('show', true);
    },[checkAuth])*/


    const handleSubmit = useCallback((e) => {
        console.log('handleSubmit');
        e.preventDefault();
    }, [])


    return (
        <div className="App">
            <div>

                <HeaderNav/>


                <section className="pb-5 pt-5">
                    <div className="container pl-sm-5">

                        <div className="row">

                            <div className="col-8 px-5"><Container >

{/*
                                <ReactPlayer
                                    url={viderurl}
                                    playing={true}
                                    muted={true}
                                    config={{
                                        file: {
                                            playerVars: { showinfo: 1, playing:true },

                                        }
                                    }}
                                />
*/}

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
                                </div>


                                <div className="d-flex bd-highlight mt-4">

                                    <button type="button" className="btn btn-outline-primary p-2 w-100 bd-highlight" onClick={async () => {
                                        // authentication(textFieldsData);



                                        const res = await signIn('credentials', { redirect: false, callbackUrl: `${window.location.origin}`}, textFieldsData)

                                        if (res?.error) {
                                            bus.emit('openToast', {msg: res.error, style: 'info'});
                                        }else if (res?.ok) history.push("profile");



                                    }} style={{}}>Войти</button>

                                    <Link href="/registration" style={{color:'inherit'}}>
                                        <button type="button" className="btn btn-none p-2 flex-shrink-1 bd-highlight" style={{float:"right", color:"#a7a7a7"}}>зарегистрироваться</button>
                                    </Link>
                                </div>

                            </div>



                        </div>
                    </div>
                </section>




            </div>
        </div>
    );
}

export default LoginPage;
