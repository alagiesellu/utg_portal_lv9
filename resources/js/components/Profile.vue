<template>

    <div class="row">

        <div class="col-md-7">
            <div class="card bg-secondary shadow">
                <div class="card-header bg-white border-0">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h3 class="mb-0">My account</h3>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table align-items-center table-flush">
                        <tbody>
                        <tr>
                            <td class="text-center">
                                <img :src="'/'+this.$store.state.auth.img" class="img-thumbnail">
                            </td>
                        </tr>
                        <tr><th><small>#</small><h2>{{this.user.num}}</h2></th></tr>
                        <tr><th><small>First Name</small><h3>{{this.user.first_name}}</h3></th></tr>
                        <tr><th><small>Middle Name</small><h3>{{this.user.middle_name}}</h3></th></tr>
                        <tr><th><small>Last Name</small><h3>{{this.user.last_name}}</h3></th></tr>
                        <tr><th><small>Email</small><h3>{{this.user.email}}</h3></th></tr>
                        <tr><th><small>Telephone Number</small><h3>{{this.user.tel}}</h3></th></tr>
                        <tr><th><small>Address</small><h3>{{this.user.address}}</h3></th></tr>
                        <tr><th><small>Gender</small><h3>{{this.gender(this.user.gender)}}</h3></th></tr>
                        <tr><th><small>Date Of Birth</small><h3>{{this.user.dob}}</h3></th></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="col-md-5">
            <div class="card shadow">
                <div class="card-header bg-white border-0">
                    <div class="align-items-center">
                        <div class="float-left">
                            <div class="btn-group">
                                <button type="button" class="btn btn-outline-warning btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Switch
                                </button>
                                <div class="dropdown-menu">
                                    <button class="dropdown-item text-capitalize" v-for="profile in user.profiles" v-on:click="switchProfile(profile)">
                                        <i class="ni ni-check-bold text-success" v-if="profile.id === user.profile.id"></i>
                                        <i class="ni ni-fat-delete" v-else></i>
                                        <strong>{{user_type(profile.type)}}</strong> in <strong>{{profile.department.name}}</strong>
                                    </button>
                                </div>
                            </div>
                            <span class="badge badge-pill badge-danger" v-if="switch_action.error">Error! Retry.</span>
                            <span class="badge badge-pill badge-success" v-if="switch_action.success">Switching Successful! Login again for changes to take effect.</span>
                        </div>
                        <div class="float-right">Profiles</div>
                    </div>
                </div>
                <div class="card-body pt-0 pt-md-4" v-if="user.profile">
                    <h4 v-bind:class="{'text-danger':!user.profile.active}">
                        <span class="badge badge-danger" v-if="!user.profile.active">Deactivated</span><br>
                        <div class="text-capitalize">
                            <small>Type: </small>{{$root.profile_type(user.profile.type)}}<br>
                        </div>
                        <div v-if="user.profile.set != null">
                            <small>Set: </small>{{user.profile.set.name}}
                        </div>
                        <div v-if="user.profile.department != null">
                            <small>Department: </small>
                            <router-link target="_blank" :to="{name:'ad.departments',params:{id:user.profile.department_id}}">
                                {{user.profile.department.name}}
                            </router-link>
                        </div>
                        <div v-if="user.profile.group != null">
                            <small>Role Group: </small>
                            <button
                                v-on:click="$modal.show('view-roles', {group:user.profile.group})"
                                class="btn btn-sm btn-link">{{user.profile.group.name}}</button>
                            <ViewRoles></ViewRoles>
                        </div>
                    </h4>
                    <hr>
                </div>
            </div>
        </div>

        <!-- Modals -->
        <div class="modal fade" id="modal-profile" tabindex="-1" role="dialog"
             aria-labelledby="modal-profile" aria-hidden="true">
            <div class="modal-dialog modal- modal-dialog-centered modal-" role="document">
                <div class="modal-content">

                    <div class="modal-header">
                        <h3 class="modal-title" id="modal-title-create">
                            Update Profile
                        </h3>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>

                    <div class="modal-body">

                        <div class="text-center text-muted mb-4">
                            <div class="text-danger bold" v-for="messages in form.message.errors">
                                <span v-for="msg in messages">
                                    <li>{{msg}}</li>
                                </span>
                            </div>
                            <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="form.message.success.length" ref="display_success_message">
                                <span class="alert-inner--icon"><i class="ni ni-like-2"></i></span>
                                <span class="alert-inner--text">
                                    <strong>Success!</strong>
                                    <span v-for="msg in form.message.success">
                                        {{msg}}
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <img :src="form.input.image" class="img-thumbnail">
                                <hr>
                                <div class="row">
                                    <input type="file" v-on:change="onFileChange" class="form-control col-8">
                                    <button class="btn btn-success col-4" @click="upload">Upload</button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import ViewRoles from "./modals/ViewRoles";
    export default {
        name: "profile",
        components: {ViewRoles},
        data() {
            return {
                user: [],
                roles: window.roles,
                form: {
                    input: {
                        image: '',
                    },
                    message: {
                        errors: [],
                        success: [],
                    },
                },
                switch_action: {
                    error: false,
                    success: false,
                },
            }
        },
        mounted() {
            this.fectchUserProfile();
            this.$store.state.page = 'Profile';
        },
        methods: {

            switchProfile: function(profile) {

                if (profile.id !== this.user.profile_id)
                {
                    axios.post('/user/switch',{profile: profile.id})
                        .then(res => {

                            if (res.data.success === null)
                                this.switch_action.error = true;
                            else {
                                this.switch_action.success = true;
                            }
                        });
                }
            },

            onFileChange: function(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage: function(file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.form.input.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            upload: function() {
                this.form.message.errors = [];
                this.form.message.success = [];

                if (this.form.input.image.substr(5,5) === 'image')
                {
                    axios.post('/user/upload', {image: this.form.input.image})
                        .then(res => {
                            this.form.message.success.push(res.data.success);

                            sessionStorage.setItem(window.cookies_key_start + 'img', res.data.img);
                            this.$store.state.auth.img = res.data.img;
                        });
                } else {
                    this.form.message.errors.push({msg: "Invalid! Must select a image."});
                }
            },

            fectchUserProfile: function()
            {
                axios.get('/user/profile')
                    .then(res => {
                        this.user = res.data.user;

                        for (let profile of this.user.profiles)
                            if (this.user.profile_id === profile.id) {
                                this.user.profile = profile;
                                this.user.profile.department = profile.department;
                            }
                    });
            },

            gender: function (gender)
            {
                if (gender === 'm')  return 'Male';
                else    return 'Female';
            },

            user_type: function (type) {
                return window.user_type[type];
            }
        },
    }
</script>
<style scoped>

</style>
