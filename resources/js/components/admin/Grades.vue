<template>
    <div>
        <ViewUsers v-if="user"></ViewUsers>
        <IndexUsers v-else></IndexUsers>
    </div>
</template>

<script>
    import ViewUsers from "./Grades/ViewUsers";
    import IndexUsers from "./Grades/IndexUsers";
    export default {
        name: "Grades",
        components: {IndexUsers, ViewUsers},
        data() {
            return {
                user: null,
                profile: null,
                filter: {
                    search: null,
                },
            }
        },
        created() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        mounted() {
            this.$store.state.page = 'Student Grades';
        },
        methods: {
            fetchData: function() {
                if (this.$route.params.id === undefined)
                    this.user = null;
                else if (this.user == null)
                    this.get_user();
            },

            get_user: function() {
                axios.get('/admin/grades/'+this.$route.params.id)
                    .then(res => {

                        this.user = res.data.user;
                        this.profile = res.data.profile;
                        this.prepare_grades();
                    });
            },
            filter_users: function(e) {
                e.preventDefault();
                axios.post('/admin/grades/search', {
                    search: this.filter.search,
                })
                    .then(res => {
                        this.filter.search = null;
                        this.user = res.data.user;
                        this.profile = res.data.profile;
                        this.$router.push({name:'ad.grades',params:{id:this.user.num}});
                        this.prepare_grades();
                    });
            },
            prepare_grades: function () {
                for (let i in this.profile.grades)
                {
                    this.profile.grades[i].total = 0;
                    for (let si in this.profile.grades[i].scores)
                    {
                        if (this.profile.grades[i].scores[si] != null)
                            this.profile.grades[i].total += this.profile.grades[i].scores[si]*1;
                    }
                }
            },
        },
    }
</script>

<style scoped>

</style>
