<template>
    <div class="row">
        <div class="col-6">
            <div class="card shadow">
                <div class="card-header bg-transparent">
                    <h3 class="mb-0">
                        <div class="float-left">
                            <router-link :to="{name:'ad.finance'}"
                                         class="btn btn-sm btn-outline-primary mb-3">
                                <i class="ni ni-bold-left"></i> Back
                            </router-link>
                        </div>
                    </h3>
                </div>
                <div class="table-responsive">
                    <table class="table align-items-center table-flush">
                        <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <img class="img-thumbnail" :src="'/storage/profiles/'+$parent.user['img']">
                            </td>
                        </tr>
                        <tr>
                            <td>#</td>
                            <th>
                                {{$parent.user.num}}
                            </th>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <th>
                                {{$parent.user.first_name}}
                            </th>
                        </tr>
                        <tr>
                            <td>Middle Name</td>
                            <th>
                                {{$parent.user.middle_name}}
                            </th>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <th>
                                {{$parent.user.last_name}}
                            </th>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <th>
                                {{$parent.user.email}}
                            </th>
                        </tr>
                        <tr>
                            <td>Tel</td>
                            <th>
                                {{$parent.user.tel}}
                            </th>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <th>
                                {{$parent.user.address}}
                            </th>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <th>
                                {{this.$root.gender($parent.user.gender)}}
                            </th>
                        </tr>
                        <tr>
                            <td>Date of Birth</td>
                            <th>
                                {{this.$root.format_date($parent.user.dob)}}
                            </th>
                        </tr>
                        <tr>
                            <td>Nationality</td>
                            <th>
                                {{this.$root.country($parent.user.nationality)}}
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="card shadow">
                <div class="card-header">
                    <button class="btn btn-sm btn-primary mb-3"
                            v-show="$store.state.auth.hasRole('ad-18')"
                    v-on:click="add_modal('payment')">
                        <i class="ni ni-money-coins"></i> Record Payment
                    </button>
                    <button class="btn btn-sm btn-outline-primary mb-3"
                            v-show="$store.state.auth.hasRole('ad-19')"
                            v-on:click="add_modal('clearance')">
                        <i class="ni ni-check-bold"></i> Issue Clearance
                    </button>
                </div>
                <div class="table-responsive" v-if="$parent.profile">
                    <table class="table align-items-center table-flush">
                        <thead>
                        <tr>
                            <th class="text-center" colspan="2">
                                <h4>Payments</h4>
                            </th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="payment in $parent.profile.payments">
                            <td>{{$root.format_date(payment.created_at)}}</td>
                            <td>{{payment.currency_key}} {{$root.amount(payment.amount)}}</td>
                        </tr>
                        <tr v-if="!$parent.profile.payments.length">
                            <td class="text-danger">No payment records..</td>
                        </tr>
                        </tbody>
                        <thead>
                        <tr>
                            <th class="text-center" colspan="2">
                                <h4>Term Receipts</h4>
                            </th>
                        </tr>
                        <tr>
                            <th>Term</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="receipt in $parent.profile.term_receipts">
                            <td>{{receipt.term.name}}</td>
                            <td>{{receipt.currency_key}} {{$root.amount(receipt.amount)}}</td>
                        </tr>
                        <tr v-if="!$parent.profile.term_receipts.length">
                            <td class="text-danger">No term receipts records..</td>
                        </tr>
                        </tbody>
                        <thead>
                        <tr class="text-underline">
                            <th>
                                <h4>Balance</h4>
                            </th>
                            <th>
                                <h4>{{$parent.currency}} {{$root.amount($parent.balance)}}</h4>
                            </th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
        <modal :scrollable="true" name="payment" height="auto">
            <h2 class="modal-header">Record Payment</h2>
            <div class="modal-body">
                <form @submit="submitForm">
                    <fake-form-input></fake-form-input>

                    <div class="form-group mb-3">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <strong class="input-group-text text-danger">
                                    Amount in {{$parent.currency}} :
                                </strong>
                            </div>
                            <input class="form-control" placeholder="Amount"
                                   min="0" type="number" step="0.01" v-model="form.input.amount" required>
                        </div>
                    </div>

<!--//*pass                     <div class="form-group mb-3">-->
<!--                        <div class="input-group">-->
<!--                            <div class="input-group-prepend">-->
<!--                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                            </div>-->
<!--                            <input class="form-control" placeholder="Password confirmation"-->
<!--                                   type="password" v-model="form.input.password"-->
<!--                                   required>-->
<!--                        </div>-->
<!--                    </div>-->

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </modal>
        <modal :scrollable="true" name="clearance" height="auto">
            <h2 class="modal-header">Issue Clearance</h2>
            <div class="modal-body">
                <form @submit="submitForm">
                    <fake-form-input></fake-form-input>

                    <div class="form-group mb-3">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    Amount in {{$parent.currency}} :
                                </span>
                            </div>
                            <input class="form-control" placeholder="Amount"
                                   type="number" step="0.01" v-model="form.input.amount"
                                   required>
                        </div>
                    </div>

<!--//*pass                     <div class="form-group mb-3">-->
<!--                        <div class="input-group">-->
<!--                            <div class="input-group-prepend">-->
<!--                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                            </div>-->
<!--                            <input class="form-control" placeholder="Password confirmation"-->
<!--                                   type="password" v-model="form.input.password"-->
<!--                                   required>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </modal>
    </div>
</template>

<script>
    export default {
        name: "ViewUsers",
        data() {
            return {
                form: {
                    type: null,
                    input: {
                        amount: null,
                        //*pass password: null,
                    }
                },
            }
        },
        methods: {
            submitForm: function(e) {
                e.preventDefault();

                if (this.form.type === 'payment')
                {
                    this.form.input.student_profile_id = this.$parent.profile.id;
                    this.form.input.currency = this.$parent.currency;
                    axios.post('/admin/finance/payment', this.form.input)
                        .then((res) => {

                            this.$root.post_success(res.data.success);
                            this.$modal.hide(this.form.type);
                            this.$parent.load_data(res.data);
                        });
                }
                else
                {
                    axios.post('/admin/finance/clearance', this.form.input)
                        .then((res) => {

                            this.$root.post_success(res.data.success);
                            this.profile = res.data.profile;
                            this.$modal.hide(this.form.type);
                        });
                }
            },
            add_modal: function (modal) {
                this.$modal.show(modal);
                this.form.type = modal;
            },
            add_payment: function () {

            },
            add_clearance: function () {

            },
        },
    }
</script>

<style scoped>

</style>
