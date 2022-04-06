<template>
    <div class="row">
        <div v-if="$parent.terms.total === 0" class="card bg-default col-12">
            <div class="card-header bg-white border-0">
                <h1>No Running Academic Term</h1>
            </div>
        </div>
        <div v-for="term in $parent.terms.data" class="card bg-secondary shadow col-12">
            <div class="card-header bg-white border-0">
                <h1>
                    <button
                        v-on:click="$parent.$router.push({name:'s.timetables', params:{term:term.id}})"
                        class="btn btn-primary btn-sm">
                        <i class="ni ni-button-play"></i>
                    </button>
                    {{term.name}}
                </h1>
                <h3 class="blockquote-footer">
                    <small>Start Date:</small> {{$root.format_date(term.starting_at)}}
                </h3>
                <h3 class="blockquote-footer">
                    <small>End Date:</small> {{$root.format_date(term.ending_at)}}
                </h3>
                <h3 class="blockquote-footer" v-if="term.registration_deadline">
                    <small>Registration Deadline:</small> {{$root.format_date(term.registration_deadline)}}
                </h3>
                <h3 class="blockquote-footer" v-if="term.unregistration_deadline">
                    <small>Un-Registration Deadline:</small> {{$root.format_date(term.unregistration_deadline)}}
                </h3>
            </div>
        </div>
        <div class="card col-12 align-items-center">
            <laravel-vue-pagination :limit="5" :data="$parent.terms" align="center" @pagination-change-page="$parent.get_terms"></laravel-vue-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexClasses",
        data() {
            return {
            }
        },
        methods: {
        },
    }
</script>

<style scoped>
</style>
