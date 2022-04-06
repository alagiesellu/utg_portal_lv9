<template>
    <div>
        <div v-if="user">
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
                                        <img class="img-thumbnail" :src="'/storage/profiles/'+user['img']">
                                    </td>
                                </tr>
                                <tr>
                                    <td>#</td>
                                    <th>
                                        {{user.num}}
                                    </th>
                                </tr>
                                <tr>
                                    <td>First Name</td>
                                    <th>
                                        {{user.first_name}}
                                    </th>
                                </tr>
                                <tr>
                                    <td>Middle Name</td>
                                    <th>
                                        {{user.middle_name}}
                                    </th>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <th>
                                        {{user.last_name}}
                                    </th>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <th>
                                        {{user.email}}
                                    </th>
                                </tr>
                                <tr>
                                    <td>Tel</td>
                                    <th>
                                        {{user.tel}}
                                    </th>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <th>
                                        {{user.address}}
                                    </th>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <th>
                                        {{this.$root.gender(user.gender)}}
                                    </th>
                                </tr>
                                <tr>
                                    <td>Date of Birth</td>
                                    <th>
                                        {{this.$root.format_date(user.dob)}}
                                    </th>
                                </tr>
                                <tr>
                                    <td>Nationality</td>
                                    <th>
                                        {{this.$root.country(user.nationality)}}
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
                            <button class="btn btn-sm btn-danger mb-3"
                                    v-show="$store.state.auth.hasRole('ad-19')"
                                    v-on:click="add_modal('clearance')">
                                <i class="ni ni-check-bold"></i> Issue Clearance
                            </button>
                        </div>
                        <div class="table-responsive">
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
                                <tr v-for="payment of payments"
                                    v-bind:class="[payment.cancelled_by_admin_profile_id == null ? '':'text-danger']">
                                    <td>
                                        <button class="btn btn-sm btn-primary" v-on:click="view_payment(payment)">
                                            <i class="ni ni-bold-right"></i>
                                        </button>
                                        {{$root.format_date(payment.created_at)}}
                                    </td>
                                    <td>{{payment.currency_key}} {{$root.amount(payment.amount)}}</td>
                                </tr>
                                <tr v-if="!payments.length">
                                    <td class="text-danger">No payment records..</td>
                                </tr>
                                </tbody>
                                <thead>
                                <tr>
                                    <th class="text-center" colspan="2">
                                        <h4>Term Receipts (Clearances)</h4>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Term</th>
                                    <th>Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="receipt in term_receipts"
                                    v-bind:class="[receipt.cancelled_by_admin_profile_id == null ? '':'text-danger']">
                                    <td>
                                        <button class="btn btn-sm btn-primary" v-on:click="view_receipt(receipt)">
                                            <i class="ni ni-bold-right"></i>
                                        </button>
                                        {{receipt.term.name}}
                                    </td>
                                    <td>{{receipt.currency_key}} {{$root.amount(receipt.amount)}}</td>
                                </tr>
                                <tr v-if="!term_receipts.length">
                                    <td class="text-danger">No term receipts records..</td>
                                </tr>
                                </tbody>
                                <thead>
                                <tr class="text-underline">
                                    <th>
                                        <h4>Balance</h4>
                                    </th>
                                    <th>
                                        <h4>{{currency}} {{$root.amount(balance)}}</h4>
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
                                            Amount in {{currency}} :
                                        </strong>
                                    </div>
                                    <input class="form-control" placeholder="Amount"
                                           min="0" type="number" step="0.01" v-model="form.input.amount" required>
                                </div>
                            </div>

<!--//*pass                             <div class="form-group mb-3">-->
<!--                                <div class="input-group">-->
<!--                                    <div class="input-group-prepend">-->
<!--                                        <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                                    </div>-->
<!--                                    <input class="form-control" placeholder="Password confirmation"-->
<!--                                           type="password" v-model="form.input.password"-->
<!--                                           required>-->
<!--                                </div>-->
<!--                            </div>-->

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
                                <v-select
                                    class="form-control" :options="form.terms"
                                    :reduce="term => term.id" label="name"
                                    v-model="form.input.term_id">
                                    <template #search="{attributes, events}">
                                        <input
                                            class="vs__search"
                                            v-bind="attributes"
                                            v-on="events"/>
                                    </template>
                                </v-select>
                            </div>

