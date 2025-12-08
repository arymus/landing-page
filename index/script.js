const form = document.getElementById("sign-in");

form.addEventListener("submit", event => {
    event.preventDefault();
    
    const formData = new FormData(form);
    const user = {
        username: formData.get("username"),
        password: formData.get("password"),
    };

    const accepted = document.createElement("div");
    const acceptedStyles = {
        width: "200px",
        height: "100px",
        fontSize: "2rem",
        color: "black",

        position: "absolute",
        left: "50%",
        top: "20px",
    }

    Object.assign(accepted.style, acceptedStyles); // Append all of the styles to the accepted.style object

    if (user.username.toLowerCase() === "arymus" && user.password.toLowerCase() === "duh") {
        alert("Signed in successfully!");
        form.reset();
        setTimeout(() => { window.location.href = "../landing/index.html"; }, 500);
    } else {
        alert("Incorrect credentials!");
        form.reset();
    }
});