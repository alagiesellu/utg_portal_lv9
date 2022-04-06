<template>
    <div class="row">
        <IndexGroups v-if="groups"></IndexGroups>
        <ViewGroups v-if="group && !form"></ViewGroups>
        <FormGroups v-if="form"></FormGroups>
    </div>
</template>

<script>
    import IndexGroups from "./Groups/IndexGroups";
    import ViewGroups from "./Groups/ViewGroups";
    import FormGroups from "./Groups/FormGroups";
    export default {
        name: "Groups",
        components: {FormGroups, ViewGroups, IndexGroups},
        data() {
          return {
              filter: {
                  search: null,
                  search_q: '',
              },
              roles: {},
              window_roles: window.roles,
              roles_success: null,
              roles_error: null,
              groups: null,
              group: null,
              form: null,
              departments: [],
          }
        },
        mounted() {
            this.$store.state.page = 'groups';
        },
        created() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            get_non_major_departments: function() {
                axios.get('/admin/get/departments?is_major=0')
                    .then((res) => {
                        this.departments = res.data.departments;
                    });
            },
            fetchData: function() {

                if (this.$route.params.id === 'create' || this.$route.params.ops === 'create')
                {
                    this.get_non_major_departments();
                    this.groups = null;
                    this.form = {
                        title: 'Create',
                        type: 'c',
                        input: {
                            name: '',
                            description: '',
                            department_id: '',
                            //*pass password: null,
                        },
                    };
                }
                else if (this.$route.params.id)
                {
                    this.groups = null;
                axios.get('/admin/groups/'+this.$route.params.id)
                        .then(res => {
                            this.group = res.data.group;
                            this.loadRoles();
                            this.form = null;

                            if (this.$route.params.ops === 'edit')
                            {
                                this.get_non_major_departments();
                                this.form = {
                                    title: 'Edit Group '+this.group.name,
                                    type: 'e',
                                    input: {
                                        id: this.group.id,
                                        name: this.group.name,
                                        description: this.group.description,
                                        department_id: this.group.department_id,
                                        //*pass password: null,
                                    },
                                };
                            }
                            else if (this.$route.params.ops === 'delete')
                            {
                                this.form = {
                                    title: 'Delete Group '+this.group.name,
                                    type: 'd',
                                    input: {
                                        id: this.group.id,
                                        //*pass password: null,
                                    },
                                };
                            }
                    });
                } else {
                    this.group = this.form = null;
                    this.get_groups();
                }
            },
            loadRoles: function() {

                for (let _role of Object.keys(window.roles)) {
                    this.roles[_role] = this.group.roles.includes(_role);
                }
            },
            storeRoles: function() {
                this.roles_error = this.roles_success = null;
                axios.post('/admin/groups/store-roles', {
                    roles:this.roles,
                    group:this.group.id,
                    //*pass password:this.form.input.password
                })
                    .then(res => {
                        this.role = res.data.role;
                        this.roles_success = res.data.success;
                        //*pass this.form.input.password = null;
                    });

            },
            submitForm: function(e)
            {
                e.preventDefault();

                switch (this.form.type) {
                    case 'c':
                        this.postRequest('/admin/groups/store');
                        break;
                    case 'd':
                        this.form.input.id = this.group['id'];
                        this.postRequest('/admin/groups/destroy');
                        break;
                    case 'e':
                        this.form.input.id = this.group['id'];
                        this.postRequest('/admin/groups/edit');
                        break;
                }
            },

            postRequest: function(link)
            {
                axios.post(link, this.form.input)
                    .then(res => {

                        // console.log(res);
                        // console.log('res');
                        this.groups = res.data.groups;
                        if (res.data.group != null){
                            this.group = res.data.group;
                            this.$router.push({name:'ad.groups',params:{id:this.group.id}});
                        } else {
                            this.$router.push({name:'ad.groups'});
                        }
                        this.$root.post_success(res.data.success);
                        //*pass this.form.input.password = '';
                    });
            },

            get_groups: function(page = 1)
            {
                if (this.filter.search)
                    this.filter.search_q = '&search=' + this.filter.search;

                axios.get('/admin/groups?page=' + page + this.filter.search_q)
                    .then(res => {
                        this.groups = res.data.groups;
                    });
            },

            get_group: function(id)
            {
                axios.get('/admin/groups/'+id)
                    .then(res => {
                        this.group = res.data.group;
                        this.loadRoles();
                    });
            },
        },
    }
</script>

<style scoped>
</style>
