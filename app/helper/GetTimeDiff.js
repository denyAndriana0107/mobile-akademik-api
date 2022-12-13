const TimeDiff = function getTimeDiff(start, end) {
    this.start = start,
        this.end = end
}
TimeDiff.calculate = (start, end) => {
    const [startHour, startMins] = start.split(":");
    const [endHour, endMins] = end.split(":");

    const diffHour = endHour - startHour;
    const diffMins = endMins - startMins;

    const isSameHour = diffHour === 0;
    if (isSameHour) return endMins - startMins;

    const diffHourIntoMins = diffHour * 60;
    return diffHourIntoMins + diffMins;
}
TimeDiff.statusTerlambat = (time) => {
    if (time <= -30) {
        return 1;
    } else {
        return 0
    }
}
TimeDiff.addTime = (start, addTime) => {
    const [startHour, startMins] = start.split(":");

    const hours = (addTime / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);

    const addHour = parseFloat(startHour) + parseFloat(rhours);
    const rAddHour = Math.floor(addHour);
    const addMinutes = parseFloat(startMins) + parseFloat(rminutes);
    const rAddMinutes = Math.floor(addMinutes);

    if (rAddHour < 10) {
        if (rAddMinutes < 10) {
            return `0${rAddHour}:0${rAddMinutes}:00`
        }
        return `0${rAddHour}:${rAddMinutes}:00`
    } else {
        if (rAddMinutes < 10) {
            return `${rAddHour}:0${rAddMinutes}:00`
        }
        return `${rAddHour}:${rAddMinutes}:00`
    }

}
module.exports = TimeDiff;