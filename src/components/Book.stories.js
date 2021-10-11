import Book from './Book'
import placeholder from '../images/placeholder.png'

export default {
  title: 'Component/Book',
  component: Book,
}

const Template = args => <Book {...args} />

export const Books = Template.bind({})
Books.args = {
  id: '1',
  bookCover: placeholder,
  title: 'Harry Potter and the Goblet of Fire',
  authors: ['J. K. Rowling'],
  finished: false,
  readingSince: '05/2021',
  finishedSince: '',
}
