



import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()
  
 

  return (
    <div className="font-serif bg-[#fef6f3]">
     
      <section 
        className="w-full h-screen bg-cover bg-center bg-no-repeat text-center text-white flex flex-col justify-center items-center px-4"
        style={{backgroundImage: "url(delicious-chocolate-arrangement-copy-space.jpg)"}}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-4xl leading-tight">
          Delight in Every Bite
        </h1>
        <p className="text-base sm:text-lg md:text-xl mt-4 max-w-2xl px-4">
          Premium handcrafted chocolates made with love
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="bg-[#6f4e37] hover:bg-[#5a3f2d] text-white py-3 px-8 rounded transition-colors duration-300 font-medium min-w-[140px]"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
          <button
            className="border-1 border-white py-3 px-8 rounded hover:bg-white hover:text-[#6f4e37] transition-all duration-300 font-medium min-w-[140px]"
            onClick={() => navigate("/About")}
          >
            Our Story
          </button>
        </div>
      </section>

    
      <section className="flex flex-col md:flex-row flex-wrap justify-around text-center bg-white py-12 px-4 gap-8">
        <div className="max-w-xs mx-auto md:mx-0 flex-1 min-w-[280px]">
          <h2 className="text-xl font-semibold text-[#6f4e37] mb-3">🍫 All Natural</h2>
          <p className="text-gray-600 leading-relaxed">No additives, just pure chocolate goodness.</p>
        </div>
        <div className="max-w-xs mx-auto md:mx-0 flex-1 min-w-[280px]">
          <h2 className="text-xl font-semibold text-[#6f4e37] mb-3">🌱 Ethically Sourced</h2>
          <p className="text-gray-600 leading-relaxed">We partner with sustainable cocoa farms.</p>
        </div>
        <div className="max-w-xs mx-auto md:mx-0 flex-1 min-w-[280px]">
          <h2 className="text-xl font-semibold text-[#6f4e37] mb-3">🎁 Perfect Gifts</h2>
          <p className="text-gray-600 leading-relaxed">Wrapped with elegance and ready to impress.</p>
        </div>
      </section>

      
      <section className="bg-[#f3e8e3] py-12 px-4">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#6f4e37] mb-8">
          Featured Chocolates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
         
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 mx-auto max-w-sm w-full">
            <div className="relative overflow-hidden h-48 sm:h-60">
              <img 
                src="candy1.jpeg" 
                alt="Pista Chocolate" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <span className="absolute top-2 right-2 bg-[#6f4e37] text-white text-xs font-bold px-2 py-1 rounded-full">
                NEW
              </span>
            </div>
            <div className="p-4 sm:p-5 text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Pista chocolate</h3>
              <p className="text-sm text-gray-500 mb-3">70% Cocoa | Rich Flavor</p>
            </div>
          </div>

          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 mx-auto max-w-sm w-full">
            <div className="relative overflow-hidden h-48 sm:h-60">
              <img 
                src="candy2.jpeg" 
                alt="Hershey's" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
              />
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                BESTSELLER
              </span>
            </div>
            <div className="p-4 sm:p-5 text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Hershey's</h3>
              <p className="text-sm text-gray-500 mb-3">Creamy | Smooth Texture</p>
            </div>
          </div>

         
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 mx-auto max-w-sm w-full">
            <div className="relative overflow-hidden h-48 sm:h-60">
              <img 
                src="candy3.jpeg" 
                alt="White Charm" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
              />
            </div>
            <div className="p-4 sm:p-5 text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">White Charm</h3>
              <p className="text-sm text-gray-500 mb-3">Vanilla Infused | Sweet</p>
            </div>
          </div>

          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 mx-auto max-w-sm w-full">
            <div className="relative overflow-hidden h-48 sm:h-60">
              <img 
                src="candy4.jpeg" 
                alt="Dairy Milk" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
              />
              <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                LIMITED
              </span>
            </div>
            <div className="p-4 sm:p-5 text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Dairy Milk</h3>
              <p className="text-sm text-gray-500 mb-3">Hazelnut | Crunchy</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            className="bg-[#6f4e37] text-white py-3 px-6 rounded-md hover:bg-[#5a3f2d] transition-colors duration-300 flex items-center gap-2"
            onClick={() => navigate("/Products")}
          >
            <ShoppingBag className="w-5 h-5" />
            Shop Now
          </button>
        </div>
      </section>

    
      <section className="flex flex-col-reverse lg:flex-row items-center justify-center bg-white py-12 px-4 gap-8 max-w-6xl mx-auto">
        <div className="w-full lg:w-1/2">
          <img 
            src="packing.jpg" 
            alt="Our mission" 
            className="w-full max-w-md mx-auto lg:mx-0 rounded-lg shadow-lg" 
          />
        </div>
        <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#6f4e37] mb-4">
            Our Sweet Mission
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We create chocolate that not only tastes heavenly, but also supports ethical farming and eco-friendly packaging.
          </p>
          <button 
            className="bg-[#6f4e37] text-white py-3 px-6 rounded hover:bg-[#5a3f2d] transition-colors duration-300" 
            onClick={() => navigate("/About")}
          >
            Learn More
          </button>
        </div>
      </section>

      
      <section className="bg-[#f3e8e3] py-12 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#6f4e37] mb-8">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4 italic">
              "Absolutely divine chocolates - rich, smooth, and beautifully packaged!"
            </p>
            <p className="text-gray-600 text-sm font-semibold">- Nishad K.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4 italic">
              "I gifted these to my team - and everyone was obsessed!"
            </p>
            <p className="text-gray-600 text-sm font-semibold">- Affan P.</p>
          </div>
        </div>
      </section>

      
      <section className="relative bg-[#6f4e37] text-white text-center py-12 px-4 overflow-hidden min-h-[400px] flex items-center justify-center">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="video/Video .mp4" 
          autoPlay
          loop
          muted
          playsInline>
        </video>
        <div className="relative z-10 bg-black/50 py-8 sm:py-12 px-4 sm:px-8 rounded-xl backdrop-blur-sm max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">ChocoLuxe</h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Only selling good quality and premium chocolates...!
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;