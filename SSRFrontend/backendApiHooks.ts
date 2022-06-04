import * as React from "react";
import axios from 'axios';
import * as Validator from 'validatorjs';
import jwt from 'jwt-decode' // import dependency
import {useRouter} from "next/router";
import useUrlStore from './UrlsStore';
import {useBus} from "react-bus";
import {useSession} from "next-auth/react";
// import {toast} from "react-semantic-toasts";

export class User {
    name: String;
    surname: String;
}

export class IAuthenticationResponse {
    ok: boolean;
    user?: User;
}

const useBackendApi = () => {
    const {getBackendUrl} = useUrlStore();
    const baseUrl = getBackendUrl();


    async function getOrdersByOwnerId(pageN, sizeN, id) {
        let result = null;


        result = (await axios.get(`${baseUrl}/appeal?page=${pageN - 1}&size=${sizeN}&filter=${JSON.stringify({authorid: Number(id)})}`)).data;
        return result;
    }


    async function getAllUsers() {
        let res;

        try {
            res = (await axios.get(`${baseUrl}/user?min=100`)).data;
        } catch (e) {
            console.log('ERRRRORR!!');
        }
        return res;
    }

    async function authentication(data): Promise<IAuthenticationResponse> {
        let ap: IAuthenticationResponse = {ok: false}

        console.log(data);

        try {
            let result = await axios.post(`${baseUrl}/token`, data, {
                // timeout: 3000
            })
            if (result.status === 204 || result.data.token?.length < 5) {
                // bus.emit('openToast', {msg: "К сожалению пользователь с таким логином или паролем не существует!"});
                return ap;
            }

            ap.ok = true;
            ap.user = result.data;
            return ap;

        }catch (e) {
            return {...ap, ...{message: e.message}};
        }
    }

    async function getUserInfoById(id) {
        let res;
        res = (await axios.get(`${baseUrl}/user/${id}`)).data;
        return res;
    }

    async function getAllAppealCategory() {
        const result = (await axios.get(`${baseUrl}/AppealCategory`)).data;
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

    async function getOrderInfoById(id, token) {
        const cfg = {
            headers: {
                token: token,
            }
        }

        const result = (await axios.get(`${baseUrl}/appeal/${id}`, cfg)).data;

        return result;
    }

    return {
        authentication,
        getUserInfoById,
        getAllAppealCategory,
        getOrderInfoById,
        getLastCreated,
        getAllOrders,
        getOrdersByOwnerId,
        getAllUsers
    };
}

//export const ApiContext = React.createContext(useBackendApi());

export default useBackendApi;