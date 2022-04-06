<template>
    <div class="row">
        <div class="col-xl-12 order-xl-1">
            <div class="card bg-secondary shadow">
                <div class="card-header bg-white border-0">
                    <div class="row">
                        <h2 class="col-md-6">
                            <small class="text-underline">Academic Term</small><br>
                            {{$parent.term.name}}
                        </h2>
                        <div class="col-md-6">
                            <h4 class="blockquote-footer">
                                <small>Start Date:</small> {{$root.format_date($parent.term.starting_at)}}
                            </h4>
                            <h4 class="blockquote-footer">
                                <small>End Date:</small> {{$root.format_date($parent.term.ending_at)}}
                            </h4>
                            <h4 class="blockquote-footer" v-if="$parent.term.registration_deadline">
                                <small>Registration Deadline:</small> {{$root.format_date($parent.term.registration_deadline)}}
                            </h4>
                            <h4 class="blockquote-footer" v-if="$parent.term.unregistration_deadline">
                                <small>Un-Registration Deadline:</small> {{$root.format_date($parent.term.unregistration_deadline)}}
                            </h4>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <form v-on:submit="searchClass" class="form-group">
                                <div class="input-group mb-4">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                                    </div>
                                    <input class="form-control"
                                           v-model="search" placeholder="Search by course code or name" type="text">
                                    <div class="input-group-append">
                                        <input type="submit" class="input-group-text btn btn-primary shadow-none" value="search">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Course</th>
                            <th>Venue</th>
                            <th>Times</th>
                        </tr>
                        </thead>
                        <tbody ref="search_table">
                        <tr v-for="term_class in term_classes_pag">
                            <td>
                                <button class="btn btn-sm btn-primary" v-on:click="viewClass(term_class)">
                                    <i class="ni ni-button-play"></i>
                                </button>
                            </td>
                            <td>{{term_class.course.code+' - '+term_class.course.name}}</td>
                            <td>
                                {{term_class.venue.name}}<br>
                                <small>{{term_class.venue.description}}</small>
                            </td>
                            <td>
                                <li v-for="time in term_class.times">
                                    {{time.day}}, {{$root.moment(time.time)}}
                                </li>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li v-for="btn in pagination.buttons" class="page-item"
                                v-bind:class="[(btn.active) ? 'active' : '']">
                                <button class="page-link" v-on:click="paginateTC(btn.id)">{{btn.id+1}}</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <modal :scrollable="true" name="view_class" height="auto" :draggable="true">
            <div class="modal modal-content">
                <h2 class="modal-header">Class</h2>
                <div class="modal-body" v-if="term_class">
                    <table id="data-table" class="table">
                        <tbody>
                        <tr>
                            <td>Course</td>
                            <th>
                                {{term_class.course.code+' - '+term_class.course.name}}
                                <span class="blockquote-footer">
                                    Credit Hours:
                                    <strong>{{term_class.course.credit_hours}}</strong>
                                </span>
                            </th>
                        </tr>
                        <tr>
                            <td>Venue</td>
                            <th>{{term_class.venue.name+' - '+term_class.venue.address}}</th>
                        </tr>
                        <tr>
                            <td>Days</td>
                            <th>
                                <li v-for="time in term_class.times">
                                    {{time.day}}, {{$root.moment(time.time)}}
                                </li>
                            </th>
                        </tr>
                        <tr>
                            <td>Lecturers</td>
                            <th>
                                <li v-for="lect in term_class.class_lecturers">
                                    {{$root.full_name(lect.profile.user)}}
                                    <span class="blockquote-footer">Email: {{lect.profile.user.email}}</span>
                                </li>
                            </th>
                        </tr>
                        <tr>
                            <td>Class Size</td>
                            <th>
                                {{term_class.taken}} <small>taken</small>
                                +
                                {{term_class.size - term_class.taken}} <small>available</small>
                                /
                                <small>total</small> {{term_class.size}}
                                <span class="blockquote-footer text-danger" v-if="term_class.size <= term_class.taken">Class Full</span>
                                <div class="progress">
                                    <div class="progress-bar bg-danger" role="progressbar"
                                         :aria-valuenow="term_class.taken" aria-valuemin="0" :aria-valuemax="term_class.size"
                                         :style="'width: '+((term_class.taken/term_class.size)*100)+'%;'"></div>
                                </div>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                    <div v-if="term_class.have_registered">
                        <button v-if="$root.not_expired(term_class.term.unregistration_deadline)" class="btn btn-danger btn-block"
                                v-on:click="$modal.show('registration')">Un-Register</button>
                    </div>
                    <div v-else>
                        <div v-if="term_class.user.can_reg.value && term_class.user.registrations.length < window.options.max_class_registration">
                            <button v-if="$root.not_expired(term_class.term.registration_deadline)" class="btn btn-primary btn-block"
                                    v-on:click="$modal.show('registration')">Register</button>
                        </div>
                        <div v-else>
                            <div class="alert alert-danger" role="alert">
                                <h4 class="alert-heading">Cannot Register</h4>
                                <h5 class="blockquote-footer text-white" v-if="term_class.user.registrations.length >= window.options.max_class_registration">
                                    Registered Maximum Number of courses of <strong>{{window.options.max_class_registration}}</strong>
                                </h5>
                                <span v-if="!term_class.user.can_reg.value">
                                    <h5 v-for="reasons in term_class.user.can_reg.reasons">
                                       <span class="blockquote-footer text-white" v-for="reason in reasons">
                                           {{reason}}
                                       </span>
                                    </h5>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
        <modal v-if="term_class" name="registration" height="auto" :draggable="true">
            <div class="modal modal-content">
                <div class="modal-header">
                    <h1 class="text-underline">{{term_class.course.name}}</h1>
                </div>
                <div class="modal-body">
                    <button v-if="term_class.have_registered" v-on:click="unregister"
                            class="btn btn-danger btn-block">Un-Register</button>
                    <button v-else class="btn btn-success btn-block" v-on:click="register">Register</button>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    export default {
        name: "ViewTimetable",
        data() {
            return {
                term_class: null,
                term_classes: [],
                term_classes_pag: [],
                pagination: {
                    counter: 0,
                    buttons: [],
                },
                window: window,
                search: '',
                pc: 10,
            }
        },
        mounted() {
            this.term_classes = Array(this.$parent.term_classes.length);
            this.searchTC();
        },
        methods: {
            gen_buttons: function() {
                this.pagination.buttons = [];
                for(let btn = 0; btn < this.term_classes.length/this.pc; btn++)
                    this.pagination.buttons.push({
                        id: btn
                    });
            },
            paginateTC: function(i) {
                for (let btn of this.pagination.buttons)
                    btn.active = btn.id === i;
                this.term_classes_pag = this.term_classes.slice(i*this.pc,(i*this.pc)+this.pc);
                this.pagination.counter = i;
            },
            searchTC: function() {
                this.term_classes = [];
                for (let tc of this.$parent.term_classes)
                    if (
                            (tc.course.code+' '+tc.course.name)
                                .toLowerCase().indexOf(this.search) !== -1
                        )
                            this.term_classes.push(tc);
                this.gen_buttons();
                this.paginateTC(0);
            },
            searchClass: function(e) {
                e.preventDefault();
                this.searchTC();
            },
            reg_post_request: function(url) {
                axios.post(url, {class:this.term_class.id})
                    .then((res) => {
                        this.$root.post_success(res.data.success);
                        this.$modal.hide('view_class');
                        this.$modal.hide('registration');
                    })
            },
            unregister: function() {
                this.reg_post_request('/students/unregister');
            },
            register: function() {
                this.reg_post_request('/students/register');
            },
            viewClass: function (term_class) {
                axios.get('/students/classes/'+term_class.id)
                    .then((res) => {
                        this.term_class = res.data.term_class;
                        this.term_class.taken = this.term_class.class_registrations.length;
                        this.term_class.user = res.data.user;
                        this.term_class.have_registered = false;

                        for (let i in res.data.user.registrations) {
                            if (res.data.user.registrations[i].term_class_id === this.term_class.id)
                                this.term_class.have_registered = true;
                        }

                        this.$modal.show('view_class');
                    })
                    .catch((err) => {
                        this.$root.post_errors(err);
                    })
            }
        },
    }
</script>

<style scoped>

</style>
