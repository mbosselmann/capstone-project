import AddBookForm from './AddBookForm'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Component/AddBookForm',
  component: AddBookForm,
}

const Template = args => <AddBookForm {...args} />
export const Form = Template.bind({})
Form.args = {
  onHandleCreateNewBook: action(book => console.log(book)),
  onGetBookCoverPreview: action(image => console.log(image)),
  onHandleSetSearchedBook: action(book => console.log(book)),
  onHandleSetSuccessMessage: action(message => console.log(message)),
}
