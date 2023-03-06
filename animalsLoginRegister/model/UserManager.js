class User {

    constructor(user, pass){
        this.username = user;
        this.password = pass;
    }
}

class UserManager {

    constructor(){
        let loggedUser = JSON.parse(localStorage.getItem('isThereUser'));
        if(loggedUser){
            this.loggedUser = new User(loggedUser.username, loggedUser.password);// log the user from localeStorage as a logged user!
            this.users.push(new User(loggedUser.username, loggedUser.password));// when the page is reloaded push the user from localeStorage to users list!
        }
    }

    loggedUser = null;
    users = [new User('kami', 'kami123')];

    login = ({username, password}) => {

        let userExist = this.users.find(user => user.username === username  && user.password === password);

        if(userExist){
            this.loggedUser = userExist;
            localStorage.setItem('isThereUser', JSON.stringify(this.loggedUser));
            // this.users.push(new User(username, pass));
            return true;
        }

        return false;

    }

    register = ({username, password}) =>{

        let userExist = this.users.find(user => user.username === username);

        if(!userExist){
            console.log(this.users)
            this.users.push(new User(username, password));
            console.log(this.users)
            return true;
        }

        return false;
    }
}

let userManager = new UserManager();