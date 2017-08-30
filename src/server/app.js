import path from 'path'
import Koa from 'koa'
import morgan from 'koa-morgan'
import favicon from 'koa-favicon'
import serve from 'koa-static'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
import compress from 'koa-compress'
import bodyParser from 'koa-bodyparser'
import error from 'koa-error'
import Router from 'koa-router'
import mount from 'koa-mount'
import Training from 'server/models/Training'
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa'
import config from 'server/config'
import ssr from 'server/middlewares/ssr'
import redirect from 'server/middlewares/redirect'
import generateSitemap from 'server/generateSitemap'
import generatePdf from 'server/generatePdf'
import sendEmail from 'server/email/sendEmail'
import { schema, rootValue } from 'server/graphql'
import { trainingPdfRoute, trainingPrintRoute } from 'modules/routePaths'

const app = new Koa()
const router = new Router()

app.use(
  redirect([
    {
      match: /^\/trainings\/formation-javascript-es2017/,
      redirect: '/formations/javascript-es2017',
    },
    {
      match: /^\/trainings\/formation-nodejs/,
      redirect: '/formations/nodejs',
    },
    {
      match: /^\/trainings\/formation-react/,
      redirect: '/formations/react',
    },
    {
      match: /^\/trainings\/formation-rxjs/,
      redirect: '/formations/rxjs',
    },
    {
      match: /^\/trainings\/formation-graphql/,
      redirect: '/formations/graphql',
    },
    {
      match: /^\/trainings\/formation-jest/,
      redirect: '/formations/react',
    },
    {
      match: /^\/trainings\/formation-initiation-react/,
      redirect: '/formations/react',
    },
    {
      match: /^\/trainings$/,
      redirect: '/formations',
    },
    {
      match: /^\/story/,
      redirect: '/notre-histoire',
    },
    {
      match: /^\/trainers\/greg-berge/,
      redirect: '/formateurs/greg-berge',
    },
    {
      match: /^\/trainers\/adrien-joly/,
      redirect: '/formateurs/adrien-joly',
    },
    {
      match: /^\/trainers\/thomas-jeanneau/,
      redirect: '/formateurs/thomas-jeanneau',
    },
    {
      match: /^\/creer-app-mac-avec-script-shell/,
      redirect: '/articles/creer-app-mac-avec-script-shell',
    },
    {
      match: /^\/developpez-plus-vite-avec-prettier/,
      redirect: '/articles/developpez-plus-vite-avec-prettier',
    },
    {
      match: /^\/pourquoi-react-est-il-si-populaire/,
      redirect: '/articles/pourquoi-react-est-il-si-populaire',
    },
  ]),
)

router.get('/sitemap.xml', async ctx => {
  ctx.response.type = 'xml'
  ctx.response.body = await generateSitemap()
})

router.post('/api/contact', async ctx => {
  const {
    name,
    company,
    email,
    phone,
    message,
    subject = `${ctx.request.body.name} nous a contactés sur smooth-code.com`,
  } = ctx.request.body
  await sendEmail({
    from: email,
    to: 'contact@smooth-code.com',
    subject,
    textContent: `
${subject}

-----

Nom: ${name}

Société: ${company}

Email: ${email}

Téléphone: ${phone}

-----

${message}
`,
  })
  ctx.body = { error: false }
})

router.get(trainingPdfRoute(':slug'), async ctx => {
  const training = await Training.query()
    .where({ slug: ctx.params.slug })
    .first()

  if (!training) {
    const error = new Error('Training not found')
    error.status = 404
    throw error
  }

  ctx.type = 'pdf'
  ctx.attachment(`${training.slug}-smooth-code.pdf`)
  ctx.body = await generatePdf(
    `${config.get('server.externalUrl')}${trainingPrintRoute(training.slug)}`,
  )
})

const PUBLIC = path.join(__dirname, '../../public')

app.use(error())
app.use(bodyParser())
app.use(serve(PUBLIC, { immutable: true, maxage: 31536000000 }))
app.use(compress({ filter: contentType => /text/i.test(contentType) }))
app.use(conditional())
app.use(etag())

if (config.get('env') !== 'test') {
  app.use(morgan(config.get('server.logFormat')))
}

app.use(favicon(path.join(PUBLIC, 'favicon.ico')))
app.use(router.routes())
app.use(
  mount(
    '/graphql',
    graphqlKoa({
      schema,
      rootValue,
    }),
  ),
)
app.use(mount('/graphiql', graphiqlKoa({ endpointURL: '/graphql' })))
app.use(ssr())

export default app
