// Porto Photo Studio - Shared State Management
const PPS = {
  // Simulated database stored in localStorage
  getData(key) {
    try { return JSON.parse(localStorage.getItem('pps_' + key)) || null; } 
    catch { return null; }
  },
  setData(key, val) {
    localStorage.setItem('pps_' + key, JSON.stringify(val));
  },

  // Initialize demo data
  init() {
    if (!this.getData('initialized')) {
      this.setData('reservations', [
        { id: 'TRX-001', name: 'Budi Santoso', email: 'budi@email.com', date: '2026-06-10', time: '10:00', package: 'Basic Package', pax: 2, backdrop: 'White', payment_method: 'QRIS', payment_status: 'Lunas', session_status: 'Belum', bank: 'BCA', amount: 150000 },
        { id: 'TRX-002', name: 'Siti Rahayu', email: 'siti@email.com', date: '2026-06-10', time: '13:00', package: 'Panitia Hour', pax: 8, backdrop: 'Blue', payment_method: 'Cash', payment_status: 'Menunggu', session_status: 'Belum', bank: '', amount: 400000 },
        { id: 'TRX-003', name: 'Andi Wijaya', email: 'andi@email.com', date: '2026-06-11', time: '09:00', package: 'Basic Package', pax: 1, backdrop: 'Gray', payment_method: 'QRIS', payment_status: 'Lunas', session_status: 'Sudah', bank: 'Mandiri', amount: 100000 },
        { id: 'TRX-004', name: 'Dewi Lestari', email: 'dewi@email.com', date: '2026-06-12', time: '15:00', package: 'Basic Package', pax: 3, backdrop: 'Black', payment_method: 'Transfer', payment_status: 'Lunas', session_status: 'Belum', bank: 'BNI', amount: 200000 },
        { id: 'TRX-005', name: 'Rizky Pratama', email: 'rizky@email.com', date: '2026-06-13', time: '11:00', package: 'Panitia Hour', pax: 15, backdrop: 'White', payment_method: 'Transfer', payment_status: 'Menunggu', session_status: 'Belum', bank: 'BRI', amount: 600000 },
      ]);
      this.setData('inventory', [
        { id: 'INV-001', name: 'Baterai AA', qty: 4, unit: 'pcs', category: 'Elektronik', last_updated: '2026-06-01', min_stock: 10, max_price: 50000 },
        { id: 'INV-002', name: 'Kertas Foto 4R', qty: 120, unit: 'lembar', category: 'Cetak', last_updated: '2026-06-05', min_stock: 50, max_price: 150000 },
        { id: 'INV-003', name: 'Tinta Printer', qty: 2, unit: 'botol', category: 'Cetak', last_updated: '2026-05-28', min_stock: 3, max_price: 200000 },
        { id: 'INV-004', name: 'Backdrop White', qty: 1, unit: 'lembar', category: 'Studio', last_updated: '2026-05-15', min_stock: 2, max_price: 300000 },
        { id: 'INV-005', name: 'Lampu LED Studio', qty: 4, unit: 'buah', category: 'Studio', last_updated: '2026-04-10', min_stock: 2, max_price: 500000 },
        { id: 'INV-006', name: 'Memory Card 64GB', qty: 3, unit: 'buah', category: 'Elektronik', last_updated: '2026-05-20', min_stock: 2, max_price: 250000 },
      ]);
      this.setData('procurement', [
        { id: 'PRO-001', item: 'Baterai AA', price_per_pcs: 8000, qty: 20, total: 160000, reason: 'Stok habis, operasional terhenti', requester: 'Karyawan Studio', status: 'Approved Otomatis', date: '2026-06-07', approver: 'System', executed: false, category: 'Rutin' },
        { id: 'PRO-002', item: 'Flash Eksternal Godox', price_per_pcs: 1200000, qty: 1, total: 1200000, reason: 'Flash lama rusak, perlu penggantian', requester: 'Head Studio', status: 'Pending Finance', date: '2026-06-06', approver: '', executed: false, category: 'Non-Rutin' },
        { id: 'PRO-003', item: 'Kertas Foto 4R (500 lembar)', price_per_pcs: 120000, qty: 3, total: 360000, reason: 'Stok menipis, perlu restock bulanan', requester: 'Karyawan Studio', status: 'Approved Otomatis', date: '2026-06-05', approver: 'System', executed: true, category: 'Rutin' },
        { id: 'PRO-004', item: 'Tinta Printer Canon', price_per_pcs: 180000, qty: 5, total: 900000, reason: 'Restock tinta bulanan', requester: 'Head Studio', status: 'Pending Finance', date: '2026-06-04', approver: '', executed: false, category: 'Rutin' },
      ]);
      this.setData('users', [
        { email: 'admin@portophoto.id', password: 'admin123', role: 'Admin', name: 'Ariel Dwi' },
        { email: 'finance@portophoto.id', password: 'finance123', role: 'Finance', name: 'Putu Widiastini' },
        { email: 'manager@portophoto.id', password: 'manager123', role: 'Manager', name: 'Adiyaksa M.' },
      ]);
      this.setData('initialized', true);
    }
  },

  // Auth helpers
  login(email, password) {
    const users = this.getData('users') || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) { this.setData('current_user', user); return user; }
    return null;
  },
  logout() { localStorage.removeItem('pps_current_user'); },
  currentUser() { return this.getData('current_user'); },
};

PPS.init();
