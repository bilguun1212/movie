
import { Mail, Phone, Film } from 'lucide-react';


const Footer = () => {
    return (

 

    <footer className="bg-indigo-700 text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
      
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Film className="w-6 h-6" />
            <span className="text-xl font-bold italic">Movie Z</span>
          </div>
          <p className="text-sm opacity-80">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

       
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Email:</p>
              <a href="mailto:support@movieZ.com" className="text-sm opacity-90 hover:underline">
                support@movieZ.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Phone:</p>
              <a href="tel:+976111234567" className="text-sm opacity-90 hover:underline">
                +976 (11) 123-4567
              </a>
            </div>
          </div>
        </div>

       
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-4">Follow us</h3>
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <a href="#" className="hover:opacity-70 transition-opacity">Facebook</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Twitter</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Youtube</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer