import User from "./user";
import store from "../store";

class UserStorage{

    static user()
    {

        axios.get(window.api_url + '/user')
            .then(res => {

                return new User(res.data.user);

            }).catch(err => {
                window.methods.catch_error(err)
            });
    }
}

export default UserStorage
