import { config } from '@vue/test-utils'
import clientOnlyStub from './clientOnlyStub.vue'

// Mock Nuxt client-side component
config.stubs['client-only'] = clientOnlyStub
