import Link from 'next/link'
import WelcomePage from "./welcome";
import {getSession} from "next-auth/react";
import useBackendApi from "../backendApiHooks";

const { getUserInfoById } = useBackendApi();

export async function getServerSideProps({ req }) {
    const session = await getSession({req});
    const authUserInfo = session?.user ? (await getUserInfoById(session.user?.id)) : null;
    return { props: { userInfo: authUserInfo, isAuth: authUserInfo?.id >=0 } }
}

export default function App(props) {
    return (
        <WelcomePage {...props}/>

    )
}

