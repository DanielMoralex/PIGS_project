import { useRef } from "react"
import useLyricsSync from "../hooks/useLyricsSync"
import GapLine from "./GapLine"
import { generateGapsForSong } from "../utils/gapUtils"

export default function LyricsWithGaps({ song }) {
  const audioRef = useRef()

  const { activeIndex } = useLyricsSync(audioRef, song.lyrics)
  const songWithGaps = generateGapsForSong(song)

  return (
  <div className="player-container">
    <audio ref={audioRef} src={song.audioUrl} controls />

    <div className="lyrics-container">
      {songWithGaps.lyrics.map((line, index) => (
        <GapLine
          key={index}
          line={line}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  </div>
)
}