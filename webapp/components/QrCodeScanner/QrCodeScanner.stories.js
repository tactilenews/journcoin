import QrCodeScanner from './QrCodeScanner.vue'

export default {
  title: 'QR Code Scanner',
  component: QrCodeScanner,
  argTypes: {
    parse: { action: 'parse' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QrCodeScanner },
  template: '<QrCodeScanner @parse="parse" v-bind="$props" />',
})

export const Default = Template.bind({})
Default.args = {}
