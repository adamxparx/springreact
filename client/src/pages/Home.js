import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import styled from "styled-components";

const AuthButton = styled.button`
    border: none;
    background-color: rgba(0, 0, 0, 0);
    font-size: 16px;
    font-weight: bold;

    &:hover {
        cursor: pointer;
        transform: translateY(-10%);
    }
`;

const BasicGrid = styled(Grid) ({
    margin: "20px",
});

const Item = styled(Grid) ({
    justifyContent: "right",
    alignItems: "center",
});

const Content =styled(Grid) ({
    height: "70vh",
    textAlign: "center",
    alignContent: "center",
});


export default function Home() {
    return (
        <BasicGrid container>
            <Item size={3}>
                <h1>Home</h1>
            </Item>
            <Item size={6}/>
            <Item container size={3}>
                <Item size={3}> 
                    <Link to="/login"> 
                        <AuthButton className="button-login">Login</AuthButton> 
                    </Link>
                </Item>
                <Item size={3}>
                    <Link to="/register">
                        <AuthButton className="button-register">Register</AuthButton>
                    </Link>
                </Item>
            </Item>
            <Content size={12}>
                <h1>Welcome to my Spring + React + MySQL Project</h1>
            </Content>
        </BasicGrid>
    );
}