import React from "react"; 
import styled from "styled-components"; 
import Loader from "../../Components/Loader";

export default ({
    data, 
    loading
}) => {
    return (
        <>
            {loading && <Loader />}
            {!loading && 
            <>
                <span>{data.map(item => (
                    <div key={item.id}>
                        <div>{item.id}</div>
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                        <div>{item.mainCategory}</div>
                        <div>{item.subCategory}</div>
                        {item.files.map(file => (
                            <img src={file.url} key={file.id} alt={file.id}/>
                        ))}       
                        {item.sizes.map(size => (
                            <div key={size.id}>{size.size}</div>
                        ))}                 
                        {item.colors.map(color => (
                            <div key={color.id}>{color.color}</div>
                        ))}
                        {item.stocks.map(stock => (
                            <div key={stock.id}>{stock.stock}</div>
                        ))}
                    </div>
                ))}</span>
            </>}
        </>
    )
}