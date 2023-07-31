import { HTMLAttributes } from "react"

declare module "react-slick" {
    export interface Settings extends HTMLAttributes<HTMLElement> {
        // Add your settings props here
        dots?: boolean;
        slidesToShow?: number;
        slidesToScroll?: number;
        arrows: boolean,
        infinite: boolean,
        speed: number,
        swipe: boolean
    }

    export default class Slider extends React.Component<Settings, any> {}
}

export {}