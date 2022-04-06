<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0" id="view">
            <div class="card-header bg-transparent">
                <h3 class="mb-0">
                    <div class="float-left">
                        <router-link
                            :to="{name:'ad.courses'}"
                            class="btn btn-outline-primary btn-sm">
                            <i class="ni ni-bold-left"></i> Back
                        </router-link>
                    </div>
                    <div class="float-right">
                        <router-link
                            v-show="$store.state.auth.hasRole('ad-12')"
                            :to="{name:'ad.courses',params:{id:$parent.course.id,ops:'edit'}}"
                            class="btn btn-outline-warning btn-sm">
                            Edit
                        </router-link>
                        <router-link
                            v-show="$store.state.auth.hasRole('ad-12')"
                            :to="{name:'ad.courses',params:{id:$parent.course.id,ops:'delete'}}"
                            class="btn btn-outline-danger btn-sm">
                            Delete
                        </router-link>
                    </div>
                </h3>
            </div>
            <div class="table-responsive">
                <table class="table align-items-center table-flush">
                    <tbody>
                    <tr>
                        <td>Code</td>
                        <th>{{$parent.course['code']}}</th>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <th>{{$parent.course['name']}}</th>
                    </tr>
                    <tr>
                        <td>Department</td>
                        <th>{{$parent.course['department'].name}}</th>
                    </tr>
                    <tr>
                        <td>Credit Hours</td>
                        <th>{{$parent.course['credit_hours']}}</th>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-body">
                <small class="text-underline">Description</small>
                <p>{{$parent.course['description']}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ViewCourses"
    }
</script>

<style scoped>

</style>
