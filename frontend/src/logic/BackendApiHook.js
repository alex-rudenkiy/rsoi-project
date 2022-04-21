import {useEffect, useState} from "react";
import axios from 'axios';
import * as React from "react";
import {useHistory} from "react-router-dom";


const useBackendApi = () => {
    const baseUrl = "http://localhost:8888";
    //const [token, setToken] = useState(null);
    const history = useHistory();

    /*    useEffect(() => {
            console.log(localStorage.getItem("token"));
            setToken(localStorage.getItem("token"));
            //localStorage.setItem('myData', data);
        },[]);*/

    /*  useEffect(() => {

          console.log("TOOKEN");
      }, [token])*/

    function getLocalToken() {
        return localStorage.getItem("token");
    }


    function checkAuth() {
        let token = getLocalToken();
        return (token !== null);
        /*if(token === null){
            history.push('/login');
        }else{
            history.push('/profile');
        }*/
    }


    function authentication(data) {
        console.log(data);
        axios.post(`${baseUrl}/token`, data)
            .then(res => {
                if(res.data.length<5) return;
                console.log(res.data);
                localStorage.setItem("token", res.data);
                let token = getLocalToken();
                if (token === null) {
                    history.push('/login');
                } else {
                    history.push('/profile');
                }
            }).catch(e => {

            if (e && e.response && e.response.status == 424) {
                localStorage.setItem("token", e.response.data);
                let token = getLocalToken();
                if (token === null) {
                    history.push('/login');
                } else {
                    history.push('/profile');
                }
                //console.log('unauthorized, logging out ...');
            }

        })
    }

    //login/oauth2/code/google
    async function oAuthAuthentication() {
        let response = await fetch(`${baseUrl}/login/oauth2/code/get`, {credentials: 'include', mode: "cors"});
        let text = await response.json(); // прочитать тело ответа как текст
        //console.log(text);

        if (text.name === "oauthToken") {
            localStorage.setItem("token", text.value);
            return text.value;
            //history.push('/profile');
        } else {
            return null;
            //history.push('/login');
        }


    }

    async function registration(data, redirect) {
        let result = (await axios.post(`${baseUrl}/user`, data))
        console.log("reg step1");
        localStorage.setItem("token", result.data.token);
        return result.data;
    }


    function fileUpload(data, file) {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('fileType', data.fileType);
        //formData.append('token',data.token);

        return fetch('http://localhost:8888/file/', {
            method: 'POST',
            body: formData
        })
    }

    async function getAllUsers() {
        let res;

        try {
            res = (await axios.get(`${baseUrl}/user`)).data;
        }catch (e) {
            console.log('ERRRRORR!!');
        }
        return res;
    }


    async function getUserInfo(id, redirect) {

        if (id === undefined) {
            const t = getLocalToken();
            console.log("t=", t);
            try {
                const r = (await axios.get(`${baseUrl}/token?jwt=${t}`)).data;
                if (r.id === null && redirect) history.push('/login')
                console.log(r);
                return r;
            } catch (e) {
                if (redirect)
                    history.push('/login');
            }

            /*
             axios.get(`${baseUrl}/user?token=${t}`).catch((e)=>{
                 logout()
             } )*/


        } else {
            let res;

            try {
                res = (await axios.get(`${baseUrl}/user/${id}`)).data;
            }catch (e) {
                console.log('ERRRRORR!!');
            }
            return res;
        }
    }

    function logout() {
        localStorage.removeItem("token");
        history.push('/login');
    }

    async function postOrder(data, temporal) {
        let token;
        if (temporal) {
            token = await registration({
                ...data,
                ...{
                    passwordHash: "",
                    avatarFileFakeUrl: "",
                    login: "",
                    description: "",
                    socialLink: [],
                    temporal: true,
                    enabled: false
                }
            });
        } else {
            token = getLocalToken();
        }

        const result = await axios.post(`${baseUrl}/appeal`, {
            ...data, ...{
                ownerToken: token,
                title: `${data.category}. ${data.geoPosition.fullname}`
            }
        });
        console.log(result);
        return result;
    }

    async function patchOrder(data, appealId) {
        const cfg = {
            headers: {
                token: getLocalToken(),
            }
        }
        const result = await axios.patch(`${baseUrl}/moderator/appeal/${appealId}`, data, cfg);
        console.log(result);
        return result;
    }

    async function getOrderInfoById(id) {
        let token;
        token = await getLocalToken(id);
        const cfg = {
            headers: {
                token: token,
            }
        }
        const result = (await axios.get(`${baseUrl}/appeal/${id}`, cfg)).data;

        //const t = registration({ "name":data.name,"surname":data.surname, "patronymic":data.patronymic, "mobilenumber":data.mobilenumber });

        return result;
    }

    async function updateUserInfo(data, redirect) {
        let token = await getLocalToken();
        const cfg = {
            headers: {
                token: token,
            }
        }
        return axios.put(`${baseUrl}/user`, data, cfg);
    }

    async function putCamMaskById(camid, maskFileFakeName) {
        let token;
        token = await getLocalToken();
        const cfg = {
            headers: {
                token: token,
            }
        }

        const result = (await axios.post(`${baseUrl}/mask/${camid}`, {maskFileFakeName: maskFileFakeName}, cfg)).data.value

        return result;
    }

    async function getOrdersByOwnerId(pageN, sizeN, id) {
        let result = null;
        let cfg = {
            headers: {
                token: "",
            }
        }

        if (id == null) {
            let token;
            token = await getLocalToken(id);
            cfg = {
                headers: {
                    token: token,
                }
            }
            console.log(result);
            id = -1;
            //const t = registration({ "name":data.name,"surname":data.surname, "patronymic":data.patronymic, "mobilenumber":data.mobilenumber });
        }
        result = (await axios.get(`${baseUrl}/appeal?page=${pageN - 1}&size=${sizeN}&id=${id}`, cfg)).data;
        return result;
    }

    async function getCountOrdersByOwnerId(id) {
        let result = null;
        if (id == null) {
            let token;
            token = await getLocalToken(id);
            const cfg = {
                headers: {
                    token: token,
                }
            }


            result = (await axios.get(`${baseUrl}/appeal/count`, cfg)).data.length;
            //console.log(result);


            //const t = registration({ "name":data.name,"surname":data.surname, "patronymic":data.patronymic, "mobilenumber":data.mobilenumber });
        }
        return result;
    }

    async function postComment(orderId, content) {
        const cfg = {
            headers: {
                token: await getLocalToken(orderId),
            }
        }
        const result = (await axios.post(`${baseUrl}/comment`, {appeal: orderId, content: content}, cfg)).data;
        return result;
    }

    async function deleteComment(commentId) {
        const cfg = {
            headers: {
                token: getLocalToken(),
            }
        }
        const result = await axios.delete(`${baseUrl}/moderator/comment/${commentId}`, cfg);
        console.log(result);
        return result;
    }

    async function getAllOrders(page, size) {
        let result;
        if (page == null || size == null) {
            result = (await axios.get(`${baseUrl}/appeal/`)).data;
        } else {
            result = (await axios.get(`${baseUrl}/appeal/pages?page=${page}&size=${size}`)).data
        }
        //const result = (await axios.get(`${baseUrl}/getall/appeals`)).data;
        return result;
    }

    async function getLastCreated() {
        const result = (await axios.get(`${baseUrl}/getLastCreated/appeal`)).data;
        return result;
    }

    async function getAllAppealCategory() {
        const result = (await axios.get(`${baseUrl}/AppealCategory`)).data;
        return result;
    }

    async function getCameraInfoById(id) {
        const cfg = {
            headers: {
                token: await getLocalToken(),
            }
        }
        const result = (await axios.get(`${baseUrl}/scs/${id}`, cfg)).data;
        return result;
    }

    async function updateCameraInfoById(id, data) {
        const cfg = {
            headers: {
                token: await getLocalToken(),
            }
        }
        const result = (await axios.post(`${baseUrl}/scs/${id}`, data, cfg)).data;
        return result;
    }

    async function deleteCameraById(id) {
        const cfg = {
            headers: {
                token: await getLocalToken(),
            }
        }
        const result = (await axios.delete(`${baseUrl}/scs/${id}`, cfg));
        return result;
    }

    async function updateUserPassword(data) {
        const cfg = {
            headers: {
                token: await getLocalToken(),
            }
        }
        const result = (await axios.put(`${baseUrl}/userPassword`, data, cfg));
        return result;
    }


    async function addNewCamera(data) {
        const cfg = {
            headers: {
                token: await getLocalToken(),
            }
        }
        const result = (await axios.post(`${baseUrl}/scs`, data, cfg)).data;
        return result;
    }

    return {
        authentication, registration, fileUpload,
        getUserInfo, checkAuth, logout, postOrder,
        getOrderInfoById, getOrdersByOwnerId,
        getCountOrdersByOwnerId, postComment, getAllOrders,
        getLastCreated, addNewCamera, getCameraInfoById,
        putCamMaskById, updateCameraInfoById, deleteCameraById,
        getAllAppealCategory, updateUserInfo, updateUserPassword,
        oAuthAuthentication, patchOrder, deleteComment, getAllUsers,
    };
}

//export const ApiContext = React.createContext(useBackendApi());

export default useBackendApi;
