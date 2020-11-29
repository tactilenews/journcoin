import { createLocalVue, shallowMount } from '@vue/test-utils'
import VueQrcodeReader from 'vue-qrcode-reader'
import Vuex from 'vuex'
import QrCodeScanner, { qrCodePayload } from './QrCodeScanner.vue'

const localVue = createLocalVue()
localVue.use(VueQrcodeReader)
localVue.use(Vuex)

describe('qrCodePayload', () => {
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
        expect(qrCodePayload(url, hostUrl)).toEqual(urls[url])
      })
    }

    it('returns null for undefined', () => {
      expect(qrCodePayload(undefined)).toEqual(null)
    })

    it('returns null for null', () => {
      expect(qrCodePayload(null)).toEqual(null)
    })
  })
})

describe('QrCodeScanner', () => {
  let actions
  let store
  describe('shallowMount', () => {
    beforeEach(() => {
      actions = {
        'auth/earn': jest.fn().mockResolvedValue(true),
        'auth/login': jest.fn(),
      }
    })

    describe('when QR is scanned', () => {
      let url
      const qrCodeScanned = async () => {
        store = new Vuex.Store({
          actions,
        })
        const wrapper = shallowMount(QrCodeScanner, {
          localVue,
          store,
          mocks: { $config: { URL: 'http://localhost:3000' } },
        })
        await wrapper
          .findComponent({ name: 'qrcode-stream' })
          .vm.$emit('decode', url)
        return wrapper
      }

      describe('but is invalid', () => {
        beforeEach(() => (url = 'https://app.journcoin.de/42'))

        it('emits `unknown-qr-code`', async () => {
          const wrapper = await qrCodeScanned()
          expect(wrapper.emitted()).toEqual({
            'unknown-qr-code': [['https://app.journcoin.de/42']],
          })
        })
      })

      describe('is a JournCoin', () => {
        beforeEach(
          () =>
            (url =
              'http://localhost:3000/?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2luIjp7ImlkIjoiQk5EOExhSnBUeUZEU2ZXL2hhZ1BvUmp3Z29jdHBxR2pyN2FpTlprWjh2a1krNU9vRVBha0I5R0lHOFRLZTh3NWJNeTRUTXdJbHhqZTdyU0s2OENWeWc9PSJ9LCJpYXQiOjE2MDY0NDI0OTV9.sMzhqndAIt9vivIlyO9e-ju3cHbldgPTvHh29Yzk7Ig')
        )

        it('$emits `valid-journcoin`', async () => {
          const wrapper = await qrCodeScanned()
          expect(wrapper.emitted()).toEqual({ 'valid-journcoin': [[]] })
        })

        it('calls $store.dispatch(`auth/earn`)', async () => {
          await qrCodeScanned()
          expect(actions['auth/earn']).toHaveBeenCalledWith(
            expect.any(Object),
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2luIjp7ImlkIjoiQk5EOExhSnBUeUZEU2ZXL2hhZ1BvUmp3Z29jdHBxR2pyN2FpTlprWjh2a1krNU9vRVBha0I5R0lHOFRLZTh3NWJNeTRUTXdJbHhqZTdyU0s2OENWeWc9PSJ9LCJpYXQiOjE2MDY0NDI0OTV9.sMzhqndAIt9vivIlyO9e-ju3cHbldgPTvHh29Yzk7Ig'
          )
        })

        describe('if journcoin has been used already', () => {
          beforeEach(() => {
            actions['auth/earn'] = jest.fn().mockRejectedValue('Already taken')
          })

          it('emits `invalid-journcoin`', async () => {
            const wrapper = await qrCodeScanned()
            expect(wrapper.emitted()).toEqual({ 'invalid-journcoin': [[]] })
          })
        })

        describe('if journcoin is in localStorage alrady', () => {
          beforeEach(() => {
            actions['auth/earn'] = jest.fn().mockResolvedValue(false)
          })

          it('emits no event', async () => {
            const wrapper = await qrCodeScanned()
            expect(wrapper.emitted()).toEqual({})
          })
        })
      })

      describe('is a login token', () => {
        beforeEach(
          () =>
            (url =
              'http://localhost:3000/?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb24iOnsiaWQiOiJja2h2OWJhNWMxNTNtMGE1Nm5jNmZxa2F5In0sImlhdCI6MTYwNjQ0MjA1Nn0.bVD8027mOtPucRexuto_FN6Wh4kItj4bWkE3M4TT6kA')
        )

        it('$emits no event', async () => {
          const wrapper = await qrCodeScanned()
          expect(wrapper.emitted()).toEqual({})
        })

        it('calls $store.dispatch(`auth/login`)', async () => {
          await qrCodeScanned()
          expect(actions['auth/login']).toHaveBeenCalledWith(
            expect.any(Object),
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb24iOnsiaWQiOiJja2h2OWJhNWMxNTNtMGE1Nm5jNmZxa2F5In0sImlhdCI6MTYwNjQ0MjA1Nn0.bVD8027mOtPucRexuto_FN6Wh4kItj4bWkE3M4TT6kA'
          )
        })
      })
    })
  })
})
