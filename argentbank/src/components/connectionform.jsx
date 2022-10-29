import { useRef, useState, useEffect } from "react";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/reducers/loggedUser.js";


const urlLogin = "http://localhost:3001/api/v1/user/login";

function ConnectionForm() {
    const dispatch = useDispatch();

    const userRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [connected, setConnected] = useState(
        useSelector((state) => state.userStatus.value.isAuthenticated)
    );

    useEffect(() => {
        setError("");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPassword("");
        const userConnection = {
            email: username,
            password: password,
        };

        if (!username || !password) {
            setError("Please enter a username and password");
            return;
        }

        try {
            const response = await fetch(urlLogin, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userConnection),
            });

            if (response.status === 200) {
                const resp = await response.json();
                const token = resp.body.token;
                dispatch(login({ token: token, isAuthenticated: true }));
                setConnected(true);
                if (rememberMe) {
                    localStorage.setItem(
                        "token",
                        JSON.stringify({
                            token: token,
                            isAuthenticated: true,
                        })
                    );
                }
            } else {
                setError("Invalid username or password");
            }
        } catch (err) {
            setError("An error occurred");
        }

    };

    return (
        <>
            {connected ? (
                <Navigate to="/profile" />
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <p
                            className={error ? "error" : "offscreen"}
                        >
                            {error}
                        </p>
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    <div className="input-remember">
                        <input
                            type="checkbox"
                            id="remember-me"
                            onChange={(e) => setRememberMe(!rememberMe)}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                </form>
            )}
        </>
    );
}

export default ConnectionForm;