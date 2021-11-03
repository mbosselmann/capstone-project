import HomeScreen from './HomeScreen'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Component/HomeScreen',
  component: HomeScreen,
}

const Template = args => <HomeScreen {...args} />

export const Welcome = Template.bind({})
Welcome.args = {
  onHandleSetUsername: action(user => console.log(user)),
  onHandleEasterEgg: action(egg => console.log(egg)),
}
