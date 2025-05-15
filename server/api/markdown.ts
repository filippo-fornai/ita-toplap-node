import { promises as fs } from 'node:fs'
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  // 1. grab category & id from the querystring
  const { category, id } = getQuery(event)

  if (!category || !id) {
    event.node.res.statusCode = 400
    return { error: 'Missing category or id' }
  }

  try {
    // const markdown = await fs.readFile(filePath, 'utf-8')
    const markdown = await fs.readFile(process.cwd()+`/public/${category}/${id}.md`, 'utf-8')

    // 4. set Markdown content-type so clients (or browsers) know what it is
    event.node.res.setHeader('Content-Type', 'text/markdown; charset=utf-8')

    // 5. return the raw string
    return markdown
    // return process.cwd()+`/${category}/${id}.md`
  } catch (err: any) {
    // file not found or read‐error
    event.node.res.statusCode = 404
    return { error: err.message }
  }
})
