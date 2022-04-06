<template>

    <div>
        <ViewClasses v-if="term_class"></ViewClasses>
        <IndexClasses v-if="class_registrations" :class_registrations="class_registrations"></IndexClasses>
    </div>
</template>

<script>
    import IndexClasses from "./Classes/IndexClasses";
    import ViewClasses from "./Classes/ViewClasses";
    export default {
        name: "Classes",
        components: {ViewClasses, IndexClasses},
        data() {
            return {
                term_class: null,
                class_registrations: null,
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
                if (this.$route.params.id)
                    this.get_term_class();
                else
                    this.get_class_registrations();
            },
            get_term_class: function () {
                axios.get('/students/classes/'+this.$route.params.id)
                    .then((res) => {
                        this.term_class = res.data.term_class;
                        this.class_registrations = null;
                    });
            },
            get_class_registrations: function (page = 1) {
                axios.get('/students/classes?page=' + page)
                    .then((res) => {
                        this.class_registrations = res.data.class_registrations;
                        this.term_class = null;
                    });
            },
        },
    }
</script>

<style scoped>

</style>
