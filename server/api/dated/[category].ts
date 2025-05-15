import { promises as fs } from 'node:fs'
import { defineEventHandler, getQuery } from 'h3'
import sortObjectArrayDate from '~/composables/sortObjectArrayDate';
import filterObjectArrayBeforeToday from '~/composables/filterObjectArrayBeforeToday';

export default defineEventHandler(async (event) => {
  // 1. grab category & id from the querystring
    if (!event.context.params) {
      event.node.res.statusCode = 400
      return { error: 'Missing category or id' }
    }


    const {category} = event.context.params
    try {
        // const markdown = await fs.readFile(filePath, 'utf-8')
        const json = await fs.readFile(process.cwd()+`/public/${category}.json`, 'utf-8')
        let parsedJson = JSON.parse(json);

        const query = getQuery(event);
        const start = query.start ? parseInt(query.start as string, 10) : undefined;
        const end = query.end ? parseInt(query.end as string, 10) : undefined;
        const order = query.order as string | undefined;
        const beforeToday = query.beforeToday === 'true';

        if (beforeToday) {
          parsedJson = filterObjectArrayBeforeToday(parsedJson);
        }

        if (order) {
          parsedJson = sortObjectArrayDate(parsedJson, order);
        }

        if (start !== undefined && end !== undefined) {
          parsedJson = parsedJson.slice(start, end);
        } else if (start !== undefined) {
          parsedJson = parsedJson.slice(start);
        } else if (end !== undefined) {
          parsedJson = parsedJson.slice(0, end);
        }

        // 4. set Markdown content-type so clients (or browsers) know what it is
        event.node.res.setHeader('Content-Type', 'application/json; charset=utf-8')

        // 5. return the raw string
        event.node.res.statusCode = 200
        return parsedJson

    } catch (err: any) {
        // file not found or read‐error
        event.node.res.statusCode = 404
        return { error: err.message }
    }
})
