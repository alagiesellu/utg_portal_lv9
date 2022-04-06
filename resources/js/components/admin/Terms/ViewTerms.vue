<template>
        <div class="col-md-12">
            <div class="card shadow mb-4 mb-xl-0" id="view">
                <div class="card-header bg-transparent">
                    <h3 class="mb-0">
                        <div class="float-left">
                            <button
                                v-on:click="$parent.$router.push({name:'ad.terms'})"
                            class="btn btn-outline-primary btn-sm">
                            <i class="ni ni-bold-left"></i> Back
                            </button>
                        </div>
                        <div class="float-right">
                            <button
                                v-show="$store.state.auth.hasRole('ad-1') || $store.state.auth.hasRole('ad-2')"
                                v-on:click="$parent.editTerm"
                                class="btn btn-sm btn-outline-warning mb-3" data-toggle="modal" data-target="#modal-term">
                                Edit
                            </button>
                            <button
                                v-show="$store.state.auth.hasRole('ad-1') || $store.state.auth.hasRole('ad-2')"
                                v-on:click="$parent.deleteTerm"
                                class="btn btn-sm btn-outline-danger mb-3" data-toggle="modal" data-target="#modal-term">
                                Delete
                            </button>
                        </div>
                    </h3>
                </div>
                <div class="table-responsive">
                    <table class="table align-items-center table-flush">
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <th>{{term['name']}}</th>
                        </tr>
                        <tr>
                            <td>Starting Date</td>
                            <th>{{$root.format_date(term['starting_at'])}}</th>
                        </tr>
                        <tr>
                            <td>Ending Date</td>
                            <th>{{$root.format_date(term['ending_at'])}}</th>
                        </tr>
                        <tr v-if="term['registration_deadline']">
                            <td>Registration Deadline</td>
                            <th>{{$root.format_date(term['registration_deadline'])}}</th>
                        </tr>
                        <tr v-if="term['unregistration_deadline']">
                            <td>Un-Registration Deadline</td>
                            <th>{{$root.format_date(term['unregistration_deadline'])}}</th>
                        </tr>
                        <tr>
                            <td>Department</td>
                            <th>{{term['department']['name']}}</th>
                        </tr>
                        <tr v-if="term['set']">
                            <td>Set</td>
                            <th>{{term['set']['name']}}</th>
                        </tr>
                        <tr v-if="term['external_exam_percentage']">
                            <td>Professional Exams Percentage</td>
                            <th>
                                {{term['external_exam_percentage']}}%
                                <router-link
                                    v-show="$store.state.auth.hasRole('ad-3')"
                                    :to="{name:'ad.terms',params:{id:term.id,ops:'external-exams'}}"
                                class="btn btn-sm btn-link">
                                    External Exam Grades
                                </router-link>
                            </th>
                        </tr>
                        <tr>
                            <td></td>
                            <th>
                                <router-link
                                    v-show="$store.state.auth.hasRole('ad-5')"
                                    :to="{name:'ad.term.classes',params:{term:term['id']}}">
                                    View Classes
                                </router-link>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <TermRotations v-if="term['external_exam_percentage']" v-bind:term="term"></TermRotations>
        </div>
</template>

<script>
    import TermRotations from "./TermRotations";
    export default {
        components: {
            TermRotations
        },
        name: "ViewTerms",
        props: ['term'],
        mounted() {

        },
        methods: {
        },
    }
</script>

<style scoped>
</style>
