const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const bp = require('body-parser');
var path = require('path');


app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname + '/public', 'public')));
app.set('view engine', 'ejs');
// app.use(helmet());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use(express.json());


// ========================= Router ============================================
app.get("/", (req, res) => {
    res.render('views/home');
});
app.get("/api/scripts/:name", function (req, res) {
    var options = {
        root: path.join(__dirname, 'public/scripts'),
        dotfiles: 'allow',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }

    var fileName = req.params.name;
    res.sendFile(fileName, options);
})
require("./app/routes/error/ErrorRouter")(app);


// akademik
require("./app/routes/auth/AuthRouter")(app);
require("./app/routes/berita/BeritaRouter")(app);
require("./app/routes/mata_pelajaran/profil/ProfilRouter")(app);
require("./app/routes/mata_pelajaran/jadwal_siswa/JadwalRouter")(app);

// profil siswa
require("./app/routes/siswa/ProfilRouter")(app);
require("./app/routes/siswa/DomisiliRouter")(app);
require("./app/routes/siswa/UploadFotoProfilRouter")(app);

// jenis_kelamin
require("./app/routes/jenis_kelamin/JenisKelaminRouter")(app);
// akademik nilai
require("./app/routes/mata_pelajaran/nilai/role_siswa/NilaiRouter")(app);

// kelas
require("./app/routes/kelas/kelas_profil/KelasRouter")(app);
require("./app/routes/kelas/kelas_siswa/KelasRouter")(app);

// program_studi
require("./app/routes/progam_studi/ProgramStudiRouter")(app);

// keuangan
require("./app/routes/keuangan/job_schedule/TagihanSchedule")(app);
require("./app/routes/keuangan/TagihanRouter")(app);
require("./app/routes/keuangan/PembayaranRouter")(app);
require("./app/routes/keuangan/notification/NotificationRouter")(app);
require("./app/routes/keuangan/lunas/LunasRouter")(app);

// guru
require("./app/routes/guru/ProfilRouter")(app);
require("./app/routes/guru/UploadPhotoRouter")(app);
require("./app/routes/mata_pelajaran/nilai/role_guru/NilaiRouter")(app);
require("./app/routes/mata_pelajaran/guru_pengampu/PengampuRouter")(app);
require("./app/routes/mata_pelajaran/jadwal_guru/JadwalRouter")(app);

// presensi
require("./app/routes/presensi/siswa/JobScheduleCreatePresensi")(app);
require("./app/routes/presensi/siswa/PresensiRouter")(app);

// orangtua profil
require("./app/routes/orang_tua/OrangTuaRouter")(app);

// perpsutakaan
require("./app/routes/perpustakaan/ListBukuRouter")(app);
require("./app/routes/perpustakaan/PeminjamanBukuRouter")(app);
require("./app/routes/perpustakaan/JobScheduleExpiredPeminjaman")(app);


// sekolah
require("./app/routes/sekolah/profil/ProfilRouter")(app);

// notifikasi
require("./app/routes/notification/NotificationRouter")(app);

app.listen(PORT, () => console.log("Server Running on PORT " + PORT));