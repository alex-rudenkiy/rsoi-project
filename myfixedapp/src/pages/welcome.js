import React, {useCallback} from "react";
import {Button, Col, Image, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
// import FormControl from "@material-ui/core/FormControl";
import graffityImg from '../resources/graffity_image.png';
import {useNavigate} from "react-router-dom";
import HeaderNav from "../components/headerNav";
import useBackendApi from "../logic/BackendApiHook";
import ModalExampleModal from "../components/SematicModal";
import {useBus} from "react-bus";
import {Footer} from "../components/footer";

function WelcomePage() {

    const history = useNavigate();
    const bus = useBus();






    function handleClick1() {
        history("/makeRequest");
    }

    const handleClick2 = useCallback((id)=>bus.emit("openModal_findAppeal", { data: id }),[bus]);



    return (
        <div className="App">

            <ModalExampleModal/>



                <header className="masthead">


                    <HeaderNav/>



                </header>


                <section className="container pb-5 pt-5 main-content pl-sm-5">

                        <Row>
                            <Col xl={4} md={4} sm={10} xs={10}>
                                <Row>
                                    <div className="gradient-all text-left" >Нашли
                                        недостаток?
                                    </div>

                                </Row>
                                <Row>
                                    <p className={"text-left"}>Мы поможем вам исправить</p>
                                </Row>
                                <Row className={"row pr-5"} style={{marginBottom: "1em", marginTop: "2em"}}>
                                    <Button variant="btn btn-primary w-100" onClick={handleClick1}>Зафиксировать
                                        нарушение</Button>
                                </Row>
                                <Row className={"row pr-5"} style={{marginTop: "1em"}}>
                                    <Button variant="btn btn-outline-primary w-100" onClick={handleClick2}>Проверить статус заявления</Button>
                                </Row>
                            </Col>

                            <Col>
                                <Image style={{maxWidth: "32em"}} src={graffityImg} fluid/>
                            </Col>
                        </Row>

                </section>



                <Footer/>





        </div>
    );
}

export default WelcomePage;
