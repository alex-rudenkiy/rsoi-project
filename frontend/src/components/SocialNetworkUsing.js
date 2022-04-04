import React from 'react'
import {Dropdown} from 'semantic-ui-react'
import {Button, Image, List} from 'semantic-ui-react'
import {useEffect, useState} from "react";
import {Input} from 'semantic-ui-react'
import vkIcon from "../resources/vk_icon.svg";
import googleIcon from "../resources/google_icon.svg";
import okIcon from "../resources/ok_icon.svg";
import axios from 'axios';

let _ = require('lodash');

const options = [
]

function SocialNetworkUsing(props) {

    useEffect(()=>{
        axios.get("http://localhost:8090/socialNetwork").then((d)=>{
            _.map(d.data,(e)=>{
                options.push({key: e.name, text: e.fullName, value: {id: e.id, icon: e.logoUrl, hint: "ivanov@yandex.ru"}});
            });
        });
    },[]);

    const handleChange = (e, {value}) => {
/*
        console.log(_.differenceBy(value, dropdownItems, 'id'));
        console.log(_.differenceBy(dropdownItems, value, 'id'));
*/
        _.map(_.differenceBy(dropdownItems, value, 'id'), (e) => {
            socialData.delete(e.id);
        });
        console.log(socialData);


        setDropdownItems(value);

        //setDropdownItems(dropdownItems.delete(id));
        //_.remove(socialData, obj => obj.id === value.id);

        //console.log(socialData, value, _.differenceBy(socialData, value, 'id'))
    };
    const [socialData, setSocialData] = useState(new Map());
    const [dropdownItems, setDropdownItems] = useState([]);


    function socialSetter(id, payload) {
        setSocialData(socialData.set(id, payload));
/*
        console.log(socialData.keys());
        console.log(socialData.entries());
*/
        //console.log(socialData.forEach((value, key, map)=>{return {"socialType":key, "payload":value}}));
        /*for (const [key, value] of Object.entries(socialData)) {
            console.log(`${key}: ${value}`);
        }*/

      /*  console.log(_.map(Object.entries(socialData).values(),
            function (item) {
                //return {"socialType":item.id, "payload":item.payload};
            })
        );*/

        //setDropdownItems(dropdownItems.set(id,payload));

        /*if(_.find(socialData, {id})){
            let t = _.find(socialData, {id});
            t.payload = payload;
            console.log(_.merge(socialData, [t]));
            setSocialData(_.merge(socialData, [t]));
        }else{
            console.log(_.merge(socialData, [{id:id, payload:payload}]));
            setSocialData(_.merge(socialData, [{id:id, payload:payload}]));
        }*/

        props.setHeader(Array.from( socialData ).map(([key, value]) => ({ "socialType":key, "payload":value })));
        console.log(socialData);
    }

    return (
        <>
            <Dropdown placeholder='Социальные ссылки' fluid multiple selection options={options} onChange={handleChange}/>

            <List divided verticalAlign='middle'>
                {
                    Object.values(dropdownItems).map(item =>
                        <List.Item>
                            {/*
                    <List.Content floated='right'>
                        <Button>Add</Button>
                    </List.Content>
*/}
                            {/*
                    <Image avatar src={item.icon} floated='left' />
                    <List.Content className={"w-100"} ><Input className={"w-100"} placeholder={item.hint} /></List.Content>
*/}
                            <div className="d-flex bd-highlight">
                                <Image avatar src={item.icon} style={{alignSelf: "center"}} floated='left'/>
                                <div className="p-2 flex-fill bd-highlight"><Input className={"w-100"}
                                                                                   placeholder={item.hint}
                                                                                   onChange={(e) => socialSetter(item.id, e.target.value)}/>
                                </div>

                            </div>

                        </List.Item>)
                }
                {/*
            <List.Item>
                <List.Content floated='right'>
                    <Button>Add</Button>
                </List.Content>
                <Image avatar src={vkIcon} floated='left' />
                <List.Content floated='left'><Input placeholder='Search...' /></List.Content>
            </List.Item>
            <List.Item>
                <List.Content floated='right'>
                    <Button>Add</Button>
                </List.Content>
                <Image avatar src={okIcon} floated='left' />
                <List.Content floated='left'><Input placeholder='Search...' /></List.Content>
            </List.Item>

            <List.Item>
                <List.Content floated='right'>
                    <Button>Add</Button>
                </List.Content>
                <Image avatar src={googleIcon} floated='left' />
                <List.Content floated='left'><Input placeholder='Search...' /></List.Content>
            </List.Item>
*/}
            </List>
        </>);

};

export default SocialNetworkUsing
