class User {
    constructor(user, pass) {
        this.username = user;
        this.pass = pass;
    }
}


class UserManager {

    // constructor get's called every time when we create a new instance 
    constructor() {
        let loggedUser = JSON.parse(localStorage.getItem('isThereUser'));
        if (loggedUser) {
            this.loggedUser = new User(loggedUser.username, loggedUser.pass);
        }
    }

    loggedUser = null;

    users = [new User('slavi', 'bahur!'), new User('bahur', 'slavi!')];



    login = ({ username, pass }) => {
        // let foundLocalUser = JSON.parse(localStorage.getItem('isThereUser')).find(user => user.username === username && user.pass === pass);
        let foundUser = this.users.find(user => user.username === username &&
            user.pass === pass
        );
        if (foundUser) {
            this.loggedUser = foundUser;
            localStorage.setItem('isThereUser', JSON.stringify(this.loggedUser));
            return true;
        }

        return false;
    }

    register = ({ username, pass }) => {
        let foundUser = this.users.find(user => user.username === username);

        if (!foundUser) {
            this.users.push(new User(username, pass));
            return true;
        }
        // else if(foundUser){
        //     console.log("This user already exist");
        //     return false;
        // }else{
        //     console.log('Wrong password OR too short password without upper letter');
        //     return false;
        // }
        return false;

        

    }


}

let userManager = new UserManager(); 