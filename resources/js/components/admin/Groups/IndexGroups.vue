<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0">
            <div class="card-header bg-transparent">
                <h3 class="mb-0">
                    <div class="float-right">
                        <router-link :to="{name:'ad.groups',params:{ops:'create'}}"
                                     v-show="$store.state.auth.hasRole('ad-7')"
                            class="btn btn-sm btn-outline-primary mb-3" data-toggle="modal" data-target="#modal-term">
                            Add New group
                        </router-link>
                    </div>
                </h3>
            </div>
            <form class="col-md-12">
                <div class="form-group">
                    <div class="input-group mb-4">
                        <input class="form-control" v-model="$parent.filter.search" placeholder="Search by course code or name..." type="text">
                        <div class="input-group-append">
                            <button type="button" v-on:click="$parent.get_groups(1)" class="btn btn-primary">
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
                        <th scope="col">Name</th>
                        <th scope="col">Department</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="group in $parent.groups.data">
                        <td>
                            <router-link :to="{name:'ad.groups',params:{id:group.id}}"
                                         class="btn btn-primary btn-sm">
                                <i class="ni ni-bold-right"></i>
                            </router-link>
                        </td>
                        <th scope="row">{{group.name}}</th>
                        <th scope="row">{{group.department.name}}</th>
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <laravel-vue-pagination :limit="5" :data="$parent.groups" align="center" @pagination-change-page="$parent.get_groups"></laravel-vue-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexGroups"
    }
</script>

<style scoped>

</style>
