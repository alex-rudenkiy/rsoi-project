import React, {useEffect, useState} from "react";
import {RecoilRoot} from "recoil";
import {Provider as BusProvider} from 'react-bus'
import {ToastDemo} from "../src/components/toast";
import AppContext from "../AppContext";
import {SessionProvider} from "next-auth/react"
import {ToastProvider} from "react-toast-notifications";


export default function MyApp({Component, pageProps}) {

    const [showing, setShowing] = useState(false);

    useEffect(() => {
        setShowing(true);
    }, []);

    if (!showing) {
        return null;
    }

    if (typeof window === 'undefined') {
        return <></>;
    } else {
        return (
            <ToastProvider>
                <SessionProvider session={pageProps.session}>
                    <AppContext.Provider
                        value={{
                            state: {
                                languages: ["Ru"],
                                languageSelected: "Ru",
                            },
                        }}
                    >
                        <BusProvider>
                            <ToastDemo/>
                            <RecoilRoot>
                                <Component {...pageProps} />
                            </RecoilRoot>
                        </BusProvider>
                    </AppContext.Provider>
                </SessionProvider>
            </ToastProvider>
        );
    }
} 
