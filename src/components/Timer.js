import {useEffect} from "react"

function Timer({dispatch ,SecondsRaiminig}) {
  const min =Math.floor(SecondsRaiminig/60);
  const seconds= SecondsRaiminig % 60
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);
  return (
    <div className="timer">
         {min < 10 && "0"}{min}:{seconds<10 && '0'}{seconds}
    </div>
  )
}

export default Timer
