import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "হোম", href: "/" },
  {
    label: "আমাদের কার্যক্রম",
    href: "#",
    submenu: [
      { label: "কার্যক্রম সমূহ", href: "/cause" },
      { label: "কার্যক্রমের বিবরণ", href: "/cause/cause-1" },
    ],
  },
  {
    label: "ইভেন্ট",
    href: "#",
    submenu: [
      { label: "ইভেন্ট সমূহ", href: "/events" },
      { label: "ইভেন্টের বিবরণ", href: "/events/event-1" },
    ],
  },
  {
    label: "ব্লগ",
    href: "#",
    submenu: [
      { label: "ব্লগ সমূহ", href: "/blog" },
      { label: "ব্লগের বিবরণ", href: "/blog/blog_1" },
    ],
  },
  { label: "যোগাযোগ", href: "/contact" },
  { label: "ডকুমেন্ট", href: "/documentation#version" },
];
