var count = document.getElementById("count");
var decBtn = document.getElementById("decrementBtn");
var incBtn = document.getElementById("incrementBtn");
var reserBtn = document.getElementById("resetBtn");
var container = document.getElementById("container");
var counter =0;
resetStyle();

function resetStyle(){
  container.style.backgroundColor ="skyblue";
  count.style.color= "white";
  }

function style(counter){
  if(counter%2 !=0){
    container.style.backgroundColor = "grey";
    count.style.color = "red";
  }
  else{
    resetStyle();
  }
}

decBtn.addEventListener("click",function(){
  if(counter>0){
    counter--;
    count.innerHTML = counter;
    style(counter);
  }
})

incBtn.addEventListener("click",function(){
  if(counter <10){
    counter++;
    count.innerHTML = counter;
    style(counter);
  }
})

resetBtn.addEventListener("click",function(){
  counter= 0;
  count.innerHTML=counter;
  resetStyle();
})
