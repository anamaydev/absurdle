import { useState, useEffect, useRef, useCallback} from "react";
import Word from "./Word";

type GuessArrayType = {
  word: string,
  result: number[],
  isCellBlocked: boolean,
  shakeIt: boolean,
}

const Main = () => {
  const [guessArray, setGuessArray] = useState<GuessArrayType[]>(Array.from({length: 6}, ()=>({
    word: "     ",
    result: new Array(5).fill(0),
    isCellBlocked: false,
    shakeIt: false,
  })))

  const guessRef = useRef(0);
  const letterRef = useRef(0);

  const todaysWord = "table";

  /* function to set shakeIt to false as soon as the animation ends using onAnimationEnd */
  const resetShakeAnimation = (index:number) => {
    setGuessArray(prevGuessArray=>{
      const copyGuessArray = [...prevGuessArray];
      copyGuessArray[index] = {...copyGuessArray[index], shakeIt: false}
      return copyGuessArray;
    })
  }

  const getKeyStroke = useCallback((event: globalThis.KeyboardEvent)=>{
    setGuessArray(prevGuessArray => {
      const tempGuessArray = [...prevGuessArray];
      if(event.key === "Enter"){
        if(guessRef.current === 5) guessRef.current = 5;
        else if(tempGuessArray[guessRef.current].word.trim().length <5){
          tempGuessArray[guessRef.current] = {      /* set shakeIt as true */
            ...tempGuessArray[guessRef.current],
            shakeIt:true
          };
          return tempGuessArray;
        } else guessRef.current = guessRef.current + 1;
        letterRef.current = 0;
        return tempGuessArray;
      }else if(event.key === "Backspace"){
        if(letterRef.current > 0){
          --letterRef.current; /* go one letter back */
          const wordArray = tempGuessArray[guessRef.current].word.split(""); /* convert the word from string to array */
          wordArray[letterRef.current] = " "; /* replacing keystroke in appropriate index */
          tempGuessArray[guessRef.current] = {...tempGuessArray[guessRef.current], word: wordArray.join("")}; /* convert the word from array to string and add back to tempGuessArray*/
        }
      }else if((event.key >= "a" && event.key <= "z") || (event.key >= "A" && event.key <= "Z")){
        if(letterRef.current === 5) return tempGuessArray; /* return if the letter index is out of index*/
        const wordArray = tempGuessArray[guessRef.current].word.split(""); /* convert the word from string to array */
        wordArray[letterRef.current] = event.key; /* replacing keystroke in appropriate index */
        tempGuessArray[guessRef.current] = {...tempGuessArray[guessRef.current], word: wordArray.join("")}; /* convert the word from array to string and add back to tempGuessArray*/
        letterRef.current = letterRef.current + 1;
      }
      return tempGuessArray;
    })
  },[])

  useEffect(() => {
    window.addEventListener("keydown",getKeyStroke);
    return () => window.removeEventListener("keydown", getKeyStroke);
  }, [getKeyStroke]);

  useEffect(() => {
    console.log("GuessArray", guessArray);
    console.log("guessRef: ", guessRef.current);
    console.log("letterRef: ", letterRef.current);
  }, [guessArray]);

  return (
    <main className="grow flex justify-center items-center">
      {/* grid + clock*/}
      <div className="flex flex-col items-center">
        {/* TODO: replace with clock component */}
        <div className="font-rhodium-libre text-md text-red-600 self-end">00:05.<span className="text-base">22</span></div>

        {/* grid */}
        <div className="flex flex-col gap-1.5">
          {guessArray.map((guess, index) => (
              <Word
                key={index}
                word={guess.word}
                result={guess.result}
                isCellBlocked={guess.isCellBlocked}
                shakeIt={guess.shakeIt}
                onShakeEnd={()=>resetShakeAnimation(index)}
              />
          ))}
        </div>
      </div>
      {/* keyboard */}
      <div></div>
    </main>
  )
}
export default Main
