const database = require("../../../../config/db");
const RankingModel = function (data) {
    this.id_siswa = data.id_siswa,
        this.id_kelas = data.id_kelas,
        this.semester = data.semester,
        this.jumlah_matkul = data.jumlah_matkul,
        this.id_program_studi = data.id_program_studi,
        this.tahun_ajaran = data.tahun_ajaran
}
//========================== set list ranking siswa per kelas per semester ===================
RankingModel.rankingSiswaPerKelas = (data, result) => {
    database.query(
        `SELECT report_nilai_final.id_siswa, SUM(report_nilai_final.final_nilai)/${data.jumlah_matkul} AS avg_nilai,
        RANK() OVER(ORDER BY SUM(report_nilai_final.final_nilai)/2 DESC) AS 'rank'
        FROM report_nilai_final
        WHERE report_nilai_final.id_kelas = '${data.id_kelas}'
        AND report_nilai_final.semester = ${data.semester}
        GROUP BY report_nilai_final.id_siswa`,
        (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (!res?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                var array_data = res;
                var rank_result = null;
                for (let i = 0; i < array_data.length; i++) {
                    if (array_data[i]['id_siswa'] == data.id_siswa) {
                        rank_result = array_data[i];
                        break;
                    }
                }
                result(null, rank_result);
                return;
            }
        }
    );
}
RankingModel.listRankingSiswaPerKelas = (data, result) => {
    database.query(
        `SELECT report_nilai_final.id_siswa, SUM(report_nilai_final.final_nilai)/${data.jumlah_matkul} AS avg_nilai,
        RANK() OVER(ORDER BY SUM(report_nilai_final.final_nilai)/2 DESC) AS 'rank'
        FROM report_nilai_final
        WHERE report_nilai_final.id_kelas = '${data.id_kelas}'
        AND report_nilai_final.semester = ${data.semester}
        GROUP BY report_nilai_final.id_siswa`,
        (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (!res?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                result(null, res);
                return;
            }
        }
    );
}

module.exports = RankingModel;