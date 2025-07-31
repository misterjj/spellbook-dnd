"use client";

import "./globals.css";
import React, {useContext, useEffect, useRef, useState} from "react";
import localFont from 'next/font/local';
import { usePathname } from 'next/navigation';

import '../i18n/config';
import {useTranslation} from 'react-i18next';
import {FaHatWizard} from "react-icons/fa";
import {GiBlockHouse, GiFireSpellCast, GiPerspectiveDiceSixFacesRandom, GiTiedScroll} from "react-icons/gi";
import Link from "next/link";
import {DragAndDropArea} from "@/contexts/draggable/DragAndDropArea";
import SpellLoaderArea from "@/contexts/spellLoader/SpellLoaderArea";
import {SaveManagerArea} from "@/contexts/saveManagerSaver/SaveManagerArea";
import {SaveManagerContext} from "@/contexts/saveManagerSaver/SaveManagerContext";
import {HiChevronDoubleRight, HiOutlineCog, HiOutlineHome} from "react-icons/hi";
import {TbUserHexagon} from "react-icons/tb";

const griffy = localFont({
    src: '../fonts/Griffy-Regular.ttf',
    display: 'swap',
    variable: '--font-griffy',
});

interface ItemMenuProps {
    href: string;
    icon: React.ReactNode;
    text: React.ReactNode;
    collapse: Boolean;
    scrollY: number;
}

function ItemMenu({href, icon, text, collapse, scrollY}: ItemMenuProps) {
    const pathname = usePathname();
    const isActive = (pathname === '/' && href === '/') || (href !== '/' && pathname.startsWith(href));
    const ref = useRef<HTMLDivElement | null>(null);
    const [offsetTop, setOffsetTop] = useState(0)

    useEffect(() => {
        const updateOffset = () => {
            if (ref.current) {
                setOffsetTop(ref.current.offsetTop);
            }
        };

        updateOffset();

        window.addEventListener('resize', updateOffset);

        return () => {
            window.removeEventListener('resize', updateOffset);
        };
    }, [ref]);

    return <div className={`px-2 mb-1`} ref={ref}>
        <Link href={href}
              className={`flex items-center ${collapse ? "justify-center relative" : "justify-start"}
              gap-1 btn btn-ghost px-2 text-base-content/75 tooltip-right group ${isActive ? "btn-active" : ""}`}>
            <div className={`shrink-0 w-5 flex justify-center`}>{icon}</div>
            <div className={`${collapse ? `fixed left-18 text-nowrap hidden group-hover:flex btn font-normal bg-base-300` : ``}`}
                style={{top: offsetTop - scrollY}}>{text}
            </div>
        </Link>
    </div>
}

interface ItemSeparatorProps {
    text: React.ReactNode;
    collapse: Boolean;
}

function ItemSeparator({text, collapse}: ItemSeparatorProps) {
    return <div className={`flex items-center justify-start gap-2 ${collapse ? "my-1" : "mt-8 mb-2"} `}>
        <div className={`h-0.5 ${collapse ? "w-full bg-base-content/10" : "w-3 bg-base-content/20"}`}></div>
        {!collapse && <div className={`text-xs text-base-content/50 uppercase`}>{text}</div>}
    </div>
}

