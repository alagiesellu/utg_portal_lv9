<template>
    <nav class="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
        <div class="container-fluid">
            <!-- Brand -->
            <a class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">{{this.$store.state.page}}</a>
            <!-- User -->
            <ul class="navbar-nav align-items-center d-none d-md-flex">

                <layout-navbar-profile></layout-navbar-profile>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Navbar",
        mounted() {
            // this.$root.should_be_in();
            // this.$root.should_be_here();
        },
    }
</script>

<style scoped>

</style>
