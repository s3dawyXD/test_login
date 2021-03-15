
const submitBtn = document.querySelector("#submit-btn");
const bodyEle = document.querySelector('body');
const myDiv = document.createElement('div');
const userEle = document.querySelector('#username');
const passwordEle = document.querySelector('#password');

let subCapBtn;
window.onload = () => {
    submit('http://15.184.102.155:5000/authentication').then((data) => {
        console.log(data);
        
    });
};
/*
    ///////////////////////////////////
*/
//location.href = '/captcha.html';
/////////////////// event lister ///////////////////////////
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const user = document.querySelector('#username').value.trim();
    const pass = document.querySelector('#password').value.trim();
    if (user === "" || pass === "") {
        invalidUserNameOrPassword();
        return;
    }
    removeAlart();
    const data = { 'username': user, 'password': pass };
    localStorage.setItem('username',data['username']);
    localStorage.setItem('password',data['password']);
    submit('http://15.184.102.155:5000/', data).then((data) => {
        console.log(data);
        src = data['src'];
        localStorage.setItem('src',src);
        location.href = './captcha.html';
    })
});
/////////////////////////////////////////////////////////

/////////////////// functions ///////////////////////////
const submit = async (url = "",  data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getJwt()
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();

        return newData;
    } catch (error) {
        console.log(error);
    }
};

const getJwt = () => {
    jwt = localStorage.getItem('token');
    AuthoToken = 'Bearer' + ' ' + jwt;
    return AuthoToken;
};
const createCapEle = (src) => {
    myDiv.innerHTML = src;
    bodyEle.appendChild(myDiv);
};
const sendCap = async () => {
    const captchaText = document.querySelector('#captchaText').value;
    const data = { 'username': userEle.value.trim(), 'password': passwordEle.value.trim(), 'cap': captchaText };
    submit('http://15.184.102.155:5000/cap', data).then((data) => {
        console.log(data);
        if (!data['success']) {
            invalidUserNameOrPassword();
        }
        else {
            let token = data['jwt'];
            localStorage.setItem('token',token);
        }
    });
};
const invalidUserNameOrPassword = () => {
    document.querySelector('#username').classList.add('alart');
    document.querySelector('#password').classList.add('alart');
};
const removeAlart = () => {
    document.querySelector('#username').classList.remove('alart');
    document.querySelector('#password').classList.remove('alart');
};
//////////////////////////////////////////////////////////////////