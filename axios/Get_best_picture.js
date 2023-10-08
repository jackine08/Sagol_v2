import axios from "axios";
import DATA from "../ex/DATA_EX";


function Get_best_picture() {

    const body = {query: "questions~~~"}

    try {
        const res = axios.post("192.168.216.1:3002/Get_best_picture", body)

    } catch (error) {
        console.error(error)
    }


    return DATA
}


export default Get_best_picture;