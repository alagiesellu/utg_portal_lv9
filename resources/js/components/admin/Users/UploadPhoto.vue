<template>
    <!-- Modals -->
    <modal  name="profile-upload" height="auto" :draggable="true" @before-open="beforeOpen">
        <h2 class="modal-header">
            <i class="ni ni-cloud-upload-96"> Update Profile</i>
        </h2>
        <div class="modal-body">
            <div class="row">
                <div class="col-12">
                    <img :src="form.input.image" class="img-thumbnail">
                    <hr>
                    <div class="row">
                        <input type="file" v-on:change="onFileChange" class="form-control col-8">
                        <button class="btn btn-success col-4" @click="uploadFile">Upload</button>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
    export default {
        name: "UploadPhoto",
        data() {
            return {
                form: {
                    input: {
                        image: '',
                    },
                },
                user: {},
            }
        },
        methods: {
            beforeOpen: function(event) {
                this.user = event.params.user;
            },
            onFileChange: function(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage: function(file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.form.input.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            uploadFile: function() {
                //console.log(this.form.input.image)
                if (this.form.input.image.substr(5, 5) === 'image') {
                    axios.post('/admin/users/upload', {image: this.form.input.image, user_id: this.user.id})
                        .then(res => {
                            this.$root.post_success(res.data.success);
                            this.$parent.$parent.user.img = res.data.img;
                            this.$modal.hide('profile-upload');
                        });
            } else
                    this.$root.post_errors({ msg: ["Invalid! Must select a image."] });
            },
        },
    }
</script>

<style scoped>

</style>
