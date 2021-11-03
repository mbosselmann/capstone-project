import Message from './Message'
import error from '../images/error.svg'
import success from '../images/success.svg'

export default {
  title: 'Component/Message',
  component: Message,
}

const Template = args => <Message {...args} />

export const ErrorMessage = Template.bind({})
ErrorMessage.args = {
  image: error,
  altText: 'error',
  message: "Oh no! The ISBN doesn't seem to exist. :-(",
}

export const SuccessMessage = Template.bind({})
SuccessMessage.args = {
  image: success,
  altText: 'success',
  message: 'Yay! The book was successfully added to your book list. :-)',
}

export const UpdateMessage = Template.bind({})
UpdateMessage.args = {
  image: success,
  altText: 'success',
  message: 'Updated!',
}
