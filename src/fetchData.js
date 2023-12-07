
export async function getAllUsers(){
    try {
        const fetchResponse = await fetch("http://127.0.0.1:8080/get-users");
        if(fetchResponse.status===200){
            const usersList = await fetchResponse.json();
            return usersList;
        }
        
        return [];
    } catch (error) {
        console.log(error);
    }
    
}

export async function searchByName(nameStr){
    try {
        let nameWords = nameStr.split(" ");
        let queryStr = nameWords.join("&");
        const fetchResponse = await fetch(`http://127.0.0.1:8080/search-users?query=${queryStr}`);
        if(fetchResponse.status===200){
            const usersList = await fetchResponse.json();
            return usersList;
        }
        
        return [];
    } catch (error) {
        console.log(error);
    }
}

export async function createUser(newUser){
    try {
        let reqInit = {};
        reqInit.headers = {
            "Content-Type": "application/json"
        };
        reqInit.method = "POST";
        reqInit.body = newUser;
        reqInit.mode = "no-cors";
        const fetchResponse = await fetch(`http://127.0.0.1:8080/create-user`, reqInit);
        
        return await fetchResponse.json();
    } catch (error) {
        console.log(error);
    }
}

export async function updateUser(id, newUser){
    try {
        let reqInit = {};
        reqInit.headers = {
            "Content-Type": "application/json"
        };
        reqInit.method = "PUT";
        reqInit.body = newUser;
        reqInit.mode = "no-cors";
        const fetchResponse = await fetch(`http://127.0.0.1:8080/update-user/${id}`, reqInit);
        if(fetchResponse.status===200){
            return {
                isUpdated: true,
                user: await fetchResponse.json()
            };
        }
        
        return {
            isUpdated: false
        };
    } catch (error) {
        console.log(error);
    }
}

export async function deleteUser(id){
    try {
        let reqInit = {};
        reqInit.method = "DELETE";
        const fetchResponse = await fetch(`http://127.0.0.1:8080/update-user/${id}`, reqInit);
        if(fetchResponse.status===200){
            return true;
        }
        
        return false;
    } catch (error) {
        console.log(error);
    }
}