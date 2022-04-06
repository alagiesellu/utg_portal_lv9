<template>
    <div>
        <div class="header bg-gradient-dark pb-8 pt-5 pt-md-8">
        </div>
        <div class="container-fluid mt--7">
            <div class="row" v-if="user">
                <div class="col-md-12">
                    <div class="card shadow">
                        <div class="card-header">
                            Public Profile
                        </div>
                        <div class="card-body row">
                            <div class="col-md-4">
                                <img class="img-thumbnail" :src="'/storage/profiles/'+user['img']">
                            </div>
                            <div class="col-md-8">
                                <h4 v-if="user.profile_type === 's'">
                                    <small>#</small>
                                    {{user.num}}
                                </h4>
                                <h1>
                                    {{$root.full_name(user)}}
                                </h1>
                                <hr>
                                <h4>
                                    <i class="ni ni-email-83"></i>
                                    {{user.email}}
                                    <br>
                                    <i class="ni ni-mobile-button"></i>
                                    +{{user.tel}}
                                    <br>
                                    <i class="ni ni-map-big"></i>
                                    {{user.address}}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {
                user: null,
            }
        },
        created () {
            this.$store.state.page = "Profiles";
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData: function () {
                axios.get('/get/user-profile/'+this.$route.params.id)
                    .then((res) => {
                        this.user = res.data.user;
                    });
            },
        },
    }
</script>

<style scoped>

</style>
