<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0">
            <div class="card-header bg-transparent">
                <h3 class="mb-0">
                    <div class="float-right">
                        <router-link :to="{name:'ad.sets', params:{ops:'create'}}"
                                     v-show="$store.state.auth.hasRole('ad-8')"
                            class="btn btn-sm btn-outline-primary mb-3">
                            Add New Set
                        </router-link>
                    </div>
                </h3>
            </div>
            <form class="col-md-12">
                <div class="form-group">
                    <div class="input-group mb-4">
                        <input class="form-control" v-model="$parent.filter.search" placeholder="Search by course code or name..." type="text">
                        <div class="input-group-append">
                            <button type="button" v-on:click="$parent.get_sets(1)" class="btn btn-primary">
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
                        <th scope="col">Starting Date</th>
                        <th scope="col">Expected Years</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="set in $parent.sets.data">
                        <td>
                            <router-link :to="{name:'ad.sets', params:{id:set.id}}"
                                         class="btn btn-primary btn-sm">
                                <i class="ni ni-bold-right"></i>
                            </router-link>
                        </td>
                        <th scope="row">{{set.name}}</th>
                        <th scope="row">{{$root.format_date(set.start_date)}}</th>
                        <th scope="row">{{set.expected_years}}</th>
                    </tr>
                    </tbody>
                </table>
                <laravel-vue-pagination :limit="5" :data="$parent.sets" align="center" @pagination-change-page="$parent.get_sets"></laravel-vue-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexSets"
    }
</script>

<style scoped>

</style>
