<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0">
            <div class="card-header bg-transparent">
                <h3 class="mb-0">
                    Approve Grades
                </h3>
            </div>
            <div class="card-body">
                <form v-on:submit="$parent.submitTerm" class="col-md-12">
                    <div class="form-group">
                        <div class="form-group mb-3">
                            <div class="input-group" v-if="$parent.terms">
                                <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Academic Terms :
                                        </span>
                                </div>
                                <v-select
                                    @input="$parent.termSelected"
                                    class="form-control" :options="$parent.terms"
                                    :reduce="term => term.id" label="name"
                                    v-model="$parent.input.term.id">
                                    <template #search="{attributes, events}">
                                        <input
                                            class="vs__search"
                                            v-bind="attributes"
                                            v-on="events"/>
                                    </template>
                                </v-select>
                            </div>
                        </div>
                    </div>
                </form>
                <table class="table" v-if="$parent.term_classes">
                    <thead>
                    <tr>
                        <th></th>
                        <th>
                            Course of
                            <h3 class="text-underline">{{ $parent.term.name }}</h3>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="term_class in $parent.term_classes">
                        <td>
                            <router-link class="btn btn-sm btn-primary"
                            :to="{name:'ad.grades.approvals', params:{
                                id:$parent.term.id,
                                tc:term_class.id
                            }}">
                                <i class="ni ni-bold-right"></i>
                            </router-link>
                        </td>
                        <td>
                            <span v-if="term_class.course_id">{{term_class.course.name}}</span>
                            <span v-else>External Exams</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexGrades",
    }
</script>

<style scoped>

</style>
