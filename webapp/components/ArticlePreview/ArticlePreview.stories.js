import Vuex from 'vuex'
import ArticlePreview from './ArticlePreview.vue'

export default {
  title: 'Components/ArticlePreview',
  component: ArticlePreview,
  argTypes: {
    read: { action: 'read' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ArticlePreview },
  store: new Vuex.Store({
    getters: {
      'auth/budget': () => args.budget,
    },
  }),
  template: '<ArticlePreview @read="read" :article="article" />',
})

const article = {
  id: 'abcdef',
  slug: 'this-is-an-interesting-title',
  title: 'This is an interesting title',
  bought: false,
  teaser:
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
}

export const NoBudget = Template.bind({})
NoBudget.args = {
  budget: 0,
  article,
}

export const Buy = Template.bind({})
Buy.args = {
  budget: 1,
  article,
}

export const Read = Template.bind({})
Read.args = {
  budget: 1,
  article: {
    ...article,
    bought: true,
  },
}
