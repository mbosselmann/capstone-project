function getLocalStorage(key) {
  const userBooks = localStorage.getItem(key)
  try {
    const books = JSON.parse(userBooks)
    return books
  } catch (error) {
    console.error(error)
  }
}

export default getLocalStorage
