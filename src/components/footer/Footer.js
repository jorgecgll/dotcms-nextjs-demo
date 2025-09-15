"use client"

import { Twitter, Github, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100">
      <div className="w-full max-w-[1320px] mx-auto px-5 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 py-10 md:py-[70px]">
      {/* Left Section: Logo, Description, Social Links */}
      <div className="flex flex-col justify-start items-start gap-8 p-4 md:p-8">
        <div className="flex gap-3 items-stretch justify-center">
          <div className="text-center text-foreground text-xl font-semibold leading-4">FinCorp</div>
        </div>
        <p className="text-foreground/90 text-sm font-medium leading-[18px] text-left">Your trusted financial partner for all banking needs</p>
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
            <Link href="/products/chequing" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Chequing
            </Link>
            <Link href="/products/savings" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Savings
            </Link>
            <Link href="/products/credit-card" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Credit Card
            </Link>
            <Link href="/products/invest" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Invest
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Support</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <Link href="/support" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Help Center
            </Link>
            <Link href="/support/faq" className="text-foreground text-sm font-normal leading-5 hover:underline">
              FAQ
            </Link>
            <Link href="/support/contact" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Contact Support
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
            <Link href="/contact/branches" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Branch Locator
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