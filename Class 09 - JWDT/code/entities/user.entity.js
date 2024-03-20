import { v4 as uuid } from "uuid";

class User {
    constructor(email, password, role) {
        this.id = uuid();
        this.email = email;
        this.password = password;
        this.role = role;
        this.refreshToken = [];
    }
}

export default User;