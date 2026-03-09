import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';

export const metadata = {
  title: 'AFTER HOUSE',
  description: 'Barra de mixología, servicios de bartender y entretenimiento de alto nivel.',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Resolvemos los parámetros de la ruta de forma asíncrona
  const { locale } = await params;

  // Validamos que el idioma sea soportado
  if (!['es', 'en'].includes(locale)) {
    notFound();
  }

  // Obtenemos los diccionarios del servidor
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-zinc-950 text-zinc-50 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}