<template>
    <div class="card bg-secondary shadow">
        <div class="card-header ">
            Class Assessments
            <div class="float-right">
                <button v-on:click="new_assessment"
                        class="btn btn-link">
                    New
                </button>
            </div>
        </div>
        <div class="card-body">
            <table class="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="ass in assessments">
                    <td>
                        <router-link :to="{name:'ac.classes.assessments', params:{id:$route.params.id,ass:ass.id}}"
                                     class="btn btn-primary btn-sm">
                            <i class="ni ni-bold-right"></i>
                        </router-link>
                    </td>
                    <td>{{ass.name}}</td>
                    <td>{{$root.format_date(ass.date)}}</td>
                    <td>{{ass.score}}</td>
                </tr>
                <tr>
                    <th colspan="3" class="text-right">Total</th>
                    <td>{{total}} / 100</td>
                </tr>
                </tbody>
            </table>
            <modal :scrollable="true" name="form-modal" height="auto">
                <div class="modal modal-content">
                    <h2 class="modal-header">
                        {{form.title}}
                    </h2>
                    <div class="modal-body">
                        <form v-on:submit="submitForm">
                            <fake-form-input></fake-form-input>
                            <div class="form-group mb-3" v-if="form.input.name !== undefined">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Name :</span>
                                    </div>
                                    <input class="form-control" placeholder="...."
                                           type="text" v-model="form.input.name"
                                           required>
                                </div>
                            </div>
                            <div class="form-group mb-3" v-if="form.input.date !== undefined">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Start Time :</span>
                                    </div>
                                    <input type="date" class="form-control" v-model="form.input.date" required>
                                </div>
                            </div>
                            <div class="form-group mb-3" v-if="form.input.info !== undefined">
                                <label></label>
                                <textarea
                                    v-model="form.input.info" required
                                    rows="4" class="form-control form-control" placeholder="Assessments info..."></textarea>
                            </div>
                            <div class="form-group col-8" v-if="form.input.score !== undefined">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Score :</span>
                                    </div>
                                    <input class="form-control" placeholder="...."
                                           type="text" v-model="form.input.score"
                                           required>
                                </div>
                            </div>
<!--//*pass                             <div class="form-group mb-3">-->
<!--                                <div class="input-group">-->
<!--                                    <div class="input-group-prepend">-->
<!--                                        <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                                    </div>-->
<!--                                    <input class="form-control" placeholder="Password confirmation"-->
<!--                                           type="password" v-model="form.input.password"-->
<!--                                           required-->
<!--                                    >-->
<!--                                </div>-->
<!--                            </div>-->
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </form>
                    </div>
                </div>
            </modal>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ViewAC"
    }
</script>

<style scoped>

</style>
