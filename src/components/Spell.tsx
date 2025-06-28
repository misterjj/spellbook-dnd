import {ISpell, SpellRange} from "@/data/Spell";
import Image from 'next/image'
import {useTranslation} from "react-i18next";
import {JSX} from "react";
import { Trans } from 'react-i18next';

export type SpellSize = | "sm" | "md" | "lg"
export const spellSizes: SpellSize[] = ["sm", "md", "lg"];


interface ISpellRangeRendererPros {
    range: SpellRange
}
function RangeRenderer({ range }: ISpellRangeRendererPros): JSX.Element {
    const { t, i18n } = useTranslation();

    let displayedValue: string;

    if (range === 'self') {
        displayedValue = t('spell-layout.range.self');
    } else if (range === 'touch') {
        displayedValue = t('spell-layout.range.touch');
    } else if (typeof range === 'object' && range !== null) {
        const { feet, meter } = range;
        if (i18n.language === 'en') {
            displayedValue = `${feet} ft`;
        } else {
            displayedValue = `${meter} m`;
        }
    } else {
        // Cas par défaut pour éviter les erreurs
        displayedValue = '';
    }

    // Le composant retourne du JSX. La clé de traduction est probablement plus générique.
    // Exemple : "Range: {value}"
    // return <>{t('spell-layout.range.phrase', { value: displayedValue })}</>;
    return <Trans
        t={t}
        values={{ value: displayedValue }}
        components={{bold: <span className={`font-semibold`} /> }}
    >spell-layout.range.phrase</Trans>
}

interface ISpellProps {
    size: SpellSize,
    spell: ISpell,
}

export function Spell({size, spell} : ISpellProps) {
    const {t, i18n} = useTranslation();

    return <div>
        {size === "sm" && (
            <div className={`indicator w-full`}>
                <span className="indicator-item badge badge-accent w-8 h-8 rounded-full text-xl font-semibold">{spell.level}</span>
                <div className={`border border-primary rounded-lg overflow-hidden relative w-full`}>
                    {spell.icon && <Image className={`w-full`} src={spell.icon} width={128} height={128} alt={spell.name.en}/>}
                    <div
                        className={`absolute bg-primary/70 text-primary-content font-bold text-xs text-center p-2 w-full bottom-0 `}>{spell.name[i18n.language] || ""}</div>
                </div>
            </div>
        )}
        {size === "md" && (
            <div className={`indicator w-full`}>
                <div className={`border border-primary rounded-lg overflow-hidden relative w-full flex gap-3`}>
                    {spell.icon && <Image className={""} src={spell.icon} width={128} height={128} alt={spell.name.en}/>}
                    <div className={`flex flex-col`}>
                        <div className={`text-lg text-primary font-semibold`}>{spell.name[i18n.language] || ""}</div>
                        <div className={`text-sm`}>{t("spell-layout.subtitle", {school: t(`data.spell.school.${spell.school}`), level: spell.level} )  }</div>
                        <div className={`text-sm`}>toto : {spell.castingTime.join(",")}</div>
                        <div className={`text-sm`}><RangeRenderer range={spell.range}/></div>
                    </div>
                </div>
            </div>
        )}
    </div>
}