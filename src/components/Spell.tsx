import {ISpell, SpellCastingTime, SpellComponents, SpellDuration, SpellRange, TimeDuration} from "@/data/Spell";
import Image from 'next/image'
import {Trans, useTranslation} from "react-i18next";
import {JSX} from "react";
import {FaBrain, FaCircle} from "react-icons/fa6";
import {TbRectangleVerticalFilled, TbTriangleFilled} from "react-icons/tb";
import {MdPentagon} from "react-icons/md";
import {HiCube, HiOutlineClock} from "react-icons/hi";
import {IoIosResize} from "react-icons/io";
import {GiLips} from "react-icons/gi";
import {IoHandLeft} from "react-icons/io5";
import {BsHourglassSplit} from "react-icons/bs";
import {BreedId} from "@/data/Breed";
import {Breed} from "@/components/Breed";

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
                                    <span><Trans
                                        count={(ct as TimeDuration).value}>{`data.duration.${(ct as TimeDuration).unit}`}</Trans></span>
                                </span>
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
                <TbRectangleVerticalFilled size={15} className={`text-info`}/>
                <Trans t={t} values={{level: level}}>spell-layout.level</Trans>
            </div>
        }
    </>
}

function ConcentrationRenderer(): JSX.Element {
    const {t} = useTranslation();
    return <div className={`flex items-center gap-1`}>
        <FaBrain size={15}/>
        <Trans t={t}>spell-layout.concentration</Trans>
    </div>
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
                    <span><Trans
                        count={(duration as TimeDuration).value}>{`data.duration.${(duration as TimeDuration).unit}`}</Trans></span>
                </div>
            </>}
    </div>
}

interface IBreedRendererProps {
    breeds: BreedId[]
}

function BreedRenderer({breeds}: IBreedRendererProps): JSX.Element {
    return (
        <div className={`flex items-center gap-1 flex-wrap`}>
            {breeds.map((b, i) => {
                return <div key={i} className={`flex items-center gap-1`}>
                    <Breed id={b}/>
                </div>
            })}
        </div>
    )
}

interface ISpellProps {
    size: SpellSize,
    spell: ISpell,
}

export function Spell({size, spell}: ISpellProps) {
    return <div>
        {size === "sm" && SpellSm({spell})}
        {size === "md" && SpellMd({spell})}
        {size === "lg" && SpellLg({spell})}
    </div>
}

interface ISpellSmProps {
    spell: ISpell,
}

export function SpellSm({spell}: ISpellSmProps) {
    const {i18n} = useTranslation();


    return <>
        <div className={`indicator w-full cursor-pointer`}
             onClick={() => (document.getElementById(`spell_modal_${spell.id}`) as HTMLDialogElement)?.showModal()}>
            <span
                className="indicator-item indicator-center badge badge-primary px-2 gap-1">
                    <TbRectangleVerticalFilled size={15} className={`text-info`}/>
                {spell.level}
                </span>
            <div className={`border border-primary rounded-lg overflow-hidden relative w-full`}>
                {spell.icon &&
                    <Image className={`w-full`} src={spell.icon} width={128} height={128} alt={spell.name.en}/>}
                <div
                    className={`absolute bg-primary/70 text-primary-content font-bold text-xs text-center p-2 w-full bottom-0 `}>{spell.name[i18n.language] || ""}</div>
            </div>
        </div>
        <dialog id={`spell_modal_${spell.id}`} className="modal">
            <div className="modal-box bg-transparent shadow-none p-0">
                <SpellLg spell={spell}/>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </>
}

interface ISpellMdProps {
    spell: ISpell,
}

export function SpellMd({spell}: ISpellMdProps) {
    const {t, i18n} = useTranslation();

    const description = spell.description[i18n.language] || "";

    return <>
        <div className={`flex flex-col w-full bg-base-300 border border-primary rounded-lg overflow-hidden cursor-pointer`}
             onClick={() => (document.getElementById(`spell_modal_${spell.id}`) as HTMLDialogElement)?.showModal()}>
            <div className={`relative w-full flex gap-3 pt-2 px-2`}>
                {spell.icon &&
                    <Image className={"rounded-lg"} src={spell.icon} width={128} height={128} alt={spell.name.en}/>}
                <div className={`flex flex-col w-full`}>
                    <div className={`text-lg text-primary font-semibold`}>{spell.name[i18n.language] || ""}</div>
                    <div className={`text-sm`}>{t(`data.spell.school.${spell.school}`)}</div>
                    <div className={`grow relative overflow-hidden`}>
                        <div
                            className={`absolute bottom-0 w-full h-6 bg-linear-to-t from-base-300 to-base-300/0 z-2`}>
                        </div>
                        <div
                            className={`absolute text-xs text-justify z-1`}> {description} </div>
                    </div>
                </div>
            </div>
            <div className={`flex flex-col gap-1 pt-1 text-sm`}>
                <div className={`flex gap-3  px-3`}>
                    <RangeRenderer range={spell.range}/>
                    <DurationRenderer duration={spell.duration}/>
                    <ConcentrationRenderer/>
                    <ComponentsRenderer components={spell.components}/>
                </div>
                <div className={`flex gap-3 py-1 px-3 bg-primary text-primary-content`}>
                    <CastingTimeRenderer castingTimes={spell.castingTime}/>
                    <LevelRenderer level={spell.level}/>
                </div>
            </div>
        </div>
        <dialog id={`spell_modal_${spell.id}`} className="modal">
            <div className="modal-box bg-transparent shadow-none p-0">
                <SpellLg spell={spell}/>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </>
}

interface ISpellLgProps {
    spell: ISpell,
}

export function SpellLg({spell}: ISpellLgProps) {
    const {t, i18n} = useTranslation();

    const description = spell.description[i18n.language] || "";

    return <div
        className={`flex flex-col w-full bg-base-300 border border-primary rounded-lg overflow-hidden h-full min-h-150`}>
        <div className={`relative w-full flex gap-3 pt-2 px-2`}>
            <div className={`flex flex-col w-full`}>
                <div className={`text-lg text-primary font-semibold`}>{spell.name[i18n.language] || ""}</div>
                <div className={`text-sm`}>{t(`data.spell.school.${spell.school}`)}</div>
                <BreedRenderer breeds={spell.breeds}/>
            </div>
            {spell.icon &&
                <Image className={"rounded-lg"} src={spell.icon} width={128} height={128} alt={spell.name.en}/>}
        </div>
        <div className={`text-justify p-3 grow ${description.length > 1000 ? "text-sm" : ""}`}>
            {description}
        </div>
        <div className={`flex flex-col gap-1 pt-1 text-sm`}>
            <div className={`flex gap-3  px-3`}>
                <RangeRenderer range={spell.range}/>
                <DurationRenderer duration={spell.duration}/>
                <ConcentrationRenderer/>
                <ComponentsRenderer components={spell.components}/>
            </div>
            <div className={`flex gap-3 py-1 px-3 bg-primary text-primary-content`}>
                <CastingTimeRenderer castingTimes={spell.castingTime}/>
                <LevelRenderer level={spell.level}/>
            </div>
        </div>
    </div>
}

