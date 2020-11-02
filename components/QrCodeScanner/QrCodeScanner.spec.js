import { mount } from '@vue/test-utils'
import QrCodeScanner from './QrCodeScanner.vue'

describe('QrCodeScanner', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(QrCodeScanner)
    expect(wrapper.vm).toBeTruthy()
  })
})
