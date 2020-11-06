import React, { useState, useEffect } from 'react';
import { HomeDisplay } from "./HomeDisplay.js";
import { ScoreDisplay } from "./ScoreDisplay.js";
import { ProgressBar } from "./ProgressBar.js";
import { QuestionDisplay } from "./QuestionDisplay.js";
import { ChoiceDisplay } from "./ChoiceDisplay.js";
import { BottomBar } from "./BottomBar.js";

import trivia from "../Apprentice_TandemFor400_Data.json";

import '../styles/App.css';

export const App = () => {

  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions] = useState(10);
  const [selected, setSelected] = useState(-1);
  const [questionsInSession, setQuestionsInSession] = useState([]);

  const [isAsking, setIsAsking] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [showFinal, setShowFinal] = useState(false);

  const [order, setOrder] = useState([0,1,2,3])

  const handleSetIsAsking = value => {
    setIsAsking(value);
  }

  const handleSetSelected = value => {
    setSelected(value);
  }

  const shuffleOrder =  () => {
      let array = order;
  
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i)
          const temp = array[i]
          array[i] = array[j]
          array[j] = temp
      }

      if (isAsking) {
          setOrder(array);
      }
  }

  const getQuestion = () => {
    let nextQuestion = getRandomIndexNoRepeat(trivia.length);

    if ( questionsInSession.length < totalQuestions ) {
      setQuestionsInSession([...questionsInSession, nextQuestion]);
      setCurrentQuestion(nextQuestion);
    } else {
      setShowFinal(true);
    }
  }

  const getRandomIndexNoRepeat = range => {
    let newQuestion = Math.floor(Math.random() * range)

    if (questionsInSession.includes(newQuestion)) {
      return getRandomIndexNoRepeat(range);
    } else {
      return newQuestion;
    }
  }

  const increaseScore = () => {
    setScore(score + 1);
  }

  const restart = () => {
    setScore(0);
    setCurrentQuestion(0);
    setQuestionsInSession([]);
    setIsAsking(false);
    setShowFinal(false);
    setShowHome(true);
  }

  const next = () => {
    if (showHome) {
      setShowHome(false);
    }
    setSelected(-1);
    setIsAsking(true);
    getQuestion();
    shuffleOrder();
  }

  return (
    <div className="App">
      { showHome ?
        <HomeDisplay /> 
        :
        <>
          <ScoreDisplay 
            score={score} 
            showFinal={showFinal}
          />
                     
          { !showFinal &&
            <>
              <ProgressBar progress={((questionsInSession.length - 1) / totalQuestions) * 100}/>

              <QuestionDisplay question={trivia[currentQuestion].question} />

              <ChoiceDisplay 
                correct={trivia[currentQuestion].correct} 
                incorrect={trivia[currentQuestion].incorrect} 
                increaseScore={() => increaseScore()}
                next={() => next()}
                isAsking={isAsking}
                setIsAsking={handleSetIsAsking}
                order={order}
                selected={selected}
                setSelected={handleSetSelected}
              />
            </>
          }
        </>
      }
      <BottomBar 
        canRestart={ !showHome }
        restart={() => restart()}
        canNext={!isAsking}
        next={() => next()}
      />
    </div>
  );
}
