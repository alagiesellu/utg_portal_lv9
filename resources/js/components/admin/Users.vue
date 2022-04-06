<template>
    <div class="row">
        <IndexUsers v-if="users"></IndexUsers>
        <ViewUsers v-if="user && !form"></ViewUsers>
        <FromUsers v-if="form"></FromUsers>
    </div>
</template>

<script>
    import IndexUsers from "./Users/IndexUsers";
    import ViewUsers from "./Users/ViewUsers";
    import FromUsers from "./Users/FromUsers";
    export default {
        name: "Users",
        components: {
            FromUsers,
            ViewUsers,
            IndexUsers,
        },
        data() {
          return {
              users: null,
              user: null,
              departments: [],
              form: null,
              filter: {
                  search: null,
              }
          }
        },
        created() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        mounted() {
            this.$store.state.page = 'Users';
            // this.$root.getDepartments(0); // load academics departments
            // this.$root.getDepartments(1); // load admin departments
        },

        methods: {
            get_departments: function() {
                this.departments = this.$root.getProfileDepartment(this.form.input.profile);
            },
            fetchData: function() {
                this.users = this.user = this.form = null;
                if (this.$route.params.id === 'create' || this.$route.params.ops === 'create')
                {
                    // this.users = null;
                    // this.user = null;
                    this.form = {
                        title: 'Add User',
                        type: 'c',
                        input: {
                            id: '',
                            num: '',
                            first_name: '',
                            middle_name: '',
                            last_name: '',
                            email: '',
                            tel: '',
                            address: '',
                            gender: '',
                            dob: '',
                            nationality: '',
                            profile: '',
                            //*pass user_password: null,
                            //*pass password: null,
                        },
                    };
                }
                else if (this.$route.params.id)
                {
                    // this.users = null;
                    axios.get('/admin/users/'+this.$route.params.id)
                        .then(res => {
                            this.user = res.data.user;
                            if (this.$route.params.ops === 'edit')
                            {
                                this.form = {
                                    title: 'Edit User',
                                    type: 'e',
                                    input: {
                                        id: this.user.id,
                                        num: this.user.num,
                                        first_name: this.user.first_name,
                                        middle_name: this.user.middle_name,
                                        last_name: this.user.last_name,
                                        email: this.user.email,
                                        tel: this.user.tel,
                                        address: this.user.address,
                                        gender: this.user.gender,
                                        dob: this.user.dob,
                                        nationality: this.user.nationality,
                                        //*pass user_password: null,
                                        //*pass password: null,
                                    },
                                };
                            }
                            else if (this.$route.params.ops === 'delete')
                            {
                                this.form = {
                                    title: 'Delete User.',
                                    type: 'd',
                                    input: {
                                        id: this.user.id,
                                        //*pass password: null,
                                    },
                                };
                            } else {
                                // this.form = null;
                            }

                            for (var profile of this.user.profiles)
                                if (this.user.profile_id === profile.id)
                                    this.user.profile = profile;
                    });
                } else {
                    // this.user = this.form = null;
                    this.get_users();
                }
            },

            profile_type: function(type) {
                return this.$root.profile_type(type);
            },

            get_role: function(role) {
                return window.roles[role];
            },

            submitForm: function(e)
            {
                e.preventDefault();

                switch (this.form.type) {
                    case 'c':
                        this.postRequest('/admin/users/store');
                        break;
                    case 'd':
                        this.form.input.id = this.user['id'];
                        this.postRequest('/admin/users/destroy');
                        break;
                    case 'e':
                        this.form.input.id = this.user['id'];
                        this.postRequest('/admin/users/edit');
                        break;
                }
            },

            postRequest: function(link)
            {
                this.$refs.display_success_message.style.display = 'none';
                axios.post(link, this.form.input)
                    .then(res => {
                        this.users = res.data.users;
                        this.user = null;
                        if (res.data.user != null)
                            this.$router.push({name:'ad.users',params:{id:res.data.user.id}});
                        this.$refs.display_success_message.style.display = 'block';
                        this.form.message.success.push(res.data.success);
                        this.form.message.errors = [];
                        //*pass this.form.input.password = '';
                    });
            },

            // displayInput: function(ids, style, required)
            // {
            //     for (let id of ids) {
            //         this.$refs[id].id = style;
            //         this.$refs[id].children[1].required = required;
            //     }
            //
            //     this.departments = this.departments.concat(this.$store.state.admin_departments);
            //     this.departments = this.departments.concat(this.$store.state.academic_departments);
            // },

            resetInputs: function()
            {
                for (let key of Object.keys(this.form.input))
                    this.form.input[key] = null;
            },

            filter_users: function(e) {
                e.preventDefault();
                this.get_users();
            },

            get_users: function(page = 1)
            {
                axios.post('/admin/users?page=' + page, this.filter)
                    .then(res => {
                        this.users = res.data.users;
                    });
            },

            get_user: function(id)
            {
                axios.get('/admin/users/'+id)
                    .then(res => {
                        this.user = res.data.user;
                        for (var profile of this.user.profiles)
                            if (this.user.profile_id === profile.id)
                                this.user.profile = profile;
                    });
            },
        },
    }
</script>

<style scoped>
</style>
