import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../src/App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Provider as BusProvider, useBus, useListener } from 'react-bus'
import blue from "@material-ui/core/colors/blue";
import WelcomePage from "../pages/welcome";
import UserProfilePage from "../pages/userProfile";
import LoginPage from "../pages/login";
import RegistrationPage from "../pages/registration";
import {ToastDemo} from "./components/toast";
import RequestBase from "../pages/appeal/component/RequestBase";
import ProblemsStorePage from "../pages/archive";
import OrderingPage from "../pages/ordering";
import SettingsPage from "../pages/settings";
import Community from "../pages/community";


const theme = createTheme({
    palette: {
        primary: {
            main: blue[500],
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BusProvider>

            {/*<ApiContext.Provider>*/}
            <ThemeProvider theme={theme}>
                {/*<ReactMessageBox/>*/}
                <ToastDemo/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/profile/*" element={<UserProfilePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/registration" element={<RegistrationPage />} />
                        <Route path="/ordering" element={<OrderingPage />} />
                        <Route path="/request/*" element={<RequestBase />} />
                        <Route path="/archive" element={<ProblemsStorePage />} />
                        <Route path="/settings/*" element={<SettingsPage />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/" element={<WelcomePage />}  />




                        {/*
                        <Route path="/registration">
                            <RegistrationPage/>
                        </Route>
                        <Route path="/archive">
                            <ProblemsStorePage/>
                        </Route>
                        <Route path="/settings/:userId?">
                            <SettingsPage/>
                        </Route>
                        <Route path="/community">
                            <Community/>
                        </Route>
                        <Route path="/smartcontrol">
                            <WebcamControl/>
                        </Route>
                        <Route path="/oauth/registered/:token">
                            <OAuthRegisteredPage/>
                        </Route>
*/}
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
            {/*</ApiContext.Provider>*/}
        </BusProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
