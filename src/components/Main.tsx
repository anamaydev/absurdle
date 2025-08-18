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

  const todaysWord = "apple";

  /* function to set shakeIt to false as soon as the animation ends using onAnimationEnd */
  const resetShakeAnimation = (index:number) => {
    setGuessArray(prevGuessArray=>{
      const copyGuessArray = [...prevGuessArray];
      copyGuessArray[index] = {...copyGuessArray[index], shakeIt: false}
      return copyGuessArray;
    })
  }

  const compareWords = (index:number, tempGuessArray: GuessArrayType[]) => {
    const word = tempGuessArray[index].word.split("");
    const wordMap = new Map();
    const result:number[] = [];

    todaysWord.split("").forEach(letter => {
      if(!wordMap.has(letter)) wordMap.set(letter, 1);
      else wordMap.set(letter, wordMap.get(letter)+1);
    })

    todaysWord.split("").forEach((letter: string, idx: number) => {
      if(letter === word[idx]){
        result.push(1);
      }else if(letter != word[idx]){
        if(wordMap.has(word[idx])){             /* check if the letter is in the Map */
          if(wordMap.get(word[idx]) === 1) {    /* if the letter exist and frequency is 1, then delete it from the Map */
            wordMap.delete(word[idx]);
            result.push(2);             /* exists but incorrect position */
          }else {                               /* if the letter exist and frequency is more than 1 then just decrement it by 1 */
            wordMap.set(word[idx], wordMap.get(word[idx])-1);
            result.push(2);             /* exists but incorrect position */
          }
        }else result.push(-1);          /* letter does not exist */
      }
    })
    // console.log("result: ", result);
    tempGuessArray[index] = {...tempGuessArray[index], result: result};
    return tempGuessArray;
  }

  const getKeyStroke = useCallback((event: globalThis.KeyboardEvent)=>{
    setGuessArray(prevGuessArray => {
      const tempGuessArray = [...prevGuessArray];
      if(event.key === "Enter"){
        /* todo: add game over logic after 6 guesses */
        if(guessRef.current === 5) guessRef.current = 5;
        if(tempGuessArray[guessRef.current].word.trim().length <5){
          tempGuessArray[guessRef.current] = {      /* set shakeIt as true */
            ...tempGuessArray[guessRef.current],
            shakeIt:true
          };
          letterRef.current = 0;
          return tempGuessArray;
        } else {
          const tempGuessArrayWithResult = compareWords(guessRef.current, tempGuessArray);
          guessRef.current = guessRef.current + 1;
          letterRef.current = 0;
          /* TODO: game ended condition after correct guess */
          return tempGuessArrayWithResult;
        }

        // letterRef.current = 0;
        // return tempGuessArray;
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
