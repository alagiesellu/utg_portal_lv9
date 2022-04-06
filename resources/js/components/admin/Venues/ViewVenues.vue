<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0" id="view">
            <div class="card-header bg-transparent">
                <h3 class="mb-0">
                    <div class="float-left">
                        <router-link
                            :to="{name:'ad.venues'}"
                            class="btn btn-outline-primary btn-sm">
                            <i class="ni ni-bold-left"></i> Back
                        </router-link>
                    </div>
                    <div class="float-right">
                        <router-link
                            :to="{name:'ad.venues', params:{id:$parent.venue.id,ops:'edit'}}"
                            v-show="$store.state.auth.hasRole('ad-10')"
                            class="btn btn-outline-warning btn-sm">
                            Edit
                        </router-link>
                        <router-link
                            :to="{name:'ad.venues', params:{id:$parent.venue.id,ops:'delete'}}"
                            v-show="$store.state.auth.hasRole('ad-10')"
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
                        <td>Name</td>
                        <th>{{$parent.venue['name']}}</th>
                    </tr>
                    <tr>
                        <td>Type</td>
                        <th>{{$parent.venue['type']}}</th>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <th>{{$parent.venue['description']}}</th>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <th>{{$parent.venue['address']}}</th>
                    </tr>
                    <tr>
                        <td>Capacity</td>
                        <th>{{$parent.venue['capacity']}}</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ViewVenues"
    }
</script>

<style scoped>

</style>
