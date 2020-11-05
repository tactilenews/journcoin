import QrCodeScanner from './QrCodeScanner.vue'

export default {
  title: 'QR Code Scanner',
  component: QrCodeScanner,
  argTypes: {
    earn: { action: 'earn' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QrCodeScanner },
  template: '<QrCodeScanner @earn="earn" v-bind="$props" />',
})

export const Default = Template.bind({})
Default.args = {}
