export const addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g; // 1000의 자리마다 ,를 찍어주는 정규식 
    return num.toString().replace(regexp, ',');
}