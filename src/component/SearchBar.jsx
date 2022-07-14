import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { getNameDog } from "../action";
import lupa from "../css/lupa.png"
import "../css/searchBar.css"

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleImput(e){
        e.preventDefault()
        setName(e.target.value)
        
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) {
          return alert("Need to put a name");
        } else {
          dispatch(getNameDog(name));
          setName("");
        }
      }

    return(
        <div>
            <input type="text" className="inputBuscar" button placeholder="Buscar...." onChange={e=>handleImput(e)}/>
            <button className="buttonBuscar" type="submit" onClick={e=>handleSubmit(e)}><img className="icono5" src={lupa}/></button>

        </div>
    )

}