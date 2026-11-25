export type GameCategory = 'Mobile' | 'PC & Konsol' | 'Voucher';

export interface TopUpPackage {
  id: string;
  name: string;
  currencyAmount: string;
  bonus?: string;
  price: number;
  tag?: string;
}

export interface GameProduct {
  id: string;
  slug: string;
  title: string;
  publisher: string;
  category: GameCategory;
  currencyName: string;
  processTime: string;
  tag?: string;
  accentHex: string;
  secondaryHex: string;
  imageSrc: string;
  idLabel: string;
  idPlaceholder: string;
  exampleId: string;
  requiresZone?: boolean;
  zoneLabel?: string;
  zonePlaceholder?: string;
  exampleZone?: string;
  serverOptions?: string[];
  guideText: string;
  packages: TopUpPackage[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  group: 'QRIS' | 'E-Wallet' | 'Virtual Account' | 'Gerai Retail';
  feeFlat: number;
  feePercent: number;
  accountPrefix: string;
  settlementNote: string;
}

export interface PromoCode {
  code: string;
  description: string;
  type: 'flat' | 'percent';
  value: number;
  maxDiscount?: number;
  minSpend: number;
}

export type OrderStatus = 'Menunggu Pembayaran' | 'Diproses' | 'Berhasil Dikirim';

export interface OrderRecord {
  invoiceId: string;
  createdAt: string;
  gameId: string;
  gameTitle: string;
  packageName: string;
  quantity: number;
  userId: string;
  zoneOrServer?: string;
  whatsapp: string;
  paymentMethodId: string;
  paymentMethodName: string;
  paymentCode: string;
  subtotal: number;
  fee: number;
  discount: number;
  total: number;
  promoCode?: string;
  status: OrderStatus;
  voucherPin?: string;
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculatePaymentFee(subtotal: number, method: PaymentMethod): number {
  const percentFee = Math.round((subtotal * method.feePercent) / 100);
  return method.feeFlat + percentFee;
}

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'RINZBARU',
    description: 'Potongan Rp 3.000 untuk transaksi minimal Rp 20.000',
    type: 'flat',
    value: 3000,
    minSpend: 20000,
  },
  {
    code: 'DIAMOND5',
    description: 'Diskon 5% hingga Rp 10.000 untuk transaksi minimal Rp 50.000',
    type: 'percent',
    value: 5,
    maxDiscount: 10000,
    minSpend: 50000,
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'qris',
    name: 'QRIS (Semua E-Wallet & Mobile Banking)',
    group: 'QRIS',
    feeFlat: 0,
    feePercent: 0.7,
    accountPrefix: 'QRIS-RNZ',
    settlementNote: 'Scan kode QR melalui GoPay, DANA, OVO, ShopeePay, atau m-Banking.',
  },
  {
    id: 'dana',
    name: 'DANA',
    group: 'E-Wallet',
    feeFlat: 0,
    feePercent: 1.5,
    accountPrefix: '0812-9000',
    settlementNote: 'Verifikasi otomatis melalui aplikasi DANA Anda.',
  },
  {
    id: 'gopay',
    name: 'GoPay',
    group: 'E-Wallet',
    feeFlat: 0,
    feePercent: 1.5,
    accountPrefix: '0812-9000',
    settlementNote: 'Pembayaran instan langsung terhubung ke saldo GoPay.',
  },
  {
    id: 'ovo',
    name: 'OVO',
    group: 'E-Wallet',
    feeFlat: 0,
    feePercent: 1.5,
    accountPrefix: '0812-9000',
    settlementNote: 'Masukkan nomor OVO atau bayar lewat notifikasi push.',
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay',
    group: 'E-Wallet',
    feeFlat: 0,
    feePercent: 1.5,
    accountPrefix: 'SPAY-RNZ',
    settlementNote: 'Checkout cepat memakai saldo ShopeePay.',
  },
  {
    id: 'bca-va',
    name: 'BCA Virtual Account',
    group: 'Virtual Account',
    feeFlat: 3500,
    feePercent: 0,
    accountPrefix: '88008',
    settlementNote: 'Transfer melalui myBCA, BCA Mobile, atau ATM BCA.',
  },
  {
    id: 'mandiri-va',
    name: 'Mandiri Virtual Account',
    group: 'Virtual Account',
    feeFlat: 3500,
    feePercent: 0,
    accountPrefix: '89022',
    settlementNote: 'Bayar melalui Livin by Mandiri atau ATM Mandiri.',
  },
  {
    id: 'bni-va',
    name: 'BNI Virtual Account',
    group: 'Virtual Account',
    feeFlat: 3500,
    feePercent: 0,
    accountPrefix: '88109',
    settlementNote: 'Bayar melalui BNI Mobile Banking atau ATM BNI.',
  },
  {
    id: 'alfamart',
    name: 'Alfamart / Indomaret',
    group: 'Gerai Retail',
    feeFlat: 2500,
    feePercent: 0,
    accountPrefix: 'RNZPAY',
    settlementNote: 'Tunjukkan kode pembayaran ke kasir gerai terdekat.',
  },
];

