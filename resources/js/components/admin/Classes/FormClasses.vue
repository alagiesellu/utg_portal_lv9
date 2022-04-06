<template>
    <div class="card shadow mb-4 mb-xl-0 col-md-10">
        <div class="card-header bg-transparent">
            <h2 class="mb-0">
                {{$parent.form.title}}
                <p>{{$parent.term.name}}</p>
            </h2>
        </div>
        <div class="card-body">
            <form @submit="submitForm">
                                        <fake-form-input></fake-form-input>
                <div class="row">
                    <div class="form-group col-md-4">
                        <small>Search courses by code and name</small>
                        <div class="input-group mb-4">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                            </div>
                            <input v-on:input="searchCourses" v-model="search.course"
                                   class="form-control" placeholder="...." type="text">
                        </div>
                    </div>
                    <div class="form-group mb-3 col-md-8" v-if="$parent.form.input.course_id !== undefined">
                        <small>Course found</small>
                        <div class="input-group" v-show="courses.length > 0">
                            <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Course:
                                        </span>
                            </div>
                            <select class="form-control" v-model="$parent.form.input.course_id" required>
                                <option
                                    v-for="course in courses"
                                    :value="course.id">
                                    {{course.code +' - '+ course.name}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group mb-3 col-12" v-if="major_term_classes.length">
                        <small>Major Course</small>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Course:
                                        </span>
                            </div>
                            <select class="form-control" v-model="$parent.form.input.major_course_id">
                                <option value="">** None</option>
                                <option
                                    v-for="term_class in major_term_classes"
                                    :value="term_class.id">
                                    {{term_class.course.name}}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div v-if="this.$parent.term.external_exam_percentage === null">
                    <div class="row">
                        <div class="form-group col-md-4">
                            <small>Search venue by room number</small>
                            <div class="input-group mb-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                                </div>
                                <input v-on:input="searchVenue" v-model="search.venue"
                                       class="form-control" placeholder="..." type="text">
                            </div>
                        </div>
                        <div class="form-group mb-3 col-md-8" v-if="$parent.form.input.venue_id !== undefined">
                            <small>Venues found</small>
                            <div class="input-group" v-show="venues.length > 0">
                                <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Venue:
                                        </span>
                                </div>
                                <select class="form-control" v-model="$parent.form.input.venue_id" required>
                                    <option
                                        v-for="venue in venues"
                                        :value="venue.id">
                                        {{venue.name}}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row" v-for="day in Object.keys(times)">
                        <div class="form-group mb-3 col-md-6">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Day:
                                        </span>
                                </div>
                                <select class="form-control" v-model="times[day].day" required>
                                    <option
                                        v-for="w_day in week_days"
                                        :value="w_day">
                                        {{w_day}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <input type="time" placeholder="Time" v-model="times[day].time" class="form-control" required>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button v-on:click="removeDayInput(day)"
                                    class="btn btn-outline-danger btn-block">
                                <i class="ni ni-fat-remove"></i>
                            </button>
                        </div>
                    </div>
                    <button class="btn btn-default" v-on:click="addDayInput">
                        <i class="ni ni-fat-add"></i> Add
                    </button>
                    <hr>
                    <div class="row">
                        <div class="col-md-6 form-group mb-3" v-if="$parent.form.input.size !== undefined && $parent.form.input._size">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Class Size:</span>
                                </div>
                                <input class="form-control"
                                       type="number" :min="window.options.min_class_size" :max="window.options.max_class_size" v-model="$parent.form.input.size"
                                       required>
                            </div>
                        </div>
                        <div class="col-md-6 form-group mb-3" v-if="$parent.form.input.fee !== undefined">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Fee:</span>
                                </div>
                                <input class="form-control"
                                       type="number" v-model="$parent.form.input.fee"
                                       required>
                            </div>
                        </div>
                    </div>
                </div>
<!--//*pass                 <div class="form-group mb-3">-->
<!--                    <div class="input-group">-->
<!--                        <div class="input-group-prepend">-->
<!--                                        <span class="input-group-text">-->
<!--                                            Password confirmation :-->
<!--                                        </span>-->
<!--                        </div>-->
<!--                        <input class="form-control" placeholder="........."-->
<!--                               type="password" v-model="$parent.form.input.password"-->
<!--                               required>-->
<!--                    </div>-->
<!--                </div>-->

                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Save changes</button>
                    <button type="button" v-on:click="$router.go(-1)" class="btn btn-link ml-auto">
                        Back
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import FakeFormInputs from "../../layouts/FakeFormInputs";
    export default {
        components: {FakeFormInputs},
        name: "FormClasses",
        data() {
            return {
                window: window,
                courses: {},
                major_term_classes: [],
                venues: {},
                errors: null,
                search: {
                    course: '',
                    venue: '',
                },
                week_days: window.week_days,
                times: this.$parent.form.input.times,
            }
        },
        mounted() {
            this.loadMajorCourses(this.$route.params.term);
        },
        methods: {
            removeDayInput: function(index) {
                this.times.splice(index, 1);
            },
            addDayInput: function() {
                this.times.push({day: '', time: ''});
            },
            submitForm: function (e) {
                e.preventDefault();

                if (this.$parent.form.type === 'c') {
                axios.post('/admin/classes/store', this.$parent.form.input)
                        .then((res) => {
                            this.$root.post_success(res.data.success);
                            this.$router.push({name:'ad.term.classes', params:{term:this.$parent.form.input.term_id}});
                    })
                }
            },
            loadMajorCourses: function (term) {
                axios.get('/admin/get/major_courses/term='+term)
                    .then((res) => {
                        this.major_term_classes = res.data.term_classes;
                    });
            },
            searchCourses: function () {
                axios.post('/admin/search/courses', {search:this.search.course})
                    .then((res) => {
                        this.courses = res.data.courses;
                    });
            },
            searchVenue: function () {
                axios.post('/admin/search/venues', {search:this.search.venue})
                    .then((res) => {
                        this.venues = res.data.venues;
                    })
            },
        },
    }
</script>

<style scoped>

</style>
