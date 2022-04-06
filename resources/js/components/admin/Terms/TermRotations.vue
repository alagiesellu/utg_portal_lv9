<template>
    <div class="card shadow mb-4 mb-xl-0" id="view">
        <div class="card-header bg-transparent">
        </div>
        <div class="table-responsive">
            <table class="table align-items-center">
            <thead class="thead-light">
            <tr>
                <th colspan="4" class="danger text-xl">
                    <i class="ni ni-bullet-list-67"></i> Rotations
                    <button
                        v-show="$store.state.auth.hasRole('ad-4')"
                        v-on:click="create_term"
                        class="btn btn-sm btn-outline-default">
                        <i class="ni ni-fat-add"></i> Add
                    </button>
                    <modal :scrollable="true" name="rotation_form" height="auto" class="card shadow mb-4 mb-xl-0">
                        <h2 class="card-header">{{form.title}}</h2>

                        <form v-if="form.input" @submit="submitForm">
                                        <fake-form-input></fake-form-input>
                            <div class="form-group mb-3" v-if="form.input.name !== undefined">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Name:</span>
                                    </div>
                                    <input class="form-control" placeholder=".........."
                                           type="text" v-model="form.input.name"
                                           required>
                                </div>
                            </div>
                            <div class="form-group mb-3" v-if="form.input.starting_at !== undefined">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Starting Date:</span>
                                    </div>
                                    <input class="form-control" placeholder=".........."
                                           type="date" v-model="form.input.starting_at"
                                           required>
                                </div>
                            </div>
                            <div class="form-group mb-3" v-if="form.input.ending_at !== undefined">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Ending Date :
                                        </span>
                                    </div>
                                    <input class="form-control" placeholder=".........."
                                           type="date" v-model="form.input.ending_at"
                                           required>
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Password confirmation :
                                        </span>
                                    </div>
                                    <input class="form-control" placeholder="........."
                                           type="password" v-model="form.input.password"
                                           required>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </modal>
                </th>
            </tr>
            <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Starting</th>
                <th scope="col">Ending</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="rotation in term.terms">
                <td>
                    <button
                        v-on:click="view_term(rotation)"
                        class="btn btn-primary btn-sm">
                        <i class="ni ni-bold-right"></i>
                    </button>
                </td>
                <th scope="row">{{rotation.name}}</th>
                <td>{{$root.format_date(rotation.starting_at)}}</td>
                <td>{{$root.format_date(rotation.ending_at)}}</td>
            </tr>
            <tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>
            <modal :scrollable="true" name="view_rotation" height="auto">
                <table class="table align-items-center table-flush" v-if="rotation">
                    <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <button
                                v-on:click="edit_term(rotation)"
                                class="btn btn-primary btn-sm">
                                Edit
                            </button>
                            <button
                                v-on:click="delete_term(rotation)"
                                class="btn btn-primary btn-sm">
                                Delete
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <th>{{rotation['name']}}</th>
                    </tr>
                    <tr>
                        <td>Starting Date</td>
                        <th>{{$root.format_date(rotation['starting_at'])}}</th>
                    </tr>
                    <tr>
                        <td>Ending Data</td>
                        <th>{{$root.format_date(rotation['ending_at'])}}</th>
                    </tr>
                    <tr>
                        <td></td>
                        <th>
                            <router-link :to="{name:'ad.term.classes',params:{term:rotation['id']}}">
                                View Classes
                            </router-link>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </modal>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['term'],
        name: "TermRotations",
        data() {
            return {
                form: {
                    input: {},
                    errors: null,
                    type: null,
                },
                rotation: null,
            }
        },
        mounted() {},
        methods: {
            view_term: function(term) {
                this.rotation = term;
                this.$modal.show('view_rotation');
            },
            create_term: function() {
                this.$modal.show('rotation_form');
                this.form = {
                    type: 'c',
                    title: 'Add a rotation under '+this.term.name,
                    input: {
                        id: this.term.id,
                        name: '',
                        starting_at: '',
                        ending_at: '',
                    }
                };
            },
            edit_term: function(term) {
                this.form.input = {};
                this.$modal.show('rotation_form');
                this.$modal.hide('view_rotation');
                this.form.type = 'e';
                this.form.title = 'Edit '+term.name;
                this.form.input = {
                    id: term.id,
                    name: term.name,
                    starting_at: term.starting_at,
                    ending_at: term.ending_at,
                }
            },
            delete_term: function(term) {
                this.form.input = {};
                this.$modal.show('rotation_form');
                this.$modal.hide('view_rotation');
                this.form.type = 'd';
                this.form.title = 'Delete '+term.name;
                this.form.input.id = term.id;
            },
            submitForm: function (e) {
                e.preventDefault();

                if (this.form.type === 'c') {
                axios.post('/admin/terms/store-rotation', this.form.input)
                        .then((res) => {
                            this.$root.post_success(res.data.success);
                            this.term.terms = res.data.terms;
                            this.$modal.hide('rotation_form');
                    });
                } else if (this.form.type === 'e') {
                    axios.post('/admin/terms/edit-rotation', this.form.input)
                        .then((res) => {
                            this.$root.post_success(res.data.success);
                            location.reload();
                    });
                } else if (this.form.type === 'd') {
                    axios.post('/admin/terms/destroy', this.form.input)
                        .then((res) => {
                            this.$root.post_success(res.data.success);
                            location.reload();
                    });
                }
                    }
        },
    }
</script>

<style scoped>

</style>
