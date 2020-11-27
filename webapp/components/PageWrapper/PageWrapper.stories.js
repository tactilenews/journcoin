import PageWrapper from './PageWrapper.vue'

export default {
  title: 'Components/PageWrapper',
  component: PageWrapper,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PageWrapper },
  template: '<PageWrapper v-bind="$props" />',
})

export const Default = Template.bind({})
