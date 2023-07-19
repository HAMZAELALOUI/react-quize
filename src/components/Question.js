import Options from "./Options";

function Question({ questions, dispatch, answer }) {
  console.log(questions);
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options answer={answer} dispatch={dispatch} questions={questions} />
    </div>
  );
}

export default Question;
