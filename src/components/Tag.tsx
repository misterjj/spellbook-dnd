import {Trans, useTranslation} from "react-i18next";

export interface ITag {
    value: string,
    onClick?: (tag: string) => void,
}

export function Tag({value, onClick}: ITag) {
    const {t} = useTranslation()

    return <div className={`badge badge-outline text-sm select-none ${onClick !== undefined ? "cursor-pointer": ""}`}
                onClick={onClick !== undefined ? () => onClick(value) : () => {}}>
        <Trans t={t}>data.spell.tag.{value}</Trans>
    </div>
}