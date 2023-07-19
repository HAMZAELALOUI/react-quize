function Options({ questions, dispatch, answer }) {
  const hasAnswer = answer != null;
  return (
    <div className="options">
      {questions.options.map((option, index) => (
        <button
          disabled ={hasAnswer}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          key={option}
          className={`btn btn-option ${index === answer ? "answer" : ""} 
          ${ hasAnswer ? 
                     index === questions.correctOption ? "correct" : "wrong" 
                       : ''
                    } `} >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
