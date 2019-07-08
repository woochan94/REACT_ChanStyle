import React, { useEffect, useState } from "react"; 
import StorePresenter from "./StorePresenter";
import { useMutation } from "react-apollo-hooks";
import { SEE_ALL_BESTITEM, SEE_PRODUCT } from "./StoreQueries";

export default () => {
    let istopToggle = false; 
    let isBottomToggle = false; 
    let isMenuListToggle = false;

    const [title, setTitle] = useState("ALL"); 
    const [best, setBest] = useState([]);
    const [all, setAll] = useState([]);

    const settings = {
        dots: false, 
        infinite: false, 
        swipe: false,
        arrows: false,
        autoplay: false,
        slidesToShow: 1,
        rows: 4,
        responsive: [
            {
                breakpoint: 1024, 
                settings: {
                    dots: true, 
                    slidesToShow: 3, 
                    sliesToScroll: 1, 
                    arrows: true,
                    rows: 1
                }
            },
            {
                breakpoint: 768, 
                settings: {
                    dots: true, 
                    slidesToShow: 2, 
                    slideToScroll: 2, 
                    arrows: true, 
                    rows: 1
                }
            },
            {
                breakpoint: 600, 
                settings: {
                    dots: true, 
                    arrows: false, 
                    swipe: true,
                    slidesToShow: 2, 
                    slideToScroll: 2, 
                    rows: 1
                }
            }
        ]
    }

    const topToggle = () => {
        const TopDiv = document.getElementById("top");
        
        if(istopToggle) {
            istopToggle = false;
            TopDiv.style.display = "none";
        } else {
            istopToggle = true;
            TopDiv.style.display = "block";
        }
    }
    const bottomToggle = () => {
        const bottomDiv = document.getElementById("bottom");
        
        if(isBottomToggle) {
            isBottomToggle = false;
            bottomDiv.style.display = "none";
        } else {
            isBottomToggle = true;
            bottomDiv.style.display = "block";
        }
    }

    const menuListToggle = () => {
        const menuListDiv = document.getElementById("menuList"); 


        if(matchMedia("(max-width: 600px)").matches) {
            if(isMenuListToggle) {
                isMenuListToggle = false; 
                menuListDiv.style.display = "none";
            } else {
                isMenuListToggle = true; 
                menuListDiv.style.display = "block";
            }
        }
    }

    // with가 600 이상이 되었을 때 menuList가 보이게끔 하기 위함 
    // 600 이하에서 menuList를 접은상태에서 resize를 하게되면 menuList가 접혀있는상태가 되어 있으므로 
    const onResize = () => {
        if(window.innerWidth >= 600) {
            const menuListDiv = document.getElementById("menuList"); 
            menuListDiv.style.display = "block";
        }
    }

    useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    },[])

    const menuClick = (name) => {
        setTitle(name);
    }


    // ALL 
    const seeAllBestItemMutation = useMutation(SEE_ALL_BESTITEM, {
        variables: {
            sort: "all"
        }
    })

    const seeAllItemMutation = useMutation(SEE_PRODUCT, {
        variables: {
            sort: "all"
        }
    })

    const seeAllItemFunction = async() => {
        const { data } = await seeAllItemMutation(); 
        if (data) {
            setAll(data);
        }
    }

    const seeAllBestItemFunction = async() => {
        const { data } = await seeAllBestItemMutation();
        if(data) {
            setBest(data);
            seeAllItemFunction();
        }
    }

    useEffect(() => {
        if(title === "ALL") {
            seeAllBestItemFunction();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[title])

    return (
        <StorePresenter  
            topToggle={topToggle}
            bottomToggle={bottomToggle}
            menuListToggle={menuListToggle}
            title={title}
            menuClick={menuClick}
            best={best} 
            all={all}
            settings={settings}
        />
    )
}