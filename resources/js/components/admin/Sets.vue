<template>
    <div class="row">
        <IndexSets v-if="sets"></IndexSets>
        <ViewSets v-if="set && !form"></ViewSets>
        <FormSets v-if="form"></FormSets>
    </div>
</template>

<script>
    import FakeFormInputs from "../layouts/FakeFormInputs";
    import IndexSets from "./Sets/IndexSets";
    import ViewSets from "./Sets/ViewSets";
    import FormSets from "./Sets/FormSets";
    export default {
        name: "Sets",
        components: {FormSets, ViewSets, IndexSets, FakeFormInputs},
        data() {
          return {
              filter: {
                  search: null,
                  search_q: '',
              },
              sets: null,
              profiles: null,
              set: null,
              grading_systems: [],
              departments: [],
              school_departments: [],
              form: null,
          }
        },
        mounted() {
            this.$store.state.page = 'Sets';
        },
        created() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData: function() {

                if (this.$route.params.id === 'create' || this.$route.params.ops === 'create')
                {
                    this.sets = null;
                    this.get_grading_systems();
                    this.get_departments();
                    this.form = {
                        title: 'Create New Set',
                        type: 'c',
                        input: {
                            name: null,
                            degree: null,
                            school_department_id: null,
                            department_id: null,
                            grading_system_id: null,
                            start_date: null,
                            expected_years: null,
                            //*pass password: null,
                        },
                    };
                }
                else if (this.$route.params.id)
                {
                    this.sets = null;
                axios.get('/admin/sets/'+this.$route.params.id)
                        .then(res => {
                            this.set = res.data.set;
                            // this.set.profiles = {};
                            this.form = null;

                            if (this.$route.params.ops === 'edit')
                            {
                                this.get_grading_systems();
                                this.get_departments();
                                this.form = {
                                    title: 'Edit Set '+this.set.name,
                                    type: 'e',
                                    input: {
                                        id: this.set.id,
                                        name: this.set.name,
                                        degree: this.set.degree,
                                        department_id: this.set.department_id,
                                        school_department_id: this.set.school_department_id,
                                        grading_system_id: this.set.grading_system_id,
                                        start_date: this.set.start_date,
                                        expected_years: this.set.expected_years,
                                        //*pass password: null,
                                    },
                                };
                            }
                            else if (this.$route.params.ops === 'delete')
                            {
                                this.get_grading_systems();
                                this.get_departments();
                                this.form = {
                                    title: 'Delete Set '+this.set.name,
                                    type: 'd',
                                    input: {
                                        id: this.set.id,
                                        //*pass password: null,
                                    },
                                };
                            } else {
                                this.get_set_profiles();
                            }
                    });
                } else {
                    this.set = this.form = null;
                    this.get_sets();
                }
            },
            get_set_profiles: function(count = 1)
            {
                axios.get('/admin/profiles/set='+this.set.id+'?page='+count)
                    .then(res => {
                        this.profiles = res.data.profiles;
                    });
            },
            submitForm: function(e)
            {
                e.preventDefault();

                switch (this.form.type) {
                    case 'c':
                        this.postRequest('/admin/sets/store');
                        break;
                    case 'd':
                        this.form.input.id = this.set['id'];
                        this.postRequest('/admin/sets/destroy');
                        break;
                    case 'e':
                        this.form.input.id = this.set['id'];
                        this.postRequest('/admin/sets/edit');
                        break;
                }
            },

            postRequest: function(link)
            {
                axios.post(link, this.form.input)
                    .then(res => {
                        //this.sets = res.data.sets;
                        //this.set = null;
                        if (res.data.set != null) {
                            //this.set = res.data.set;
                            this.$router.push({name:'ad.sets',params:{id:this.set.id}});
                        } else {
                            this.$router.push({name: 'ad.sets'});
                        }
                        this.$root.post_success(res.data.success);
                        //*pass this.form.input.password = '';
                    });
            },

            get_grading_systems: function()
            {
                axios.get('/admin/current/grading-systems')
                    .then((res) => {
                        this.grading_systems = res.data.grading_systems;
                    });
            },

            get_departments: function()
            {
                axios.get('/admin/get/departments?is_major=1')
                    .then((res) => {
                        this.departments = res.data.departments;
                    });
                axios.get('/admin/get/departments?is_admin=0&is_major=0')
                    .then((res) => {
                        this.school_departments = res.data.departments;
                    });
            },

            get_sets: function(page = 1)
            {
                if (this.filter.search)
                    this.filter.search_q = '&search=' + this.filter.search;

                axios.get('/admin/sets?page=' + page + this.filter.search_q)
                    .then(res => {
                        this.sets = res.data.sets;
                    });
            },

            get_set: function(id)
            {
                axios.get('/admin/sets/'+id)
                    .then(res => {
                        this.set = res.data.set;
                    });
            },
        },
    }
</script>

<style scoped>
</style>
