import { useEffect, useReducer } from "react";
import Headers from "./Header"
import Main from "./Main";
const initialState={
  questions : [],
  status :'Loading'
}
function reducer(state,action){
  switch (action.type) {
    case 'dataReceived':
      return {...state,
        questions : action.payload,
        status : "Ready"
       }
    case 'dataFailed':
      return {
        ...state,
        status : " error"
       }
    default:
      throw new Error('Action Unknown')
  }
}

export default function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  
useEffect(function(){
  fetch('http://localhost:8000/questions')
  .then(res=>res.json())
  .then(data=>dispatch({type : 'dataReceived', payload : data}))
  .catch(err=>dispatch({type:'dataFailed'}))
},[])
  return (
    <div className="main">
      <Headers/>
      <Main>
        <Main >
        <p>1/15</p>
        <p>Question?</p>
        </Main>
      </Main>
    </div>
  );
}
