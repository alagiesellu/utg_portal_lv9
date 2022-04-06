<script>
    export default {
        name: "profile",
        data() {
            return {
                user: [],
                roles: window.roles,
            }
        },
        mounted() {
            this.fectchUserProfile();
            this.$store.state.page = 'profile';
        },
        methods: {

            fectchUserProfile: function()
            {
                axios.get('/admin/fectch-user-profile')
                    .then(res => {
                        this.user = res.data.user;
                    });
            },

            update: function()
            {

            },

            switch: function()
            {

            },

            gender: function (gender)
            {
                if (gender == 'm')
                    return 'Male';
                else
                    return 'Female';
            }
        },
    }
</script>

<template>

    <div class="row">

        <div class="col-xl-8 order-xl-1">
            <div class="card bg-secondary shadow">
                <div class="card-header bg-white border-0">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h3 class="mb-0">My account</h3>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <img :src="'/'+this.$store.state.auth.img" class="img-thumbnail">
                        </div>
                        <div class="col-md-12" v-if="user == null">
                            <table class="table align-items-center table-flush">
                                <tbody>
                                <tr><td>#</td><th><h2>{{this.user.num}}</h2></th></tr>
                                <tr><td>First Name</td><th>{{this.user.first_name}}</th></tr>
                                <tr><td>Middle Name</td><th>{{this.user.middle_name}}</th></tr>
                                <tr><td>Last Name</td><th>{{this.user.last_name}}</th></tr>
                                <tr><td>Email</td><th>{{this.user.email}}</th></tr>
                                <tr><td>Telephone Number</td><th>{{this.user.tel}}</th></tr>
                                <tr><td>Address</td><th>{{this.user.address}}</th></tr>
                                <tr><td>Gender</td><th>{{this.gender(this.user.gender)}}</th></tr>
                                <tr><td>Date Of Birth</td><th>{{this.user.dob}}</th></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr>

                </div>
            </div>
        </div>

        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
            <div class="card shadow">
                <div class="card-header bg-white border-0">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h3 class="mb-0">Profile</h3>
                        </div>
                        <div class="col-4 text-right">
                            <a href="#" class="btn btn-sm btn-outline-danger">Switch</a>
                        </div>
                    </div>
                </div>
                <div class="card-body pt-0 pt-md-4">
                    <div class="text-center" v-if="this.user.profile != null">
                        <div>
                            <small class="description">Department</small>
                            <h4 class="heading">{{this.user.profile.department.name}}</h4>
                        </div>
                        <div v-if="this.user.profile.type == 's'">
                            <small class="description">Admission Set</small>
                            <h4 class="heading">{{this.user.profile.set.name}}</h4>
                        </div>
                        <div v-if="this.user.profile.group != null">
                            <small class="description">Group Role</small>
                            <h4 class="heading">{{this.user.profile.group.name}}</h4>
                        </div>
                        <hr class="my-4">
                        <div v-for="role in this.user.profile.roles">
                            <i class="ni ni-fat-delete small text-info"></i> {{roles[role]}} <i class="ni ni-fat-delete small text-info"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<style scoped>

</style>
