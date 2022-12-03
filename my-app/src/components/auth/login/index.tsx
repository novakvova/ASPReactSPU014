import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthLogin, IAuthResponse } from "./types";
import http from "../../../http_common";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AuthActionTypes, IUser } from "../store/types";
import jwtDecode from "jwt-decode";

const LoginPage = () =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState<string>("");

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
            setLoginError("");
            const { data } = resp;
            localStorage.token = data.token;
            const token = jwtDecode<IUser>(data.token);
            http.defaults.headers.common["Authorization"]=`Bearer ${data.token}`;
            const user: IUser = {
                email: token.email,
                image: token.image
            }
            dispatch({type: AuthActionTypes.LOGIN_SUCCESS, payload: user});
            console.log("server response user login", token);
            navigate("/"); 
        }, bad_resp => {
            const error_message = bad_resp.response.data.error;
            setLoginError(error_message);
            //console.log("Помилка ", );
        });        
    } 
    return (
        <>
            <h1 className="text-center">Login Page</h1>
            {loginError &&
                <div className="alert alert-danger" role="alert">
                    {loginError}
                </div>
            }
            
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