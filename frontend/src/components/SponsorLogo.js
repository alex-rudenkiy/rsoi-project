import {Image} from "react-bootstrap";
import sponsorLogo1 from "../resources/sponsor1.png";
import React, {useEffect} from "react";
import IconButton from "@material-ui/core/IconButton";
import "../App.css";
export default function SponsorLogo(props) {


//=>{setBrandX(refElem.x.baseVal.value); setBrandY(refElem.y.baseVal.value)}
    return (
        <div>
            <div>
                <IconButton aria-label="delete" style={{background:"white", height:"5em", width:"5em"}}>
                    <img className={"sponsorLogoImg"} src={props.src}
                         style={{
                             width: "2em",
                             //height: "2em",
                             background: "white"
                         }}
                         alt="Circle image"/>
                </IconButton>
            </div>
            <p className={"mt-3"} style={{color: "#f8f8f8"}}>{props.name}</p>
        </div>
    )

}
