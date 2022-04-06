<template>
    <div class="col-12">
        <div class="card shadow mb-4 mb-xl-0">
            <h3 class="card-header bg-transparent">
                <span v-text="$parent.form.title"></span>
            </h3>
            <div class="card-body">
                <form @submit="$parent.submitForm">
                    <fake-form-input></fake-form-input>

                    <div class="form-group mb-3" v-if="$parent.form.input.name !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-align-left-2"></i></span>
                            </div>
                            <input class="form-control" placeholder="Name"
                                   type="text" name="name" v-model="$parent.form.input.name"
                                   required>
                        </div>
                    </div>
                    <div class="form-group" v-if="$parent.form.input.description !== undefined">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-align-left-2"></i></span>
                            </div>
                            <input class="form-control" placeholder="Description"
                                   type="text" name="description" v-model="$parent.form.input.description"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.email !== undefined">
                        <div class="input-group" ref="email">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                            </div>
                            <input class="form-control" placeholder="Email"
                                   type="email" name="email" v-model="$parent.form.input.email"
                                   required>
                        </div>
                    </div>
                    <div class="form-group mb-3" v-if="$parent.form.input.tel !== undefined">
                        <div class="input-group" ref="tel">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-mobile-button"></i></span>
                            </div>
                            <input class="form-control" placeholder="Telephone Number: 1234567"
                                   type="tel" name="tel" v-model="$parent.form.input.tel"
                                   pattern="220[0-9]{7}"
                                   required>
                        </div>
                    </div>
                    <div class="row" v-if="!$parent.form.input.is_admin">
                        <div class="col-md-4">
                            <div class="custom-control custom-checkbox mb-3" v-if="$parent.form.input.is_major !== undefined">
                                <input class="custom-control-input" id="is_major" type="checkbox"
                                       v-model="$parent.form.input.is_major">
                                <label class="custom-control-label" for="is_major">Is a Major</label>
                            </div>
                            <div class="custom-control custom-checkbox mb-3" v-if="$parent.form.input.has_rotation !== undefined">
                                <input class="custom-control-input" id="has_rotation" type="checkbox"
                                       v-model="$parent.form.input.has_rotation">
                                <label class="custom-control-label" for="has_rotation">Has Rotation</label>
                            </div>
                        </div>
                        <div class="col-md-12 row" v-if="$parent.form.input.is_major">
                            <div class="form-group col-6">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">GMD</span>
                                    </div>
                                    <input class="form-control" placeholder="Local Students fees"
                                           type="number" step="0.01" v-model="$parent.form.input.fee_per_term.local"
                                           required>
                                </div>
                            </div>
                            <div class="form-group col-6">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">USD</span>
                                    </div>
                                    <input class="form-control" placeholder="Foreign Students fees"
                                           type="number" step="0.01" v-model="$parent.form.input.fee_per_term.foreign"
                                           required>
                                </div>
                            </div>
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
        name: "FormDepartments"
    }
</script>

<style scoped>

</style>
