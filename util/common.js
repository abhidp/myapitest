const moment = require('moment')
// export async function sleep(delay) {
//     var start = new Date().getTime();
//     while (new Date().getTime() < start + delay);
// }


const format = moment().format()
const subtract = moment().subtract(2, 'hours').format()
const hours = moment().hour(subtract)
const hour = moment().get('hour')

console.log(hour)