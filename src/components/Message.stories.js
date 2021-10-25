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
  text:
    'Please try again or use the possibility to add your book manually below.',
}

export const SuccessMessage = Template.bind({})
SuccessMessage.args = {
  image: success,
  altText: 'success',
  message: 'Yay! The book was successfully added to your book list. :-)',
  text: 'You will shortly be redirected to your currently reading page.',
}
