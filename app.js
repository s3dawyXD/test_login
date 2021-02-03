
const submitBtn = document.querySelector("#submit-btn");
const bodyEle = document.querySelector('body');
const myDiv = document.createElement('div');
let subCapBtn;


const submit = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
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

const createCapEle = (src) => {
    myDiv.innerHTML = src;
    bodyEle.appendChild(myDiv);
};

const sendCap = async ()=>{
    const captchaText = document.querySelector('#captchaText').value;
    submit('http://127.0.0.1:5000/cap',{'cap':captchaText}).then((data)=>{
        console.log(data);
    });
}


submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const user = document.querySelector('#username').value;
    const pass = document.querySelector('#password').value;
    const data = { 'username': user, 'password': pass };

    submit('http://127.0.0.1:5000/', data).then((data) => {
        src = data['src'];
        createCapEle(src);
        subCapBtn = document.querySelector("#BW_button_802163");
    }).then(()=>{
        subCapBtn.addEventListener("click", async function (event) {
            event.preventDefault();
            sendCap();
        
        });
    })

});


