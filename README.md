# REACT_ChanStyle 

- [완성된 사이트 바로가기]

<br> 

**※ 상품을 등록하거나 수정하는 기능은 관리자 계정으로만 이용할 수 있습니다.**
```
Email : Admin@admin.com 
Password : 123qwe!@#
```
**※ 회원가입이 번거로우신 분들은 아래의 계정을 이용해 주세요.**
```
Email : guest@guest.com 
Password: 123qwe!@#
```

<br>

## 1. 기능 소개 

### 1. Auth 🔐
```
1-1. 로그인 
    - Passport.js와 JWT를 이용하여 로그인 기능 구현 
1-2. 회원가입 
    - bcrypt를 이용하여 비밀번호 암호화 기능 
    - 카카오 주소 API 활용 
```

### 2. Main ⭐
```
2-1. 이미지 슬라이더 
    - Slick.js를 이용하여 Main 이미지 슬라이더 구현 (일정 시간마다 자동으로 넘어감)

2-2. BEST, NEW ITEM
    - 전체 상품중 판매량을 기준으로 BEST ITEM 선정, 상품 등록시간을 기준으로 NEW ITEM을 선정하여
      MAIN 페이지에 노출 
      (ViewPort 크기에 따라 슬라이더로 구현)
```

### 3. Store 🏡
```
3-1. 카테고리에 따른 상품 분류 

3-2. Pagination 
    - 하단의 "더보기" 버튼을 이용한 paging 기능 구현 
```

### 4. Product 🥼
```
4-1. 상품의 상세정보를 보여주는 페이지 

4-2. 옵션 선택 
    - Color 값에 따라 Size값 선택가능 
    - Size값과 함께 남은 재고량 표시 

4-3. 장바구니, 구매 
    - 장바구니에 담거나 바로 구매페이지로 넘어갈 수 있음 
    - 해당 기능은 로그인 후에만 이용 가능 

4-4. Floating Button 
    - 스크롤을 내릴시 페이지 맨위로 바로 올라가는 기능을 가진 Floating Button 구현 
```

### 5. MyPage 🛒
```
5-1. 로그아웃 

5-2. 장바구니 
    - 체크박스를 이용하여 여러개의 상품 동시 주문 가능 
    - 삭제버튼을 클릭하여 장바구니에서 상품 제거 
    - 가격과 개수에 따른 가격 표시 
    - 장바구니 내의 total 값 표시 

5-3. 구매목록 
    - 자신이 구매한 상품 표시 
    - 번호 Paging 구현 

5-4. 개인정보 수정 
```

### 6. Admin 🧑
```
6-1. 로그아웃 

6-2. 상품 등록 
    - Firebase Storage를 이용하여 상품 이미지 업로드 
    - 옵션 값 추가를 위한 동적 테이블 
    - 대분류 값에 따른 소분류값 

6-3. 상품 수정 

6-4. 상품 삭제 
```

### 7. Payment 🎁
```
7-1. 결제
    - import 모듈을 이용하여 결제 기능 구현 
    (개발자용이기 때문에 결제 금액은 일정시간이 지난 후 자동으로 결제 취소가 됩니다.) 
```

<br>

## 2. 사용 도구 
### Front-End
- REACT 
- Apollo 
- Styled-Component
- React Hooks
- Firebase Storage

### Back-end 
- Prisma 
- GraphQL 
- Node.JS (Express) 
- Heroku



[완성된 사이트 바로가기]:https://chanstyle.netlify.com