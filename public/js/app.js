// ================================================================
// CHART.JS LOADER
// ================================================================
function loadChartJS() {
    return new Promise((resolve, reject) => {
        if (typeof Chart !== "undefined") {
            resolve();
            return;
        }
        const urls = [
            "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.4/chart.umd.min.js",
            "https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js",
            "https://unpkg.com/chart.js@4.4.4/dist/chart.umd.min.js",
        ];
        let idx = 0;

        function tryLoad() {
            if (idx >= urls.length) {
                reject(new Error("Semua CDN Chart.js gagal dimuat"));
                return;
            }
            const script = document.createElement("script");
            script.src = urls[idx];
            script.async = true;
            script.onload = () => {
                if (typeof Chart !== "undefined") resolve();
                else {
                    idx++;
                    tryLoad();
                }
            };
            script.onerror = () => {
                idx++;
                tryLoad();
            };
            document.head.appendChild(script);
        }
        tryLoad();
    });
}
window.chartReady = loadChartJS();

// ================================================================
// XLSX (SheetJS) LOADER  ← BARU
// ================================================================
function loadXLSX() {
    return new Promise((resolve, reject) => {
        if (typeof XLSX !== "undefined") {
            resolve();
            return;
        }
        const urls = [
            "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
            "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",
            "https://unpkg.com/xlsx@0.18.5/dist/xlsx.full.min.js",
        ];
        let idx = 0;

        function tryLoad() {
            if (idx >= urls.length) {
                reject(new Error("Semua CDN XLSX gagal dimuat"));
                return;
            }
            const script = document.createElement("script");
            script.src = urls[idx];
            script.async = true;
            script.onload = () => {
                if (typeof XLSX !== "undefined") resolve();
                else {
                    idx++;
                    tryLoad();
                }
            };
            script.onerror = () => {
                idx++;
                tryLoad();
            };
            document.head.appendChild(script);
        }
        tryLoad();
    });
}
window.xlsxReady = loadXLSX();

// ================================================================
// KONFIGURASI
// ================================================================
const BULAN_ID = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];
const HARI_ID = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const CANONICAL_FIELDS = [
    "NOAGENDA", "NOREGISTRASI", "TGLMOHON", "IDPEL", "NAMA", "ALAMAT",
    "NOTELPPEMOHON", "NOTELPHPPEMOHON", "ASALMOHON", "UPIENTRI",
    "PETUGASCATAT", "TARIFLAMA", "DAYALAMA", "TARIF", "DAYA",
    "JENISTRANSAKSI", "PAKETSAR", "TOTALBIAYA", "TGLBAYAR",
    "DURASIHARIKERJA", "DURASIHARIKALENDER", "KRITERIATMP",
    "ALASANKRITERIATMP", "KETERANGANALASANKRITERIATMP",
    "ESTIMASIDURASIHARILAYANAN", "STATUSPENANGGUHAN",
    "ALASANPENANGGUHAN", "KETERANGANALASANPENANGGUHAN", "TGLPENANGGUHAN",
    "TGLSIAPSAMBUNG", "STATUSRESTITUSIATAUTITIPAN", "TGLRESTITUSI",
    "TGLBPTITIPAN", "STATUSPERMOHONAN", "TGLUPDATEPERMOHONAN", "TGLPK",
    "TGLNYALA", "TGLPEREMAJAAN", "NAMAUPI", "NAMAAP", "NAMAUP",
    "UNITTUJUAN", "PAKETSLO", "PLTSATAP", "PROGRES_CATATAN",
];

const STATUS_ORDER = [
    "Bayar", "Cetak PK", "PDL Awal", "Peremajaan", "Disetujui",
    "Mohon", "Batal", "Restitusi", "Selesai", "Lainnya",
];
const STATUS_DEFAULT_OFF = new Set(["Batal"]);

const STATUS_BADGE_CLASS = {
    Bayar: "badge-bayar",
    "Cetak PK": "badge-cetakpk",
    "PDL Awal": "badge-pdlawal",
    Peremajaan: "badge-peremajaan",
    Disetujui: "badge-disetujui",
    Mohon: "badge-mohon",
    Batal: "badge-batal",
    Restitusi: "badge-restitusi",
    Selesai: "badge-selesai",
    Lainnya: "badge-lainnya",
};

const STATUS_CHART_COLORS = {
    Bayar: "#10b981",
    "Cetak PK": "#3b82f6",
    "PDL Awal": "#6366f1",
    Peremajaan: "#14b8a6",
    Disetujui: "#22c55e",
    Mohon: "#0ea5e9",
    Batal: "#ef4444",
    Restitusi: "#eab308",
    Selesai: "#16a34a",
    Lainnya: "#94a3b8",
};

const HEADER_ALIASES = {
    NOAGENDA: "NOAGENDA", AGENDA: "NOAGENDA", NOMORAGENDA: "NOAGENDA",
    NOREGISTRASI: "NOREGISTRASI", NOMORREGISTRASI: "NOREGISTRASI",
    REGISTRASI: "NOREGISTRASI",
    TGLMOHON: "TGLMOHON", TANGGALMOHON: "TGLMOHON",
    TGLPERMOHONAN: "TGLMOHON", TANGGALPERMOHONAN: "TGLMOHON",
    IDPEL: "IDPEL", IDPELANGGAN: "IDPEL",
    NAMA: "NAMA", NAMAPELANGGAN: "NAMA", NAMAPEMOHON: "NAMA",
    ALAMAT: "ALAMAT", ALAMATPELANGGAN: "ALAMAT",
    NOTELPPEMOHON: "NOTELPPEMOHON", NOTELP: "NOTELPPEMOHON",
    NOTELEPON: "NOTELPPEMOHON", TELEPON: "NOTELPPEMOHON",
    NOTELPHPPEMOHON: "NOTELPHPPEMOHON", NOHP: "NOTELPHPPEMOHON",
    NOHANDPHONE: "NOTELPHPPEMOHON",
    ASALMOHON: "ASALMOHON", UPIENTRI: "UPIENTRI",
    PETUGASCATAT: "PETUGASCATAT",
    TARIFLAMA: "TARIFLAMA", DAYALAMA: "DAYALAMA",
    TARIF: "TARIF", TARIFBARU: "TARIF",
    DAYA: "DAYA", DAYABARU: "DAYA",
    JENISTRANSAKSI: "JENISTRANSAKSI", JENISPERMOHONAN: "JENISTRANSAKSI",
    PAKETSAR: "PAKETSAR",
    TOTALBIAYA: "TOTALBIAYA", BIAYA: "TOTALBIAYA",
    TGLBAYAR: "TGLBAYAR", TANGGALBAYAR: "TGLBAYAR",
    DURASIHARIKERJA: "DURASIHARIKERJA",
    DURASIHARIKALENDER: "DURASIHARIKALENDER",
    KRITERIATMP: "KRITERIATMP",
    ALASANKRITERIATMP: "ALASANKRITERIATMP",
    KETERANGANALASANKRITERIATMP: "KETERANGANALASANKRITERIATMP",
    ESTIMASIDURASIHARILAYANAN: "ESTIMASIDURASIHARILAYANAN",
    STATUSPENANGGUHAN: "STATUSPENANGGUHAN",
    ALASANPENANGGUHAN: "ALASANPENANGGUHAN",
    KETERANGANALASANPENANGGUHAN: "KETERANGANALASANPENANGGUHAN",
    TGLPENANGGUHAN: "TGLPENANGGUHAN",
    TGLSIAPSAMBUNG: "TGLSIAPSAMBUNG",
    STATUSRESTITUSIATAUTITIPAN: "STATUSRESTITUSIATAUTITIPAN",
    TGLRESTITUSI: "TGLRESTITUSI",
    TGLBPTITIPAN: "TGLBPTITIPAN",
    STATUSPERMOHONAN: "STATUSPERMOHONAN", STATUS: "STATUSPERMOHONAN",
    TGLUPDATEPERMOHONAN: "TGLUPDATEPERMOHONAN",
    TGLUPDATE: "TGLUPDATEPERMOHONAN",
    UPDATETERAKHIR: "TGLUPDATEPERMOHONAN",
    TGLPK: "TGLPK", TANGGALPK: "TGLPK",
    TGLNYALA: "TGLNYALA", TANGGALNYALA: "TGLNYALA",
    TGLPEREMAJAAN: "TGLPEREMAJAAN",
    NAMAUPI: "NAMAUPI", UPI: "NAMAUPI",
    NAMAAP: "NAMAAP", AP: "NAMAAP",
    NAMAUP: "NAMAUP", UP: "NAMAUP",
    UNITTUJUAN: "UNITTUJUAN",
    PAKETSLO: "PAKETSLO",
    PLTSATAP: "PLTSATAP",
};

const DAYA_1PAS = [450, 900, 1300, 2200, 3500, 4400, 5500, 7700, 11000];
const DAYA_3PAS = [
    6600, 10600, 13200, 16500, 23000, 33000, 41500, 53000, 66000, 82500,
    105000, 131000, 147000, 164000, 197000, 210000, 240000, 345000, 555000,
    690000, 865000, 1110000, 1385000, 1730000, 2180000, 2770000, 3465000,
    4330000, 5540000, 6930000, 8660000,
];

// ================================================================
// STATE
// ================================================================
let allRecords = [];
let lastImportInfo = null;
let dashDateFrom = "";
let dashDateTo = "";

// ================================================================
// HELPERS
// ================================================================
function escapeHtml(str) {
    if (str == null) return "";
    return String(str).replace(
        /[&<>"']/g,
        (m) =>
            ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m],
    );
}

