import React, { useState } from "react"; 
import MyPagePresenter from "./MyPagePresenter"; 

export default ({match}) => {
    const userId = match.params.userId; 

    const [tab, setTab] = useState("cart");

    const clickTab = (tabString) => {
        setTab(tabString);
    }

    return (
        <MyPagePresenter 
            tab={tab}
            clickTab={clickTab}
        />
    )
}