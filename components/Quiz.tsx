'use client'
import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { ClerkLoaded } from '@clerk/nextjs';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Hero from './Hero';
import Link from 'next/link';
import Image from 'next/image';

interface QuizProps {
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];
  userId: string | undefined;
}

const Quiz: React.FC<QuizProps> = ({ questions, userId }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [timerRunning, setTimerRunning] = useState(false);
  const [finish,setFinish] = useState(false);

  const { question, answers, correctAnswer } = questions[activeQuestion];

  const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timerRunning, timeRemaining]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimeRemaining(25);
  };

  const handleTimeUp = () => {
    //stopTimer();
    //resetTimer();
    //nextQuestion();
    setShowResults(true)
    

  };

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  const onAnswerSelected = (answer: string, idx: number) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(answer);
      
    } else {
      setSelectedAnswer('');
      
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResults((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    
  
    


    if (activeQuestion !== 5 - 1 ) {
      setActiveQuestion((prev) => prev + 1);
      
    } else {
      setShowResults(true);
      //stopTimer();
      fetch('/api/quizResults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          quizScore: results.score,
          correctAnswers: results.correctAnswers,
          wrongAnswers: results.wrongAnswers,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not working fam');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Quiz results saved successfully:', data);
        })
        .catch((error) => {
          console.error('Error saving quiz results:', error);
        });
    }
    setChecked(false);
    //resetTimer();
    //startTimer();
  };

  return (
    

    <>
     

         <SignedOut>
           <div className='max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p.4 gap-2'>
           <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
           <Image src='./success.svg' fill alt="home image" />
            </div>
            <div className='flex flex-col items-center gap-y-3 max-w-[330px] w-full'>
                 <button className="py-2 px-5 text-white bg-primary rounded-md " >
                        <Link href='/'>
                           SignUp
                        </Link>
                   </button>
                   </div>
            </div>
           </SignedOut>




      <SignedIn>

    <div className="h-[100vh] pt-5 pb-0">
      <div className="max-w-[1500px] py-0 mx-auto w-[90%] flex justify-center pt-5 flex-col">
        {!showResults ? (
          <>
            <div className="flex justify-between mb-10 items-center lg:px-20">
              <div className="bg-primary text-white px-4 rounded-md py-0">
                <h2>
                  Question: {activeQuestion + 1}
                  <span>/{5}</span>
                </h2>
              </div>

              <div className="bg-rose-500 text-white px-4 rounded-md py-1">
              {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
              </div>
            


              </div>
              
              
            

            <div >
              
              <h3 className="p-5 mb-5 lg:text-xl font-bold text-[13px] py-0 justify-start">
                <BlockMath math={question} />
              </h3>
              
              <ul>
                {answers.map((answer: string, idx: number) => (
                  <li
                    key={idx}
                    onClick={() => onAnswerSelected(answer, idx)}
                    className={`cursor-pointer mb-5 py-3 rounded-md hover:bg-primary hover:text-white px-3 ${
                      selectedAnswerIndex === idx && 'bg-primary text-white'
                    }`}
                  >
                    <span>
                      <InlineMath math={answer} />
                    </span>
                  </li>
                ))}
              </ul>
                 
              <button
                onClick={nextQuestion}
                disabled={!checked}
                className="font-bold bg-green-500 py-2 px-2 rounded-md text-white w-full disabled:bg-green-500/50"
              >
                {activeQuestion === questions.length - 1
                  ? "Finir"
                  : "Question Suivante →"}
              </button>

            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl uppercase mb-10">Résultats 📈</h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
              
              <StatCard title="Nombre total de questions" value={5} />
             
              <StatCard title="Réponses Correctes" value={results.correctAnswers} />
              <StatCard title="Réponses Incorrectes" value={results.wrongAnswers} />
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-10 font-bold uppercase"
            >
              Recommencer le Quiz
            </button>
          </div>
        )}
      </div>
    </div>

    </SignedIn>

    </>
  );
};

export default Quiz;