function toDate(v) {
    if (!v) return null;
    if (v instanceof Date) return isNaN(v) ? null : v;
    const d = new Date(v);
    return isNaN(d) ? null : d;
}

function fmtDate(v) {
    const d = toDate(v);
    if (!d) return "-";
    return (
        String(d.getDate()).padStart(2, "0") + "/" +
        String(d.getMonth() + 1).padStart(2, "0") + "/" +
        d.getFullYear()
    );
}

function fmtDateTime(v) {
    const d = toDate(v);
    if (!d) return "-";
    return (
        fmtDate(d) + " " +
        String(d.getHours()).padStart(2, "0") + ":" +
        String(d.getMinutes()).padStart(2, "0")
    );
}

function fmtDaya(v) {
    if (v == null || v === "") return "-";
    const n = Number(v);
    if (isNaN(n)) return escapeHtml(v);
    return n.toLocaleString("id-ID") + " VA";
}

function fmtNum(v) {
    if (v == null || v === "") return "-";
    const n = Number(v);
    return isNaN(n) ? escapeHtml(v) : n.toLocaleString("id-ID");
}

function getFasaLabel(daya) {
    const n = Number(daya);
    if (daya == null || isNaN(n)) return "-";
    if (DAYA_1PAS.includes(n)) return "1 Fasa";
    if (DAYA_3PAS.includes(n)) return "3 Fasa";
    return n <= 5500 ? "1 Fasa" : "3 Fasa";
}

function todayIndo() {
    const d = new Date();
    return (
        HARI_ID[d.getDay()] + ", " + d.getDate() + " " +
        BULAN_ID[d.getMonth()] + " " + d.getFullYear()
    );
}

function todayIndoFilename() {
    const d = new Date();
    return d.getDate() + " " + BULAN_ID[d.getMonth()] + " " + d.getFullYear();
}

function getStatusCategories(r) {
    const cats = [];
    const sp = (r.STATUSPERMOHONAN || "").toString().trim().toUpperCase();
    if (sp === "BAYAR") cats.push("Bayar");
    if (sp === "CETAK PK") cats.push("Cetak PK");
    if (sp === "PDL AWAL") cats.push("PDL Awal");
    if (sp === "PEREMAJAAN") cats.push("Peremajaan");
    if (sp === "DISETUJUI") cats.push("Disetujui");
    if (sp === "MOHON") cats.push("Mohon");
    if (sp === "BATAL") cats.push("Batal");
    if (sp === "RESTITUSI") cats.push("Restitusi");
    if (r.TGLNYALA) cats.push("Selesai");
    const known = [
        "BAYAR", "CETAK PK", "PDL AWAL", "PEREMAJAAN",
        "DISETUJUI", "MOHON", "BATAL", "RESTITUSI",
    ];
    if (sp && !known.includes(sp)) cats.push("Lainnya");
    if (cats.length === 0) cats.push("Lainnya");
    return cats;
}

// ✅ PERBAIKAN: prioritaskan _DB_ID agar tidak collision
function recordUid(r) {
    if (r._DB_ID) return "DB:" + r._DB_ID;
    if (r.NOAGENDA && String(r.NOAGENDA).trim()) {
        return "NA:" + String(r.NOAGENDA).trim();
    }
    if (r.NOREGISTRASI && String(r.NOREGISTRASI).trim()) {
        return "NR:" + String(r.NOREGISTRASI).trim();
    }
    const idpel = r.IDPEL ? String(r.IDPEL).trim() : "";
    const tgl = r.TGLMOHON ? String(r.TGLMOHON).trim() : "";
    const jenis = r.JENISTRANSAKSI ? String(r.JENISTRANSAKSI).trim() : "";
    const nama = r.NAMA ? String(r.NAMA).trim() : "";
    return `X:${idpel}|${tgl}|${jenis}|${nama}`;
}

function getJenisKey(r) {
    return (r.JENISTRANSAKSI || "").toString().trim().toUpperCase();
}

function isJenis(jenis, r) {
    return getJenisKey(r) === jenis;
}

function getFilteredRecords() {
    let records = allRecords;
    if (dashDateFrom) {
        const from = new Date(dashDateFrom);
        from.setHours(0, 0, 0, 0);
        records = records.filter((r) => {
            const tgl = toDate(r.TGLMOHON);
            return tgl && tgl >= from;
        });
    }
    if (dashDateTo) {
        const to = new Date(dashDateTo);
        to.setHours(23, 59, 59, 999);
        records = records.filter((r) => {
            const tgl = toDate(r.TGLMOHON);
            return tgl && tgl <= to;
        });
    }
    return records;
}

function countByJenisFiltered(jenis) {
    return getFilteredRecords().filter((r) => isJenis(jenis, r)).length;
}

function getStatusCountsFiltered(records) {
    const recs = records || getFilteredRecords();
    const counts = {};
    STATUS_ORDER.forEach((s) => (counts[s] = 0));
    recs.forEach((r) => {
        const cats = getStatusCategories(r);
        cats.forEach((c) => {
            if (counts[c] !== undefined) counts[c]++;
            else counts["Lainnya"] = (counts["Lainnya"] || 0) + 1;
        });
        if (cats.length === 0) counts["Lainnya"] = (counts["Lainnya"] || 0) + 1;
    });
    return counts;
}

function getAverageDurasiFiltered(records) {
    const recs = records || getFilteredRecords();
    const valid = recs.filter(
        (r) =>
            r.DURASIHARIKERJA != null &&
            r.DURASIHARIKERJA !== "" &&
            !isNaN(Number(r.DURASIHARIKERJA)),
    );
    if (valid.length === 0) return 0;
    const sum = valid.reduce((a, r) => a + Number(r.DURASIHARIKERJA), 0);
    return sum / valid.length;
}

function getPembayaranStatusFiltered(records) {
    const recs = records || getFilteredRecords();
    let sudah = 0, belum = 0;
    recs.forEach((r) => {
        if (r.TGLBAYAR) sudah++;
        else belum++;
    });
    return { sudah, belum };
}

function getSummaryDataFiltered() {
    const recs = getFilteredRecords();
    const totalSelesai = recs.filter((r) => r.TGLNYALA).length;
    const totalBelum = recs.length - totalSelesai;
    const avgDurasi = getAverageDurasiFiltered(recs);

    let totalDurasi = 0, totalCount = 0;
    const bulanMap = {};
    recs.forEach((r) => {
        const tgl = toDate(r.TGLMOHON);
        if (!tgl) return;
        const key = tgl.getFullYear() + "-" + String(tgl.getMonth() + 1).padStart(2, "0");
        if (!bulanMap[key]) bulanMap[key] = [];
        if (
            r.DURASIHARIKERJA != null &&
            r.DURASIHARIKERJA !== "" &&
            !isNaN(Number(r.DURASIHARIKERJA))
        ) {
            bulanMap[key].push(Number(r.DURASIHARIKERJA));
        }
    });
    Object.values(bulanMap).forEach((duras) => {
        duras.forEach((d) => {
            totalDurasi += d;
            totalCount++;
        });
    });
    return {
        totalSelesai,
        totalBelum,
        avgDurasi,
        avgPerBulan: totalCount > 0 ? totalDurasi / totalCount : 0,
    };
}

// ================================================================
// NORMALISASI RECORD DARI SERVER (SATU-SATUNYA SUMBER KEBENARAN)
// ================================================================
function normalizeServerRecord(row) {
    return {
        DB_ID: row.id,

        NOAGENDA: row.no_agenda ?? "",
        NOREGISTRASI: row.no_registrasi ?? "",
        TGLMOHON: row.tgl_mohon ?? "",

        IDPEL: row.idpel ?? "",
        NAMA: row.nama ?? "",
        ALAMAT: row.alamat ?? "",

        NOTELPPEMOHON: row.notelp_pemohon ?? "",
        NOTELPHPPEMOHON: row.notelp_hp_pemohon ?? "",

        ASALMOHON: row.asalmohon ?? "",
        UPIENTRI: row.upientri ?? "",
        PETUGASCATAT: row.petugascatat ?? "",

        TARIFLAMA: row.tarif_lama ?? "",
        DAYALAMA: row.daya_lama ?? "",

        TARIF: row.tarif ?? "",
        DAYA: row.daya ?? "",

        JENISTRANSAKSI: row.jenis_transaksi ?? "",

        PAKETSAR: row.paket_sar ?? "",
        TOTALBIAYA: row.totalbiaya ?? "",

        TGLBAYAR: row.tglbayar ?? "",

        DURASIHARIKERJA: row.durasi_hari_kerja ?? "",
        DURASIHARIKALENDER: row.durasi_hari_kalender ?? "",

        KRITERIATMP: row.kriteria_tmp ?? "",
        ALASANKRITERIATMP: row.alasan_kriteria_tmp ?? "",
        KETERANGANALASANKRITERIATMP: row.keterangan_alasan_kriteria_tmp ?? "",

        ESTIMASIDURASIHARILAYANAN: row.estimasi_durasi_hari_layanan ?? "",

        STATUSPENANGGUHAN: row.status_penangguhan ?? "",
        ALASANPENANGGUHAN: row.alasan_penangguhan ?? "",
        KETERANGANALASANPENANGGUHAN: row.keterangan_alasan_penangguhan ?? "",

        TGLPENANGGUHAN: row.tglpenangguhan ?? "",
        TGLSIAPSAMBUNG: row.tglsiapsambung ?? "",

        STATUSRESTITUSIATAUTITIPAN: row.status_restitusi_atau_titipan ?? "",
        TGLRESTITUSI: row.tglrestitusi ?? "",
        TGLBPTITIPAN: row.tglbptitipan ?? "",

        STATUSPERMOHONAN: row.status_permohonan ?? "",
        TGLUPDATEPERMOHONAN: row.tgl_update_permohonan ?? "",

        TGLPK: row.tglpk ?? "",
        TGLNYALA: row.tglnyala ?? "",
        TGLPEREMAJAAN: row.tglperemajaan ?? "",

        NAMAUPI: row.namaupi ?? "",
        NAMAAP: row.namaap ?? "",
        NAMAUP: row.namaup ?? "",
        UNITTUJUAN: row.unittujuan ?? "",

        PAKETSLO: row.paketslo ?? "",
        PLTSATAP: row.plts_atap ?? "",

        PROGRES_CATATAN: row.progres ?? "",

        _DB_ID: row.id,
    };
}

