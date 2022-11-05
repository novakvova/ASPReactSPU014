import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "../../http_common";
import { ICategoryItem } from "./types";

const HomePage = () => {

    const [list, setList] = useState<Array<ICategoryItem>>([
        // { 
        //     id: 1,
        //     name: "Сало",
        //     image: "my.jpg"
        // },
        // { 
        //     id: 2,
        //     name: "Мак",
        //     image: "max.jpg"
        // }
    ]);

    useEffect(() => {        
        console.log("Read data server");
        http.get<Array<ICategoryItem>>("/api/categories")
            .then(resp => {
                console.log("server response", resp);
                setList(resp.data);

            });
    },[]);

    const data = list.map(category => 
        <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>
                <img src={http.getUri()+category.image} alt="фото" width="75" />
            </td>
        </tr>
    );

    return (
        <>
            <h1>Home Page</h1>
            <Link to="/category/create" className="btn btn-success">Додати</Link>
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