import React, {useCallback, useState} from 'react'
import {Button, Header, Image, Input, Modal} from 'semantic-ui-react'
import { Alert, AlertTitle } from "@material-ui/lab";
import useFrontendApi from "../../frontendApiHooks";
import {useRouter} from "next/router";
import {useListener} from "react-bus";
import {useBus} from "react-bus";

function ModalExampleModal() {
    const {
        getOrderInfoById
    } = useFrontendApi();
    const history = useRouter();
    const [isOpen, setIsOpen] = React.useState(false)
    const [id, setId] = useState("");

    const onOpenModal = React.useCallback(function (id) {
        // alert('clicked');
        setIsOpen(true);
    }, [])

    useListener('openModal_findAppeal', onOpenModal);



    const onSubmit= useCallback((id) => {
        console.log('onSubmit');
        getOrderInfoById(id).then((res) => {
            if (Number(res.id) === Number(id)) {
                history.push(`/appeal/${res.id}`);
            }else{
                alert('К глубокому сожалению такого обращения не существует!');
            }
        })
    }, [getOrderInfoById, history]);

    return (
        <Modal
            className="semanticModal"
            onClose={() => setIsOpen(false)}
            open={isOpen}
            dimmer={"inverted"}
            style={{height: 'auto'}}
        >
            <Modal.Header>Поиск обращения</Modal.Header>
            <Modal.Content image style={{    display: "block"}}>
                {/*<NextImage size='medium' src='/images/avatar/large/rachel.png' wrapped />*/}
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
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setIsOpen(false)}>
                    Закрыть
                </Button>
                <Button
                    content="Открыть"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => onSubmit(id)}
                    positive
                />
            </Modal.Actions>
        </Modal>

    )
}

export default ModalExampleModal