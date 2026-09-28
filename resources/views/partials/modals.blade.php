        <!-- ===== DETAIL MODAL ===== -->
        <div class="modal-overlay" id="modalOverlay">
            <div class="modal-box">
                <div class="modal-head">
                    <h3 id="modalTitle">Detail Permohonan</h3>
                    <button class="modal-close" id="modalClose">✕</button>
                </div>
                <div class="modal-body">
                    <div class="detail-grid" id="modalGrid"></div>
                </div>
                <div class="modal-foot" id="modalFoot">
                    <button class="btn btn-ghost" id="modalCancelBtn">Tutup</button>
                </div>
            </div>
        </div>

        <!-- ===== EDIT MODAL ===== -->
        <div class="modal-overlay" id="editModalOverlay">
            <div class="modal-box">
                <div class="modal-head">
                    <h3>Edit Progres</h3>
                    <button class="modal-close" id="editModalClose">✕</button>
                </div>
                <div class="modal-body">
                    <div class="detail-grid" style="grid-template-columns: 1fr 1fr">
                        <div class="detail-item">
                            <div class="k">IDPEL</div>
                            <div class="v"><input type="text" id="editIdpel" disabled /></div>
                        </div>
                        <div class="detail-item">
                            <div class="k">Nama</div>
                            <div class="v"><input type="text" id="editNama" disabled /></div>
                        </div>
                        <div class="detail-item" style="grid-column: 1 / -1">
                            <div class="k">Alamat</div>
                            <div class="v">
                                <input type="text" id="editAlamat" disabled />
                            </div>
                        </div>
                        <div class="detail-item" style="grid-column: 1 / -1">
                            <div class="k">Catatan Progres</div>
                            <div class="v">
                                <textarea id="editProgressText" rows="3" placeholder="Tulis catatan progres..."></textarea>
                            </div>
                        </div>
                        <div class="detail-item" style="grid-column: 1 / -1; border: none; padding: 0">
                            <div class="k">Update terakhir</div>
                            <div class="v" id="editLastUpdate">-</div>
                        </div>
                    </div>
                </div>
                <div class="modal-foot">
                    <button class="btn btn-ghost" id="editModalCancel">Batal</button>
                    <button class="btn btn-primary" id="editModalSave">Simpan</button>
                </div>
            </div>
        </div>
