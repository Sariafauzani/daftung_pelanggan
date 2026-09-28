        <!-- ===== DATA VIEW ===== -->
        <div class="view" id="view-data">
            <!-- Toolbar -->
            <div class="toolbar">
                <button class="btn btn-primary file-btn">
                    <i class="fas fa-upload"></i> Import Excel
                    <input type="file" id="fileInput" accept=".xlsx,.xls" multiple />
                </button>
                <button class="btn btn-success" id="btnDownloadAll">
                    <i class="fas fa-download"></i> Download Data
                </button>
                <button class="btn btn-danger" id="btnReset">
                    <i class="fas fa-trash"></i> Hapus Semua
                </button>
                {{-- <div class="spacer"></div>
                <div class="last-import" id="lastImportLabel">Belum ada data</div> --}}
            </div>

            <!-- Data Sections -->
            <div id="dataSectionContainer">
                <div class="section" id="section-PASANG_BARU"></div>
                <div class="section" id="section-PERUBAHAN_DAYA"></div>
                <div class="section" id="section-PENERANGAN_SEMENTARA"></div>
            </div>

            <div class="note-box" id="dataDiagnostic" style="display: none"></div>
        </div>
        </div>
        </main>
