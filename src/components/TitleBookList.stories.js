import TitleBookList from './TitleBookList'

export default {
  title: 'Component/BookList',
  component: TitleBookList,
}

const Template = args => <TitleBookList {...args} />

export const CurrentlyReading = Template.bind({})
CurrentlyReading.args = {
  status: 'currentlyReading',
  username: 'Mareike',
}

export const FinishedReading = Template.bind({})
FinishedReading.args = {
  status: 'finishedBooks',
}
