import React from 'react'
import Navbar from '../../Layout/Navbar'
import Footer from '../../Layout/Footer';
import Hero from '../../Layout/Hero';
import ContentSections from '../../Layout/Content';

const Homepage = () => {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Hero />
        <ContentSections />
        <Footer />
      </div>
    );
  };
  
  export default Homepage;