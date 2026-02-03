import React from 'react';

function About() {

  return (
    <div className="font-serif bg-[#fef6f3] text-gray-800">
      
      <section className="bg-[#6f4e37] text-white py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold">Our Story</h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
          Discover the rich history and passion behind our handcrafted chocolates.
        </p>
      </section>

      
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#6f4e37] mb-6 text-center">A Journey Through Chocolate</h2>
        <p className="mb-4 text-lg leading-relaxed">
          Chocolate's story begins over 3,000 years ago with the ancient Mesoamerican cultures.
          The Mayans and Aztecs believed cacao was a gift from the gods — a sacred, bitter drink that was often used in rituals and ceremonies.
        </p>
        <p className="mb-4 text-lg leading-relaxed">
          As cacao made its way to Europe in the 1500s, it transformed from a ceremonial beverage into a luxurious treat. 
          Sugar and milk were added, and the art of chocolate-making flourished among royalty and elite chocolatiers.
        </p>
        <p className="mb-4 text-lg leading-relaxed">
          At <strong>ChocoLuxe</strong>, we honor this history by blending time-honored traditions with modern flavors. 
          Our chocolates are handcrafted with ethically sourced beans, natural ingredients, and an unwavering love for the craft.
        </p>
      </section>


     
      <section className="bg-[#f3e8e3] py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-[#6f4e37] mb-4">The Art of Handcrafting</h2>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed">
          Every ChocoLuxe piece is a labor of love. From tempering the chocolate to designing the perfect mold,
          our artisans pour care into each step to ensure the texture, taste, and aroma are simply divine.
        </p>
        <img src="cchoco.jpg" alt="Chocolate Making"
          className="w-full max-w-3xl mx-auto mt-8 rounded-lg shadow-md object-cover"/>       
      </section>


      
      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-[#6f4e37] mb-4">Sustainable & Ethical</h2>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed">
          We partner directly with fair-trade farms to support ethical sourcing.
          Our packaging is eco-conscious and designed to preserve freshness without harming the planet.
        </p>
      </section>

     

   
      
    </div>
  );
}

export default About;
