import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {getSession} from "next-auth/react";
import SettingsPageBase from "./settings/component/SettingsBase";
import useBackendApi from "../backendApiHooks";

const { getUserInfoById } = useBackendApi();

export async function getServerSideProps({ req }) {
    const session = await getSession({req});
    if(!session){
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    const userInfo = await getUserInfoById(session.user?.id)
    return { props: { userInfo: userInfo, authUserInfo: userInfo, isAuth: userInfo?.id >=0 } }
}

function UserProfilePage(props) {
    return <SettingsPageBase {...props}/>
}

export default UserProfilePage;
