"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';

import Wrapper from './Wrapper';
import Menu from './Menu';
import HeaderIcons from './HeaderIcons';
import MenuMobile from './MenuMobile';
import fetchCategories from '@/lib/fetchCategories';

import { VscChromeClose } from 'react-icons/vsc';
import { BiMenuAltRight } from "react-icons/bi";


export default function Header() {

    const [mobileMenu, setMobileMenu] = useState(false);
    const [showCatMenu, setShowCatMenu] = useState(false);
    const [navShow, setNavShow] = useState("translate-y-0");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [categories, setCategories] = useState([]);

    
    const controlNavbar = () => {
        const currentScrollY = window.scrollY;

        // console.log("Current Scroll Y:", currentScrollY);
        // console.log("Last Scroll Y:", lastScrollY);
        // console.log("Nav Show:", navShow);
    
        if (currentScrollY > 200) {
            if (currentScrollY > lastScrollY && !mobileMenu) {
                setNavShow("-translate-y-[80px]");
            } else {
                setNavShow("shadow-sm");
            }
        } else {
            setNavShow("translate-y-0");
        }
        setLastScrollY(currentScrollY);
    };
    

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);


    useEffect(() =>{
        const getCategories = async () =>{
            const categoriesData = await fetchCategories();
            setCategories(categoriesData)
        }
        getCategories();
    }, [])


    // const categories = fetchCategories();


  return (
    <div>
        <header className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${navShow}`} >
        
        <Wrapper className="h-[60px] flex justify-between items-center">
            <Link href="/">
                <img src="/assets/logo.svg" alt="Logo" className="w-[40px] md:w-[60px]" />
            </Link>

            <Menu 
                showCatMenu={showCatMenu} 
                setShowCatMenu={setShowCatMenu} 
                categories={categories}
            />

            {mobileMenu && (
                <MenuMobile 
                showCatMenu={showCatMenu} 
                setShowCatMenu={setShowCatMenu}
                setMobileMenu={setMobileMenu}
                categories={categories}
            />
            )}

            <div className="flex items-center gap-2 text-black">
                <HeaderIcons />

                {/* Mobile Menu Icon Start  */}

                <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                    {mobileMenu ? (
                        <VscChromeClose 
                            className='text-[16px]'
                            onClick={(() => setMobileMenu(false))}
                        />
                    ) : (
                        <BiMenuAltRight 
                            className='text-[20px]'
                            onClick={(() => setMobileMenu(true))}
                        />
                    )}

                </div>

                {/* Mobile Menu Icon End  */}

            </div>

        </Wrapper>

        </header>
    </div>
  )
}
