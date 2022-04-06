<template>
        <li class="nav-item dropdown">
            <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" :src="'/'+this.$store.state.auth.img">
                </span>
                    <div class="media-body ml-2 d-none d-lg-block">
                        <span class="mb-0 text-sm  font-weight-bold">{{ this.$store.state.auth.name }}</span>
                    </div>
                </div>
            </a>
            <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                <router-link class="dropdown-item" :to="{name:this.$store.state.auth.type+'.profile'}">
                    <i class="ni ni-single-02"></i>
                    <span>My profile</span>
                </router-link>
                <div class="dropdown-divider"></div>
                <button v-on:click="$root.logout" class="dropdown-item">
                    <i class="ni ni-user-run"></i>
                    Logout
                </button>
            </div>
        </li>
</template>

<script>
    export default {
        name: "NavbarProfile",
    }
</script>

<style scoped>

</style>
