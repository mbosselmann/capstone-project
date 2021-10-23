import Navigation from './Navigation'

export default {
  title: 'Component/Navigation',
  component: Navigation,
}

const Template = args => <Navigation />

export const CurrentlyReadingLink = Template.bind({})

export const FinishedReadingLink = Template.bind({})

export const AddBookLink = Template.bind({})
