<template>
    <div>
        <div class="card shadow mb-4 mb-xl-0">
            <h2 class="card-header bg-transparent">
<!--                Options-->
                System Configurations
            </h2>
            <table class="table align-items-center table-flush">
                <thead class="thead-light">
                <tr>
                    <th scope="col">Configuration</th>
                    <th scope="col">Value</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="option in db_options.data">
                    <td>{{info_options[option.key].info.name}}</td>
                    <td class="font-weight-600">{{option.value}}</td>
                    <td>
                        <button v-on:click="view_option(option)"
                                class="btn btn-primary btn-sm">
                            <i class="ni ni-bullet-list-67"></i>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <laravel-vue-pagination :limit="5" :data="db_options" align="center" @pagination-change-page="get_db_options"></laravel-vue-pagination>
        </div>
        <modal :scrollable="true" name="option" height="auto">
            <div v-if="option">
                <div class="modal-header h2">
                    {{info_options[option.key].info.name}}
                </div>
                <div class="modal-body">
                    <small>
                        <p>Last Updated at <span class="text-underline">{{$root.moment(option.updated_at)}}</span></p>
                    </small>
                    <form @submit="submitForm">
                        <fake-form-input></fake-form-input>

                        <div class="form-group mb-3">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="ni ni-settings-gear-65"></i></span>
                                </div>
                                <input ref="option_value" class="form-control" placeholder="Option value"
                                       :type="info_options[option.key].info.type"
                                       :min="info_options[option.key].info.min"
                                       :max="info_options[option.key].info.max"
                                       :step="info_options[option.key].info.step"
                                       v-model="form.value"
                                       required>
                            </div>
                        </div>

<!--//*pass                         <div class="form-group mb-3">-->
<!--                            <div class="input-group">-->
<!--                                <div class="input-group-prepend">-->
<!--                                    <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                                </div>-->
<!--                                <input class="form-control" placeholder="Password confirmation"-->
<!--                                       type="password" v-model="form.password"-->
<!--                                       required>-->
<!--                            </div>-->
<!--                        </div>-->

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    export default {
        name: "Options",
        data() {
            return {
                info_options: {},
                db_options: {},
                option: null,
                form: {
                    key: null,
                    value: null,
                    //*pass password: null,
                },
            }
        },
        async mounted() {
            this.$store.state.page = 'System Configurations';
            this.get_info_options();
            this.get_db_options();
        },
        methods: {
            submitForm: function(e) {
                e.preventDefault();
                axios.post('/admin/options/update', this.form)
                    .then((res) => {
                        this.$root.post_success(res.data.success);
                        this.db_options = res.data.options;
                        this.option = null;
                        this.$modal.hide('option');
                        this.form = {
                            value: null,
                            key: null,
                            //*pass password: null,
                        };
                    })
            },
            view_option: function(option) {
                this.option = option;
                this.$modal.show('option');
                this.form = {
                    value: option.value,
                    key: option.key,
                    //*pass password: null,
                };
            },
            get_info_options: function () {
                axios.get('/admin/options/get/info')
                    .then((res) => {
                        this.info_options = res.data.options;
                    });
            },
            get_db_options: function (page = 1) {
                axios.get('/admin/options/get/db?page='+page)
                    .then((res) => {
                        this.db_options = res.data.options;
                    });
            },
        },
    }
</script>

<style scoped>

</style>
