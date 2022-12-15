const NilaiModel = require("../../../../model/mata_pelajaran/nilai/role_siswa/NilaiModel");
const RankingModel = require("../../../../model/mata_pelajaran/nilai/role_siswa/RankingModel");
const KelasSiswaModel = require("../../../../model/kelas/daftar_siswa/KelasModel");
exports.readNilai = (req, res, next) => {
    var user = req.user.username;
    var b = user.split('_');
    user = b[b.length - 1];
    const data = new NilaiModel({
        id_siswa: user,
        tingkat: req.body.tingkat,
        semester: req.body.semester
    });
    NilaiModel.getMataPelajaranByTingkat(data, (err, result1) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: 'not_found'
                });
            }
            return res.status(500).send({
                message: err
            });
        } else {
            NilaiModel.readNilaiByTingkatBySemester(data, (err, result) => {
                if (err) {
                    if (err.kind === "data_not_found") {
                        return res.status(404).send({
                            message: 'not_found'
                        });
                    }
                    return res.status(500).send({
                        message: err
                    });
                } else {
                    var array_data = [];
                    for (let index = 0; index < result1.length; index++) {
                        array_data.push(
                            {
                                nama_pelajaran: result1[index]['nama_pelajaran'],
                                data_nilai: [],
                                final_nilai: []
                            }
                        );
                    }

                    for (let index = 0; index < result1.length; index++) {
                        for (let j = 0; j < result.length; j++) {
                            if (array_data[index]['nama_pelajaran'] == result[j]['nama_pelajaran']) {
                                array_data[index]['data_nilai'].push(
                                    {
                                        jenis_nilai: result[j]['jenis_nilai'],
                                        nilai: result[j]['nilai']
                                    }
                                );
                            }

                        }

                    }
                    NilaiModel.getNilaiFinalMataPelajaranBySemester(data, (err, result3) => {
                        if (err) {
                            if (err.kind === "data_not_found") {
                                return res.status(404).send({
                                    message: 'not_found'
                                });
                            }
                            return res.status(500).send({
                                message: err
                            });
                        } else {
                            for (let index = 0; index < result1.length; index++) {
                                for (let j = 0; j < result3.length; j++) {
                                    if (array_data[index]['nama_pelajaran'] == result[j]['nama_pelajaran']) {
                                        array_data[index]['final_nilai'].push(
                                            {
                                                nilai_akhir: result3[j]['final_nilai'],
                                                grade: result3[j]['grade']
                                            }
                                        );
                                    }
                                }

                            }
                            return res.status(200).send({
                                message: array_data
                            });
                        }
                    });
                }
            });
        }
    });

}
exports.transkripNilai = (req, res, next) => {
    var user = req.user.username;
    var b = user.split('_');
    user = b[b.length - 1];
    const data = new NilaiModel({
        id_siswa: user
    });
    NilaiModel.getMataPelajaranAllPerSiswa(data, (err, result1) => {
        if (err) {
            return res.status(500).send({
                message: err
            });
        } else {
            NilaiModel.getTranskripNilaiPerSiswa(data, (err, result2) => {
                if (err) {
                    return res.status(500).send({
                        message: err
                    });
                } else {
                    // set format data
                    var array_data = [];
                    for (let i = 0; i < result1.length; i++) {
                        array_data.push(
                            {
                                nama_pelajaran: result1[i]['nama_pelajaran'],
                                tingkat: result1[i]['tingkat'],
                                data_nilai: []
                            }
                        );
                    }
                    for (let index = 0; index < result1.length; index++) {
                        for (let j = 0; j < 2; j++) {
                            array_data[index]['data_nilai'].push(
                                {
                                    semester: j,
                                    nilai: []
                                }
                            );
                        }
                    }
                    for (let i = 0; i < result1.length; i++) {
                        for (let j = 0; j < result2.length; j++) {
                            if (array_data[i]['nama_pelajaran'] == result2[j]['nama_pelajaran']) {
                                for (let k = 0; k < 2; k++) {
                                    if (array_data[i]['data_nilai'][k]['semester'] == result2[j]['semester']) {
                                        array_data[i]['data_nilai'][k]['nilai'].push(
                                            {
                                                nilai_akhir: result2[j]['final_nilai'],
                                                grade: result2[j]['grade']
                                            }
                                        );
                                    }
                                }
                            }
                        }

                    }
                    return res.status(200).send({
                        message: array_data
                    });
                }
            });
        }
    });

    //     if (err) {
    //         if (err.kind === "data_not_found") {
    //             return res.status(404).send({
    //                 message: 'not_found'
    //             });
    //         }
    //         return res.status(500).send({
    //             message: err
    //         });
    //     } else {
    //         return res.status(200).send({
    //             message: result
    //         });
    //     }
    // });
}
exports.rankingSiswaPerKelasPerSemester = (req, res, next) => {
    var user = req.user.username;
    var b = user.split('_');
    user = b[b.length - 1];
    KelasSiswaModel.read_data_kelas_persiswa(user, (err, result) => {
        if (err) {
            return res.status(500).send({
                message: err + 1
            });
        } else {
            const data_siswa = new NilaiModel({
                id_siswa: user,
                tingkat: result[0]['tingkat'],
            });
            NilaiModel.getMataPelajaranByTingkat(data_siswa, (err, result1) => {
                if (err) {
                    return res.status(500).send({
                        message: err + 2
                    });
                } else {
                    const data_ranking = new RankingModel({
                        id_siswa: user,
                        id_kelas: result[0]['id'],
                        semester: req.body.semester,
                        jumlah_matkul: result1.length
                    });
                    RankingModel.rankingSiswaPerKelas(data_ranking, (err, result2) => {
                        if (err) {
                            return res.status(500).send({
                                message: err + 3
                            });
                        } else {
                            return res.status(200).send({
                                message: result2
                            });
                        }
                    });
                }
            });

        }
    });
}
exports.listRankingSiswaPerKelasPerSemester = (req, res, next) => {
    var user = req.user.username;
    var b = user.split('_');
    user = b[b.length - 1];
    KelasSiswaModel.read_data_kelas_persiswa(user, (err, result) => {
        if (err) {
            return res.status(500).send({
                message: err
            });
        } else {
            const data_siswa = new NilaiModel({
                id_siswa: user,
                tingkat: result[0]['tingkat'],
            });
            NilaiModel.getMataPelajaranByTingkat(data_siswa, (err, result1) => {
                if (err) {
                    return res.status(500).send({
                        message: err
                    });
                } else {
                    const data_ranking = new RankingModel({
                        id_siswa: user,
                        id_kelas: result[0]['id'],
                        semester: req.body.semester,
                        jumlah_matkul: result1.length
                    });
                    RankingModel.listRankingSiswaPerKelas(data_ranking, (err, result2) => {
                        if (err) {
                            return res.status(500).send({
                                message: err + 2
                            });
                        } else {
                            return res.status(200).send({
                                message: result2
                            });
                        }
                    })
                }
            });

        }
    });
}