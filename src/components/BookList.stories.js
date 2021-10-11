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
      volumeInfo: {
        title: 'Harry Potter and the Goblet of Fire',
        authors: ['J. K. Rowling'],
        imageLinks: {
          thumbnail: placeholder,
        },
      },
      finished: false,
      readingSince: '05/2021',
      finishedSince: '',
    },
    {
      id: '2',
      volumeInfo: {
        title: 'Cathedral of the Sea',
        authors: ['Ildefonso Falcones de Sierra'],
        imageLinks: {
          thumbnail: placeholder,
        },
      },
      finished: true,
      readingSince: '05/2021',
      finishedSince: '08/2021',
    },
  ],
}