// ================================================================
// PERSISTENCE - DATABASE SERVER
// ================================================================
const SERVER_DATA_URL = "/api/daftar-tunggu";

// ✅ PERBAIKAN: gunakan normalizeServerRecord, jangan duplikasi mapping
async function loadServerData() {
    try {
        const response = await fetch(SERVER_DATA_URL, {
            method: "GET",
            headers: { Accept: "application/json" },
            credentials: "same-origin",
        });

        if (!response.ok) {
            throw new Error("Gagal mengambil data dari database.");
        }

        const data = await response.json();
        console.log("Data dari database:", data.length, "baris");

        // ✅ SATU-SATUNYA jalur normalisasi
        allRecords = Array.isArray(data) ? data.map(normalizeServerRecord) : [];

        console.log("records setelah normalisasi:", allRecords.length);
        if (allRecords[0]) {
            console.log("contoh NOAGENDA:", allRecords[0].NOAGENDA);
            console.log("contoh NAMA:", allRecords[0].NAMA);
            console.log("contoh STATUSPERMOHONAN:", allRecords[0].STATUSPERMOHONAN);
        }

        // ❌ JANGAN renderAll() di sini — biar pemanggil yang urus
    } catch (error) {
        console.error("Gagal load data:", error);
        alert("Data dari database gagal dimuat.");
        throw error;
    }
}

// ================================================================
// IMPORT EXCEL KE DATABASE
// ================================================================
async function uploadImportFileToServer(file) {
    if (!window.fetch) {
        throw new Error("Browser tidak mendukung fetch().");
    }

    const formData = new FormData();
    formData.append("file", file);

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
    const headers = { Accept: "application/json" };
    if (csrfToken) headers["X-CSRF-TOKEN"] = csrfToken;

    const response = await fetch("/import", {
        method: "POST",
        body: formData,
        headers,
        credentials: "same-origin",
    });

    const text = await response.text();

    if (!response.ok) {
        let message = "Import gagal.";
        try {
            const errorData = JSON.parse(text);
            if (errorData.message) message = errorData.message;
            if (errorData.errors) {
                message += "\n\n" + Object.values(errorData.errors).flat().join("\n");
            }
        } catch {
            if (text) message = text;
        }
        throw new Error(message);
    }

    try {
        return JSON.parse(text);
    } catch {
        return { success: true, message: "Import berhasil." };
    }
}

async function handleImportFiles(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    let successCount = 0;

    for (const file of files) {
        try {
            console.log("📤 Mengirim file ke server:", file.name);
            const result = await uploadImportFileToServer(file);

            if (result.success === false) {
                throw new Error(result.message || "Import gagal.");
            }

            successCount++;
            console.log("✅ Import berhasil:", file.name, result);
        } catch (error) {
            console.error("❌ Import gagal:", file.name, error);
            alert(`Import file "${file.name}" gagal.\n\n` + error.message);
            return;
        }
    }

    if (successCount > 0) {
        await loadServerData();
        // ✅ renderAll() hanya dipanggil sekali di sini
        renderAll();
        alert(`${successCount} file berhasil diimport ke database.`);
    }
}

// ================================================================
// TABLE CONTROLLER
// ================================================================
class TableController {
    constructor(opts) {
        this.jenis = opts.jenis;
        this.title = opts.title;
        this.swatchColor = opts.swatchColor;
        this.columns = opts.columns;
        this.hasFasaFilter = !!opts.hasFasaFilter;
        this.containerId = opts.containerId;
        this.search = "";
        this.statusFilter = new Set(
            STATUS_ORDER.filter((s) => !STATUS_DEFAULT_OFF.has(s)),
        );
        this.fasaFilter = "ALL";
        this.hideShortDurasi = false;
        this.dateFrom = "";
        this.dateTo = "";
        this.page = 1;
        this.pageSize = 10;
        this.sortDir = "desc";
        this.statusPanelOpen = false;
        this.datePopupOpen = false;

        // ✅ PERBAIKAN: listener document cukup 1x per instance,
        //    dan selalu cek container
        this._boundDocClick = (e) => {
            const container = document.getElementById(this.containerId);
            if (!container) return;

            // Tutup status dropdown kalau klik di luar
            if (this.statusPanelOpen) {
                const dd = container.querySelector('[data-role="statusdd"]');
                if (dd && !dd.contains(e.target)) {
                    this.statusPanelOpen = false;
                    const panel = container.querySelector('[data-role="statuspanel"]');
                    if (panel) panel.classList.remove("open");
                }
            }

            // Tutup date popup kalau klik di luar
            if (this.datePopupOpen) {
                const wrapper = container.querySelector('[data-role="dateWrapper"]');
                if (wrapper && !wrapper.contains(e.target)) {
                    this.datePopupOpen = false;
                    const popup = container.querySelector('[data-role="datePopup"]');
                    if (popup) popup.classList.remove("open");
                }
            }
        };
        document.addEventListener("click", this._boundDocClick);
    }

    matchesSearch(r, q) {
        const fields = [r.NAMA, r.ALAMAT, r.IDPEL, r.TARIF, r.TARIFLAMA, r.NOREGISTRASI];
        if (fields.some((f) => f && String(f).toLowerCase().includes(q))) return true;
        if (r.DAYA != null && String(r.DAYA).includes(q)) return true;
        if (r.DAYALAMA != null && String(r.DAYALAMA).includes(q)) return true;
        return getFasaLabel(r.DAYA).toLowerCase().includes(q);
    }

    getRows() {
        let rows = allRecords.filter((r) => getJenisKey(r) === this.jenis);

        if (this.dateFrom) {
            const from = new Date(this.dateFrom);
            from.setHours(0, 0, 0, 0);
            rows = rows.filter((r) => {
                const tgl = toDate(r.TGLMOHON);
                return tgl && tgl >= from;
            });
        }
        if (this.dateTo) {
            const to = new Date(this.dateTo);
            to.setHours(23, 59, 59, 999);
            rows = rows.filter((r) => {
                const tgl = toDate(r.TGLMOHON);
                return tgl && tgl <= to;
            });
        }

        if (this.search.trim()) {
            const q = this.search.trim().toLowerCase();
            rows = rows.filter((r) => this.matchesSearch(r, q));
        }
        if (this.statusFilter.size > 0) {
            rows = rows.filter((r) =>
                getStatusCategories(r).some((c) => this.statusFilter.has(c)),
            );
        } else {
            rows = [];
        }
        if (this.hasFasaFilter && this.fasaFilter !== "ALL") {
            rows = rows.filter((r) => getFasaLabel(r.DAYA) === this.fasaFilter);
        }
        if (this.hideShortDurasi) {
            rows = rows.filter((r) => {
                const durasi = Number(r.DURASIHARIKERJA);
                if (
                    !isNaN(durasi) &&
                    r.DURASIHARIKERJA != null &&
                    r.DURASIHARIKERJA !== "" &&
                    durasi < 2
                )
                    return false;
                return true;
            });
        }
        rows.sort((a, b) => {
            const da = toDate(a.TGLMOHON), db = toDate(b.TGLMOHON);
            const ta = da ? da.getTime() : 0, tb = db ? db.getTime() : 0;
            return this.sortDir === "desc" ? tb - ta : ta - tb;
        });
        return rows;
    }

    getFilteredRows() {
        return this.getRows();
    }

    cellHtml(r, col) {
        const raw = r[col.key];
        switch (col.fmt) {
            case "date":
                return fmtDate(raw);
            case "datetime":
                return fmtDateTime(raw);
            case "daya":
                return fmtDaya(raw);
            case "durasi":
                return raw == null || raw === "" ? "-" : fmtNum(raw) + " hari";
            case "status": {
                const sp = raw || "-";
                const cats = getStatusCategories(r);
                const primary = cats[0] || "Lainnya";
                const cls = STATUS_BADGE_CLASS[primary] || "badge-lainnya";
                return '<span class="badge ' + cls + '">' + escapeHtml(sp) + "</span>";
            }
            case "progres": {
                const note = r.PROGRES_CATATAN || "-";
                const update = r.TGLUPDATEPERMOHONAN
                    ? fmtDateTime(r.TGLUPDATEPERMOHONAN)
                    : "-";
                return (
                    '<div style="font-size:11px;color:#475569;">' +
                    "<div>" + escapeHtml(note) + "</div>" +
                    '<div style="font-size:9px;color:#94a3b8;margin-top:1px;">' +
                    update + "</div></div>"
                );
            }
            default:
                return escapeHtml(raw == null ? "-" : raw);
        }
    }

