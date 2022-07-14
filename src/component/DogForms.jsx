import {React, useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperament,postDog,getDogs } from '../action';
import "../css/dogForms.css";
import cerrar from "../css/cerrar.png"

function validate(input){
  let errors={};
  if (/[^A-Za-z0-9 _]+/.test(input.name)){
    errors.name = "Solo se permiten letras y numeros";
  }else  if (Number(input.heightmax) < Number(input.heightmin) ){
    errors.heightmax = "La altura maxima debe ser mayor que el minima";
  }else  if (Number(input.weightmax) < Number(input.weightmin) ){
    errors.weightmax = "El peso maximo debe ser mayor que el minimo";
  }else  if (Number(input.life_spanmax) < Number(input.life_spanmin) ){
    errors.life_spanmax = "El peso maximo debe ser mayor que el minimo";
  }
  else if(!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image) && input.image){
    errors.image= "Debe insertar una URL de imagen valida o dejar el espacio vacio"
}else  if (input.temperament.length < 2 && input.temperament){
  errors.temperament = "Debe seleccionar al menos 3 temperamentos";
}
  return errors
};

export default function DogForm() {
    const dispatch = useDispatch()
    const alltemperament= useSelector((state)=>state.temperament)  
    const alldogs= useSelector((state)=>state.dogs)
    const [errors,setErrors] = useState({})

    useEffect(()=>{
        dispatch(getTemperament());
    },[dispatch])


    useEffect(()=>{
      dispatch(getDogs());
  },[dispatch])


    const [input, setInput]= useState({
        name:"",
        heightmin:"",
        heightmax:"",
        weightmin:"",
        weightmax:"",
        life_spanmin:"",
        life_spanmax:"",
        image:"",
        temperament:[],
      })

    function handleChange(e){
  
        setInput({
            ...input,
            [e.target.name] : e.target.value
        }) 
        setErrors(validate({
          ...input,
          [e.target.name] : e.target.value
        }));
        

    }

    function handleSelectTemps(e){
        setInput({
            ...input,
            temperament:[...input.temperament, e.target.value]
        })
        setErrors(validate({
          ...input,
          [e.target.name] : e.target.value
        }));
    }


    function handleDelete(e) {
        setInput({
          ...input,
          temperament: input.temperament.filter((d) => d !== e),
        });
      }

      const input2={
        name:input.name.replace(/\s\s+/g, ' '),
        height:`${input.heightmin} - ${input.heightmax}`,
        weight: `${input.weightmin} - ${input.weightmax}`,
        life_span:`${input.life_spanmin} - ${input.life_spanmax}`,
        image:input.image,
        temperament: input.temperament,
      }
  function handleSubmit(e) {
    e.preventDefault();
    if (input.name.replace(/\s\s+/g, ' ') === " ") return alert ("El nombre no puede contener solo espacios")
    if (
      alldogs.find(
        (e) => e.name.replace(/\s\s+/g, ' ').toLowerCase().trim() === input.name.replace(/\s\s+/g, ' ').toLowerCase().trim()
      )
    ) {
      return alert(`El nombre ${input.name} ya existe`);
    }
      dispatch(postDog(input2));
      alert("Dog created!!! 😀 ");
      setInput({
        name:"",
        heightmin:"",
        heightmax:"",
        weightmin:"",
        weightmax:"",
        life_spanmin:"",
        life_spanmax:"",
        image:"",
        temperament:[],
      });
     
      
    
  } 

  return (
    <div className="background2">
        <Link to="/"><button className='volver'>Volver</button></Link>
        <h1 className="titulo" >Crea tu raza!!</h1>
        <form id="formulario" onSubmit={(e) => handleSubmit(e)} className="form-container">
            <div className='inputCreate'>
                <div className='labeltxt'>Nombre</div>
                <input className="inputBuscar" type="text" value={input.name} name="name" onChange={handleChange} required={true}/>
                {errors.name && (<div className='error'>{errors.name}</div>)}
                <span></span>
            </div> 
            <div  className='inputCreate'>
                <label className='labeltxt'>Altura minima</label>
                <input className="inputBuscar" type="number" value={input.heightmin} name="heightmin" onChange={(e)=>handleChange(e)} required={true}></input>
                {errors.heightmin && (<label className='error'>{errors.heightmin}</label>)}
                <span></span>
            </div>
            <div className='inputCreate'>
                <label className='labeltxt'>  Altura maxima  </label>
                <input className="inputBuscar" type="number" value={input.heightmax} name="heightmax" onChange={handleChange} required={true}></input>
                {errors.heightmax && (<label className='error'>{errors.heightmax }</label>)}
                <span></span>
            </div>
            <div className='inputCreate' >
                <label className='labeltxt'>  Peso Minimo   </label>
                <input className="inputBuscar" type="number" value={input.weightmin} name="weightmin" onChange={handleChange} required={true}></input>
                {errors.weightmin && (<label className='error'>{errors.weightmin}</label>)}
                <span></span>
            </div>
            <div  className='inputCreate'>
                <label className='labeltxt'>   Peso maximo   </label>
                <input className="inputBuscar" type="number" value={input.weightmax} name="weightmax" onChange={handleChange} required={true}></input>
                {errors.weightmax && (<label className='error'>{errors.weightmax}</label>)}
                <span></span>
            </div>
            <div className='inputCreate' >
                <label className='labeltxt'>  Esperanza de vida minima   </label>
                <input className="inputBuscar"  type="number" value={input.life_spanmin} name="life_spanmin" onChange={handleChange} required={true}></input>
                {errors.life_spanmin && (<label className='error'>{errors.life_spanmin}</label>)}
                <span></span>
            </div>
            <div className='inputCreate' >
                <label className='labeltxt'>  Esperanza de vida maxima  </label>
                <input  className="inputBuscar" type="number" value={input.life_spanmax} name="life_spanmax" onChange={handleChange} required={true}></input>
                {errors.life_spanmax && (<label className='error'>{errors.life_spanmax}</label>)}
                <span></span>
            </div>
            <div className='inputCreate' >
                <label className='labeltxt'>Imagen</label>
                <input className="inputBuscar" type="text" value={input.image} name="image" onChange={handleChange}></input>
                {errors.image && (<label className='error'>{errors.image}</label>)}
                <span></span>
            </div>
            <div className='inputCreate'>
            <label className='labeltxt'>Temperamentos</label>
            <select onChange={(e) => handleSelectTemps(e)} className="inputBuscar" >
            
                {alltemperament.map((temps)=>(
                    <option value={temps}>{temps}</option>
                ))}
                
            </select>
            </div>
            <div className="button-create">
            {input.temperament.map((e) => (
                  <div className='labeltxt'>
                    {e + " "}
                    <button className='buttoncerrar' onClick={() => handleDelete(e)}>
                      <img className='iconocerrar' src={cerrar}/>
                    </button>
                    
                  </div>
                ))}
                {errors.temperament && (<label className='error'>{errors.temperament}</label>)}
               </div> 
              <div className="button-create">
          <button type='submit'  disabled={ Object.keys(errors).length === 0 ? false :  true}> Crear Personaje</button>
        </div>
        </form>
    </div>
  )
}


