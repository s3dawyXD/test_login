src = localStorage.getItem('src');
captchaEle = document.querySelector('#captcha-img');
captchaEle.setAttribute('src',src);

username = localStorage.getItem('username');
password = localStorage.getItem('password');

subCapBtn = document.querySelector("#BW_button_802163");

subCapBtn.addEventListener("click", async function (event) {
    event.preventDefault();
    sendCap();

});

const sendCap = async () => {
    const captchaText = document.querySelector('#captchaText').value;
    const data = { 'username': username, 'password': password, 'cap': captchaText };
    submit('http://15.184.102.155:5000/cap', data).then((data) => {
        console.log(data);
        if (!data['success']) {
            console.log("invalidUserNameOrPassword()");
            location.href = './app.html';
        }
        else {
            let token = data['jwt'];
            localStorage.setItem('token',token);
            location.href = './final.html';
        }
    });
};

const getJwt = () => {
    jwt = localStorage.getItem('token');
    AuthoToken = 'Bearer' + ' ' + jwt;
    return AuthoToken;
};

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
