class ViewController {

    constructor() {
        window.addEventListener('hashchange', this.handleHashChange)
        window.addEventListener('load', this.handleHashChange)
        this.animalManager = new AnimalManager();
        // this.userManager = new UserManager(); // SLAVI why????????????
        // this.adoptManager = new AdoptManager();
        // this.cartManager = new CartManager();

    }




    handleHashChange = (event) => { //handler of 'hashchange' and 'load'!
        let hash = window.location.hash.slice(1) || "login";// slice, because the first element is # and we do not want it!

        const pageIds = ["home", "adopted", "donate", "login", "logout", "register"];// id's of our pages ---> from HTML

        if (hash === 'home' || hash === 'adopted') {

            if (!userManager.loggedUser) {
                location.hash = 'login';
                return; // the rest of code in this handler won't be executed!
            }
        }

        let loginLink = document.getElementById('loginLink'); // link in nav bar for login/logout
        let registerLink = document.getElementById('registerLink')
        let span = document.getElementById('span');
        if (userManager.loggedUser) {
            loginLink.innerText = "Logout";
            loginLink.href = '#logout';
            span.innerText = `Currently is logged in user with username: ${userManager.loggedUser.username}`;
            registerLink.style.display = 'none';
        }



        pageIds.forEach(element => {
            let currentPage = document.getElementById(element);

            if (hash === element) {
                currentPage.style.display = 'block';
            } else {
                currentPage.style.display = 'none';
            }
        })

        switch (hash) {
            case "home":
                this.renderMainPage();
                break;
            case "adopted":
                this.renderAdoptPage();
                break;
            case "donate":
                this.renderDonaePage();
                break;
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



    renderAnimals = (animalList, container) => {
        //console.log(this.animalManager.animalList)



        container.innerHTML = "";

        animalList.forEach(animal => {

            let currentSum = this.animalManager.currentCum(animal);
            let neededSum = this.animalManager.neededSum(animal);

            let card = document.createElement('div');
            card.classList.add = 'card';
            card.style.width = 200;
            card.style.border = '2px solid black'


            let img = document.createElement('img')
            img.src = animal.image;
            img.width = 200;
            img.height = 200;


            let name = document.createElement('div');
            name.innerText = animal.name;
            name.classList.add = ('name');

            let type = document.createElement('div');
            type.innerText = animal.type;
            type.classList.add = ('type');

            let bread = document.createElement("div");
            bread.innerText = animal.bread;
            bread.classList.add = ('bread');

            let age = document.createElement('div');
            age.innerText = animal.age + " " + "години.";
            age.classList.add = ('age')

            let neededAmount = document.createElement('div');
            neededAmount.innerText = "Необходима сума " + " " + Number(animal.neededAmount) + " " + "лв.";
            neededAmount.classList.add = ('neededAmount')

            let currentlyRisedAmount = document.createElement('div');
            currentlyRisedAmount.innerText = "Събрана сума " + " " + Number(animal.currentlyRisedAmount) + " " + "лв.";
            currentlyRisedAmount.classList.add = ('currentlyRisedAmount')

            let buttonsDiv = document.createElement('div');
            buttonsDiv.style.display = 'flex';
            buttonsDiv.style.justifyContent = "space-between"


            let buttonAdopt = document.createElement('button');
            buttonAdopt.innerText = 'Adopt';

            let buttonDonate = document.createElement('button');
            buttonDonate.innerText = 'Donate';
            if (currentSum === neededSum) {
                buttonDonate.style.display = 'none';
            }
            //ako sumata e subrana display:none


            buttonAdopt.addEventListener('click', (event) => {

                location.hash = "adopted";

                this.animalManager.adoptManager(animal);

                // let adoptedLocation = document.querySelector('#adopted .container');
                // let newContainer = document.createElement('div');
                // newContainer.classList.add = 'card';
                // newContainer.style.width = 200;
                // newContainer.style.border = '2px solid black'

                // let buttonLeave = document.createElement('button');
                // buttonLeave.innerText = 'Leave';

                // buttonLeave.addEventListener('click', ()=>{
                //     this.animalManager.adoptManager(animal);
                // })



                // newContainer.append(img,
                //                     name,
                //                     type,
                //                     bread,
                //                     age,
                //                     neededAmount,
                //                     currentlyRisedAmount,
                //                     buttonLeave);

                // adoptedLocation.append(newContainer)
            });





            buttonDonate.addEventListener('click', () => {

                let donateLocation = document.querySelector('#donate');

                let spanAnimal = document.getElementById('animalDonate');
                spanAnimal.innerText = animal.name;
                spanAnimal.style.display = 'flex'
                spanAnimal.style.justifyContent = 'center';
                spanAnimal.style.fontSize = '22px';

                donateLocation.prepend(spanAnimal);
                location.hash = 'donate';
            })

            buttonsDiv.append(buttonAdopt, buttonDonate)

            card.append(
                img,
                name,
                type,
                bread,
                age,
                neededAmount,
                currentlyRisedAmount,
                buttonsDiv

            );

            //console.log(card);
            container.appendChild(card);


        });



    }

    renderMainPage = () => {
        let cardContainer = document.querySelector('#home .container');
        let searchInput = document.getElementById('searchInput');
        let typeSelect = document.getElementById('typeSelect');

        searchInput.addEventListener('input', (event) => {
            let result = this.animalManager.search(event.target.value);

            this.renderAnimals(result, cardContainer);
        })

        this.renderAnimals(this.animalManager.animalList, cardContainer);
    }



    renderAdoptPage = () => {

        let adoptedLocation = document.querySelector('#adopted .container');

        adoptedLocation.innerHTML = "";

        this.animalManager.adoptedAnimalsList.forEach(animal => {

            let currentSum = this.animalManager.currentCum(animal);
            let neededSum = this.animalManager.neededSum(animal);

            let card = document.createElement('div');
            card.classList.add = 'card';
            card.style.width = 200;
            card.style.border = '2px solid black'


            let img = document.createElement('img')
            img.src = animal.image;
            img.width = 200;
            img.height = 200;


            let name = document.createElement('div');
            name.innerText = animal.name;
            name.classList.add = ('name');

            let type = document.createElement('div');
            type.innerText = animal.type;
            type.classList.add = ('type');

            let bread = document.createElement("div");
            bread.innerText = animal.bread;
            bread.classList.add = ('bread');

            let age = document.createElement('div');
            age.innerText = animal.age + " " + "години.";
            age.classList.add = ('age')

            let neededAmount = document.createElement('div');
            neededAmount.innerText = "Необходима сума " + " " + Number(animal.neededAmount) + " " + "лв.";
            neededAmount.classList.add = ('neededAmount')

            let adoptDate = document.createElement('div');
            adoptDate.innerText = new Date().toLocaleDateString();
            adoptDate.classList.add = ('adoptDate');

            let adoptTime = document.createElement('div');
            adoptTime.innerText = new Date().toLocaleTimeString();
            adoptTime.classList.add = ('adoptTime');

            let currentlyRisedAmount = document.createElement('div');
            currentlyRisedAmount.innerText = "Събрана сума " + " " + Number(animal.currentlyRisedAmount) + " " + "лв.";
            currentlyRisedAmount.classList.add = ('currentlyRisedAmount');


            let buttonLeave = document.createElement('button');
            buttonLeave.innerText = 'Leave';

            buttonLeave.addEventListener('click', () => {
                this.animalManager.adoptManager(animal);
                adoptedLocation.removeChild(card)
            })


            card.append(img,
                name,
                type,
                bread,
                age,
                // neededAmount,
                adoptDate,
                adoptTime,
                currentlyRisedAmount,
                buttonLeave);

            adoptedLocation.append(card)


        });


    }


    handlerDonate = () => {

    }


    renderDonaePage = () => {

        let donateBtn = document.getElementById('donateBtn');
        let donator = document.getElementById('daritel');
        let donatedSum = document.getElementById('sum');

        // donateBtn.addEventListener('submit', this){

        // }


    }

    renderRegister = () => {

        let formRegister = document.getElementById('registerForm');
        formRegister.elements.sub.disabled = true;
        let successfulRegister;

        formRegister.addEventListener('input', (e) => {

            let username = e.currentTarget.elements.username.value;
            let password = e.currentTarget.elements.password.value;
            let passConfirm = e.currentTarget.elements.passConfirm.value;

            let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");

            if (username && password && passConfirm) {

                e.currentTarget.elements.sub.disabled = false;

                e.currentTarget.elements.sub.addEventListener('click', (btn) => {
                    btn.preventDefault();

                    if (password === passConfirm && //if so -> passwod match and strong password
                        strongRegex.test(password)) {

                        successfulRegister = userManager.register({ username, password });

                        if (successfulRegister) {
                            location.hash = 'login';
                        } else {
                            btn.stopImmediatePropagation();
                            //btn.stopPropagation();
                            console.log(`This user: ${username}, allready exist`);
                        }
                    } else if ((password !== passConfirm)) { // if so -> password missmatch or wrong password
                        //btn.stopImmediatePropagation();
                        //btn.stopPropagation();
                        console.log('Password missmatch or week password / too short password! Please, try again');
                    }

                });
            }
        });
    }



    renderLogout = () => {

        //let formLogout = document.getElementById('logout');
        let logoutFormBtn = document.getElementById('logoutFormBtn');
        let registerLink = document.getElementById('registerLink');

        //formLogout.elements.sub
        logoutFormBtn.addEventListener('click', () => {

            localStorage.clear();
            userManager.loggedUser = null;
            location.hash = 'login';
            loginLink.innerText = "Login";
            loginLink.href = '#login';
            registerLink.style.display = 'flex';
        });
    }



    renderLogin = () => {


        let formLogin = document.getElementById('loginForm');// form login
        // let loginNavigation = document.getElementById('loginNav'); // link in nav bar login / logout
        let loginLink = document.getElementById('loginLink'); // link in nav bar for login/logout
        let registerLink = document.getElementById('registerLink');

        formLogin.elements.sub.disabled = true; // via property disabled on HTML btn, we can set value true/false, if true => the button is disabled


        formLogin.addEventListener('input', (e) => {
            e.preventDefault();

            let username = e.currentTarget.elements.username.value;
            let password = e.currentTarget.elements.password.value;

            if (username && password.length > 5) {
                e.currentTarget.elements.sub.disabled = false;

            }

            e.currentTarget.elements.sub.addEventListener('click', (btn) => {
                btn.preventDefault();

                let successfulLogin = userManager.login({ username, password });

                if (successfulLogin) {
                    location.hash = 'home'
                    registerLink.style.display = 'none';
                    e.currentTarget.elements.username.innerText = '';
                    e.currentTarget.elements.password.innerText = '';
                }else{
                    btn.stopPropagation();
                    console.log(`Invalid username or password.`);
                    //location.reload();
                }
                //}
            });

        });


        //WORKS here i have separated event listeners on every input and submit!
        //--------------------------------------------------------------------------------------------------------------------------
        // let username = "";
        // let password = "";

        // formLogin.elements.username.addEventListener('input', (e) =>{
        //     e.preventDefault();
        //     username = e.target.value
        // });

        // formLogin.elements.password.addEventListener('input', (e) =>{
        //     e.preventDefault();
        //     password = e.target.value
        //     if(username.length >0 && 
        //         e.target.value.length >5){

        //         formLogin.elements.sub.disabled = false;
        //     }
        // });


        // formLogin.elements.sub.addEventListener("click", (e) =>{
        //     // e.preventDefault();
        //     let successfulLogin = this.userManager.login({username, password});

        //     if(successfulLogin){
        //         location.hash = 'adopted';
        //     }
        // });
        //----------------------------------------------------------------------------------------------------------------------------


    }


}

let viewController = new ViewController();