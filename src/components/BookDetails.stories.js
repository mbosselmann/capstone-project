import BookDetails from './BookDetails'
import { MemoryRouter, Route } from 'react-router-dom'

export default {
  title: 'Component/BookDetails',
  component: BookDetails,
}

const Template = args => {
  const { path } = args
  return (
    <MemoryRouter initialEntries={path}>
      <Route path="/book/:id/">
        <BookDetails {...args} />
      </Route>
    </MemoryRouter>
  )
}

export const DetailsPage = Template.bind({})
DetailsPage.args = {
  path: ['/book/1HJDB34567'],
  books: [
    {
      authors: 'J. K. Rowling',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt nunc in sem semper commodo. Morbi maximus justo mi, sed auctor velit auctor ac. In vitae semper mauris. Aenean congue mauris rhoncus ipsum consequat, eget porta elit pellentesque.',
      finished: false,
      finishedSince: '',
      id: '1HJDB34567',
      isbn10: '123456',
      isbn13: '1234567',
      onPage: '34',
      pages: '345',
      publisher: 'Publisher',
      readingSince: '05/2021',
      subtitle: 'Ravenclaw Edition',
      thumbnail:
        'http://books.google.com/books/content?id=xL34yAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      title: 'Harry Potter and the Goblet of Fire',
      year: '2020',
    },
  ],
}
