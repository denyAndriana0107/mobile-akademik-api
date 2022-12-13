var Holidays = require('date-holidays');
const CekLibur = function () {

}
CekLibur.result = (date) => {
    var hd = new Holidays()
    hd.getCountries('ID');
    hd.getRegions('ID');
    hd.init('ID');
    hd = new Holidays('ID');
    return hd.isHoliday(new Date(date));
}
module.exports = CekLibur;