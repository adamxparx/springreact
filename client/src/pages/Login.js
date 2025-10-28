import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginUser } from "../api/auth";

const RegForm = styled.form`
    display: block;
    alignContent: center;
    height: 250px;
    justify-items: center;
    align-content: center;
`;

const RegInput = styled.input`
    width: 200px;
    padding: 5px;
    margin: 10px;
`;

const RegButton = styled.button`
    width: 214px;
    padding: 5px;
    margin: 10px;
    &:hover {
        cursor: pointer;
    }
`;

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser({ email, password });
            console.log("Register success:", response.data);
            navigate("/landing");
        } catch (error) {
            console.error("Login error:", error);
            let msg = "Login failed";
            if (error.response && error.response.data) {
                msg = error.response.data;
            }
            alert(msg);
        };
    }

    return (
        <Grid container sx={{ textAlign: "center", marginTop: "100px" }}>
            <Grid size={12} sx={{ fontSize: "40px", fontWeight: "bold" }}>Login</Grid>
            <Grid size={12}>
                <RegForm onSubmit={handleOnSubmit}>
                    <Grid>
                        <RegInput type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    </Grid>
                    <Grid>
                        <RegInput type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    </Grid>
                    <Grid>
                        <RegButton type="submit">Login</RegButton>
                    </Grid>
                </RegForm>
            </Grid>
        </Grid>
    );
}