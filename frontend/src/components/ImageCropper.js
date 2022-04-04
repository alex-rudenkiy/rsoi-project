import React, {useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop'
import 'react-easy-crop/react-easy-crop.css'
import RegistrationPage from "../pages/registration";
import Avatar from "react-avatar-edit";
import sponsorLogo2 from "../resources/sponsor2.png";


export default class ImageCropper extends React.Component {
    constructor(props) {
        super(props)

        const src = props.src;

        this.state = {
            preview: null,
            src
        }
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
    }

    onClose() {
        this.setState({preview: null})
    }

    onCrop(preview) {
        this.setState({preview})
    }

    componentDidMount() {
        document.onreadystatechange = () => {
            //console.log(this.myRef.width);
        };

        //this.setState({width: this.myRef.current.parentElement.clientWidth}) // should be 360, reported as 180
    }

    render () {
        return (
            <div>
                <Avatar
                    width={150}
                    height={295}
                    onCrop={this.onCrop}
                    onClose={this.onClose}
                    src={this.state.src}
                />
{/*
                <img src={this.state.preview} alt="Preview" />
*/}
            </div>
        )
    }

}
