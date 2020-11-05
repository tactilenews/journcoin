import ArticlePreview from './ArticlePreview.vue'

export default {
  title: 'Components/ArticlePreview',
  component: ArticlePreview,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ArticlePreview },
  template: '<ArticlePreview :article="{ title, teaser }" />',
})

export const Default = Template.bind({})
Default.args = {
  title: 'This is an interesting title',
  teaser:
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
}
