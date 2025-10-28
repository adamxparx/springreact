import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { registerUser } from "../api/auth";

const RegForm = styled.form`
    display: block;
    align-content: center;
    justify-items: center;
    height: 250px;
    width: 100%;
`;

const RegInput = styled.input`
    padding: 5px;
    margin: 10px;
    width: 200px;
`;

const RegButton =styled.button`
    width: 214px;
    padding: 5px;
    margin: 10px;
    &:hover {
        cursor: pointer;
    }
`;

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await registerUser({ email, password });

            console.log("Register success:", response.data);

            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
            let msg = "Registration failed";
            if (error.response && error.response.data) {
                msg = error.response.data;
            }
            alert(msg);
        }
    }



    return (
        <Grid container sx={{ textAlign: "center", marginTop: "100px" }}>
            <Grid item size={12} sx={{ fontSize: "40px", fontWeight: "bold" }}>Register</Grid>
            <Grid item size={12}>
                <RegForm onSubmit={handleOnSubmit}>
                    <Grid item size={12}>
                        <RegInput type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>
                    </Grid>
                    <Grid item size={12}>
                        <RegInput type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                    </Grid>
                    <Grid item size={12}>
                        <RegInput type="password" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </Grid>
                    <Grid item size={12}>
                        <RegButton type="submit">Register</RegButton>
                    </Grid>
                </RegForm>
            </Grid>
        </Grid>
    );
}