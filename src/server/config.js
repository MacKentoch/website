import path from 'path'
import convict from 'convict'

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test', 'browser.development'],
    default: 'development',
    env: 'NODE_ENV',
  },
  server: {
    port: {
      doc: 'The server port number',
      format: 'port',
      default: 8000,
      env: 'PORT',
    },
    logFormat: {
      doc: 'The morgan log format to use',
      format: ['dev', 'combined', 'common', 'short', 'tiny', ''],
      default: 'dev',
    },
  },
  sendgrid: {
    apiKey: {
      doc: 'SendDrid API key',
      format: String,
      default: '',
      env: 'SENDGRID_API_KEY',
    },
  },
})

const env = config.get('env')
config.loadFile(path.join(__dirname, `../../config/${env}.json`))
config.validate()

export default config