export const GAMES_CATALOG: GameProduct[] = [
  {
    id: 'mobile-legends',
    slug: 'mobile-legends',
    title: 'Mobile Legends: Bang Bang',
    publisher: 'Moonton',
    category: 'Mobile',
    currencyName: 'Diamonds',
    processTime: '1–3 Detik',
    tag: 'Terlaris',
    accentHex: '#2563EB',
    secondaryHex: '#60A5FA',
    imageSrc: '/assets/aistudio/ab6761610000e5eb1698da6a6a04bf2edc35ed94_77a42982.jfif',
    idLabel: 'User ID',
    idPlaceholder: 'Contoh: 184920312',
    exampleId: '184920312',
    requiresZone: true,
    zoneLabel: 'Zone ID',
    zonePlaceholder: 'Contoh: 2941',
    exampleZone: '2941',
    guideText:
      'Buka Mobile Legends, ketuk foto profil di kiri atas. User ID dan Zone ID (dalam kurung) tertera di bawah nickname Anda.',
    packages: [
      { id: 'ml-wdp', name: 'Weekly Diamond Pass', currencyAmount: '220 Diamonds (7 Hari)', bonus: 'Starlight Points + Bonus Box', price: 27900, tag: 'Hemat' },
      { id: 'ml-86', name: '86 Diamonds', currencyAmount: '78 + 8 Bonus', price: 22500 },
      { id: 'ml-172', name: '172 Diamonds', currencyAmount: '156 + 16 Bonus', price: 44800 },
      { id: 'ml-257', name: '257 Diamonds', currencyAmount: '234 + 23 Bonus', price: 66900 },
      { id: 'ml-514', name: '514 Diamonds', currencyAmount: '468 + 46 Bonus', price: 133500 },
      { id: 'ml-706', name: '706 Diamonds', currencyAmount: '625 + 81 Bonus', price: 181000 },
      { id: 'ml-1412', name: '1412 Diamonds', currencyAmount: '1250 + 162 Bonus', price: 361000 },
      { id: 'ml-2195', name: '2195 Diamonds', currencyAmount: '1860 + 335 Bonus', price: 545000 },
    ],
  },
  {
    id: 'free-fire',
    slug: 'free-fire',
    title: 'Free Fire',
    publisher: 'Garena',
    category: 'Mobile',
    currencyName: 'Diamonds',
    processTime: '1–3 Detik',
    tag: 'Populer',
    accentHex: '#D97706',
    secondaryHex: '#FBBF24',
    imageSrc: '/assets/aistudio/MV5BMTI3MTE3ZGQtNWJmMi00MTAzLWI2MzYtZTFiMDRkMzU0ZjE0XkEyXkFqcGc_._V1_FMjpg_UX1000__e5529f74.jpg',
    idLabel: 'Player ID',
    idPlaceholder: 'Contoh: 2491028491',
    exampleId: '2491028491',
    guideText:
      'Masuk ke lobi Free Fire, ketuk profil di sudut kiri atas, lalu salin Player ID angka yang muncul di bawah nama karakter.',
    packages: [
      { id: 'ff-70', name: '70 Diamonds', currencyAmount: '70 DM', price: 9800 },
      { id: 'ff-140', name: '140 Diamonds', currencyAmount: '140 DM', price: 19200 },
      { id: 'ff-355', name: '355 Diamonds', currencyAmount: '355 DM', price: 47500 },
      { id: 'ff-720', name: '720 Diamonds', currencyAmount: '720 DM', price: 95000 },
      { id: 'ff-1450', name: '1450 Diamonds', currencyAmount: '1450 DM', price: 191000 },
      { id: 'ff-member-w', name: 'Membership Mingguan', currencyAmount: '450 DM Total', bonus: 'Bonus Voucher & Badge', price: 28500, tag: 'Hemat' },
    ],
  },
  {
    id: 'valorant',
    slug: 'valorant',
    title: 'Valorant',
    publisher: 'Riot Games',
    category: 'PC & Konsol',
    currencyName: 'Valorant Points',
    processTime: '1–5 Detik',
    tag: 'Resmi Riot',
    accentHex: '#E11D48',
    secondaryHex: '#FB7185',
    imageSrc: '/assets/aistudio/Valorant_logo_-_pink_color_version.svg_5b4fc14c.webp',
    idLabel: 'Riot ID & Tagline',
    idPlaceholder: 'Contoh: RinzPlayer#ID01',
    exampleId: 'RinzPlayer#ID01',
    guideText:
      'Arahkan kursor ke profil Anda di pojok kanan atas client Valorant untuk melihat Riot ID lengkap beserta tanda #Tagline.',
    packages: [
      { id: 'val-475', name: '475 VP', currencyAmount: '475 Valorant Points', price: 54000 },
      { id: 'val-1000', name: '1000 VP', currencyAmount: '1000 Valorant Points', price: 108000 },
      { id: 'val-2050', name: '2050 VP', currencyAmount: '2050 Valorant Points', price: 215000 },
      { id: 'val-3650', name: '3650 VP', currencyAmount: '3650 Valorant Points', price: 378000 },
      { id: 'val-5350', name: '5350 VP', currencyAmount: '5350 Valorant Points', price: 539000 },
      { id: 'val-11000', name: '11000 VP', currencyAmount: '11000 Valorant Points', price: 1065000 },
    ],
  },
  {
    id: 'pubg-mobile',
    slug: 'pubg-mobile',
    title: 'PUBG Mobile',
    publisher: 'Tencent Games',
    category: 'Mobile',
    currencyName: 'Unknown Cash (UC)',
    processTime: '1–3 Detik',
    accentHex: '#CA8A04',
    secondaryHex: '#FACC15',
    imageSrc: '/assets/aistudio/f3958fd8814bbe41a967f6aaab3ec533396d9b39b9684cb003cdf75461889bdd_600_3a68e0e0.webp',
    idLabel: 'Player ID (ID)',
    idPlaceholder: 'Contoh: 5192837461',
    exampleId: '5192837461',
    guideText:
      'Buka PUBG Mobile, ketuk ikon profil di pojok kanan atas, dan salin angka ID yang terletak di atas avatar Anda.',
    packages: [
      { id: 'pubg-60', name: '60 UC', currencyAmount: '60 Unknown Cash', price: 14500 },
      { id: 'pubg-325', name: '325 UC', currencyAmount: '300 + 25 Bonus', price: 72500 },
      { id: 'pubg-660', name: '660 UC', currencyAmount: '600 + 60 Bonus', price: 145000 },
      { id: 'pubg-1800', name: '1800 UC', currencyAmount: '1500 + 300 Bonus', price: 362000 },
      { id: 'pubg-3850', name: '3850 UC', currencyAmount: '3000 + 850 Bonus', price: 724000 },
    ],
  },
  {
    id: 'genshin-impact',
    slug: 'genshin-impact',
    title: 'Genshin Impact',
    publisher: 'HoYoverse',
    category: 'PC & Konsol',
    currencyName: 'Genesis Crystals',
    processTime: '1–5 Detik',
    accentHex: '#0284C7',
    secondaryHex: '#38BDF8',
    imageSrc: '/assets/aistudio/images__1__f55d33b9.jfif',
    idLabel: 'UID',
    idPlaceholder: 'Contoh: 819204512',
    exampleId: '819204512',
    serverOptions: ['Asia', 'America', 'Europe', 'TW / HK / MO'],
    guideText:
      'UID terlihat di pojok kanan bawah layar permainan. Pastikan wilayah Server sesuai dengan akun HoYoverse Anda.',
    packages: [
      { id: 'gi-welkin', name: 'Blessing of the Welkin Moon', currencyAmount: '300 GC + 2700 Primogems', price: 69500, tag: 'Terlaris' },
      { id: 'gi-300', name: '300 + 30 Genesis Crystals', currencyAmount: '330 GC', price: 69500 },
      { id: 'gi-980', name: '980 + 110 Genesis Crystals', currencyAmount: '1090 GC', price: 215000 },
      { id: 'gi-1980', name: '1980 + 260 Genesis Crystals', currencyAmount: '2240 GC', price: 429000 },
      { id: 'gi-3280', name: '3280 + 600 Genesis Crystals', currencyAmount: '3880 GC', price: 699000 },
      { id: 'gi-6480', name: '6480 + 1600 Genesis Crystals', currencyAmount: '8080 GC', price: 1395000 },
    ],
  },
  {
    id: 'honor-of-kings',
    slug: 'honor-of-kings',
    title: 'Honor of Kings',
    publisher: 'Level Infinite',
    category: 'Mobile',
    currencyName: 'Tokens',
    processTime: '1–3 Detik',
    accentHex: '#2563EB',
    secondaryHex: '#93C5FD',
    imageSrc: '/assets/aistudio/images__2__b0340517.jfif',
    idLabel: 'Player ID',
    idPlaceholder: 'Contoh: 4829103847',
    exampleId: '4829103847',
    guideText:
      'Ketuk avatar profil Anda di pojok kiri atas lobi Honor of Kings, pilih tab Pengaturan atau Profil untuk menyalin Player ID.',
    packages: [
      { id: 'hok-80', name: '80 Tokens', currencyAmount: '80 Tokens', price: 15500 },
      { id: 'hok-240', name: '240 Tokens', currencyAmount: '240 Tokens', price: 46500 },
      { id: 'hok-400', name: '400 Tokens', currencyAmount: '400 Tokens', price: 77000 },
      { id: 'hok-800', name: '800 Tokens', currencyAmount: '800 + 30 Bonus', price: 153000 },
      { id: 'hok-2400', name: '2400 Tokens', currencyAmount: '2400 + 108 Bonus', price: 459000 },
    ],
  },
  {
    id: 'cod-mobile',
    slug: 'cod-mobile',
    title: 'Call of Duty: Mobile',
    publisher: 'Garena',
    category: 'Mobile',
    currencyName: 'COD Points (CP)',
    processTime: '1–3 Detik',
    accentHex: '#475569',
    secondaryHex: '#94A3B8',
    imageSrc: '/assets/aistudio/Call_Of_Duty__2003__Cover_Updated_3f0c7ff4.jpg',
    idLabel: 'OpenID',
    idPlaceholder: 'Contoh: 982104918273',
    exampleId: '982104918273',
    guideText:
      'Masuk ke Settings > Legal and Privacy di Call of Duty Mobile, lalu salin OpenID akun Garena Anda.',
    packages: [
      { id: 'codm-62', name: '62 CP', currencyAmount: '62 COD Points', price: 10000 },
      { id: 'codm-127', name: '127 CP', currencyAmount: '127 COD Points', price: 19800 },
      { id: 'codm-320', name: '320 CP', currencyAmount: '320 COD Points', price: 49500 },
      { id: 'codm-645', name: '645 CP', currencyAmount: '645 COD Points', price: 98500 },
      { id: 'codm-1373', name: '1373 CP', currencyAmount: '1373 COD Points', price: 197000 },
    ],
  },
  {
    id: 'roblox',
    slug: 'roblox',
    title: 'Roblox Digital Gift Card',
    publisher: 'Roblox Corp',
    category: 'Voucher',
    currencyName: 'Robux Voucher',
    processTime: 'Instan',
    accentHex: '#0F766E',
    secondaryHex: '#2DD4BF',
    imageSrc: '/assets/aistudio/Roblox_Logo_2022_f119de94.jpg',
    idLabel: 'Username Roblox',
    idPlaceholder: 'Contoh: RinzGamerID',
    exampleId: 'RinzGamerID',
    guideText:
      'Kode voucher digital akan langsung tampil di halaman invoice dan dikirim ke WhatsApp Anda untuk ditukarkan di roblox.com/redeem.',
    packages: [
      { id: 'rbx-400', name: '400 Robux Gift Card', currencyAmount: 'Voucher 400 Robux', price: 74000 },
      { id: 'rbx-800', name: '800 Robux Gift Card', currencyAmount: 'Voucher 800 Robux', price: 145000 },
      { id: 'rbx-1700', name: '1700 Robux Gift Card', currencyAmount: 'Voucher 1700 Robux', price: 295000 },
      { id: 'rbx-4500', name: '4500 Robux Gift Card', currencyAmount: 'Voucher 4500 Robux', price: 735000 },
    ],
  },
  {
    id: 'steam-wallet',
    slug: 'steam-wallet',
    title: 'Steam Wallet Code IDR',
    publisher: 'Valve',
    category: 'Voucher',
    currencyName: 'Kode Voucher IDR',
    processTime: 'Instan',
    accentHex: '#1D4ED8',
    secondaryHex: '#60A5FA',
    imageSrc: '/assets/aistudio/images_ad9fd556.jfif',
    idLabel: 'Email / Username Penerima',
    idPlaceholder: 'Contoh: akun@email.com',
    exampleId: 'player@rinzstore.id',
    guideText:
      'Kode Steam Wallet IDR resmi langsung tersedia setelah pembayaran selesai. Tukarkan di menu Redeem a Steam Wallet Code.',
    packages: [
      { id: 'stm-12', name: 'Steam Wallet Rp 12.000', currencyAmount: 'Saldo Rp 12.000', price: 13800 },
      { id: 'stm-45', name: 'Steam Wallet Rp 45.000', currencyAmount: 'Saldo Rp 45.000', price: 49500 },
      { id: 'stm-90', name: 'Steam Wallet Rp 90.000', currencyAmount: 'Saldo Rp 90.000', price: 98500 },
      { id: 'stm-250', name: 'Steam Wallet Rp 250.000', currencyAmount: 'Saldo Rp 250.000', price: 268000 },
      { id: 'stm-600', name: 'Steam Wallet Rp 600.000', currencyAmount: 'Saldo Rp 600.000', price: 639000 },
    ],
  },
];

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    invoiceId: 'RNZ-261124-8841',
    createdAt: '24 Nov 2026, 22:45 WIB',
    gameId: 'mobile-legends',
    gameTitle: 'Mobile Legends: Bang Bang',
    packageName: 'Weekly Diamond Pass',
    quantity: 1,
    userId: '184920312',
    zoneOrServer: '2941',
    whatsapp: '0812•••••740',
    paymentMethodId: 'qris',
    paymentMethodName: 'QRIS (Semua E-Wallet & Mobile Banking)',
    paymentCode: 'QRIS-RNZ-8841',
    subtotal: 27900,
    fee: 195,
    discount: 0,
    total: 28095,
    status: 'Berhasil Dikirim',
  },
  {
    invoiceId: 'RNZ-261124-8837',
    createdAt: '24 Nov 2026, 21:18 WIB',
    gameId: 'valorant',
    gameTitle: 'Valorant',
    packageName: '1000 VP',
    quantity: 1,
    userId: 'RinzPlayer#ID01',
    whatsapp: '0856•••••129',
    paymentMethodId: 'bca-va',
    paymentMethodName: 'BCA Virtual Account',
    paymentCode: '880082611248837',
    subtotal: 108000,
    fee: 3500,
    discount: 5400,
    promoCode: 'DIAMOND5',
    total: 106100,
    status: 'Berhasil Dikirim',
  },
  {
    invoiceId: 'RNZ-261124-8829',
    createdAt: '24 Nov 2026, 19:50 WIB',
    gameId: 'steam-wallet',
    gameTitle: 'Steam Wallet Code IDR',
    packageName: 'Steam Wallet Rp 90.000',
    quantity: 1,
    userId: 'player@rinzstore.id',
    whatsapp: '0821•••••308',
    paymentMethodId: 'dana',
    paymentMethodName: 'DANA',
    paymentCode: '0812-9000-8829',
    subtotal: 98500,
    fee: 1478,
    discount: 0,
    total: 99978,
    status: 'Berhasil Dikirim',
    voucherPin: 'RNZ-STM-9K4L-8829-X7Q2',
  },
];
