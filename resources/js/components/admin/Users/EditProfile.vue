<template>

    <modal :scrollable="true" name="edit-profile" height="auto" @before-open="beforeOpen">
        <div class="modal-header">
            <h3 class="modal-title" id="modal-title-create">

                <span v-if="form.ops === 'c'">New</span>
                <span v-else>Edit</span>

                <span v-if="profile.type === 'ad'">Admin</span>
                <span v-else-if="profile.type === 'ac'">Academic</span>
                <span v-else>Student</span>

                Profile
            </h3>
        </div>
        <div class="modal-body">
            <form @submit="submitForm">
                <fake-form-input></fake-form-input>

                <div class="form-group mb-3">
                    <div class="custom-checkbox" ref="active">
                        <label class="custom-toggle">
                            <input type="checkbox" v-model="profile.active">
                            <span class="custom-toggle-slider rounded-circle"></span>
                        </label>
                    </div>
                </div>

                <div v-if="profile.active">
                    <h4 class="text-success">Profile Activated</h4>
                    <div class="form-group mb-3">
                        <label class="form-control-label">Department</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-building"></i></span>
                            </div>
                            <v-select
                                class="form-control" :options="departments"
                                :reduce="department => department.id" label="name"
                                v-on:input="departmentSelected"
                                v-model="profile.department_id">
                                <template #search="{attributes, events}">
                                    <input
                                        class="vs__search"
                                        :required="!profile.department_id"
                                        v-bind="attributes"
                                        v-on="events"/>
                                </template>
                            </v-select>
                        </div>
                    </div>
                    <div v-if="profile.type === 's'">
                        <div class="form-group mb-3">
                            <label class="form-control-label">Minor</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="ni ni-building"></i></span>
                                </div>
                                <v-select
                                    class="form-control" :options="minor_departments"
                                    :reduce="department => department.id" label="name"
                                    v-model="profile.minor_department_id">
                                    <template #search="{attributes, events}">
                                        <input
                                            class="vs__search"
                                            v-bind="attributes"
                                            v-on="events"/>
                                    </template>
                                </v-select>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-control-label">Set</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="ni ni-building"></i></span>
                                </div>
                                <v-select
                                    class="form-control" :options="sets"
                                    :reduce="set => set.id" label="name"
                                    v-model="profile.set_id">
                                    <template #search="{attributes, events}">
                                        <input
                                            :disabled="profile.department_id === null"
                                            class="vs__search"
                                            v-bind="attributes"
                                            v-on="events"/>
                                    </template>
                                </v-select>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-control-label">Enrolled Date</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
                                </div>
                                <input class="form-control" placeholder="Enrolled Date"
                                       type="date" name="enrolled_at" required v-model="profile.enrolled_at">
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-control-label">Completion Date</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
                                </div>
                                <input class="form-control" placeholder="Completion Date"
                                       type="date" name="completed_at" v-model="profile.completed_at">
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="form-group mb-3">
                            <label class="form-control-label">Group</label>
                            <div class="input-group" ref="group_id">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="ni ni-building"></i></span>
                                </div>
                                <v-select
                                    class="form-control" :options="groups"
                                    :reduce="group => group.id" label="name"
                                    v-model="profile.group_id">
                                    <template #search="{attributes, events}">
                                        <input
                                            class="vs__search"
                                            v-bind="attributes"
                                            v-on="events"/>
                                    </template>
                                </v-select>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h4 class="text-danger">Profile Deactivated</h4>
                </div>

<!--//*pass                 <div class="form-group mb-3">-->
<!--                    <div class="input-group">-->
<!--                        <div class="input-group-prepend">-->
<!--                            <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                        </div>-->
<!--                        <input class="form-control" placeholder="Password confirmation"-->
<!--                               type="password" v-model="profile.password"-->
<!--                               required>-->
<!--                    </div>-->
<!--                </div>-->

                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-danger" v-on:click="$modal.hide('edit-profile')">Close</button>
                </div>
            </form>
        </div>
    </modal>

</template>

<script>
    export default {
        name: "EditProfile",
        data() {
            return {
                // user: {},
                // profile: {},
                // errors: [],
                // success: null,
                department_id: null,
                major_department_id: null,
                minor_department_id: null,
                departments: [],
                major_departments: [],
                minor_departments: [],
                sets: [],
                groups: [],
                form: {},
                profile: {},
            }
        },
        mounted() {
        },
        watch: {
            // 'department_id': 'department_selected',
            // 'major_department_id': 'get_sets',
        },
        methods: {
            departmentSelected: function() {

                if (this.profile.type === 's')
                {
                    this.get_majors();
                    this.get_sets();
                }
                else
                    this.get_groups();
            },
            get_majors: function() {
                if (this.profile.department_id !== undefined)
                    axios.get('/admin/get/majors/department='+this.profile.department_id)
                        .then(res => {
                            this.major_departments = res.data.majors;
                            this.minor_departments = res.data.all_majors;
                        });
            },
            get_groups: function() {
                // if department is not admin, get all academics roles
                if (this.profile.department_id !== undefined)
                axios.get('/admin/get/groups/department='+this.profile.department_id)
                    .then(res => {
                        this.groups = res.data.groups;
                    });
            },
            get_sets: function() {
                // this.profile.department_id = this.major_department_id;
                if (this.profile.department_id !== undefined)
                    axios.get('/admin/get/sets/department='+this.profile.department_id)
                        .then(res => {
                            this.sets = res.data.sets;
                        });
            },
            beforeOpen: function(event) {

                this.form = event.params.form;
                this.profile = event.params.profile;

                this.getDepartments();
                this.departmentSelected();
                // this.get_sets();

                // this.$forceUpdate();

            },
            getDepartments: function() {

                let is_admin = this.profile.type === 'ad' ? 1 : 0;

                axios.get('/admin/get/departments?is_admin='+is_admin)
                    .then(res => {
                        this.departments = [];

                        if (this.profile.type === 'ad')
                            this.departments = res.data.departments;

                        else if (this.profile.type === 'ac')
                        {
                            for (let dep of res.data.departments)
                                if (!dep.is_major)
                                    this.departments.push(dep);
                        }
                        else
                        {
                            for (let dep of res.data.departments)
                                if (dep.is_major)
                                    this.departments.push(dep);
                        }
                    });
                // this.profile.department_id = null;
            },
            onProfileDepartmentChange: function() {

                if (this.profile.type !== 's') {
                    this.sets = [];
                    this.get_groups();
                }
            },
            submitForm: function(e)
            {
                e.preventDefault();

                // if (this.department_id !== undefined)
                //     this.profile.department_id = this.department_id;
                //
                // if (this.major_department_id !== undefined)
                //     this.profile.major_department_id = this.major_department_id;

                if (this.form.ops === 'e') {
                    axios.post('/admin/profiles/edit', this.profile)
                        .then(res => {
                            this.$root.post_success(res.data.success);
                            // this.profile = res.data.profile;
                            this.$parent.$parent.user.profiles = res.data.profiles;
                            this.$modal.hide('edit-profile');
                        });
                }
                else if (this.form.ops === 'c') {
                    axios.post('/admin/profiles/store', this.profile)
                        .then(res => {
                            this.$root.post_success(res.data.success);
                            // this.$profile.$parent.user.profile = res.data.profile;
                            this.$parent.$parent.user.profiles = res.data.profiles;
                            this.$modal.hide('edit-profile');
                        });
                }
            },
        },
    }
</script>

<style scoped>

</style>
