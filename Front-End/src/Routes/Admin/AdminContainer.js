import React, { useEffect, useState, useRef } from "react";
import AdminPresenter from "./AdminPresenter"
import { useMutation } from "react-apollo-hooks";
import { LOG_OUT } from "../Mypage/MyPageQueries";
import { storage } from "../../Firebase";
import { UPLOAD, EDIT_SEE_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT } from "./AdminQueries";

export default () => {
    // Admin창의 tab메뉴 
    const [tab, setTab] = useState("enrollment");
    const clickTab = (tabString) => {
        setTab(tabString);
    }

    // state 
    // 상품 등록을 위한 state 
    const [smallClassification, setSmall] = useState([]); // 대분류에 따른 소분류 값을 넣어주기 위한 state (option) 
    const [name, setName] = useState(""); // 상품 이름 
    const [price, setPrice] = useState(0); // 상품 가격 
    const [mainCategory, setMainCategory] = useState(""); // 대분류 선택값 
    const [subCategory, setSubCategory] = useState(""); // 소분류 선택값 
    const [color, setColor] = useState([]); // 상품 색깔
    const [size, setSize] = useState([]); // 상품 사이즈
    const [stock, setStock] = useState([]); // 상품 제고 
    const [file, setFile] = useState("");
    const [fileUrl, setFileUrl] = useState([]);

    // 상품 수정을 위한 state 

    const [editData, setEditData] = useState();
    
    const [editData2, setEditData2] = useState();
    const [sizeId, setSizeId] = useState([]);
    const [colorId, setColorId] = useState([]);
    const [stockId, setStockId] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
 
    // ref 
    const previewImg = useRef();
    const previewEditImg = useRef();


    useEffect(() => {
        if (tab === "enrollment") {
            document.getElementById("fileInput").addEventListener("change", preview);
        } else if (tab === "edit") {
            seeProductFunction();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab])




    ////////////////////////////////////// 상품 등록 ////////////////////////////////////////////////////////////////

    // 업로드 Mutation 
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
        if (data) {
            // state 초기화
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
            
            // Form 입력값 초기화 
            let colorClass = document.getElementsByClassName("color");
            let sizeClass = document.getElementsByClassName("size");
            let stockClass = document.getElementsByClassName("stock");

            document.getElementById("Name").value = "";
            document.getElementById("Price").value = "";
            previewImg.current.src = "https://www.namdokorea.com/site/jeonnam/tour/images/noimage.gif";
            document.getElementById("mainCategorySelect").value  = "0";
            document.getElementById("subCategorySelect").value = "0";

            for (let i = 0; i < colorClass.length; i++) {
                colorClass[i].value = "";
                sizeClass[i].value = "";
                stockClass[i].value = "";
            }
        }
    }

    // 소분류 option값 변경 
    // 대분류 선택값에 따라 소분류 option값을 제한하기 위해서 
    const selectChange = (e) => {
        if (e.target.value === "상의") {
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
        if (e.target.value === "청바지") {
            setSubCategory("청바지");
        } else if (e.target.value === "슬랙스") {
            setSubCategory("슬랙스");
        } else if (e.target.value === "셔츠") {
            setSubCategory("셔츠");
        } else if (e.target.value === "티셔츠") {
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

    const customFileBtn = () => {
        document.getElementById("fileInput").click();
    }

    // 이미지 미리보기 기능 
    const preview = (e) => {
        const getFile = e.target.files;
        const reader = new FileReader();

        reader.onload = () => {
            previewImg.current.src = reader.result;
        }

        if (getFile) {
            reader.readAsDataURL(getFile[0]);
            setFile(getFile[0]);
        }
    }


    const onSubmit = async (e) => {
        e.preventDefault();

        let colorClass = document.getElementsByClassName("color");
        let sizeClass = document.getElementsByClassName("size");
        let stockClass = document.getElementsByClassName("stock");
        const nameValue = document.getElementById("Name").value;
        const priceValue = document.getElementById("Price").value

        // color, size, stock state에 배열값을 한번에 집어 넣기 위한 빈 배열 값 (buf 역할)
        let colorArray = [];
        let sizeArray = [];
        let stockArray = [];

        // 값 검사 
        if (nameValue === "" || nameValue === null || nameValue === undefined) {
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

            for (let i = 0; i < colorClass.length; i++) {
                if (colorClass[i].value !== "") {
                    if (sizeClass[i].value === "" || stockClass.value === "") {
                        alert("색상, 사이즈, 재고량의 입력 개수가 같아야 합니다.");
                        return false;
                    } else {
                        // 값이 들어 있는 행의 값들을 각각의 배열에 push한다. 
                        // state에 넣기 위해서 
                        colorArray.push(colorClass[i].value);
                        sizeArray.push(sizeClass[i].value);
                        stockArray.push(Number(stockClass[i].value));
                    }
                }
            }

            if (colorArray.length === 0 || sizeArray.length === 0 || stockArray.length === 0) {
                alert("옵션 값을 입력해주세요");
                return false;
            } else {
                setColor(colorArray);
                setSize(sizeArray);
                setStock(stockArray);
            }

            // 수정인지 등록인지 구분 
            // 수정이라면 ediTdata2가 존재하고 등록이라면 존재하지 않는다. 
            if (editData2 !== undefined) {
                if (file !== editData2.seeProductAll[0].files[0].url) {
                    // 파일 업로드 
                    const uploadTask = await storage.ref(`images/${file.name}`).put(file);
                    await uploadTask.task.on('state_changed',
                        snapshot => {
                            // progress function 
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
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
                                setIsEdit(true); // 수정임을 구분하기 위해서 
                            })
                        }
                    )
                } else {
                    setIsEdit(true);
                }
            } else {
                // 파일 업로드 
                const uploadTask = await storage.ref(`images/${file.name}`).put(file);
                await uploadTask.task.on('state_changed',
                    snapshot => {
                        // progress function 
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
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
    }

    // 파일에 대한 처리가 가장 늦으므로 fileUrl에 값이 들어오면 uploadFunction을 실행시킴 
    // file이 아니라 다른값을 하게 되면 fileUrl 에 값이 들어오기도 전에 upload가 실행되서 파일에 대한 값이 들어가지 못함 
    useEffect(() => {
        if (editData2 === undefined && name !== "" && price !== "" && fileUrl.length !== 0 && color.lnegth !== 0) {
            uploadFunction();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileUrl])






    ////////////////////////////////////// 상품 수정 ////////////////////////////////////////////////////////////////

    // 상품을 수정하기 위한 전체상품을 보여주는 mutation 
    const seeProductMutation = useMutation(EDIT_SEE_PRODUCT, {
        variables: {
            sort: "all"
        }
    });

    const seeProductFunction = async () => {
        const { data } = await seeProductMutation();
        if (data) {
            setEditData(data);
        }
    }

    const editMutation = useMutation(EDIT_PRODUCT);

    const customEditFileBtn = () => {
        document.getElementById("editFileInput").click();
    }

    const editPreview = (e) => {
        const getFile = e.target.files;
        const reader = new FileReader();

        reader.onload = () => {
            previewEditImg.current.src = reader.result;
        }

        if (getFile) {
            reader.readAsDataURL(getFile[0]);
            setFile(getFile[0]);
        }
    }

    // edit 버튼 클릭 이벤트 
    const editClick = async (id) => {
        // 수정 폼을 modal창 처럼 띄워주기 위함 
        const modal = document.getElementById("modal");
        const close = document.getElementById("close");

        if (modal.style.display === "block") {
            modal.style.display = "none";
        } else {
            modal.style.display = "block";
        }

        close.onclick = () => {
            modal.style.display = "none";
            setEditData2();
        }

        // modal창이 아닌 바깥부분 클릭시에도 창이 닫히게끔  
        if (modal.style.display === "block") {
            window.onclick = (event) => {
                if (event.target === modal) {
                    modal.style.display = "none";
                    setEditData2(); // editData2의 값을 초기화 
                }
            }
        }

        // 수정버튼을 클릭한 상품의 정보를 보여주기 위한 Mutation 
        const { data } = await seeProductMutation({
            variables: {
                id,
                sort: "all"
            }
        })

        if (data) {
            setEditData2(data);
            setFile(data.seeProductAll[0].files[0].url);
            setName(data.seeProductAll[0].name);
            setPrice(data.seeProductAll[0].price); 
            
            let sizeIdArray = [];
            let colorIdArray = [];
            let stockIdArray = [];
            for(let i = 0; i < data.seeProductAll[0].sizes.length; i++) {
                sizeIdArray.push(data.seeProductAll[0].sizes[i].id); 
                colorIdArray.push(data.seeProductAll[0].colors[i].id);
                stockIdArray.push(data.seeProductAll[0].stocks[i].id);
            }
            setSizeId(sizeIdArray);
            setColorId(colorIdArray);
            setStockId(stockIdArray);

            document.getElementById("editFileInput").addEventListener("change", editPreview);
            // eslint-disable-next-line
            for (let i, j = 0; i = document.getElementById("mainSelect").options[j]; j++) {
                if (i.value === data.seeProductAll[0].mainCategory) {
                    document.getElementById("mainSelect").selectedIndex = j;
                    if (document.getElementById("mainSelect").selectedIndex === 1) {
                        setMainCategory("상의");
                        setSmall(["티셔츠", "셔츠"]);
                    } else if (document.getElementById("mainSelect").selectedIndex === 2) {
                        setMainCategory("하의");
                        setSmall(["청바지", "슬랙스"]);
                    }
                    break;
                }
            }

            // eslint-disable-next-line
            for (let i, j = 0; i = document.getElementById("subSelect").options[j]; j++) {
                if (i.value === data.seeProductAll[0].subCategory) {
                    document.getElementById("subSelect").selectedIndex = j;
                    if (document.getElementById("mainSelect").selectedIndex === 1 && document.getElementById("subSelect").selectedIndex === 1) {
                        setSubCategory("티셔츠");
                    } else if (document.getElementById("mainSelect").selectedIndex === 1 && document.getElementById("subSelect").selectedIndex === 2) {
                        setSubCategory("셔츠");
                    } else if (document.getElementById("mainSelect").selectedIndex === 2 && document.getElementById("subSelect").selectedIndex === 1) {
                        setSubCategory("청바지");
                    } else if (document.getElementById("mainSelect").selectedIndex === 2 && document.getElementById("subSelect").selectedIndex === 2) {
                        setSubCategory("슬랙스");
                    }
                    break;
                }
            }
        }
    }

    const editFunction = async() => {
        const { data } = await editMutation({variables: {
            id:editData2.seeProductAll[0].id,
            name,
            price,
            mainCategory, 
            subCategory,
            fileId: editData2.seeProductAll[0].files[0].id, 
            file: fileUrl, 
            sizeId, 
            sizeValue: size, 
            colorId, 
            colorValue: color, 
            stockId, 
            stockValue: stock,
            productId: editData2.seeProductAll[0].id
        }});
        if(data) {
            setName("");
            setPrice(0);
            setMainCategory("");
            setSubCategory("");
            setFileUrl([]);
            setFile("");
            setColor([]);
            setSize([]);
            setStock([]);
            setEditData2();
            setIsEdit(false);
            setSizeId([]);
            setColorId([]);
            setStockId([]);

            seeProductFunction(); // 모든 값을 초기화 시켜줬으면 다시 전체상품 보여주는 Mutation을 실행시킴으로써 변경값을 업데이트 시켜준다. 
            document.getElementById("modal").style.display = "none";
        }
    }

    useEffect(() => {
        if(isEdit) {
            editFunction();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit])






    ////////////////////////////////////// 상품 삭제 ////////////////////////////////////////////////////////////////

    const deleteProductMutation = useMutation(DELETE_PRODUCT);

    const deleteClick = async (id) => {
        let result = window.confirm("해당 상품을 삭제하시겠습니까?");

        if (result) {
            const { data } = await deleteProductMutation({
                variables: {
                    id: id
                }
            });
            if (data) {
                seeProductFunction();
            }
        } else {

        }
    }

    // 로그아웃 
    const logOut = useMutation(LOG_OUT);

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
            tab={tab}
            clickTab={clickTab}
            editData={editData}
            editClick={editClick}
            deleteClick={deleteClick}
            editData2={editData2}
            previewEditImg={previewEditImg}
            customEditFileBtn={customEditFileBtn}
            editPreview={editPreview}
        />
    )
}









    





    

    


















 

