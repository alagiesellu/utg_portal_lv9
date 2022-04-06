<template>
    <div class="card shadow mb-4 mb-xl-0">
        <div class="card-header bg-transparent">
            <h3 class="mb-0">
                <div class="float-right">
                    <router-link :to="{name:'ad.grading-systems', params:{id:'create'}}"
                                 v-show="$store.state.auth.hasRole('ad-9')"
                        class="btn btn-sm btn-outline-primary mb-3">
                        Add New Grading System
                    </router-link>
                </div>
            </h3>
        </div>
        <div class="table-responsive">
            <table class="table align-items-center table-flush">
                <thead class="thead-light">
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Grading Systems</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="gs in $parent.grading_systems.data">
                    <td>
                        <router-link :to="{name:'ad.grading-systems', params:{id:gs.id}}"
                                     class="btn btn-sm btn-primary">
                            <i class="ni ni-bold-right"></i>
                        </router-link>
                    </td>
                    <td>{{gs.name}}</td>
                    <td>
                        <span v-if="gs.active">Activated</span>
                        <span v-else>Deactivated</span>
                    </td>
                </tr>
                </tbody>
            </table>
            <laravel-vue-pagination :limit="5" :data="$parent.grading_systems" align="center" @pagination-change-page="$parent.get_index"></laravel-vue-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexGS"
    }
</script>

<style scoped>

</style>
