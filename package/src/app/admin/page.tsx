'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSite } from '@/app/context/SiteContext';

interface FinanceRecord {
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
interface Notice {
  id: string;
  title: string;
  content: string;
  priority: 'normal' | 'urgent';
  active: boolean;
  createdAt: string;
  expiresAt?: string;
}

type Tab = 'overview' | 'theme' | 'menu' | 'notices' | 'finance' | 'media' | 'content';
const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'overview', label: 'ড্যাশবোর্ড', icon: 'ion:grid-outline' },
  { id: 'theme', label: 'রং ও ডিজাইন', icon: 'ion:color-palette-outline' },
  { id: 'menu', label: 'মেনু ব্যবস্থাপনা', icon: 'ion:list-outline' },
  { id: 'notices', label: 'নোটিশ', icon: 'ion:megaphone-outline' },
  { id: 'finance', label: 'আয়-ব্যয় হিসাব', icon: 'ion:wallet-outline' },
  { id: 'media', label: 'ছবি ব্যবস্থাপনা', icon: 'ion:images-outline' },
  { id: 'content', label: 'কনটেন্ট', icon: 'ion:newspaper-outline' },
];
const initialSettings = {
  siteName: 'আল আহসান ফাউন্ডেশন বাংলাদেশ',
  tagline: 'মানবতার সেবায় নিবেদিত এক বিশ্বস্ত প্ল্যাটফর্ম',
  phone: '', email: '', address: '', facebookUrl: '', youtubeUrl: '', whatsappNumber: '',
  noticeText: '', showNotice: true,
  theme: { navbarBg: '#ffffff', navbarText: '#1f2937', navHoverColor: '#10b981', primaryButtonBg: '#10b981', primaryButtonText: '#ffffff', footerBg: '#0f172a', footerText: '#e2e8f0', accentColor: '#059669' },
};
const currency = (n: number) => new Intl.NumberFormat('bn-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(n);

export default function AdminPage() {
  const { data: session, status } = useSession();
  const { settings: siteSettings, menu: siteMenu, updateSettings, updateMenu } = useSite();
  const [tab, setTab] = useState<Tab>('overview');
  const [settings, setSettings] = useState<any>(initialSettings);
  const [menu, setMenu] = useState<any[]>([]);
  const [finance, setFinance] = useState<FinanceRecord[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '', priority: 'normal' as 'normal' | 'urgent' });
  const [financeForm, setFinanceForm] = useState({ type: 'income' as 'income' | 'expense', category: '', amount: '', date: new Date().toISOString().split('T')[0], donorOrReceiver: '', description: '', paymentMethod: 'ব্যাংক / মোবাইল ব্যাংকিং', referenceNo: '' });
  const [uploading, setUploading] = useState(false);

  const user = session?.user as any;
  const allowedEmail = user?.email?.toLowerCase() === 'mdshamimaehsan@gmail.com';
  const isAdmin = user?.role === 'admin' || allowedEmail;

  useEffect(() => {
    if (siteSettings) setSettings(siteSettings);
    if (siteMenu?.length) setMenu(siteMenu);
  }, [siteSettings, siteMenu]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [f, n] = await Promise.all([
        fetch('/api/admin/finance').then((r) => r.json()),
        fetch('/api/admin/notices').then((r) => r.json()),
      ]);
      if (f.success) setFinance(f.data);
      if (n.success) setNotices(n.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) loadAdminData();
  }, [isAdmin]);

  const totals = useMemo(() => finance.reduce((acc, r) => { acc[r.type] += Number(r.amount) || 0; return acc; }, { income: 0, expense: 0 }), [finance]);

  if (status === 'loading') return <main className="min-h-screen flex items-center justify-center pt-28"><p className="text-lg">অ্যাডমিন প্যানেল লোড হচ্ছে...</p></main>;

  if (!session) return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-16 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5 text-emerald-700"><Icon icon="ion:lock-closed-outline" className="text-3xl" /></div>
        <h1 className="text-2xl font-bold text-center text-slate-900">অ্যাডমিন প্যানেলে প্রবেশ</h1>
        <p className="text-slate-500 text-center mt-2 mb-6">শুধুমাত্র অনুমোদিত অ্যাডমিন অ্যাকাউন্ট প্রবেশ করতে পারবেন।</p>
        <button onClick={() => signIn('google', { callbackUrl: '/admin' })} className="w-full rounded-xl bg-white border border-slate-300 text-slate-800 py-3 font-semibold hover:bg-slate-50 flex items-center justify-center gap-2"><Icon icon="logos:google-icon" className="text-lg" /> Gmail দিয়ে প্রবেশ করুন</button>
        <p className="text-xs text-center text-slate-400 mt-4">অ্যাডমিন ইমেইল: mdshamimaehsan@gmail.com</p>
        <Link href="/" className="block text-center text-emerald-700 mt-5 hover:underline">ওয়েবসাইটে ফিরে যান</Link>
      </div>
    </main>
  );

  if (!isAdmin) return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-16 px-4"><div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center"><Icon icon="ion:warning-outline" className="text-5xl text-amber-500 mx-auto" /><h1 className="text-2xl font-bold mt-3">অনুমতি নেই</h1><p className="text-slate-500 mt-2">{user?.email} অ্যাকাউন্টটি অ্যাডমিন হিসেবে অনুমোদিত নয়।</p><button className="mt-6 px-5 py-2 bg-slate-900 text-white rounded-lg" onClick={() => signOut({ callbackUrl: '/admin' })}>অন্য অ্যাকাউন্ট দিয়ে প্রবেশ</button></div></main>
  );

  const saveSettings = async () => {
    await updateSettings(settings);
    setMessage('সাইটের সেটিংস সংরক্ষণ করা হয়েছে।'); setTimeout(() => setMessage(''), 2500);
  };
  const saveMenu = async () => {
    await updateMenu(menu);
    setMessage('মெனু அமைப்புகள் சேமிக்கப்பட்டன'); setTimeout(() => setMessage(''), 2500);
  };
  const addNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/notices', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...noticeForm, active: true }) }).then((r) => r.json());
    if (res.success) { setNotices((prev) => [res.data, ...prev]); setNoticeForm({ title: '', content: '', priority: 'normal' }); setMessage('নোটিশ প্রকাশিত হয়েছে।'); }
  };
  const deleteNotice = async (id: string) => { await fetch(`/api/admin/notices?id=${id}`, { method: 'DELETE' }); setNotices((prev) => prev.filter((x) => x.id !== id)); };
  const addFinance = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/finance', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...financeForm, amount: Number(financeForm.amount) }) }).then((r) => r.json());
    if (res.success) { setFinance((prev) => [res.data, ...prev]); setFinanceForm({ ...financeForm, category: '', amount: '', donorOrReceiver: '', description: '', referenceNo: '' }); setMessage('হিসাবের তথ্য যুক্ত হয়েছে।'); }
  };
  const deleteFinance = async (id: string) => { await fetch(`/api/admin/finance?id=${id}`, { method: 'DELETE' }); setFinance((prev) => prev.filter((x) => x.id !== id)); };
  const uploadMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const fd = new FormData(); fd.append('file', file); fd.append('targetPath', 'admin-media');
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd }).then((r) => r.json());
    setUploading(false);
    if (res.success) { setMessage(`ছবি আপলোড হয়েছে: ${res.url}`); }
  };

  const Field = ({ label, value, onChange, type = 'text', placeholder = '' }: any) => <label className="block"><span className="text-sm font-medium text-slate-700">{label}</span><input type={type} value={value ?? ''} placeholder={placeholder} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500" /></label>;
  const Button = ({ children, onClick, type = 'button' }: any) => <button type={type} onClick={onClick} className="rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-700 transition">{children}</button>;

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div><p className="text-sm text-emerald-700 font-semibold">আল আহসান ফাউন্ডেশন বাংলাদেশ</p><h1 className="text-3xl font-bold text-slate-900">ওয়েবসাইট ব্যবস্থাপনা</h1><p className="text-slate-500 mt-1">স্বাগতম, {user?.name || user?.email}</p></div>
          <div className="flex gap-2"><Link href="/" className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-medium">সাইট দেখুন</Link><button onClick={() => signOut({ callbackUrl: '/' })} className="rounded-lg bg-slate-900 text-white px-4 py-2.5">লগ আউট</button></div>
        </div>
        {message && <div className="mb-5 rounded-lg bg-emerald-100 text-emerald-800 px-4 py-3">{message}</div>}
        <div className="grid lg:grid-cols-[250px_1fr] gap-6">
          <aside className="bg-white rounded-xl border border-slate-200 p-3 h-fit grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-1">
            {tabs.map((t) => <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-3 px-3 py-3 rounded-lg text-left text-sm font-medium ${tab === t.id ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'}`}><Icon icon={t.icon} className="text-lg" />{t.label}</button>)}
          </aside>
          <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-7 min-h-[500px]">
            {loading && tab === 'overview' ? <p>তথ্য লোড হচ্ছে...</p> : null}
            {tab === 'overview' && <div><h2 className="text-xl font-bold mb-5">সারসংক্ষেপ</h2><div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4"><div className="p-4 rounded-xl bg-emerald-50"><p className="text-slate-600 text-sm">মোট অনুদান</p><strong className="text-2xl text-emerald-700">{currency(totals.income)}</strong></div><div className="p-4 rounded-xl bg-rose-50"><p className="text-slate-600 text-sm">মোট ব্যয়</p><strong className="text-2xl text-rose-700">{currency(totals.expense)}</strong></div><div className="p-4 rounded-xl bg-blue-50"><p className="text-slate-600 text-sm">অবশিষ্ট</p><strong className="text-2xl text-blue-700">{currency(totals.income - totals.expense)}</strong></div><div className="p-4 rounded-xl bg-amber-50"><p className="text-slate-600 text-sm">সক্রিয় নোটিশ</p><strong className="text-2xl text-amber-700">{notices.filter((n) => n.active).length}টি</strong></div></div><div className="mt-7 grid md:grid-cols-2 gap-5"><div className="border rounded-xl p-4"><h3 className="font-bold mb-3">সর্বশেষ হিসাব</h3>{finance.slice(0, 4).map((r) => <div key={r.id} className="flex justify-between py-2 border-b last:border-0 text-sm"><span>{r.category}</span><span className={r.type === 'income' ? 'text-emerald-700' : 'text-rose-700'}>{r.type === 'income' ? '+' : '-'}{currency(r.amount)}</span></div>)}</div><div className="border rounded-xl p-4"><h3 className="font-bold mb-3">সক্রিয় নোটিশ</h3>{notices.filter((n) => n.active).slice(0, 4).map((n) => <div key={n.id} className="py-2 border-b last:border-0 text-sm"><strong>{n.title}</strong><p className="text-slate-500 line-clamp-1">{n.content}</p></div>)}</div></div></div>}

            {tab === 'theme' && <div><h2 className="text-xl font-bold mb-2">সাইটের রং ও ব্র্যান্ডিং</h2><p className="text-slate-500 mb-6">রং বদলে সংরক্ষণ করলে সাইটের হেডার ও ফুটারে তা প্রয়োগ হবে।</p><div className="grid sm:grid-cols-2 gap-5">{[['siteName','ফাউন্ডেশনের নাম'],['tagline','ট্যাগলাইন'],['phone','ফোন'],['email','ইমেইল'],['address','ঠিকানা'],['facebookUrl','Facebook URL'],['youtubeUrl','YouTube URL'],['whatsappNumber','WhatsApp নম্বর']].map(([key,label]) => <Field key={key} label={label} value={settings[key]} onChange={(e:any)=>setSettings({...settings,[key]:e.target.value})} />)}{[['navbarBg','মেনু বারের পটভূমি'],['navbarText','মেনুর লেখা'],['navHoverColor','মেনু Hover রং'],['primaryButtonBg','প্রধান বাটনের রং'],['primaryButtonText','বাটনের লেখার রং'],['footerBg','ফুটারের পটভূমি'],['footerText','ফুটারের লেখা'],['accentColor','প্রধান Accent রং']].map(([key,label]) => <label key={key} className="flex items-center justify-between gap-3 rounded-lg border p-3"><span className="text-sm font-medium">{label}</span><input type="color" value={settings.theme?.[key] || '#ffffff'} onChange={(e)=>setSettings({...settings,theme:{...settings.theme,[key]:e.target.value}})} className="h-10 w-16 cursor-pointer rounded border" /></label>)}</div><label className="flex gap-3 items-center mt-5"><input type="checkbox" checked={settings.showNotice} onChange={(e)=>setSettings({...settings,showNotice:e.target.checked})} /><span>সাইটে নোটিশ বার দেখান</span></label><div className="mt-5"><Field label="সাইটের নোটিশ বার্তা" value={settings.noticeText} onChange={(e:any)=>setSettings({...settings,noticeText:e.target.value})} /></div><div className="mt-6"><Button onClick={saveSettings}>সেটিংস সংরক্ষণ করুন</Button></div></div>}

            {tab === 'menu' && <div><h2 className="text-xl font-bold mb-2">মেনু বার ব্যবস্থাপনা</h2><p className="text-slate-500 mb-5">লেবেল, লিংক, রং, দৃশ্যমানতা ও ক্রম পরিবর্তন করুন। প্রথমে ক্রম নম্বর পরিবর্তন করে সংরক্ষণ করুন।</p><div className="space-y-3">{menu.map((item, index)=><div key={item.id || index} className="grid md:grid-cols-[60px_1fr_1fr_100px_100px] gap-3 items-end rounded-xl border p-4"><Field label="ক্রম" type="number" value={item.order} onChange={(e:any)=>setMenu(menu.map((m,i)=>i===index?{...m,order:Number(e.target.value)}:m))}/><Field label="মেনু নাম" value={item.label} onChange={(e:any)=>setMenu(menu.map((m,i)=>i===index?{...m,label:e.target.value}:m))}/><Field label="লিংক" value={item.href} onChange={(e:any)=>setMenu(menu.map((m,i)=>i===index?{...m,href:e.target.value}:m))}/><label className="text-sm flex items-center gap-2"><input type="checkbox" checked={item.visible !== false} onChange={(e)=>setMenu(menu.map((m,i)=>i===index?{...m,visible:e.target.checked}:m))}/>দেখান</label><label className="text-sm">রং<input type="color" value={item.color || '#1f2937'} onChange={(e)=>setMenu(menu.map((m,i)=>i===index?{...m,color:e.target.value}:m))} className="block h-9 w-full"/></label></div>)}</div><div className="mt-5 flex gap-3"><Button onClick={saveMenu}>মেনু সংরক্ষণ করুন</Button><button onClick={()=>setMenu([...menu,{id:`new-${Date.now()}`,label:'নতুন মেনু',href:'/',order:menu.length+1,visible:true}])} className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold">+ নতুন মেনু</button></div></div>}

            {tab === 'notices' && <div><h2 className="text-xl font-bold mb-5">নোটিশ ও ঘোষণা</h2><form onSubmit={addNotice} className="grid gap-4 rounded-xl bg-slate-50 p-4 mb-6"><Field label="শিরোনাম" value={noticeForm.title} onChange={(e:any)=>setNoticeForm({...noticeForm,title:e.target.value})} /><label className="block"><span className="text-sm font-medium">বিস্তারিত</span><textarea required value={noticeForm.content} onChange={(e)=>setNoticeForm({...noticeForm,content:e.target.value})} className="mt-1 w-full rounded-lg border px-3 py-2" rows={3}/></label><label className="text-sm">গুরুত্ব<select value={noticeForm.priority} onChange={(e:any)=>setNoticeForm({...noticeForm,priority:e.target.value})} className="ml-3 rounded border px-3 py-2"><option value="normal">সাধারণ</option><option value="urgent">জরুরি</option></select></label><div><Button type="submit">নোটিশ প্রকাশ করুন</Button></div></form><div className="space-y-3">{notices.map(n=><div key={n.id} className="flex justify-between gap-4 border rounded-xl p-4"><div><span className={`text-xs px-2 py-1 rounded-full ${n.priority==='urgent'?'bg-rose-100 text-rose-700':'bg-slate-100 text-slate-600'}`}>{n.priority==='urgent'?'জরুরি':'সাধারণ'}</span><h3 className="font-bold mt-2">{n.title}</h3><p className="text-slate-600 text-sm mt-1">{n.content}</p></div><button onClick={()=>deleteNotice(n.id)} className="text-rose-600 self-start">মুছুন</button></div>)}</div></div>}

            {tab === 'finance' && <div><h2 className="text-xl font-bold mb-2">অনুদান ও ব্যয়ের হিসাব</h2><p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg mb-5">গুরুত্বপূর্ণ: এই হিসাবটি অভ্যন্তরীণ রেকর্ডিংয়ের জন্য। এটি কোনো ব্যাংক বা পেমেন্ট গেটওয়ে থেকে স্বয়ংক্রিয়ভাবে যাচাইকৃত অর্থের তথ্য নয়। রসিদ ও লেনদেনের প্রমাণ আলাদাভাবে মিলিয়ে নিন।</p><div className="grid md:grid-cols-3 gap-3 mb-5"><div className="bg-emerald-50 p-4 rounded-lg">মোট আয় <b className="block text-emerald-700">{currency(totals.income)}</b></div><div className="bg-rose-50 p-4 rounded-lg">মোট ব্যয় <b className="block text-rose-700">{currency(totals.expense)}</b></div><div className="bg-blue-50 p-4 rounded-lg">অবশিষ্ট <b className="block text-blue-700">{currency(totals.income-totals.expense)}</b></div></div><form onSubmit={addFinance} className="grid md:grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 mb-6"><label className="block"><span className="text-sm font-medium">ধরন</span><select value={financeForm.type} onChange={(e:any)=>setFinanceForm({...financeForm,type:e.target.value})} className="mt-1 w-full rounded-lg border px-3 py-2.5"><option value="income">আয় / অনুদান</option><option value="expense">ব্যয়</option></select></label><Field label="খাত" value={financeForm.category} onChange={(e:any)=>setFinanceForm({...financeForm,category:e.target.value})}/><Field label="পরিমাণ (টাকা)" type="number" value={financeForm.amount} onChange={(e:any)=>setFinanceForm({...financeForm,amount:e.target.value})}/><Field label="তারিখ" type="date" value={financeForm.date} onChange={(e:any)=>setFinanceForm({...financeForm,date:e.target.value})}/><Field label="দাতা / গ্রহীতা" value={financeForm.donorOrReceiver} onChange={(e:any)=>setFinanceForm({...financeForm,donorOrReceiver:e.target.value})}/><Field label="পেমেন্টের মাধ্যম" value={financeForm.paymentMethod} onChange={(e:any)=>setFinanceForm({...financeForm,paymentMethod:e.target.value})}/><Field label="বিবরণ" value={financeForm.description} onChange={(e:any)=>setFinanceForm({...financeForm,description:e.target.value})}/><Field label="রেফারেন্স নম্বর" value={financeForm.referenceNo} onChange={(e:any)=>setFinanceForm({...financeForm,referenceNo:e.target.value})}/><div className="md:col-span-2"><Button type="submit">হিসাব সংরক্ষণ করুন</Button></div></form><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left"><th className="p-2">তারিখ</th><th className="p-2">খাত / বিবরণ</th><th className="p-2">দাতা/গ্রহীতা</th><th className="p-2">ধরন</th><th className="p-2">পরিমাণ</th><th></th></tr></thead><tbody>{finance.map(r=><tr key={r.id} className="border-b"><td className="p-2">{r.date}</td><td className="p-2">{r.category}<p className="text-slate-500">{r.description}</p></td><td className="p-2">{r.donorOrReceiver}</td><td className="p-2">{r.type==='income'?'আয়':'ব্যয়'}</td><td className={`p-2 font-semibold ${r.type==='income'?'text-emerald-700':'text-rose-700'}`}>{currency(r.amount)}</td><td><button onClick={()=>deleteFinance(r.id)} className="text-rose-600">মুছুন</button></td></tr>)}</tbody></table></div></div>}

            {tab === 'media' && <div><h2 className="text-xl font-bold mb-2">ছবি ও মিডিয়া</h2><p className="text-slate-500 mb-5">সাইটে অ্যাডমিন হিসেবে লগইন থাকলে যেসব ছবি আপলোড কম্পোনেন্টে যুক্ত করা হয়েছে, সেগুলোর ওপর ছবি পরিবর্তন বাটন দেখা যাবে।</p><label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 cursor-pointer hover:bg-slate-50"><Icon icon="ion:cloud-upload-outline" className="text-4xl text-emerald-600"/><span className="mt-3 font-semibold">{uploading?'আপলোড হচ্ছে...':'ছবি নির্বাচন করে আপলোড করুন'}</span><span className="text-xs text-slate-500 mt-1">JPG, PNG, WebP</span><input type="file" accept="image/*" onChange={uploadMedia} className="hidden"/></label><p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg mt-5">সতর্কতা: ফাইল আপলোডের বর্তমান লোকাল স্টোরেজ API একটি ডেমো/সেল্ফ-হোস্টিং ভিত্তিক ব্যবস্থা; সার্ভারলেস হোস্টিংয়ে স্থায়ী ছবির স্টোরেজের জন্য Supabase Storage বা S3 সংযোগ প্রয়োজন।</p></div>}

            {tab === 'content' && <div><h2 className="text-xl font-bold mb-3">কনটেন্ট ব্যবস্থাপনা</h2><p className="text-slate-600">বর্তমান সংস্করণে ব্লগ পোস্ট, কার্যক্রম ও ইভেন্টের কনটেন্ট এখনও কোড/MDX ফাইলে সংরক্ষিত। এই অংশে অ্যাডমিন ড্যাশবোর্ডে সেগুলো সম্পাদনার UI এখনো যুক্ত হয়নি।</p><div className="mt-5 grid md:grid-cols-3 gap-4">{[['ব্লগ পোস্ট','৮টি বাংলা নিবন্ধ'],['কার্যক্রম','কোডে থাকা কার্যক্রমের ডাটা'],['ইভেন্ট','কোডে থাকা ইভেন্টের ডাটা']].map(x=><div key={x[0]} className="border rounded-xl p-4"><strong>{x[0]}</strong><p className="text-sm text-slate-500 mt-1">{x[1]}</p><span className="text-xs text-amber-700">সম্পাদনা UI যুক্ত হয়নি</span></div>)}</div></div>}
          </section>
        </div>
        <p className="text-xs text-slate-400 mt-6">ব্যবহারকারী: {user?.email} · সুরক্ষিত অ্যাডমিন এলাকা</p>
      </div>
    </main>
  );
}
