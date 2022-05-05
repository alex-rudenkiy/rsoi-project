import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import KeyIcon from "@material-ui/icons/VpnKey";
import HeaderNav from "../components/headerNav";
import useBackendApi from "../logic/BackendApiHook";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";

// import {ApiContext} from "../index";

function RegistrationPage() {
    //const {authentication, registration} = useContext(ApiContext);
    const {
        registration,
        getUserInfo,
    } = useBackendApi();
    const [textFieldsData, settextFieldsData] = useState({});
    useEffect(() => {
        getUserInfo(undefined, false);
    }, []);
    const history = useHistory();

    return (
        <div className="App">
            {/*<RegistrationCarousel/>*/}
            <div>
                <HeaderNav />

                {/*Page Content*/}
                <section className="pb-5 pt-5">
                    <div className="container pl-sm-5">
                        <div className="row">
                            <div className="col-md-4 col-sm-6 col-xs-6">
                                <h2 className="font-weight-light"> Регистрация </h2>

                                <div className="pt-3">
                                    <TextField
                                        id="input-with-icon-grid"
                                        label={<p>Логин</p>}
                                        variant="filled"
                                        fullWidth
                                        onChange={(e) => {
                                            settextFieldsData({
                                                ...textFieldsData,
                                                ...{ login: e.target.value },
                                            });
                                        }}
                                    />
                                    <TextField
                                        id="input-with-icon-grid"
                                        label={<p>Фамилия</p>}
                                        variant="filled"
                                        fullWidth
                                        onChange={(e) => {
                                            settextFieldsData({
                                                ...textFieldsData,
                                                ...{ surname: e.target.value },
                                            });
                                        }}
                                    />
                                    <TextField
                                        id="input-with-icon-grid"
                                        label={<p>Имя</p>}
                                        variant="filled"
                                        fullWidth
                                        onChange={(e) => {
                                            settextFieldsData({
                                                ...textFieldsData,
                                                ...{ name: e.target.value },
                                            });
                                        }}
                                    />
                                    <TextField
                                        id="input-with-icon-grid"
                                        label={<p>Отчество</p>}
                                        variant="filled"
                                        fullWidth
                                        onChange={(e) => {
                                            settextFieldsData({
                                                ...textFieldsData,
                                                ...{ patronymic: e.target.value },
                                            });
                                        }}
                                    />
                                    {/*                                    <TextField id="input-with-icon-grid" label={<p><Phone/> &nbsp; Мобильный номер</p>}
                                               variant="filled" fullWidth onChange={e => {
                                        settextFieldsData({...textFieldsData, ...{"mobilenumber": e.target.value}})
                                    }}/>*/}
                                    <TextField
                                        id="input-with-icon-grid"
                                        label={<p> &nbsp; Email</p>}
                                        variant="filled"
                                        fullWidth
                                        onChange={(e) => {
                                            settextFieldsData({
                                                ...textFieldsData,
                                                ...{ email: e.target.value },
                                            });
                                        }}
                                    />
                                    <TextField
                                        id="input-with-icon-grid"
                                        label={
                                            <p>
                                                <KeyIcon /> &nbsp; Пароль
                                            </p>
                                        }
                                        variant="filled"
                                        helperText="Придумайте пароль посложнее и постарайтесь не забыть!"
                                        fullWidth
                                        onChange={(e) => {
                                            settextFieldsData({
                                                ...textFieldsData,
                                                ...{ passwordHash: e.target.value },
                                            });
                                        }}
                                    />
                                    {/*
                                    <p className={"my-2 text-left"}>Аватар</p>
                                    <AvatarDragAndDropUploader onUploaded={(data) => {
                                        settextFieldsData({...textFieldsData, ...{"avatarFileFakeUrl": data.fileFakeName}})
                                    }}/>

                                    <p className={"my-2 text-left"}>Ваши контактные данные (будут видны всем)</p>
                                    <SocialNetworkUsing
                                        setHeader={(e) => settextFieldsData({...textFieldsData, ...{"socialLink": e}})}/>
                                    */}

                                    {/*
                                    <ImageCropper src={sponsorLogo2}/>
*/}
                                </div>

                                {/*                                <div className="pt-5" style={{display: "flex"}}>
                                    <FormControlLabel
                                        style={{ float: 'left' }}
                                    control={
                                        <Checkbox
                                            //checked={state.checkedB}
                                            //onChange={handleChange}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Запомнить пароль"
                                />
                                    <button type="button" className="btn btn-none" style={{ float: 'right' }}>Забыл пароль</button>

                                </div>*/}
                            </div>

                            <div className="col-8">
                                <h2 className="font-weight-light"> Правила и соглашения </h2>
                                <Alert
                                    className={"mb-3 mt-3"}
                                    severity="warning"
                                    style={{ textAlign: "left", width: "100%" }}
                                >
                                    <AlertTitle>Рекомендуем</AlertTitle>
                                    <p>
                                        Наш будудующий пользователь, пожалуйста, ознакомься{" "}
                                        <strong style={{ color: "rgb(102, 60, 0)" }}>
                                            внимательно
                                        </strong>{" "}
                                        с пользовательским соглашением!
                                    </p>
                                </Alert>
                                <div
                                    className={"text-left"}
                                    className="pt-3"
                                    style={{
                                        maxHeight: "53em",
                                        overflow: "auto",
                                        padding: "1em",
                                    }}
                                >
                                    <p style={{ textAlign: "justify" }}>
                                        Настоящее Соглашение определяет условия использования
                                        Пользователями материалов и сервисов сайта
                                        www.Moscow.CityAble.ru.
                                    </p>
                                    <p style={{ textAlign: "justify" }}>1.Общие условия</p>

                                    <p style={{ textAlign: "justify" }}>
                                        1.1. Использование материалов и сервисов Сайта регулируется
                                        нормами действующего законодательства Российской Федерации.
                                    </p>

                                    <p style={{ textAlign: "justify" }}>
                                        1.2. Настоящее Соглашение является публичной офертой.
                                        Получая доступ к материалам Сайта Пользователь считается
                                        присоединившимся к настоящему Соглашению.
                                    </p>

                                    <p style={{ textAlign: "justify" }}>
                                        1.3. Администрация Сайта вправе в любое время в
                                        одностороннем порядке изменять условия настоящего
                                        Соглашения. Такие изменения вступают в силу по истечении 3
                                        (Трех) дней с момента размещения новой версии Соглашения на
                                        сайте. При несогласии Пользователя с внесенными изменениями
                                        он обязан отказаться от доступа к Сайту, прекратить
                                        использование материалов и сервисов Сайта.
                                    </p>

                                    <p style={{ textAlign: "justify" }}>
                                        2. Обязательства Пользователя
                                    </p>

                                    <p style={{ textAlign: "justify" }}>
                                        2.1. Пользователь соглашается не предпринимать действий,
                                        которые могут рассматриваться как нарушающие российское
                                        законодательство или нормы международного права, в том числе
                                        в сфере интеллектуальной собственности, авторских и/или
                                        смежных правах, а также любых действий, которые приводят или
                                        могут привести к нарушению нормальной работы Сайта и
                                        сервисов Сайта.
                                    </p>

                                    <p style={{ textAlign: "justify" }}>
                                        2.2. Использование материалов Сайта без согласия
                                        правообладателей не допускается (статья 1270 Г.К РФ). Для
                                        правомерного использования материалов Сайта необходимо
                                        заключение лицензионных договоров (получение лицензий) от
                                        Правообладателей.
                                    </p>

                                    <p style={{ textAlign: "justify" }}>
                                        2.3. При цитировании материалов Сайта, включая охраняемые
                                        авторские произведения, ссылка на Сайт обязательна (подпункт
                                        1 пункта 1 статьи 1274 Г.К РФ).
                                    </p>

                                    <p style={{ textAlign: "justify" }}>
                                        2.4. Комментарии и иные записи Пользователя на Сайте не
                                        должны вступать в противоречие с требованиями
                                        законодательства Российской Федерации и общепринятых норм
                                        морали и нравственности.
                                    </p>

                                    <p style={{ textAlign: "justify" }}>
                                        2.5. Пользователь предупрежден о том, что Администрация
                                        Сайта не несет ответственности за посещение и использование
                                        им внешних ресурсов, ссылки на которые могут содержаться на
                                        сайте.
                                    </p>

                                    <p style={{ textAlign: "justify" }}>
                                        2.6. Пользователь согласен с тем, что Администрация Сайта не
                                        несет ответственности и не имеет прямых или косвенных
                                        обязательств перед Пользователем в связи с любыми возможными
                                        или возникшими потерями или убытками, связанными с любым
                                        содержанием Сайта, регистрацией авторских прав и сведениями
                                        о такой регистрации, товарами или услугами, доступными на
                                        или полученными через внешние сайты или ресурсы либо иные
                                        контакты Пользователя, в которые он вступил, используя
                                        размещенную на Сайте информацию или ссылки на внешние
                                        ресурсы.
                                    </p>

                                    <p style={{ textAlign: "justify" }}>
                                        2.7. Пользователь принимает положение о том, что все
                                        материалы и сервисы Сайта или любая их часть могут
                                        сопровождаться рекламой. Пользователь согласен с тем, что
                                        Администрация Сайта не несет какой-либо ответственности и не
                                        имеет каких-либо обязательств в связи с такой рекламой.
                                    </p>

                                    <p style={{ textAlign: "justify" }}>3. Прочие условия</p>

                                    <p style={{ textAlign: "justify" }}>
                                        3.1. Все возможные споры, вытекающие из настоящего
                                        Соглашения или связанные с ним, подлежат разрешению в
                                        соответствии с действующим законодательством Российской
                                        Федерации.
                                    </p>

                                    <p style={{ textAlign: "justify" }}>
                                        3.2. Ничто в Соглашении не может пониматься как установление
                                        между Пользователем и Администрации Сайта агентских
                                        отношений, отношений товарищества, отношений по совместной
                                        деятельности, отношений личного найма, либо каких-то иных
                                        отношений, прямо не предусмотренных Соглашением.
                                    </p>

                                    <p style={{ textAlign: "justify" }}>
                                        3.3. Признание судом какого-либо положения Соглашения
                                        недействительным или не подлежащим принудительному
                                        исполнению не влечет недействительности иных положений
                                        Соглашения.
                                    </p>

                                    <p style={{ textAlign: "justify" }}>
                                        3.4. Бездействие со стороны Администрации Сайта в случае
                                        нарушения кем-либо из Пользователей положений Соглашения не
                                        лишает Администрацию Сайта права предпринять позднее
                                        соответствующие действия в защиту своих интересов и защиту
                                        авторских прав на охраняемые в соответствии с
                                        законодательством материалы Сайта.
                                    </p>

                                    <p style={{ textAlign: "justify" }}>
                                        Пользователь подтверждает, что ознакомлен со всеми пунктами
                                        настоящего Соглашения и безусловно принимает их.
                                    </p>
                                </div>

                                <div className="d-flex bd-highlight mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary p-2 w-100 bd-highlight"
                                        onClick={() => {
                                            registration(textFieldsData, true).then((result) => {
                                                if (result != null && result.token.length > 0) {
                                                    history.push("/profile");
                                                }
                                            });
                                        }}
                                        style={{}}
                                    >
                                        Подтвердить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default RegistrationPage;
