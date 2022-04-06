<template>
    <div class="row">
        <ViewUsers v-if="user"></ViewUsers>
        <IndexUsers v-else></IndexUsers>
    </div>
</template>

<script>
    import ViewUsers from "../academic/Students/ViewUsers";
    import IndexUsers from "../academic/Students/IndexUsers";
    export default {
        name: "Students",
        components: {ViewUsers,IndexUsers},
        data() {
            return {
                user: null,
                users: {},
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
            this.$store.state.page = 'Students';
        },
        methods: {
            fetchData: function() {
                if (this.$route.params.id === undefined)
                    this.get_users();
                else
                    this.get_user();
            },
            get_users: function(page=1) {
                this.user = null;
                axios.get('/academic/students?page='+page)
                    .then(res => {

                        this.users = res.data.users;
                    });
            },
            get_user: function() {
                axios.get('/academic/students/'+this.$route.params.id)
                    .then(res => {

                        this.user = res.data.user;
                        this.profile = res.data.profile;
                    });
            },
            filter_users: function(e) {
                e.preventDefault();
                axios.post('/academic/students/search', {
                    search: this.filter.search,
                })
                    .then(res => {
                        this.filter.search = null;
                        this.user = res.data.user;
                        this.profile = res.data.profile;
                        this.$router.push({name:'ac.students',params:{id:this.user.num}});
                    });
            },
        },
    }
</script>

<style scoped>

</style>
