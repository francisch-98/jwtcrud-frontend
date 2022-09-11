export class NewUser {
    name: string;
    NameUser: string;
    email: string;
    password: string;
    constructor(name: string, nameUser: string, email: string, password: string) {
        this.name = name;
        this.NameUser = nameUser;
        this.email = email;
        this.password = password;
    }
}
