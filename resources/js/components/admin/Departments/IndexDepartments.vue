<template>
    <div class="col-12">
        <div class="card shadow">
            <div class="card-header border-0">
                <div class="clearfix">
                    <div class="float-left">
                        <router-link
                            v-if="$parent.department.department_id"
                            :to="{name:'ad.departments',params:{id:$parent.department.department_id}}"
                            class="btn btn-sm btn-outline-primary">
                            <i class="ni ni-bold-left"></i> Back
                        </router-link>
                    </div>
                    <div class="float-right">
                        <router-link
                            class="btn btn-sm btn-warning"
                            v-show="$store.state.auth.hasRole('ad-11')"
                            :to="{name:'ad.departments',params:{id:$parent.department.id,ops:'edit'}}">
                            Edit
                        </router-link>
                        <router-link
                            class="btn btn-sm btn-danger"
                            v-show="$store.state.auth.hasRole('ad-11')"
                            :to="{name:'ad.departments',params:{id:$parent.department.id,ops:'delete'}}">
                            Delete
                        </router-link>
                    </div>
                </div>
                <h2 class="mb-2">
                    {{$parent.department.name}}
                </h2>
                <button class="btn btn-sm btn-outline-dark">
                    <i class="ni ni-email-83"></i> {{$parent.department.email}}
                </button>
                <button class="btn btn-sm btn-outline-dark">
                    <i class="ni ni-mobile-button"></i> +{{$parent.department.tel}}
                </button>
                <button class="btn btn-sm btn-outline-dark" v-if="$parent.department.has_rotation">
                    <i class="ni ni-check-bold"></i> Has Rotation
                </button>
                <button class="btn btn-sm btn-outline-dark" v-if="$parent.department.is_admin">
                    <i class="ni ni-check-bold"></i> Is Admin
                </button>
                <div v-if="$parent.department.is_major">
                    <br>
                    <button class="btn btn-sm btn-outline-dark">
                        <i class="ni ni-check-bold"></i> Is Major
                    </button>
                    <button class="btn btn-sm btn-outline-dark">
                        GMD{{$parent.department.fee_per_term.local}} for local students
                    </button>
                    <button class="btn btn-sm btn-outline-dark">
                        USD{{$parent.department.fee_per_term.foreign}} for international students
                    </button>
                </div>
                <hr>
                <p class="mb-2">
                    {{$parent.department.description}}
                </p>
            </div>
            <div class="table-responsive">
                <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">
                            Departments Under <strong>{{$parent.department.name}}</strong>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="department of $parent.department.departments">
                        <td>
                            <router-link :to="{name:'ad.departments',params:{id:department.id}}"
                            class="btn btn-sm btn-primary">
                                <i class="ni ni-bold-right"></i>
                            </router-link>
                        </td>
                        <th>
                            {{department.name}}
                        </th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <router-link
                                class="btn btn-sm btn-outline-primary"
                                v-show="$store.state.auth.hasRole('ad-11')"
                                :to="{name:'ad.departments',params:{id:$parent.department.id,ops:'create'}}">
                                Add Department
                            </router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer py-4">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexDepartments"
    }
</script>

<style scoped>

</style>
