import type React from "react"
import type { Metadata } from "next"
import './globals.css'

export const metadata: Metadata = {
  title: "The Movies",
  description: "A movies application using The Movie Database API",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon.png",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
      <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0f0f0f" />
      </head>
      <body>{children}</body>
      </html>
  )
}

export default RootLayout
