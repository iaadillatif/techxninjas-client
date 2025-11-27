// import React from "react";
// import { Link } from "react-router-dom";
// import { BRAND_NAME, WHATSAPP_COMMUNITY_LINK } from "../../constants";
// import {
//   WhatsAppIcon,
//   YoutubeIcon,
//   LinkedinIcon,
//   InstagramIcon,
//   TelegramIcon,
//   MailIcon,
//   PhoneIcon,
// } from "../icons"; // Assuming MailIcon and PhoneIcon exist or will be added

// interface FooterProps {
//   layoutStyle?: React.CSSProperties;
// }

// const Footer: React.FC<FooterProps> = ({ layoutStyle }) => {
//   const currentYear = new Date().getFullYear();
//   const socialLinks = [
//     {
//       href: WHATSAPP_COMMUNITY_LINK,
//       icon: WhatsAppIcon,
//       label: "WhatsApp",
//       color: "hover:text-green-500",
//     },
//     {
//       href: "https://www.youtube.com/@techxninjas?sub_confirmation=1",
//       icon: YoutubeIcon,
//       label: "YouTube",
//       color: "hover:text-red-600",
//     },
//     {
//       href: "https://www.linkedin.com/company/techxninjas",
//       icon: LinkedinIcon,
//       label: "LinkedIn",
//       color: "hover:text-blue-700",
//     },
//     {
//       href: "https://www.instagram.com/cipherschools",
//       icon: InstagramIcon,
//       label: "Instagram",
//       color: "hover:text-pink-600",
//     }, // Note: Instagram link is to cipherschools as per prompt
//     {
//       href: "https://t.me/thetechxninjas",
//       icon: TelegramIcon,
//       label: "Telegram",
//       color: "hover:text-blue-500",
//     },
//   ];

//   return (
//     <footer
//       className="bg-gray-100 dark:bg-brand-dark-gray text-gray-700 dark:text-brand-medium-gray py-12"
//       style={layoutStyle}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex flex-wrap justify-center sm:justify-between gap-8 mb-10 text-sm text-gray-600 dark:text-gray-300">
//           {/* Column 1: TechXNinjas */}
//           <div className="w-[200px] flex-shrink-0 text-center sm:text-left">
//             <h5 className="text-xl font-bold text-brand-primary mb-4">
//               {BRAND_NAME}
//             </h5>
//             <p className="text-sm leading-relaxed">
//               Your gateway to hackathons, tech challenges, inspiring speakers,
//               and innovation. We empower tech enthusiasts across India.
//             </p>
//           </div>

//           {/* Column 2: Pages */}
//           <div className="w-[200px] flex-shrink-0 text-center sm:text-left">
//             <h5 className="text-lg font-semibold text-gray-800 dark:text-brand-off-white mb-4">
//               Pages
//             </h5>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   to="/"
//                   className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/events"
//                   className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
//                 >
//                   Events
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/courses"
//                   className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
//                 >
//                   Courses
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/giveaways"
//                   className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
//                 >
//                   Giveaways
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/articles"
//                   className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
//                 >
//                   Articles
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Column 3: Support & Community */}
//           <div className="w-[200px] flex-shrink-0 text-center sm:text-left">
//             <h5 className="text-lg font-semibold text-gray-800 dark:text-brand-off-white mb-4">
//               Support & Community
//             </h5>
//             <ul className="space-y-2 text-sm mb-4">
//               <li>
//                 <Link
//                   to="/dashboard"
//                   className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
//                 >
//                   My Profile
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact-us"
//                   className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
//                 >
//                   Contact Us
//                 </Link>
//               </li>
//               <li>
//                 <a
//                   href={WHATSAPP_COMMUNITY_LINK}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-brand-primary dark:hover:text-brand-ninja-gold inline-flex items-center justify-center sm:justify-start"
//                 >
//                   Join Us{" "}
//                   <WhatsAppIcon className="w-4 h-4 ml-1.5 text-green-500" />
//                 </a>
//               </li>
//               <li>
//                 <Link
//                   to="/privacy"
//                   className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
//                 >
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/terms"
//                   className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
//                 >
//                   Terms of Service
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Column 4: Contact Info */}
//           <div className="w-[200px] flex-shrink-0 text-center sm:text-left">
//             <h5 className="text-lg font-semibold text-gray-800 dark:text-brand-off-white mb-4">
//               Contact Info
//             </h5>
//             <ul className="space-y-2 text-sm">
//               <li className="flex items-center justify-center sm:justify-start">
//                 <PhoneIcon className="w-4 h-4 mr-2 text-brand-primary dark:text-brand-ninja-gold flex-shrink-0" />
//                 <a
//                   href="tel:+919122985472"
//                   className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
//                 >
//                   +91 91229 85472
//                 </a>
//               </li>
//               <li className="flex items-center justify-center sm:justify-start">
//                 <MailIcon className="w-4 h-4 mr-2 text-brand-primary dark:text-brand-ninja-gold flex-shrink-0" />
//                 <a
//                   href="mailto:thetechxninjas@gmail.com"
//                   className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
//                 >
//                   thetechxninjas@gmail.com
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Column 5: Connect With Us */}
//           <div className="w-[200px] flex-shrink-0 text-center sm:text-left">
//             <h5 className="text-lg font-semibold text-gray-800 dark:text-brand-off-white mb-4">
//               Connect with us
//             </h5>
//             <ul className="space-y-3">
//               {socialLinks.map((social) => (
//                 <li key={social.label}>
//                   <a
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group flex items-center justify-center sm:justify-start transition-colors duration-200"
//                   >
//                     <social.icon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300 group-hover:text-brand-primary dark:group-hover:text-brand-ninja-gold transition-colors duration-200" />
//                     <span className="text-gray-600 dark:text-gray-300 group-hover:text-brand-primary dark:group-hover:text-brand-ninja-gold transition-colors duration-200">
//                       {social.label}
//                     </span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center gap-1 pt-2 mt-[-20px] text-sm text-center">
//           <p>
//             &copy; {currentYear + 1} {BRAND_NAME}. All rights reserved.
//           </p>
//           <p>Built with ❤️ by TechXNinjas Student Community.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;





