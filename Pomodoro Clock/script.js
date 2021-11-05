let time=document.getElementById("time");
let sessions = document.getElementById("sessions");
let timesession = document.getElementById("timesession")
let breaksession = document.getElementById("breaksession")
let start = document.getElementById("start");
let pause = document.getElementById("pause");
let reset = document.getElementById("reset");
let tminus=document.getElementById("tminus");
let tplus=document.getElementById("tplus");
let bminus=document.getElementById("bminus");
let bplus=document.getElementById("bplus");
let displayColor=document.getElementById("display")
let  displayFontColor = document.getElementById("display-content")
let heading = document.getElementById("heading");


let tTime=Number(timesession.innerText)
let bTime = Number(breaksession.innerText);


timesession.innerHTML=`${timesession.innerText} min`;
breaksession.innerText=`${breaksession.innerText} min`;


var timer;
var count=1

// left counter for session time
tplus.addEventListener("click",function(){
            tTime+=5;
           
            // console.log(tTime)
            if(tTime<=30){
            timesession.innerText=`${tTime} min`;
            // time.innerHTML=tTime;
            }
            else{
            tplus.disabled=true;
            tminus.disabled=false;
            }
        })
tminus.addEventListener("click",function(){
          tTime-=5;
          
          if(tTime>=5){
            timesession.innerText=`${tTime} min`;
            // time.innerHTML=tTime;
          }
          else{
            tplus.disabled=false
            tminus.disabled=true;
          }
        })

// right counter for break time
bplus.addEventListener("click",function(){
            bTime+=2;
            bminus.disabled=false;
            // console.log(tTime)
            if(bTime<=20){
            breaksession.innerText=`${bTime} min`;
            // time.innerHTML=bTime;
            }
            else{
            bplus.disabled=true;
            }
        })
bminus.addEventListener("click",function(){
          bTime-=2;
          bplus.disabled=false
          if(bTime>=5){
            breaksession.innerText=`${bTime} min`;
            // time.innerHTML=tTime;
          }
          else{
          bminus.disabled=true;
          }
        })



function startTimer(duration,display){
    tplus.disabled=true;
    tminus.disabled=true;
    bminus.disabled=true;
    bplus.disabled=true;
     heading.innerHTML="Session Time";
     displayColor.style.background="skyblue";
    displayFontColor.style.color="skyblue";
    // sessions.style.disabled=true;
    timer = setInterval(function () {
        minutes = parseInt(duration / 60, 10);
        seconds = parseInt(duration % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        --duration;
        if (duration < 0) {
            clearInterval(timer)
            breakTimer(bTime*60,time)
        }
        
    }, 1000);
   
     pause.addEventListener("click",function(){
       console.log("clicked")
       start.style.display="inline";
       pause.style.display="none";
       clearInterval(timer);
});
   
};



function breakTimer(duration,display){
    tplus.disabled=true;
    tminus.disabled=true;
    bminus.disabled=true;
    bplus.disabled=true;
    heading.innerHTML="Break Time";
    displayColor.style.background="orange";
    displayFontColor.style.color="orange";
    // sessions.style.disabled=true;
    var timer = setInterval(function () {
        minutes = parseInt(duration / 60, 10);
        seconds = parseInt(duration % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        --duration;
        if (duration < 0) {
            clearInterval(timer)
            startTimer(tTime*60,time)
        }
    }, 1000);
    
    pause.addEventListener("click",function(){
       console.log("clicked")
       clearInterval(timer)
});

};

start.addEventListener("click",function(){
    start.style.display="none";
    pause.style.display="inline";
    startTimer(tTime*60,time)
})


reset.addEventListener("click",function(){
    tplus.disabled=false;
    tminus.disabled=false;
    bminus.disabled=false;
    bplus.disabled=false;
    start.style.display="inline";
    pause.style.display="none";
    clearInterval(timer)
})
