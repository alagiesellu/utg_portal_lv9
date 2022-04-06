<template>
    <div class="card shadow mb-4 mb-xl-0">
        <div class="card-header bg-transparent">
            <h3 class="mb-0">
                {{$parent.form.title}}
            </h3>
        </div>
        <div class="card-body">
            <form @submit="submitForm">
                <fake-form-input></fake-form-input>
                <div class="form-group mb-3" v-if="$parent.form.input.name !== undefined">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Name :</span>
                        </div>
                        <input class="form-control" placeholder="...."
                               type="text" v-model="$parent.form.input.name"
                               required>
                    </div>
                </div>
                <div class="form-group mb-3" v-if="$parent.form.input.active !== undefined">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                Activation
                            </span>
                        </div>
                        <select class="form-control" v-model="$parent.form.input.active" required>
                            <option value="1">Activate</option>
                            <option value="0">Deactivate</option>
                        </select>
                    </div>
                </div>
                <div class="form-group mb-3" v-if="$parent.form.input.grades !== undefined">
                    <hr>
                    <div class="row" v-for="i in $parent.form.input.grades.keys()">
                        <div class="input-group col-2">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> :</span>
                            </div>
                            <input class="form-control" placeholder="...."
                                   type="text" v-model="$parent.form.input.grades[i].grade"
                                   required>
                        </div>
                        <div class="input-group col-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Point :</span>
                            </div>
                            <input class="form-control" placeholder="...."
                                   type="text" v-model="$parent.form.input.grades[i].point"
                                   required>
                        </div>
                        <div class="input-group col-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">From :</span>
                            </div>
                            <input class="form-control" placeholder="...."
                                   type="text" v-model="$parent.form.input.grades[i].from"
                                   required>
                        </div>
                        <div class="input-group col-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">To :</span>
                            </div>
                            <input class="form-control" placeholder="...."
                                   type="text" v-model="$parent.form.input.grades[i].to"
                                   required>
                        </div>
                        <div class="col-1">
                            <button class="btn btn-danger btn-sm" type="button" v-on:click="remove_grade(i)">
                                <i class="ni ni-fat-remove"></i>
                            </button>
                        </div>
                    </div>
                    <br>
                    <button type="button" v-on:click="add_grade" class="btn btn-primary">Add</button>
                    <hr>
                </div>
                <h1 class="text-danger" v-if="$parent.$route.params.ops === 'delete'">
                    Are you sure you want to process with this delete operation?
                </h1>
<!--//*pass                 <div class="form-group mb-3" v-if="$parent.form.input.password !== undefined">-->
<!--                    <div class="input-group">-->
<!--                        <div class="input-group-prepend">-->
<!--                            <span class="input-group-text">Password :</span>-->
<!--                        </div>-->
<!--                        <input class="form-control" placeholder="...."-->
<!--                               type="password" v-model="$parent.form.input.password"-->
<!--                               required>-->
<!--                    </div>-->
<!--                </div>-->

                <div class="card-footer">
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FormGS",
        methods: {
            submitForm: function (e) {
                e.preventDefault();

                if (this.$parent.form.type === 'c') {
                axios.post('/admin/grading-systems/store', this.$parent.form.input)
                        .then((res) => {
                            this.$parent.grading_system = res.data.grading_system;
                            this.$root.post_success(res.data.success);
                            this.$router.push({name:'ad.grading-systems', params:{id:res.data.grading_system.id}});
                        })
                } else if (this.$parent.form.type === 'e') {
                axios.post('/admin/grading-systems/update', this.$parent.form.input)
                        .then((res) => {
                            this.$parent.grading_system = res.data.grading_system;
                            this.$root.post_success(res.data.success);
                            this.$router.push({name:'ad.grading-systems', params:{id:res.data.grading_system.id}});
                        })
                } else if (this.$parent.form.type === 'd') {
                axios.post('/admin/grading-systems/delete', this.$parent.form.input)
                        .then((res) => {
                            this.$parent.grading_systems = res.data.grading_systems;
                            this.$root.post_success(res.data.success);
                            this.$router.push({name:'ad.grading-systems'});
                        })
                }
            },
            add_grade: function () {
                this.$parent.form.input.grades.push({
                    grade: '',
                    point: '',
                    from: '',
                    to: '',
                });
            },
            remove_grade: function (gs) {
                let grades = [];
                for (let i of this.$parent.form.input.grades.keys())
                    if (i !== gs)
                        grades.push(this.$parent.form.input.grades[i]);
                this.$parent.form.input.grades = grades;
            },
        },
    }
</script>

<style scoped>

</style>
