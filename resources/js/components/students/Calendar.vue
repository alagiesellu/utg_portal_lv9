<template>
    <div class="row">
        <div class="card bg-secondary shadow col-12">
            <div class="card-body">
                <full-calendar
                    :events="events"
                    @eventClick="eventClick"
                ></full-calendar>
                <modal :scrollable="true" name="event" height="auto" :draggable="true">
                    <div class="modal-body" v-if="event">
                        <h2>{{event.title}}</h2>
                        <h3>
                            <small>Course:</small>
                            {{event.more.course}}
                        </h3>
                        <h4>
                            <small>Starting At:</small>
                            {{$root.moment(event.start)}}
                        </h4>
                        <h4>
                            <small>Ending At:</small>
                            {{$root.moment(event.end)}}
                        </h4>
                        <p>
                            {{event.more.info}}
                        </p>
                    </div>
                </modal>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Calendar",
        components: {
            'full-calendar' : require('vue-fullcalendar')
        },
        data() {
            return {
                events: [],
                event: null,
            }
        },
        mounted() {
            this.get_calendar();
        },
        methods: {
            eventClick: function(event, jsEvent, pos) {
                this.event = event;
                this.$modal.show('event');
            },
            get_calendar: function () {
                axios.get('/students/current/calendar')
                    .then((res) => {
                        for (let assessment of res.data.assessments)
                            this.events.push({
                                // title: assessment.course.name + ' - ' + assessment.name,
                                title: assessment.name,
                                start: assessment.starting_at,
                                end: assessment.ending_at,
                                more : {
                                    info: assessment.info,
                                    course: assessment.course.code +' - '+ assessment.course.name,
                                },
                            });
                    })
                    .catch((err) => {
                        this.$root.post_errors(err);
                    });
            },
        },
    }
</script>

<style scoped>

</style>
