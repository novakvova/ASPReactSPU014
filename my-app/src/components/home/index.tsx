import { useState } from "react";
import { ICategoryItem } from "./types";

const HomePage = () => {

    const [list, setList] = useState<Array<ICategoryItem>>([
        { 
            id: 1,
            name: "Сало",
            image: "my.jpg"
        },
        { 
            id: 2,
            name: "Мак",
            image: "max.jpg"
        }
    ]);

    const data = list.map(category => 
        <tr>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.image}</td>
        </tr>
    );

    return (
        <>
            <h1>Home Page</h1>
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