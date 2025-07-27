import {ISpell, SpellCastingTime, SpellComponents, SpellDuration, SpellRange, TimeDuration} from "@/data/Spell";
import {Trans, useTranslation} from "react-i18next";
import {forwardRef, JSX} from "react";
import {FaBrain} from "react-icons/fa6";
import {TbRectangleVerticalFilled} from "react-icons/tb";
import {HiCube, HiTrash} from "react-icons/hi";
import {IoIosResize} from "react-icons/io";
import {GiLips} from "react-icons/gi";
import {IoHandLeft} from "react-icons/io5";
import {BsHourglassSplit} from "react-icons/bs";
import {BreedId} from "@/data/Breed";
import {Breed} from "@/components/Breed";
import {CastingTime} from "@/components/CastingTime";
import {Tag} from "@/components/Tag";
import ImageWithFallback from "@/components/ImageWithFallBack";

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
    castingTimes: SpellCastingTime[]
}

function CastingTimeRenderer({castingTimes}: ISpellCastingTimeRendererPros): JSX.Element {
    return <div className={`flex items-center gap-1`}>
        {
            castingTimes.map((ct, i) => {
                return <div key={i} className={`flex items-center gap-1`}>
                    {!!i && <span className={`text-xs`}>ou</span>}
                    <CastingTime ct={ct}></CastingTime>
                </div>
            })
        }
    </div>
}

interface ISpellTagRenderer {
    tags: string[],
    onTagClick: (tag: string) => void,
}

function SpellTagRenderer({tags, onTagClick}: ISpellTagRenderer): JSX.Element {
    return <div className={`flex flex-wrap items-center gap-1 px-2`}>
        {
            tags.map((t, i) => <Tag key={i} value={t} onClick={onTagClick}/>)
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

interface ISpellIconProps {
    spell: ISpell,
    className?: string
}

function SpellIcon({spell, className}: ISpellIconProps) {
    return <ImageWithFallback
        className={className}
        src={`/images/spells/${spell.id}.webp`}
        fallbackSrc={`/images/spells/unknown.webp`}
        placeholder={spell.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={spell.blurDataURL}
        alt={spell.name.en}
        width="128"
        height="128"
        sizes={"128px"}
    />
}

interface ISpellProps {
    size: SpellSize,
    spell: ISpell,
    onSelect: (spell: ISpell) => void,
    onTagClick: (tag: string) => void,
    className?: string,
}

export const Spell = forwardRef<HTMLDivElement, ISpellProps>(
    ({ size, spell, onSelect, onTagClick, className }, ref) => {
        return (
            <div ref={ref} className={className}> {/* La ref est attachée ici */}
                {size === "sm" && <SpellSm spell={spell} onSelect={onSelect} />}
                {size === "md" && <SpellMd spell={spell} onSelect={onSelect} />}
                {size === "lg" && <SpellLg spell={spell} onTagClick={onTagClick} />}
            </div>
        );
    }
);

Spell.displayName = "Spell";

interface ISpellSmProps {
    spell: ISpell,
    onSelect: (spell: ISpell) => void
    onDelete?: (spell: ISpell) => void
}

export function SpellSm({spell, onSelect, onDelete}: ISpellSmProps) {
    const {i18n} = useTranslation();

    return <>
        <div className={`indicator w-full min-w-32 cursor-pointer`}
             onClick={() => onSelect(spell)}>
            <span
                className="indicator-item indicator-center badge badge-primary px-2 gap-1">
                    <TbRectangleVerticalFilled size={15} className={`text-info`}/>
                {spell.level}
                </span>
            {undefined !== onDelete && <span
                    className="indicator-item " onClick={(e) => {
                        e.stopPropagation()
                        onDelete(spell)
                    }}>
                    <span className={"btn btn-square btn-xs btn-error"}>
                    <HiTrash size={15} className={`text-error-content`}/>
                    </span>
                </span>}
            <div className={`border border-primary rounded-lg overflow-hidden relative w-full`}>
                <SpellIcon className={`w-full drag-none`} spell={spell} />
                <div
                    className={`absolute bg-primary/70 text-primary-content font-bold text-xs text-center p-2 w-full bottom-0 `}>{spell.name[i18n.language] || ""}</div>
            </div>
        </div>
    </>
}

interface ISpellMdProps {
    spell: ISpell,
    onSelect: (spell: ISpell) => void
}

export function SpellMd({spell, onSelect}: ISpellMdProps) {
    const {t, i18n} = useTranslation();

    const description = spell.description[i18n.language] || "";

    return <>
        <div
            className={`flex flex-col w-full bg-base-300 border-2 border-primary rounded-lg overflow-hidden cursor-pointer`}
            onClick={() => onSelect(spell)}>
            <div className={`relative w-full flex gap-3 pt-2 px-2`}>
                <SpellIcon className={`rounded-lg drag-none shrink-0`} spell={spell} />
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
                    {spell.concentration && <ConcentrationRenderer/>}
                    <ComponentsRenderer components={spell.components}/>
                </div>
                <div className={`flex gap-3 py-1 px-3 bg-primary text-primary-content`}>
                    <CastingTimeRenderer castingTimes={spell.castingTime}/>
                    <LevelRenderer level={spell.level}/>
                </div>
            </div>
        </div>
    </>
}

interface ISpellLgProps {
    spell: ISpell,
    onTagClick: (tag: string) => void,
}

export function SpellLg({spell, onTagClick}: ISpellLgProps) {
    const {t, i18n} = useTranslation();

    const description = spell.description[i18n.language] || "";

    return <div
        className={`flex flex-col w-full bg-base-300 border-2 border-primary rounded-lg overflow-hidden h-full min-h-150`}>
        <div className={`relative w-full flex gap-3 pt-2 px-2`}>
            <div className={`flex flex-col w-full`}>
                <div className={`text-lg text-primary font-semibold`}>{spell.name[i18n.language] || ""}</div>
                <div className={`text-sm`}>{t(`data.spell.school.${spell.school}`)}</div>
                <BreedRenderer breeds={spell.breeds}/>
            </div>
            <SpellIcon className={`rounded-lg drag-none shrink-0`} spell={spell} />
        </div>
        <div className={`text-justify p-3  ${description.length > 1000 ? "text-sm" : ""}`}>
            {description}
        </div>
        <SpellTagRenderer tags={spell.tags} onTagClick={onTagClick}/>
        <div className={`grow`}></div>
        <div className={`flex flex-col gap-1 pt-1 text-sm`}>
            <div className={`flex gap-3  px-3`}>
                <RangeRenderer range={spell.range}/>
                <DurationRenderer duration={spell.duration}/>
                {spell.concentration && <ConcentrationRenderer/>}
                <ComponentsRenderer components={spell.components}/>
            </div>
            <div className={`flex gap-3 py-1 px-3 bg-primary text-primary-content`}>
                <CastingTimeRenderer castingTimes={spell.castingTime}/>
                <LevelRenderer level={spell.level}/>
            </div>
        </div>
    </div>
}

