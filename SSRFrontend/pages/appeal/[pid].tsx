import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {getSession} from "next-auth/react";
import useBackendApi from "../../backendApiHooks";
import useFrontendApi from "../../frontendApiHooks";
import RequestBase from './component/RequestBase'
import {useRouter} from "next/router";


export async function getServerSideProps(context) {
    const {getUserInfoById, getOrderInfoById} = useBackendApi();
    const {pid} = context.query;
    const {req} = context;

    const session = await getSession({req});
    const authUserInfo = session?.user ? (await getUserInfoById(session.user?.id)) : null;

    if(!(authUserInfo?.id>=0 || authUserInfo?.role == "gov" || authUserInfo?.role == 'admin')){
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    const orderInfo = await getOrderInfoById(pid, session.user?.accessToken);


    return {props: {userInfo: authUserInfo, orderInfo: orderInfo, isAuth: authUserInfo?.id >=0}} //
}
//currentUserInfo?.role?.name === "Moderator"
export default function Appeal(props) {
    return <RequestBase {...props}/>
}