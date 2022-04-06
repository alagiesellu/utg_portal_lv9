<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0">
            <div class="card-header bg-transparent">
                <h3 class="mb-0">
                    <div class="float-left">
                        <router-link :to="{name:'ad.sets'}"
                                     class="btn btn-outline-primary btn-sm">
                            <i class="ni ni-bold-left"></i> Back
                        </router-link>
                    </div>
                    <div class="float-right">
                        <router-link :to="{name:'ad.sets', params:{id:$parent.set.id,ops:'edit'}}"
                                     v-show="$store.state.auth.hasRole('ad-8')"
                                     class="btn btn-outline-warning btn-sm">
                            Edit
                        </router-link>
                        <router-link :to="{name:'ad.sets', params:{id:$parent.set.id,ops:'delete'}}"
                                     v-show="$store.state.auth.hasRole('ad-8')"
                                     class="btn btn-outline-danger btn-sm">
                            Delete
                        </router-link>
                    </div>
                </h3>
            </div>
            <div class="table-responsive">
                <table class="table align-items-center table-flush">
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <th>{{$parent.set['name']}}</th>
                    </tr>
                    <tr>
                        <td>Degree</td>
                        <th>{{$parent.set['degree']}}</th>
                    </tr>
                    <tr>
                        <td>Start Date</td>
                        <th>{{$root.format_date($parent.set['start_date'])}}</th>
                    </tr>
                    <tr>
                        <td>Expected Years</td>
                        <th>{{$parent.set['expected_years']}}</th>
                    </tr>
                    <tr>
                        <td>Department</td>
                        <th>{{$parent.set['department'].name}}</th>
                    </tr>
                    <tr>
                        <td>School/Faculty</td>
                        <th>{{$parent.set['school_department'].name}}</th>
                    </tr>
                    <tr>
                        <td>Grading System</td>
                        <th>
                            {{$parent.set['grading_system'].name}}
                            <button class="btn btn-sm btn-primary" v-on:click="$modal.show('view_grades')">
                                Grades
                            </button>
                            <modal :scrollable="true" name="view_grades" height="auto">
                                <div class="modal-content">
                                    <div class="modal-body" v-html="$root.view_grades($parent.set['grading_system'].grades)">
                                    </div>
                                </div>
                            </modal>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="table-responsive" v-if="$parent.profiles">
                <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="profile in $parent.profiles.data">
                        <td>
                            <router-link :to="{name:'ad.users', params:{id:profile.user_id}}"
                                         target="_blank"
                                         class="btn btn-primary btn-sm">
                                <i class="ni ni-bold-right"></i>
                            </router-link>
                        </td>
                        <th>{{profile.user.num}}</th>
                        <th>{{$root.full_name(profile.user)}}</th>
                        <th>{{profile.user.email}}</th>
                    </tr>
                    </tbody>
                </table>
                <laravel-vue-pagination :limit="5" :data="$parent.profiles" align="center" @pagination-change-page="$parent.get_set_profiles"></laravel-vue-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ViewSets"
    }
</script>

<style scoped>

</style>
