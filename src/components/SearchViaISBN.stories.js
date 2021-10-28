import SearchViaISBN from './SearchViaISBN'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Component/SearchViaISBN',
  component: SearchViaISBN,
}

const Template = args => <SearchViaISBN {...args} />

export const Search = Template.bind({})
Search.args = {
  onHandleISBNSearch: action(isbn => console.log(isbn)),
}
