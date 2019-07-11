import React, { useEffect, useState, useRef } from "react"; 
import AdminPresenter from "./AdminPresenter"
import { useMutation } from "react-apollo-hooks";
import { LOG_OUT } from "../Mypage/MyPageQueries";
import { storage } from "../../Firebase";
import { UPLOAD } from "./AdminQueries";

export default () => {
    const [smallClassification, setSmall] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [mainCategory, setMainCategory] = useState(""); 
    const [subCategory, setSubCategory] = useState(""); 
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [stock, setStock] = useState([]);

    const [file, setFile] = useState("");
    const [fileUrl, setFileUrl] = useState([]);

    const previewImg = useRef();

    // productDetailFiles와 sizeFile은 고정값을 넣어줬음 (file업로드와 같은 작업이기때문에)
    const uploadMutation = useMutation(UPLOAD, {
        variables: {
            name, 
            price, 
            mainCategory, 
            subCategory, 
            files: fileUrl, 
            sizes: size, 
            colors: color, 
            stocks: stock,
            productDetailFiles: [""],
            productSizeFiles: ["https://mblogthumb-phinf.pstatic.net/MjAxNzExMDdfMTQ3/MDAxNTEwMDQxODYyMjY1.kAvpXchJkjzWlDqtAQgYS7MLR9PFVIIe4vcBfUR6jOQg.FHU59tAPCbw6YolyoEnnpALAKzu9-01K41e8-Nj3vlQg.JPEG.siyeonzzz/171106061107.jpg?type=w800"]
        }
    }); 

    const uploadFunction = async () => {
        const { data } = await uploadMutation();
        if(data) {
            //초기화
            setName(""); 
            setPrice(0); 
            setMainCategory(""); 
            setSubCategory("");
            setFileUrl([]); 
            setFile(""); 
            setColor([]);
            setSize([]); 
            setStock([]);

            alert("업로드가 완료되었습니다");

            document.getElementById("Name").value = "";
            document.getElementById("Price").value = "";
            setMainCategory("");
            setSubCategory("");
            previewImg.current.src = "https://www.namdokorea.com/site/jeonnam/tour/images/noimage.gif"; 
            
            let colorClass = document.getElementsByClassName("color"); 
            let sizeClass = document.getElementsByClassName("size"); 
            let stockClass = document.getElementsByClassName("stock"); 

            for(let i = 0; i < colorClass.length; i++) {
                colorClass[i].value = "";
                sizeClass[i].value = "";
                stockClass[i].value = "";
            }
        }
    }
    
    // 이미지 미리보기 기능 
    const preview = (e) => {
        const getFile = e.target.files;
        const reader = new FileReader(); 

        reader.onload = () => {
            previewImg.current.src = reader.result;            
        }

        if(getFile) {
            reader.readAsDataURL(getFile[0]);
            setFile(getFile[0]);
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
            setSmall(["티셔츠", "셔츠"]); 
            setMainCategory("상의");
        } else if (e.target.value === "하의") {
            setSmall(["청바지", "슬랙스"]);
            setMainCategory("하의");
        } else {
            setSmall([]);
            setMainCategory("");
        }
    }

    const subSelectChange = (e) => {
        if(e.target.value === "청바지") {
            setSubCategory("청바지"); 
        } else if(e.target.value === "슬랙스") {
            setSubCategory("슬랙스"); 
        } else if(e.target.value === "셔츠") {
            setSubCategory("셔츠");
        } else if(e.target.value === "티셔츠") {
            setSubCategory("티셔츠");
        }
        
        else {
            setSubCategory("");
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
        input.className = "color";
        input2.className = "size"; 
        input3.className = "stock";
        cell1.appendChild(input);
        cell2.appendChild(input2);
        cell3.appendChild(input3);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        let colorClass = document.getElementsByClassName("color"); 
        let sizeClass = document.getElementsByClassName("size"); 
        let stockClass = document.getElementsByClassName("stock"); 
        const nameValue = document.getElementById("Name").value; 
        const priceValue = document.getElementById("Price").value

        let colorArray = []; 
        let sizeArray = [];
        let stockArray = [];

        // 값 검사 
        if(nameValue === "" || nameValue === null || nameValue === undefined) {
            alert("상품명을 입력해주세요"); 
            return false; 
        } else if (priceValue === "" || priceValue === null || priceValue === undefined) {
            alert("상품 가격을 입력해주세요"); 
            return false; 
        } else if (mainCategory === "" || mainCategory === 0) {
            alert("대분류를 선택해주세요"); 
            return false; 
        } else if (subCategory === "" || subCategory === 0) {
            alert("소분류를 선택해주세요"); 
            return false; 
        } else if (file === "") {
            alert("상품 이미지를 선택해주세요"); 
            return false; 
        } else {
            setName(nameValue);
            setPrice(Number(priceValue));
            
            for(let i = 0; i < colorClass.length; i++) {
                if(colorClass[i].value !== "") {
                    if(sizeClass[i].value === "" || stockClass.value === "") {
                        alert("색상, 사이즈, 재고량의 입력 개수가 같아야 합니다."); 
                        return false;
                    } else {
                        colorArray.push(colorClass[i].value); 
                        sizeArray.push(sizeClass[i].value); 
                        stockArray.push(Number(stockClass[i].value));
                    }
                }
            }

            if(colorArray.length === 0 || sizeArray.length === 0 || stockArray.length === 0) {
                alert("옵션 값을 입력해주세요");
                return false;
            } else {
                setColor(colorArray); 
                setSize(sizeArray); 
                setStock(stockArray);
            }
            
            // 파일 업로드 
            const uploadTask = await storage.ref(`images/${file.name}`).put(file);
            await uploadTask.task.on('state_changed', 
                snapshot => {
                    // progress function 
                    const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100); 
                    console.log(progress);
                }, 
                error => {
                    console.log(error);
                }, 
                async () => {
                    // complete function
                    await uploadTask.task.snapshot.ref.getDownloadURL()
                    .then(url => {
                        let urlArray = []; 
                        urlArray.push(url);
                        setFileUrl(urlArray);
                    })
                }
            )
        } 
    }

  

    useEffect(() => {
        if(name !== "" && price !== "" && fileUrl.length !== 0 && color.lnegth !== 0) {
            uploadFunction();
        } 
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[fileUrl])


    return (
        <AdminPresenter 
            logOut={logOut}
            customFileBtn={customFileBtn}
            selectChange={selectChange}
            subSelectChange={subSelectChange}
            smallClassification={smallClassification}
            addTable={addTable}
            onSubmit={onSubmit}
            previewImg={previewImg}
        />
    )
}