    render() {
        const rowsAll = this.getRows();
        const total = rowsAll.length;
        const totalPages = Math.max(1, Math.ceil(total / this.pageSize));
        if (this.page > totalPages) this.page = totalPages;
        const start = (this.page - 1) * this.pageSize;
        const pageRows = rowsAll.slice(start, start + this.pageSize);

        const totalUnfiltered = allRecords.filter(
            (r) => getJenisKey(r) === this.jenis,
        ).length;

        const statusChecks = STATUS_ORDER.map(
            (s) =>
                '<label class="dd-row">' +
                '<input type="checkbox" data-status="' + s + '" ' +
                (this.statusFilter.has(s) ? "checked" : "") + ">" +
                s + "</label>",
        ).join("");

        const fasaControl = this.hasFasaFilter
            ? '<select class="plain-select" data-role="fasa">' +
              '<option value="ALL"' + (this.fasaFilter === "ALL" ? " selected" : "") + ">Semua Fasa</option>" +
              '<option value="1 Fasa"' + (this.fasaFilter === "1 Fasa" ? " selected" : "") + ">1 Fasa</option>" +
              '<option value="3 Fasa"' + (this.fasaFilter === "3 Fasa" ? " selected" : "") + ">3 Fasa</option>" +
              "</select>"
            : "";

        const headCols =
            this.columns.map((c) => "<th>" + escapeHtml(c.label) + "</th>").join("") +
            "<th>Aksi</th>";

        const bodyRows = pageRows.length
            ? pageRows
                  .map((r) => {
                      const tds = this.columns
                          .map((c) => {
                              let cls = "";
                              if (c.key === "NAMA") cls = "name-cell";
                              if (c.key === "ALAMAT") cls = "addr-cell";
                              return '<td class="' + cls + '">' + this.cellHtml(r, c) + "</td>";
                          })
                          .join("");
                      const uid = recordUid(r);
                      return (
                          "<tr>" + tds + "<td>" +
                          '<button class="aksi-btn" data-detail="' + escapeHtml(uid) + '">Detail</button>' +
                          '<button class="aksi-btn aksi-btn-primary" data-edit="' + escapeHtml(uid) + '">Edit</button>' +
                          "</td></tr>"
                      );
                  })
                  .join("")
            : '<tr><td colspan="' + (this.columns.length + 1) +
              '" style="text-align:center;padding:20px;color:#94a3b8;font-size:12px;">Tidak ada data</td></tr>';

        const pageButtons = [];
        const maxBtns = 5;
        let pStart = Math.max(1, this.page - 2);
        let pEnd = Math.min(totalPages, pStart + maxBtns - 1);
        pStart = Math.max(1, pEnd - maxBtns + 1);
        for (let p = pStart; p <= pEnd; p++) {
            pageButtons.push(
                '<button class="page-btn ' + (p === this.page ? "active" : "") +
                '" data-page="' + p + '">' + p + "</button>",
            );
        }

        const hasDateFilter = this.dateFrom || this.dateTo;

        const html =
            '<div class="section-head">' +
            '<div class="section-title">' +
            '<div class="swatch" style="background:' + this.swatchColor + '"></div>' +
            "<h2>" + escapeHtml(this.title) + "</h2>" +
            '<span class="count-badge">' + total + " / " + totalUnfiltered + "</span>" +
            "</div></div>" +
            '<div class="controls-row">' +
            '<div class="search-box">' +
            '<i class="fas fa-search"></i>' +
            '<input type="text" placeholder="Cari..." data-role="search" value="' +
            escapeHtml(this.search) + '">' +
            "</div>" +
            '<div class="dropdown" data-role="statusdd">' +
            '<button class="dd-btn" data-role="statusbtn">' +
            'Status <span class="badge-num">' + this.statusFilter.size + "</span></button>" +
            '<div class="dd-panel ' + (this.statusPanelOpen ? "open" : "") +
            '" data-role="statuspanel">' + statusChecks +
            '<div class="dd-foot">' +
            '<a data-role="checkall">Semua</a>' +
            '<a data-role="uncheckall">Kosong</a>' +
            "</div></div></div>" +
            fasaControl +
            '<label class="toggle-chip">' +
            '<input type="checkbox" data-role="hideshort" ' +
            (this.hideShortDurasi ? "checked" : "") + ">" +
            "&lt; 2 hari</label>" +
            '<div class="spacer"></div>' +
            '<div class="date-filter-wrapper" data-role="dateWrapper">' +
            '<div class="date-filter-toggle" data-role="dateToggle">' +
            '<i class="fas fa-calendar-alt"></i><span>Tanggal</span>' +
            '<span class="date-badge ' + (hasDateFilter ? "active" : "") + '">•</span>' +
            "</div>" +
            '<div class="date-filter-popup ' + (this.datePopupOpen ? "open" : "") +
            '" data-role="datePopup">' +
            '<div class="df-row"><span class="df-label">Dari</span>' +
            '<input type="date" data-role="dateFrom" value="' + (this.dateFrom || "") + '"></div>' +
            '<div class="df-row"><span class="df-label">Sampai</span>' +
            '<input type="date" data-role="dateTo" value="' + (this.dateTo || "") + '"></div>' +
            '<div class="df-actions">' +
            '<button class="df-clear" data-role="dateClear">Clear</button>' +
            '<button class="df-apply" data-role="dateApply">Terapkan</button>' +
            "</div></div></div>" +
            '<select class="plain-select" data-role="pagesize">' +
            '<option value="10"' + (this.pageSize === 10 ? " selected" : "") + ">10</option>" +
            '<option value="25"' + (this.pageSize === 25 ? " selected" : "") + ">25</option>" +
            '<option value="50"' + (this.pageSize === 50 ? " selected" : "") + ">50</option>" +
            "</select></div>" +
            '<div class="table-wrap"><table><thead><tr>' + headCols +
            "</tr></thead><tbody>" + bodyRows + "</tbody></table></div>" +
            '<div class="pagination"><div>' +
            (total === 0 ? 0 : start + 1) + "–" +
            Math.min(start + this.pageSize, total) + " dari " + total +
            '</div><div class="pages">' +
            '<button class="page-btn" data-page="prev" ' +
            (this.page <= 1 ? "disabled" : "") + ">‹</button>" +
            pageButtons.join("") +
            '<button class="page-btn" data-page="next" ' +
            (this.page >= totalPages ? "disabled" : "") + ">›</button>" +
            "</div></div>";

        document.getElementById(this.containerId).innerHTML = html;
        this.wireEvents(document.getElementById(this.containerId));
    }

    wireEvents(container) {
        container.querySelector('[data-role="search"]').addEventListener("input", (e) => {
            this.search = e.target.value;
            this.page = 1;
            this.render();
        });

        const statusBtn = container.querySelector('[data-role="statusbtn"]');
        const statusPanel = container.querySelector('[data-role="statuspanel"]');
        statusBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.statusPanelOpen = !this.statusPanelOpen;
            statusPanel.classList.toggle("open", this.statusPanelOpen);
        });
        statusPanel.addEventListener("click", (e) => e.stopPropagation());

        statusPanel.querySelectorAll("input[data-status]").forEach((cb) => {
            cb.addEventListener("change", (e) => {
                const s = e.target.getAttribute("data-status");
                if (e.target.checked) this.statusFilter.add(s);
                else this.statusFilter.delete(s);
                this.page = 1;
                this.render();
            });
        });
        container.querySelector('[data-role="checkall"]').addEventListener("click", (e) => {
            e.stopPropagation();
            this.statusFilter = new Set(STATUS_ORDER);
            this.page = 1;
            this.render();
        });
        container.querySelector('[data-role="uncheckall"]').addEventListener("click", (e) => {
            e.stopPropagation();
            this.statusFilter = new Set();
            this.page = 1;
            this.render();
        });

        const fasaSel = container.querySelector('[data-role="fasa"]');
        if (fasaSel) {
            fasaSel.addEventListener("change", (e) => {
                this.fasaFilter = e.target.value;
                this.page = 1;
                this.render();
            });
        }

        container.querySelector('[data-role="hideshort"]').addEventListener("change", (e) => {
            this.hideShortDurasi = e.target.checked;
            this.page = 1;
            this.render();
        });

        const dateToggle = container.querySelector('[data-role="dateToggle"]');
        const datePopup = container.querySelector('[data-role="datePopup"]');

        if (dateToggle) {
            dateToggle.addEventListener("click", (e) => {
                e.stopPropagation();
                this.datePopupOpen = !this.datePopupOpen;
                datePopup.classList.toggle("open", this.datePopupOpen);
            });
        }
        // ✅ Listener document global sudah di-handle di constructor.

        const dateFromInput = container.querySelector('[data-role="dateFrom"]');
        const dateToInput = container.querySelector('[data-role="dateTo"]');
        const dateClear = container.querySelector('[data-role="dateClear"]');
        const dateApply = container.querySelector('[data-role="dateApply"]');

        if (dateApply) {
            dateApply.addEventListener("click", () => {
                this.dateFrom = dateFromInput ? dateFromInput.value : "";
                this.dateTo = dateToInput ? dateToInput.value : "";
                this.page = 1;
                this.datePopupOpen = false;
                if (datePopup) datePopup.classList.remove("open");
                this.render();
            });
        }
        if (dateClear) {
            dateClear.addEventListener("click", () => {
                if (dateFromInput) dateFromInput.value = "";
                if (dateToInput) dateToInput.value = "";
                this.dateFrom = "";
                this.dateTo = "";
                this.page = 1;
                this.datePopupOpen = false;
                if (datePopup) datePopup.classList.remove("open");
                this.render();
            });
        }
        if (dateFromInput) {
            dateFromInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") { e.preventDefault(); if (dateApply) dateApply.click(); }
            });
        }
        if (dateToInput) {
            dateToInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") { e.preventDefault(); if (dateApply) dateApply.click(); }
            });
        }

        container.querySelector('[data-role="pagesize"]').addEventListener("change", (e) => {
            this.pageSize = Number(e.target.value);
            this.page = 1;
            this.render();
        });

        container.querySelectorAll("[data-page]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const v = btn.getAttribute("data-page");
                const rowsAll = this.getRows();
                const totalPages = Math.max(1, Math.ceil(rowsAll.length / this.pageSize));
                if (v === "prev") this.page = Math.max(1, this.page - 1);
                else if (v === "next") this.page = Math.min(totalPages, this.page + 1);
                else this.page = Number(v);
                this.render();
            });
        });

        container.querySelectorAll("[data-detail]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const uid = btn.getAttribute("data-detail");
                const rec = allRecords.find((r) => recordUid(r) === uid);
                if (rec) openDetailModal(rec);
            });
        });

        container.querySelectorAll("[data-edit]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const uid = btn.getAttribute("data-edit");
                const rec = allRecords.find((r) => recordUid(r) === uid);
                if (rec) openEditModal(rec);
            });
        });
    }
}

