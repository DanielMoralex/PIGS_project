import { useState, useEffect } from "react"
import { db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"

/*
export default function useLyricsSync(audioRef, lyrics) {
  const [currentTime, setCurrentTime] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const update = () => {
      const time = audio.currentTime
      setCurrentTime(time)

      const index = lyrics.findIndex(
        line => time >= line.start && time < line.end
      )

      if (index !== -1) setActiveIndex(index)
    }

    audio.addEventListener("timeupdate", update)
    return () => audio.removeEventListener("timeupdate", update)
  }, [lyrics])

  return { currentTime, activeIndex }
}
*/

export default function useSong(songId) {
  const [song, setSong] = useState(null)

  useEffect(() => {
    const fetchSong = async () => {
      const docRef = doc(db, "songs", songId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setSong(docSnap.data())
      }
    }

    fetchSong()
  }, [songId])

  return song
}