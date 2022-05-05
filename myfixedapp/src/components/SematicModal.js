import React, {useCallback, useState} from 'react'
import {Button, Header, Image, Input, Modal} from 'semantic-ui-react'
import "./fix.css";
import { Alert, AlertTitle } from "@material-ui/lab";
import useBackendApi from "../logic/BackendApiHook";
import {useNavigate} from "react-router-dom";
import {useListener} from "react-bus";

function ModalExampleModal() {
    const {
        getOrderInfoById
    } = useBackendApi();
    const history = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false)
    const [id, setId] = useState("");

    const onOpenModal = React.useCallback(function (id) {
        // alert('clicked');
        setIsOpen(true);
    }, [])

    useListener('openModal_findAppeal', onOpenModal);



    const onSubmit= useCallback((id) => {
        console.log('onSubmit');
/*        getOrderInfoById(id).then((res) => {
            if (res.id === id) {
                history(`/request/${res.id}`);
            }
        });*/
    }, []);

    return (
        <Modal
            open={true}
            // className="semanticModal"
            // onClose={() => setIsOpen(false)}
            // open={isOpen}
            // dimmer={"inverted"}
            // style={{height: 'auto'}}
        >
            <Modal.Header>Поиск обращения</Modal.Header>
            <Modal.Content image>
              {/*  <Image size='medium' src='/images/avatar/large/rachel.png' wrapped />
                <Modal.Description>
                    <Header>Укажите номер обращения</Header>
                    <p>
                        Для того чтобы мы нашли ваше обращение в нашей системе, введите в поле ниже номер, который появился в момент его регистрации.
                    </p>

                    <Input size='massive' placeholder='123456' style={{textAlign: "center"}} onChange={(_,t)=>setId(t.value)}/>

                    <Alert className={"mt-4"} severity="info" style={{textAlign: "left", width: "100%"}}>
                        <AlertTitle>Подсказка</AlertTitle>
                        <p>Если вы его не записали уникальный номер своего обращения, то <strong style={{color:"#4e96ce"}}>создавать его заного не надо</strong>, просто заполните форму ниже и мы вам поможем его найти.</p>
                    </Alert>
                </Modal.Description>*/}
            </Modal.Content>
            <Modal.Actions>
             {/*   <Button color='black' onClick={() => setIsOpen(false)}>
                    Закрыть
                </Button>
                <Button
                    content="Открыть"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => onSubmit(id)}
                    positive
                />*/}
            </Modal.Actions>
        </Modal>

    )
}

export default ModalExampleModal