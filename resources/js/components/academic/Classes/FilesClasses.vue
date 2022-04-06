<template>
    <div class="row">
        <div class="col-xl-12 order-xl-1">
            <div class="card bg-secondary shadow">
                <div class="card-header bg-white border-0">
                    <h3>
                        <i class="ni ni-folder-17"></i>
                        <router-link class=""
                                     :to="{name:'ac.classes.show',params:{id:$parent.term_class.id}}"
                                     v-if="$parent.term_class.course">
                            {{$parent.term_class.course.name}}
                        </router-link>
                        Uploaded Files
                        <div class="float-right">
                            <button
                                v-on:click="$parent.$router.back()"
                                class="btn btn-outline-primary btn-sm">
                                <i class="ni ni-bold-left"></i> Back
                            </button>
                        </div>
                    </h3>
                    <div class="progress-wrapper">
                        <div class="progress-info">
                            <div class="progress-label">
                                <span>Storage Capacity</span>
                            </div>
                            <div class="progress-percentage">
                                <small>Used {{ file_storage }} MB out of {{max_file_storage}} MB</small>
                            </div>
                        </div>
                        <div class="progress">
                            <div class="progress-bar bg-default" role="progressbar"  aria-valuemin="0" aria-valuemax="100"
                                 :aria-valuenow="(file_storage/max_file_storage)*100"
                                 v-bind:style="{ width: (file_storage/max_file_storage)*100+'%' }"></div>
                        </div>
                    </div>
                </div>
                <div class="card-body">

                    <vue-dropzone
                        ref="dropzone"
                        id="dropzone"
                        :options="dropzoneOptions"
                        :duplicateCheck="true"
                        @vdropzone-success="dropzoneComplete">
                    </vue-dropzone>

                    <table class="table">
                        <thead>
                        <tr>
                            <th>Files</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="file in files">
                            <td>
                                <a :href="'/storage/'+file.url" target="_blank"
                                   class="font-weight-bold text-underline">
                                    {{ file.name }}
                                </a>
                                <span>
                                    <span class="badge"><i class="ni ni-chart-pie-35"></i> {{ $root.file_size(file.size) }}</span>
                                    <span class="badge"><i class="ni ni-single-02"></i> {{ $root.full_name(file.profile.user) }}</span>
                                    <button
                                        v-on:click="remove_file(file)"
                                        class="btn btn-sm btn-link text-danger">
                                        Remove
                                    </button>
                                </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vue2Dropzone from 'vue2-dropzone';
    import 'vue2-dropzone/dist/vue2Dropzone.min.css';
    export default {
        name: "FilesClasses",
        components: {
            vueDropzone: vue2Dropzone
        },
        data() {
            return {
                file_storage: 0,
                max_file_storage: window.options.file_storage,
                files: {},
                dropzoneOptions: {
                    url: window.api_url + '/academic/classes/uploads/'+this.$route.params.id,
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + window.Save.get('token'),
                    },
                    chunking: false,
                    acceptedFiles: 'image/*,.pdf,.doc,.docx,.odt,.pdf,.xls,.xlsx,.ods,.ppt,.pptx,.txt',
                    thumbnailWidth: 150,
                    maxFilesize: 50,
                }
            }
        },
        created () {
            this.fetchData();
            this.$parent.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            remove_file: function(file) {
                axios.post('/academic/classes/files/'+file.id+'/delete')
                    .then((res) => {
                        this.$root.post_success(res.data.success);
                        this.load_data(res.data.files);
                    });
            },
            dropzoneComplete: function(file, res) {

                if (res.errors)
                    this.$root.post_errors(res.errors);
                else {
                    this.load_data(res.files);
                    this.$root.post_success(res.success);
                }
            },
            fetchData: function() {
                this.get_files();
            },
            get_files: function(page=1) {
                axios.get('/academic/classes/'+this.$route.params.id+'/files?page='+page)
                    .then((res) => {
                        this.load_data(res.data.files);
                    });
            },
            load_data: function (files) {
                this.file_storage = 0;
                this.files = files;
                for (let file of this.files)
                    this.file_storage += file.size;
                this.file_storage = (this.file_storage / 1048576).toFixed(2);
            }
        },
    }
</script>

<style scoped>
</style>
