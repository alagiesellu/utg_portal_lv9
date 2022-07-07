<template>
        <div>
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>Sign in with credentials</small>
                    </div>
                    <div class="card-header bg-transparent" v-show="this.errors.length">
                        <div class="alert alert-danger" role="alert">
                            <li v-for="error in errors">{{error}}</li>
                        </div>
                    </div>

                    <a href="/auth/redirect" class="btn btn-danger btn-lg btn-block">
                        SIGN IN WITH UTG EMAIL
                    </a>
                    <hr>
                    <form v-if="false" role="form" v-on:submit="login">
                        <div class="form-group mb-3">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="ni ni-email-83" v-bind:class="[ this.errors.length ? 'text-danger':'' ]"></i></span>
                                </div>
                                <input type="email" name="username" class="form-control" v-model="inputs.username" aria-describedby="emailHelp" placeholder="Enter Email Address...">
                            </div>
                        </div>
<!--                        <div class="form-group">-->
<!--                            <div class="input-group">-->
<!--                                <div class="input-group-prepend">-->
<!--                                    <span class="input-group-text"><i class="ni ni-lock-circle-open" v-bind:class="[ this.errors.length ? 'text-danger':'' ]"></i></span>-->
<!--                                </div>-->
<!--                                <input type="password" class="form-control" v-model="inputs.password" placeholder="Password">-->
<!--                            </div>-->
<!--                        </div>-->
                        <div class="text-center">
                            <button v-on:click="login" class="btn btn-primary btn-block">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3">
                <a href="https://www.utg.edu.gm/portal-password" target="_blank" class="col-6 text-light">Forgot password?</a>
            </div>
        </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                inputs: { username: '', password: '' },
                errors: [],
                loading: null,
            }
        },
        mounted() {
            this.loginQueries = location.search

            if (this.loginQueries)
                this.oAuthLogin()
        },
        methods: {
            oAuthLogin: function() {

                this.loading = this.$loading.show();

                axios.post(location.origin + '/auth/callback' + this.loginQueries)
                    .then(res => {
                        console.log(res)

                        if (res.data.error) {

                            this.loading.hide();
                            this.errors = res.data.error;
                            // this.redirect_login(res.data.success.user['type'])
                        } else {

                            window.Save.storeAuthToken(res.data.success.token);
                            // this.redirect_login(res.data.success.user.type)
                            window.Save.removeLoginRedirect()
                            location.reload()
                        }
                    }).catch(err => {

                        this.loading.hide();
                        this.errors = [err.name];
                        console.error(err);
                    });
            },
            redirect_login: function (type) {
                const login_redirect = window.Save.getLoginRedirect();// localStorage.getItem(window.cookies_key_start+'login_redirect');

                if (login_redirect)
                    window.location.href = login_redirect;
                else
                    window.location.href = window.user_type[type];
            },
            login: function(event) {
                event.preventDefault();

                this.errors = [];

                if(!this.inputs.username.endsWith('@utg.edu.gm'))
                   this.errors.push('Email must be a valid UTG email!');

                if(this.inputs.password === '')
                    this.errors.push('Password required!');

                if (this.errors.length === 0)
                {
                    this.loading = this.$loading.show();
                    axios.post('/login', this.inputs)
                        .then(res => {

                            if (res.data.error) {
                                this.loading.hide();
                                this.errors = res.data.error;
                            } else {

                                // Object.keys(res.data.success.user).forEach(function (key) {
                                //     sessionStorage.setItem(window.cookies_key_start+key, res.data.success.user[key]);
                                // });

                                // keep backup at in cookies

                                window.Save.storeAuthToken(res.data.success.user['token']);//.store('token', res.data.success.user['token']);

                                const login_redirect = window.Save.getLoginRedirect();// localStorage.getItem(window.cookies_key_start+'login_redirect');
                                if (login_redirect)
                                    window.location.href = login_redirect;
                                else
                                    window.location.href = window.user_type[res.data.success.user['type']];
                                window.Save.removeLoginRedirect();
                                // localStorage.removeItem(window.cookies_key_start+'login_redirect');
                            }
                        }).catch(err => {
                            // console.error(err);
                        });
                }
            },
        }
    }
</script>

<style scoped>
</style>
