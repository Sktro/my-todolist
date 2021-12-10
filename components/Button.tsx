import React from "react";

type propsType = {
    name: string
    callBack:()=> void
    color?: string
}

export const Button = ({name, callBack, ...props}: propsType) => {

    const onClickHandler =()=> {
        callBack()
    }

    return (
        <button className={props.color} onClick={onClickHandler}>{name}</button>
    )
}
