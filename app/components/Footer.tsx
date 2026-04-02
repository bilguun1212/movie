"use client";

import { Film, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    // overflow-x-hidden нэмснээр хажуу тийшээ scroll үүсэх боломжгүй болно
    <footer className="w-full bg-[#4338CA] py-10 flex justify-center mt-10 overflow-x-hidden">
      {/* px-5 md:px-20 - зайг дотогшоо авснаар дэлгэцээс халихгүй */}
      <div className="w-full max-w-[1280px] px-5 md:px-10 lg:px-20 flex flex-col md:flex-row md:justify-between items-start gap-10">
        
        {/* 1. Logo Section */}
        <div className="flex flex-col gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <Film className="text-white w-5 h-5" />
            <span className="text-white text-base font-bold italic">
              Movie Z
            </span>
          </div>
          <p className="text-white text-sm font-light">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        {/* 2. Мэдээллийн хэсэг - Утсан дээр Зураг 1 шиг, Том дээр Зураг 2 шиг */}
        <div className="flex flex-row md:flex-row justify-between md:gap-24 lg:gap-32 w-full md:w-auto">
          
          {/* Contact Information */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-medium text-sm md:text-base whitespace-nowrap">Contact Information</h3>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-3">
                <Mail className="text-white w-4 h-4 mt-1 shrink-0" />
                <div className="text-white text-sm">
                  <p className="font-semibold">Email:</p>
                  <p className="font-light">support@movieZ.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-white w-4 h-4 mt-1 shrink-0" />
                <div className="text-white text-sm">
                  <p className="font-semibold">Phone:</p>
                  <p className="font-light">+976 (11) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Follow us */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-medium text-sm md:text-base whitespace-nowrap">Follow us</h3>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-white text-sm font-medium">
              <span className="cursor-pointer hover:underline">Facebook</span>
              <span className="cursor-pointer hover:underline">Instagram</span>
              <span className="cursor-pointer hover:underline">Twitter</span>
              <span className="cursor-pointer hover:underline">Youtube</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};