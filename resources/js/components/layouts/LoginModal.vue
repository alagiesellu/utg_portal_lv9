<template>
    <div class="col-md-4">
        <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="login-modal" aria-hidden="true">
            <div class="modal-dialog modal- modal-dialog-centered modal-sm" role="document">
                <div class="modal-content">

                    <div class="modal-body p-0">
                        <div class="card bg-secondary shadow border-0">
                            <div class="card-body px-lg-5 py-lg-5">
                                <div class="text-center text-muted mb-4">
                                    <h3>Session expires, login again!</h3>
                                </div>
                                <div class="card-header bg-transparent" v-show="this.errors.length">
                                    <div class="alert alert-danger" role="alert">
                                        <li v-for="error in errors">{{error}}</li>
                                    </div>
                                </div>
                                <form role="form" v-on:submit="login">
                                    <fake-form-inputs></fake-form-inputs>
                                    <div class="form-group mb-3">
                                        <div class="input-group input-group-alternative">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                                            </div>
                                            <input required class="form-control" placeholder="Email" v-model="$store.state.auth.email" type="email" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group input-group-alternative">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                                            </div>
                                            <input required class="form-control" placeholder="Password" v-model="inputs.password" type="password">
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button v-on:click="login" class="btn btn-primary btn-block">
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FakeFormInputs from "./FakeFormInputs";
    export default {
        name: "LoginModal",
        components: {FakeFormInputs},
        data() {
            return {
                inputs: {
                    password: '',
                },
                errors: [],
                loading: null,
            }
        },
        methods: {
            login: function(e) {
                e.preventDefault();

                this.errors = [];

                this.inputs.username = this.$store.state.auth.email;

                if(!this.inputs.username.endsWith('@utg.edu.gm'))
                    this.errors.push('Email must be a valid UTG email!');

                if(this.inputs.password === '')
                    this.errors.push('Password required!');

                if (this.errors.length === 0)
                {
                    this.loading = this.$loading.show();
                    axios.post('/login', this.inputs)
                        .then(res => {
                            this.loading.hide();

                            if (res.data.error) {
                                this.errors = res.data.error;
                            } else {

                                // Object.keys(res.data.success.user).forEach(function (key) {
                                //     sessionStorage.setItem(window.cookies_key_start+key, res.data.success.user[key]);
                                // });

                                // keep backup at in cookies
                                this.$cookies.set(window.cookies_key_start+'token', res.data.success.user['token']);
                                this.$cookies.set(window.cookies_key_start+'refresh_token', res.data.success.user['refresh_token']);

                                $('#login-modal').modal('hide');
                            }
                        }).catch(err => {
                            //console.error(err);
                        });
                }
            },
        }
    }
</script>

<style scoped>

</style>