// ================================================================
// TABLE COLUMNS
// ================================================================
const colsPasang = [
    { key: "NAMA", label: "Nama" },
    { key: "ALAMAT", label: "Alamat" },
    { key: "TARIF", label: "Tarif" },
    { key: "DAYA", label: "Daya", fmt: "daya" },
    { key: "DURASIHARIKERJA", label: "Durasi", fmt: "durasi" },
    { key: "STATUSPERMOHONAN", label: "Status", fmt: "status" },
    { key: "PROGRES_CATATAN", label: "Progres", fmt: "progres" },
];
const colsPerubahan = [
    { key: "NAMA", label: "Nama" },
    { key: "ALAMAT", label: "Alamat" },
    { key: "TARIFLAMA", label: "Tarif Lama" },
    { key: "DAYALAMA", label: "Daya Lama", fmt: "daya" },
    { key: "TARIF", label: "Tarif" },
    { key: "DAYA", label: "Daya", fmt: "daya" },
    { key: "DURASIHARIKERJA", label: "Durasi", fmt: "durasi" },
    { key: "STATUSPERMOHONAN", label: "Status", fmt: "status" },
    { key: "PROGRES_CATATAN", label: "Progres", fmt: "progres" },
];
const colsPenerangan = colsPasang;

// ================================================================
// CONTROLLERS
// ================================================================
const ctrlPasang = new TableController({
    jenis: "PASANG BARU",
    title: "Pasang Baru",
    swatchColor: "#4f46e5",
    columns: colsPasang,
    containerId: "section-PASANG_BARU",
    hasFasaFilter: true,
});
const ctrlPerubahan = new TableController({
    jenis: "PERUBAHAN DAYA",
    title: "Perubahan Daya",
    swatchColor: "#0ea5e9",
    columns: colsPerubahan,
    containerId: "section-PERUBAHAN_DAYA",
    hasFasaFilter: true,
});
const ctrlPenerangan = new TableController({
    jenis: "PENERANGAN SEMENTARA",
    title: "Penerangan Sementara",
    swatchColor: "#8b5cf6",
    columns: colsPenerangan,
    containerId: "section-PENERANGAN_SEMENTARA",
    hasFasaFilter: true,
});
const controllers = [ctrlPasang, ctrlPerubahan, ctrlPenerangan];

// ================================================================
// DOWNLOAD
// ================================================================
const HIDDEN_COLUMNS = [
    "NOAGENDA", "NOREGISTRASI", "NOTELPPEMOHON", "NOTELPHPPEMOHON",
    "ASALMOHON", "UPIENTRI", "PETUGASCATAT", "TGLMOHON", "TARIFLAMA",
    "DAYALAMA", "PAKETSAR", "TOTALBIAYA", "DURASIHARIKALENDER",
    "KRITERIATMP", "ALASANKRITERIATMP", "KETERANGANALASANKRITERIATMP",
    "ESTIMASIDURASIHARILAYANAN", "STATUSPENANGGUHAN", "ALASANPENANGGUHAN",
    "KETERANGANALASANPENANGGUHAN", "TGLPENANGGUHAN", "TGLSIAPSAMBUNG",
    "STATUSRESTITUSIATAUTITIPAN", "TGLRESTITUSI", "TGLBPTITIPAN",
    "TGLUPDATEPERMOHONAN", "TGLPK", "TGLNYALA", "TGLPEREMAJAAN",
    "NAMAUPI", "NAMAAP", "NAMAUP", "UNITTUJUAN", "PAKETSLO", "PLTSATAP",
];
const VISIBLE_COLUMNS = [
    "IDPEL", "NAMA", "ALAMAT", "TARIF", "DAYA",
    "DURASIHARIKERJA", "STATUSPERMOHONAN", "PROGRES_CATATAN",
];

// ✅ PERBAIKAN: fungsi async, tunggu XLSX siap
async function downloadAllData() {
    if (!allRecords.length) {
        alert("Belum ada data.");
        return;
    }

    try {
        await window.xlsxReady;
    } catch (e) {
        alert("Gagal memuat library Excel (XLSX). Cek koneksi internet lalu coba lagi.");
        return;
    }

    const wb = XLSX.utils.book_new();
    let hasData = false;
    const emptySheets = [];

    controllers.forEach((ctrl) => {
        const rows = ctrl.getFilteredRows();
        if (rows.length) {
            const header = CANONICAL_FIELDS;
            const data = rows.map((r) =>
                CANONICAL_FIELDS.map((f) => {
                    const val = r[f];
                    if (val instanceof Date) return val.toISOString().split("T")[0];
                    if (typeof val === "string" && val.match(/^\d{4}-\d{2}-\d{2}/)) return val;
                    return val == null ? "" : val;
                }),
            );

            const aoa = [header, ...data];
            const ws = XLSX.utils.aoa_to_sheet(aoa);

            const hiddenColIndices = [];
            header.forEach((colName, index) => {
                if (HIDDEN_COLUMNS.includes(colName)) hiddenColIndices.push(index);
            });

            const colWidths = header.map((col, idx) => {
                let maxLen = col.length;
                data.forEach((row) => {
                    const val = String(row[idx] || "");
                    if (val.length > maxLen) maxLen = val.length;
                });
                return { wch: Math.min(Math.max(maxLen + 2, 12), 40) };
            });

            // ✅ Hanya set hidden, hapus sheetView dan !freeze yang tidak valid
            ws["!cols"] = colWidths.map((w, idx) => ({
                ...w,
                hidden: hiddenColIndices.includes(idx),
            }));

            const sheetName = ctrl.title.substring(0, 31);
            XLSX.utils.book_append_sheet(wb, ws, sheetName);
            hasData = true;
        } else {
            emptySheets.push(ctrl.title);
        }
    });

    if (!hasData) {
        alert("Tidak ada data untuk diekspor sesuai filter saat ini.");
        return;
    }

    XLSX.writeFile(wb, `Data_Dapel_${todayIndoFilename()}.xlsx`);

    let msg = "✅ Download berhasil!\n\n";
    msg += `📁 File: Data_Dapel_${todayIndoFilename()}.xlsx\n`;
    msg += `📊 Total data: ${allRecords.length} baris\n\n`;
    msg += `ℹ️ Kolom yang di-HIDE di Excel:\n   ${HIDDEN_COLUMNS.join(", ")}\n\n`;
    msg += `💡 Kolom yang TAMPAK di Excel:\n   ${VISIBLE_COLUMNS.join(", ")}\n\n`;
    msg += `⚠️ Untuk menampilkan kolom yang di-hide di Excel:\n`;
    msg += `   Klik kanan header kolom → "Unhide"`;
    if (emptySheets.length) {
        msg += `\n\nSheet tanpa data (dilewati): ${emptySheets.join(", ")}`;
    }
    alert(msg);
}

// ================================================================
// MODALS
// ================================================================
function openDetailModal(rec) {
    const grid = document.getElementById("modalGrid");
    const sp = rec.STATUSPERMOHONAN || "-";
    const cats = getStatusCategories(rec);
    const cls = STATUS_BADGE_CLASS[cats[0]] || "badge-lainnya";

    const fields = [
        ["IDPEL", rec.IDPEL || "-"],
        ["Nama", rec.NAMA || "-"],
        ["Alamat", rec.ALAMAT || "-"],
        ["No Telp", rec.NOTELPPEMOHON || "-"],
        ["No HP", rec.NOTELPHPPEMOHON || "-"],
        ["Jenis Transaksi", rec.JENISTRANSAKSI || "-"],
        ["Tarif", rec.TARIF || "-"],
        ["Daya", rec.DAYA ? fmtDaya(rec.DAYA) : "-"],
        ["Fasa", getFasaLabel(rec.DAYA)],
        ["Status", '<span class="badge ' + cls + '">' + escapeHtml(sp) + "</span>"],
        ["Tanggal Mohon", fmtDate(rec.TGLMOHON)],
        ["Durasi Kerja", rec.DURASIHARIKERJA ? fmtNum(rec.DURASIHARIKERJA) + " hari" : "-"],
        ["Total Biaya", rec.TOTALBIAYA ? fmtNum(rec.TOTALBIAYA) : "-"],
        ["Tanggal Bayar", fmtDate(rec.TGLBAYAR)],
        ["Tanggal Nyala", fmtDate(rec.TGLNYALA)],
        ["Update Terakhir", fmtDateTime(rec.TGLUPDATEPERMOHONAN)],
        ["Catatan Progres", rec.PROGRES_CATATAN || "-"],
    ];

    grid.innerHTML = fields
        .map(([k, v]) =>
            '<div class="detail-item"><div class="k">' + escapeHtml(k) +
            '</div><div class="v">' + v + "</div></div>",
        )
        .join("");

    document.getElementById("modalTitle").textContent = "Detail Permohonan";
    document.getElementById("modalFoot").innerHTML =
        '<button class="btn btn-ghost" id="modalCancelBtn">Tutup</button>';
    document.getElementById("modalOverlay").classList.add("open");
    document.getElementById("modalCancelBtn").addEventListener("click", closeDetailModal);
}

