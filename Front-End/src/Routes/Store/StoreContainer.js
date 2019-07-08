import React, {useEffect} from "react"; 
import StorePresenter from "./StorePresenter";

export default () => {
    let istopToggle = false; 
    let isBottomToggle = false; 
    let isMenuListToggle = false;

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

    const onResize = () => {
        if(window.innerWidth >= 600) {
            const menuListDiv = document.getElementById("menuList"); 
            menuListDiv.style.display = "block";
        }
    }

    useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    })

    return (
        <StorePresenter  
            topToggle={topToggle}
            bottomToggle={bottomToggle}
            menuListToggle={menuListToggle}
        />
    )
}