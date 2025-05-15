export default function filterObjectArrayTags(objectArray,tags){
    // console.log('filterObjectArrayTags',objectArray)
    return objectArray.filter((object) => {
        return tags.every((tag) => {
            return object.tags.includes(tag)
        })
    })
}