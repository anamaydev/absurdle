import {clsx} from "clsx";

type WordProps = {
  word: string,
  result: number[],
  isCellBlocked: boolean,
  shakeIt: boolean,
  reveal: boolean,
  onShakeEnd: () => void,
}

const Word = ({word, result, isCellBlocked, shakeIt, reveal, onShakeEnd}: WordProps) => {
  return (
    <div
      // className="flex gap-1.5 sm:gap-2"
      className={clsx("flex gap-1.5 sm:gap-2", shakeIt && "animate-shake")}
      onAnimationEnd={onShakeEnd} /* reset after animation */
    >
      {word.split("").map((letter: string, index: number) => (
        <div
          key={index}
          className={clsx("relative size-13 sm:size-15 font-roboto text-2xl transition-transform transform-3d duration-600", reveal && "rotate-x-180")}
          style={{transitionDelay: `${index * 150}ms`}}
        >
          {/* front */}
          <div className="absolute inset-0 z-20 flex justify-center items-center border-2 rounded-lg bg-black-900 border-grey-800 rotate-x-0 backface-hidden">
            {letter.toUpperCase()}
          </div>

          {/* back */}
          <div
            className={clsx( "absolute z-10 inset-0 flex justify-center " +
              "items-center border-2 rounded-lg rotate-x-180 backface-hidden",
              result[index] === 1 && "bg-green-600 border-green-600",
              result[index] === 2 && "bg-yellow-600 border-yellow-600",
              result[index] === -1 && "bg-grey-800 border-grey-800",
            )}
          >
            {letter.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  )
}
export default Word
