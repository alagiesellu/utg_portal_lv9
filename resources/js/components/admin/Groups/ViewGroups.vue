<template>
    <div class="col-md-12">
        <div class="card shadow mb-4 mb-xl-0" id="view">
            <div class="card-header bg-transparent">
                <h3 class="mb-0">
                    <div class="float-left">
                        <router-link :to="{name:'ad.groups'}"
                            class="btn btn-outline-primary btn-sm">
                            <i class="ni ni-bold-left"></i> Back
                        </router-link>
                    </div>
                    <div class="float-right">
                        <router-link :to="{name:'ad.groups', params:{id:$parent.group.id,ops:'edit'}}"
                                     v-show="$store.state.auth.hasRole('ad-7')"
                                     class="btn btn-outline-warning btn-sm">
                            Edit
                        </router-link>
                        <router-link :to="{name:'ad.groups', params:{id:$parent.group.id,ops:'delete'}}"
                                     v-show="$store.state.auth.hasRole('ad-7')"
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
                        <th>{{$parent.group['name']}}</th>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <th>{{$parent.group['description']}}</th>
                    </tr>
                    <tr>
                        <td>Department</td>
                        <th>{{$parent.group['department'].name}}</th>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-body">
                <form v-on:submit="submitForm">
                    <fake-form-input></fake-form-input>

                    <div class="form-group mb-3">
                        <span class="badge badge-dark" v-for="role in availableTags" v-show="role.display">
                            {{role.text}}
                        </span>
                    </div>
                    <div class="form-group mb-3">
                        <vue-tags-input
                            placeholder="Assign role"
                            :add-only-from-autocomplete="true"
                            v-model="tag"
                            :tags="tags"
                            :autocomplete-items="filteredItems"
                            @tags-changed="newTags => tags = newTags"
                        ></vue-tags-input>
                    </div>
<!--//*pass                     <div class="form-group mb-3"-->
<!--                         v-show="$store.state.auth.hasRole('ad-7')">-->
<!--                        <div class="input-group">-->
<!--                            <input class="form-control" placeholder="Password confirmation"-->
<!--                                   type="password" v-model="password" required>-->
<!--                            <div class="input-group-prepend">-->
<!--                                <button type="submit" class="btn btn-sm btn-primary">Save Roles</button>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import VueTagsInput from '@johmun/vue-tags-input';
    export default {
        name: "ViewGroups",
        components: {
            VueTagsInput,
        },
        data() {
            return {
                tag: '',
                availableTags: {},
                tags: [],
                password: '',
                autocompleteItems: [],
            }
        },
        watch: {
            'tags': 'loadAvailableRoles'
        },
        mounted() {
            this.loadRoles();
        },
        computed: {
            filteredItems() {
                return this.autocompleteItems.filter(i => {
                    return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
                });
            },
        },
        methods: {
            loadAvailableRoles: function() {
                this.availableTags = {};

                for (let role in window.roles)
                    this.availableTags[role] = {text:window.roles[role], display:true};

                for (let tag of this.tags)
                    this.availableTags[tag.i].display = false;
            },
            loadRoles: function() {
                this.tags = [];
                for (let role of this.$parent.group.roles)
                    this.tags.push({text:window.roles[role],i:role});

                for (let role in window.roles)
                    this.autocompleteItems.push({text:window.roles[role],i:role});
            },
            submitForm: function (e) {
                e.preventDefault();
                let form = {
                    roles: [],
                    password: this.password,
                    group: this.$parent.group.id,
                };

                for (let tag of this.tags)
                    form.roles.push(tag.i);
                axios.post('/admin/groups/store-roles', form)
                    .then(res => {
                        this.$root.post_success(res.data.success);
                        this.password = null;
                    });
            }
        },
    }
</script>

<style scoped>

</style>
