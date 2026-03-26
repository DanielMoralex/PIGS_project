export interface Gap {
  wordIndex: number
  answer: string
}

export interface LyricLine {
  start: number
  end: number
  text: string
  gaps?: Gap[]
}

export interface SongWithGaps {
  id: string
  title: string
  artist: string
  audioUrl: string
  lyrics: LyricLine[]
}