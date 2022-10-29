import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducers/loggedUser.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";


function Connection() {
    const urlProfile = "http://localhost:3001/api/v1/user/profile";
    const dispatch = useDispatch();
    const userStatus = useSelector((state) => state.userStatus.value);
    const token = userStatus.token;
    let [userData, setUserData] = useState("");
    const fetchData = async (token) => {
        if (token) {
            try {
                const response = await fetch(urlProfile, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: "Bearer" + token,
                    },
                });
                if (response.status === 200) {
                    const resp = await response.json();
                    setUserData(resp.body);

                }
            } catch (err) {
                console.log(err);
            }
        } else return "No Token";
    };

    useEffect(() => {
        fetchData(token);
    }, [setUserData, token]);


    return (
        <>
            {userStatus.isAuthenticated === false ? (
                <Link className="main-nav-item" to="/login">
                    <FontAwesomeIcon icon={faUserCircle} />
                    Sign In
                </Link>
            ) : (
                <div>
                    <Link className="main-nav-item" to="/profile">
                        <FontAwesomeIcon icon={faUserCircle} />
                        {userData.firstName}
                    </Link>
                    <Link
                        className="main-nav-item"
                        onClick={() => {
                            dispatch(logout());
                            localStorage.removeItem("token");
                        }}
                        to="/"
                    >
                        <i className="fa fa-user-circle"></i>
                        Logout
                    </Link>
                </div>
            )}
        </>
    );
}

export default Connection;