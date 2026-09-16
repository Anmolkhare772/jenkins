import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/message")
            .then(response => response.json())
            .then(data => {
                setMessage(data.message + " - " + data.name);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container">
            <h1>MERN Application</h1>

            <h2>Welcome to Anmol Khare</h2>

            <p>{message}</p>
        </div>
    );
}

export default App;
