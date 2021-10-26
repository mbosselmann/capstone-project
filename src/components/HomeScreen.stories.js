import HomeScreen from './HomeScreen'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Component/HomeScreen',
  component: HomeScreen,
}

const Template = args => <Start {...args} />

export const Welcome = Template.bind({})
Welcome.args = {
  setUsername: action(user => console.log(user)),
}
