import { NextIntlClientProvider } from 'next-intl';
import { Analytics } from "@vercel/analytics/next";
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter, Cairo } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader'; // 1. استدعاء اللودر
import '../globals.css';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' });

export const metadata: Metadata = {
  title: 'Iprint | Designs & Printing House',
  description: 'High quality, continuity, fast execution without delays. UV printing, indoor printing, and digital printing.',
};

export default async function LocaleLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;
  const { locale } = params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar' ? cairo.variable : inter.variable;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${fontClass} font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300 min-h-screen flex flex-col`}>
        {/* 2. وضع اللودر هنا ليعمل فوق كل شيء */}
        <Loader /> 
        
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Navbar />
            <main className="flex-grow flex flex-col">
              {props.children}
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}