class User  {
    constructor(user, password) {
        this.username = user;
        this.password = password;
    }
}


class UserManager {

    // constructor get's called every time when we create a new instance 
    constructor() {
        let loggedUser = JSON.parse(localStorage.getItem('isThereUser'));
        if(loggedUser) {
            this.loggedUser = new User(loggedUser.username, loggedUser.password);

            let isTheUserExist = this.users.find(user => user.username != loggedUser.username);
            if(isTheUserExist){
                this.users.push(new User(loggedUser.username, loggedUser.password));
            } 
        }
    }

    loggedUser = null;

    users = [new User('slavi', 'bahur'), new User('bahur', 'slavi')];


    login = ({username, password}) => {
        let foundUser = this.users.find(user => user.username === username && 
                                                 user.password === password
        );
        if(foundUser) {
            this.loggedUser = foundUser;
            localStorage.setItem('isThereUser', JSON.stringify(this.loggedUser));
            return true;
        } 

        return false;
    }

    register = ({username, password}) => {
        let foundUser = this.users.find(user => user.username === username);

        if(!foundUser) {
            this.users.push(new User(username, password));
            return true;
        }

        return false;

    }


}

let userManager = new UserManager(); 