import Navigation from './Navigation'

export default {
  title: 'Component/Navigation',
  component: Navigation,
  argTypes: {
    onHandleActiveReadingStatus: { action: 'clicked' },
  },
}

const Template = args => <Navigation {...args} />

export const CurrentlyReadingLink = Template.bind({})

export const FinishedReadingLink = Template.bind({})
