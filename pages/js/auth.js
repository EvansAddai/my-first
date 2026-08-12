const User = JSON.parse(localStorage.getItem("User")) || [];

console.log(User);

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");

    if (registerForm) {
        const passwordInput = document.getElementById("password");
        const confirmInput = document.getElementById("confirm-password");
        const messageElement = document.querySelector(".message");

        const submitButton = registerForm.querySelector("button[type='submit']");

        const setButtonLoading = isLoading => {
            if (!submitButton) return;
            submitButton.disabled = isLoading;
            submitButton.classList.toggle("loading", isLoading);
            submitButton.setAttribute("aria-busy", isLoading ? "true" : "false");
            submitButton.textContent = isLoading ? "Registering..." : "Register";
        };

        const updateConfirmMessage = () => {
            if (!confirmInput.value) {
                messageElement.textContent = "";
                messageElement.style.color = "";
                return;
            }

            if (passwordInput.value === confirmInput.value) {
                messageElement.textContent = "Passwords match.";
                messageElement.style.color = "#5fe98d";
            } else {
                messageElement.textContent = "Passwords do not match.";
                messageElement.style.color = "#ff9b9b";
            }
        };

        passwordInput.addEventListener("input", updateConfirmMessage);
        confirmInput.addEventListener("input", updateConfirmMessage);

        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            setButtonLoading(true);

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = passwordInput.value;
            const confirmPassword = confirmInput.value;

            if (password !== confirmPassword) {
                messageElement.textContent = "Passwords do not match!";
                messageElement.style.color = "#ff9b9b";
                setButtonLoading(false);
                return;
            }

            const newUser = {
                username: username,
                email: email,
                password: password
            };

            User.push(newUser);
            localStorage.setItem("User", JSON.stringify(User));
            messageElement.textContent = "Registration successful! Redirecting...";
            messageElement.style.color = "#5fe98d";
            setTimeout(() => {
                window.location.href = "home.html";
            }, 6000);
        });
    }

    const toggles = document.querySelectorAll(".toggle-password");
    toggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const wrapper = toggle.closest(".password-input");
            const input = wrapper ? wrapper.querySelector("input[type='password'], input[type='text']") : null;
            if (!input) return;

            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";
            toggle.innerHTML = isPassword ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
            toggle.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        const usernameInput = document.getElementById("username");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const messageElement = loginForm.querySelector(".message");
        const submitButton = loginForm.querySelector("button[type='submit']");

        const setButtonLoading = isLoading => {
            if (!submitButton) return;
            submitButton.disabled = isLoading;
            submitButton.classList.toggle("loading", isLoading);
            submitButton.setAttribute("aria-busy", isLoading ? "true" : "false");
            submitButton.textContent = isLoading ? "Logging in..." : "Login";
        };

        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            setButtonLoading(true);

            const username = usernameInput ? usernameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const password = passwordInput ? passwordInput.value : "";
            const registeredUsers = JSON.parse(localStorage.getItem("User")) || [];
            const userMatch = registeredUsers.find(user => user.username === username && user.email === email && user.password === password);

            if (!userMatch) {
                if (messageElement) {
                    messageElement.textContent = "Invalid login credentials.";
                    messageElement.style.color = "#ff9b9b";
                }
                setButtonLoading(false);
                return;
            }

            if (messageElement) {
                messageElement.textContent = "Login successful! Redirecting...";
                messageElement.style.color = "#5fe98d";
            }

            setTimeout(() => {
                window.location.href = "home.html";
            }, 6000);
        });
    }
});