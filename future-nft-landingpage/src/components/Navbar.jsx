import React, { useState } from 'react';


const Navbar = ({ isScrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="未来レター" className="h-10 mr-3" />
          <span className={`font-bold text-xl ${isScrolled ? 'text-indigo-700' : 'text-white'}`}>未来レター</span>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <a href="#features" className={`font-medium ${isScrolled ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-indigo-200'}`}>特徴</a>
          <a href="#how-it-works" className={`font-medium ${isScrolled ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-indigo-200'}`}>使い方</a>
          <a href="#tokenomics" className={`font-medium ${isScrolled ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-indigo-200'}`}>トークノミクス</a>
          <a href="#roadmap" className={`font-medium ${isScrolled ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-indigo-200'}`}>ロードマップ</a>
          <a href="#team" className={`font-medium ${isScrolled ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-indigo-200'}`}>チーム</a>
          <a href="#faq" className={`font-medium ${isScrolled ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-indigo-200'}`}>FAQ</a>
        </div>
        
        <button className="hidden md:block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
          参加する
        </button>
        
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className={`${isScrolled ? 'text-gray-700' : 'text-white'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 p-4">
          <div className="flex flex-col space-y-4">
            <a href="#features" className="text-gray-700 hover:text-indigo-700">特徴</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-indigo-700">使い方</a>
            <a href="#tokenomics" className="text-gray-700 hover:text-indigo-700">トークノミクス</a>
            <a href="#roadmap" className="text-gray-700 hover:text-indigo-700">ロードマップ</a>
            <a href="#team" className="text-gray-700 hover:text-indigo-700">チーム</a>
            <a href="#faq" className="text-gray-700 hover:text-indigo-700">FAQ</a>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 w-full">
              参加する
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;