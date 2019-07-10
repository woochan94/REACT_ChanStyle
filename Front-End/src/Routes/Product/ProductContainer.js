import React, { useEffect, useState } from "react";
import ProductPresenter from "./ProductPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { SEEITEM, ADD_CART, ADD_PAYMENT } from "./ProductQueries";
import _ from "underscore";
import { QUERY } from "../../Components/SharedQueries";

// react-router에서 match를 통해 url에 관한 정보(params, url ...)가 object로 넘어옴 
export default ({ match, history }) => {
    const {
        data: { isLoggedIn } 
    }= useQuery(QUERY);
    const productId = match.params.productid;

    const selectSize = document.getElementById("selectSize");

    const [selected, setSelected] = useState([]);
    const [count, setCount] = useState([]);
    const [totalarr, setTotalarr] = useState([]);

    const [color, setColor] = useState("");
    const [size, setSize] = useState("")
    const [stock, setStock] = useState("");
    const [stockId, setStockId] = useState("");
    const [colorId, setColorId] = useState("");
    const [sizeId, setSizeId] = useState("");
    const [optionState, setOptionState] = useState([]); 

    const [myId, setMyId] = useState("");

    const { data, loading } = useQuery(SEEITEM, {
        variables: {
            id: productId
        }
    });

    const [total, setTotal] = useState(0);

    // scroll state 
    const [scroll, setScroll] = useState({
        x: 0,
        y: 0
    })

    // size와 재고량, color를 같이 묶어주기 위한 배열객체 
    let option = [];

    if (loading === false) {
        data.seeproduct.map((item) => (
            item.sizes.map((_, index) => {
                return option.push(
                    {
                        colors: item.colors[index].color,
                        sizes: item.sizes[index].size,
                        stocks: item.stocks[index].stock,
                        sizeId: item.sizes[index].id,
                        stockId: item.stocks[index].id,
                        colorId: item.colors[index].id
                    }
                )
            })
        ))
    }

    // 언더스코어 라이브러리의 uniq 메소드를 이용하여 
    // 오브젝트 배열의 중복을 제거할 수 있음 
    const uniqColor = _.uniq(option, 'colors');

    // color에 따라 size와 재고량을 다시 묶어 주기 위한 배열 객체 

    useEffect(() => {
        const optionTemp =[];
        if(color !== "") {
            const filterColor = option.filter(item => {
                return item.colors === color
            }); 
            filterColor.map(data => (
                optionTemp.push(data)
            ));
            setOptionState([...optionTemp]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color])



    // color, size, stock 로직 정리  // 
    /*
        1. useQuery를 통해서 클릭한 제품에 대한 정보를 모두 가져온다.  
        2. color, size, stock이 모두 다른 객체배열로 되어 있기 때문에 3가지 항목을 묶은 새로운 배열객체를 만들어준다. 
            => size를 선택할 때 select에 관한 option에 size와 stock 값이 같이 나와야 하는데 
            => 서로 다른 객체배열로 되어있으면 구현하기가 힘들어서 
            => 위 코드에서 option 배열임 
        3. option값을 presenter에 넘겨주어서 사용하게 되면 중복된 값이 제거 없이 모두 출력되게 됨 
            => black black white white 이런식으로 (map을 사용하기 때문에)  
        4. option을 바로 사용하지 않고 color의 중복값을 먼저 제거해줌 
            => 언더스코어 라이브러리를 사용함 
        5. size 선택은 color값에 따른 size와 stock값만이 나와야 하기 때문에 선택한 color값에 따른 filter 메서드를 통해 새로운 객체 배열을 만들어줌 
            => 이 객체 배열에는 color값을 제외한 size와 stock 값만이 들어있음 
            => option2 배열 
     */

    const colorSelectOnChange = (e) => {
        setColor(e.target.value);
        // 사용자가 color의 선택값을 ""으로 바꿨을 때 
        // size의 value 값도 ""으로 바꿔주기 위한 코드 
        if (e.target.value === "") {
            selectSize.value = "";
        }
    }

    useEffect(() => {
        setSize("");
    }, [color])

    const sizeSelectOnChange = (e) => {
        if(e.target.value !== "") {
            const optionValue = e.target.value.split("-");

            setColorId(optionValue[1]);
            setSize(optionValue[2]);
            setSizeId(optionValue[3]);
            setStock(optionValue[4]); 
            setStockId(optionValue[5]);
        }
    }

    // sizeValue 값이 렌더링 (바뀔때마다) 될때마다 실행됨 
    useEffect(() => {
        if (size.length !== 0) {
            // 이미 추가된 항목인지를 검사해줄 변수 
            let isAdded = true;

            // 재고량 검사 
            if (stock === "0") {
                isAdded = false;
                alert("품절된 상품입니다.");
            }

            if (size !== "") {
                selected.map(item => {
                    // selected에 이미 들어가 있는 값이라면 isAdded 변수의 값을 false로 바꿔줌으로써 
                    // setSelected가 실행되는것을 막아줌.
                    if (item.size === size && item.color === color) {
                        isAdded = false;
                        return alert("이미 추가된 상품입니다.");
                    }
                    return null;
                })
                // 최초에는 무조건 실행이 됨  
                if (isAdded) {
                    setSelected([
                        ...selected, {
                            color,
                            colorId,
                            size,
                            sizeId,
                            stock,
                            stockId
                        }
                    ]);
                    setCount([...count, 1]);
                    setTotalarr([...totalarr, data.seeproduct[0].price]);
                }
            }
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size])

    // selected에 totalarr이 추가되었을 때 
    //      => 사용자가 새로운 옵션값의 상품을 추가했을 때 
    // 1개에 대한 total값을 적용시키기 위해서 
    useEffect(() => {
        if (totalarr.length > 0) {
            const asd = (a, b) => a + b;
            // reduce는 배열의 처음부터 끝까지 순환함 
            setTotal(totalarr.reduce(asd));
        }
    }, [totalarr])


    // count 값을 증가시켜줄 함수 
    const increment = (index, item) => {
        // temp에 현재 count 배열을 넣어준다. 
        const temp = count;
        const totalPrice = totalarr;
        if (count[index] < selected[index].stock) {
            // index번째에서 한개 요소를 제거하고 temp[index]+1의 값을 추가
            // temp는 값이 증가한 새로운 배열값으로 바뀜   
            temp.splice(index, 1, temp[index] + 1);
            totalPrice.splice(index, 1, totalPrice[index] + item.price);
            // 변경된 temp값을 setCount시켜줌 
            setCount([...temp]);
            setTotalarr([...totalPrice]);
        }
    }

    // count 값을 감소시켜줄 함수 
    const decrement = (index, item) => {
        const temp = count;
        const totalPrice = totalarr;
        if (count[index] > 1) {
            temp.splice(index, 1, temp[index] - 1);
            totalPrice.splice(index, 1, totalPrice[index] - item.price);
            setCount([...temp]);
            setTotalarr([...totalPrice]);
            const asd = (a, b) => a - b;
            setTotal(totalarr.reduce(asd));
        }
    }

    const onScroll = () => {
        setScroll({ x: window.scrollX, y: window.scrollY });
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    // 옵션 삭제 
    const deleteSelect = (index, selected) => {
        // 삭제 버튼의 인덱스를 제외한 배열을 새롭게 만든후 다시 set해준다. 
        // => 삭제 버튼 인덱스번째의 옵션을 제외한 체로 들어가게 됨 
        const aaa = selected.filter(item => item !== selected[index]);
        setSelected([...aaa]);

        if (selected.length === 1) {
            // 선택한 옵션이 한개 뿐일때  
            // 모든 옵션관련 state값을 초기값으로 초기화 해준다 (count, totalarr, total)
            setCount([]);
            setTotalarr([]);
            setTotal(0);
        } else {
            // 선택한 옵션이 두개 이상일 때 
            // 1. count[index], totalarr[index] 값을 제거
            // 2. index + 1 번째의 count와 totalarr 값을 index 번째로 가져와야 함 

            // =>   각각의 배열 (count, totalarr)을 map을 돌려서 클릭한 index 번호와 
            //      map의 index2 번호를 비교하여 같지 않은 map의 index2에 대한 값만 
            //      미리 만들어 놓은 새로운 배열에 push 하고 map이 끝난후 새로운 배열을 
            //      count와 totalarr에 각각 set해준다. 

            let deleteCount = [];
            count.map((item, index2) => {
                //console.log("if문 바깥쪽 - index : " + index + " index2 : " + index2 + " item : " + item); 
                if (index !== index2) {
                    //console.log("if문 안쪽 - index : " + index + " index2 : " + index2 + " item : " + item); 
                    deleteCount.push(item);
                }
                return null;
            });
            setCount(deleteCount);

            let deleteTotalarr = [];
            totalarr.map((item, index2) => {
                if (index !== index2) {
                    deleteTotalarr.push(item);
                }
                return null;
            });
            setTotalarr(deleteTotalarr);
        }
    }

    let productArray = [];
    let sizeIdArray = [];
    let colorIdArray = [];
    let stockIdArray = [];
    let countArray = [];

    const addCartMutation = useMutation(ADD_CART, {
        variables: {
            product: productArray,
            sizeId: sizeIdArray,
            colorId: colorIdArray,
            stockId: stockIdArray,
            count: countArray
        }
    })

    const [success, setSuccess] = useState(false);

    const addCart = async (selected, product, count) => {
        if(!isLoggedIn) {
            alert("로그인이 필요합니다.");
        } else {
            if(selected.length !== 0) {
                selected.map((item,index) => {
                    return (
                        productArray.push(product.id),
                        sizeIdArray.push(item.sizeId),
                        colorIdArray.push(item.colorId),
                        stockIdArray.push(item.stockId), 
                        countArray.push(count[index])
                    )
                }); 
                const { data } = await addCartMutation();
                if(data) {
                    setSuccess(true);
                    productArray = []; 
                    sizeIdArray = [];
                    colorIdArray = [];
                    stockIdArray = [];
                    countArray = [];
                }
            }
        }
    }

    const confirmClose = () => {
        setSuccess(false);
    }

    useEffect(() => {
        const myIdElement = document.getElementById("myPage"); 
        if(myIdElement !== null) {
            const myId = myIdElement.getAttribute("href").split("/")[1]; 
            setMyId(myId); 
        }
    }, [data])

    const addPaymentMutation = useMutation(ADD_PAYMENT, {
        variables: {
            product: productArray,
            size: sizeIdArray,
            color: colorIdArray,
            stock: stockIdArray,
            count: countArray
        }
    })

    const addPayment = async (selected, product, count) => {
        if(!isLoggedIn) {
            alert("로그인이 필요합니다.");
        } else {
            if(selected.length !== 0) {
                selected.map((item,index) => {
                    return (
                        productArray.push(product.id),
                        sizeIdArray.push(item.sizeId),
                        colorIdArray.push(item.colorId),
                        stockIdArray.push(item.stockId), 
                        countArray.push(count[index])
                    )
                }); 
                const { data } = await addPaymentMutation();
                if(data) {
                    productArray = []; 
                    sizeIdArray = [];
                    colorIdArray = [];
                    stockIdArray = [];
                    countArray = [];
                    setTimeout(() => history.push('/payment'), 500); 
                }
            } else {
                alert("상품의 옵션을 선택해 주세요");
            }
        }
    }

    return (
        <ProductPresenter
            data={data.seeproduct}
            loading={loading}
            uniqColor={uniqColor}
            option={optionState}
            colorSelectOnChange={colorSelectOnChange}
            sizeSelectOnChange={sizeSelectOnChange}
            color={color}
            selected={selected}
            count={count}
            setCount={setCount}
            increment={increment}
            decrement={decrement}
            total={total}
            scroll={scroll}
            deleteSelect={deleteSelect}
            addCart={addCart}
            success={success}
            confirmClose={confirmClose}
            myId={myId}
            addPayment={addPayment}
        />
    );
};