<!--//*pass                             <div class="form-group mb-3">-->
<!--                                <div class="input-group">-->
<!--                                    <div class="input-group-prepend">-->
<!--                                        <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                                    </div>-->
<!--                                    <input class="form-control" placeholder="Password confirmation"-->
<!--                                           type="password" v-model="form.input.password"-->
<!--                                           required>-->
<!--                                </div>-->
<!--                            </div>-->
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </modal>
            </div>
        </div>
        <div v-else>
            <div class="col-md-8">
                <div class="card shadow mb-4 mb-xl-0">
                    <div class="card-header bg-transparent">
                        <h3 class="mb-0">
                            Search Student Profile
                        </h3>
                    </div>
                    <form v-on:submit="filter_users" class="card-body col-md-12">
                        <div class="form-group">
                            <div class="input-group mb-4">
                                <input class="form-control" v-model="filter.search"
                                       placeholder="Search by MAT number" type="number">
                                <div class="input-group-append">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="ni ni-zoom-split-in"></i>
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <modal :scrollable="true" name="view" height="auto">
            <div class="modal-body" v-if="receipt">
                <button class="btn btn-sm btn-outline-danger float-right"
                        v-show="$store.state.auth.hasRole('ad-21')"
                        v-if="!receipt.cancelled_by_admin_profile_id"
                        v-on:click="cancel_this(receipt)">
                    Cancel Clearance
                </button>
                <h3>
                    <small>Academic Term: </small>{{receipt.term.name}}
                </h3>
                <h3 v-if="receipt.admin_profile_id">
                    <small>Issued By: </small>{{$root.full_name(receipt.admin_profile.user)}}
                </h3>
                <h3 class="text-danger" v-if="receipt.cancelled_by_admin_profile_id">
                    <small>Cancelled By: </small>{{$root.full_name(receipt.cancelled_by_admin_profile.user)}}
                </h3>
                <h3>
                    <small>Amount: </small>{{receipt.currency_key}} {{$root.amount(receipt.amount)}}
                </h3>
            </div>
            <div class="modal-body" v-if="payment">
                <button class="btn btn-sm btn-outline-danger float-right"
                        v-if="!payment.cancelled_by_admin_profile_id"
                        v-show="$store.state.auth.hasRole('ad-20')"
                v-on:click="cancel_this(payment)">
                    Cancel Payment
                </button>
                <h3 v-if="payment.admin_profile_id">
                    <small>Issued By: </small>{{$root.full_name(payment.admin_profile.user)}}
                </h3>
                <h3 class="text-danger" v-if="payment.cancelled_by_admin_profile_id">
                    <small>Cancelled By: </small>{{$root.full_name(payment.cancelled_by_admin_profile.user)}}
                </h3>
                <h3>
                    <small>Amount: </small>{{payment.currency_key}} {{$root.amount(payment.amount)}}
                </h3>
            </div>
        </modal>
        <modal :scrollable="true" name="cancel" height="auto">
            <h3 class="modal-header">
                <span v-if="cancel_form.type === 'c_p'">Cancel Payment</span>
                <span v-else>Cancel Clearance</span>
                <button class="btn btn-sm btn-danger float-right" v-on:click="$modal.hide('cancel')">
                    x
                </button>
            </h3>
            <div class="modal-body">
                <form @submit="cancelSubmit">
                    <fake-form-input></fake-form-input>

<!--//*pass                     <div class="form-group mb-3">-->
<!--                        <div class="input-group">-->
<!--                            <div class="input-group-prepend">-->
<!--                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>-->
<!--                            </div>-->
<!--                            <input class="form-control" placeholder="Password confirmation"-->
<!--                                   type="password" v-model="cancel_form.password"-->
<!--                                   required>-->
<!--                        </div>-->
<!--                    </div>-->

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-danger">Cancel</button>
                    </div>
                </form>
            </div>
        </modal>
    </div>
