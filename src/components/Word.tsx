type WordProps = {
  word: string,
  result: number[],
  isCellBlocked: boolean,
  shakeIt: boolean,
}

const Word = ({word, result, isCellBlocked, shakeIt}: WordProps) => {
  return (
    <div className="flex gap-1.5 sm:gap-2">
      {
        word.split("").map((letter: string, index: number) => (
          <div
            key={index}
            className="flex justify-center items-center size-13 sm:size-15 rounded-lg border-2 border-grey-800 font-roboto text-2xl"
          >{letter.toUpperCase()}</div>
        ))
      }
    </div>
  )
}
export default Word
