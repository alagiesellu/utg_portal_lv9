<template>
    <div class="row">
        <div class="col-xl-12 order-xl-1">
            <div class="card bg-secondary shadow">
                <div class="card-header bg-white border-0">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h3 class="mb-0">Registered Classes</h3>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Course</th>
                                <th>Venue</th>
                                <th>Times</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="class_reg in class_registrations.data">
                                <td>
                                    <router-link class="btn btn-sm btn-primary" :to="{name:'s.classes', params:{id:class_reg.term_class_id}}">
                                        <i class="ni ni-button-play"></i>
                                    </router-link>
                                </td>
                                <td>{{class_reg.term_class.course.name}}</td>
                                <td>{{class_reg.term_class.venue.name}}</td>
                                <td>
                                    <li v-for="time in class_reg.term_class.times">
                                        {{time.day}}, {{$root.moment(time.time)}}
                                    </li>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <laravel-vue-pagination :limit="5" :data="$parent.class_registrations" align="center" @pagination-change-page="$parent.get_class_registrations"></laravel-vue-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexClasses",
        props: ['class_registrations'],
        data() {
            return {
                terms: {},
            }
        },
        methods: {
        },
    }
</script>

<style scoped>
</style>
