import axios from "axios";
import DATA from "../ex/DATA_EX";
import "../ex/1.jpeg"

async function Get_description() {
    const body = new FormData();
    body.append('filename', "1.jpeg");
    // body.append("image", {uri: "../ex/1.jpeg", type: "image/jpeg"});
    body.append("hash", "1.jpeg")

    // const body = {"hash": "1.jpeg", "filename": "1.jpeg", "file":{uri: "../ex/1.jpeg", type: "image/jpeg"}}

    try {
        const res = axios.post("http://192.168.0.95:3002/images/upload", body);

        console.log("network test start");
        console.log((await res).data);
        console.log("network test done");

    } catch (error) {
        console.error(error)
    }

    
    return DATA[0]["Description"];
}


export default Get_description;