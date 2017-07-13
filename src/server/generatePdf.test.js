import { ReadStream } from 'fs'
import generatePdf from './generatePdf'

describe('generatePdf', () => {
  it('should generate a pdf', async () => {
    const pdf = await generatePdf({
      slug: 'formation-nodejs',
      updated_at: new Date(),
    })
    expect(pdf).toBeInstanceOf(ReadStream)
  })
})