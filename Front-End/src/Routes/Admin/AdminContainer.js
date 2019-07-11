import React, { useEffect } from "react"; 
import AdminPresenter from "./AdminPresenter"
import { useMutation } from "react-apollo-hooks";
import { LOG_OUT } from "../Mypage/MyPageQueries";

export default () => {

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

    const logOut = useMutation(LOG_OUT);

    const customFileBtn = () => {
        document.getElementById("fileInput").click();
    }


    return (
        <AdminPresenter 
            logOut={logOut}
            customFileBtn={customFileBtn}
        />
    )
}