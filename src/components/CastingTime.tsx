import {SpellCastingTime, TimeDuration} from "@/data/Spell";
import {FaCircle} from "react-icons/fa6";
import {Trans, useTranslation} from "react-i18next";
import {TbTriangleFilled} from "react-icons/tb";
import {MdPentagon} from "react-icons/md";
import {PiStarFourFill} from "react-icons/pi";
import {HiOutlineClock} from "react-icons/hi";

interface ICastingTime {
    ct: SpellCastingTime
}

export function CastingTime({ct}: ICastingTime) {
    const {t} = useTranslation();

    if (ct === "Action") {
        return (
            <>
                <div className={`flex items-center gap-1`}>
                    <FaCircle size={10} className={`text-success`}/>
                    <span className={`text-sm`}><Trans t={t}>spell-layout.casting-time.action</Trans></span>
                </div>
            </>
        )
    } else if (ct === "Bonus Action") {
        return (
            <>
                <div className={`flex items-center gap-1`}>
                    <TbTriangleFilled size={13} className={`text-warning`}/>
                    <span className={`text-sm`}><Trans
                        t={t}>spell-layout.casting-time.bonus-action</Trans></span>
                </div>
            </>
        )
    } else if (ct === "Ritual") {
        return (
            <>
                <div  className={`flex items-center gap-1`}>
                    <MdPentagon size={13} className={`text-error`}/>
                    <span className={`text-sm`}><Trans t={t}>spell-layout.casting-time.ritual</Trans></span>
                </div>
            </>
        )
    } else if (ct === "Reaction") {
        return (
            <>
                <div className={`flex items-center gap-1`}>
                    <PiStarFourFill size={13} className={`text-error`}/>
                    <span className={`text-sm`}><Trans t={t}>spell-layout.casting-time.reaction</Trans></span>
                </div>
            </>
        )
    } else if (typeof ct === 'object' && ct !== null) {
        return (
            <>
                <div className={`flex items-center gap-1`}>
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
}