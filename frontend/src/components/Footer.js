import React from 'react';
import { FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-600 py-12 text-white bg-black" >
      <div className="w-[96%] max-w-screen-lg mx-auto flex flex-row justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >

            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Pyramid Ball Game
            </span>
          </Link>
        </div>
        <div>

        </div>
      </div>
    </footer>
  );
};
