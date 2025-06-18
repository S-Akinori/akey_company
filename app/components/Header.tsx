import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-black text-white p-2 fixed top-0 left-0 w-full z-50 border-b border-gray-800">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src={"/logo-main.png"} alt="株式会社A-Key" width={70} height={70} />
                    </Link>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/web-works" className="hover:underline">ウェブ制作</a></li>
                        <li><a href="#contact" className="hover:underline">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
