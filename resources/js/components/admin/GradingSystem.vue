<template>
    <div class="row">
        <div class="col-md-12">
            <IndexGS v-if="grading_systems"></IndexGS>
            <ViewGS v-if="grading_system && !form"></ViewGS>
            <FormGS v-if="form"></FormGS>
        </div>
    </div>
</template>

<script>
    import IndexGS from "./GradingSystem/IndexGS";
    import FormGS from "./GradingSystem/FormGS";
    import ViewGS from "./GradingSystem/ViewGS";
    export default {
        name: "GradingSystem",
        components: {ViewGS, FormGS, IndexGS},
        data() {
            return {
                grading_systems: null,
                grading_system: null,
                form: null,
            }
        },
        created () {
            this.$store.state.page = "Grading Systems";
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData: function() {

                this.grading_systems = this.grading_system = this.form = null;

                if (this.$route.params.id === 'create')
                    this.create_form();

                else if (this.$route.params.id === undefined)
                    this.get_index();

                else
                    this.get_show();
            },
            get_index: function (page = 1) {
                axios.get('/admin/grading-systems?page='+page)
                    .then((res) => {
                        this.grading_systems = res.data.grading_systems;
                    });
            },
            get_show: function () {
                axios.get('/admin/grading-systems/'+this.$route.params.id)
                    .then((res) => {
                        this.grading_system = res.data.grading_system;

                        if (this.$route.params.ops === 'edit')
                            this.form = {
                                type: 'e',
                                title: 'Edit ' + this.grading_system.name,
                                input: {
                                    id: this.grading_system.id,
                                    active: this.grading_system.active,
                                    name: this.grading_system.name,
                                    grades: this.grading_system.grades,
                                    //*pass password: '',
                                }
                            };
                        else if (this.$route.params.ops === 'delete')
                            this.form = {
                                type: 'd',
                                title: 'Delete ' + this.grading_system.name,
                                input: {
                                    id: this.grading_system.id,
                                    //*pass password: '',
                                }
                            };
                    });
            },
            create_form: function () {

                this.form = {
                    type: 'c',
                    title: 'Adda new Grading System',
                    input: {
                        name: '',
                        active: false,
                        grades: [],
                        //*pass password: '',
                    }
                };
            },
        },
    }
</script>

<style scoped>

</style>
