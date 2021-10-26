import BookList from './BookList'
import placeholder from '../images/placeholder.png'

export default {
  title: 'Component/BookList',
  component: BookList,
}

const Template = args => <BookList {...args} />

export const Books = Template.bind({})
Books.args = {
  books: [
    {
      id: '1',
      title: 'Harry Potter and the Goblet of Fire',
      authors: ['J. K. Rowling'],
      thumbnail: placeholder,
      finished: false,
      readingSince: '05/2021',
      finishedSince: '',
    },
    {
      id: '2',
      title: 'Cathedral of the Sea',
      authors: ['Ildefonso Falcones de Sierra'],
      thumbnail: placeholder,
      finished: true,
      readingSince: '05/2021',
      finishedSince: '08/2021',
    },
  ],
}
