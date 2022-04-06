<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0">
            <div class="card-header bg-transparent">
                <h3 class="mb-0">
                    <div class="float-right">
                        <router-link
                            v-show="$store.state.auth.hasRole('ad-10')"
                            :to="{name:'ad.venues', params:{ops:'create'}}"
                            class="btn btn-outline-primary btn-sm">
                            Add New venue
                        </router-link>
                    </div>
                </h3>
            </div>
            <form class="col-md-12">
                <div class="form-group">
                    <div class="input-group mb-4">
                        <input class="form-control" v-model="$parent.filter.search" placeholder="Search by course code or name..." type="text">
                        <div class="input-group-append">
                            <button type="button" v-on:click="$parent.get_venues(1)" class="btn btn-primary">
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
                        <th scope="col">Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="venue in $parent.venues.data">
                        <td>
                            <router-link
                                :to="{name:'ad.venues', params:{id:venue.id}}"
                                class="btn btn-primary btn-sm">
                                <i class="ni ni-bold-right"></i>
                            </router-link>
                        </td>
                        <th scope="row">{{venue.name}}</th>
                        <th scope="row">{{venue.type}}</th>
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <laravel-vue-pagination :limit="5" :data="$parent.venues" align="center" @pagination-change-page="$parent.get_venues"></laravel-vue-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexVenues"
    }
</script>

<style scoped>

</style>
