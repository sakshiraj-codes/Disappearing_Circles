const codeoutput=document.getElementById("output");
const data=document.getElementById("editor");
const language=document.getElementById("language");
const submit=document.getElementById("btn");

let postResponse;
let timeout;

btn.addEventListener("click",function(){
  event.preventDefault();
  postRequest();
  // timeout=setTimeout(getRequest,5000);
})

function createObject(d,id){
  let newObj={code:d,
              langId:id};
  return newObj;
}

function postRequest(){
    let sourcecode=data.value;
    let lagId=language.value;


    let request1=new XMLHttpRequest();
    request1.open("POST","https://codequotient.com/api/executeCode",true);
    request1.setRequestHeader("Content-Type","application/JSON");

    object=createObject(sourcecode,lagId);
    request1.send(JSON.stringify(object));

    request1.addEventListener('load',function(){
      postResponse=JSON.parse(request1.responseText);
      timeout=setTimeout(getRequest,5000);
      console.log(postResponse.codeId);
    });
}

function getRequest(){
  let id=postResponse.codeId;
  let request=new XMLHttpRequest();
  request.open("GET",`https://codequotient.com/api/codeResult/${id}`);
  request.setRequestHeader("Content-Type","application/JSON")
  request.send();

  request.addEventListener("load",function(){
    let getResponse=JSON.parse(request.responseText);
    getResponse=JSON.parse(getResponse.data);

    if(JSON.stringify(getResponse)===JSON.stringify({})){
      return ;
    }
    else{
      if(getResponse.output!=""){
        data.innerHTML=getResponse.code;
        codeoutput.innerHTML=getResponse.output;
        console.log(getResponse);
      }
      else{
        data.innerHTML=getResponse.code;
        codeoutput.innerHTML=getResponse.errors;
        console.log(getResponse);
      }
    }
    clearTimeout(timeout);
  })
}
