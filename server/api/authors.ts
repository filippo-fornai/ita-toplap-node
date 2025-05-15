// └─ server/api/data.get.ts
import data from '~/public/authors.json'

export default defineEventHandler((event) => {
    // This is already parsed JSON
    return data

})