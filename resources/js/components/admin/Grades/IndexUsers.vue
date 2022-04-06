<template>
    <div class="row">
        <div class="col-md-8">
            <div class="card shadow mb-4 mb-xl-0">
                <div class="card-header bg-transparent">
                    <h3 class="mb-0">
                        Search Student Profile
                    </h3>
                </div>
                <form v-on:submit="$parent.filter_users" class="card-body col-md-12">
                    <div class="form-group">
                        <div class="input-group mb-4">
                            <input class="form-control" v-model="$parent.filter.search"
                                   placeholder="Search by MAT number" type="number">
                            <div class="input-group-append">
                                <button type="submit" class="btn btn-primary">
                                    <i class="ni ni-zoom-split-in"></i>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <router-link class="btn btn-primary btn-block"
                                 v-show="$store.state.auth.hasRole('ad-23.2')"
                                 :to="{name:'ad.grades.approvals'}">
                        Grade Approval
                    </router-link>
                </div>
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
