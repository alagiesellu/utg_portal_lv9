<template>
    <div class="row col-12">
        <div class="col-md-6">
            <div class="card shadow mb-4 mb-xl-0" id="view">
                <div class="card-header bg-transparent">
                    <h3 class="mb-0">
                        <div class="float-left">
                            <button class="btn btn-sm btn-outline-primary mb-3"
                                    v-on:click="$router.go(-1)">
                                <i class="ni ni-bold-left"></i> Back
                            </button>
                        </div>
                        <div class="float-right">
                            <router-link class="btn btn-sm btn-outline-warning mb-3"
                                         v-show="$store.state.auth.hasRole('ad-13')"
                                         :to="{name:'ad.users', params:{id:$parent.user.id, ops:'edit'}}">
                                Edit
                            </router-link>
                            <router-link class="btn btn-sm btn-outline-danger mb-3"
                                         v-show="$store.state.auth.hasRole('ad-13')"
                                         :to="{name:'ad.users', params:{id:$parent.user.id, ops:'delete'}}">
                                Delete
                            </router-link>
<!--//*pass                             <button class="btn btn-sm btn-outline-danger mb-3"-->
<!--                                    v-on:click="$modal.show('reset-password')"-->
<!--                                    v-show="$store.state.auth.hasRole('ad-13')">-->
<!--                                Reset Password-->
<!--                            </button>-->
<!--//*pass                             <modal :scrollable="true" name="reset-password" height="auto">-->
<!--                                <div class="modal-header">-->
<!--                                    <h3 class="modal-title" id="modal-title-create">-->
<!--                                        Reset User Password-->
<!--                                    </h3>-->
<!--                                </div>-->
<!--                                <div class="modal-body">-->
<!--                                    <form @submit="submitResetPassword">-->
<!--                                        <fake-form-input></fake-form-input>-->

<!--                                        <div class="form-group mb-3">-->
<!--                                            <div class="input-group">-->
<!--                                                <div class="input-group-prepend">-->
<!--                                                    <span class="input-group-text">New User Password:</span>-->
<!--                                                </div>-->
<!--                                                <input class="form-control" placeholder="New user password"-->
<!--                                                       type="password" v-model="form.password.new_password"-->
<!--                                                       required>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                        <div class="form-group mb-3">-->
<!--                                            <div class="input-group">-->
<!--                                                <div class="input-group-prepend">-->
<!--                                                    <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                                                </div>-->
<!--                                                <input class="form-control" placeholder="Password confirmation"-->
<!--                                                       type="password" v-model="form.password.password"-->
<!--                                                       required>-->
<!--                                            </div>-->
<!--                                        </div>-->

