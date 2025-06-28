"use client";

import "./globals.css";
import {HiAdjustmentsVertical, HiBars3} from "react-icons/hi2";
import {useEffect, useState} from "react";

import '../i18n/config';
import {useTranslation} from 'react-i18next';
import {availableLangue} from "@/i18n/config";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const [drawerActive, setDrawerActive] = useState<string>("")
    const [selectedTheme, setSelectedTheme] = useState<string | undefined>(undefined)

    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(undefined);
    const {t, i18n} = useTranslation();

    const themes = [
        "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
        "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
        "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
        "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
        "night", "coffee", "winter"
    ];

    useEffect(() => {
        const savedThemeJSON = localStorage.getItem('selectedTheme');
        let initialTheme;

        if (savedThemeJSON) {
            try {
                const savedTheme = JSON.parse(savedThemeJSON);
                if (typeof savedTheme === 'string' && savedTheme) {
                    initialTheme = savedTheme;
                }
            } catch (e) {
                console.error("Failed to parse theme from localStorage", e);
            }
        }

        if (!initialTheme) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            initialTheme = prefersDark ? 'dark' : 'light';
        }

        setSelectedTheme(initialTheme);

        const savedLanguageJSON = localStorage.getItem('selectedLanguage');
        let initialLanguage;
        if (savedLanguageJSON) {
            try {
                const savedLanguage = JSON.parse(savedLanguageJSON);
                if (typeof savedLanguage === 'string' && (savedLanguage === 'en' || savedLanguage === 'fr')) {
                    initialLanguage = savedLanguage;
                }
            } catch (e) {
                console.error("Failed to parse language from localStorage", e);
            }
        }

        if (!initialLanguage) {
            initialLanguage = i18n.language.split('-')[0];
        }
        setSelectedLanguage(initialLanguage);
        i18n.changeLanguage(initialLanguage);

    }, [i18n]);

    useEffect(() => {
        if (selectedTheme) {
            localStorage.setItem('selectedTheme', JSON.stringify(selectedTheme));
        }
    }, [selectedTheme]);

    useEffect(() => {
        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage);
            localStorage.setItem('selectedLanguage', JSON.stringify(selectedLanguage));
        }
    }, [selectedLanguage, i18n]);

    return (
        <html data-theme={selectedTheme}
              className={selectedTheme === undefined || selectedLanguage === undefined ? "hidden" : ""}>
        <body
            className={`antialiased relative w-full bg-base-100`}
        >
        <div className={`drawer fixed left-6 top-6 w-10 ${drawerActive === "menu" ? "z-20" : "z-10"}`}>
            <input id="my-drawer-menu" type="checkbox" className="drawer-toggle" onChange={(e) => {
                setDrawerActive(e.target.checked ? "menu" : "")
            }
            }/>
            <div className="drawer-content">
                <label htmlFor="my-drawer-menu" className="btn btn-primary drawer-button rounded-full btn-square">
                    <HiBars3 size={25}/>
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-menu" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
        </div>
        <div className={`drawer drawer-end fixed right-6 top-6 w-10 ${drawerActive === "settings" ? "z-20" : "z-10"}`}>
            <input id="my-drawer-settings" type="checkbox" className="drawer-toggle" onChange={(e) => {
                setDrawerActive(e.target.checked ? "settings" : "")
            }
            }/>
            <div className="drawer-content">
                <label htmlFor="my-drawer-settings" className="btn btn-primary drawer-button rounded-full btn-square">
                    <HiAdjustmentsVertical size={25}/>
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-settings" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <div className={`font-semibold text-xl text-center`}>{t("layout.settings.title")}</div>
                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4">
                        <legend className="fieldset-legend">{t("layout.settings.language")}</legend>
                        <label className="text-base-content flex items-center justify-center gap-2">
                            <button className="btn w-full" popoverTarget="popover-lng"
                                    style={{anchorName: "--anchor-1"} as React.CSSProperties}>
                                <div className={`w-4 h-4 rounded overflow-hidden`} style={{
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    backgroundImage: `url("https://flagcdn.com/h20/${i18n.language === "en" ? "gb" : i18n.language}.png")`
                                }}>
                                </div>
                                {availableLangue[i18n.language]}
                            </button>
                            <ul className="dropdown menu w-64 rounded-box bg-base-300 shadow-sm max-h-100"
                                popover="auto" id="popover-lng">
                                {
                                    Object.keys(availableLangue)
                                        .map((code, i) => {
                                            return <li key={i} onClick={() => setSelectedLanguage(code)}>
                                                <div  className={`flex items-center`}>
                                                    <div className={`w-4 h-4 rounded overflow-hidden`} style={{
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center center',
                                                        backgroundImage: `url("https://flagcdn.com/h20/${code === "en" ? "gb" : code}.png")`
                                                    }}>
                                                    </div>
                                                    {availableLangue[code]}
                                                </div>
                                            </li>
                                        })
                                }
                            </ul>
                        </label>
                    </fieldset>
                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4">
                        <legend className="fieldset-legend">{t("layout.settings.theme")}</legend>
                        <label className="text-base-content flex items-center justify-center gap-2">
                            <button className="btn w-full" popoverTarget="popover-theme"
                                    style={{anchorName: "--anchor-2"} as React.CSSProperties}>
                                <div data-theme={selectedTheme}
                                     className="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm">
                                    <div className="bg-base-content size-1 rounded-full"></div>
                                    <div className="bg-primary size-1 rounded-full"></div>
                                    <div className="bg-secondary size-1 rounded-full"></div>
                                    <div className="bg-accent size-1 rounded-full"></div>
                                </div>
                                {selectedTheme}
                            </button>

                            <ul className="dropdown menu w-64 rounded-box bg-base-300 shadow-sm max-h-100"
                                popover="auto" id="popover-theme"
                                style={{positionAnchor: "--anchor-2"} as React.CSSProperties}>
                                {themes.map((theme, i) => {
                                    return <li key={i} onClick={() => {
                                        setSelectedTheme(theme)
                                    }}>
                                        <div>
                                            <div data-theme={theme}
                                                 className="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm">
                                                <div className="bg-base-content size-1 rounded-full"></div>
                                                <div className="bg-primary size-1 rounded-full"></div>
                                                <div className="bg-secondary size-1 rounded-full"></div>
                                                <div className="bg-accent size-1 rounded-full"></div>
                                            </div>
                                            {theme}
                                        </div>
                                    </li>
                                })}
                            </ul>
                        </label>
                    </fieldset>
                </div>
            </div>
        </div>
        {children}
        </body>
        </html>
    );
}