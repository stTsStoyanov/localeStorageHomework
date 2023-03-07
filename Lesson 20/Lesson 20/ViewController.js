class ViewController {

    constructor() {
        window.addEventListener('load', this.handleHashChange);
        window.addEventListener('hashchange', this.handleHashChange);

    }


    handleHashChange = () => {
        const pageIds = ['login', 'register', 'home', 'logout'];

        let hash = location.hash.slice(1) || pageIds[0];

        if (hash === 'home') {
            if (!userManager.loggedUser) {
                location.hash = 'login';
                return;
            }
        }

        let logoutForm = document.getElementById("logout");
        let loginForm = document.getElementById("login");
        let registerNavBtn = document.getElementById("registerNavBtn");
        let loginNavBtn = document.getElementById("loginNavBtn");
        let spanLogout = document.getElementById("spanLogout");
        
        if(userManager.loggedUser){

            loginNavBtn.innerText = 'Logout';
            loginNavBtn.href = '#logout';
            registerNavBtn.style.display = 'none';
            spanLogout.innerText = `Courrently is loggedin: ${userManager.loggedUser.username}`;
        }

        pageIds.forEach(pageId => {
            let element = document.getElementById(pageId);
            if (pageId === hash) {
                element.style.display = 'flex';
            } else {
                element.style.display = 'none';
            }
        })

        switch (hash) {

            case 'login':
                this.renderLogin();
                break;
            case 'logout':
                this.renderLogout();
                break;
            case 'register':
                this.renderRegister();
                break;

        }

    }


    renderRegister = () => {

        let form = document.getElementById('registerForm');
        form.elements.sub.disabled = true;
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
        

        form.addEventListener('input', (e) =>{
            e.preventDefault();

            let username = e.currentTarget.elements.username.value;
            let password = e.currentTarget.elements.password.value;
            let passwordConfirm = e.currentTarget.elements.passwordConfirm.value;
            
            if(username && password.length > 5 && passwordConfirm.length > 5){
                e.currentTarget.elements.sub.disabled = false;
            }
        });


        form.addEventListener('submit', (e) =>{
            e. preventDefault();

            let username = e.currentTarget.elements.username.value;
            let password = e.currentTarget.elements.password.value;
            let passwordConfirm = e.currentTarget.elements.passwordConfirm.value;
            let successfulRegister;

            if(password === passwordConfirm){

                if(strongRegex.test(password)){

                    successfulRegister = userManager.register({username, password});
                }else{
                    alert('Password must contain: small letter, big letter, number and special symbol!');
                    return;
                }
            }else{
                alert('Password mismatch!');
                return;
            }

            if(successfulRegister){
                alert('Your account has been successfully registered!');
            }else{
                alert(`This username: ${username} is already registered!`);
            }
        });

    }

    renderLogin = () => {


        let form = document.getElementById('loginForm');
        form.elements.sub.disabled = true;
        let successfulLogin;
        let logoutForm = document.getElementById("logout");
        let loginNavBtn = document.getElementById("loginNavBtn");


        form.addEventListener('input', (e) => { // event listener to disable ana enable submit btn.

            let username = e.currentTarget.elements.username.value;
            let password = e.currentTarget.elements.password.value;

            if (username && password.length > 4) {
                e.currentTarget.elements.sub.disabled = false;
            }

        });


        form.addEventListener('submit', (e) => { // event listener for submit btn, if that event happen check the password
            e.preventDefault();

            let username = e.currentTarget.elements.username.value;
            let password = e.currentTarget.elements.password.value;

            successfulLogin = userManager.login({ username, password });
            if(successfulLogin) {

                location.hash = 'home';
                loginNavBtn.innerText = "Logout";
                loginNavBtn.href = '#logout';
    
            } else {
                console.log("Wrong username and/or password!");
            }
        });

    }

    renderLogout = () =>{

        let logoutForm = document.getElementById("logout");
        let loginNavBtn = document.getElementById("loginNavBtn");
        let spanLogout = document.getElementById("spanLogout");
        let registerNavBtn = document.getElementById("registerNavBtn");

        logoutForm.addEventListener('submit', (e) =>{

            userManager.loggedUser = null;
            location.hash = 'login';
            loginNavBtn.innerText = "Login";
            loginNavBtn.href = '#login';
            spanLogout.innerText = ``;
            registerNavBtn.style.display = 'flex'

            localStorage.clear('isThereUser');
        });
    }

}

let viewController = new ViewController();