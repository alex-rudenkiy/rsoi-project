import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import {useListener} from "react-bus";

function ModalEditor() {
    const [open, setOpen] = React.useState(false)

    const onOpenModal = React.useCallback(function () {
        setOpen(true);
    }, [])

    useListener('openModal', onOpenModal);

    return (
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
        >
            <Header icon>
                <Icon name='archive' />
                Archive Old Messages
            </Header>
            <Modal.Content>
                <p>
                    Your inbox is getting full, would you like us to enable automatic
                    archiving of old messages?
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No
                </Button>
                <Button color='green' inverted onClick={() => setOpen(false)}>
                    <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalEditor
