import ArticlePreview from './ArticlePreview.vue'

export default {
  title: 'Components/ArticlePreview',
  component: ArticlePreview,
  argTypes: {
    choose: { action: 'choose' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ArticlePreview },
  template: '<ArticlePreview @choose="choose" :article="article" />',
})

export const Default = Template.bind({})
Default.args = {
  article: {
    slug: 'this-is-an-interesting-title',
    title: 'This is an interesting title',
    teaser:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
  },
}
