// TimeStamp
const GetTimeStamp = function () {
}
GetTimeStamp.timestamp = () => {
    let date_ob = new Date();
    let usDate = date_ob.toLocaleString("ID", { timeZone: "Asia/Jakarta" });
    let date2 = usDate.replaceAll('.', ':');
    let date3 = date2.replaceAll('/', '-');
    var string = date3.split(' ');
    var time = string[1];
    var dates = string[0];
    var splitdates = dates.split('-');
    var year = splitdates[2];
    var month = splitdates[1];
    var day = splitdates[0];
    return result = year + "-" + month + "-" + day + " " + time;
}
GetTimeStamp.date = () => {
    let date_ob = new Date();
    let usDate = date_ob.toLocaleString("ID", { timeZone: "Asia/Jakarta" });
    let date2 = usDate.replaceAll('.', ':');
    let date3 = date2.replaceAll('/', '-');
    var string = date3.split(' ');
    var dates = string[0];
    var splitdates = dates.split('-');
    var year = splitdates[2];
    var month = splitdates[1];
    var day = splitdates[0];
    return result = year + "-" + month + "-" + day;
}
GetTimeStamp.time = () => {
    let date_ob = new Date();
    let usDate = date_ob.toLocaleString("ID", { timeZone: "Asia/Jakarta" });
    let date2 = usDate.replaceAll('.', ':');
    let date3 = date2.replaceAll('/', '-');
    var string = date3.split(' ');
    var time = string[1];
    return result = time;
}
GetTimeStamp.day = () => {
    let date_ob = new Date();
    let usDate = date_ob.toLocaleString("ID", { timeZone: "Asia/Jakarta" });
    let date2 = usDate.replaceAll('.', ':');
    let date3 = date2.replaceAll('/', '-');
    var string = date3.split(' ');
    var dates = string[0];
    var splitdates = dates.split('-');
    var year = splitdates[2];
    var month = splitdates[1];
    var day = splitdates[0];
    var result = year + "-" + month + "-" + day;
    var setDate = new Date(result);
    var day2 = setDate.getDay();
    return day2
}
module.exports = GetTimeStamp;