function closeDetailModal() {
    document.getElementById("modalOverlay").classList.remove("open");
}

// ✅ PERBAIKAN: guard semua elemen modal
const modalClose = document.getElementById("modalClose");
const modalOverlay = document.getElementById("modalOverlay");
if (modalClose) modalClose.addEventListener("click", closeDetailModal);
if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
        if (e.target.id === "modalOverlay") closeDetailModal();
    });
}

let currentEditUid = null;

function openEditModal(rec) {
    currentEditUid = recordUid(rec);
    document.getElementById("editIdpel").value = rec.IDPEL || "-";
    document.getElementById("editNama").value = rec.NAMA || "-";
    document.getElementById("editAlamat").value = rec.ALAMAT || "-";
    document.getElementById("editProgressText").value = rec.PROGRES_CATATAN || "";
    document.getElementById("editLastUpdate").textContent =
        rec.TGLUPDATEPERMOHONAN ? fmtDateTime(rec.TGLUPDATEPERMOHONAN) : "Belum pernah diupdate";
    document.getElementById("editModalOverlay").classList.add("open");
}

function closeEditModal() {
    document.getElementById("editModalOverlay").classList.remove("open");
    currentEditUid = null;
}

// ✅ PERBAIKAN: guard semua elemen edit modal
const editModalClose = document.getElementById("editModalClose");
const editModalCancel = document.getElementById("editModalCancel");
const editModalSave = document.getElementById("editModalSave");
const editModalOverlay = document.getElementById("editModalOverlay");

if (editModalClose) editModalClose.addEventListener("click", closeEditModal);
if (editModalCancel) editModalCancel.addEventListener("click", closeEditModal);
if (editModalOverlay) {
    editModalOverlay.addEventListener("click", (e) => {
        if (e.target.id === "editModalOverlay") closeEditModal();
    });
}

if (editModalSave) {
    editModalSave.addEventListener("click", async () => {
        if (!currentEditUid) {
            closeEditModal();
            return;
        }

        const rec = allRecords.find((r) => recordUid(r) === currentEditUid);
        if (!rec || !rec._DB_ID) {
            alert("Data tidak ditemukan di database.");
            return;
        }

        const note = document.getElementById("editProgressText").value.trim();
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

        try {
            const response = await fetch(`/daftar-tunggu/${rec._DB_ID}/progres`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken || "",
                },
                credentials: "same-origin",
                body: JSON.stringify({ progres: note || null }),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Gagal memperbarui progres.");
            }

            await loadServerData();
            renderAll();
            closeEditModal();
            alert(result.message || "Progres berhasil diperbarui.");
        } catch (error) {
            console.error("❌ Gagal update progres:", error);
            alert("Gagal memperbarui progres.\n\n" + error.message);
        }
    });
}

// ================================================================
// DASHBOARD CHARTS
// ================================================================
let chartTotalJenis = null,
    chartStatusOverall = null,
    chartStatusPerJenis = null,
    chartJenisPie = null;
    chartAvgDurasi = null;

function renderStatusLegend() {
    const legendEl = document.getElementById("statusLegend");
    if (!legendEl) return;
    legendEl.innerHTML = STATUS_ORDER.map(
        (s) =>
            '<div class="legend-item">' +
            '<span class="legend-dot" style="background:' +
            (STATUS_CHART_COLORS[s] || "#94a3b8") + '"></span>' +
            escapeHtml(s) + "</div>",
    ).join("");
}

function renderDashboardCharts() {
    [chartTotalJenis, chartStatusOverall, chartStatusPerJenis, chartJenisPie, chartAvgDurasi]
        .forEach((c) => { if (c) c.destroy(); });
    chartTotalJenis = chartStatusOverall = chartStatusPerJenis =
        chartJenisPie = chartAvgDurasi = null;

    renderStatusLegend();

    const filtered = getFilteredRecords();
    const total = filtered.length;

    const statPB = document.getElementById("statPasangBaru");
    const statPD = document.getElementById("statPerubahanDaya");
    const statPS = document.getElementById("statPenerangan");
    if (statPB) statPB.textContent = countByJenisFiltered("PASANG BARU").toLocaleString("id-ID");
    if (statPD) statPD.textContent = countByJenisFiltered("PERUBAHAN DAYA").toLocaleString("id-ID");
    if (statPS) statPS.textContent = countByJenisFiltered("PENERANGAN SEMENTARA").toLocaleString("id-ID");

    const sfTotal = document.getElementById("sfTotal");
    if (sfTotal) sfTotal.textContent = allRecords.length.toLocaleString("id-ID");
    const dashDateCount = document.getElementById("dashDateCount");
    if (dashDateCount) dashDateCount.textContent = total.toLocaleString("id-ID");
    const totalDataDash = document.getElementById("totalDataDash");
    if (totalDataDash) totalDataDash.textContent = total.toLocaleString("id-ID");

    const summary = getSummaryDataFiltered();
    const avgDurasiAll = document.getElementById("avgDurasiAll");
    if (avgDurasiAll) avgDurasiAll.innerHTML = summary.avgDurasi.toFixed(1) + ' <span class="unit">hari</span>';
    const avgDurasiBulan = document.getElementById("avgDurasiBulan");
    if (avgDurasiBulan) avgDurasiBulan.innerHTML = summary.avgPerBulan.toFixed(1) + ' <span class="unit">hari</span>';
    const totalSelesai = document.getElementById("totalSelesai");
    if (totalSelesai) totalSelesai.textContent = summary.totalSelesai.toLocaleString();
    const totalBelum = document.getElementById("totalBelum");
    if (totalBelum) totalBelum.textContent = summary.totalBelum.toLocaleString();

    const lastUpdateDash = document.getElementById("lastUpdateDash");
    if (lastUpdateDash) {
        lastUpdateDash.textContent = lastImportInfo
            ? "Update: " + fmtDateTime(lastImportInfo.when)
            : "-";
    }

    // ✅ PERBAIKAN: guard null
    const emptyState = document.getElementById("emptyState");
    const dashboardContent = document.getElementById("dashboardContent");
    const hasData = allRecords.length > 0;

    if (hasData) {
        if (emptyState) emptyState.style.display = "none";
        if (dashboardContent) dashboardContent.style.display = "block";
    } else {
        if (emptyState) emptyState.style.display = "block";
        if (dashboardContent) dashboardContent.style.display = "none";
        return;
    }

    if (typeof Chart === "undefined") {
        document.querySelectorAll(".chart-card .chart-placeholder").forEach((p) => {
            p.style.display = "flex";
            p.innerHTML = "⚠️ Chart.js gagal dimuat";
        });
        return;
    }

    Chart.defaults.font.family = "Inter, system-ui, -apple-system, sans-serif";
    Chart.defaults.color = "#64748b";

    const pasang = countByJenisFiltered("PASANG BARU");
    const perubahan = countByJenisFiltered("PERUBAHAN DAYA");
    const penerangan = countByJenisFiltered("PENERANGAN SEMENTARA");
    const colors = ["#4f46e5", "#0ea5e9", "#8b5cf6"];

    try {
        const ctx1 = document.getElementById("chartTotalJenis").getContext("2d");
        chartTotalJenis = new Chart(ctx1, {
            type: "bar",
            data: {
                labels: ["Pasang Baru", "Perubahan Daya", "Penerangan Sementara"],
                datasets: [{
                    label: "Jumlah",
                    data: [pasang, perubahan, penerangan],
                    backgroundColor: colors,
                    borderRadius: 6,
                    maxBarThickness: 60,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: "#f1f5f9" } },
                    x: { grid: { display: false } },
                },
            },
        });

        const statusOverall = getStatusCountsFiltered(filtered);
        const statusLabels = STATUS_ORDER.filter((s) => statusOverall[s] > 0);
        const statusData = statusLabels.map((s) => statusOverall[s]);

        const ctx2 = document.getElementById("chartStatusOverall").getContext("2d");
        chartStatusOverall = new Chart(ctx2, {
            type: "line",
            data: {
                labels: statusLabels,
                datasets: [{
                    label: "Jumlah",
                    data: statusData,
                    borderColor: "#4f46e5",
                    backgroundColor: "rgba(79,70,229,0.08)",
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: statusLabels.map((s) => STATUS_CHART_COLORS[s] || "#94a3b8"),
                    pointBorderColor: "#fff",
                    pointBorderWidth: 2,
                    pointRadius: 5,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: "#f1f5f9" } },
                    x: { grid: { display: false } },
                },
            },
        });

        const jenisList = ["PASANG BARU", "PERUBAHAN DAYA", "PENERANGAN SEMENTARA"];
        const statusKeys = STATUS_ORDER.filter((s) => {
            return jenisList.some((j) => {
                const recs = filtered.filter((r) => isJenis(j, r));
                return getStatusCountsFiltered(recs)[s] > 0;
            });
        });
        const datasets = statusKeys.map((sk) => ({
            label: sk,
            data: jenisList.map((j) => {
                const recs = filtered.filter((r) => isJenis(j, r));
                return getStatusCountsFiltered(recs)[sk] || 0;
            }),
            backgroundColor: STATUS_CHART_COLORS[sk] || "#94a3b8",
            borderRadius: 4,
            maxBarThickness: 28,
        }));

        // Chart 3a/3b/3c: Status per Jenis (3 grafik terpisah)
        const jenisChartConfig = [
            {
                id: "chartStatusPasangBaru",
                jenis: "PASANG BARU",
                setter: (c) => (chartStatusPasangBaru = c),
            },
            {
                id: "chartStatusPerubahanDaya",
                jenis: "PERUBAHAN DAYA",
                setter: (c) => (chartStatusPerubahanDaya = c),
            },
            {
                id: "chartStatusPeneranganSementara",
                jenis: "PENERANGAN SEMENTARA",
                setter: (c) => (chartStatusPeneranganSementara = c),
            },
        ];

        jenisChartConfig.forEach((cfg) => {
            const recs = filtered.filter((r) => isJenis(cfg.jenis, r));
            const counts = getStatusCountsFiltered(recs);
            const labels = STATUS_ORDER.filter((s) => counts[s] > 0);
            const dataVals = labels.map((s) => counts[s]);

            const ctx = document.getElementById(cfg.id).getContext("2d");
            const chart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Jumlah",
                            data: dataVals,
                            backgroundColor: labels.map(
                                (s) => STATUS_CHART_COLORS[s] || "#94a3b8",
                            ),
                            borderRadius: 5,
                            maxBarThickness: 42,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function (ctx) {
                                    return ctx.parsed.y + " permohonan";
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: {
                                font: { size: 10 },
                                maxRotation: 45,
                                minRotation: 0,
                            },
                        },
                        y: {
                            beginAtZero: true,
                            grid: { color: "#f1f5f9" },
                            ticks: { precision: 0 },
                        },
                    },
                },
            });
            cfg.setter(chart);
        });

        const ctx4 = document.getElementById("chartJenisPie").getContext("2d");
        chartJenisPie = new Chart(ctx4, {
            type: "pie",
            data: {
                labels: [
                    "Pasang Baru",
                    "Perubahan Daya",
                    "Penerangan Sementara",
                ],
                datasets: [
                    {
                        data: [pasang, perubahan, penerangan],
                        backgroundColor: colors,
                        borderWidth: 2,
                        borderColor: "#fff",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: { boxWidth: 10, font: { size: 10 } },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (ctx) {
                                const total = ctx.dataset.data.reduce(
                                    (a, b) => a + b,
                                    0,
                                );
                                const val = ctx.parsed;
                                const pct =
                                    total > 0
                                        ? ((val / total) * 100).toFixed(1)
                                        : 0;
                                return `${ctx.label}: ${val.toLocaleString("id-ID")} (${pct}%)`;
                            },
                        },
                    },
                },
            },
        });

        const avgData = jenisList.map((j) => {
            const recs = filtered.filter((r) => isJenis(j, r));
            return getAverageDurasiFiltered(recs);
        });
        const ctx5 = document.getElementById("chartAvgDurasi").getContext("2d");
        chartAvgDurasi = new Chart(ctx5, {
            type: "bar",
            data: {
                labels: ["Pasang Baru", "Perubahan Daya", "Penerangan Sementara"],
                datasets: [{
                    label: "Rata-rata (hari)",
                    data: avgData,
                    backgroundColor: colors,
                    borderRadius: 6,
                    maxBarThickness: 50,
                }],
            },
            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function (ctx) {
                                return ctx.parsed.x.toFixed(1) + " hari";
                            },
                        },
                    },
                },
                scales: {
                    x: { beginAtZero: true, grid: { color: "#f1f5f9" } },
                    y: { grid: { display: false } },
                },
            },
        });
    } catch (e) {
        console.error("Error creating charts:", e);
        document.querySelectorAll(".chart-card .chart-placeholder").forEach((p) => {
            p.style.display = "flex";
            p.innerHTML = "⚠️ Gagal membuat grafik";
        });
    }
}

