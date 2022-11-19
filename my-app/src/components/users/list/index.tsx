import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "../../../http_common";
import { IUserItem } from "./types";

const HomePage = () => {

    const [list, setList] = useState<Array<IUserItem>>([
    ]);

    useEffect(() => {        
        //console.log("Read data server");
        http.get<Array<IUserItem>>("/api/users")
            .then(resp => {
                console.log("server response", resp);
                setList(resp.data);

            });
    },[]);

    const data = list.map(user => 
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.fullName}</td>
            <td>
                <img src={http.getUri()+user.image} alt="фото" width="75" />
            </td>
        </tr>
    );

    return (
        <>
            <h1>Список користувачів</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                    </tr>
                </thead>
                <tbody>{data}</tbody>
            </table>
        </>
    );
}

export default HomePage;