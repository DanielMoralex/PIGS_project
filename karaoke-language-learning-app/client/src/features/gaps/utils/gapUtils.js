export function generateGapsForLine(line, numGaps = 1) {
  const words = line.text.split(" ")

  const usedIndexes = new Set()
  const gaps = []

  while (gaps.length < numGaps && gaps.length < words.length) {
    const index = Math.floor(Math.random() * words.length)

    if (!usedIndexes.has(index) && words[index].length > 3) {
      usedIndexes.add(index)

      gaps.push({
        wordIndex: index,
        answer: words[index]
      })
    }
  }

  return gaps
}

export function generateGapsForSong(song) {
  return {
    ...song,
    lyrics: song.lyrics.map(line => ({
      ...line,
      gaps: generateGapsForLine(line, 1)
    }))
  }
}