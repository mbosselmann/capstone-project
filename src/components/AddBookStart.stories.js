import StartAddBook from './AddBookStart'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Component/AddBookStart',
  component: StartAddBook,
}

const Template = args => <StartAddBook {...args} />

export const AddBookStart = Template.bind({})
AddBookStart.args = {
  onHandleISBNSearch: action(isbn => console.log(isbn)),
}
