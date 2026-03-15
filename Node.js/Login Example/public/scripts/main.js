import * as api from './api.js'

const init = async () => {
    const currentPath = window.location.pathname

    if (currentPath === '/login') {
        const loginForm = document.getElementById("loginForm")
        if (loginForm) {
            loginForm.addEventListener("submit", async (e) => {
                e.preventDefault()
                const userName = document.getElementById("userName")?.value
                const password = document.getElementById("password")?.value

                const result = await api.sendRequest('/api/login', { userName, password })

                if (result) {
                    window.location.href = "/"
                }
            })
        }
    } else if (currentPath === '/register') {
        const loginForm = document.getElementById("registerForm")
        if (loginForm) {
            loginForm.addEventListener("submit", async (e) => {
                e.preventDefault()
                const userName = document.getElementById("userName")?.value
                const password = document.getElementById("password")?.value

                const result = await api.sendRequest('/api/register', { userName, password })

                if (result) {
                    window.location.href = "/"
                }
            })
        }
    }
}

document.addEventListener('DOMContentLoaded', init())