"use client"


import React, {useContext} from "react";
import {availableLangue} from "@/i18n/config";
import {useTranslation} from "react-i18next";
import {SaveManagerContext} from "@/contexts/saveManagerSaver/SaveManagerContext";

export default function ParametersPage() {
    const {t, i18n} = useTranslation();
    const {saveData, setLanguage, setTheme} = useContext(SaveManagerContext);

    const themes = [
        "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
        "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
        "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
        "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
        "night", "coffee", "winter"
    ];

    return <>
        <div className={`font-semibold text-2xl`}>{t("layout.settings.title")}</div>
        <fieldset
            className="fieldset bg-base-100 border-base-300 rounded-box w-full border px-4 pb-3">
            <legend className="fieldset-legend">{t("layout.settings.language")}</legend>
            <div className={`flex gap-2`}>
                {Object.keys(availableLangue)
                    .map((code, i) => {
                        return <div key={i} onClick={() => setLanguage(code)}
                                    className={`btn btn-ghost ${saveData.language === code ? "btn-outline" : ""}`}>
                            <div className={`flex items-center gap-1`}>
                                <div className={`w-4 h-4 rounded overflow-hidden`} style={{
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    backgroundImage: `url("https://flagcdn.com/h20/${code === "en" ? "gb" : code}.png")`
                                }}>
                                </div>
                                {availableLangue[code]}
                            </div>
                        </div>
                    })}
            </div>
        </fieldset>
        <fieldset
            className="fieldset bg-base-100 border-base-300 rounded-box w-full border px-4 pb-3">
            <legend className="fieldset-legend">{t("layout.settings.theme")}</legend>
            <div className={`flex gap-2 flex-wrap`}>
                {themes.map((theme, i) => {
                    return <div key={i} onClick={() => setTheme(theme)}
                                className={`btn btn-ghost ${saveData.theme === theme ? "btn-outline" : ""}`}>
                        <div className={`flex flex-row items-center gap-1`}>
                            <div data-theme={theme}
                                 className="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm border  border-base-content/20">
                                <div className="bg-base-content size-1 rounded-full"></div>
                                <div className="bg-primary size-1 rounded-full"></div>
                                <div className="bg-secondary size-1 rounded-full"></div>
                                <div className="bg-accent size-1 rounded-full"></div>
                            </div>
                            {theme}
                        </div>
                    </div>
                })}
            </div>
        </fieldset>
    </>
}