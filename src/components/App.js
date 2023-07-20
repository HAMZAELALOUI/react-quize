import { useEffect, useReducer } from "react";
import Headers from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  highscore : 0,
  SecondsRaiminig:10
};
const SECS_PER_QUESTION=30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "Ready" };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return { ...state, 
              status: "active",
              SecondsRaiminig : state.questions.length * SECS_PER_QUESTION

        };
    case "newAnswer":
      const question = state.questions[state.index];
      return { ...state,
               answer: action.payload,
               points : action.payload === question.correctOption ? state.points + question.points : state.points,
             };
    case "nexQuestion":
          return {...state ,
                    index: state.index +1,
                     answer:null,
          }
    case "finish": 
          return {
            ...state,
             status :'finished',
             highscore : 
             state.points > state.highscore ? 
             state.points : state.highscore ,
          }
    case "restart":
          return {
             ...initialState,
             questions: state.questions,
             status : "Ready",
          }
    case "tick":
          return {
            ...state,
             SecondsRaiminig: state.SecondsRaiminig - 1,
             status :state.SecondsRaiminig === 0 ? 'finished' : 'active'
          }
       
    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {

  const [{ questions, status, index, answer ,points,highscore ,SecondsRaiminig}, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev,cur)=>prev+cur.points , 0)

 
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []); 
  console.log(questions)
  return (
    <div className="app">
      <Headers />
      <Main>
       <>
        {status === "Loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "Ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
          )}
        {status === "active" && (
          <>
          <Progress answer={answer} points={points} index={index} numQuestions={numQuestions} maxPossiblePoints={maxPossiblePoints}/>
          <Question
            dispatch={dispatch}
            answer={answer}
            questions={questions[index]}
          />
          <Footer>
            <>
            <Timer dispatch={dispatch} SecondsRaiminig={SecondsRaiminig}/>
            <NextButton index={index} numQuestions={numQuestions} dispatch={dispatch} answer={answer}/>
            </>
          </Footer>
         </>
        )}
        {status === "finished" && (<FinishScreen dispatch ={dispatch} highscore={highscore}  points={points} maxPossiblePoints={maxPossiblePoints}/>)}
       </>
      </Main>
    </div>
  );
}
