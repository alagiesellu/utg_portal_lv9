<template>
    <div>
        <ViewTimetable v-if="term && term_classes"></ViewTimetable>
        <IndexTimetable v-if="terms != null"></IndexTimetable>
    </div>
</template>

<script>
    import IndexTimetable from "./Timetable/IndexTimetable";
    import ViewTimetable from "./Timetable/ViewTimetable";
    export default {
        name: "Timetable",
        components: {IndexTimetable, ViewTimetable},
        data() {
            return {
                term_classes: null,
                term_class: null,
                term: null,
                terms: null,
            }
        },
        created () {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData: function() {
                if (this.$route.params.term)
                    this.get_term();
                else
                    this.get_terms();
            },
            get_term: function() {
                axios.get('/students/terms/'+this.$route.params.term)
                    .then((res) => {
                        this.term = res.data.term;
                        this.terms = null;
                        this.get_term_classes()
                    })
                    .catch((err) => {
                        this.$root.post_errors(err);
                    });
            },
            get_terms: function(page = 1) {
                axios.get('/students/terms?page='+page)
                    .then((res) => {
                        this.terms = res.data.terms;
                        this.term = null;
                        this.term_classes = null;
                    })
                    .catch((err) => {
                        this.$root.post_errors(err);
                    });
            },
            get_term_class: function () {
                axios.get('/students/timetables/term/'+this.$route.params.term)
                    .then((res) => {
                        this.term_class = res.data.term_class;
                        this.term_classes = null;
                    })
            },
            get_term_classes: function (page = 1) {
                axios.get('/students/timetables/'+this.term.id+'?page=' + page)
                    .then((res) => {
                        this.term_classes = res.data.term_classes;
                    })
            },
        },
    }
</script>

<style scoped>

</style>
