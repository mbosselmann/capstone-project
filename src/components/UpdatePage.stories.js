import UpdatePage from './UpdatePage'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Component/UpdatePage',
  component: UpdatePage,
}

const Template = args => <UpdatePage {...args} />

export const Form = Template.bind({})
Form.args = {
  book: {
    pages: '400',
  },
  onHandleUpdateBookList: action(page => console.log(page)),
  onHandleSetUpdatePage: action(page => console.log(page)),
}
