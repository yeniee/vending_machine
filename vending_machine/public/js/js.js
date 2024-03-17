//0. 음료수 저장 
// 1.음료수 이름  2.가격  3.수량  4.이미지
let  drinkArray = [
    { drinkname : "밀키스", price : "1000", count : 10, drinkimg : "drink_01.jpg" },    
    { drinkname : "커피", price : "1500", count : 10, drinkimg : "drink_02.jpg" },
    { drinkname : "식혜", price : "1200", count : 10, drinkimg : "drink_03.jpg"},
    { drinkname : "코코팜", price : "1900", count : 10, drinkimg : "drink_04.png"}
];
//console.log(drinkArray) ;        
let drinkBox = ""; // 음료수 리스트를 받는 박스 선언

drinkList(); //음료수 리스트 함수선언

//자판기에 등록이 되어있는 리스트        
function drinkList(){
    //console.log(drinkArray);
    for(let i=0; i<drinkArray.length; i++){
        let drink = drinkArray[i];            
        drinkBox += 
            '<div onclick="clickDrink('+i+')" class="drink-box">'+
                '<img src="img/'+drink.drinkimg+'" class="drink-img">'+
                '<p class="drink-name">'+ drink.drinkname +'</p>'+
                '<p class="drink-price">'+ drink.price +'원</p>'+ 
                '<p class="change"></p>'+                    
            '</div>'
    } // for end
    document.querySelector(".drinklist").innerHTML = drinkBox;
}//drinkList end


// 변수선언 

let coinbox = 0; //현재 금액상태 처음은 0원
//console.log(coinbox) // 확인
//console.log(typeof(coinbox)) // type확인     

document.querySelector(".display_board").innerHTML = coinbox + "원";//자판기에 0원이라고 명시함.
//console.log(coinbox);

//1. 돈을 입력한다.

//모든버튼
let mbtn = document.querySelectorAll(".moneybtn"); // 모든 버튼 
//console.log(mbtn)       

ClickMoney(); // 함수실행;
// 돈 버튼을 클릭하면 실행이 되는 script
function ClickMoney(){
    for(let i=0; i<mbtn.length; i++){            
        mbtn[i].addEventListener('click',targetMoney);            
        //console.log("click 이후 coinbox 확인 " + coinbox);
    }// for end            
}//clickMoney end       

function targetMoney(e){ // 클릭한 금액을 
    //console.log(e)
    let ClickTarget = Number(e.target.value); // target value가 String으로 되어 Number로 변환                         
    coinbox = ClickTarget+coinbox; // 클릭한 target과 + coinbox 더하여 저장
    //console.log(coinbox);                                        
    document.querySelector(".display_board").innerHTML = coinbox.toLocaleString() + "원"; // html에 대입                    
    colorChange();
}

// 2. 구매가능한 음료수가 있으면 표시를 해준다.
    // 만약에 투입한 금액이 음료수의 값이 같거나 크면 구매가 가능함
    // 만약에 투입한 금액보다 음료수의 값이 크면 구매가 불가능 함
    // 만약에 음료수 수량이 0이면 빨간색으로 표시해주기
    // 금액에 따른 컬러변경 함수;
// 금액을 입력하지 않고 음료수 버튼을 누르면 "금액을 넣어주세요" 하고 알려주기
function clickDrink(i){
        
    if(coinbox==0){alert("돈을 넣어주세요"); return;} // 만약에 돈을 넣지 않고 음료수 버튼을 클릭할 시     
    else if(coinbox >= drinkArray[i].price && drinkArray[i].count!=0) { // 만약에 넣은금액이 음료수 값보다 크고, 음료수의 수량이 0이 아니면
  
        drinkArray[i].count = drinkArray[i].count -1; // 음료수 수량에서 1감소
              
        let result = coinbox - drinkArray[i].price; // 자판기금액에서 음료수 값을 뺌
        //console.log(result)
        coinbox = result;                
        alert(drinkArray[i].drinkname+" 나왔습니다~")
        document.querySelector(".display_board").innerHTML = coinbox.toLocaleString() + "원"; // html에 대입                
        colorChange(); // 금액여부에 따라 음료수 구매가 가능해지기 때문에 다시 함수 실행
    } 
    else if(coinbox <= drinkArray[i].price && drinkArray[i].count!=0){ //만약에 넣은금액이 음료수가격보다 작고, 음료수의 0이 아니면
        //console.log("구매못함");
        alert("잔액이 부족합니다.");
        return;
    }
    else if(drinkArray[i].count == 0){ // 만약에 음료수의 수량이 0이면                
        alert(drinkArray[i].drinkname + " 매진입니다.");  
        return;                  
    }            
}



let change = document.querySelectorAll(".change");
function colorChange(){     
        for(let i=0; i<drinkArray.length; i++){            
            if(coinbox>=drinkArray[i].price && drinkArray[i].count > 0){                
                change[i].style.backgroundColor = "blue"                
            }// if end
            else if(coinbox<drinkArray[i].price && drinkArray[i].count > 0){
                change[i].style.backgroundColor = "black"                
            }//else if end          
            else if(drinkArray[i].count == 0 ){ // 만약에 수량이 0이면 
                //console.log(drinkArray[j].drinkname + "매진~")
                //change[i].style.backgroundColor = "red"; // 수량이 0이면                
                change[i].parentElement.classList.add("soldout")
            }//
        }// for end    
}//function colorChange end

function changeMoney(){ //거스름돈 돌려주기
//console.log(coinbox) //현재 금액 확인
    if(coinbox == 0){alert("거스름돈은 없습니다."); return;} // 자판기 금액이 0원이면
    else{alert("거스름돈" + coinbox +"원 드립니다. 안녕히가세요~");   }; // 거스름돈이 있으면 남은 돈 모두 주기.
    document.querySelector(".display_board").innerHTML = 0 + "원"; // 다시 자판기 금액은 0원처리;
    //console.log(coinbox); // 현재금액확인
    coinbox = 0; // 다시 코인은 0원으로 만들기
    //console.log(coinbox); // 확인
    colorChange(); //금액여부에 따라 바뀌는 함수 실행
}