function Menu() {
    const {t} = useTranslation();
    const {saveData, setMenuCollapse} = useContext(SaveManagerContext);
    const scrollRef = useRef<HTMLDivElement|null>(null);
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const scrollableElement = scrollRef.current;

        const handleScroll = () => {
            if (scrollableElement) {
                setScrollY(scrollableElement.scrollTop);
            }
        };

        if (scrollableElement) {
            scrollableElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollableElement) {
                scrollableElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [scrollRef]);

    return <div
        className={`bg-base-200 border-r-1 border-base-300 transition-all ${saveData.menuCollapse ? "w-16" : "w-50"} 
        h-screen shrink-0 sticky top-0 z-10 hidden sm:block`}>
        <div className={`flex flex-col h-full overflow-y-auto w-full`} ref={scrollRef}>
            <div className={`p-4 font-semibold`}>
                <span>B</span>
            </div>
            <div className={`grow`}>
                <ItemMenu href={"/"} icon={<HiOutlineHome size={20}/>} text={"Accueil"}
                          collapse={saveData.menuCollapse} scrollY={scrollY}/>
                <ItemSeparator text={"sorts"} collapse={saveData.menuCollapse}/>
                <ItemMenu href={"/spell-list"} icon={<GiTiedScroll size={20}/>}
                          text={t("layout.menu.spells-list")} collapse={saveData.menuCollapse} scrollY={scrollY}/>
                <ItemMenu href={"/spell-books"} icon={<FaHatWizard size={20}/>}
                          text={t("layout.menu.spell-books")} collapse={saveData.menuCollapse} scrollY={scrollY}/>
                <ItemSeparator text={"Générateur"} collapse={saveData.menuCollapse}/>
                <ItemMenu href={"/character-name"} icon={<TbUserHexagon size={20}/>}
                          text={"Nom de personnage"} collapse={saveData.menuCollapse} scrollY={scrollY}/>
                <ItemMenu href={"/inn-name"} icon={<GiBlockHouse size={20}/>}
                          text={"Nom d'auberge"} collapse={saveData.menuCollapse} scrollY={scrollY}/>
            </div>
            <div className={``}>
                <ItemMenu href={"/settings"} icon={<HiOutlineCog size={20}/>} text={"Paramètres"}
                          collapse={saveData.menuCollapse} scrollY={scrollY}/>
            </div>
            <div className={`flex justify-end w-full p-2`}>
                <div className={`btn btn-sm btn-ghost transition-all text-base-content/75 ${saveData.menuCollapse ? "w-full p-0" : ""}`}
                     onClick={() => setMenuCollapse(!saveData.menuCollapse)}>
                    <HiChevronDoubleRight size={20}
                                          className={`${saveData.menuCollapse ? "rotate-0" : "rotate-180"} duration-500`}/>
                </div>
            </div>
        </div>
    </div>
}


function DockMenu() {
    const pathname = usePathname();
    const isActive = (href:string) => (pathname === '/' && href === '/') || (href !== '/' && pathname.startsWith(href));

    return <div className="dock sm:hidden bg-base-200">
        <Link href={"/"} className={`${isActive("/") ? "dock-active" : ""}`}>
            <HiOutlineHome size={24}/>
            <span className="dock-label">Accueil</span>
        </Link>

        <Link href={"/spell-books"} className={`${isActive("/spell-books") ? "dock-active" : ""}`}>
            <GiFireSpellCast size={24}/>
            <span className="dock-label">Sorts</span>
        </Link>

        <Link href={"/"} className={`${isActive("/generator") ? "dock-active" : ""}`}>
            <GiPerspectiveDiceSixFacesRandom size={24}/>
            <span className="dock-label">Générateurs</span>
        </Link>

        <Link href={"/settings"} className={`${isActive("/settings") ? "dock-active" : ""}`}>
            <HiOutlineCog size={24}/>
            <span className="dock-label">Settings</span>
        </Link>
    </div>
}

function ClientLayout({children}: { children: React.ReactNode }) {
    const {i18n} = useTranslation();
    const {saveData} = useContext(SaveManagerContext);

    useEffect(() => {
        if (saveData.theme) {
            document.documentElement.setAttribute('data-theme', saveData.theme);
        }

        if (saveData.theme === undefined || saveData.language === undefined) {
            document.body.style.display = 'none';
        } else {
            document.body.style.display = 'block';
        }
    }, [saveData]);

    useEffect(() => {
        i18n.changeLanguage(saveData.language);
    }, [saveData.language]);

    if (!saveData.load) {
        return null;
    }

    return (
        <>
            <div className={`flex`}>
                <Menu />
                <div className={`p-5 md:p-10 grow pb-24 `}>
                    <DragAndDropArea>
                        {children}
                    </DragAndDropArea>
                    <DockMenu />
                </div>
            </div>
        </>
    );
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className={`${griffy.variable}`}>
        <body
            className={`antialiased relative w-full bg-base-100`}
        >
        <SaveManagerArea>
            <SpellLoaderArea>
                <ClientLayout>{children}</ClientLayout>
            </SpellLoaderArea>
        </SaveManagerArea>
        </body>
        </html>
    );
}