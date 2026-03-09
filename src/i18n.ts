import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['es', 'en'];

export default getRequestConfig(async ({requestLocale}) => {
  // 1. Resolvemos la promesa del locale de la petición
  let locale = await requestLocale;

  // 2. Validamos que el locale exista y esté dentro de nuestros idiomas permitidos
  if (!locale || !locales.includes(locale as any)) notFound();

  // 3. Retornamos la configuración, declarando el locale explícitamente
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});