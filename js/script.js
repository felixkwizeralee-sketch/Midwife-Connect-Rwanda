let currentLanguage =
localStorage.getItem("language") || "en";



function changeLanguage(language){

localStorage.setItem("language",language);

location.reload();

}



function translate(){


let words = window[currentLanguage];


document.querySelectorAll("[data-key]").forEach(function(element){


let key = element.getAttribute("data-key");


if(words[key]){

element.innerHTML = words[key];

}


});


}



window.onload=function(){

translate();

};
function calculateEDD(){


let lmp = document.getElementById("lmpDate").value;


if(lmp==""){

alert("Please enter your last menstrual period date");

return;

}


let date = new Date(lmp);


// Pregnancy length = 280 days

date.setDate(date.getDate()+280);



let result = document.getElementById("eddResult");


result.innerHTML =
"Your Estimated Due Date is: "
+ date.toDateString();


}
function checkAnswer(){

let result =
document.getElementById("quizResult");


result.innerHTML =
"Correct answer: 280 days ✅";


}
function showUserName(){


let user =
JSON.parse(localStorage.getItem("user"));



let welcome =
document.getElementById("welcomeUser");



if(user && welcome){


welcome.innerHTML =
"Welcome "+user.name+" 🎓";


}


}


window.addEventListener(
"load",
showUserName
);
