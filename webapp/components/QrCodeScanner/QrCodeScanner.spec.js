import { createLocalVue, shallowMount } from '@vue/test-utils'
import VueQrcodeReader from 'vue-qrcode-reader'
import QrCodeScanner, { validJournCoin } from './QrCodeScanner.vue'

const localVue = createLocalVue()
localVue.use(VueQrcodeReader)

describe('validJournCoin', () => {
  const hostUrl = new URL('https://app.journcoin.de')

  describe('given URL', () => {
    const urls = {
      'https://app.journcoin.de/?jwt=42': '42',
      'https://app.journcoin.de/?wrong=42': null,
      'https://app.journcoin.de/wrong/route/42': null,
      whatever: null,
      'https://some-random-domain.org/coin/42': null,
    }

    for (const url in urls) {
      it(`returns ${JSON.stringify(urls[url])} for ${url}`, () => {
        expect(validJournCoin(url, hostUrl)).toEqual(urls[url])
      })
    }

    it('returns null for undefined', () => {
      expect(validJournCoin(undefined)).toEqual(null)
    })

    it('returns null for null', () => {
      expect(validJournCoin(null)).toEqual(null)
    })
  })
})

describe('QrCodeScanner', () => {
  describe('shallowMount', () => {
    describe('when QR is scanned', () => {
      let url
      const qrCodeScanned = async () => {
        const wrapper = shallowMount(QrCodeScanner, {
          localVue,
          mocks: { $config: { URL: 'http://localhost:3000' } },
        })
        await wrapper
          .findComponent({ name: 'qrcode-stream' })
          .vm.$emit('decode', url)
        return wrapper
      }

      describe('QR code is invalid', () => {
        beforeEach(() => (url = 'https://app.journcoin.de/42'))

        it('emits no event', async () => {
          const wrapper = await qrCodeScanned()
          expect(wrapper.emitted()).toEqual({})
        })
      })

      describe('QR code represents valid JournCoin', () => {
        beforeEach(() => (url = 'https://localhost:3000/?jwt=abcde'))

        it('$emits "parse" with QR encoded JWT', async () => {
          const wrapper = await qrCodeScanned()
          expect(wrapper.emitted()).toEqual({ parse: [['abcde']] })
        })
      })
    })
  })
})
