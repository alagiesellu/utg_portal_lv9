<template>

    <div class="row">
        <div class="col-md-12">
            <h1 class="text-white">
                <i class="ni ni-hat-3"></i>
                Admin Portal Dashboard
            </h1>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
            }
        },
        mounted() {
            this.$store.state.page = '';
        }
    }
</script>

<style scoped>

</style>
