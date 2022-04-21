import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/login.js';
import ProblemsStorePage from './pages/problemsStore';
import UserProfilePage from "./pages/userProfile";
import WelcomePage from "./pages/welcome"
import AdminPage from "./pages/admin";
import RequestControlPanel from "./pages/requestControlPanel";
import OrderingPage from "./pages/ordering";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import LeaderBoardPage from "./pages/leaderBoard";
import RegistrationPage from "./pages/registration";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SettingsPage from "./pages/settings";
import useBackendApi from './logic/BackendApiHook'
import WebcamControl from "./pages/webcamControl";
import OAuthRegisteredPage from "./pages/oAuthRegistered";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[500],
        },
    },
});

//

ReactDOM.render(
    <React.StrictMode>
        {/*<ApiContext.Provider>*/}
            <ThemeProvider theme={theme}>

                <Router>
                    <div>
                        <Route exact path="/">
                            <WelcomePage/>
                        </Route>
                        <Route path="/profile/:userId?">
                            <UserProfilePage/>
                        </Route>

                        <Route path="/makeRequest">
                            <OrderingPage/>
                        </Route>
                        <Route path="/request/:orderId">
                            <RequestControlPanel/>
                        </Route>
                        <Route path="/login">
                            <LoginPage/>
                        </Route>
                        <Route path="/registration">
                            <RegistrationPage/>
                        </Route>
                        <Route path="/archive">
                            <ProblemsStorePage/>
                        </Route>
                        <Route path="/settings">
                            <SettingsPage/>
                        </Route>
                        <Route path="/community">
                            <LeaderBoardPage/>
                        </Route>
                        <Route path="/smartcontrol">
                            <WebcamControl/>
                        </Route>

                        <Route path="/oauth/registered/:token">
                            <OAuthRegisteredPage/>
                        </Route>
                    </div>
                </Router>
            </ThemeProvider>
        {/*</ApiContext.Provider>*/}
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
