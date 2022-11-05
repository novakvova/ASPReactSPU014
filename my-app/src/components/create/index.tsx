import React, { useState } from "react";
import { ICreateCategory } from "./types";


const CategoryCraatePage = () => {
    
    const [state, setState] = useState<ICreateCategory>({
        name: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Input name", e.target.name);
        console.log("Input value", e.target.value);
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Input files", e.target.files);
        if(e.target.files)
        {
            const file = e.target.files[0];
            setState({
                ...state,
                [e.target.name]: file
            });
        }
    }

    const handleSubmit = (e: React.SyntheticEvent)=> {
        e.preventDefault();
        console.log("Send data server", state);
    } 
    return (
        <>
            <h1>Додати категорію</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Вкажіть назву</label>
                    <input type="text" className="form-control" id="name" name="name"
                        value={state.name}
                        onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Оберіть фото</label>
                    <input className="form-control" type="file" name="image" id="image" 
                        accept="image/*"
                        onChange={handleFileChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Дадати</button>
            </form>
        </>
    );
}

export default CategoryCraatePage;