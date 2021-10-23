import AddBook from './AddBook'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Component/AddBook',
  component: AddBook,
}

const Template = args => <AddBook {...args} />

export const NewBook = Template.bind({})
NewBook.args = {
  onCreateNewBook: action(book => console.log(book)),
  onGetBookCoverPreview: action(image => console.log(image)),
}
