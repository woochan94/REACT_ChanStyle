import React from "react"; 
import MainPresenter from "./MainPresenter";
import { MAIN_SEEITEM } from './MainQueries';
import { useQuery } from 'react-apollo-hooks';

export default () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
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

    const itemSettings = {
        dots: false, 
        infinite: false, 
        rows: 4, 
        slidesToShow: 1,
        autoplay: false,
        arrows: false,
        swipe: false,
        responsive: [
            {
                breakpoint: 900, 
                settings: {
                    dots: false, 
                    infinite: false, 
                    rows: 2,
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    dots: true,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    rows: 1,
                    arrows: false,
                    swipe: true
                }
            },
            {
                breakpoint: 400, 
                settings: {
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    rows: 1,
                    arrows: false,
                    swipe: true
                }
            }
        ]
    }

    // 베스트 아이템 
    const { data: bestData, loading: bestLoading } = useQuery(MAIN_SEEITEM, {
        variables: {
            sort: "best"
        }
    });
    // 최신 아이템 
    const { data: newData, loading: newLoading } = useQuery(MAIN_SEEITEM, {
        variables: {
            sort: "new"
        }
    });


    const testData = [
        {
            id: 1,
            url: process.env.REACT_APP_SLIDE1
        }, 
        {
            id: 2,
            url: process.env.REACT_APP_SLIDE2
        }
    ]

    return (
        <MainPresenter 
            settings={settings}
            itemSettings={itemSettings}
            testData={testData}
            bestData={bestData}
            newData={newData}
            bestLoading={bestLoading}
            newLoading={newLoading}
        />
    )
}