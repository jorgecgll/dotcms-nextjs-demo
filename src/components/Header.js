"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown, Search } from "lucide-react"
import Link from "next/link" // Import Link for client-side navigation
import { useState, useEffect } from "react"
import SearchModal from "./SearchModal"

export default function Header() {
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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
  
  const productsItems = [
    { name: "Chequing", href: "/products/chequing" },
    { name: "Savings", href: "/products/savings" },
    { name: "Credit Card", href: "/products/credit-card" },
    { name: "Invest", href: "/products/invest" }
  ]

  const navItems = [
    { name: "Support", href: "/support" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" }
  ]

  const handleScroll = (e, href) => {
    e.preventDefault()
    const targetId = href.substring(1) // Remove '#' from href
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="w-full py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-foreground text-xl font-semibold hover:text-[#cce600] transition-colors">
              FinCorp
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="text-[#888888] hover:text-foreground px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-1"
              >
                Products
                <ChevronDown className="h-4 w-4" />
              </button>
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
                  {productsItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-3 text-[#888888] hover:text-foreground hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Regular nav items */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[#888888] hover:text-foreground px-4 py-2 rounded-full font-medium transition-colors"
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
          
          <Link href="https://vercel.com/home" target="_blank" rel="noopener noreferrer" className="hidden md:block">
            <Button className="bg-primary text-primary-foreground hover:bg-primary-dark px-6 py-2 rounded-full font-medium shadow-sm transition-colors">
              Try for Free
            </Button>
          </Link>
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
              <nav className="flex flex-col gap-4 mt-6">
                {/* Products section in mobile */}
                <div className="flex flex-col gap-2">
                  <span className="text-foreground font-semibold text-lg">Products</span>
                  {productsItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-[#888888] hover:text-foreground justify-start text-base py-1 pl-4"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                {/* Regular nav items */}
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-[#888888] hover:text-foreground justify-start text-lg py-2"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link href="https://vercel.com/home" target="_blank" rel="noopener noreferrer" className="w-full mt-4">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary-dark px-6 py-2 rounded-full font-medium shadow-sm transition-colors">
                    Try for Free
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
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


// "use client";

// import Link from "next/link";

// import { useIsEditMode } from "@/hooks/isEditMode";
// import { ReorderMenuButton } from "./editor/ReorderMenuButton";
// import { usePathname } from "next/navigation";

// function Header({ navItems }) {
//     const isEditMode = useIsEditMode();

//     return (
//         <div className="flex items-center justify-between p-4 bg-blue-500">
//             <div className="flex items-center">
//                 <h2 className="text-3xl font-bold text-white">
//                     <Link href="/">Demo site</Link>
//                 </h2>

//                 {isEditMode && <ReorderMenuButton />}
//             </div>

//             {navItems && <Navigation navItems={navItems} />}
//         </div>
//     );
// }

// function Navigation({ navItems }) {
//     const pathname = usePathname();

//     return (
//         <nav>
//             <ul className="flex space-x-4 text-white">
//                 <li>
//                     <Link
//                         href={{ pathname: "/" }}
//                         className={`underline-offset-4 hover:underline ${pathname === "/" && "underline"}`}
//                     >
//                         Home
//                     </Link>
//                 </li>
//                 {navItems.map(({ folder, href, target, title }) => (
//                     <li key={folder}>
//                         <Link
//                             href={{ pathname: href }}
//                             className={`underline-offset-4 hover:underline ${pathname === href && "underline"}`}
//                             target={target}
//                         >
//                             {title}
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </nav>
//     );
// }

// export default Header;
