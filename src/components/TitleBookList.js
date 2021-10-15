function TitleBookList({ status, username }) {
  if (status === 'finishedBooks') {
    return (
      <div>
        <h2>Your library</h2>
        <p>These are all your books that you already read:</p>
      </div>
    )
  }
  if (status === 'currentlyReading') {
    return (
      <div>
        <h2>Hi {username}! </h2>
        <p>
          Welcome back! Here is the list of books that you are currently
          reading:
        </p>
      </div>
    )
  } else {
    return ''
  }
}

export default TitleBookList
