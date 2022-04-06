<template>
    <footer class="footer">
        <div class="row align-items-center justify-content-xl-between">
            <div class="col-xl-6">
                <div class="copyright text-center text-xl-left text-muted">
                    &copy; <a href="https://utg.edu.gm" class="font-weight-bold ml-1" target="_blank">University of The Gambia</a>
                    <a class="nav-link"><i class="ni ni-email-83"></i> info@utg.edu.gm</a>
                </div>
            </div>
        </div>
        <notifications group="alert" position="top center" width="40%"/>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        mounted() {
        },
        methods: {
          refresh_token: function () {
              const time = new Date(Number(this.$cookies.get(window.cookies_key_start+'expire_in')));
              // console.log(time);
          }
        },
    }
</script>

<style scoped>
    .gifs
    {
        position: absolute;
        top: 25%;
        left: 40%;
        width: 20%;
        text-align: center;
    }
    .gifs img
    {
        width: 100%;
    }
</style>
