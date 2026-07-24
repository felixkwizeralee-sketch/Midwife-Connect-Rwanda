function registerUser(){


let user={

name:document.getElementById("name").value,

email:document.getElementById("email").value,

password:document.getElementById("password").value,

role:document.getElementById("role").value

};


localStorage.setItem(
"user",
JSON.stringify(user)
);


alert("Account created successfully");


window.location="login.html";

}




function loginUser(){


let savedUser =
JSON.parse(localStorage.getItem("user"));



let email =
document.getElementById("loginEmail").value;



let password =
document.getElementById("loginPassword").value;



if(savedUser &&
savedUser.email===email &&
savedUser.password===password){



localStorage.setItem(
"loggedIn",
"true"
);



alert(
"Welcome "+savedUser.name
);



if(savedUser.role==="student"){

window.location="student.html";

}


else if(savedUser.role==="midwife"){

window.location="midwife.html";

}


else if(savedUser.role==="pharmacist"){

window.location="pharmacy.html";

}


else if(savedUser.role==="pregnant"){

window.location="pregnancy.html";

}


else if(savedUser.role==="youth"){

window.location="youth.html";

}


else if(savedUser.role==="founder"){

window.location="founder.html";

}



}


else{

alert("Wrong email or password");

}


}





function logout(){

localStorage.removeItem("loggedIn");

localStorage.removeItem("user");

window.location="../index.html";

}





function showPassword(){


let pass =
document.getElementById("loginPassword");


if(pass.type==="password"){

pass.type="text";

}

else{

pass.type="password";

}


}
function logout(){

localStorage.removeItem("loggedIn");

localStorage.removeItem("user");

alert("You have logged out successfully");


window.location="../index.html";

}
