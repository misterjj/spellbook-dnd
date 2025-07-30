"use client";

import "./globals.css";
import {HiAdjustmentsVertical, HiBars3} from "react-icons/hi2";
import React, {useContext, useEffect, useState} from "react";
import localFont from 'next/font/local';

import '../i18n/config';
import {useTranslation} from 'react-i18next';
import {availableLangue} from "@/i18n/config";
import {FaHatWizard} from "react-icons/fa";
import {GiTiedScroll} from "react-icons/gi";
import Link from "next/link";
import {DragAndDropArea} from "@/contexts/draggable/DragAndDropArea";
import SpellLoaderArea from "@/contexts/spellLoader/SpellLoaderArea";
import {SaveManagerArea} from "@/contexts/saveManagerSaver/SaveManagerArea";
import {SaveManagerContext} from "@/contexts/saveManagerSaver/SaveManagerContext";
import {HiChevronDoubleRight} from "react-icons/hi";

const griffy = localFont({
    src: '../fonts/Griffy-Regular.ttf',
    display: 'swap',
    variable: '--font-griffy',
});

function ClientLayout({ children }: { children: React.ReactNode }) {
    const { t, i18n } = useTranslation();
    const { saveData, setMenuCollapse } = useContext(SaveManagerContext);

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
            <div className={`bg-base-200 border-r-1 border-base-300 transition-all ${saveData.menuCollapse ? "w-16" : "w-50" } h-screen shrink-0`}>
                <div className={`flex flex-col h-full`}>
                    <div className={`grow`}>
fdsfsdfdsfdsfd fdsfdsfdsf fsdfds
                    </div>
                    <div className={`flex justify-end w-full p-2`}>
                        <div className={`btn btn-sm btn-ghost w-12 transition-all`} onClick={() => setMenuCollapse(!saveData.menuCollapse)}>
                            <HiChevronDoubleRight size={20} className={`${saveData.menuCollapse ? "rotate-0" : "rotate-180"} duration-500`} />
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className={`drawer fixed left-4 top-4 w-10 ${drawerActive === "menu" ? "z-20" : "z-10"}`}>*/}
            {/*    <input id="my-drawer-menu" type="checkbox" className="drawer-toggle" onChange={(e) => {*/}
            {/*        setDrawerActive(e.target.checked ? "menu" : "")*/}
            {/*    }*/}
            {/*    }/>*/}
            {/*    <div className="drawer-content">*/}
            {/*        <label htmlFor="my-drawer-menu"*/}
            {/*               className="btn btn-primary drawer-button rounded-full btn-square">*/}
            {/*            <HiBars3 size={25}/>*/}
            {/*        </label>*/}
            {/*    </div>*/}
            {/*    <div className="drawer-side">*/}
            {/*        <label htmlFor="my-drawer-menu" aria-label="close sidebar" className="drawer-overlay"></label>*/}
            {/*        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">*/}
            {/*            <div className={`font-semibold text-2xl text-center`}>{t("layout.menu.title")}</div>*/}
            {/*            <ul>*/}
            {/*                <li className={`text-xl`}><Link href={"/spell-books"}><FaHatWizard*/}
            {/*                    size={20}/> {t("layout.menu.spell-books")}</Link></li>*/}
            {/*                <li className={`text-xl`}><Link href={"/spell-list"}><GiTiedScroll*/}
            {/*                    size={20}/> {t("layout.menu.spells-list")}</Link></li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={`py-10 px-10`}>
                <DragAndDropArea>
                    {children}
                </DragAndDropArea>
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