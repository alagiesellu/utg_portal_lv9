<template>
    <div class="col-12">
        <div class="card shadow mb-4 mb-xl-0">
            <div class="card-header bg-transparent">
                <span v-text="$parent.form.title"></span>
            </div>
            <div class="card-body">
                <form @submit="$parent.submitForm">
                    <fake-form-input></fake-form-input>
                    <div class="form-group mb-3" v-if="$parent.form.input.name !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-align-left-2"></i></span>
                            </div>
                            <input class="form-control" placeholder="set Name"
                                   type="text" name="name" v-model="$parent.form.input.name"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.degree !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-align-left-2"></i></span>
                            </div>
                            <input class="form-control" placeholder="Degree"
                                   type="text" name="degree" v-model="$parent.form.input.degree"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.start_date !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
                            </div>
                            <input class="form-control" placeholder="Starting Date"
                                   type="date" name="start_date" v-model="$parent.form.input.start_date"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.expected_years !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-watch-time"></i></span>
                            </div>
                            <input class="form-control" placeholder="Expected Years"
                                   type="number" name="expected_years" v-model="$parent.form.input.expected_years"
                                   min="1" max="10" required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.department_id !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Department</span>
                            </div>
                            <v-select
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
                    <div class="form-group mb-3" v-if="$parent.form.input.school_department_id !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">School/Faculty</span>
                            </div>
                            <v-select
                                class="form-control" :options="$parent.school_departments"
                                :reduce="department => department.id" label="name"
                                v-model="$parent.form.input.school_department_id">
                                <template #search="{attributes, events}">
                                    <input
                                        class="vs__search"
                                        :required="!$parent.form.input.school_department_id"
                                        v-bind="attributes"
                                        v-on="events"/>
                                </template>
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.grading_system_id !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-building"></i></span>
                            </div>
                            <v-select
                                class="form-control" :options="$parent.grading_systems"
                                :reduce="gs => gs.id" label="name"
                                v-model="$parent.form.input.grading_system_id">
                                <template #search="{attributes, events}">
                                    <input
                                        class="vs__search"
                                        :required="!$parent.form.input.grading_system_id"
                                        v-bind="attributes"
                                        v-on="events"/>
                                </template>
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                            </div>
                            <input class="form-control" placeholder="Password confirmation"
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
    export default {
        name: "FormSets"
    }
</script>

<style scoped>

</style>
