import DefaultErrorPage from "next/error";
import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "fomantic-ui-css/semantic.min.css";
import { useRouter } from 'next/router';
import {NextApiRequest, NextApiResponse} from "next";
import {getSession, useSession} from "next-auth/react";
import axios from "axios";
import useBackendApi from "../backendApiHooks";
import UserProfilePageBase from "./profile/component/UserProfilePageBase";

const {
    getUserInfoById,
    getOrdersByOwnerId
} = useBackendApi();

export async function getServerSideProps(context) {
    const {pid} = context.query;
    const {req} = context;

    const session = await getSession({req});
    const authUserInfo = session?.user ? (await getUserInfoById(session.user?.id)) : null;
    const userOrders = await getOrdersByOwnerId(0, 100, pid);
    return { props: { userInfo: authUserInfo, authUserInfo: authUserInfo, userOrders: userOrders, isAuth: authUserInfo?.id >=0 } }
}

function UserProfilePage(props) {
    let { query } = useRouter();
    const { data: session } = useSession()
    console.log('session = ', session);

    if(session) {
        return <UserProfilePageBase {...props}/>
    }else{
        return <DefaultErrorPage statusCode={404} />
    }
}

export default UserProfilePage;