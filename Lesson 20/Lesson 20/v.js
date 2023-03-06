class ViewController {

    constructor() {
        window.addEventListener('load', this.handleHashChange);
        window.addEventListener('hashchange', this.handleHashChange);

    }


    handleHashChange = () => {
        const pageIds = ['login', 'register', 'home', 'logout'];

        let hash = location.hash.slice(1) || pageIds[0];

        if(hash === 'home') {
            if(!userManager.loggedUser) {
                location.hash = 'login';
                return; 
            }
        }

        pageIds.forEach(pageId => {
            let element = document.getElementById(pageId);
            if(pageId === hash) {
                element.style.display = 'flex';
            } else {
                element.style.display = 'none';
            }
        })

        switch(hash) {

            case 'login':
                this.renderLogin();
                break;
            case 'register':
                this.renderRegister();
                break;
            case 'logout':
                this.renderLogout();
                break;

        }

    }

    renderLogin = () => {
        let formLogin = document.getElementById('loginForm');// form login
        let loginNavigation = document.getElementById('loginNav'); // link in nav bar login / logout

        if (userManager.loggedUser!== null) {
            location.hash = 'logout'
            loginNavigation.innerText = "Logout"
            loginNavigation.href = "#logout";
        }

        let formLogoutSpan = document.getElementById('span'); //formLogout.elements.span;
        formLogoutSpan.style.display = 'none';

        formLogin.elements.sub.disabled = true; // via property disabled on HTML btn, we can set value true/false, if true => the button is disabled


        formLogin.addEventListener('input', (e) => {
            e.preventDefault();

            let username = e.currentTarget.elements.username.value;
            let pass = e.currentTarget.elements.pass.value;

            if (username && pass.length > 5) {
                e.currentTarget.elements.sub.disabled = false;

            }

            e.currentTarget.elements.sub.addEventListener('click', (btn) => {
                btn.preventDefault();
                
                // if (pass.length < 6) {
                //     btn.stopImmediatePropagation();
                //     alert('too short pasword');
                // } else {
                    let successfulLogin = userManager.login({ username, pass });

                    if (successfulLogin) {
                        location.hash = 'home'

                        loginNavigation.innerText = "Logout"
                        loginNavigation.href = "#logout";

                        formLogoutSpan.innerText = `Curently you are loggedin as a:  ${username}`;
                    } else{
                        // btn.stopPropagation(); // otherways i got 9 alerts besauce of bubbling to the root
                        console.log('Wrong combination of username and/or password!');// it does not work well!!!!!! IDK why!?! Or i know? Wrong elent listener?
                    }
                //}
            });

        });

    }

    renderLogout = () =>{

        let formLogout = document.getElementById('logoutForm');// form login
        let loginNavigation = document.getElementById('loginNav'); // link in nav bar login / logout

        if (userManager.loggedUser == null) {
            location.hash = 'login'
            loginNavigation.innerText = "Login"
            loginNavigation.href = "#login";
        }

        let formLogoutSpan = document.getElementById('span'); //formLogout.elements.span;
        formLogoutSpan.style.display = 'flex';

        formLogout.elements.logout.addEventListener('click', (btn) =>{

            userManager.loggedUser = null;
            localStorage.clear(); //let see if works like this

            location.hash = 'login'

            loginNavigation.innerText = "Login"
            loginNavigation.href = "#login";

        });

    }

    renderRegister = () =>{

        let formRegister = document.getElementById('registerForm');
        formRegister.elements.sub.disabled = true; // disabe submit button
        let successfulRegister;

        formRegister.addEventListener('input', (e) => {
            console.log(e.currentTarget.elements.pass.value, e.currentTarget.elements.passConfirm.value)
            let username = e.currentTarget.elements.username.value;
            let pass = e.currentTarget.elements.pass.value;
            let passConfirm = e.currentTarget.elements.passConfirm.value;

            if (username && pass && passConfirm) {

                // btn.stopPropagation();
                let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})"); // Regular expression for password!

                if (pass === passConfirm) {
                    if (strongRegex.test(pass)) {
                        formRegister.elements.sub.disabled = false;

                        e.currentTarget.elements.sub.addEventListener('click', (btn) => {

                            successfulRegister = userManager.register({ username, pass })

                            if (successfulRegister) {
                                location.hash = 'login';

                                console.log('regna se!')
                            } else {
                                //btn.stopImmediatePropagation();
                                alert("This user already exist");
                            }
                        });
                    }
                } else {
                    if (pass.length == passConfirm.length) {
                        formRegister.elements.sub.disabled = false;
                        e.currentTarget.elements.sub.addEventListener('click', (btn) => {
                            // btn.stopImmediatePropagation();
                            alert("Passwort missmatch");
                        });
                    }
                }

            }

        });

       

        
    }
    
}

let viewController = new ViewController();