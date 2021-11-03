import Book from './Book'
import placeholder from '../images/placeholder.png'

export default {
  title: 'Component/Book',
  component: Book,
  decorators: [
    Story => (
      <ul>
        <Story />
      </ul>
    ),
  ],
}

const Template = args => <Book {...args} />

export const BookCurrentlyRead = Template.bind({})
BookCurrentlyRead.args = {
  id: '1',
  bookCover: placeholder,
  title: 'Harry Potter and the Goblet of Fire',
  authors: ['J. K. Rowling'],
  readingStatus: false,
  readingStatusDate: '01.05.2021',
  finishedOn: '',
}

export const BookAlreadyRead = Template.bind({})
BookAlreadyRead.args = {
  id: '2',
  bookCover: placeholder,
  title: 'Cathedral of the Sea',
  authors: ['Ildefonso Falcones de Sierra'],
  readingStatus: true,
  readingStatusDate: '01.05.2021',
  finishedOn: '01.08.2021',
}
