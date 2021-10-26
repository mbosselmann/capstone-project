import Book from './Book'
import placeholder from '../images/placeholder.png'
import { action } from '@storybook/addon-actions'

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
  finished: false,
  readingStatusDate: '05/2021',
  finishedSince: '',
  onHandleAuthorsLength: action(authors => console.log(authors)),
}

export const BookAlreadyRead = Template.bind({})
BookAlreadyRead.args = {
  id: '2',
  bookCover: placeholder,
  title: 'Cathedral of the Sea',
  authors: ['Ildefonso Falcones de Sierra'],
  finished: true,
  readingStatusDate: '05/2021',
  finishedSince: '08/2021',
  onHandleAuthorsLength: action(authors => console.log(authors)),
}
