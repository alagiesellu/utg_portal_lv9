<template>
    <ViewMails v-if="term_class"></ViewMails>
</template>

<script>
    import ViewMails from "./Mails/ViewMails";
    export default {
        name: "Mails",
        components: {ViewMails},
        data() {
            return {
                term_class: null,
                mails: null,
            }
        },
        created() {
            this.$store.state.page = 'Mails';
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData: function () {
                if (this.$route.params.id !== undefined)
                {
                    this.get_mails();
                }
            },
            get_mails: function(page=1) {
                axios.get('/students/mails/'+this.$route.params.id+'?page='+page)
                    .then((res) => {
                        this.term_class = res.data.term_class;
                        this.mails = res.data.mails;
                        this.mails.profile_id = res.data.profile_id;
                    });
            },
        },
    }
</script>

<style scoped>

</style>
