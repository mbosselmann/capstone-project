import Start from './Start'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Component/Start',
  component: Start,
}

const Template = args => <Start {...args} />

export const Welcome = Template.bind({})
Welcome.args = {
  setUsername: action(user => console.log(user)),
}
