function FinishScreen({points,maxPossiblePoints,highscore,dispatch}) {
   const percetage=(points/maxPossiblePoints)*100
   let emoji;
   if(percetage === 100) emoji="🥇";
   if(percetage>=80 && percetage < 100) emoji="🤪";
   if(percetage>=50 && percetage < 80) emoji="🙂";
   if(percetage>=0 && percetage < 50) emoji="😕";
   if(percetage === 0) emoji='🤦‍♂️';
   let b;

   console.log(emoji)
   console.log(percetage)
  return (
    <>
    <p className="result">
     <span>{emoji}</span> You Scored <strong>{points}</strong> out of <strong>{maxPossiblePoints}</strong> ({Math.ceil(percetage)}%)
    </p>
    <p className="highscore">(HighScore : {highscore} points)</p>
    <button className="btn btn-ui" onClick={()=>dispatch({type : 'restart' })}>Restart Quiz</button>
    </>
  )
}

export default FinishScreen
