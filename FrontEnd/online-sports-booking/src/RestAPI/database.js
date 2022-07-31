// var Host = "https://prince-node-app.herokuapp.com";
var Host = "http://localhost:3003";
var authToken = "ZKP1917648416642441FG";

export async function FetchData(url, method, body) {
    let loginUserId = getCookie("LoginUser");
    var json = {
        method: method,
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": authToken,
            "LoginUser": loginUserId
        }
    };
    if (method.toLocaleLowerCase() !== "get") {
        json["body"] = JSON.stringify(body)
    }
    var response = await fetch(Host + url, json);
    var data = await response.json()
    return data;
}


export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getAuth(){
    return authToken;
}


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}