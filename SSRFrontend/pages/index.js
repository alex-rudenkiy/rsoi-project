import Link from 'next/link'
import WelcomePage from "./welcome";
import {getSession} from "next-auth/react";
import useBackendApi from "../backendApiHooks";

const { getUserInfoById } = useBackendApi();

export async function getServerSideProps({ req }) {
    const session = await getSession({req});
    const userInfo = (await getUserInfoById(session?.user?.id)) || undefined
    return { props: { userInfo: userInfo, isAuth: session !== undefined } }
}

export default function App(props) {
    return (
        <WelcomePage {...props}/>

    )
}

