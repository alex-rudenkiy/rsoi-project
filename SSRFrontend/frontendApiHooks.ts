import * as React from "react";
import axios from 'axios';
import * as Validator from 'validatorjs';
import jwt from 'jwt-decode' // import dependency
import {useRouter} from "next/router";
import useUrlStore from './UrlsStore';
import {useBus} from "react-bus";
import {signOut, useSession} from "next-auth/react";
// import {toast} from "react-semantic-toasts";

const useFrontendApi = () => {
    const {getBackendUrl} = useUrlStore();
    const baseUrl = getBackendUrl();



    //const [token, setToken] = useState(null);
    const history = useRouter();

    /*    useEffect(() => {
            console.log(localStorage.getItem("token"));
            setToken(localStorage.getItem("token"));
            //localStorage.setItem('myData', data);
        },[]);*/

    /*  useEffect(() => {

          console.log("TOOKEN");
      }, [token])*/
    const { data: session, status } = useSession()

    function getLocalToken() {
        if (status === "authenticated") {
            return session.user.accessToken;
        }else{
            return null;
        }

    }


    function checkAuth() {
        let token = getLocalToken();
        return (token !== null);
        /*if(token === null){
            history('/login');
        }else{
            history('/profile');
        }*/
    }


    function authentication(data) {
        console.log(data);

        axios.post(`${baseUrl}/token`, data)
            .then(res => {
                if (res.status === 204){
                    bus.emit('openToast', {msg: "К сожалению пользователь с таким логином или паролем не существует!"});
                    return;
                }

                if (res.data.length < 5) return;
                console.log(res.data);
                localStorage.setItem("token", res.data);

                let token = getLocalToken();
                if (token === null) {
                    history('/login');

                } else {
                    history('/profile');
                }
            }).catch(e => {

            if (e && e.response && e.response.status === 424) {
                localStorage.setItem("token", e.response.data);
                let token = getLocalToken();
                if (token === null) {
                    history('/login');
                } else {
                    history('/profile');
                }
                //console.log('unauthorized, logging out ...');
            }else if (!e.response.data) {
                bus.emit('openToast', {msg: 'Ошибка сервера.Сервер не доступен!', style: 'error'});
            } else {
                bus.emit('openToast', {msg: e.response.data.message, style: 'warning'});
            }

        })
    }

    //login/oauth2/code/google
    async function oAuthAuthentication() {
        let response = await fetch(`${baseUrl}/login/oauth2/code/get`, {
            credentials: 'include',
            mode: "cors"
        });
        let text = await response.json(); // прочитать тело ответа как текст
        //console.log(text);

        if (text.name === "oauthToken") {
            localStorage.setItem("token", text.value);
            return text.value;
            //history('/profile');
        } else {
            return null;
            //history('/login');
        }
    }

    Validator.registerAsync('username_available', function (username, attribute, req, passes) {
        // do your database/api checks here etc
        // then call the `passes` method where appropriate:
        // passes(); // if username is available
        // passes(false, 'Username has already been taken.'); // if username is not available
    });

    function validAssert(data, rules) {
        let validation = new Validator(data, rules);

        if (!validation.check()) {
            console.log();
            bus.emit('openToast', {msg: Object.entries(validation.errors.errors).map(([key, value]) => value[0]).join(', ')});
        }

        return validation.check();
    }

    const bus = useBus();

    async function registration(data, redirect) {
        const rules = {
            email: "required|email",
            login: "required|min:3",
            name: "required|min:3",
            passwordHash: "required",
            patronymic: "required|min:3",
            surname: "required|min:3"
        }

        console.log(data);
        if (validAssert(data, rules)) {
            try {
                let result = (await axios.post(`${baseUrl}/user`, {
                    ...data,
                    ...{
                        mobilenumber: '0'
                    }
                }))
                console.log("reg step1");
                localStorage.setItem("token", result.data.token);
                return result.data;
            } catch (error) {
                console.log(error)
                if (!error.response.data) {
                    // network error
                    bus.emit('openToast', {msg: 'Ошибка сервера.Сервер не доступен!'});
                    /*toast({
                        title: 'Внимание',
                        description: < p > Ошибка сервера.Сервер не доступен! < /p>,
                        size: 'tiny',
                        type: 'error'
                    });*/
                } else {
                    bus.emit('openToast', {msg: error.response.data.message});
                    /*toast({
                        title: 'Внимание',
                        description: < p > {
                            error.response.data.message
                        } < /p>,
                        size: 'tiny',
                        type: 'warning'
                    });*/
                }
            }
        }
    }


    function fileUpload(data, file) {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('fileType', data.fileType);
        //formData.append('token',data.token);

        return fetch(`${baseUrl}/file/`, {
            method: 'POST',
            body: formData
        })
    }

    async function getAllUsers() {
        let res;

        try {
            res = (await axios.get(`${baseUrl}/user`)).data;
        } catch (e) {
            console.log('ERRRRORR!!');
        }
        return res;
    }

    async function getAllRoles() {
        let res;

        try {
            res = (await axios.get(`${baseUrl}/role`)).data;
        } catch (e) {
            console.log('ERRRRORR!!');
        }
        return res;
    }

    function getUserIdByToken() {
        return jwt(getLocalToken()).id;
    }

    async function checkTokenValidity() {
        const t = getLocalToken();
        if(t===null) return false;
        console.log("t=", t);
        try {
            const r = (await axios.get(`${baseUrl}/token?jwt=${t}`)).data;
            if (r.id === null) clearSession();
            console.log(r);
        } catch (e) {
            clearSession();
        }
    }

    async function getUserInfo(id, redirect) {
        await checkTokenValidity();

        let res;

        if (id === undefined || id === -1) {
            const t = getLocalToken();
            if(t===null) return;
            console.log("t=", t);
            try {
                const r = (await axios.get(`${baseUrl}/token?jwt=${t}`)).data;
                if (r.id === null && redirect) history('/login')
                console.log(r);
                res = (await axios.get(`${baseUrl}/user/${r.id}`)).data;
                console.log(res);
                return res;
            } catch (e) {
                if (redirect)
                    history('/login');
            }

            /*
             axios.get(`${baseUrl}/user?token=${t}`).catch((e)=>{
                 logout()
             } )*/


        } else {


            try {
                res = (await axios.get(`${baseUrl}/user/${id}`)).data;
            } catch (e) {
                console.log('ERRRRORR!!');
            }
            return res;
        }
    }

    function clearSession() {
        localStorage.removeItem("token");
    }

    function logout() {
        localStorage.removeItem("token");
        signOut();
        history.push('/login');
    }

    async function postOrder(data, temporal) {
        console.log(data);
        const rules = {
            description: "required|min:10",
            attachments: "required",
            category: "required",
            status: "required",
            geoPosition: "required",
        }

        console.log(data);
        if (validAssert(data, rules)) {

            let token;
            console.log(data);
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

            let result = undefined;
            try {
                result = await axios.post(`${baseUrl}/appeal`, {
                    ...data,
                    ...{
                        ownerToken: token,
                        title: `${data.category}. ${data.geoPosition.fullname.display_name}`
                    }
                });
                console.log(result);
            }catch (error) {
                if (error.response.status === 502) { // сработал retry механизм
                    bus.emit('openToast', {msg: 'Уважаемый пользователь, в связи с повышенной нагрузкой на сервер ваше сообщение поставленно в очередь, со временем оно будет обязательно обработанно!', style: 'success'});
                    history('/');
                } else if (!error.response.data) {
                    bus.emit('openToast', {msg: 'Ошибка сервера.Сервер не доступен!', style: 'error'});
                } else {
                    bus.emit('openToast', {msg: error.response.data.message, style: 'warning'});
                }
            }
            return result;
        }



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

    async function updateUserInfo(id, data, redirect) {
        let token = await getLocalToken();
        const cfg = {
            headers: {
                token: token,
            }
        }

        let result;
        try {
            result = (await axios.patch(`${baseUrl}/user/${id}`, data, cfg)).data;
            bus.emit('openToast', {msg: "Изменения по идее должны быть сохранены!", style: 'success'});
        }catch (error) {
            if (!error.response.data) {
                bus.emit('openToast', {msg: 'Ошибка сервера.Сервер не доступен!', style: 'error'});
            } else {
                bus.emit('openToast', {msg: error.response.data.message, style: 'warning'});
            }
        }

        return result;
    }

    async function getOrdersByOwnerId(pageN, sizeN, id) {
        let result = null;
        let cfg = {
            headers: {
                token: await getLocalToken(),
            }
        }
        if (id == null || id === -1) {
            let token;
            token = await getLocalToken(id);
            cfg = {
                headers: {
                    token: token,
                }
            }
            console.log(result);
            id = jwt(token).id;
            //const t = registration({ "name":data.name,"surname":data.surname, "patronymic":data.patronymic, "mobilenumber":data.mobilenumber });
        }
        result = (await axios.get(`${baseUrl}/appeal?page=${pageN - 1}&size=${sizeN}&filter=${JSON.stringify({authorid: Number(id)})}`, cfg)).data;
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
        const result = (await axios.post(`${baseUrl}/comment`, {
            appeal: orderId,
            content: content
        }, cfg)).data;
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

    async function deleteUser(userId) {
        const cfg = {
            headers: {
                token: getLocalToken(),
            }
        }
        const result = await axios.delete(`${baseUrl}/moderator/user/${userId}`, cfg);
        console.log(result);
        logout();
        return result;
    }

    async function updateUserPassword(data) {
        const cfg = {
            headers: {
                token: getLocalToken(),
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
        authentication,
        registration,
        fileUpload,
        getUserInfo,
        checkAuth,
        logout,
        postOrder,
        getOrderInfoById,
        getOrdersByOwnerId,
        getCountOrdersByOwnerId,
        postComment,
        updateUserInfo,
        updateUserPassword,
        oAuthAuthentication,
        patchOrder,
        deleteComment,
        getAllUsers,
        deleteUser,
        getUserIdByToken,
        getAllRoles
    };
}

//export const ApiContext = React.createContext(useBackendApi());

export default useFrontendApi;