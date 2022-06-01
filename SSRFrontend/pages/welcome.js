import React, {useCallback} from "react";
import {Button, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import FormControl from "@material-ui/core/FormControl";
import graffityImg from '../public/resources/graffity_image.png';
import {useRouter} from "next/router";
import HeaderNav from "../src/components/headerNav";
import useFrontendApi from "../frontendApiHooks";
import ModalExampleModal from "../src/components/SematicModal";
import {useBus} from "react-bus";
import {Footer} from "../src/components/footer";
import Image from "next/image";

function WelcomePage(props) {

    const history = useRouter();
    const bus = useBus();


    function handleClick1() {
        history.push("/ordering");
    }

    const handleClick2 = useCallback((id)=>bus.emit("openModal_findAppeal", { data: id }),[bus]);

    console.log("isAuth", props.isAuth)

    return (
        <div className="App">

            <ModalExampleModal/>



                <header className="masthead">



                    <HeaderNav isAuth={props.isAuth}/>




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
