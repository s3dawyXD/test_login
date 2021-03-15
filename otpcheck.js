const OTPsubEle = document.querySelector('#OTP-submit');

OTPsubEle.addEventListener("click", async function (event) {
    event.preventDefault();
    sendOTP();

});

const sendOTP = async () => {
    const OTP = document.querySelector('#OTP-number').value;
    const phoneNum = localStorage.getItem('phonenumber')
    const data = { 'OTP': OTP, 'phonenumber': phoneNum };
    submit('http://127.0.0.1:5000/phone', data).then((data) => {
        console.log(data);
        if (!data['success']) {
            console.log("invalidUserNameOrPassword()");
        }
        if(data['status'] == "approved")  {
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