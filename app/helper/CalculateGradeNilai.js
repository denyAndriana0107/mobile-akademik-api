const CalculateGrade = function (grade) {
    this.grade = grade.grade
}
CalculateGrade.result = (nilai) => {
    if (nilai <= 100 && nilai >= 0) {
        if (nilai >= 91) {
            return "A"
        } else if (nilai < 91 && nilai >= 86) {
            return "A-"
        } else if (nilai < 86 && nilai >= 81) {
            return "B+"
        } else if (nilai < 81 && nilai >= 76) {
            return "B"
        } else if (nilai < 76 && nilai >= 71) {
            return "B-"
        } else if (nilai < 71 && nilai >= 66) {
            return "C+"
        } else if (nilai < 66 && nilai >= 61) {
            return "C"
        } else if (nilai < 61 && nilai >= 50) {
            return "D"
        } else {
            return "E"
        }
    }
}
module.exports = CalculateGrade;