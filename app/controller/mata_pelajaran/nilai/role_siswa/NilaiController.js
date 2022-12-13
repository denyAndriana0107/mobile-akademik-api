const NilaiModel = require("../../../../model/mata_pelajaran/nilai/role_siswa/NilaiModel");

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