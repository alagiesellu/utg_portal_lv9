<template>

    <div class="container-fluid">
        <div class="">
            <div class="row">
                <div class="col-12" v-show="classes.total">
                    <div class="card card-stats mb-4 mb-xl-0">
                        <div class="card-header h3">
                            <i class="ni ni-bag-17"></i> Current Classes
                        </div>
                        <div class="card-body row">
                            <div class="col-md-6" v-for="_class in classes.data">
                                <h5 class="card-title text-uppercase text-muted mb-0">
                                    {{_class.term_class.course.code}}
                                </h5>
                                <router-link :to="{name:'ac.classes.show',params:{id:_class.term_class.id}}" class="h4 text-underline">
                                    {{_class.term_class.course.name}}
                                </router-link>
                                <p class="text-muted text-sm float-right">
                                <span class="text-nowrap">
                                    <li v-for="time in _class.term_class.times">
                                        {{time.day}}, {{$root.moment(time.time)}}
                                    </li>
                                </span>
                                </p>
                                <hr>
                            </div>
                            <div class="float-right" v-if="classes.next_page_url">
                                <router-link :to="{name:'ac.classes'}"
                                             class="btn btn-icon btn-3 btn-secap    dary">
                                    <span class="btn-inner--icon"><i class="ni ni-bag-17"></i></span>
                                    <span class="btn-inner--text">more classes</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                classes: {},
            }
        },
        mounted() {
            this.$store.state.page = 'Academic Portal';
            this.get_current_classes();
        },
        methods: {
            get_current_classes: function () {
                axios.get('/academic/classes')
                    .then((res) => {
                        this.classes = res.data.lecturer_class_registrations;
                    })
            },
        },
    }
</script>

<style scoped>

</style>
