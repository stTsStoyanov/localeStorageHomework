class ViewController {

    constructor() {
        window.addEventListener('load', this.handleHashChange);
        window.addEventListener('hashchange', this.handleHashChange);

    }


    handleHashChange = () => {
        const pageIds = ['login', 'register', 'home', 'logout'];

        let hash = location.hash.slice(1) || pageIds[0]; // by default to be on login page

        if (hash === 'home') {
            if (!userManager.loggedUser) {   // if we don't have logged user HOME page is not reachable
                location.hash = 'login';
                return;
            }
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
            case 'home':
                this.renderHome();

        }

    }

    renderLogin = () => {

        // logout
        let formLogin = document.getElementById('loginForm');// form login
        let loginNavigation = document.getElementById('loginNav'); // link in nav bar lonin

        let logoutNavigation = document.getElementById('logoutNav')// link in nav bar logout
        logoutNavigation.style.display = "none";
        let formLogout = document.getElementById('logoutForm');// form logout
        formLogout.style.display = 'none';

        let formLogoutSpan = document.getElementById('span'); //formLogout.elements.span;
        formLogoutSpan.style.display = 'none';


        formLogin.elements.sub.disabled = true; // via property disabled on HTML btn, we can set value true/false, if true => the button is disabled
     

         
        formLogin.addEventListener('input', (e) => {

            e.preventDefault();


            let username = e.currentTarget.elements.username.value;
            let pass = e.currentTarget.elements.pass.value;

            if(username && pass){
                e.currentTarget.elements.sub.disabled = false;
            }

            e.currentTarget.elements.sub.addEventListener('click', (btn) =>{
                // btn.preventDefault(); // it isn't needed in this situation
                let successfulLogin = userManager.login({ username, pass });

                if(successfulLogin){
                    location.hash = 'home'
                    // formLogin.style.display = 'none';
                    // formLogout.style.display = 'flex'
                    loginNavigation.style.display = "none";
                    // logoutNavigation.style.display = "flex"
                    // loginNavigation.innerText = "Logout";
                    formLogoutSpan.innerText = `Curently you are loggedin as a:  ${username}`;
                }
            });
        }); 

    }

    renderLogout = () =>{
        let formLogout = document.getElementById('logoutForm');
        let formLogoutSpan = document.getElementById('span');
        formLogoutSpan.style.display = 'flex'
        // formLogout.style.display = 'none';



    }

    renderHome = () =>{
        // let logoutNavigation = document.getElementById('logoutNav')// link in nav bar logout
        // logoutNavigation.style.display = "block";
    }

}

let viewController = new ViewController();