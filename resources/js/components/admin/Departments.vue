<template>
    <div class="row">
        <FormDepartments v-if="form"></FormDepartments>
        <IndexDepartments v-else-if="department"></IndexDepartments>
    </div>
</template>

<script>
    import IndexDepartments from "./Departments/IndexDepartments";
    import FormDepartments from "./Departments/FormDepartments";
    export default {
        name: "Departments",
        components: {FormDepartments, IndexDepartments},
        data() {
            return {
                department: null,
                form: null,
            }
        },
        created () {
            this.$store.state.page = 'Departments';
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            submitForm: function(e) {
                e.preventDefault();

                switch (this.form.type) {

                    case 'c':
                        this.postRequest('/admin/departments/store');
                        break;
                    case 'd':
                        this.postRequest('/admin/departments/destroy');
                        break;
                    case 'e':
                        this.postRequest('/admin/departments/edit');
                        break;
                }
            },
            postRequest: function(link)
            {
                axios.post(link, this.form.input)
                    .then(res => {
                        this.$router.push({name:'ad.departments',params:{id:res.data.department.id}});
                        this.$root.post_success(res.data.success);
                        //*pass this.form.input.password = null;
                    });
            },
            fetchData: function () {
                // if department id not provide, load first department
                if (!this.$route.params.id)
                    this.$route.params.id = 1;
                axios.get('/admin/departments/'+this.$route.params.id)
                    .then(res => {

                        this.department = res.data.department;
                        switch (this.$route.params.ops) {

                            case 'create':
                                this.form = {
                                    title: 'Create Department Under '+this.department.name,
                                    type: 'c',
                                    input: {
                                        name: null,
                                        description: null,
                                        email: null,
                                        tel: null,
                                        is_admin: this.department.is_admin,
                                        is_major: false,
                                        has_rotation: false,
                                        fee_per_term: {
                                            local: null,
                                            foreign: null,
                                        },
                                        department_id: this.department.id,
                                        //*pass password: null,
                                    },
                                };
                                break;
                            case 'edit':
                                this.form = {
                                    title: 'Edit '+this.department.name,
                                    type: 'e',
                                    input: {
                                        id: this.department.id,
                                        name: this.department.name,
                                        description: this.department.description,
                                        email: this.department.email,
                                        tel: this.department.tel,
                                        is_admin: this.department.is_admin,
                                        is_major: this.department.is_major,
                                        has_rotation: this.department.has_rotation,
                                        fee_per_term: this.department.fee_per_term,
                                        //*pass password: null,
                                    },
                                };
                                break;
                            case 'delete':
                                this.form = {
                                    title: 'Delete Department '+this.department.name,
                                    type: 'd',
                                    input: {
                                        id: this.department.id,
                                        //*pass password: null,
                                    },
                                };
                                break;
                            default:
                                this.form = null;
                                break;
                        }
                    });
            },
            get_department: function()
            {
                axios.get('/admin/departments/'+this.$route.params.id)
                    .then(res => {
                        this.department = res.data.department;
                    });
            },
        },
    }
</script>

<style scoped>

</style>
