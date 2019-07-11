import React, { useEffect, useState } from "react"; 
import AdminPresenter from "./AdminPresenter"
import { useMutation } from "react-apollo-hooks";
import { LOG_OUT } from "../Mypage/MyPageQueries";

export default () => {

    const [smallClassification, setSmall] = useState([]);

    // 이미지 미리보기 기능 
    const preview = (e) => {
        const getFile = e.target.files;
        const reader = new FileReader(); 
        const previewImg = document.getElementById("previewImg");

        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            }
        })(previewImg)

        if(getFile) {
            reader.readAsDataURL(getFile[0]);
        }
    }

    useEffect(() => {
        document.getElementById("fileInput").addEventListener("change", preview);
    },[])

    
    const customFileBtn = () => {
        document.getElementById("fileInput").click();
    }
    
    // 로그아웃 
    const logOut = useMutation(LOG_OUT);

    // 소분류 option값 변경 
    const selectChange = (e) => {
        if(e.target.value === "상의") {
            setSmall(["티셔츠", "셔츠"])
        } else if (e.target.value === "하의") {
            setSmall(["청바지", "슬랙스"]);
        } else {
            setSmall([]);
        }
    }

    // 테이블 행 추가 
    const addTable = () => {
        const tbody = document.getElementById("tbody");
        const row = tbody.insertRow(tbody.rows.length);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        let input = document.createElement("input");
        let input2 = document.createElement("input");
        let input3 = document.createElement("input");
        cell1.appendChild(input);
        cell2.appendChild(input2);
        cell3.appendChild(input3);
    }

    return (
        <AdminPresenter 
            logOut={logOut}
            customFileBtn={customFileBtn}
            slectChange={selectChange}
            smallClassification={smallClassification}
            addTable={addTable}
        />
    )
}