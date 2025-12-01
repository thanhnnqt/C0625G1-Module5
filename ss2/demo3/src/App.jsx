import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";

function App() {
    const form = React.createElement(
        "div",
        {className: "container mt-5", style: {maxWidth: "400px"}},

        React.createElement(
            "div",
            {className: "card p-4 shadow"},
            React.createElement(
                "h3",
                {className: "text-center mb-4"},
                "Sign In"
            ),
            React.createElement(
                "form",
                null,
                React.createElement(
                    "div",
                    {className: "mb-3"},
                    React.createElement(
                        "label",
                        {className: "form-label"},
                        "Username"
                    ),
                    React.createElement("input", {
                        type: "text",
                        className: "form-control",
                        placeholder: "Enter username",
                    })
                ),
                React.createElement(
                    "div",
                    {className: "mb-3"},
                    React.createElement(
                        "label",
                        {className: "form-label"},
                        "Password"
                    ),
                    React.createElement("input", {
                        type: "password",
                        className: "form-control",
                        placeholder: "Enter password",
                    })
                ),
                React.createElement(
                    "button",
                    {type: "submit", className: "btn btn-primary w-100 mt-2"},
                    "Sign In"
                )
            )
        )
    );
    return <>{form}</>;
}

export default App;
