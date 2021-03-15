
const phonesubEle = document.querySelector('#phone-submit');


phonesubEle.addEventListener("click", async function (event) {
    event.preventDefault();
    sendPhoneNumber();

});


const sendPhoneNumber = async () => {
    const phoneNum = document.querySelector('#phone-number').value;
    const data = { 'phonenumber': phoneNum };
    localStorage.setItem('phonenumber', phoneNum)
    submit('http://127.0.0.1:5000/phone', data).then((data) => {
        console.log(data);
        if (!data['success']) {
            console.log("invalidUserNameOrPassword()");
        }
        else {
            location.href = './otpcheck.html';
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