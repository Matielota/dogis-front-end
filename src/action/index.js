import axios from "axios";

export function getDogs(){
    return async function(dispatch){
        //pide la info de la ruta de nuestro back
        const json = await axios.get("https://dogis-back-end.herokuapp.com/dog",{});
        return dispatch({
        type: "GET_DOGS",
        payload: json.data
        })
    }
}
export function getNameDog(payload) {
    return async function (dispatch) {
      try {
        const json = await axios.get(`https://dogis-back-end.herokuapp.com/dog?name=${payload}`);
        return dispatch({
          type: "GET_NAME_DOGS",
          payload: json.data,
        });
      } catch (error) {
        console.log(error);
        return dispatch({
          type: "GET_NAME_DOGS",
          payload: [],
        });
      }
    };
  }
export function filterApiDB(payload){
    return{
        type: 'FILTER_BY_API_DB',
        payload
    }

}
export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }

}


export function getTemperament(){
  return async function(dispatch){
      //pide la info de la ruta de nuestro back
      const json = await axios.get("https://dogis-back-end.herokuapp.com/temperament",{});
      return dispatch({
      type: "GET_TEMPERAMENT",
      payload: json.data
      })
  }
}
export function filterDogsByTemperament(payload) {
  return {
      type: "FILTER_DOGS_BY_TEMPERAMENT",
      payload
  }
}


export function postDog(form){
  return async function (dispatch){
    const json= await axios.post("https://dogis-back-end.herokuapp.com/dog",form);
  return json;
  };
}

export function getDetail(id){
  return async function(dispatch){
    try{
      var json=await axios.get("https://dogis-back-end.herokuapp.com/dogs/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data
      })
    }catch(error){
      console.log(error)
    }
  }
}

export function vaciarDetail(){
  return ({
    type: "VACIAR_DETAIL",
    payload: []
  })

}

