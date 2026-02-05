"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search } from "lucide-react"
import Link from "next/link" // Import Link for client-side navigation
import { useState, useEffect } from "react"
import SearchModal from "./SearchModal"

export default function Header({ logo, logoAlt = "Logo" }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Ensure component is mounted before rendering Sheet to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle Cmd+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
  

  const navItems = [
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about-us" }
  ]

  return (
    <header className="w-full py-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center text-foreground text-xl font-semibold hover:text-[#0369a1] transition-colors">
              {logo ? (
                <img 
                  src={logo} 
                  alt={logoAlt}
                  className="h-8 w-auto"
                />
              ) : (
                "dotCMS"
              )}
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            
            {/* Regular nav items */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground px-4 py-2 rounded-full font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-full text-muted-foreground hover:text-foreground hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-all duration-200"
          >
            <Search className="h-4 w-4" />
            <span className="text-sm">Search...</span>
            <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-muted-foreground">⌘K</span>
          </button>
          
          <Link href="https://dev.dotcms.com/getting-started/setup/demo-instance" target="_blank" rel="noopener noreferrer" className="hidden md:block">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full font-medium shadow-sm transition-colors">
              Try for Free
            </Button>
          </Link>
          {isMounted && (
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-7 w-7" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="bg-background border-t border-border text-foreground">
                <SheetHeader>
                  <SheetTitle className="text-left text-xl font-semibold text-foreground">Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6 px-4 pb-4">
                  {/* Regular nav items */}
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground justify-start text-lg py-2"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link href="https://dev.dotcms.com/getting-started/setup/demo-instance" target="_blank" rel="noopener noreferrer" className="w-full mt-4">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full font-medium shadow-sm transition-colors">
                      Try for Free
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          )}
          {!isMounted && (
            <Button variant="ghost" size="icon" className="md:hidden text-foreground">
              <Menu className="h-7 w-7" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          )}
        </div>
      </div>
      
      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </header>
  )
}