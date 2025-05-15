import { promises as fs } from 'node:fs'
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  // 1. grab category & id from the querystring
    if (!event.context.params) {
      event.node.res.statusCode = 400
      return { error: 'Missing category or id' }
    }
    const {name} = event.context.params
    try {
        // const markdown = await fs.readFile(filePath, 'utf-8')
        const json = await fs.readFile(process.cwd()+`/public/authors.json`, 'utf-8')

        // 4. set Markdown content-type so clients (or browsers) know what it is
        event.node.res.setHeader('Content-Type', 'application/json; charset=utf-8')

        // 5. return the raw string
        const parsedJSON = JSON.parse(json)
        return parsedJSON[name] || null

    } catch (err: any) {
        // file not found or read‐error
        event.node.res.statusCode = 404
        return { error: err.message }
    }
})
