

const initialState= {
    dogs : [],
    alldogs: [],
    temperament: [],
    detail:[],
    users:[]
}

function rootReducer(state = initialState, action){
    switch (action.type){
        case "GET_DOGS":
            return {
                ...state,
                dogs:action.payload,
                alldogs:action.payload
            }
        case 'FILTER_BY_API_DB':
            const allData = state.alldogs
            const filtered= action.payload === "db" ? allData.filter(e => e.createdInDB): 
            action.payload === "api" ?  allData.filter(e => !e.createdInDB ) : allData;
                return{
                    ...state,
                    dogs: filtered
            }
        case 'ORDER_BY_NAME':
            
            let arrayordenar = action.payload === "asc" ?
                state.dogs.sort(function(a,b){
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
                    return 0;
                }):action.payload === "desc"?
                state.dogs.sort(function(a,b){
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
                    return 0;
                }): action.payload === "weightMin" ?
                state.dogs.sort(function(a,b){
                    if (a.weight.split("-")[0] !=="NaN") {
                        console.log("entre ne el nan")
                    if (Number(a.weight.split("-")[0]) < Number(b.weight.split("-")[0] )) return -1;
                    if (Number(b.weight.split("-")[0]) < Number(a.weight.split("-")[0])) return 1;
                    return 0};
                    return -1
                }):state.dogs.sort(function(a,b){
                        if (a.weight.split("-")[0] ==="NaN" && b.weight.split("-").length > 1) return -1
                        if (b.weight.split("-")[0] ==="NaN" && a.weight.split("-").length > 1) return 1
                        if (a.weight.split("-").length === 1 && b.weight.split("-")[0] ==="NaN") return 1;
                        if (b.weight.split("-").length === 1 && a.weight.split("-")[0] ==="NaN") return -1;

                        if (a.weight.split("-").length === 1 && (b.weight.split("-").length > 1 && a.weight.split("-")[0] !=="NaN" )){
                            if (Number(a.weight.split("-")[0]) < Number(b.weight.split("-")[1] )) return 1;
                            if (Number(b.weight.split("-")[1]) < Number(a.weight.split("-")[0])) return -1;
                        return 0}
                        if (b.weight.split("-").length === 1 && (a.weight.split("-").length > 1 && b.weight.split("-")[0] !=="NaN" )){
                            if (Number(a.weight.split("-")[1]) < Number(b.weight.split("-")[0] )) return 1;
                            if (Number(b.weight.split("-")[0]) < Number(a.weight.split("-")[1])) return -1;
                        return 0}

                        if (a.weight.split("-").length > 1 ) {
                            console.log("entre ne el nan")
                            if (Number(a.weight.split("-")[1]) < Number(b.weight.split("-")[1] )) return 1;
                            if (Number(b.weight.split("-")[1]) < Number(a.weight.split("-")[1])) return -1;
                        return 0};
                       
                        
                        return -1
                    })
        
            return{
                ...state,
                dogs: arrayordenar}
            case "FILTER_DOGS_BY_TEMPERAMENT":
                const dogs = state.alldogs;
                const dogsFilter = state.alldogs
                 dogs.map((dog) => {return(
                    typeof dog.temperament === "object"
                        ? dog.temperament = dog.temperament.map(t => { return t.name }).join(", ")
                        : dog.temperament
                )})
                const temperamentFilter =
                    action.payload === 'All' ? state.alldogs
                        : dogsFilter.filter((e)=>
                            e.temperament?.includes(action.payload))              
                return {
                    ...state,
                    dogs: temperamentFilter,
                }
        case "GET_NAME_DOGS":
            return{
                ...state,
                dogs: action.payload}
        
        case "POST_DOG":
            return{
                ...state,
            }
        case "GET_TEMPERAMENT":
            return {
                ...state,
                temperament:action.payload
                }
        case "GET_DETAIL":
            return{
                ...state,
                detail: action.payload
            }
        case "VACIAR_DETAIL":
            return{
                ...state,
                detail: action.payload
            }
        case "GET_USERS":
            return {
                ...state,
                users:action.payload,
            }
            
        default:
            return state;
    }
}

export default rootReducer;