import {clsx} from "clsx";

type WordProps = {
  word: string,
  result: number[],
  isCellBlocked: boolean,
  shakeIt: boolean,
  onShakeEnd: () => void,
}

const Word = ({word, result, isCellBlocked, shakeIt, onShakeEnd}: WordProps) => {
  return (
    <div
      // className="flex gap-1.5 sm:gap-2"
      className={clsx("flex gap-1.5 sm:gap-2", shakeIt && "animate-shake")}
      onAnimationEnd={onShakeEnd} /* reset after animation */
    >
      {word.split("").map((letter: string, index: number) => (
          <div
            key={index}
            className="flex justify-center items-center size-13 sm:size-15 rounded-lg border-2 border-grey-800 font-roboto text-2xl"
          >
            {letter.toUpperCase()}
          </div>
      ))}
    </div>
  )
}
export default Word
