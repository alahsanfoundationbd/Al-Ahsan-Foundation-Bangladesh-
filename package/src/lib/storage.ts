import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export interface SiteSettings {
  siteName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  facebookUrl: string;
  youtubeUrl: string;
  whatsappNumber: string;
  noticeText: string;
  showNotice: boolean;
  theme: {
    navbarBg: string;
    navbarText: string;
    navHoverColor: string;
    primaryButtonBg: string;
    primaryButtonText: string;
    footerBg: string;
    footerText: string;
    accentColor: string;
  };
}

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  order: number;
  visible: boolean;
  color?: string;
  submenu?: {
    id: string;
    label: string;
    href: string;
  }[];
}

export interface ImageOverride {
  id: string;
  originalPath: string;
  customUrl: string;
  updatedAt: string;
}

export interface FinanceRecord {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  donorOrReceiver: string;
  description: string;
  paymentMethod: string;
  referenceNo?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  priority: 'normal' | 'urgent';
  active: boolean;
  createdAt: string;
  expiresAt?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  occupation: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'আল আহসান ফাউন্ডেশন বাংলাদেশ',
  tagline: 'মানবতার সেবায় নিবেদিত এক বিশ্বস্ত প্ল্যাটফর্ম',
  phone: '+৮৮০ ১৭০০-০০০০০০',
  email: 'info@alahsanfoundationbd.org',
  address: 'দেওয়ানগঞ্জ, জামালপুর, বাংলাদেশ',
  facebookUrl: 'https://facebook.com',
  youtubeUrl: 'https://youtube.com',
  whatsappNumber: '+৮৮০১৭০০০০০০০০',
  noticeText: 'জরুরি নোটিশ: শীতার্ত ও বন্যাদুর্গত মানুষের মাঝে ত্রাণ বিতরণ কার্যক্রম চলমান। আপনার যাকাত ও অনুদান পাঠান।',
  showNotice: true,
  theme: {
    navbarBg: '#ffffff',
    navbarText: '#1f2937',
    navHoverColor: '#10b981',
    primaryButtonBg: '#10b981',
    primaryButtonText: '#ffffff',
    footerBg: '#0f172a',
    footerText: '#e2e8f0',
    accentColor: '#059669',
  },
};

const DEFAULT_MENU: MenuItem[] = [
  { id: '1', label: 'হোম', href: '/', order: 1, visible: true },
  {
    id: '2',
    label: 'আমাদের কার্যক্রম',
    href: '#',
    order: 2,
    visible: true,
    submenu: [
      { id: '2-1', label: 'কার্যক্রম সমূহ', href: '/cause' },
      { id: '2-2', label: 'কার্যক্রমের বিবরণ', href: '/cause/cause-1' },
    ],
  },
  {
    id: '3',
    label: 'ইভেন্ট',
    href: '#',
    order: 3,
    visible: true,
    submenu: [
      { id: '3-1', label: 'ইভেন্ট সমূহ', href: '/events' },
      { id: '3-2', label: 'ইভেন্টের বিবরণ', href: '/events/event-1' },
    ],
  },
  {
    id: '4',
    label: 'ব্লগ',
    href: '#',
    order: 4,
    visible: true,
    submenu: [
      { id: '4-1', label: 'ব্লগ সমূহ', href: '/blog' },
      { id: '4-2', label: 'ব্লগের বিবরণ', href: '/blog/blog_1' },
    ],
  },
  { id: '5', label: 'যোগাযোগ', href: '/contact', order: 5, visible: true },
  { id: '6', label: 'ডকুমেন্ট', href: '/documentation#version', order: 6, visible: true },
];

const DEFAULT_FINANCE: FinanceRecord[] = [
  {
    id: 'fin-1',
    type: 'income',
    category: 'যাকাত তহবিল',
    amount: 50000,
    date: '2026-11-10',
    donorOrReceiver: 'নাম প্রকাশে অনিচ্ছুক শুভাকাঙ্ক্ষী',
    description: 'শীতার্তদের শীতবস্ত্র ও খাদ্য সামগ্রী ক্রয়ের জন্য যাকাত',
    paymentMethod: 'বিকাশ / ব্যাংক',
    referenceNo: 'TXN-984210',
  },
  {
    id: 'fin-2',
    type: 'income',
    category: 'সাধারণ অনুদান',
    amount: 25000,
    date: '2026-11-12',
    donorOrReceiver: 'প্রবাসী কল্যাণ তহবিল',
    description: 'এতিম শিশুদের শিক্ষা উপকরণ সামগ্রী বিতরণ',
    paymentMethod: 'ব্যাংক ট্রান্সফার',
    referenceNo: 'TXN-773129',
  },
  {
    id: 'fin-3',
    type: 'expense',
    category: 'ত্রাণ বিতরণ',
    amount: 42000,
    date: '2026-11-13',
    donorOrReceiver: 'জামালপুর স্থানীয় বিতরণ দল',
    description: '২০০ কম্বল এবং জরুরি শুকনা খাদ্য বিতরণ খরচ',
    paymentMethod: 'নগদ',
    referenceNo: 'EXP-1002',
  },
  {
    id: 'fin-4',
    type: 'expense',
    category: 'শিক্ষা সহায়তা',
    amount: 15000,
    date: '2026-11-14',
    donorOrReceiver: 'মাদ্রাসা ও এতিমখানা শিক্ষার্থী',
    description: '৫০ জন শিক্ষার্থীর বার্ষিক খাতা, কলম ও বই ক্রয়',
    paymentMethod: 'ব্যাংক',
    referenceNo: 'EXP-1003',
  },
];

