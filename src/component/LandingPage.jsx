import React from "react";
import { Link } from "react-router-dom";
import "../css/landingpage.css";
import linkedin from "../css/linkedin.png";
import github from "../css/github.png";
import ingreso from "../css/ingreso.png";
import "../css/a.css"
export default function LandingPage() {
    return(
        <div className="background">
            <div >
                
                    <img className="icono" src={linkedin}></img>
                    <img className="icono" src={github}></img>
            </div>
            <h1 className="a"><span></span>
        <span></span>
        <span></span>
        <span></span> Bienvenido a la App de perros! </h1>
            <Link to ="/home">
            <button className="buttoningreso" ><img className="iconoingreso" src={ingreso}/>Ingresa a la aplicacion</button>
            </Link>
            
        </div>

    )
}