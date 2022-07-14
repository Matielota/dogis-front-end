import React from "react";
import { Link,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, vaciarDetail } from "../action";
import { useEffect } from "react";
import "../css/Details.css"

export default function CardDetails(props){
const {id} = useParams()
const dispatch = useDispatch()
const detalle= useSelector((state)=>state.detail)


useEffect(()=>{
    dispatch(getDetail(id));
},[dispatch])
const dogdetail= useSelector((state)=> state.detail)

function handlereset(e){
    dispatch(vaciarDetail());}


return (
    <div className="fondoimagen">
        {dogdetail.length>0?<div className="imagen2">
            <h1>Raza:  {dogdetail[0].name}</h1>
            <img className="imagen3" src={dogdetail[0].image} />
            <h2> Altura:           {dogdetail[0].height}</h2>
            <h3>Peso:              {dogdetail[0].weight}</h3>
            <h4>Esperanza de vida: {dogdetail[0].life_span}</h4>
            <h5>Los temperamentos son: {dogdetail[0].temperament?dogdetail[0].temperament:dogdetail[0].Temperaments &&(dogdetail[0].Temperaments.map((e)=> e.name.concat(""))).join(",")}</h5>
        </div>: <p>Loading....</p>}
        <Link to="/">
            <button onClick={e=>handlereset(e)}>Volver a home</button>
        </Link>
    </div>
)
}