const DEFAULT_NOTICES: Notice[] = [
  {
    id: 'not-1',
    title: 'শীতার্ত মানুষের পাশে দাঁড়ান — শীতবস্ত্র বিতরণ ক্যাম্পেইন ২০২৬',
    content: 'উত্তরবঙ্গের প্রত্যন্ত এলাকায় শীতার্ত অসহায় মানুষের মাঝে কম্বল ও গরম কাপড় বিতরণ কার্যক্রম শুরু হয়েছে। আপনারা মুক্তহস্তে দান করুন।',
    priority: 'urgent',
    active: true,
    createdAt: '2026-11-10',
  },
  {
    id: 'not-2',
    title: 'নতুন ভলান্টিয়ার বা স্বেচ্ছাসেবক নিবন্ধন আহ্বান',
    content: 'মানবতার সেবায় কাজ করতে আগ্রহী তরুণ-তরুণীদের আমাদের ফাউন্ডেশনের সাথে যুক্ত হতে আহ্বান জানানো হচ্ছে।',
    priority: 'normal',
    active: true,
    createdAt: '2026-11-12',
  },
];

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJson<T>(filename: string, fallback: T): T {
  ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
  }
  return fallback;
}

function writeJson<T>(filename: string, data: T): void {
  ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  getSettings: (): SiteSettings => readJson<SiteSettings>('settings.json', DEFAULT_SETTINGS),
  saveSettings: (settings: SiteSettings) => writeJson('settings.json', settings),

  getMenu: (): MenuItem[] => readJson<MenuItem[]>('menu.json', DEFAULT_MENU),
  saveMenu: (menu: MenuItem[]) => writeJson('menu.json', menu),

  getImages: (): ImageOverride[] => readJson<ImageOverride[]>('images.json', []),
  saveImages: (images: ImageOverride[]) => writeJson('images.json', images),
  setCustomImage: (originalPath: string, customUrl: string) => {
    const list = readJson<ImageOverride[]>('images.json', []);
    const existingIndex = list.findIndex((img) => img.originalPath === originalPath);
    if (existingIndex >= 0) {
      list[existingIndex] = {
        id: list[existingIndex].id,
        originalPath,
        customUrl,
        updatedAt: new Date().toISOString(),
      };
    } else {
      list.push({
        id: 'img-' + Date.now(),
        originalPath,
        customUrl,
        updatedAt: new Date().toISOString(),
      });
    }
    writeJson('images.json', list);
    return list;
  },

  getFinance: (): FinanceRecord[] => readJson<FinanceRecord[]>('finance.json', DEFAULT_FINANCE),
  saveFinance: (records: FinanceRecord[]) => writeJson('finance.json', records),
  addFinance: (rec: Omit<FinanceRecord, 'id'>) => {
    const list = readJson<FinanceRecord[]>('finance.json', DEFAULT_FINANCE);
    const newRecord: FinanceRecord = { ...rec, id: 'fin-' + Date.now() };
    list.unshift(newRecord);
    writeJson('finance.json', list);
    return newRecord;
  },
  deleteFinance: (id: string) => {
    let list = readJson<FinanceRecord[]>('finance.json', DEFAULT_FINANCE);
    list = list.filter((r) => r.id !== id);
    writeJson('finance.json', list);
  },

  getNotices: (): Notice[] => readJson<Notice[]>('notices.json', DEFAULT_NOTICES),
  saveNotices: (notices: Notice[]) => writeJson('notices.json', notices),
  addNotice: (not: Omit<Notice, 'id' | 'createdAt'>) => {
    const list = readJson<Notice[]>('notices.json', DEFAULT_NOTICES);
    const newNotice: Notice = {
      ...not,
      id: 'not-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    list.unshift(newNotice);
    writeJson('notices.json', list);
    return newNotice;
  },
  deleteNotice: (id: string) => {
    let list = readJson<Notice[]>('notices.json', DEFAULT_NOTICES);
    list = list.filter((n) => n.id !== id);
    writeJson('notices.json', list);
  },

  getVolunteers: (): Volunteer[] => readJson<Volunteer[]>('volunteers.json', []),
  saveVolunteers: (volunteers: Volunteer[]) => writeJson('volunteers.json', volunteers),
  addVolunteer: (vol: Omit<Volunteer, 'id' | 'appliedAt' | 'status'>) => {
    const list = readJson<Volunteer[]>('volunteers.json', []);
    const newVol: Volunteer = {
      ...vol,
      id: 'vol-' + Date.now(),
      status: 'pending',
      appliedAt: new Date().toISOString().split('T')[0],
    };
    list.unshift(newVol);
    writeJson('volunteers.json', list);
    return newVol;
  },
};
