<template>
        <div class="col-md-12">
            <div class="card shadow mb-4 mb-xl-0">
                <div class="card-header bg-transparent">
                    <h3 class="mb-0">
                        Semester Academic Terms
                        <div class="float-right">
                            <button
                                v-show="$store.state.auth.hasRole('ad-1')"
                                v-on:click="$parent.$router.push({name:'ad.terms',params:{id:'create-semester'}})"
                                class="btn btn-sm btn-outline-primary mb-3" data-toggle="modal" data-target="#modal-term">
                                Add Semester
                            </button>
                            <button
                                v-show="$store.state.auth.hasRole('ad-2')"
                                v-on:click="$parent.$router.push({name:'ad.terms',params:{id:'create-med-year'}})"
                                class="btn btn-sm btn-outline-primary mb-3" data-toggle="modal" data-target="#modal-term">
                                Add Medical Year
                            </button>
                        </div>
                    </h3>
                    <p>
                        List of academics terms registered and not ended yet under the your department.
                    </p>
                </div>
                <form class="col-md-12" @submit="$parent.search_terms">
                    <fake-form-input></fake-form-input>
                    <div class="form-group">
                        <div class="input-group mb-4">
                            <input class="form-control" v-model="$parent.filter.search" placeholder="Search by academic term by name..." type="text">
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
                            <th scope="col">Name</th>
                            <th scope="col">Dates</th>
                            <th scope="col">Department</th>
                            <th scope="col">Set</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="term in terms.data">
                            <td>
                                <button
                                    v-on:click="$parent.$router.push({name:'ad.terms', params:{id:term.id}})"
                                    class="btn btn-primary btn-sm">
                                    <i class="ni ni-button-play"></i>
                                </button>
                            </td>
                            <th scope="row">{{term.name}}</th>
                            <td>
                                <small>
                                    {{$root.format_date(term.starting_at)}}
                                    <br>
                                    {{$root.format_date(term.ending_at)}}
                                </small>
                            </td>
                            <td>{{term.department.name}}</td>
                            <td>
                                <div v-if="term.set">
                                    {{term.set.name}}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                    <laravel-vue-pagination :limit="5" :data="terms" align="center" @pagination-change-page="$parent.get_terms"></laravel-vue-pagination>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "IndexTerms",
        props: ['terms'],
        mounted() {

        },
        methods: {
        },
    }
</script>

<style scoped>
</style>
