import {Button, Col, Image} from "react-bootstrap";
import sponsorLogo1 from "../resources/sponsor1.png";
import React, {useEffect, useRef, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import "../App.css";
import Card from "react-bootstrap/Card";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

interface IOrderTextBox {
    isEdit: boolean;
    order: any;
    onChangeDescription: any;
}

export default function OrderTextBox(props: IOrderTextBox) {
    console.log(props.order);

    return (

        props.isEdit === true?(
                <div className="flex-fill">
                    <h3 className="font-weight-light text-left"><EditOutlinedIcon/> Редактирование описания
                        проблемы </h3>

                    <Paper className={"p-3"} style={{minHeight: "20em"}}>

                        <InputBase
                            placeholder="Проблему описывать здесь"
                            fullWidth
                            multiline
                            defaultValue={props.order.description}
                            onChange={props.onChangeDescription}
                        />

                    </Paper>
                </div>


            )
:(<Card className={"mb-5"} style={{width: '100%', textAlign: "left"}}>
                    <Card.Body>
                        <Card.Title>Текст обращения</Card.Title>
                        <Card.Subtitle
                            className="mb-2 text-muted">{props.order && props.order.createdAt}</Card.Subtitle>
                        <Card.Text>
                            {props.order && props.order.description}
                        </Card.Text>
                        <Button variant={"outline-primary"}>Редактировать</Button>
                    </Card.Body>
                </Card>

            )
    )

}
