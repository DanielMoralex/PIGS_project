import GapInput from "./GapInput"

export default function GapLine({ line, isActive }) {
  const words = line.text.split(" ")

  return (
    <div className={isActive ? "line active-line" : "line"}>
      {words.map((word, index) => {
        const gap = line.gaps?.find(g => g.wordIndex === index)

        if (gap) {
          return <GapInput key={index} answer={gap.answer} />
        }

        return <span key={index}>{word} </span>
      })}
    </div>
  )
}