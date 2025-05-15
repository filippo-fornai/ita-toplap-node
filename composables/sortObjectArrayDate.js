export default function sortObjectArrayDate(objectArray, order) {
        // console.log('sortObjectArrayDate', objectArray, order)
        if (order === 'newest') {
            return objectArray.sort((a, b) => new Date(b.date) - new Date(a.date))
        } else if (order === 'oldest') {
            return objectArray.sort((a, b) => new Date(a.date) - new Date(b.date))
        }
    }