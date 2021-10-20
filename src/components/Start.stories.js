import Start from './Start'

export default {
  title: 'Component/Start',
  component: Start,
  argTypes: {
    setUsername: { action: 'username' },
  },
}

const Template = args => <Start />

export const StartPoint = Template.bind({})
