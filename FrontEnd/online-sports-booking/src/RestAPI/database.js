var Host = "https://prince-node-app.herokuapp.com";


export async function FetchData(url,method,body){
    var json = {
        method: method,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };
    if(method.toLocaleLowerCase() !== "get"){
        json["body"] = JSON.stringify(body)
    }
    var response = await fetch(Host+url,json);
    var data = await response.json()
    return data;
}