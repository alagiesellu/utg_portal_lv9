<template>
    <!-- Modals -->
    <modal  name="cam-studio" height="auto" @before-open="beforeOpen">
        <h2 class="modal-header"><i class="ni ni-camera-compact"> Cam Studio</i></h2>
        <div class="modal-body" v-if="user">
            <div class="row">
                <div class="col-md-6">
                    <h2>Current Camera</h2>
                    <code v-if="device">{{ device.label }}</code>
                    <div class="border">
                        <vue-web-cam
                            ref="webcam"
                            :device-id="deviceId"
                            width="100%"
                            @started="onStarted"
                            @stopped="onStopped"
                            @error="onError"
                            @cameras="onCameras"
                            @camera-change="onCameraChange"
                        />
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <select v-model="camera">
                                <option>-- Select Device --</option>
                                <option
                                    v-for="device in devices"
                                    :key="device.deviceId"
                                    :value="device.deviceId"
                                >{{ device.label }}</option>
                            </select>
                        </div>
                        <div class="col-md-12">
                            <button type="button" class="btn btn-primary" @click="onCapture">Capture Photo</button>
                            <button type="button" class="btn btn-danger" @click="onStop">Stop Camera</button>
                            <button type="button" class="btn btn-success" @click="onStart">Start Camera</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <h2>Captured Image</h2>
                    <figure class="figure">
                        <img :src="img" class="img-responsive" />
                    </figure>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
    import WebCam from 'vue-web-cam';
    export default {
        name: "CamStudio",
        components: {
            "vue-web-cam": WebCam
        },
        data() {
            return {
                img: null,
                camera: null,
                deviceId: null,
                devices: [],
                user: null,
            }
        },
        computed: {
            device: function() {
                return this.devices.find(n => n.deviceId === this.deviceId);
            }
        },
        watch: {
            camera: function(id) {
                this.deviceId = id;
            },
            devices: function() {
                // Once we have a list select the first one
                const [first, ...tail] = this.devices;
                if (first) {
                    this.camera = first.deviceId;
                    this.deviceId = first.deviceId;
                }
            }
        },
        methods: {
            onCapture() {
                this.img = this.$refs.webcam.capture();
            },
            onStarted(stream) {
                // console.log("On Started Event", stream);
            },
            onStopped(stream) {
                // console.log("On Stopped Event", stream);
            },
            onStop() {
                this.$refs.webcam.stop();
            },
            onStart() {
                this.$refs.webcam.start();
            },
            onError(error) {
                // console.log("On Error Event", error);
            },
            onCameras(cameras) {
                this.devices = cameras;
                // console.log("On Cameras Event", cameras);
            },
            onCameraChange(deviceId) {
                this.deviceId = deviceId;
                this.camera = deviceId;
                // console.log("On Camera Change Event", deviceId);
            },
            beforeOpen: function(event) {
                this.user = event.params.user;
            },
            uploadFile: function() {
                if (this.form.input.image.substr(5,5) === 'image') {
                    axios.post(window.api_url + '/users/upload', {image: this.form.input.image, user_id: this.user.id})
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
