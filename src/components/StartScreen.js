import { type } from "@testing-library/user-event/dist/type";

function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Wlcome to React Quiz!</h2>
      <h3> {numQuestions} Questions for this quiz</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
