<template>

    <modal :scrollable="true" name="view-roles" height="auto" @before-open="beforeOpen">
        <div class="modal-header">
            <h3 class="modal-title" id="modal-title-create">Roles for <strong>{{group.name}}</strong></h3>
        </div>
        <div class="modal-body">
            <li v-for="role in group.roles">{{window_roles[role]}}</li>
        </div>
    </modal>

</template>

<script>
    export default {
        name: "ViewRoles",
        data() {
            return {
                group: {},
                window_roles: window.roles,
            }
        },
        methods: {
            beforeOpen: function (event) {
                this.group = event.params.group;
            },
        },
    }
</script>

<style scoped>

</style>
