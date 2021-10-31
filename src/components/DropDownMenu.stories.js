import DropDownMenu from './DropDownMenu'

export default {
  title: 'Component/DropDownMenu',
  component: DropDownMenu,
}

const Template = args => <DropDownMenu {...args} />

export const NotFinished = Template.bind({})
NotFinished.args = {
  book: {
    finished: false,
  },
}

export const Finished = Template.bind({})
Finished.args = {
  book: {
    finished: true,
  },
}
