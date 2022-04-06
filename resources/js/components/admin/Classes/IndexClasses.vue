<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0">
            <div class="card-header bg-transparent">
                <h3 class="mb-0">
                    Active Academic Terms
                </h3>
            </div>
            <div class="table-responsive">
                <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Starting</th>
                        <th scope="col">Ending</th>
                        <th scope="col">Department</th>
                        <th scope="col">Size</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="term in terms.data">
                        <td>
                            <button
                                v-on:click="$parent.$router.push({name:'ad.classes', params:{term:term.id}})"
                                class="btn btn-primary btn-sm">
                                <i class="ni ni-button-play"></i>
                            </button>
                        </td>
                        <th scope="row">{{term.name}}</th>
                        <td>{{$root.format_date(term.starting_at)}}</td>
                        <td>{{$root.format_date(term.ending_at)}}</td>
                        <td>{{term.department.name}}</td>
                        <td>{{term.size}}</td>
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <laravel-vue-pagination :limit="5" :data="terms" align="center" @pagination-change-page="get_terms"></laravel-vue-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexClasses",
        data() {
            return {
                terms: {},
            }
        },
        created () {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {

            fetchData: function() {
                this.get_terms();
            },
            get_terms: function(page = 1)
            {
                axios.get('/admin/get/active-terms?page=' + page)
                    .then(res => {
                        this.terms = res.data.terms;
                    });
            },
        },
    }
</script>

<style scoped>
</style>
