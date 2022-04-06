<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0">
            <div class="card-header bg-transparent">
                <h3 class="mb-0">
                    Search Student Profile
                </h3>
            </div>
            <form v-on:submit="$parent.filter_users" class="card-body col-md-12">
                <div class="form-group">
                    <div class="input-group mb-4">
                        <input class="form-control" v-model="$parent.filter.search"
                               placeholder="Search by MAT number" type="number">
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-primary">
                                <i class="ni ni-zoom-split-in"></i>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="table-responsive">
                <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Profiles</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="user in $parent.users.data">
                        <td>
                            <router-link :to="{name:'ac.students', params:{id:user.num}}"
                                         class="btn btn-primary btn-sm">
                                <i class="ni ni-bold-right"></i>
                            </router-link>
                        </td>
                        <th>{{user.num}}</th>
                        <th>{{$root.full_name(user)}}</th>
                        <th>{{user.email}}</th>
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <laravel-vue-pagination :limit="5" :data="$parent.users" align="center" @pagination-change-page="$parent.get_users"></laravel-vue-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexUsers",
    }
</script>

<style scoped>

</style>
