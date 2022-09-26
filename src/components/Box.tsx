import React from "react";
import './Box.css';

interface BoxProps{
    width: number
    height: number
    backgroundColor: string
    color: string
}

const Box = (props: BoxProps) => {
    const {width, height, backgroundColor, color} = props
    return <>
        <div className="box" style={{width, height, backgroundColor, color}}>
            box
        </div>
    </>
}

export default Box;