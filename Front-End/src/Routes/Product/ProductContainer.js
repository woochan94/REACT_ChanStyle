import React from "react"; 
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
    const size = useInput(""); 
    const stock = useInput("");

    const { data, loading } = useQuery(SEEITEM, {
        variables: {
            id: productId
        }
    }); 
 
    // size와 재고량, color를 같이 묶어주기 위한 배열객체 
    let option = [];

    if(loading === false) {
        data.seeproduct.map((item) => (
            item.sizes.map((_, index) => (
                option.push(
                    {
                        colors: item.colors[index].color,
                        sizes: item.sizes[index].size, 
                        stocks: item.stocks[index].stock,
                        sizeId: item.sizes[index].id,
                        stockId: item.stocks[index].id,
                        colorId: item.colors[index].id
                    }
                )
            )) 
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
        if(e.target.value === "" || e.target.value === undefined) {
            selectSize.value = "";
        }
    }


    return (
        <ProductPresenter 
            data={data.seeproduct}
            loading={loading}
            uniqColor={uniqColor}
            option={option2}
            colorSelectOnChange={colorSelectOnChange}
            color={color} 
            size={size}
            stock={stock}
        />
    );
};