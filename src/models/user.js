export class User {
    /**
     * @param {string} _id
     * @param {string} name
     * @param {string} surname
     * @param {string} [profilePic]
     */
    constructor(_id, name, surname, profilePic) {
        this._id = _id;
        this.name = name;
        this.surname = surname;
        this.profilePic = profilePic;
    }
}

export default User;