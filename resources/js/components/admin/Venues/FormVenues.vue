<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0" id="view">
            <div class="card-header bg-transparent">
                <router-link
                    :to="{name:'ad.venues'}"
                            class="btn btn-outline-primary btn-sm">
                            <i class="ni ni-bold-left"></i> Back
                </router-link>
                <span v-html="$parent.form.title"></span>
            </div>
            <div class="card-body">
                <form @submit="$parent.submitForm">
                    <fake-form-input></fake-form-input>
                    <div class="form-group mb-3">
                        <div class="input-group" v-if="$parent.form.input.name !== undefined">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-align-left-2"></i></span>
                            </div>
                            <input class="form-control" placeholder="venue name"
                                   type="text" v-model="$parent.form.input.name"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <div class="input-group" v-if="$parent.form.input.address !== undefined">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-align-left-2"></i></span>
                            </div>
                            <input class="form-control" placeholder="venue address"
                                   type="text" v-model="$parent.form.input.address"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <div class="input-group" v-if="$parent.form.input.capacity !== undefined">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-align-left-2"></i></span>
                            </div>
                            <input class="form-control" placeholder="venue capacity"
                                   type="number" v-model="$parent.form.input.capacity"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.description !== undefined">
                        <label></label>
                        <textarea
                            v-model="$parent.form.input.description" required
                            rows="4" class="form-control form-control-alternative" placeholder="venue description ..."></textarea>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.type !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-building"></i></span>
                            </div>
                            <select class="form-control" v-model="$parent.form.input.type" required>
                                <option value="auditorium">Auditorium</option>
                                <option value="class">Class</option>
                                <option value="lab">Lab</option>
                            </select>
                        </div>
                    </div>
<!--//*pass                     <div class="form-group mb-3">-->
<!--                        <div class="input-group">-->
<!--                            <div class="input-group-prepend">-->
<!--                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                            </div>-->
<!--                            <input class="form-control" placeholder="Password confirmation"-->
<!--                                   type="password" v-model="$parent.form.input.password"-->
<!--                                   required>-->
<!--                        </div>-->
<!--                    </div>-->

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FormVenues"
    }
</script>

<style scoped>

</style>
