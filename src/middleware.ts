import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // التحسين: استبعاد الملفات الثابتة والمسارات التي لا تحتاج لـ middleware
  // هذا يمنع الأخطاء عند محاولة طلب ملفات مثل favicon.ico أو الصور أو ملفات النظام
  matcher: [
    // تطابق المسار الجذر
    '/',
    // تطابق المسارات الدولية (مثل /ar/...)
    '/(ar|en)/:path*',
    // استبعاد الملفات التي تبدأ بـ api, _next, _vercel، وأي ملف له امتداد (مثل .png, .css)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};