// ================================================================
// SIDEBAR TOGGLE
// ================================================================
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");
const menuToggle = document.getElementById("menuToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
const dataMenuToggle = document.getElementById("dataMenuToggle");
const dataSubMenu = document.getElementById("dataSubMenu");

function isMobileWidth() {
    return window.innerWidth <= 860;
}

function openSidebar() {
    if (sidebar) sidebar.classList.remove("closed");
    if (mainContent) mainContent.classList.remove("expanded");
    if (menuToggle) menuToggle.classList.add("hidden");
    if (isMobileWidth() && sidebarOverlay) sidebarOverlay.classList.add("show");
}

function closeSidebar() {
    if (sidebar) sidebar.classList.add("closed");
    if (mainContent) mainContent.classList.add("expanded");
    if (menuToggle) menuToggle.classList.remove("hidden");
    if (sidebarOverlay) sidebarOverlay.classList.remove("show");
}

function toggleSidebar() {
    if (sidebar && sidebar.classList.contains("closed")) openSidebar();
    else closeSidebar();
}

if (menuToggle) menuToggle.addEventListener("click", toggleSidebar);
if (sidebarCloseBtn) sidebarCloseBtn.addEventListener("click", closeSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebar);

if (dataMenuToggle) {
    dataMenuToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        if (!dataSubMenu) return;
        dataSubMenu.classList.toggle("open");
        const arrow = this.querySelector(".nav-arrow i");
        if (arrow) {
            arrow.className = dataSubMenu.classList.contains("open")
                ? "fas fa-chevron-down"
                : "fas fa-chevron-right";
        }
    });
}

document.querySelectorAll(".nav-sub-item").forEach((item) => {
    item.addEventListener("click", function () {
        document.querySelectorAll(".nav-sub-item").forEach((i) => i.classList.remove("active"));
        this.classList.add("active");

        const subview = this.getAttribute("data-subview");
        const viewMap = {
            PASANG_BARU: "Pasang Baru",
            PERUBAHAN_DAYA: "Perubahan Daya",
            PENERANGAN_SEMENTARA: "Penerangan Sementara",
        };

        document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
        const viewData = document.getElementById("view-data");
        if (viewData) viewData.classList.add("active");

        document.querySelectorAll(".nav-item").forEach((i) => i.classList.remove("active"));
        const navData = document.querySelector('[data-view="data"]');
        if (navData) navData.classList.add("active");

        const pageTitle = document.getElementById("pageTitle");
        const pageSub = document.getElementById("pageSub");
        if (pageTitle) pageTitle.textContent = viewMap[subview];
        if (pageSub) pageSub.textContent = "Data permohonan " + viewMap[subview].toLowerCase();

        document.querySelectorAll("#dataSectionContainer .section").forEach((el) => (el.style.display = "none"));
        const targetSection = document.getElementById("section-" + subview);
        if (targetSection) {
            targetSection.style.display = "block";
            const ctrl = controllers.find((c) => c.jenis === subview);
            if (ctrl) ctrl.render();
        }

        if (isMobileWidth()) closeSidebar();
    });
});

window.addEventListener("resize", function () {
    if (isMobileWidth()) {
        if (sidebarOverlay && sidebar) {
            sidebarOverlay.classList.toggle("show", !sidebar.classList.contains("closed"));
        }
    } else {
        if (sidebarOverlay) sidebarOverlay.classList.remove("show");
    }
});

if (isMobileWidth()) closeSidebar();
else openSidebar();

// ================================================================
// RENDER ALL
// ================================================================
function renderAll() {
    console.log("=== CEK RENDER ===");
    console.log("Total allRecords:", allRecords.length);
    console.log("Filtered:", getFilteredRecords().length);

    controllers.forEach((c) => {
        try {
            c.render();
        } catch (e) {
            console.error("Gagal render " + c.title, e);
        }
    });

    const activeSub = document.querySelector(".nav-sub-item.active")?.getAttribute("data-subview");
    if (activeSub) {
        document.querySelectorAll("#dataSectionContainer .section").forEach((el) => (el.style.display = "none"));
        const targetSection = document.getElementById("section-" + activeSub);
        if (targetSection) targetSection.style.display = "block";
    } else {
        document.querySelectorAll("#dataSectionContainer .section").forEach((el) => (el.style.display = "block"));
    }

    window.chartReady
        .then(() => {
            try {
                renderDashboardCharts();
                console.log("✅ Grafik berhasil dimuat");
            } catch (e) {
                console.error("Gagal render charts", e);
            }
        })
        .catch((err) => {
            console.error("Chart.js gagal dimuat:", err);
            document.querySelectorAll(".chart-card .chart-placeholder").forEach((p) => {
                p.style.display = "flex";
                p.innerHTML = "⚠️ Chart.js gagal dimuat. Coba refresh.";
            });
        });

    const lastImportLabel = document.getElementById("lastImportLabel");
    if (lastImportLabel) {
        lastImportLabel.textContent = lastImportInfo
            ? "Import: " + fmtDateTime(lastImportInfo.when) + " — " +
              lastImportInfo.added + " baru, " + lastImportInfo.updated + " update"
            : "Belum ada data";
    }

    const filtered = getFilteredRecords();
    const dashDateCount = document.getElementById("dashDateCount");
    if (dashDateCount) dashDateCount.textContent = filtered.length.toLocaleString("id-ID");
    const totalDataDash = document.getElementById("totalDataDash");
    if (totalDataDash) totalDataDash.textContent = filtered.length.toLocaleString("id-ID");
    const dashDateFromEl = document.getElementById("dashDateFrom");
    if (dashDateFromEl) dashDateFromEl.value = dashDateFrom;
    const dashDateToEl = document.getElementById("dashDateTo");
    if (dashDateToEl) dashDateToEl.value = dashDateTo;
}

