import React from "react"; 
import AdminPresenter from "./AdminPresenter"
import { useMutation } from "react-apollo-hooks";
import { LOG_OUT } from "../Mypage/MyPageQueries";

export default () => {
    const logOut = useMutation(LOG_OUT);
    return (
        <AdminPresenter 
            logOut={logOut}
        />
    )
}