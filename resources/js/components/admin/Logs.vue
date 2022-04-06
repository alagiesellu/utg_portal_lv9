<template>
    <div>
        <div class="card shadow mb-4 mb-xl-0">
            <h2 class="card-header bg-transparent">
                Logs
            </h2>
            <form v-on:submit="filter_logs" class="card-footer col-md-12">
                <div class="form-group">
                    <div class="input-group mb-4">
                        <input v-model="filter.form.user"
                               v-on:change="search_user"
                               class="form-control" placeholder="Search user by email" type="text">
                        <v-select
                            class="form-control" :options="filter.data.users"
                            :reduce="user => user.id" label="email"
                            v-model="filter.form.user_id">
                            <template #search="{attributes, events}">
                                <input
                                    class="vs__search"
                                    v-bind="attributes"
                                    v-on="events"/>
                            </template>
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group mb-4">
                        <v-select
                            class="form-control" :options="models"
                            :reduce="model => model.model" label="model"
                            v-model="filter.form.model">
                            <template #search="{attributes, events}">
                                <input
                                    class="vs__search"
                                    v-bind="attributes"
                                    v-on="events"/>
                            </template>
                        </v-select>
                        <v-select
                            class="form-control" :options="infos"
                            :reduce="info => info.info" label="info"
                            v-model="filter.form.info">
                            <template #search="{attributes, events}">
                                <input
                                    class="vs__search"
                                    v-bind="attributes"
                                    v-on="events"/>
                            </template>
                        </v-select>
                        <v-select
                            class="form-control" :options="filter.data.models"
                            :reduce="model => model.id" label="id"
                            v-model="filter.form.model_id">
                            <template #search="{attributes, events}">
                                <input
                                    class="vs__search"
                                    v-bind="attributes"
                                    v-on="events"/>
                            </template>
                        </v-select>
                    </div>
                </div>
                <button type="submit" class="btn btn-outline-primary float-right">
                    Filter Logs
                </button>
            </form>
            <table class="table align-items-center table-flush">
                <thead class="thead-light">
                <tr>
                    <th scope="col">User</th>
                    <th scope="col">Model</th>
                    <th scope="col">Info</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="db_log in db_logs.data">
                    <td>{{$root.full_name(db_log.user)}}</td>
                    <td>{{db_log.model}}</td>
                    <td>{{db_log.info}}</td>
                    <td>
                        <button v-on:click="get_log(db_log)"
                                class="btn btn-primary btn-sm">
                            <i class="ni ni-bullet-list-67"></i>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <laravel-vue-pagination :limit="5" :data="db_logs" align="center" @pagination-change-page="get_logs"></laravel-vue-pagination>
        </div>
        <modal :scrollable="true" name="modal" height="auto">
            <button v-on:click="$modal.hide('modal')" class="btn btn-danger btn-sm float-right">❌</button>

            <div class="modal-header">Activity Log</div>
            <div class="modal-body">
                <table class="table">
                    <tbody>
                    <tr v-if="db_log.user">
                        <td>User</td>
                        <th>{{$root.full_name(db_log.user)}}</th>
                    </tr>
                    <tr>
                        <td>Info</td>
                        <th>{{db_log.info}}</th>
                    </tr>
                    <tr>
                        <td>Model</td>
                        <th>{{db_log.model}}</th>
                    </tr>
                    <tr v-if="db_log.data">
                        <td>Data</td>
                        <th>
                            <li v-for="key in Object.keys(db_log.data)">
                                {{key}}: {{db_log.data[key]}}
                            </li>
                        </th>
                    </tr>
                    <tr>
                        <td>Timestamp</td>
                        <th>{{db_log.created_at}}</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </modal>
    </div>
</template>

<script>
    export default {
        name: "Logs",
        data() {
            return {
                db_logs: {},
                db_log: {},
                filter: {
                    form: {
                        user: null,
                        model: null,
                        model_id: null,
                        user_id: null,
                    },
                    data: {
                        users: [],
                        models: [],
                    },
                },
                models: [],
                infos: [],
            }
        },
        mounted() {
            this.$store.state.page = 'Activity Logs';
            this.get_logs();
        },
        watch: {
            //'filter.form.user': 'search_user',
            'filter.form.model': 'search_modal',
        },
        methods: {
            search_modal: function() {
                if (this.filter.form.model) {
                    axios.post('/admin/logs/find-models', {search: this.filter.form.model})
                        .then((res) => {
                            this.filter.data.models = res.data.models;
                        });
                } else
                    this.filter.data.models = [];
            },
            search_user: function() {
                axios.post('/admin/search/users', {search: this.filter.form.user})
                    .then((res) => {
                        this.filter.data.users = res.data.users;
                    });
            },
            filter_logs: function(e) {
                e.preventDefault();
                axios.post('/admin/logs/filter', this.filter.form)
                    .then((res) => {
                        this.db_logs = res.data.db_logs;
                        this.infos = res.data.db_infos;
                    });
            },
            get_logs: function(page = 1) {
                axios.post('/admin/logs?page='+page, this.filter.form)
                    .then((res) => {
                        this.db_logs = res.data.db_logs;
                        this.infos = res.data.db_infos;
                    });

                axios.get('/admin/logs/models')
                    .then(res => {
                        this.models = res.data.db_models;
                    });
            },
            get_log: function (log) {
                axios.get('/admin/logs/'+log.id)
                    .then((res) => {
                        this.db_log = res.data.db_log;
                        this.$modal.show('modal');
                    });
            },
        },
    }
</script>

<style scoped>

</style>
