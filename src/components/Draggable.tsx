import React, { ReactNode, useRef, useState } from "react";
import "./Draggable.css"

interface DraggableProps{
    children: ReactNode
    width: number
    height: number
}

const Draggable = (props: DraggableProps) => {
    const {width, height} = props
    const [isDrag, setIsDrag] = useState(false)
    const [marginTop, setMarginTop] = useState(0)
    const [marginLeft, setMarginLeft] = useState(0)
    const [left, setLeft] = useState(0)
    const [top, setTop] = useState(0)

    const draggerRef = useRef(null)
    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDrag(true)
        
        const dragger: HTMLDivElement|null = draggerRef.current as HTMLDivElement|null
        if(!dragger) return
        
        const target = e.target as HTMLDivElement
        if(target.className.includes("box")){
            let boxRect = target.getBoundingClientRect()
            // let boxRect = dragger.children[0].children[0].getBoundingClientRect()
            let draggerRect = dragger.getBoundingClientRect()
            const mouseMarginX = e.clientX - boxRect.x
            const mouseMarginY = e.clientY - boxRect.y
            setLeft(e.clientX - mouseMarginX - draggerRect.x)
            setTop(e.clientY - mouseMarginY - draggerRect.y)
            setMarginLeft(mouseMarginX)
            setMarginTop(mouseMarginY)
        }
    }

    const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDrag(false)
        setMarginLeft(0)
        setMarginTop(0)
    }

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(isDrag){
            const dragger: HTMLDivElement|null = draggerRef.current as HTMLDivElement|null
            if(!dragger) return
            const target = e.target as HTMLDivElement
            if(target.className.includes("box")){
                let draggerRect = dragger.getBoundingClientRect()
                let left = e.clientX - marginLeft - draggerRect.x
                let top = e.clientY - marginTop - draggerRect.y
                let boxRect = target.getBoundingClientRect()
                // let boxRect = dragger.children[0].children[0].getBoundingClientRect()
                if(left<0) left = 0
                if(top<0) top = 0
                if(left+boxRect.width > draggerRect.width) left = draggerRect.width - boxRect.width
                if(top+boxRect.height > draggerRect.height) top = draggerRect.height - boxRect.height
                setLeft(left)
                setTop(top)

            }
        
        }
    }

    const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDrag(false)
        setMarginLeft(0)
        setMarginTop(0)
    }

    return <>
        <div
            className="draggable"
            style={{width, height}}
            ref={draggerRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove} 
            onMouseUp={onMouseUp}>
            draggable
            <div className="boxWrapper" style={{left, top, cursor: isDrag?"grabbing":"grab"}}>
                {props.children}
            </div>
        </div>
    </>
}

export default Draggable;