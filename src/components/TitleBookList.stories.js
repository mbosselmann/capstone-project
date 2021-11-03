import TitleBookList from './TitleBookList'

export default {
  title: 'Component/TitleBookList',
  component: TitleBookList,
}

const Template = args => <TitleBookList {...args} />

export const CurrentlyReading = Template.bind({})
CurrentlyReading.args = {
  pathname: '/currently-reading',
  username: 'Mareike',
}

export const FinishedReading = Template.bind({})
FinishedReading.args = {
  pathname: '/library',
}
