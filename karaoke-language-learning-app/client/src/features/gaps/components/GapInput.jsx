import { useState } from "react"

export default function GapInput({ answer }) {
  const [value, setValue] = useState("")
  const [correct, setCorrect] = useState(null)

  const handleChange = (e) => {
    const val = e.target.value
    setValue(val)

    if (val.toLowerCase() === answer.toLowerCase()) {
      setCorrect(true)
    } else {
      setCorrect(false)
    }
  }

  return (
    <input
      value={value}
      onChange={handleChange}
      style={{
        borderBottom: "2px solid",
        borderColor: correct === null ? "gray" : correct ? "green" : "red",
        width: "80px"
      }}
    />
  )
}