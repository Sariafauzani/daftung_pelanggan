    <!-- ===== MAIN CONTENT ===== -->
    <main class="main" id="mainContent">
        <!-- Topbar -->
        <div class="topbar">
            <div class="topbar-left">
                <h1 id="pageTitle">
                    Dashboard Daftar Tunggu Pelayanan Pelanggan PLN ULP Gedangan
                </h1>
                <div class="sub" id="pageSub">
                    Ringkasan seluruh data permohonan pelanggan
                </div>
            </div>
            <div class="today-pill">
                <span class="dot"></span>
                <span id="todayLabel">
                    {{ now()->locale('id')->translatedFormat('l, j F Y') }}
                </span>
            </div>
        </div>
