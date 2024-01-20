import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pomodoro Pilot | Efficient Time Management" />
        <meta name="twitter:description" content="Enhance productivity with Pomodoro Pilot's customizable sessions, task management, and real-time tracking for work, study, and relaxation." />
        <meta name="twitter:image" content="/share_1200-630.png" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Pomodoro Pilot | Efficient Time Management" />
        <meta property="og:description" content="Enhance productivity with Pomodoro Pilot's customizable sessions, task management, and real-time tracking for work, study, and relaxation." />
        <meta property="og:image" content="/share_1200-630.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Favicon and Apple Touch Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/favicon.svg" color="#000000" />

        {/* Apple Touch Startup Images */}
        <link href="splashscreens/iphone5_splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        {/* Add more Apple Touch Startup Images as needed */}

        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Mobile Web App Settings */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>


      <body className="cursor-default antialiased overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
