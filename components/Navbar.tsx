import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className="flex justify-between items-center p-3 px-10 border-b shadow-sm">
      {/* --- Left side: logo + menu --- */}
      <div className="flex gap-10 items-center">
        <Link href="/">
          
            <Image src="/logo.png" alt="logo" width={120} height={60} />
        </Link>
        <div className="hidden md:flex gap-6">
          <h2 className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">
            Home
          </h2>
          <h2 className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">
            History
          </h2>
          <h2 className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">
            Help
          </h2>
        </div>
      </div>

      {/* --- Right side: conditional auth button --- */}
      <div>
        {/* show this when *not* signed in */}
        <SignedOut>
          <Link href="/sign-in">
            
              <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                Login / Register
              </button>
            
          </Link>
        </SignedOut>

        {/* show this when signed in */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default Navbar
