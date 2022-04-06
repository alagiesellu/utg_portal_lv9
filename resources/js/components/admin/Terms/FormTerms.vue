<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0">
            <div class="card-header bg-transparent">
                <button
                    v-on:click="$parent.$router.push({name:'ad.terms'})"
                            class="btn btn-outline-primary btn-sm">
                            <i class="ni ni-bold-left"></i> Back
                </button>
                <h3 class="mb-0">
                    {{$parent.form.title}}
                </h3>
            </div>
            <div class="card-body">
                <form @submit="submitForm">
                    <fake-form-input></fake-form-input>
                    <div class="form-group mb-3" v-if="$parent.form.input.name !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Name:</span>
                            </div>
                            <input class="form-control" placeholder=".........."
                                   type="text" v-model="$parent.form.input.name"
                                   required>
                        </div>
                    </div>
<!--                    <div class="form-group mb-3" v-if="$parent.form.input.pay_per_class !== undefined">-->
<!--                        <div class="input-group">-->
<!--                            <div class="input-group-prepend">-->
<!--                                        <span class="input-group-text">-->
<!--                                            Type :-->
<!--                                        </span>-->
<!--                            </div>-->
<!--                            <select class="form-control" v-model="$parent.form.input.pay_per_class" required>-->
<!--                                <option value="0">-->
<!--                                    Pay Per Term-->
<!--                                </option>-->
<!--                                <option value="1">-->
<!--                                    Pay per Class-->
<!--                                </option>-->
<!--                            </select>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="form-group mb-3" v-if="$parent.form.input.starting_at !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Starting Date:</span>
                            </div>
                            <input class="form-control" placeholder=".........."
                                   type="date" v-model="$parent.form.input.starting_at"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.ending_at !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Ending Date :
                                        </span>
                            </div>
                            <input class="form-control" placeholder=".........."
                                   type="date" name="ending_at" v-model="$parent.form.input.ending_at"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.department_id !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Department :
                                        </span>
                            </div>
                            <v-select
                                @input="departmentChanged"
                                class="form-control" :options="$parent.departments"
                                :reduce="department => department.id" label="name"
                                v-model="$parent.form.input.department_id">
                                <template #search="{attributes, events}">
                                    <input
                                        class="vs__search"
                                        :required="!$parent.form.input.department_id"
                                        v-bind="attributes"
                                        v-on="events"/>
                                </template>
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.set_id !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Students Set :
                                        </span>
                            </div>
                            <v-select
                                @input="departmentChanged"
                                class="form-control" :options="sets"
                                :reduce="set => set.id" label="name"
                                v-model="$parent.form.input.set_id">
                                <template #search="{attributes, events}">
                                    <input
                                        class="vs__search"
                                        :required="!$parent.form.input.set_id"
                                        v-bind="attributes"
                                        v-on="events"/>
                                </template>
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.external_exam_percentage !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Professional Exams Percentage (%) :
                                        </span>
                            </div>
                            <input class="form-control" placeholder="..............."
                                   type="number" min="0" max="100" value="70" v-model="$parent.form.input.external_exam_percentage"
                                   required>
                        </div>
                    </div>
                    <!--                            <div class="form-group mb-3" v-if="$parent.form.input.registration_required !== undefined">-->
                    <!--                                <div class="input-group">-->
                    <!--                                    <div class="custom-control custom-checkbox mb-3">-->
                    <!--                                        <input class="custom-control-input" v-model="$parent.form.input.registration_required" id="registration_required" type="checkbox">-->
                    <!--                                        <label class="custom-control-label" for="registration_required">-->
                    <!--                                            Registration Required-->
                    <!--                                        </label>-->
                    <!--                                    </div>-->
                    <!--                                </div>-->
                    <!--                            </div>-->
                    <div class="form-group mb-3" v-if="$parent.form.input.registration_deadline !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Registration Deadline :
                                        </span>
                            </div>
                            <input class="form-control" placeholder="........."
                                   type="date" v-model="$parent.form.input.registration_deadline"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.unregistration_deadline !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            Un-Registration Deadline :
                                        </span>
                            </div>
                            <input class="form-control" placeholder="........."
                                   type="date" v-model="$parent.form.input.unregistration_deadline"
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
                                   type="password" v-model="$parent.form.input.password"
                                   required>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import FakeFormInputs from "../../layouts/FakeFormInputs";
    export default {
        components: {FakeFormInputs},
        name: "IndexTerms",
        props: ['term'],
        data() {
            return {
                sets: [],
                errors: null,
                department_id_select_disabled: true,
            }
        },
        mounted() {
            if (this.$parent.form.input.department_id)
                this.departmentChanged();
        },
        methods: {
            submitForm: function (e) {
                e.preventDefault();
                this.errors = null;

                if (this.$parent.form.type === 'e') {
                    axios.post('/admin/terms/edit', this.$parent.form.input)
                        .then((res) => {
                                this.$root.post_success(res.data.success);
                                this.$parent.form = null;
                                this.$parent.term = res.data.term;
                        });
                }else if (this.$parent.form.type === 'd') {
                    axios.post('/admin/terms/destroy', this.$parent.form.input)
                            .then((res) => {
                                this.$root.post_success(res.data.success);
                                this.$parent.form = null;
                                this.$root.$router.push({name:'ad.terms'});
                        });
                }else if (this.$parent.form.type === 'cs' || this.$parent.form.type === 'cm') {
                    axios.post('/admin/terms/store', this.$parent.form.input)
                            .then((res) => {
                                this.$root.post_success(res.data.success);
                                this.$root.$router.push({name:'ad.terms',params:{id:res.data.term.id}});
                        });
                    }
                },
            departmentChanged: function () {
                axios.get('/admin/get/sets/department='+this.$parent.form.input.department_id)
                    .then((res) => {

                        if (res.data.sets)
                            this.sets = res.data.sets;
                    });
            }
        },
    }
</script>

<style scoped>
</style>
