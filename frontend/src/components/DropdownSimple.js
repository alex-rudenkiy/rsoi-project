import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

interface IDropdownSimple {
    text: string;
    options: any;
    onChange: any;
}
const DropdownSimple = (props:IDropdownSimple) => (
    <Menu compact class="w-100 btn btn-primary">
        <Dropdown text={props.text} options={props.options} simple item onChange={props.onChange}/>
    </Menu>
)

export default DropdownSimple
