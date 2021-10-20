import Navigation from './Navigation'

export default {
  title: 'Component/Navigation',
  component: Navigation,
  argTypes: {
    onHandleActiveReadingStatus: { action: 'clicked' },
  },
}

const Template = args => <Navigation />

export const CurrentlyReadingLink = Template.bind({})

export const FinishedReadingLink = Template.bind({})

export const AddBookLink = Template.bind({})
