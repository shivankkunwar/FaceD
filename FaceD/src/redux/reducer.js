import { CHANGE_USER_FIELD } from "./constants"
const initialState ={
    id:'',
    name:'',
    email:'',
    entires:''

}

export const loadUser=( state=initialState, action={})=>{

    switch(action.type){

        case CHANGE_USER_FIELD:
            return Object.assign({},state,
                {
                    id: action.payload.id,
                    name:action.payload.name,
                    email:action.payload.name,
                    entires:action.payload.entires
                })
                /*
                or 
                return {...state,   id: action.payload.id,
                    name:action.payload.name,
                    email:action.payload.name,
                    entires:action.payload.entires}

                */
        default :
                return state;
    }


}   