import React, { useState, useEffect } from 'react';
import { HomeDisplay } from "./HomeDisplay.js";
import { ScoreDisplay } from "./ScoreDisplay.js";
import { ProgressBar } from "./ProgressBar.js";
import { QuestionDisplay } from "./QuestionDisplay.js";
import { ChoiceDisplay } from "./ChoiceDisplay.js";
import { BottomBar } from "./BottomBar.js";

// import trivia from "../Apprentice_TandemFor400_Data.json";

import '../styles/App.css';

export const App = () => {

  const [trivia, setTrivia] = useState({});
  const [sessionToken, setSessionToken] = useState("");
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions] = useState(10);
  const [selected, setSelected] = useState(-1);
  const [questionsInSession, setQuestionsInSession] = useState([]);

  const [isAsking, setIsAsking] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [showFinal, setShowFinal] = useState(false);

  const [order, setOrder] = useState([0,1,2,3])

  useEffect(() => {
    getToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getTrivia();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionToken])

  const getTrivia = () => {
    console.log(sessionToken);
    fetch(`https://opentdb.com/api.php?amount=10&token=${sessionToken}`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response.response_code === 0) {
          setTrivia(response.results);
        }
      })
  }

  const getToken = () => {
    fetch(`https://opentdb.com/api_token.php?command=request`)
      .then( response => {
        return response.json();
      })
      .then( response => {
        setSessionToken( response.token );
      })
  }

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
    let nextQuestion = currentQuestion + 1;

    if ( nextQuestion < totalQuestions ) {
      setQuestionsInSession([...questionsInSession, nextQuestion]);
      setCurrentQuestion(nextQuestion);
    } else {
      setShowFinal(true);
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
        <>
          <HomeDisplay /> 
        </>
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
                correct={trivia[currentQuestion].correct_answer} 
                incorrect={trivia[currentQuestion].incorrect_answers} 
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
        ready={sessionToken != null}
        canRestart={ !showHome }
        restart={() => restart()}
        canNext={!isAsking}
        next={() => next()}
      />
    </div>
  );
}
