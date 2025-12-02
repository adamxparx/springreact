import Grid from "@mui/material/Grid";
import { getCurrentUser, logoutUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Landing() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await getCurrentUser();
                setUserId(id => id = user.id);
            } catch (error) {
                localStorage.removeItem("authToken");
                navigate("/login");
            }
        };


        getUser();

    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        logoutUser();
        navigate("/");
    }

    return (
        <Grid container spacing={0} sx={{ display: "block", height: "100vh" }}>
            <Grid item size={12} sx={{ display: "flex", height: "50px", justifyContent: "right", padding: "20px", alignItems: "center", backgroundColor: "#f0f0f0" }}>
                <form>
                    <button type="submit" onClick={handleLogout}>Logout</button>
                </form>
            </Grid>
            <Grid item size={12} sx={{ display: "flex", fontSize: "30px", fontWeight: "bold", height: "calc(100vh - 50px)", justifyContent: "center", alignItems: "center" }}>
                <h1>Welcome user {userId}</h1>
            </Grid>
        </Grid>
    );
}