import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import VueQrcodeReader from 'vue-qrcode-reader'
import QrCodeScanner, { validJournCoin } from './QrCodeScanner.vue'

const localVue = createLocalVue()
localVue.use(VueQrcodeReader)

describe('validJournCoin', () => {
  describe('given URL', () => {
    const urls = {
      'https://journcoin.org/coin/42': '42',
      'https://journcoin.org/coin/abcde': 'abcde',
      'https://journcoin.org/wrong/route/42': false,
      whatever: false,
      'https://some-random-domain.org/coin/42': false,
    }

    for (const url in urls) {
      it(`returns ${urls[url]} for ${url}`, () => {
        expect(validJournCoin(url)).toEqual(urls[url])
      })
    }

    it('returns false for undefined', () => {
      expect(validJournCoin(undefined)).toEqual(false)
    })

    it('returns false for null', () => {
      expect(validJournCoin(null)).toEqual(false)
    })
  })
})

describe('QrCodeScanner', () => {
  describe('mount', () => {
    it('is a Vue instance', () => {
      const wrapper = mount(QrCodeScanner, { localVue })
      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('shallowMount', () => {
    describe('when QR is scanned', () => {
      let url
      const qrCodeScanned = async () => {
        const wrapper = shallowMount(QrCodeScanner, { localVue })
        await wrapper
          .findComponent({ name: 'qrcode-stream' })
          .vm.$emit('decode', url)
        return wrapper
      }

      describe('QR code is invalid', () => {
        beforeEach(() => (url = 'https://journcoin.org/42'))

        it('emits no event', async () => {
          const wrapper = await qrCodeScanned()
          expect(wrapper.emitted()).toEqual({})
        })
      })

      describe('QR code is valid', () => {
        beforeEach(() => (url = 'https://journcoin.org/coin/abcde'))

        it('$emits "earn"', async () => {
          const wrapper = await qrCodeScanned()
          expect(wrapper.emitted('earn')).toEqual([['abcde']])
        })
      })
    })
  })
})
