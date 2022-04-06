<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0">
            <div class="card-header bg-transparent">
                <h3 class="mb-0">
                    <div class="float-right">
                        <router-link
                            v-show="$store.state.auth.hasRole('ad-13')"
                            :to="{name:'ad.users',params:{ops:'create'}}"
                            class="btn btn-sm btn-outline-primary mb-3" data-toggle="modal" data-target="#modal-term">
                            Add New user
                        </router-link>
                    </div>
                </h3>
            </div>
            <form v-on:submit="$parent.filter_users" class="col-md-12">
                <div class="form-group">
                    <div class="input-group mb-4">
                        <input class="form-control" v-model="$parent.filter.search" placeholder="Student or Staff Number, Email, or Names..." type="text">
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-primary">
                                <i class="ni ni-zoom-split-in"></i>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="table-responsive">
                <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Profiles</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="user in $parent.users.data">
                        <td>
                            <router-link :to="{name:'ad.users', params:{id:user.id}}"
                                class="btn btn-primary btn-sm">
                                <i class="ni ni-bold-right"></i>
                            </router-link>
                        </td>
                        <th>{{user.num}}</th>
                        <th>{{$root.full_name(user)}}</th>
                        <th>
                            <span class="badge" v-for="profile in user.profiles"
                                  v-bind:class="[profile.id==user.profile_id?'badge-default':'badge-light']">
                                {{$root.profile_type(profile.type)}}
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <laravel-vue-pagination :limit="5" :data="$parent.users" align="center" @pagination-change-page="$parent.get_users"></laravel-vue-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexUsers",
    }
</script>

<style scoped>

</style>
