<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0">
            <div class="card-header bg-transparent">
                <router-link
                    :to="{name:'ad.courses'}"

                            class="btn btn-outline-primary btn-sm">
                            <i class="ni ni-bold-left"></i> Back
                </router-link>
                <span v-html="$parent.form.title"></span>
            </div>
            <div class="card-body">
                <form @submit="$parent.submitForm">
                    <fake-form-input></fake-form-input>
                    <div class="form-group mb-3" v-if="$parent.form.input.code !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-align-left-2"></i></span>
                            </div>
                            <input class="form-control" placeholder="Course Code"
                                   type="text" v-model="$parent.form.input.code"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.name !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-align-left-2"></i></span>
                            </div>
                            <input class="form-control" placeholder="Course Name"
                                   type="text" v-model="$parent.form.input.name"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.credit_hours !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-watch-time"></i></span>
                            </div>
                            <input class="form-control" placeholder="Credit Hours"
                                   type="number" v-model="$parent.form.input.credit_hours"
                                   min="1" max="500" required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.description !== undefined">
                        <label></label>
                        <textarea
                            v-model="$parent.form.input.description" required
                            rows="4" class="form-control form-control-alternative" placeholder="Course description ..."></textarea>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.department_id !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-building"></i></span>
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
<!--//*pass                     <div class="form-group mb-3">-->
<!--                        <div class="input-group">-->
<!--                            <div class="input-group-prepend">-->
<!--                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                            </div>-->
<!--                            <input class="form-control" placeholder="Password confirmation"-->
<!--                                   type="password" v-model="$parent.form.input.password"-->
<!--                                   required>-->
<!--                        </div>-->
<!--                    </div>-->

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
        name: "FormCourses"
    }
</script>

<style scoped>

</style>
