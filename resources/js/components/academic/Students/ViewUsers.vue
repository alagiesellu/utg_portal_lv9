<template>
    <div>
        <div class="col-md-8">
            <div class="card shadow">
                <div class="card-header bg-transparent">
                    <h3 class="mb-0">
                        <div class="float-left">
                            <router-link :to="{name:'ac.students'}"
                                         class="btn btn-sm btn-outline-primary mb-3">
                                <i class="ni ni-bold-left"></i> Back
                            </router-link>
                        </div>
                    </h3>
                </div>
                <div class="table-responsive">
                    <table class="table align-items-center table-flush">
                        <tbody>
                        <tr>
                            <td>#</td>
                            <th>
                                {{$parent.user.num}}
                            </th>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <th>
                                {{$parent.user.first_name}}
                            </th>
                        </tr>
                        <tr>
                            <td>Middle Name</td>
                            <th>
                                {{$parent.user.middle_name}}
                            </th>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <th>
                                {{$parent.user.last_name}}
                            </th>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <th>
                                {{$parent.user.email}}
                            </th>
                        </tr>
                        <tr>
                            <td>Tel</td>
                            <th>
                                {{$parent.user.tel}}
                            </th>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <th>
                                {{$parent.user.address}}
                            </th>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <th>
                                {{this.$root.gender($parent.user.gender)}}
                            </th>
                        </tr>
                        <tr>
                            <td>Date of Birth</td>
                            <th>
                                {{this.$root.format_date($parent.user.dob)}}
                            </th>
                        </tr>
                        <tr>
                            <td>Nationality</td>
                            <th>
                                {{this.$root.country($parent.user.nationality)}}
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card shadow">
                <div class="card-body">
                    <img class="img-thumbnail" :src="'/storage/profiles/'+$parent.user['img']">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ViewUsers",
        methods: {
        },
    }
</script>

<style scoped>

</style>