<!--                                        <div class="modal-footer">-->
<!--                                            <button type="submit" class="btn btn-primary">Save changes</button>-->
<!--                                            <button type="button" class="btn btn-danger"-->
<!--                                                    v-on:click="$modal.hide('reset-password')">Close</button>-->
<!--                                        </div>-->
<!--                                    </form>-->
<!--                                </div>-->
<!--                            </modal>-->
                        </div>
                    </h3>
                </div>
                <div class="table-responsive">
                    <table class="table align-items-center table-flush">
                        <tbody>
                        <tr>
                            <td class="text-center row">
                                <div class="col-12">
                                    <img class="img-thumbnail" :src="'/storage/profiles/'+$parent.user['img']">
                                    <button v-on:click="$modal.show('profile-upload', {user:$parent.user})"
                                            class="btn btn-sm btn-secondary btn-block">
                                        Upload
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <small>#</small>
                                {{$parent.user['num']}}
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <small>First Name</small>
                                {{$parent.user['first_name']}}
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <small>Middle Name</small>
                                {{$parent.user['middle_name']}}
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <small>Last Name</small>
                                {{$parent.user['last_name']}}
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <small>Email</small>
                                {{$parent.user['email']}}
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <small>Tel</small>
                                {{$parent.user['tel']}}
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <small>Address</small>
                                {{$parent.user['address']}}
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <small>Gender</small>
                                {{this.$root.gender($parent.user['gender'])}}
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <small>Date of Birth</small>
                                {{this.$root.format_date($parent.user['dob'])}}
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <small>Nationality</small>
                                {{this.$root.country($parent.user['nationality'])}}
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <EditProfile></EditProfile>
            <ViewRoles></ViewRoles>
            <UploadPhoto></UploadPhoto>
            <CamStudio></CamStudio>
        </div>
        <div class="col-md-6">
            <div class="card shadow mb-4 mb-xl-0">
                <h2 class="card-header bg-transparent">
                    Profiles
                    <div class="float-right">
                        <div class="btn-group dropleft">
                            <button type="button" class="btn btn-outline-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                New Profile
                            </button>
                            <div class="dropdown-menu">
                                <button class="dropdown-item" v-on:click="add_profile('ad')"
                                        v-show="$store.state.auth.hasRole('ad-14.ad')">
                                    Admin
                                </button>
                                <button class="dropdown-item" v-on:click="add_profile('ac')"
                                        v-show="$store.state.auth.hasRole('ad-14.ac')">
                                    Academic
                                </button>
                                <button class="dropdown-item" v-on:click="add_profile('s')"
                                        v-show="$store.state.auth.hasRole('ad-14.s')">
                                    Student
                                </button>
                            </div>
                        </div>
                    </div>
                </h2>
                <div class="card-body">
                    <div v-for="profile in $parent.user.profiles">
                        <button
                            v-show="$store.state.auth.hasRole('ad-14.'+profile.type)"
                            v-on:click="edit_profile(profile)"
                            class="btn btn-sm btn-outline-primary mb-3 float-right">
                            Edit {{$parent.profile_type(profile.type)}} profile
                        </button>
                        <h5 v-bind:class="{'text-danger':!profile.active}">
                            <span class="badge badge-danger" v-if="!profile.active">Deactivated<br></span>
                            <span class="badge badge-default" v-if="profile.id === $parent.user.profile_id">Currently Using<br></span>
                            <div class="text-capitalize">
                                <small>Type: </small>{{$parent.profile_type(profile.type)}}<br>
                            </div>
                            <div v-if="profile.set != null">
                                <small>Set: </small>{{profile.set.name}}
                            </div>
                            <div v-if="profile.department != null">
                                <small>Department: </small>
                                <router-link target="_blank" :to="{name:'ad.departments',params:{id:profile.department_id}}">
                                    {{profile.department.name}}
                                </router-link>
                            </div>
                            <div v-if="profile.major_department != null">
                                <small>Major: </small>
                                <router-link target="_blank" :to="{name:'ad.departments',params:{id:profile.major_department_id}}">
                                    {{profile.major_department.name}}
                                </router-link>
                            </div>
                            <div v-if="profile.minor_department != null">
                                <small>Minor: </small>
                                <router-link target="_blank" :to="{name:'ad.departments',params:{id:profile.minor_department_id}}">
                                    {{profile.minor_department.name}}
                                </router-link>
                            </div>
                            <div v-if="profile.completed_at != null">
                                <small>Completion Date: </small>
                                {{$root.format_date(profile.completed_at)}}
                            </div>
                            <div v-if="profile.enrolled_at != null">
                                <small>Enrolled Date: </small>
                                {{$root.format_date(profile.enrolled_at)}}
                            </div>
                            <div v-if="profile.group != null">
                                <small>Role Group: </small>
                                <button
                                    v-on:click="$modal.show('view-roles', {group:profile.group})"
                                    class="btn btn-sm btn-link">{{profile.group.name}}</button>
                            </div>
                        </h5>
                        <h5 class="mb-0 text-center" v-if="profile.type === 's'">
                            <router-link :to="{name:'ad.transcripts', params:{id:$parent.user.num}}"
                                         class="btn btn-link text-underline"
                                         v-show="$store.state.auth.hasRole('ad-15')">
                                Transcript
                            </router-link>
                            <router-link :to="{name:'ad.grades', params:{id:$parent.user.num}}"
                                         class="btn btn-link text-underline"
                                         v-show="$store.state.auth.hasRole('ad-23')">
                                Grades
                            </router-link>
                            <router-link :to="{name:'ad.finance', params:{id:$parent.user.num}}"
                                         class="btn btn-link text-underline"
                                         v-show="$store.state.auth.hasRole('ad-17')">
                                Finance
                            </router-link>
                        </h5>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import EditProfile from "./EditProfile";
    import ViewRoles from "../../modals/ViewRoles";
    import UploadPhoto from "./UploadPhoto";
    import CamStudio from "./CamStudio";
    export default {
        name: "ViewUsers",
        components: {CamStudio, UploadPhoto, ViewRoles, EditProfile},
        data() {
            return {
                form: {
                    ops: null,
                    profile: {},
                    password: {},
                }
            }
        },
        methods: {
            submitResetPassword: function (e) {
                e.preventDefault();

                this.form.password.user_id = this.$parent.user.id;

                axios.post('/admin/users/reset/password', this.form.password)
                    .then(res => {
                        this.$root.post_success(res.data.success);
                        this.$modal.hide('reset-password');
                    });
            },
            edit_profile: function (profile) {

                axios.get('/admin/users/profile/'+profile.id)
                .then(res => {
                    this.$modal.show('edit-profile', {
                        profile: res.data.profile,
                        form: {
                            ops: 'e',
                        }
                    });
                });
            },
            add_profile: function(type) {
                this.$modal.show('edit-profile', {
                    profile: {
                        type: type,
                        active: 1,
                        user_id: this.$parent.user.id,
                    },
                    form: {
                        ops: 'c',
                    }
                });
            },
        },
    }
</script>

<style scoped>

</style>
