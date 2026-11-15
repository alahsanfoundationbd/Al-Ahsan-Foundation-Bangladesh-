'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface SiteSettings {
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

interface MenuItem {
  id: string;
  label: string;
  href: string;
  order: number;
  visible: boolean;
  color?: string;
  submenu?: { id: string; label: string; href: string }[];
}

interface SiteContextType {
  settings: SiteSettings | null;
  menu: MenuItem[];
  images: Record<string, string>;
  isAdmin: boolean;
  refreshSettings: () => Promise<void>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  updateMenu: (newMenu: MenuItem[]) => Promise<void>;
  uploadAndSetImage: (originalPath: string, file: File) => Promise<string | null>;
}

const SiteContext = createContext<SiteContextType>({
  settings: null,
  menu: [],
  images: {},
  isAdmin: false,
  refreshSettings: async () => {},
  updateSettings: async () => {},
  updateMenu: async () => {},
  uploadAndSetImage: async () => null,
});

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [images, setImages] = useState<Record<string, string>>({});

  const userRole = (session?.user as any)?.role;
  const userEmail = (session?.user as any)?.email?.toLowerCase();
  const isAdmin =
    userRole === 'admin' ||
    userEmail === 'mdshamimaehsan@gmail.com' ||
    userEmail === 'info@alahsanfoundationbd.org';

  const fetchData = async () => {
    try {
      const [resSet, resMenu, resImg] = await Promise.all([
        fetch('/api/admin/settings').then((r) => r.json()),
        fetch('/api/admin/menu').then((r) => r.json()),
        fetch('/api/admin/images').then((r) => r.json()),
      ]);

      if (resSet?.success) setSettings(resSet.data);
      if (resMenu?.success) setMenu(resMenu.data);
      if (resImg?.success && Array.isArray(resImg.data)) {
        const map: Record<string, string> = {};
        resImg.data.forEach((item: any) => {
          map[item.originalPath] = item.customUrl;
        });
        setImages(map);
      }
    } catch (e) {
      console.error('Failed to load dynamic site data:', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    if (!settings) return;
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(merged),
    });
  };

  const updateMenu = async (newMenu: MenuItem[]) => {
    setMenu(newMenu);
    await fetch('/api/admin/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMenu),
    });
  };

  const uploadAndSetImage = async (originalPath: string, file: File): Promise<string | null> => {
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('targetPath', originalPath);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: fd,
      }).then((r) => r.json());

      if (res.success && res.url) {
        await fetch('/api/admin/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ originalPath, customUrl: res.url }),
        });

        setImages((prev) => ({ ...prev, [originalPath]: res.url }));
        return res.url;
      }
    } catch (e) {
      console.error('Image upload failed:', e);
    }
    return null;
  };

  return (
    <SiteContext.Provider
      value={{
        settings,
        menu,
        images,
        isAdmin,
        refreshSettings: fetchData,
        updateSettings,
        updateMenu,
        uploadAndSetImage,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => useContext(SiteContext);
