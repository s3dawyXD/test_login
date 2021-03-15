
window.onload = () => {
    submit('http://127.0.0.1:5000/data').then((data) => {

        if (!data['success']) {
            console.log("invalidUserNameOrPassword()");
        }
        else {
            console.log(data);
        }
    });
};

const getJwt = () => {
    jwt = localStorage.getItem('token');
    AuthoToken = 'Bearer' + ' ' + jwt;
    return AuthoToken;
};

const submit = async (url = "", data = {}) => {
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