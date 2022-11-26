import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthLogin, IAuthResponse } from "./types";
import http from "../../../http_common";
import axios from "axios";

const LoginPage = () =>
{
    const navigate = useNavigate();

    const [state, setState] = useState<IAuthLogin>({
        email: "",
        password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e: React.SyntheticEvent)=> {
        e.preventDefault();
        console.log("Login user in server", state);
        axios.post<IAuthResponse>(`${http.getUri()}/api/account/login`,
            state
        )
        .then(resp => {
            const { data } = resp;
            console.log("server response", data);
            //navigate("/"); 
        }, bad_resp => {
            console.log("Помилка ", bad_resp);
        });        
    } 
    return (
        <>
            <h1 className="text-center">Login Page</h1>
            <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Вкажіть назву</label>
                    <input type="text" className="form-control" id="email" name="email"
                        value={state.email}
                        onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Вкажіть назву</label>
                    <input type="password" className="form-control" id="password" name="password"
                        value={state.password}
                        onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn btn-primary">Вхід</button>
            </form>
        </>

    )
}

export default LoginPage;