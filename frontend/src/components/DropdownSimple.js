import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

interface IDropdownSimple {
    text?: string;
    options: any;
    onChange: any;
    style?: any;
    activeIndex?: number;
}

function DropdownSimple(props:IDropdownSimple) {
    console.log(props)
    return(<Menu compact class="w-100 btn btn-primary" style={props.style}>
        <Dropdown defaultValue={props.activeIndex}  text={props.text} options={props.options} sele simple item onChange={props.onChange}/>
    </Menu>);
}

export default DropdownSimple
