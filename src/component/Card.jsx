import React from "react";
import "../css/Card.css";

export default function Card({name, image , weight, temperament}){
    return(
        <div className="cards_item">
            <div className="card">
            <h1 className="nombre">{name}</h1>
            <h3 className="nombre">{weight} kg</h3>
            <h4 className="nombre">{temperament}</h4>
            <img src={image} className="imagen" />
            </div>
        </div>
    )

}