// ================================================================
// DASHBOARD DATE FILTER
// ================================================================
const dashDateApply = document.getElementById("dashDateApply");
const dashDateReset = document.getElementById("dashDateReset");
const dashDateFromEl = document.getElementById("dashDateFrom");
const dashDateToEl = document.getElementById("dashDateTo");

if (dashDateApply) {
    dashDateApply.addEventListener("click", () => {
        dashDateFrom = dashDateFromEl.value;
        dashDateTo = dashDateToEl.value;
        renderAll();
    });
}
if (dashDateReset) {
    dashDateReset.addEventListener("click", () => {
        dashDateFrom = "";
        dashDateTo = "";
        if (dashDateFromEl) dashDateFromEl.value = "";
        if (dashDateToEl) dashDateToEl.value = "";
        renderAll();
    });
}
if (dashDateFromEl) {
    dashDateFromEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") dashDateApply.click();
    });
}
if (dashDateToEl) {
    dashDateToEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") dashDateApply.click();
    });
}

// ================================================================
// NAVIGATION
// ================================================================
document.querySelectorAll('.nav-item[data-view="dashboard"]').forEach((item) => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".nav-item").forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
        const viewDash = document.getElementById("view-dashboard");
        if (viewDash) viewDash.classList.add("active");
        const pageTitle = document.getElementById("pageTitle");
        const pageSub = document.getElementById("pageSub");
        if (pageTitle) pageTitle.textContent = "Dashboard";
        if (pageSub) pageSub.textContent = "Ringkasan seluruh data permohonan pelanggan";
        if (isMobileWidth()) closeSidebar();
    });
});

const btnGoToData = document.getElementById("btnGoToData");
if (btnGoToData) {
    btnGoToData.addEventListener("click", () => {
        document.querySelectorAll(".nav-item").forEach((i) => i.classList.remove("active"));
        const navData = document.querySelector('[data-view="data"]');
        if (navData) navData.classList.add("active");
        document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
        const viewData = document.getElementById("view-data");
        if (viewData) viewData.classList.add("active");
        const pageTitle = document.getElementById("pageTitle");
        const pageSub = document.getElementById("pageSub");
        if (pageTitle) pageTitle.textContent = "Pasang Baru";
        if (pageSub) pageSub.textContent = "Data permohonan pasang baru";

        const firstSub = document.querySelector('.nav-sub-item[data-subview="PASANG_BARU"]');
        if (firstSub) {
            document.querySelectorAll(".nav-sub-item").forEach((i) => i.classList.remove("active"));
            firstSub.classList.add("active");
            document.querySelectorAll("#dataSectionContainer .section").forEach((el) => (el.style.display = "none"));
            const targetSection = document.getElementById("section-PASANG_BARU");
            if (targetSection) targetSection.style.display = "block";
            const ctrl = controllers.find((c) => c.jenis === "PASANG_BARU");
            if (ctrl) ctrl.render();
        }

        if (isMobileWidth()) closeSidebar();
    });
}

// ================================================================
// EVENTS
// ================================================================
const fileInputDashboard = document.getElementById("fileInputDashboard");
if (fileInputDashboard) {
    fileInputDashboard.addEventListener("change", (e) => {
        handleImportFiles(e.target.files);
        e.target.value = "";
    });
}

const fileInputDashboardQuick = document.getElementById("fileInputDashboardQuick");
if (fileInputDashboardQuick) {
    fileInputDashboardQuick.addEventListener("change", (e) => {
        handleImportFiles(e.target.files);
        e.target.value = "";
    });
}

const fileInput = document.getElementById("fileInput");
if (fileInput) {
    fileInput.addEventListener("change", (e) => {
        handleImportFiles(e.target.files);
        e.target.value = "";
    });
}

const btnDownloadAll = document.getElementById("btnDownloadAll");
if (btnDownloadAll) {
    btnDownloadAll.addEventListener("click", () => downloadAllData());
}

// ✅ PERBAIKAN: reset hanya di memori, beri peringatan
const btnReset = document.getElementById("btnReset");
if (btnReset) {
    btnReset.addEventListener("click", () => {
        if (!allRecords.length) { alert("Tidak ada data."); return; }
        alert("Reset di sisi klien tidak menghapus data di database.\n" +
              "Silakan muat ulang halaman untuk mengambil data dari server.");
    });
}

const btnResetDashboard = document.getElementById("btnResetDashboard");
if (btnResetDashboard) {
    btnResetDashboard.addEventListener("click", () => {
        if (!allRecords.length) { alert("Tidak ada data."); return; }
        alert("Reset di sisi klien tidak menghapus data di database.\n" +
              "Silakan muat ulang halaman untuk mengambil data dari server.");
    });
}

// ✅ PERBAIKAN: contoh data hanya untuk preview di memori
const btnExampleData = document.getElementById("btnExampleData");
if (btnExampleData) {
    btnExampleData.addEventListener("click", () => {
        if (allRecords.length > 0) {
            if (!confirm("Data sudah ada. Tambahkan contoh data (hanya di memori)?")) return;
        }

        const exampleData = [
            {
                NOAGENDA: "EX001", NOREGISTRASI: "REG001", TGLMOHON: "2026-01-15",
                IDPEL: "123456789", NAMA: "Budi Santoso",
                ALAMAT: "Jl. Merdeka No. 10, Jakarta",
                NOTELPPEMOHON: "021-1234567", NOTELPHPPEMOHON: "081234567890",
                JENISTRANSAKSI: "PASANG BARU", TARIF: "R1", DAYA: 2200,
                TOTALBIAYA: 2500000, TGLBAYAR: "2026-01-20",
                DURASIHARIKERJA: 5, STATUSPERMOHONAN: "SELESAI",
                TGLNYALA: "2026-01-30", PROGRES_CATATAN: "Selesai dipasang",
            },
            {
                NOAGENDA: "EX002", NOREGISTRASI: "REG002", TGLMOHON: "2026-02-10",
                IDPEL: "987654321", NAMA: "Siti Rahayu",
                ALAMAT: "Jl. Sudirman No. 25, Bandung",
                NOTELPPEMOHON: "022-7654321", NOTELPHPPEMOHON: "081298765432",
                JENISTRANSAKSI: "PERUBAHAN DAYA",
                TARIFLAMA: "R1", DAYALAMA: 900, TARIF: "R2", DAYA: 2200,
                TOTALBIAYA: 1500000, TGLBAYAR: "2026-02-15",
                DURASIHARIKERJA: 3, STATUSPERMOHONAN: "BAYAR",
                PROGRES_CATATAN: "Menunggu jadwal pemasangan",
            },
            {
                NOAGENDA: "EX003", NOREGISTRASI: "REG003", TGLMOHON: "2026-03-05",
                IDPEL: "555444333", NAMA: "Ahmad Hidayat",
                ALAMAT: "Jl. Gatot Subroto No. 5, Surabaya",
                NOTELPPEMOHON: "031-9876543", NOTELPHPPEMOHON: "081399887766",
                JENISTRANSAKSI: "PENERANGAN SEMENTARA",
                TARIF: "S1", DAYA: 5500, TOTALBIAYA: 5000000,
                STATUSPERMOHONAN: "MOHON", PROGRES_CATATAN: "Dokumen sedang diproses",
            },
            {
                NOAGENDA: "EX004", NOREGISTRASI: "REG004", TGLMOHON: "2026-01-20",
                IDPEL: "222333444", NAMA: "Dewi Lestari",
                ALAMAT: "Jl. Pemuda No. 12, Yogyakarta",
                NOTELPPEMOHON: "0274-123456", NOTELPHPPEMOHON: "081234987654",
                JENISTRANSAKSI: "PASANG BARU", TARIF: "R1", DAYA: 1300,
                TOTALBIAYA: 1800000, STATUSPERMOHONAN: "PDL AWAL",
                PROGRES_CATATAN: "Survey lokasi selesai",
            },
        ];

        const map = new Map(allRecords.map((r) => [recordUid(r), r]));
        let added = 0;
        exampleData.forEach((rec) => {
            const uid = recordUid(rec);
            if (!map.has(uid)) {
                map.set(uid, rec);
                added++;
            }
        });

        allRecords = Array.from(map.values());
        lastImportInfo = {
            when: new Date().toISOString(),
            files: ["Contoh Data"],
            added: added,
            updated: 0,
        };
        renderAll();
        alert("Berhasil menambahkan " + added + " data contoh (hanya di memori).");
    });
}

function tickToday() {
    const todayLabel = document.getElementById("todayLabel");
    if (todayLabel) todayLabel.textContent = todayIndo();
}
tickToday();
setInterval(tickToday, 30000);

// ================================================================
// INIT
// ================================================================
(async function initApp() {
    try {
        await loadServerData();
        renderAll();   // ✅ render HANYA di sini
        console.log("✅ Aplikasi berhasil diinisialisasi.");
    } catch (error) {
        console.error("❌ Gagal menginisialisasi aplikasi:", error);
    }
})();