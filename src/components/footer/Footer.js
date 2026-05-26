"use client"

import { Twitter, Github, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100">
      <div className="w-full max-w-[1320px] mx-auto px-5 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 py-10 md:py-[70px]">
      {/* Left Section: Logo, Description, Social Links */}
      <div className="flex flex-col justify-start items-start gap-8 p-4 md:p-8">
        <Link
          href="/"
          aria-label="dotCMS home"
          className="text-xl font-semibold text-foreground tracking-tight"
        >
          dotCMS
        </Link>
        <p className="text-foreground/90 text-sm font-medium leading-[18px] text-left">Your trusted partner for premium travel gear and adventure essentials</p>
        <div className="flex justify-start items-start gap-3">
          <a href="#" aria-label="Twitter" className="w-4 h-4 flex items-center justify-center">
            <Twitter className="w-full h-full text-muted-foreground" />
          </a>
          <a href="#" aria-label="GitHub" className="w-4 h-4 flex items-center justify-center">
            <Github className="w-full h-full text-muted-foreground" />
          </a>
          <a href="#" aria-label="LinkedIn" className="w-4 h-4 flex items-center justify-center">
            <Linkedin className="w-full h-full text-muted-foreground" />
          </a>
        </div>
      </div>
      {/* Right Section: Products, Support, Blog, Contact */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 p-4 md:p-8 w-full md:w-auto">
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Products</h3>
          <div className="flex flex-col justify-end items-start gap-2">
            <Link href="/products/snow-apparel" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Snow Apparel
            </Link>
            <Link href="/products/skis" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Skis
            </Link>
            <Link href="/products/snowboards" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Snowboards
            </Link>
            <Link href="/products/ski-boots" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Ski Boots
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Travel</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <Link href="/travel/destinations" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Destinations
            </Link>
            <Link href="/travel/guides" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Travel Guides
            </Link>
            <Link href="/travel/tips" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Travel Tips
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Blog</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <Link href="/blog" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Latest Posts
            </Link>
            <Link href="/blog/categories" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Categories
            </Link>
            <Link href="/blog/archive" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Archive
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Contact</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <Link href="/contact" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Contact Us
            </Link>
            <Link href="/contact/stores" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Store Locator
            </Link>
            <Link href="/contact/careers" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Careers
            </Link>
          </div>
        </div>
      </div>
      </div>
    </footer>
  )
}