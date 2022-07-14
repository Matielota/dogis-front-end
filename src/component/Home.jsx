import React from "react";
import {useState,useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { getDogs, filterApiDB, orderByName,getTemperament, filterDogsByTemperament } from "../action";
import {Link} from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "../css/Home.css";
import iconoperro from "../css/iconoperro.png"
import refrescar from "../css/refrescar.png"



export default function Home(){
const dispatch = useDispatch()
const alldogs= useSelector((state)=>state.dogs)
const allTemperaments = useSelector((state) => state.temperament);

const[orden,setOrden]= useState('')
const [currentPage, setCurrentPage] = useState(1)
const [dogPage, setDogPage]= useState(8)
const indexLastDog = currentPage * dogPage
const indexFirstDog= indexLastDog - dogPage
const currentDog = alldogs.slice(indexFirstDog,indexLastDog)

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
};

useEffect(()=>{
    dispatch(getDogs());
},[dispatch])

useEffect(()=>{
    dispatch(getTemperament());
},[dispatch])

function handleRefresh() {
    window.location.reload(false);
}
function handlepage(e,number){
    e.preventDefault();
    setCurrentPage(currentPage + number)
   }

function handleFilterApiDB(e){
    e.preventDefault();
    dispatch(filterApiDB(e.target.value));
    }

    function handleFilterDogsByTemperament(e) {
        e.preventDefault();
        dispatch(filterDogsByTemperament(e.target.value));
        setCurrentPage(1);
    }
    
function handleorderByName(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
    }

return (
     <div className="fondo" >
         <Link to ="/dog">
                <button className="buttonDog" > <img className="icono2" src={iconoperro}/> <h1>Crear Raza</h1></button>
        </Link>
         <label className="title"> Dogies Page</label> <button className="buttonRefresh" onClick={e =>{handleRefresh(e)}} ><img className="icono2" src={refrescar}/><h1>Refrescar</h1></button>
         <SearchBar/>
         
         <div><label className="labeltext">Filtro por nombre y peso</label>
             <select className="select" onChange={e=> handleorderByName(e)}>
                 <option value="asc">Ascendente</option>
                 <option value="desc">Descendente</option>
                 <option value="weightMin">Peso minimo</option>
                 <option value="weightMax">Peso maximo</option>
             </select>
             <label className="labeltext">Filtro por temperamentos</label>
             <select onChange={(e) => handleFilterDogsByTemperament(e)} className="select">
                    <option value="All">Todos</option>
                    {
                        allTemperaments.map((temperament) => (
                        <option
                            value={temperament}
                            
                        >{temperament}</option>
                        ))
                    }
                </select>
                <label className="labeltext">Filtro de Base de datos</label>
             <select className="select" onChange={e=> handleFilterApiDB(e)}>
                 <option value="all">Todos</option>
                 <option value="api">Existentes</option>
                 <option value="db">Creados por usuarios</option>
             </select>
             <div>
             <button className="button-back" onClick={(e) => handlepage(e,-1)} disabled={currentPage<= 1 ? true : false}> PAGINA ANTERIOR</button>
             <button className="button-front" onClick={(e) => handlepage(e, +1)} disabled={currentPage> alldogs.length/dogPage ? true : false}> SIGUIENTE PAGINA</button>
             
             </div>
             <Paginado
             dogPage={dogPage}
             alldogs={alldogs.length}
             paginado={paginado}
             currentPage={currentPage}/>
             
             {currentDog?.map((e)=>{
                 return (
                     <div className="card_contenedor">
                         <Link to={"/dogs/" + e.id}>
                            <Card name={e.name} 
                            image={
                            e.image
                            ?e.image
                            :"https://p4.wallpaperbetter.com/wallpaper/694/34/495/dark-dog-animals-scarf-wallpaper-preview.jpg"
                            } 
                            weight={e.weight} 
                            temperament={
                            e.temperament
                            ?e.temperament
                            :e.Temperaments &&(e.Temperaments.map((e)=> e.name.concat(""))).join(",")}/>
                        </Link>
                     </div>
                 )
             })}
         </div>
     </div>
 )
}