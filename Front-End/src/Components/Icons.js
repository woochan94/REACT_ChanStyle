import React from "react";

export const Logo = ({ size = 24 }) => (
    <svg
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <path d="M6.496 22.004h10.942v2h-10.942v-2zm-3.744-.35l-2.435-.571-.317 1.35 2.435.571.317-1.35zm18.496 0l2.435-.571.317 1.35-2.435.571-.317-1.35zm-3.253-.432h-12.009v-9.218l-2.664 9-3.019-.721 3.681-16.279 4.003-1.727v-1.242s1.414-1.022 4.004-1.031c2.589-.009 4.003 1.001 4.003 1.001v1.27l4.003 1.729 3.694 16.27-3.003.73-2.693-9v9.218zm-6.004-20.217c1.657 0 3.002.338 3.002.755 0 .416-1.345.754-3.002.754-1.657 0-3.003-.338-3.003-.754 0-.417 1.346-.755 3.003-.755z" />
    </svg>
)

export const CartIcon = ({size=36}) => (
    <svg 
        style={{width: `${size}px`, height: `${size}px`}}
        aria-hidden="true" 
        focusable="false" 
        data-prefix="fas" 
        data-icon="shopping-cart" 
        className="svg-inline--fa fa-shopping-cart fa-w-18" 
        role="img" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 576 512"><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path>
    </svg>
)

export const UpArrowIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="36" 
        height="36" 
        viewBox="0 0 24 24"
    >
        <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/>
    </svg>
)

export const CloseIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24">
        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
    </svg>
)

export const DownIcon = ({size=24}) => (
    
<svg 
    style={{width: `${size}px`, height: `${size}px`}}
    aria-hidden="true" 
    focusable="false" 
    data-prefix="fas" 
    data-icon="caret-down" 
    className="svg-inline--fa fa-caret-down fa-w-10" 
    role="img" xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 320 512">
    <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
</svg>
)