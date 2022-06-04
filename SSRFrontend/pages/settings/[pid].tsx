import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {getSession} from "next-auth/react";
import useBackendApi from "../../backendApiHooks";
import SettingsPageBase from './component/SettingsBase';
import {useRouter} from "next/router";

const { getUserInfoById } = useBackendApi();

export async function getServerSideProps({ req }) {
    const router = useRouter()
    const { pid } = router.query

    const session = await getSession({req});
    if(!session){
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    const authUserInfo = await getUserInfoById(session.user?.id)
    const userInfo = await getUserInfoById(pid)
    return { props: { userInfo: userInfo, authUserInfo: authUserInfo, isAuth: userInfo?.id >=0 } }
}
//currentUserInfo?.role?.name === "Moderator"
function UserProfilePage(props) {
    return <SettingsPageBase {...props}/>
}

export default UserProfilePage;
