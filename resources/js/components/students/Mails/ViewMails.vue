<template>
    <div class="row">
        <div class="col-xl-12 order-xl-1">
            <div class="card bg-secondary shadow">
                <div class="card-header bg-white border-0">
                    <h3>
                        <i class="ni ni-email-83"></i>
                        <router-link class=""
                                     :to="{name:'s.classes',params:{id:$parent.term_class.id}}"
                                     v-if="$parent.term_class.course">
                            {{$parent.term_class.course.name}}
                        </router-link>
                        Mail Posts
                    </h3>
                </div>
                <div class="card-body">

                    <form v-on:submit="submitMail">
                        <div class="form-group">
                            <input
                                required v-model="compose.subject"
                                type="text" maxlength="200" class="form-control"
                                placeholder="Subject">
                        </div>
                        <div class="form-group">
                            <textarea
                                required v-model="compose.message"
                                maxlength="4000"
                                class="form-control"
                                rows="3"
                                placeholder="Compose"></textarea>
                        </div>

                        <div class="form-group">
                            <button class="btn btn-icon btn-primary float-right" type="submit">
                                <span class="btn-inner--icon"><i class="ni ni-send"></i></span>
                                <span class="btn-inner--text">Post</span>
                            </button>
                        </div>
                    </form>

                </div>
                <div class="card-footer">
                    <div v-for="mail in $parent.mails.data"
                         class="alert"
                         v-bind:class="[ mail.profile_id !== $parent.mails.profile_id ? 'alert-default':'alert-primary' ]"
                         role="alert">
                        <span class="alert-inner--text">
                            <h4>
                                <span v-if="mail.profile_id !== $parent.mails.profile_id" class="text-white float-right"
                                      :title="mail.profile.user.num">
                                    <span class="alert-inner--icon"><i class="ni ni-single-02"></i></span>
                                    {{ $root.full_name(mail.profile.user) }}
                                    -
                                    <small>
                                        {{ mail.profile.user.email }}
                                    </small>
                                </span>
                                <div v-else-if="$root.minutes_lapsed(mail.created_at) <= 1">
                                    <button v-on:click="delete_post(mail)" class="btn btn-sm btn-danger float-right">
                                        Delete
                                    </button>
                                </div>
                            </h4>
                            <p>
                                <strong class="text-underline">{{ mail.subject }}</strong><br>
                                {{ mail.message }}
                            </p>
                        </span>
                        <small class="float-right">
                            <i class="ni ni-time-alarm"></i> {{ $root.moment(mail.created_at) }}
                        </small>
                    </div>
                    <laravel-vue-pagination :limit="5" :data="$parent.mails" align="center" @pagination-change-page="$parent.get_mails">
                    </laravel-vue-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ViewMails",
        data() {
            return {
                compose: {
                    subject: null,
                    message: null,
                },
                mails: {}
            }
        },
        methods: {
            delete_post: function(mail) {
                axios.post('/students/mails/'+mail.id+'/delete')
                    .then((res) => {
                        this.$root.post_success(res.data.success);
                        this.$parent.mails = res.data.mails;
                        this.$parent.mails.profile_id = res.data.profile_id;
                        this.compose = {};
                    });
            },
            submitMail: function(e) {
                e.preventDefault();
                axios.post('/students/mails/'+this.$route.params.id+'/post', this.compose)
                    .then((res) => {
                        this.$root.post_success(res.data.success);
                        this.$parent.mails = res.data.mails;
                        this.$parent.mails.profile_id = res.data.profile_id;
                        this.compose = {};
                    });
            },
        },
    }
</script>

<style scoped>

</style>
