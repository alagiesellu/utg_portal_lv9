<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0" id="view">
            <div class="card-header bg-transparent">
                <button class="btn btn-sm btn-outline-primary float-right"
                             v-on:click="$router.go(-1)">
                    <i class="ni ni-bold-left"></i> Back
                </button>
                <h4 v-text="$parent.form.title"></h4>
                <h3 v-if="$parent.user">
                    <small>#</small> {{$parent.user.num}}
                    <br>
                    <small>Names</small>
                    <router-link :to="{name:'ad.users',params:{id:$parent.user.id}}">{{$root.full_name($parent.user)}}</router-link>
                </h3>
            </div>
            <div class="card-body">
                <form @submit="submitForm">
                    <fake-form-input></fake-form-input>
                    <div class="form-group mb-3" v-if="$parent.form.input.num !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Number:</span>
                            </div>
                            <input class="form-control" placeholder="user number"
                                   type="text" v-model="$parent.form.input.num"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.first_name !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">First Name:</span>
                            </div>
                            <input class="form-control" placeholder="user first name"
                                   type="text" v-model="$parent.form.input.first_name"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.middle_name !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Middle Name:</span>
                            </div>
                            <input class="form-control" placeholder="user middle name"
                                   type="text" v-model="$parent.form.input.middle_name">
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.last_name !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Last Name:</span>
                            </div>
                            <input class="form-control" placeholder="user last name"
                                   type="text" v-model="$parent.form.input.last_name"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.email !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Email:</span>
                            </div>
                            <input class="form-control" placeholder="user email"
                                   type="text" v-model="$parent.form.input.email"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.tel !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Tel:</span>
                            </div>
                            <input class="form-control" placeholder="Telephone Number"
                                   type="tel" v-model="$parent.form.input.tel"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.address !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Address:</span>
                            </div>
                            <input class="form-control" placeholder="user address"
                                   type="text" v-model="$parent.form.input.address"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.gender !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Gender:</span>
                            </div>
                            <select class="form-control" v-model="$parent.form.input.gender" id="gender" ref="gender_select" required>
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.dob !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Date of Birth:</span>
                            </div>
                            <input class="form-control" placeholder="Date of birth"
                                   type="date" v-model="$parent.form.input.dob"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.nationality !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Nationality:</span>
                            </div>
                            <country-select  class="form-control"  topCountry="GM"
                                             v-model="$parent.form.input.nationality"
                                             :country="$parent.form.input.nationality">
                            </country-select>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.profile !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Profile Type:</span>
                            </div>
                            <select class="form-control" v-model="$parent.form.input.profile" v-on:change="$parent.get_departments()" required>
                                <option value="ad">Admin</option>
                                <option value="ac">Academics</option>
                                <option value="s">Student</option>
                            </select>
                        </div>
                    </div>
<!--                    <div class="form-group mb-3">-->
<!--                        <div class="input-group">-->
<!--                            <div class="input-group-prepend">-->
<!--                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                            </div>-->
<!--                            <input class="form-control" placeholder="Password confirmation"-->
<!--                                   type="password" v-model="$parent.form.input.password"-->
<!--                                   required>-->
<!--                        </div>-->
<!--                    </div>-->

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
        <ViewRoles></ViewRoles>
    </div>
</template>

<script>
    import ViewRoles from "../../modals/ViewRoles";
    export default {
        name: "FromUsers",
        components: {ViewRoles},
        methods: {
            submitForm: function(e)
            {
                e.preventDefault();

                switch (this.$parent.form.type) {
                    case 'c':
                        axios.post('/admin/users/store', this.$parent.form.input)
                            .then(res => {
                                //this.$parent.user = res.data.user;
                                this.$root.post_success(res.data.success);
                                this.$parent.user = this.$parent.form = null;
                                this.$parent.users = res.data.users;
                                this.$router.push({name:'ad.users',params:{id:res.data.user.id}});
                            });
                        break;
                    case 'd':
                        axios.post('/admin/users/destroy', this.$parent.form.input)
                            .then(res => {
                                //this.$parent.users = res.data.users;
                                this.$root.post_success(res.data.success);
                                this.$parent.user = this.$parent.form = null;
                                this.$parent.users = res.data.users;
                                this.$router.push({name:'ad.users'});
                            });
                        break;
                    case 'e':
                        axios.post('/admin/users/edit', this.$parent.form.input)
                            .then(res => {
                                this.$root.post_success(res.data.success);
                                this.$parent.form = null;
                                this.$parent.user = res.data.user;
                                this.$router.push({name:'ad.users',params:{id:res.data.user.id}});
                            });
                        break;
                }
            },
        },
    }
</script>

<style scoped>

</style>
