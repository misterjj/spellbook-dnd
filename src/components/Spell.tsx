import {ISpell, SpellCastingTime, SpellRange, TimeDuration} from "@/data/Spell";
import Image from 'next/image'
import {Trans, useTranslation} from "react-i18next";
import {JSX} from "react";
import {FaCircle} from "react-icons/fa6";
import {TbTriangleFilled} from "react-icons/tb";
import {MdPentagon} from "react-icons/md";
import {HiOutlineClock} from "react-icons/hi";
import {IoIosResize} from "react-icons/io";

export type SpellSize = | "sm" | "md" | "lg"
export const spellSizes: SpellSize[] = ["sm", "md", "lg"];


interface ISpellRangeRendererPros {
    range: SpellRange
}

function RangeRenderer({range}: ISpellRangeRendererPros): JSX.Element {
    const {t, i18n} = useTranslation();

    return <div className={`flex items-center gap-1`}>
        <IoIosResize size={15}/>
        {range === 'self' && <Trans t={t}>spell-layout.range.self</Trans>}
        {range === 'touch' && <Trans t={t}>spell-layout.range.touch</Trans>}
        {typeof range === 'object' && range !== null &&  i18n.language === 'en' && <span>{range.feet} ft</span>}
        {typeof range === 'object' && range !== null &&  i18n.language === 'fr' && <span>{range.meter} m</span>}
    </div>
}

interface ISpellCastingTimeRendererPros {
    castingTimes: SpellCastingTime
}

function CastingTimeRenderer({castingTimes}: ISpellCastingTimeRendererPros): JSX.Element {
    const {t} = useTranslation();

    return <div className={`flex items-center gap-1`}>
        {
            castingTimes.map((ct, i) => {

                if (ct === "Action") {
                    return (
                        <>
                            {!!i && <span className={`text-xs`}>ou</span>}
                            <div key={i} className={`flex items-center gap-1`}>
                                <FaCircle size={10} className={`text-success`}/>
                                <span className={`text-sm`}><Trans t={t}>spell-layout.casting-time.action</Trans></span>
                            </div>
                        </>
                    )
                } else if (ct === "Bonus Action") {
                    return (
                        <>
                            {!!i && <span className={`text-xs`}>ou</span>}
                            <div key={i} className={`flex items-center gap-1`}>
                                <TbTriangleFilled size={13} className={`text-warning`}/>
                                <span className={`text-sm`}><Trans
                                    t={t}>spell-layout.casting-time.bonus-action</Trans></span>
                            </div>
                        </>
                    )
                } else if (ct === "Ritual") {
                    return (
                        <>
                            {!!i && <span className={`text-xs`}>ou</span>}
                            <div key={i} className={`flex items-center gap-1`}>
                                <MdPentagon size={13} className={`text-error`}/>
                                <span className={`text-sm`}><Trans t={t}>spell-layout.casting-time.ritual</Trans></span>
                            </div>
                        </>
                    )
                } else if (typeof ct === 'object' && ct !== null) {
                    return (
                        <>
                            {!!i && <span className={`text-xs`}>ou</span>}
                            <div key={i} className={`flex items-center gap-1`}>
                                <HiOutlineClock size={13}/>
                                <span className={`text-sm`}>{(ct as TimeDuration).value} <Trans>{`spell-layout.casting-time.duration.${(ct as TimeDuration).unit}`}</Trans></span>
                            </div>
                        </>
                    )
                } else {
                    return
                }
            })
        }
    </div>
}

interface ISpellProps {
    size: SpellSize,
    spell: ISpell,
}

export function Spell({size, spell}: ISpellProps) {
    const {t, i18n} = useTranslation();

    return <div>
        {size === "sm" && (
            <div className={`indicator w-full`}>
                <span
                    className="indicator-item badge badge-accent w-8 h-8 rounded-full text-xl font-semibold">{spell.level}</span>
                <div className={`border border-primary rounded-lg overflow-hidden relative w-full`}>
                    {spell.icon &&
                        <Image className={`w-full`} src={spell.icon} width={128} height={128} alt={spell.name.en}/>}
                    <div
                        className={`absolute bg-primary/70 text-primary-content font-bold text-xs text-center p-2 w-full bottom-0 `}>{spell.name[i18n.language] || ""}</div>
                </div>
            </div>
        )}
        {size === "md" && (
            <div className={`flex flex-col w-full border border-primary rounded-lg overflow-hidden `}>
                <div className={`relative w-full flex gap-3`}>
                    {spell.icon &&
                        <Image className={""} src={spell.icon} width={128} height={128} alt={spell.name.en}/>}
                    <div className={`flex flex-col`}>
                        <div className={`text-lg text-primary font-semibold`}>{spell.name[i18n.language] || ""}</div>
                        <div className={`text-sm`}>{t("spell-layout.subtitle", {
                            school: t(`data.spell.school.${spell.school}`),
                            level: spell.level
                        })}</div>
                        <div className={`text-sm`}></div>
                    </div>
                </div>
                <div className={`bg-primary text-primary-content px-3 text-sm flex gap-3 py-1`}>
                    <CastingTimeRenderer castingTimes={spell.castingTime}/>
                    <RangeRenderer range={spell.range}/>
                </div>
            </div>
        )}
    </div>
}