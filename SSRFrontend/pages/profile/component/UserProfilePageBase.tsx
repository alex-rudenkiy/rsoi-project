import React, {useEffect, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Avatar from "@material-ui/core/Avatar";
import ViewsIcon from "@material-ui/icons/Visibility";
import MessageIcon from "@material-ui/icons/Message";
import Pagination from "@material-ui/lab/Pagination";
import HeaderNav from "../../../src/components/headerNav";
import useBackendApi from "../../../src/logic/BackendApiHook";
import {IUserInfo, stringAvatar, UserData} from "../../../src/utils";
import useUrlStore from "../../../UrlsStore";
import {Footer} from "../../../src/components/footer";
import {useBus} from "react-bus";
// import "fomantic-ui-css/semantic.min.css";
import { useRouter } from 'next/router';
import Image from "next/image";
import {IUserProfilePage} from "../../../src/types";
import {NextApiRequest, NextApiResponse} from "next";
import {useSession} from "next-auth/react";
import Illustration from "../../../public/resources/urban-681.svg";


// This gets called on every appeal
export async function getServerSideProps(req: NextApiRequest, res: NextApiResponse) {
    const { data: session } = useSession()

    // Fetch data from external API
    // const session = await getSession();
    console.log(session)
    /* ... */
    // res.end()


    // const res = await fetch(`https://.../data`)
    // const data = await res.json()

    // Pass data to the page via props
    // return { props: { data } }
    return { props: {  } }
}

function UserProfilePageBase(props: IUserProfilePage) {
    const {
        getCountOrdersByOwnerId,
    } = useBackendApi();

    let userId = props.id;
    let userInfo = props.userInfo;



    const {getBackendUrl} = useUrlStore();
    const baseUrl = getBackendUrl();

    const history = useRouter();

    const [userOrdersView, setUserOrdersView] = useState(null);


    const [pagesCount, setPagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [countOrders, setCountOrders] = useState(0);
    const pageSize = 2;


    const bus = useBus()


    console.log("userId", userId);

/*    useEffect(() => {
        getUserInfo(userId === -1 ? undefined : userId).then((uinfo) => {
            setUserInfo(uinfo);

            getOrdersByOwnerId(currentPage, pageSize, userId).then((orders) => {
                console.log("getOrdersByOwnerId ====> ", orders);
                setUserOrdersView(
                );
            });

        });


    }, []);*/

    useEffect(() => {
        console.log("let's go");
        //getUserInfo(undefined, true).then(e=>console.log("gg", e));
        try {
            getCountOrdersByOwnerId().then(c => {
                setPagesCount(Math.ceil(c / pageSize));
                setCountOrders(c);
            })

        } catch (e) {}
    }, [currentPage]);

    return (
        <div className="App">
            <header className="masthead">


                <HeaderNav isAuth={props.isAuth}/>



            </header>


            <section className="container pb-5 pt-5 main-content pl-sm-5">
                <div className="container pl-sm-5 mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
                                            <h5 style={{ color: "#276dd5" }}>{countOrders}</h5>
                                            <p style={{ lineHeight: "1em", color: "#6c6c6c" }}>
                                                Выявленно недостатков
                                            </p>
                                        </div>
                                        {/*                                        <div className="col-sm">
                                            <h5 style={{ color: "#276dd5" }}>{0}</h5>
                                            <p style={{ lineHeight: "1em", color: "#6c6c6c" }}>
                                                Устраненил недостатков
                                            </p>
                                        </div>
                                        <div className="col-sm">
                                            <h5 style={{ color: "#276dd5" }}>{84}</h5>
                                            <p style={{ lineHeight: "1em", color: "#6c6c6c" }}>
                                                Место в общем рейтинге
                                            </p>
                                        </div>*/}
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <Avatar
                                    {...stringAvatar(userInfo ? userInfo.login : ". .")}
                                    style={{ height: "4em", width: "4em", margin: "auto" }}
                                />
                            </div>
                            <div className="col text-left">
                                <h4 className={"my-0"} style={{ color: "#6c6c6c" }}>{`${
                                    userInfo && userInfo.name
                                } ${userInfo && userInfo.patronymic}`}</h4>
                                <h5 className={"my-0"} style={{ color: "#bfb8b8" }}>{`@${
                                    userInfo && userInfo.login
                                }`}</h5>

                                {userInfo.role.name === "Moderator" &&
                                    <button className={"mini ui primary button my-1"}
                                            onClick={() => history.push(`/settings/${userId === -1 ? getUserIdByToken() : userId}`)}>Редактировать</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <section className="pb-5 pt-0">
                    <div className="container pl-sm-5 text-left">
                        <p>Зафиксированые недостатки</p>

                        {
                            props?.userOrders && props?.userOrders.length>0 ?                             props.userOrders.map((e) => (
                                    <button
                                        type="button"
                                        className="list-group-item list-group-item-action"
                                        onClick={()=>{
                                            if(Number(e.author.id) === Number(props.authUserInfo.id)) {
                                                history.push(`/appeal/${e.id}`)
                                            }else{
                                                bus.emit('openAppealCardModal', { orderId: e.id })
                                            }
                                        }}
                                    >
                                        <Row style={{ marginLeft: "1em" }}>
                                            <Image width={64} height={16} style={{ maxWidth: "4em", maxHeight: "4em" }}  src={e.attachments && `${baseUrl}/file/preview/${e.attachments[0]}`} fluid />

                                            {/*                        <Image
                                            layout="fill" objectFit="contain"
                                            style={{ maxWidth: "4em", maxHeight: "4em" }}
                                            src={
                                                e.attachments &&
                                                `${baseUrl}/file/preview/${e.attachments[0]}`
                                            }
                                        />*/}

                                            <Col>
                                                <p className="text-left" style={{ marginBottom: "auto" }}>
                                                    {e.title}
                                                </p>
                                                <p
                                                    className="text-left"
                                                    style={{ color: "Silver", fontSize: "smaller" }}
                                                >
                                                    <ViewsIcon fontSize={"small"} />
                                                    {e.views && e.views.length}&nbsp;
                                                    <MessageIcon fontSize={"small"} />
                                                    {e.comments && e.comments.length}
                                                </p>
                                            </Col>
                                        </Row>
                                    </button>
                                ))
                                : <div style={{  maxWidth: "20em", margin: "auto" }}>
                                    <Image src={Illustration} />
                                    <p
                                        style={{
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            color: "#dcdde2",
                                        }}
                                    >
                                        Нету
                                    </p>
                                </div>
                        }

                        {/*{userOrdersView != null ? (
                            <div className="list-group">
                                {userOrdersView}
                                <div className={"pt-4"} style={{ alignSelf: "center" }}>
                                    <Pagination
                                        count={pagesCount}
                                        page={currentPage}
                                        onChange={(e, p) => setCurrentPage(p)}
                                    />
                                </div>
                            </div>
                        ) : (

                        )}*/}
                    </div>
                </section>

            </section>

            {/* <section className="pb-5 pt-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <div className="container pl-sm-5 text-left">

                                    <p>Описание</p>
                                    <h5>{userInfo&&userInfo.description}</h5>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="container pl-sm-5 text-left">
                                    <p>Галерея</p>

                                    <div style={{width:"inherit"}}>
                                        <Carousel showArrows={true}  >
                                            <div>
                                                <img src={templateImage} />
                                                <p className="legend">Legend 1</p>
                                            </div>
                                            <div>
                                                <img src={templateImage} />
                                                <p className="legend">Legend 1</p>
                                            </div>
                                            <div>
                                                <img src={templateImage} />
                                                <p className="legend">Legend 1</p>
                                            </div>
                                            <div>
                                                <img src={templateImage} />
                                                <p className="legend">Legend 1</p>
                                            </div>
                                            <div>
                                                <img src={templateImage} />
                                                <p className="legend">Legend 1</p>
                                            </div>
                                        </Carousel>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </section>*/}


            <Footer/>
        </div>
    );
}

export default UserProfilePageBase;
