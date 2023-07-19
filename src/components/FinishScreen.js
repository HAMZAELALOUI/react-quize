function FinishScreen({points,maxPossiblePoints,highscore}) {
   const percetage=(points/maxPossiblePoints)*100
   let emoji;
   if(percetage === 100) emoji="🥇";
   if(percetage>=80 && percetage < 100) emoji="🤪";
   if(percetage>=50 && percetage < 80) emoji="🙂";
   if(percetage>=0 && percetage < 50) emoji="😕";
   if(percetage === 0) emoji='🤦‍♂️';
   console.log(emoji)
   console.log(percetage)
  return (
    <>
    <p className="result">
     <span>{emoji}</span> You Scored <strong>{points}</strong> out of <strong>{maxPossiblePoints}</strong> ({Math.ceil(percetage)}%)
    </p>
    <p className="highscore">(HighScore : {highscore} points)</p>
    </>
  )
}

export default FinishScreen