import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BRAND_NAME, WHATSAPP_COMMUNITY_LINK } from "../../constants";
import {
  WhatsAppIcon,
  YoutubeIcon,
  LinkedinIcon,
  InstagramIcon,
  TelegramIcon,
  MailIcon,
  PhoneIcon,
  // XIcon is NOT imported from '../icons' anymore to fix the error.
} from "../icons";

interface FooterProps {
  layoutStyle?: React.CSSProperties;
}

// ----------------------------------------------------
// LOCAL XIcon COMPONENT (Fix for Module Not Found Error)
// ----------------------------------------------------

// Defining XIcon here since it wasn't exported from '../icons'
interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const XIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 6L6 18" /> 
    <path d="M6 6L18 18" /> 
  </svg>
);


// ----------------------------------------------------
// 1. Telegram QR Code Modal Component (Sizing Fix Applied)
// ----------------------------------------------------

interface TelegramQrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  telegramHandle: string;
}

const TelegramQrCodeModal: React.FC<TelegramQrCodeModalProps> = ({
  isOpen,
  onClose,
  telegramHandle,
}) => {
  if (!isOpen) return null;

  // IMPORTANT: Replace this path with the actual path to your QR code image.
  const QR_CODE_IMAGE_PATH = "images/telegram-qr-code.jpeg"; 

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
      onClick={onClose} 
    >
      <div
        // Changed max-w-sm to max-w-md and increased padding for better fit
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full relative transform transition-all duration-300 scale-100" 
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Close"
        >
          <XIcon className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold text-gray-800 dark:text-brand-off-white mb-4 text-center">
          Join {telegramHandle}
        </h3>
        <p className="text-sm text-center mb-6 text-gray-600 dark:text-gray-400">
          If the direct link is blocked on your network (like a college Wi-Fi), scan the QR code to join:
        </p>

        <div className="flex justify-center mb-6">
          {/* Sizing fix: Use w-full and max-w-xs with aspect-square to maximize size without stretching */}
          <img
            src={QR_CODE_IMAGE_PATH}
            alt={`${telegramHandle} QR Code`}
            // Key classes for sizing and non-stretching: w-full, max-w-xs, aspect-square
            className="w-full max-w-xs aspect-square mx-auto border-4 border-brand-primary dark:border-brand-ninja-gold rounded-lg shadow-lg p-2 bg-white" 
          />
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-2">
            *or try the direct link below*
        </p>
        <a
          href={`https://t.me/${telegramHandle.substring(1)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-base font-semibold text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition duration-200"
        >
          {`t.me/${telegramHandle.substring(1)}`}
        </a>
      </div>
    </div>
  );
};


// ----------------------------------------------------
// 2. Footer Component
// ----------------------------------------------------

const Footer: React.FC<FooterProps> = ({ layoutStyle }) => {
  const currentYear = new Date().getFullYear();
  
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const openQrModal = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setIsQrModalOpen(true);
  };

  const closeQrModal = () => {
    setIsQrModalOpen(false);
  };

  const socialLinks = [
    {
      href: WHATSAPP_COMMUNITY_LINK,
      icon: WhatsAppIcon,
      label: "WhatsApp",
      color: "hover:text-green-500",
    },
    {
      href: "https://www.youtube.com/@techxninjas?sub_confirmation=1",
      icon: YoutubeIcon,
      label: "YouTube",
      color: "hover:text-red-600",
    },
    {
      href: "https://www.linkedin.com/company/techxninjas",
      icon: LinkedinIcon,
      label: "LinkedIn",
      color: "hover:text-blue-700",
    },
    {
      href: "https://www.instagram.com/instagram",
      icon: InstagramIcon,
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      href: "https://t.me/thetechxninjas",
      icon: TelegramIcon,
      label: "Telegram",
      color: "hover:text-blue-500",
      isTelegram: true, 
      telegramHandle: "@THETECHXNINJAS", 
    },
  ];

  return (
    <>
      <footer
        className="bg-gray-100 dark:bg-brand-dark-gray text-gray-700 dark:text-brand-medium-gray py-12"
        style={layoutStyle}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center sm:justify-between gap-8 mb-10 text-sm text-gray-600 dark:text-gray-300">
            
            {/* Column 1: TechXNinjas */}
            <div className="w-[200px] flex-shrink-0 text-center sm:text-left">
              <h5 className="text-xl font-bold text-brand-primary mb-4">
                {BRAND_NAME}
              </h5>
              <p className="text-sm leading-relaxed">
                Your gateway to hackathons, tech challenges, inspiring speakers,
                and innovation. We empower tech enthusiasts across India.
              </p>
            </div>

            {/* Column 2: Pages */}
            <div className="w-[200px] flex-shrink-0 text-center sm:text-left">
              <h5 className="text-lg font-semibold text-gray-800 dark:text-brand-off-white mb-4">
                Pages
              </h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/"
                    className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/events"
                    className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses"
                    className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/giveaways"
                    className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
                  >
                    Giveaways
                  </Link>
                </li>
                <li>
                  <Link
                    to="/articles"
                    className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
                  >
                    Articles
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Support & Community */}
            <div className="w-[200px] flex-shrink-0 text-center sm:text-left">
              <h5 className="text-lg font-semibold text-gray-800 dark:text-brand-off-white mb-4">
                Support & Community
              </h5>
              <ul className="space-y-2 text-sm mb-4">
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a
                    href={WHATSAPP_COMMUNITY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-primary dark:hover:text-brand-ninja-gold inline-flex items-center justify-center sm:justify-start"
                  >
                    Join Us{" "}
                    <WhatsAppIcon className="w-4 h-4 ml-1.5 text-green-500" />
                  </a>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div className="w-[200px] flex-shrink-0 text-center sm:text-left">
              <h5 className="text-lg font-semibold text-gray-800 dark:text-brand-off-white mb-4">
                Contact Info
              </h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-center sm:justify-start">
                  <PhoneIcon className="w-4 h-4 mr-2 text-brand-primary dark:text-brand-ninja-gold flex-shrink-0" />
                  <a
                    href="tel:+919122985472"
                    className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
                  >
                    +91 91229 85472
                  </a>
                </li>
                <li className="flex items-center justify-center sm:justify-start">
                  <MailIcon className="w-4 h-4 mr-2 text-brand-primary dark:text-brand-ninja-gold flex-shrink-0" />
                  <a
                    href="mailto:thetechxninjas@gmail.com"
                    className="hover:text-brand-primary dark:hover:text-brand-ninja-gold"
                  >
                    thetechxninjas@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: Connect With Us - MODIFIED */}
            <div className="w-[200px] flex-shrink-0 text-center sm:text-left">
              <h5 className="text-lg font-semibold text-gray-800 dark:text-brand-off-white mb-4">
                Connect with us
              </h5>
              <ul className="space-y-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={social.isTelegram ? "_self" : "_blank"} 
                      rel="noopener noreferrer"
                      onClick={social.isTelegram ? openQrModal : undefined}
                      className="group flex items-center justify-center sm:justify-start transition-colors duration-200"
                    >
                      <social.icon className={`w-5 h-5 mr-2 text-gray-600 dark:text-gray-300 group-hover:text-brand-primary dark:group-hover:text-brand-ninja-gold transition-colors duration-200 ${social.isTelegram ? 'text-blue-500' : ''}`} />
                      <span className={`text-gray-600 dark:text-gray-300 group-hover:text-brand-primary dark:group-hover:text-brand-ninja-gold transition-colors duration-200 ${social.isTelegram ? 'font-medium' : ''}`}>
                        {social.label} {social.isTelegram && ' (QR/Link)'} 
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center gap-1 pt-2 mt-[-20px] text-sm text-center">
            <p>
              &copy; {currentYear} {BRAND_NAME}. All rights reserved.
            </p>
            <p>Built with ❤️ by TechXNinjas Student Community.</p>
          </div>
        </div>
      </footer>

      {/* 3. Render the Modal outside the footer content */}
      <TelegramQrCodeModal
        isOpen={isQrModalOpen}
        onClose={closeQrModal}
        telegramHandle="@THETECHXNINJAS"
      />
    </>
  );
};

export default Footer;