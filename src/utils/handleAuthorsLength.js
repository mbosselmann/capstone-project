export default function handleAuthorsLength(authors) {
  if (authors.length === 2) {
    if (authors[0].includes(authors[1])) {
      return ` ${authors[0]}`
    } else {
      return ` ${authors[0]} and ${authors[1]}`
    }
  }
  if (authors > 2) {
    return ` ${authors[0]} and others`
  } else {
    return ` ${authors}`
  }
}
