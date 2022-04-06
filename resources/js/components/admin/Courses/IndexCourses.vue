<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0">
            <div class="card-header bg-transparent">
                <h3 class="mb-0">
                    <div class="float-right">
                        <router-link
                            v-show="$store.state.auth.hasRole('ad-12')"
                            :to="{name:'ad.courses',params:{ops:'create'}}"
                            class="btn btn-outline-primary btn-sm">
                            Add New Course
                        </router-link>
                    </div>
                </h3>
            </div>
            <form class="col-md-12" v-on:submit="$parent.submitCourseSearch">
                <div class="form-group">
                    <div class="input-group mb-4">
                        <input class="form-control" v-model="$parent.filter.search" placeholder="Search by course code or name..." type="text">
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
                        <th></th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Department</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="course in $parent.courses.data">
                        <td>
                            <router-link
                                :to="{name:'ad.courses',params:{id:course.id}}"
                                class="btn btn-primary btn-sm">
                                <i class="ni ni-bold-right"></i>
                            </router-link>
                        </td>
                        <th scope="row">{{course.code}}</th>
                        <th scope="row">{{course.name}}</th>
                        <th scope="row">{{course.department.name}}</th>
                    </tr>
                    </tbody>
                </table>
                <laravel-vue-pagination :limit="5" :data="$parent.courses" align="center" @pagination-change-page="$parent.get_courses"></laravel-vue-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexCourses"
    }
</script>

<style scoped>

</style>
