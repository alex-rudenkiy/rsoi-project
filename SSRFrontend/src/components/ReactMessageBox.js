import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import {useListener} from "react-bus";
import 'semantic-ui-css/components/reset.min.css';
import 'semantic-ui-css/components/site.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/header.min.css';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';


interface IReactMessageBox {
    text: string;
    options: any;
    onChange: any;
}



function ReactMessageBox (props:IReactMessageBox) {
    const messageBox = React.useRef(null)
    const onscroll = React.useCallback(function (top) {
        // messageBox.alert("Alert", "This is alert!").ok(() => {
        //     console.log("Alert ok!");
        // });


    }, [])

    useListener('show', onscroll)

    return <div><SemanticToastContainer position="bottom-right" maxToasts={3} /></div>
}

export default ReactMessageBox
