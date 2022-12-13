const JadwalModel = require("../../../model/mata_pelajaran/jadwal_siswa/JadwalModel");
var addTime = require("../../../helper/GetTimeDiff");
// ============ readAll jadwal per tingkat by  NIS =======
exports.readAllJadwalPerNIS = (req, res, next) => {
    JadwalModel.readAllJadwalPerNIS(req.params.id, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: `not_found`
                });
            }
            return res.status(500).send({
                message: err
            })
        }

        // set array uniq by date data = [{date:1,jadwal:[{matpel:2,id:2}]}]
        var data = [];
        for (let i = 0; i <= 6; i++) {
            for (let j = 0; j < result.length; j++) {
                if (i == result[j]['date']) {

                    data.push(
                        {
                            date: result[j]['date'],
                            jadwal: []
                        });
                }
            }
        }
        var unique = [...new Map(data.map(item => [item['date'], item])).values()];
        for (let i = 0; i < unique.length; i++) {
            for (let j = 0; j < result.length; j++) {
                if (unique[i]['date'] == result[j]['date']) {
                    unique[i]['jadwal'].push({
                        mata_pelajaran: result[j]['nama_pelajaran'],
                        sks: result[j]['sks'],
                        time: result[j]['time'],
                        end_time: addTime.addTime(result[j]['time'], (parseFloat(result[j]['sks']) * 45)),
                        tingkat: result[j]['tingkat'],
                        nama_kelas: result[j]['nama_kelas'],
                        guru_pengampu: result[j]['guru_pengampu']
                    });
                }
            }

        }
        return res.status(200).send({
            message: unique
        });
    });
}
// ============ read jadwal per tingkat di hari ini 
exports.readJadwalOnthisDay = (req, res, next) => {
    JadwalModel.readJadwallOnThisDay(req.params.id, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: `not_found`
                });
            }
            return res.status(500).send({
                message: err
            })
        }
        // input data sql to format json
        var data = [];
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result.length; j++) {
                data.push(
                    {
                        date: result[j]['date'],
                        mata_pelajaran: result[j]['nama_pelajaran'],
                        sks: result[j]['sks'],
                        time: result[j]['time'],
                        end_time: addTime.addTime(result[j]['time'], (parseFloat(result[j]['sks']) * 45)),
                        tingkat: result[j]['tingkat'],
                        nama_kelas: result[j]['nama_kelas'],
                        guru_pengampu: result[j]['guru_pengampu']
                    });
            }
        }
        return res.status(200).send({
            message: data
        });
    });
}