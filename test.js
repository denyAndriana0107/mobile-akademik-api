var getTimeStamp = require("./app/helper/GetTimeStamps");

var data_date = getTimeStamp.date();
var array_date = data_date.split("-");
var tahun_ajaran = "";
// if (array_date[1] > 5) {
//     tahun_ajaran = `${array_date[0]}/${parseInt(array_date[0]) + 1}`;
// } else {
//     tahun_ajaran = `${parseInt(array_date[0]) - 1}/${array_date[0]}`;
// }
console.log(array_date);