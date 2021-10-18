import AddBook from './AddBook'

export default {
  title: 'Component/AddBook',
  component: AddBook,
}

const Template = args => <AddBook {...args} />

export const NewBook = Template.bind({})
