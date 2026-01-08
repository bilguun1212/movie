"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import UpComing from "@/components/UpComing";
import Hero2 from "@/components/Hero2";
import Popular from "@/components/Popular";
import TopRated from "@/components/TopRated";
import Footer from "@/components/Footer";
import { Loader } from "lucide-react";

const PageLoader = () => (

    <section className="mx-auto w-[1900px] mt-12 shadow-2xl shadow-black">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Upcoming</h2>
                <span className="text-sm text-gray-500">See More →</span>
            </div>
           
            
            
       
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-neutral-950">
   
    <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
   
  </div>
     </section>
);

export const HomePage = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
   
      {isPageLoading && <PageLoader />}

     
      <div className={`min-h-screen transition-opacity duration-700 ${isPageLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Hero2 />
        <Hero />

        <div className="space-y-8">
          <UpComing />
          <Popular />
          <TopRated />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;