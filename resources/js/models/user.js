class User {

    constructor(data)
    {
        this.name = data['name'] || '';
        this.img = data['img'] || '';
        this.type = data['type'] || '';
        this.roles = data['roles'] || '';
        this.email = data['email'] || '';
    }

    hasRole(role)
    {
        return this.roles.indexOf(role) > -1;
    }

    get isNull()
    {
        return this.type === '';
    }

    get getTypeName()
    {
        return window.user_type[this.type];
    }

    get getHome()
    {
        return "/"+this.getTypeName;
    }
}

export default User
