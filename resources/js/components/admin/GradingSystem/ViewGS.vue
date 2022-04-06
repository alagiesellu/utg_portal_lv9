<template>
    <div class="card shadow mb-4 mb-xl-0">
        <div class="card-header bg-transparent">
            <h3 class="mb-0">
                <button class="btn btn-sm btn-outline-primary mb-3"
                        v-on:click="$router.go(-1)">
                    <i class="ni ni-bold-left"></i> Back
                </button>
                <div class="float-right">
                    <router-link :to="{name:'ad.grading-systems', params:{id:$parent.grading_system.id, ops:'edit'}}"
                                 v-show="$store.state.auth.hasRole('ad-9')"
                                 class="btn btn-sm btn-outline-warning mb-3">
                        Edit
                    </router-link>
                    <router-link :to="{name:'ad.grading-systems', params:{id:$parent.grading_system.id, ops:'delete'}}"
                                 v-show="$store.state.auth.hasRole('ad-9')"
                                 class="btn btn-sm btn-outline-danger mb-3">
                        Delete
                    </router-link>
                </div>
            </h3>
        </div>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                <tr>
                    <td>Name</td>
                    <th>{{$parent.grading_system.name}}</th>
                </tr>
                <tr>
                    <td>Status</td>
                    <th>
                        <span v-if="$parent.grading_system.active">Activated</span>
                        <span v-else>Deactivated</span>
                    </th>
                </tr>
                <tr>
                    <td>Grades</td>
                    <th v-html="$root.view_grades($parent.grading_system.grades)">
                    </th>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ViewGS"
    }
</script>

<style scoped>

</style>
