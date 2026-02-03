import { Facebook, Instagram, LucideTwitter } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <footer className="bg-[#6f4e37] text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <h3 className="text-xl font-bold mb-4 text-[#f3a847]">ChocoLuxe</h3>
              <p className="mb-4 text-sm md:text-base">
                Crafting exceptional chocolate experiences since 2025
              </p>
              <div className="flex gap-3">
                {[
                  { name: 'Instagram', icon: <Instagram size={16} /> },
                  { name: 'Facebook', icon: <Facebook size={16} /> },
                  { name: 'Twitter', icon: <LucideTwitter size={16} /> },
                ].map(({ name, icon }) => (
                  <a
                    key={name}
                    href="#"
                    className="w-8 h-8 bg-[#5a3f2d] text-white rounded-full flex items-center justify-center hover:bg-[#f3a847] transition-colors duration-200"
                    aria-label={`Follow us on ${name}`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            
            <div>
              <h4 className="font-bold mb-4 text-base md:text-lg">Shop</h4>
              <ul className="space-y-2">
                {['All Chocolates', 'Collections', 'Gift Boxes', 'Seasonal Specials'].map((item) => (
                  <li key={item}>
                    <Link 
                      to="/Products" 
                      className="text-sm md:text-base hover:text-[#f3a847] transition-colors duration-200 block py-1"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

           
            <div>
              <h4 className="font-bold mb-4 text-base md:text-lg">About</h4>
              <ul className="space-y-2">
                {['Our Story', 'Sustainability', 'Chocolate Making', 'Locations'].map((item) => (
                  <li key={item}>
                    <Link 
                      to="/About" 
                      className="text-sm md:text-base hover:text-[#f3a847] transition-colors duration-200 block py-1"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

         
            <div>
              <h4 className="font-bold mb-4 text-base md:text-lg">Contact</h4>
              <address className="not-italic text-sm md:text-base">
                <p className="mb-2">ChocoLux</p>
                <p className="mb-2">Malappuram</p>
                <p className="mb-2">Phone: 8891024242</p>
                <p>Email: vishnu@gmail.com</p>
              </address>
            </div>
          </div>

          
          <div className="border-t border-[#5a3f2d] mt-8 pt-6 text-center">
            <p className="text-xs md:text-sm text-gray-300">
              &copy; {new Date().getFullYear()} ChocoLux. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer