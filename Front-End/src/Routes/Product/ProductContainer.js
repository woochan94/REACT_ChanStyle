import React, {useEffect, useState} from "react"; 
import ProductPresenter from "./ProductPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEEITEM } from "./ProductQueries";
import useInput from "../../Hooks/useInput";
import _ from "underscore";

// react-router에서 match를 통해 url에 관한 정보(params, url ...)가 object로 넘어옴 
export default ({match}) => {
    const productId = match.params.productid;

    const selectSize = document.getElementById("selectSize");

    // 입력값을 받아오기위한 useInput 
    const color = useInput("");
    const [sizeValue, setSizeValue] = useState("")
    const [stock, setStock] = useState(""); 

    const [selected, setSelected] = useState([]); 
    const [count, setCount] = useState([]);
    const [totalarr, setTotalarr] = useState([]);
    
    const { data, loading } = useQuery(SEEITEM, {
        variables: {
            id: productId
        }
    }); 
    
    const [total, setTotal] =useState(0); 
    
    // size와 재고량, color를 같이 묶어주기 위한 배열객체 
    let option = [];

    if(loading === false) {
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
            }
                
            
            ) 
        ))
    }

    // 언더스코어 라이브러리의 uniq 메소드를 이용하여 
    // 오브젝트 배열의 중복을 제거할 수 있음 
    const uniqColor = _.uniq(option, 'colors');

    // color에 따라 size와 재고량을 다시 묶어 주기 위한 배열 객체 
    let option2 = [];

    // 같은 color 값을 filter 
    const filterColor = option.filter((item) => {
        return item.colors === color.value;
    }); 


    filterColor.map(data => (
        option2.push(
            {
                sizes: data.sizes,
                sizeId: data.sizeId,
                stocks: data.stocks,
                stockId: data.stockId
            }
        )
    ))

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
        color.setValue(e.target.value);
        // 사용자가 color의 선택값을 ""으로 바꿨을 때 
        // size의 value 값도 ""으로 바꿔주기 위한 코드 
        if(e.target.value === "") {
            selectSize.value = "";
        }
    }

    useEffect(() => {
        setSizeValue("");
    },[color.value])

    const sizeSelectOnChange = (e) => {
        const pSize = e.target.value.split("-")[0]; 
        setSizeValue(pSize); 
        setStock(e.target.value.split("-")[1]);
    }

    // sizeValue 값이 렌더링 (바뀔때마다) 될때마다 실행됨 
    useEffect(() => {
        // 이미 추가된 항목인지를 검사해줄 변수 
        let isAdded = true;

        // 재고량 검사 
        if(stock === "0") {
            isAdded = false; 
            alert("품절된 상품입니다.");
        }

        if(sizeValue !== "") { 
            selected.map(item => {
                // selected에 이미 들어가 있는 값이라면 isAdded 변수의 값을 false로 바꿔줌으로써 
                // setSelected가 실행되는것을 막아줌.
                if(item.size === sizeValue && item.color === color.value){
                    isAdded = false;  
                    return alert("이미 추가된 상품입니다.");
                }
                return null;
            })
            // 최초에는 무조건 실행이 됨  
            if(isAdded){
                setSelected([
                    ...selected, {
                        size: sizeValue, 
                        color: color.value,
                        stock
                    }
                ]); 
                setCount([...count, 1]); 
                setTotalarr([...totalarr, data.seeproduct[0].price]);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sizeValue])


    // selected에 totalarr이 추가되었을 때 
    //      => 사용자가 새로운 옵션값의 상품을 추가했을 때 
    // 1개에 대한 total값을 적용시키기 위해서 
    useEffect(() => {
        if(totalarr.length > 0) {
            const asd = (a,b) => a + b;
            // reduce는 배열의 처음부터 끝까지 순환함 
            setTotal(totalarr.reduce(asd));
        }
    }, [totalarr])


    // count 값을 증가시켜줄 함수 
    const increment = (index,item) => {
        // temp에 현재 count 배열을 넣어준다. 
        const temp = count;
        const totalPrice = totalarr;
        if (count[index] < selected[index].stock) {
            // index번째에서 한개 요소를 제거하고 temp[index]+1의 값을 추가
            // temp는 값이 증가한 새로운 배열값으로 바뀜   
            temp.splice(index, 1, temp[index] + 1);
            totalPrice.splice(index, 1, totalPrice[index]+item.price);
            // 변경된 temp값을 setCount시켜줌 
            setCount([...temp]); 
            setTotalarr([...totalPrice]);
        }
    }
    
    // count 값을 감소시켜줄 함수 
    const decrement = (index,item) => {
        const temp = count;
        const totalPrice = totalarr;
        if(count[index] > 1) {
            temp.splice(index, 1, temp[index] - 1);
            totalPrice.splice(index, 1, totalPrice[index]-item.price);
            setCount([...temp]);
            setTotalarr([...totalPrice]);
            const asd = (a,b) => a-b; 
            setTotal(totalarr.reduce(asd));
        }
    }

    return (
        <ProductPresenter 
            data={data.seeproduct}
            loading={loading}
            uniqColor={uniqColor}
            option={option2}
            colorSelectOnChange={colorSelectOnChange}
            sizeSelectOnChange={sizeSelectOnChange}
            color={color} 
            selected={selected}
            count={count}
            setCount={setCount}
            increment={increment}
            decrement={decrement}
            total={total}
        />
    );
};