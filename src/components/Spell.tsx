import {ISpell, SpellCastingTime, SpellComponents, SpellDuration, SpellRange, TimeDuration} from "@/data/Spell";
import Image from 'next/image'
import {Trans, useTranslation} from "react-i18next";
import {JSX} from "react";
import {FaCircle} from "react-icons/fa6";
import {TbTriangleFilled} from "react-icons/tb";
import {MdPentagon} from "react-icons/md";
import {HiCube, HiOutlineClock} from "react-icons/hi";
import {IoIosResize} from "react-icons/io";
import {FaSquare} from "react-icons/fa";
import {GiLips} from "react-icons/gi";
import {IoHandLeft} from "react-icons/io5";
import {BsHourglassSplit} from "react-icons/bs";

export type SpellSize = | "sm" | "md" | "lg"
export const spellSizes: SpellSize[] = ["sm", "md", "lg"];


interface ISpellRangeRendererPros {
    range: SpellRange
}

function RangeRenderer({range}: ISpellRangeRendererPros): JSX.Element {
    const {t, i18n} = useTranslation();

    return <div className={`flex items-center gap-1 whitespace-nowrap`}>
        <IoIosResize size={15}/>
        {range === 'self' && <Trans t={t}>spell-layout.range.self</Trans>}
        {range === 'touch' && <Trans t={t}>spell-layout.range.touch</Trans>}
        {typeof range === 'object' && range !== null && i18n.language === 'en' && <span>{range.feet} ft</span>}
        {typeof range === 'object' && range !== null && i18n.language === 'fr' && <span>{range.meter} m</span>}
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
                                <span className={`text-sm`}>{(ct as TimeDuration).value}
                                    <Trans>{`spell-layout.casting-time.duration.${(ct as TimeDuration).unit}`}</Trans></span>
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

interface ILevelRendererProps {
    level: number;
}

function LevelRenderer({level}: ILevelRendererProps): JSX.Element {
    const {t} = useTranslation();
    return <>
        {level > 0 &&
            <div className={`flex items-center gap-1`}>
                <FaSquare size={13} className={`text-info`}/>
                <Trans t={t} values={{level: level}}>spell-layout.level</Trans>
            </div>
        }
    </>
}

interface IComponentsRendererProps {
    components: SpellComponents
}

function ComponentsRenderer({components}: IComponentsRendererProps): JSX.Element {
    return (
        <div className={`flex items-center gap-1`}>
            {components.map((c, i) => {
                if (c === "V") {
                    return <GiLips key={i} size={15}/>
                } else if (c === "S") {
                    return <IoHandLeft key={i} size={15}/>
                } else {
                    return <div key={i} className={`flex items-center gap-1`}>
                        <HiCube size={15}/>
                    </div>
                }
            })}
        </div>
    )
}

interface IDurationRendererProps {
    duration: SpellDuration
}

function DurationRenderer({duration}: IDurationRendererProps): JSX.Element {
    const {t} = useTranslation()
    return <div className={`flex items-center gap-1`}>
        <BsHourglassSplit size={15}/>
        {duration === "Instantaneous" && <Trans t={t}>spell-layout.duration.instantaneous</Trans>}
        {duration === "Until dispelled" && <Trans t={t}>spell-layout.duration.until-dispelled</Trans>}
        {typeof duration === "object" && duration !== null &&
            <>
                <div className={`flex items-center gap-1`}>
                    <span className={`text-sm`}>{(duration as TimeDuration).value}</span>
                    <span><Trans>{`spell-layout.casting-time.duration.${(duration as TimeDuration).unit}`}</Trans></span>
                </div>
            </>}
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
            <div className={`flex flex-col w-full bg-base-300 border border-primary rounded-lg overflow-hidden `}>
                <div className={`relative w-full flex gap-3 pt-2 px-2`}>
                    {spell.icon &&
                        <Image className={"rounded-lg"} src={spell.icon} width={128} height={128} alt={spell.name.en}/>}
                    <div className={`flex flex-col w-full`}>
                        <div className={`text-lg text-primary font-semibold`}>{spell.name[i18n.language] || ""}</div>
                        <div className={`text-sm`}>{t(`data.spell.school.${spell.school}`)}</div>
                        <div className={`grow relative overflow-hidden`}>
                            <div className={`absolute bottom-0 w-full h-6 bg-linear-to-t from-base-300 to-base-300/0 z-2`}>
                            </div>
                            <div className={`absolute text-xs text-justify z-1`}>
                                {spell.description[i18n.language] || ""}

                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col gap-1 pt-1 text-sm`}>
                    <div className={`flex gap-3  px-3`}>
                        <RangeRenderer range={spell.range}/>
                        <ComponentsRenderer components={spell.components}/>
                        <DurationRenderer duration={spell.duration}/>
                    </div>
                    <div className={`flex gap-3 py-1 px-3 bg-primary text-primary-content`}>
                        <CastingTimeRenderer castingTimes={spell.castingTime}/>
                        <LevelRenderer level={spell.level}/>
                    </div>
                </div>
            </div>
        )}
    </div>
}