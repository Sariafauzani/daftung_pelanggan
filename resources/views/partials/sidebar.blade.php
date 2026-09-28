    <!-- ===== SIDEBAR ===== -->
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <aside class="sidebar" id="sidebar">
        <button class="sidebar-close-btn" id="sidebarCloseBtn">✕</button>

        <div class="sidebar-brand">
            <div class="brand-mark">DP</div>
            <div class="brand-text">
                <b>Sistem Daftung</b>
                <span>Data Pelayanan Pelanggan</span>
            </div>
        </div>

        <nav class="sidebar-nav">
            <div class="nav-item active" data-view="dashboard">
                <i class="fas fa-th-large"></i> Dashboard
            </div>
            <div class="nav-item" data-view="data" id="dataMenuToggle">
                <i class="fas fa-table"></i> Data
                <span class="nav-arrow"><i class="fas fa-chevron-down"></i></span>
            </div>
            <div class="nav-sub open" id="dataSubMenu">
                <div class="nav-sub-item active" data-subview="PASANG_BARU">
                    <i class="fas fa-plus-circle"></i> Pasang Baru
                </div>
                <div class="nav-sub-item" data-subview="PERUBAHAN_DAYA">
                    <i class="fas fa-exchange-alt"></i> Perubahan Daya
                </div>
                <div class="nav-sub-item" data-subview="PENERANGAN_SEMENTARA">
                    <i class="fas fa-bolt"></i> Penerangan Sementara
                </div>
            </div>
        </nav>

        <div class="sidebar-footer">Total data: <b id="sfTotal">0</b> baris</div>
    </aside>