</template>

<script>
    export default {
        name: "Finance",
        data() {
            return {
                user: null,
                profile: null,
                payments: [],
                payment: null,
                receipt: null,
                term_receipts: [],
                balance: 0,
                currency: '',
                filter: {
                    search: null,
                },
                form: {
                    type: null,
                    input: {
                        term_id: null,
                        amount: null,
                        //*pass password: null,
                    },
                    terms: [],
                },
                cancel_form: {},
            }
        },
        created() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        mounted() {
            this.$store.state.page = 'Finance';
        },
        methods: {
            cancelSubmit: function(e) {
                e.preventDefault();
                axios.post(
                    window.api_url + '/admin/finance/cancel/' + (this.cancel_form.type === 'c_p' ? 'payment':'receipt'),
                    this.cancel_form
                )
                    .then((res) => {
                        this.$root.post_success(res.data.success);
                        this.$modal.hide('view');
                        this.$modal.hide('cancel');
                        this.cancel_form = {};
                        this.get_user();
                    });
            },
            cancel_this: function(obj) {
                this.cancel_form = {
                    type: (obj.term_id ? 'c_tr':'c_p'),
                    id: obj.id,
                    password: null,
                };
                this.$modal.show('cancel');
            },
            view_receipt: function(receipt) {
                this.$modal.show('view');
                this.payment = this.receipt = null;
                axios.get('/admin/finance/get/receipt/'+receipt.id)
                    .then(res => {
                        this.receipt = res.data.receipt;
                    });
            },
            view_payment: function(payment) {
                this.$modal.show('view');
                this.payment = this.receipt = null;
                axios.get('/admin/finance/get/payment/'+payment.id)
                    .then(res => {
                        this.payment = res.data.payment;
                    });
            },
            can_reg_terms: function() {
                axios.get('/admin/get/can-register-terms')
                    .then(res => {
                        this.form.terms = res.data.terms;
                        if (res.data.terms.length === 1) // if only one term in list, then assign to selected term
                            this.form.input.term_id = res.data.terms[0].id;
                    });
            },
            submitForm: function(e) {
                e.preventDefault();


                this.form.input.student_profile_id = this.profile.id;
                this.form.input.currency = this.currency;
                axios.post('/admin/finance/'+this.form.type, this.form.input)
                    .then((res) => {

                        this.$root.post_success(res.data.success);
                        this.$modal.hide(this.form.type);
                        this.form = {
                            type: null,
                            input: {
                                term_id: null,
                                amount: null,
                                password: null,
                            }
                        };
                        this.load_data(res.data);
                    });
            },
            add_modal: function (modal) {
                this.$modal.show(modal);
                this.form.type = modal;
                if (modal === 'clearance')
                    this.can_reg_terms();
            },
            fetchData: function() {
                if (this.$route.params.id === undefined)
                    this.user = null;
                else if (this.user == null)
                    this.get_user();
            },
            load_data: function (data) {
                this.balance = 0;
                this.user = data.user;
                this.profile = data.profile;
                this.currency = this.user.nationality === 'GM' ? 'GMD':'$';

                this.payments = data.profile.payments;
                for (let payment of this.payments)
                    if (payment.cancelled_by_admin_profile_id === null)
                        this.balance += payment.amount;

                this.term_receipts = data.profile.term_receipts;
                for (let term_receipt of this.term_receipts)
                    if (term_receipt.cancelled_by_admin_profile_id === null)
                        this.balance -= term_receipt.amount;
            },
            get_user: function() {
                axios.get('/admin/finance/'+this.$route.params.id)
                    .then(res => {
                        this.load_data(res.data);
                    });
            },
            filter_users: function(e) {
                e.preventDefault();
                axios.post('/admin/finance/search', {
                    search: this.filter.search,
                })
                    .then(res => {

                        this.filter.search = null;
                        this.load_data(res.data);
                        this.$router.push({name:'ad.finance',params:{id:this.user.num}});
                    });
            },
        },
    }
</script>

<style scoped>

</style>
