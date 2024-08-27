import { Nunito } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'
import { ConvexClientProvider } from '@/components/providers/convex-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'

import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'PWA with Next 14',
  description: 'PWA application with Next 14',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'nextjs14', 'next14', 'pwa', 'next-pwa'],
  authors: [
    { name: 'Shakhzodbek Kakhkhorov', url: 'https://github.com/AbdukahharS' },
  ],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png' },
    { rel: 'icon', url: 'icons/icon-128x128.png' },
  ],
}

export const viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#fff' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <title>{metadata.title}</title>
        <meta name='description' content={metadata.description} />
        <meta name='generator' content={metadata.generator} />
        <link rel='manifest' href={metadata.manifest} />
        <meta name='keywords' content={metadata.keywords.join(', ')} />
        {viewport.themeColor.map(({ media, color }, index) => (
          <meta key={index} name='theme-color' media={media} content={color} />
        ))}
        {metadata.authors.map(({ name, url }, index) => (
          <meta
            key={index}
            name='author'
            content={name}
            {...(url && { href: url })}
          />
        ))}
        <meta name='viewport' content={metadata.viewport} />
        {metadata.icons.map(({ rel, url }, index) => (
          <link key={index} rel={rel} href={url} />
        ))}
      </head>
      <body className={nunito.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem
            storageKey='next-pms-theme'
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
