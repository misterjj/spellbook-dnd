import {Trans, useTranslation} from "react-i18next";

export interface ITag {
    value: string
}

export function Tag({value}: ITag) {
    const {t} = useTranslation()

    return <div className={`badge badge-outline text-sm`}>
        <Trans t={t}>data.spell.tag.{value}</Trans>
    </div>
}