<template>
    <div class="row">
        <div class="col-xl-12 order-xl-1">
            <div class="card bg-secondary shadow">
                <div class="card-header bg-white border-0">
                    <h4>
                        <i class="ni ni-folder-17"></i>
                        Uploaded Files</h4>
                    <router-link class="text-underline"
                        :to="{name:'s.classes.show',params:{id:$parent.term_class.id}}"
                        v-if="$parent.term_class.course">
                        {{$parent.term_class.course.name}}
                    </router-link>
                </div>
                <div class="card-body">

                    <table class="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="file in files">
                            <td>
                                <a :href="'/storage/'+file.url" target="_blank">
                                    <i class="ni ni-button-play"></i>
                                </a>
                            </td>
                            <td>
                                {{ file.name }}
                                <span>
                                    <span class="badge"><i class="ni ni-chart-pie-35"></i> {{ $root.file_size(file.size) }}</span>
                                    <span class="badge"><i class="ni ni-single-02"></i> {{ $root.full_name(file.profile.user) }}</span>
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
        props: ['class_registrations'],
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
        mounted() {
            // console.log(this.$refs)
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
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
