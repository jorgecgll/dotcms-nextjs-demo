"use client"

import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-gray-100">
      <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-foreground text-sm font-normal">
          © 2013 - {currentYear} All rights reserved.
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Link href="https://dev.dotcms.com/" className="text-foreground text-sm font-normal leading-5 hover:underline">
            Documentation
          </Link>
          <Link href="https://dotcms.com/contact-us/" className="text-foreground text-sm font-normal leading-5 hover:underline">
            Contact Us
          </Link>
          <Link href="https://dev.dotcms.com/getting-started/setup/demo-instance" className="text-foreground text-sm font-normal leading-5 hover:underline">
            Access Demo Site
          </Link>
        </div>
      </div>
    </footer>
  )
}