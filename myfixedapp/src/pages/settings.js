import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "video-react/dist/video-react.css"; // import css
import {Header, Icon, Menu, Segment} from "semantic-ui-react";
import HeaderNav from "../components/headerNav";
import Card from "@material-ui/core/Card";
import useBackendApi from "../logic/BackendApiHook";
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import {useParams} from "react-router-dom";
import DropdownSimple from "../components/DropdownSimple";
// import "fomantic-ui-css/semantic.min.css";
import _ from "lodash";

function SettingsPage() {
    const {
        getUserInfo,
        updateUserInfo,
        deleteUser,
        getUserIdByToken,
        getAllRoles,
    } = useBackendApi();
    const { userId = -1 } = useParams();
    const [activeItem, setActiveItem] = useState("Основные данные");
    const [userInfo, setUserInfo] = useState({});
    const [rolesDict, setRolesDict] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let result = await getUserInfo(userId);

            setUserInfo(result);

            let out = [];
            result = (await getAllRoles(userId));
            _.forEach(result, function(value) {
                console.log(value);
                out.push({key: value.id, value: value.id, text: value.name});
            });
            setRolesDict(out);
        };

        fetchData();
    }, [userId]);

    const handleItemClick = function (e, { name }) {
        setActiveItem(name);
    };

    return (
        <div className="App">
            {/*
            <RegistrationCarousel/>
*/}
            <div>
                <HeaderNav />

                {/*Page Content*/}
                <section className="pb-5 pt-5">
                    <div className="container pl-sm-5">
                        <div className="row">
                            <div className="col-sm-12 col-md-2 mb-3">
                                <h3 className={"text-left"}>Настройки</h3>
                                <Menu secondary vertical style={{width: "auto"}}>
                                    <Menu.Item
                                        name="Основные данные"
                                        active={activeItem === "Основные данные"}
                                        onClick={handleItemClick}
                                        className={"text-left"}
                                    />

                                    <Menu.Item
                                        name="Безопасность"
                                        active={activeItem === "Безопасность"}
                                        onClick={handleItemClick}
                                        className={"text-left"}
                                    />
                                    <br />
                                    <Menu.Item
                                        name="Удалить аккаунт"
                                        active={activeItem === "Удалить аккаунт"}
                                        onClick={handleItemClick}
                                        className={"text-left"}
                                    />
                                </Menu>
                            </div>

                            <div className="col-sm-12 col-md-10">
                                <Card
                                    className={"w-100 p-4"}
                                    style={{
                                        minHeight: "30em",
                                        display:
                                            activeItem === "Основные данные" ? "block" : "none",
                                    }}
                                >
                                    <h5 style={{ display: "flex" }}>Основные данные</h5>
                                    <Form>
                                        <Form.Group as={Row} controlId="formPlaintextLogin">
                                            <Form.Label column sm="2">
                                                Логин
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    plaintext
                                                    defaultValue={userInfo.login}
                                                    style={{ display: "flex", width: "16em" }}
                                                    onChange={(e) =>
                                                        setUserInfo({
                                                            ...userInfo,
                                                            ...{ login: e.target.value },
                                                        })
                                                    }
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextSurname">
                                            <Form.Label column sm="2">
                                                Фамилия
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    plaintext
                                                    defaultValue={userInfo.surname}
                                                    style={{ display: "flex", width: "16em" }}
                                                    onChange={(e) =>
                                                        setUserInfo({
                                                            ...userInfo,
                                                            ...{ surname: e.target.value },
                                                        })
                                                    }
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextName">
                                            <Form.Label column sm="2">
                                                Имя
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    plaintext
                                                    defaultValue={userInfo.name}
                                                    style={{ display: "flex", width: "16em" }}
                                                    onChange={(e) =>
                                                        setUserInfo({
                                                            ...userInfo,
                                                            ...{ name: e.target.value },
                                                        })
                                                    }
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextPatronymic">
                                            <Form.Label column sm="2">
                                                Отчество
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    plaintext
                                                    defaultValue={userInfo.patronymic}
                                                    style={{ display: "flex", width: "16em" }}
                                                    onChange={(e) =>
                                                        setUserInfo({
                                                            ...userInfo,
                                                            ...{ patronymic: e.target.value },
                                                        })
                                                    }
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2">
                                                Электронная почта
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    plaintext
                                                    defaultValue={userInfo.email}
                                                    style={{ display: "flex", width: "16em" }}
                                                    onChange={(e) =>
                                                        setUserInfo({
                                                            ...userInfo,
                                                            ...{ email: e.target.value },
                                                        })
                                                    }
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextStatus">
                                            <Form.Label column sm="2">
                                                Роль
                                            </Form.Label>
                                            <Col sm="10">
                                                <div>
                                                    <DropdownSimple
                                                        text={userInfo.role?.name}
                                                        options={ rolesDict }
                                                        onChange={(e, data) => {
                                                            console.log(data.value); //userInfo.role?.id
                                                            console.log("agree");
                                                            setUserInfo({
                                                                ...userInfo,
                                                                ...{ role: { id: data.value } },
                                                            });
                                                        }}
                                                        style={{
                                                            position: "fixed",
                                                            display: "block",
                                                            zIndex: "1",
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                        </Form.Group>

                                        <Button
                                            className={"mt-5"}
                                            variant="contained"
                                            color="primary"
                                            style={{ display: "flex" }}
                                            onClick={() =>
                                                updateUserInfo(userId === -1 ? getUserIdByToken(): userId, userInfo)
                                            }
                                        >
                                            Сохранить изменения
                                        </Button>
                                    </Form>
                                </Card>
                                <Card
                                    className={"w-100"}
                                    style={{
                                        minHeight: "30em",
                                        display:
                                            activeItem === "Социальные сети" ? "block" : "none",
                                    }}
                                >
                                    <p style={{ display: "flex" }}>Социальные сети</p>
                                </Card>
                                <Card
                                    className={"w-100 p-4"}
                                    style={{
                                        minHeight: "30em",
                                        display: activeItem === "Безопасность" ? "block" : "none",
                                    }}
                                >
                                    <h5 style={{ display: "flex" }}>Безопасность</h5>
                                    <Form>
                                        <Form.Group as={Row} controlId="formPlaintextOldPassword">
                                            <Form.Label column sm="2">
                                                Старый пароль
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    type="password"
                                                    defaultValue={userInfo.login}
                                                    style={{ display: "flex", width: "16em" }}
                                                    onChange={(e) =>
                                                        setUserInfo({
                                                            ...userInfo,
                                                            ...{ oldPassword: e.target.value },
                                                        })
                                                    }
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextNewPassword">
                                            <Form.Label column sm="2">
                                                Новый пароль
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    type="password"
                                                    defaultValue={userInfo.login}
                                                    style={{ display: "flex", width: "16em" }}
                                                    onChange={(e) =>
                                                        setUserInfo({
                                                            ...userInfo,
                                                            ...{ newPassword: e.target.value },
                                                        })
                                                    }
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group
                                            as={Row}
                                            controlId="formPlaintextRepeatNewPassword"
                                        >
                                            <Form.Label column sm="2">
                                                Новый пароль
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    type="password"
                                                    defaultValue={userInfo.login}
                                                    style={{ display: "flex", width: "16em" }}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Button
                                            className={"mt-2"}
                                            variant="contained"
                                            color="primary"
                                            style={{ display: "flex" }}
                                        >
                                            Сменить пароль
                                        </Button>
                                    </Form>
                                </Card>
                                <Card
                                    className={"w-100"}
                                    style={{
                                        minHeight: "30em",
                                        display:
                                            activeItem === "Удалить аккаунт" ? "block" : "none",
                                    }}
                                >
                                    <Segment placeholder style={{ minHeight: "inherit" }}>
                                        <Header icon>
                                            <Icon name="warning" color="red" />
                                            Вы точно хотите удалить аккаунт навсегда?
                                        </Header>
                                        <Segment.Inline>
                                            <Button
                                                variant="contained"
                                                disableElevation
                                                onClick={() => deleteUser(userId)}
                                            >
                                                Да
                                            </Button>
                                        </Segment.Inline>
                                    </Segment>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SettingsPage;
