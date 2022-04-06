<template>
    <div class="row">
        <IndexVenues v-if="venues"></IndexVenues>
        <ViewVenues v-if="venue && !form"></ViewVenues>
        <FormVenues v-if="form"></FormVenues>
    </div>
</template>

<script>
    import IndexVenues from "./Venues/IndexVenues";
    import ViewVenues from "./Venues/ViewVenues";
    import FormVenues from "./Venues/FormVenues";
    export default {
        name: "Venues",
        components: {FormVenues, ViewVenues, IndexVenues},
        data() {
          return {
              filter: {
                  search: null,
                  search_q: '',
              },
              venues: null,
              venue: null,
              form: null,
          }
        },
        mounted() {
            this.$store.state.page = 'venues';
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
                    this.venues = null;
                    this.form = {
                        title: 'Create New Venue',
                        type: 'c',
                        input: {
                            name: null,
                            type: null,
                            description: null,
                            address: null,
                            capacity: null,
                            //*pass password: null,
                        },
                    };
                }
                else if (this.$route.params.id)
                {
                    this.venues = null;
                axios.get('/admin/venues/'+this.$route.params.id)
                        .then(res => {
                            this.venue = res.data.venue;
                            this.form = null;

                            if (this.$route.params.ops === 'edit')
                            {
                                this.form = {
                                    title: 'Edit Set '+this.venue.name,
                                    type: 'e',
                                    input: {
                                        id: this.venue.id,
                                        name: this.venue.name,
                                        type: this.venue.type,
                                        description: this.venue.description,
                                        address: this.venue.address,
                                        capacity: this.venue.capacity,
                                        //*pass password: null,
                                    },
                                };
                            }
                            else if (this.$route.params.ops === 'delete')
                            {
                                this.form = {
                                    title: 'Delete Venue '+this.venue.name,
                                    type: 'd',
                                    input: {
                                        id: this.venue.id,
                                        //*pass password: null,
                                    },
                                };
                            }
                    });
                } else {
                    this.venue = this.form = null;
                    this.get_venues();
                }
            },
            submitForm: function(e)
            {
                e.preventDefault();

                switch (this.form.type) {
                    case 'c':
                        this.postRequest('/admin/venues/store');
                        break;
                    case 'd':
                        this.postRequest('/admin/venues/destroy');
                        break;
                    case 'e':
                        this.postRequest('/admin/venues/edit');
                        break;
                }
            },

            postRequest: function(link)
            {
                axios.post(link, this.form.input)
                    .then(res => {
                        if (res.data.venue)
                            this.$router.push({name:'ad.venues',params:{id:this.venue.id}});
                        else
                            this.$router.push({name:'ad.venues'});

                        this.$root.post_success(res.data.success);
                        //*pass this.form.input.password = '';
                    });
            },

            showCreate: function()
            {
                this.$refs.display_success_message.style.display = 'none';
                this.form.title = 'Add a new Academic Term';
                this.form.type = 'c';
                this.resetInputs();

                this.displayInput([
                    'name', 'type', 'description', 'address',
                    //*pass 'password',
                    'capacity'], 'show-input', true);
            },

            showEdit: function()
            {
                this.$refs.display_success_message.style.display = 'none';
                this.form.title = 'Add a new Academic Term';
                this.form.type = 'e';
                this.form.input = this.venue;

                this.displayInput([
                    'name', 'type', 'description', 'address',
                    //*pass 'password',
                    'capacity'], 'show-input', true);
            },

            showDelete: function()
            {
                this.$refs.display_success_message.style.display = 'none';
                this.form.title = 'Add a new Academic Term';
                this.form.type = 'd';
                this.form.input = this.venue;

                //*pass this.displayInput(['password'], 'show-input', true);
                this.displayInput(['name', 'type', 'description', 'address', 'capacity'], 'show-input', true);
            },

            displayInput: function(ids, style, required)
            {
                for (let id of ids) {
                    this.$refs[id].id = style;
                    this.$refs[id].children[1].required = required;
                }
            },

            resetInputs: function()
            {
                for (let key of Object.keys(this.form.input))
                    this.form.input[key] = null;
            },

            get_venues: function(page = 1)
            {
                if (this.filter.search)
                    this.filter.search_q = '&search=' + this.filter.search;

                axios.get('/admin/venues?page=' + page + this.filter.search_q)
                    .then(res => {
                        this.venues = res.data.venues;
                    });
            },

            get_venue: function(id)
            {
                axios.get('/admin/venues/'+id)
                    .then(res => {
                        this.venue = res.data.venue;
                    });
            },
            get_schools_departments: function () {
                axios.get('/admin/get/departments?is_major=0&is_admin=0')
                    .then((res) => {
                        this.departments = res.data.departments;
                    });
            }
        },
    }
</script>

<style scoped>
</style>
