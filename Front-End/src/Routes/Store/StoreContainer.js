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

    const first = 8;
    const [skip, setSkip] = useState(0); 
    const [pLoading, setPloading] = useState(false);
    const [dataTemp, setDataTemp] = useState([]);

    // 페이징 
    const clickMore = () => {
        setPloading(true);
        setSkip(skip+first); 
    }

    useEffect(() => {
        if(skip !== 0) {
            seeAllItemFunction();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[skip])




    const [sort, setSort] = useState("");
    const [mainCategory, setMaincategory] = useState();
    const [subCategory, setSubCategory] = useState();

    // ALL 
    const seeAllBestItemMutation = useMutation(SEE_ALL_BESTITEM, {
        variables: {
            sort,
            mainCategory,
            subCategory
        }
    })

    const seeAllItemMutation = useMutation(SEE_PRODUCT, {
        variables: {
            sort,
            mainCategory,
            subCategory,
            first,
            skip
        }
    })

    const seeAllItemFunction = async() => {
        const { data } = await seeAllItemMutation(); 
        if (data) {
            setDataTemp(data);
            setAll([...all, ...data.seeProductAll]);
            setPloading(false);
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
        setBest([]); 
        setAll([]);
        if(title === "ALL") {
            setSort("all");   
            setMaincategory("");
            setSubCategory("");
            setSkip(0);
        } else if(title === "Top ALL") {
            setSort("all"); 
            setMaincategory("상의");
            setSubCategory("");
            setSkip(0);
        } else if (title === "BOTTOM ALL") {
            setSort("all"); 
            setMaincategory("하의");
            setSubCategory("");
            setSkip(0);
        } else if (title === "T-Shirt") {
            setSort("all"); 
            setMaincategory("상의"); 
            setSubCategory("티셔츠");
            setSkip(0);
        } else if (title === "Shirt") {
            setSort("all"); 
            setMaincategory("상의"); 
            setSubCategory("셔츠");
            setSkip(0);
        } else if (title === "Jean") {
            setSort("all"); 
            setMaincategory("하의"); 
            setSubCategory("청바지");
            setSkip(0);
        } else if (title === "Slacks") {
            setSort("all"); 
            setMaincategory("하의"); 
            setSubCategory("슬랙스");
            setSkip(0);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[title])

    useEffect(() => {
        if(title !== "" && sort !== "") {
            seeAllBestItemFunction();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[mainCategory, subCategory])

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
            clickMore={clickMore}
            pLoading={pLoading}
            dataTemp={dataTemp}
        />
    )
}