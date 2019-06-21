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

    const testData = [
        {
            id: 1,
            url: "https://cdn.pixabay.com/photo/2015/07/27/19/47/turtle-863336__340.jpg"
        }, 
        {
            id: 2,
            url: "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F24283C3858F778CA2E"
        }
    ]

    return (
        <MainPresenter 
            settings={settings}
            itemSettings={itemSettings}
            testData={testData}
            bestData={bestData}
            bestLoading={bestLoading}
        />
    )
}