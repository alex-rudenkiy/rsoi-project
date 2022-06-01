import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "fomantic-ui-css/semantic.min.css";
import { useRouter } from 'next/router';
import UserProfilePageBase from "./component/UserProfilePageBase";
import {UserData} from "../../src/utils";
import {NextApiRequest, NextApiResponse} from "next";
import {getSession, useSession} from "next-auth/react";
import axios from "axios";
import useBackendApi from "../../backendApiHooks";

const {
    getUserInfoById,
    getOrdersByOwnerId
} = useBackendApi();

export async function getServerSideProps(context) {
    const {pid} = context.query;
    const {req} = context;

    const session = await getSession({req});
    const authUserInfo = session?.user ? (await getUserInfoById(session.user?.id)) : null;
    const userInfo = await getUserInfoById(pid)
    const userOrders = await getOrdersByOwnerId(0, 100, pid);
    return { props: { userInfo: userInfo, authUserInfo: authUserInfo, userOrders: userOrders, isAuth: authUserInfo?.id >=0 } }
}

function UserProfilePage(props) {
    let { query } = useRouter();
    const { data: session } = useSession()
    console.log('session = ', session);

    return <UserProfilePageBase {...props}/>
}

export default UserProfilePage;
