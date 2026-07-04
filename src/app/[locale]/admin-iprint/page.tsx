"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { LineChart, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Sun, Moon, Users, Globe, Laptop, Smartphone, Wifi, RefreshCw, Copy, ShieldCheck } from "lucide-react";
import { UAParser } from "ua-parser-js";

export default function UltimateAdminDashboard() {
  const { theme, setTheme } = useTheme();
  const [visitors, setVisitors] = useState<any[]>([]);
  const [stats, setStats] = useState({ daily: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  // 1. جلب البيانات وتحليلها
  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase.from("visitor_logs").select("*").order("visit_time", { ascending: false });
    if (data) {
      setVisitors(data);
      const today = new Date().toDateString();
      setStats({
        total: data.length,
        daily: data.filter((v: any) => new Date(v.visit_time).toDateString() === today).length,
      });
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  // 2. دالة النسخ الاحترافي
  const copyData = () => {
    navigator.clipboard.writeText(JSON.stringify(visitors, null, 2));
    alert("تم نسخ بيانات السجل بنجاح!");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 transition-colors duration-500 font-sans">
      
      {/* الترويسة */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black dark:text-white">منظومة iPrint المتكاملة</h1>
          <p className="text-slate-500 font-bold mt-2">مرحباً علي، النظام يعمل بأقصى كفاءة</p>
        </div>
        <div className="flex gap-4">
          <button onClick={fetchData} className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm"><RefreshCw /></button>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
        </div>
      </header>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "زيارات اليوم", val: stats.daily, icon: Users, color: "text-blue-500" },
          { label: "الزيارات الكلية", val: stats.total, icon: Globe, color: "text-purple-500" },
          { label: "حالة السيرفر", val: "مستقر", icon: ShieldCheck, color: "text-emerald-500" },
          { label: "معدل الاتصال", val: "سريع", icon: Wifi, color: "text-amber-500" }
        ].map((s, i) => (
          <motion.div whileHover={{ y: -5 }} key={i} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800 shadow-sm">
            <s.icon className={`mb-4 ${s.color}`} size={24} />
            <p className="text-slate-400 text-sm font-bold">{s.label}</p>
            <p className="text-3xl font-black dark:text-white mt-2">{s.val}</p>
          </motion.div>
        ))}
      </div>

      {/* الرسم البياني */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border dark:border-slate-800 mb-10 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={visitors.slice(0, 20).reverse()}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip contentStyle={{ borderRadius: '15px' }} />
            <Area type="monotone" dataKey="id" stroke="#3b82f6" fill="url(#color)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* الجدول التفصيلي للزوار */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border dark:border-slate-800 overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-black dark:text-white">سجل حركة الزوار</h3>
          <button onClick={copyData} className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-bold">
            <Copy size={16}/> نسخ البيانات
          </button>
        </div>
        
        <table className="w-full text-right">
          <thead>
            <tr className="border-b dark:border-slate-800 text-slate-400">
              <th className="pb-4">الجهاز</th>
              <th className="pb-4">المتصفح</th>
              <th className="pb-4">عنوان الـ IP</th>
              <th className="pb-4">وقت الدخول</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-800">
            {visitors.map((v: any, i) => {
              const parser = new UAParser(v.user_agent).getResult();
              return (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} key={v.id}>
                  <td className="py-5 flex items-center gap-2">
                    {parser.device.type === 'mobile' ? <Smartphone size={16}/> : <Laptop size={16}/>}
                    {parser.device.type || 'Desktop'}
                  </td>
                  <td className="py-5">{parser.browser.name}</td>
                  <td className="py-5 font-mono text-sm">{v.ip_address || '127.0.0.1'}</td>
                  <td className="py-5 text-slate-500">{new Date(v.visit_time).toLocaleTimeString()}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}