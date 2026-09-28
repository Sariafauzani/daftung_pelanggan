      <div class="content">
          <!-- ===== DASHBOARD VIEW ===== -->
          <div class="view active" id="view-dashboard">
              <!-- EMPTY STATE -->
              <div class="empty-state" id="emptyState">
                  <div class="empty-state-icon">
                      <i class="fas fa-file-excel"></i>
                  </div>
                  <h2>Belum Ada Data</h2>
                  <p>
                      Mulai dengan mengimpor file Excel untuk melihat analisis dan
                      grafik permohonan pelanggan.
                  </p>
                  <div class="empty-state-actions">
                      <button class="btn btn-primary file-btn">
                          <i class="fas fa-upload"></i> Import Excel
                          <input type="file" id="fileInputDashboard" accept=".xlsx,.xls" multiple />
                      </button>
                      <!-- <button class="btn btn-ghost" id="btnExampleData">
                <i class="fas fa-database"></i> Contoh Data
              </button> -->
                  </div>
                  <div class="empty-state-hint">
                      <i class="fas fa-info-circle"></i>
                      Format: Excel (.xlsx, .xls) dengan kolom sesuai template
                  </div>
              </div>

              <!-- DASHBOARD CONTENT -->
              <div id="dashboardContent" style="display: none">
                  <!-- Date Filter -->
                  <div class="date-filter-dashboard">
                      <div class="df-label">
                          <i class="fas fa-calendar-alt"></i> Filter Tanggal
                      </div>
                      <div class="df-controls">
                          <input type="date" id="dashDateFrom" />
                          <span style="color: #94a3b8; font-size: 12px">sampai</span>
                          <input type="date" id="dashDateTo" />
                          <button class="df-apply" id="dashDateApply">
                              <i class="fas fa-check"></i> Terapkan
                          </button>
                          <button class="df-reset" id="dashDateReset">
                              <i class="fas fa-undo"></i> Hapus Filter
                          </button>
                      </div>
                      <div class="df-info" id="dashDateInfo">
                          Menampilkan <strong id="dashDateCount">0</strong> data
                      </div>
                  </div>

                  <!-- Quick Import Bar -->
                  <div class="quick-import-bar">
                      <span class="data-info">
                          <i class="fas fa-database"></i>
                          Total: <strong id="totalDataDash">0</strong> data
                      </span>
                      <button class="btn btn-sm btn-primary file-btn">
                          <i class="fas fa-upload"></i> Import
                          <input type="file" id="fileInputDashboardQuick" accept=".xlsx,.xls" multiple />
                      </button>
                      <button class="btn btn-sm btn-danger" id="btnResetDashboard">
                          <i class="fas fa-trash"></i> Reset Data
                      </button>
                      <button class="btn btn-sm btn-ghost" id="btnGoToData">
                          <i class="fas fa-table"></i> Kelola Data
                      </button>
                      <span class="last-update" id="lastUpdateDash">-</span>
                  </div>

                  <!-- Stat Cards -->
                  <div class="stat-grid">
                      <div class="stat-card accent-a">
                          <div class="lbl">Pasang Baru</div>
                          <div class="val" id="statPasangBaru">0</div>
                          <div class="sub">Total permohonan</div>
                      </div>
                      <div class="stat-card accent-b">
                          <div class="lbl">Perubahan Daya</div>
                          <div class="val" id="statPerubahanDaya">0</div>
                          <div class="sub">Total permohonan</div>
                      </div>
                      <div class="stat-card accent-c">
                          <div class="lbl">Penerangan Sementara</div>
                          <div class="val" id="statPenerangan">0</div>
                          <div class="sub">Total permohonan</div>
                      </div>
                  </div>

                  <!-- Status Legend -->
                  <div class="status-legend" id="statusLegend"></div>

                  <!-- Charts Row 1 -->
                  <div class="chart-grid">
                      <div class="chart-card">
                          <h3>
                              <i class="fas fa-chart-bar"></i> Total Permohonan per Jenis
                          </h3>
                          <div class="chart-sub">
                              Jumlah permohonan berdasarkan jenis transaksi
                          </div>
                          <canvas id="chartTotalJenis"></canvas>
                          <div class="chart-placeholder" id="placeholderTotalJenis">
                              <div class="spinner"></div>
                              <span>Memuat...</span>
                          </div>
                      </div>
                      <div class="chart-card">
                          <h3>
                              <i class="fas fa-chart-line"></i> Tren Status Permohonan
                          </h3>
                          <div class="chart-sub">
                              Distribusi status permohonan dari terendah hingga tertinggi
                          </div>
                          <canvas id="chartStatusOverall"></canvas>
                          <div class="chart-placeholder" id="placeholderStatusOverall">
                              <div class="spinner"></div>
                              <span>Memuat...</span>
                          </div>
                      </div>
                  </div>

                  <!-- Chart: Status per Jenis -->
                  <div class="chart-grid-3">
                      <div class="chart-card">
                          <h3><i class="fas fa-plus-circle"></i> Status — Pasang Baru</h3>
                          <div class="chart-sub">
                              Distribusi status permohonan Pasang Baru
                          </div>
                          <canvas id="chartStatusPasangBaru"></canvas>
                          <div class="chart-placeholder" id="placeholderStatusPasangBaru">
                              <div class="spinner"></div>
                              <span>Memuat...</span>
                          </div>
                      </div>
                      <div class="chart-card">
                          <h3>
                              <i class="fas fa-exchange-alt"></i> Status — Perubahan Daya
                          </h3>
                          <div class="chart-sub">
                              Distribusi status permohonan Perubahan Daya
                          </div>
                          <canvas id="chartStatusPerubahanDaya"></canvas>
                          <div class="chart-placeholder" id="placeholderStatusPerubahanDaya">
                              <div class="spinner"></div>
                              <span>Memuat...</span>
                          </div>
                      </div>
                      <div class="chart-card">
                          <h3>
                              <i class="fas fa-bolt"></i> Status — Penerangan Sementara
                          </h3>
                          <div class="chart-sub">
                              Distribusi status permohonan Penerangan Sementara
                          </div>
                          <canvas id="chartStatusPeneranganSementara"></canvas>
                          <div class="chart-placeholder" id="placeholderStatusPeneranganSementara">
                              <div class="spinner"></div>
                              <span>Memuat...</span>
                          </div>
                      </div>
                  </div>

                  <!-- Charts Row: Pie + Avg Durasi -->
                  <div class="chart-grid-special">
                      <div class="chart-card">
                          <h3>
                              <i class="fas fa-chart-pie"></i> Komposisi Jenis Transaksi
                          </h3>
                          <div class="chart-sub">
                              Proporsi masing-masing jenis transaksi
                          </div>
                          <canvas id="chartJenisPie"></canvas>
                          <div class="chart-placeholder" id="placeholderJenisPie">
                              <div class="spinner"></div>
                              <span>Memuat...</span>
                          </div>
                      </div>
                      <div class="chart-card">
                          <h3><i class="fas fa-clock"></i> Rata-rata Durasi Kerja</h3>
                          <div class="chart-sub">
                              Rata-rata waktu penyelesaian per jenis transaksi
                          </div>
                          <canvas id="chartAvgDurasi"></canvas>
                          <div class="chart-placeholder" id="placeholderAvgDurasi">
                              <div class="spinner"></div>
                              <span>Memuat...</span>
                          </div>
                      </div>
                  </div>

                  <!-- Summary -->
                  {{-- <div class="chart-card summary-card">
                      <h3><i class="fas fa-trophy"></i> Ringkasan Kinerja</h3>
                      <div class="summary-grid" id="summaryGrid">
                          <div class="summary-item accent-purple">
                              <div class="value" id="avgDurasiAll">
                                  0 <span class="unit">hari</span>
                              </div>
                              <div class="label">Rata-rata Penyelesaian</div>
                          </div>
                          <div class="summary-item accent-blue">
                              <div class="value" id="avgDurasiBulan">
                                  0 <span class="unit">hari</span>
                              </div>
                              <div class="label">Rata-rata per Bulan</div>
                          </div>
                          <div class="summary-item accent-green">
                              <div class="value" id="totalSelesai">0</div>
                              <div class="label">Total Selesai</div>
                          </div>
                          <div class="summary-item accent-orange">
                              <div class="value" id="totalBelum">0</div>
                              <div class="label">Total Belum Selesai</div>
                          </div>
                      </div>
                  </div>

                  <!-- Notes -->
                  <div class="note-box">
                      <i class="fas fa-info-circle"></i>
                      <b>Catatan asumsi sistem:</b> Fasa dihitung dari Daya (≤ 5.500 VA
                      = 1 Fasa, ≥ 6.600 VA = 3 Fasa). Belum Bayar = kolom Tanggal Bayar
                      kosong. Selesai = kolom Tanggal Nyala terisi.
                  </div> --}}
              </div>
          </div>
