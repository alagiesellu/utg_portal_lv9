<template>
    <div>
        <ViewUsers v-if="user"></ViewUsers>
        <IndexUsers v-else></IndexUsers>
    </div>
</template>

<script>
    // try to import in transcript component


    import IndexUsers from "./Transcripts/IndexUsers";
    import ViewUsers from "./Transcripts/ViewUsers";
    export default {
        name: "Transcripts",
        components: {
            ViewUsers,
            IndexUsers,
        },
        data() {
          return {
              user: null,
              profile: null,
              filter: {
                  search: null,
              },
              transcript: {},
          }
        },
        created() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        destroyed() {
            document.title = 'UTG Portal';
        },
        mounted() {
            this.$store.state.page = '';
            // document.title = '';
        },

        methods: {
            fetchData: function() {
                if (this.$route.params.id === undefined)
                    this.user = null;
                else if (this.user == null)
                    this.get_user();
            },

            get_user: function() {
                axios.get('/admin/transcripts/'+this.$route.params.id)
                    .then(res => {
                        this.user = res.data.user;
                        this.profile = this.$root.generate_transcript(res.data.profile);
                        document.title = this.user.num+' - '+this.$root.full_name(this.user);
                    });
            },
            filter_users: function(e) {
                e.preventDefault();
                axios.post('/admin/transcripts/search', {
                    search: this.filter.search,
                })
                    .then(res => {
                        this.filter.search = null;
                        this.user = res.data.user;
                        this.$router.push({name:'ad.transcripts',params:{id:this.user.num}});
                        this.profile = this.$root.generate_transcript(res.data.profile);
                    });
            },

            generate_transcript: function () {

                this.profile.gpa = {
                    point: 0,
                    count: 0,
                };

                if (this.profile.major_department.has_rotation)   // medical transcript
                {
                    // this.profile.grades
                    this.transcript = { type: 'm', data: [] };

                    for (let grade of this.profile.grades) {

                        if (grade.term_class.term.external_exam_percentage !== null) {
                            this.transcript.data[grade.id] = grade;
                            if (grade.resit_grade)
                                this.transcript.data[grade.id].resit_grade = grade.resit_grade;
                            this.transcript.data[grade.id].grades = [];
                        }
                        else
                        {
                            if (this.transcript.data[grade.term_class.term_id] === undefined) {
                                this.transcript.data[grade.term_class.term_id] = {
                                    term: grade.term_class.term,
                                    grades: []
                                };
                            }
                            this.transcript.data[grade.term_class.term_id].grades[grade.id] = grade;
                            if (grade.resit_grade)
                                this.transcript.data[grade.term_class.term_id].grades[grade.id].resit_grade = grade.resit_grade;
                        }
                    }

                    // for (let i in grades) {
                    //     for (let yi in this.transcript.data) {
                    //
                    //         if (grades[i].term_class.term.term_id === this.transcript.data[yi].term_class.term.id) {
                    //             this.transcript.data[yi].grades[grades[i].id] = grades[i];
                    //         }
                    //     }
                    // }
                }
                else   // normal transcript
                {
                    // this.profile.grades
                    this.transcript = { type: 'n', data: [] };

                    for (let grade of this.profile.grades) {


                        if (this.transcript.data[grade.term_class.term_id] === undefined) {
                            this.transcript.data[grade.term_class.term_id] = {
                                term: grade.term_class.term,
                                grades: []
                            };
                        }
                        this.transcript.data[grade.term_class.term_id].grades[grade.id] = grade;
                        if (grade.resit_grade)
                            this.transcript.data[grade.term_class.term_id].grades[grade.id].resit_grade = grade.resit_grade;
                    }
                }
            },
        },
    }
</script>

<style scoped>
</style>
