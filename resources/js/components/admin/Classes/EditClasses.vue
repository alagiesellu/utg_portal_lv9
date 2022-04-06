<template>
    <div class="card shadow mb-4 mb-xl-0 col-md-10">
        <div class="card-header bg-transparent">
            <div class="float-right">
                <router-link
                    class="btn btn-outline-primary btn-sm"
                    :to="{name:'ad.show.classes', params:{term:$parent.form.input.term_class.id}}">
                    <i class="ni ni-bold-left"></i> Back
                </router-link>
            </div>
            <h3 class="mb-0">
                Edit Class
            </h3>
            <small>
                Can edit the following;
                <ul>
                    <li>Venue</li>
                    <li>Days</li>
                    <li>Class Size</li>
                </ul>
            </small>
        </div>
        <div class="card-body">
            <form @submit="submitForm">
                <fake-form-input></fake-form-input>
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
                    <div class="form-group mb-3 col-md-8">
                        <small>Venues found</small>
                        <div class="input-group" v-show="venues.length > 0">
                            <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Venue:
                                        </span>
                            </div>
                            <select class="form-control" v-model="$parent.form.input.term_class.venue_id" required>
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
                <div class="row" v-for="day in Object.keys($parent.form.input.term_class.times)">
                    <div class="form-group mb-3 col-md-6">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Day:
                                        </span>
                            </div>
                            <select class="form-control" v-model="$parent.form.input.term_class.times[day].day" required>
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
                            <input type="time" placeholder="Time" v-model="$parent.form.input.term_class.times[day].time" class="form-control" required>
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
                    <div class="col-md-6 form-group mb-3">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Class Size:</span>
                            </div>
                            <input class="form-control"
                                   type="number" :min="window.options.min_class_size" :max="window.options.max_class_size" v-model="$parent.form.input.term_class.size"
                                   required>
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
<!--                               type="password" v-model="$parent.form.input.term_class.password"-->
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
        name: "EditClasses",
        data() {
            return {
                window: window,
                courses: [],
                major_term_classes: [],
                venues: [],
                errors: null,
                search: {
                    course: '',
                    venue: '',
                },
                week_days: window.week_days,
                times: this.$parent.form.input.times,
            }
        },
        created() {
            this.venues.push(this.$parent.form.input.term_class.venue);
            // this.loadMajorCourses(this.$parent.term_class.term_id);
        },
        methods: {
            removeDayInput: function(index) {
                this.$parent.form.input.term_class.times.splice(index, 1);
            },
            addDayInput: function() {
                this.$parent.form.input.term_class.times.push({day: '', time: ''});
            },
            submitForm: function (e) {
                e.preventDefault();

                axios.post('/admin/classes/edit', this.$parent.form.input.term_class)
                    .then((res) => {
                        this.$root.post_success(res.data.success);
                        this.$router.push({name:'ad.show.classes', params:{class:this.$parent.form.input.term_class.id}});
                    });
            },
            searchVenue: function () {
                axios.post('/admin/search/venues', {search:this.search.venue})
                    .then((res) => {
                        this.venues = res.data.venues;
                    });
            },
        },
    }
</script>

<style scoped>

</style>
