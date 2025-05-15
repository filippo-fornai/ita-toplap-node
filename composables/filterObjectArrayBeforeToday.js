export default function filterObjectArrayBeforeToday(objectArray){
    // console.log('filterObjectArrayBeforeToday',objectArray)

    let today = new Date()
    let hours = today.getHours() * 60 * 60 * 1000
    let minutes = today.getMinutes() * 60 * 1000
    let seconds = today.getSeconds() * 1000
    today = today - (hours + minutes + seconds)

    return objectArray.filter((object) =>
        (today > (new Date(object.date))) ? false : true ) 
}