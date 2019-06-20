import React from "react"; 
import MainPresenter from "./MainPresenter";

export default () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3500,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    arrows: false
                }
            }
        ]
    }

    return (
        <MainPresenter 
            settings={settings}
        />
    )
}