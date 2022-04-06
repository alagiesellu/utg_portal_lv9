<template>
    <div>
        <div class="row">
            <div class="col-12">
                <div class="card shadow">
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
        </div>
    </div>
</template>

<script>
    export default {
        name: "Finance",
        data() {
            return {
                payments: [],
                payment: null,
                receipt: null,
                term_receipts: [],
                balance: 0,
                currency: '',
            }
        },
        created() {
            this.get_user();
        },
        watch: {
            '$route': 'get_user'
        },
        methods: {
            view_receipt: function(receipt) {
                this.$modal.show('view');
                this.payment = this.receipt = null;
                axios.get('/students/finance/get/receipt/'+receipt.id)
                    .then(res => {
                        this.receipt = res.data.receipt;
                    });
            },
            view_payment: function(payment) {
                this.$modal.show('view');
                this.payment = this.receipt = null;
                axios.get('/students/finance/get/payment/'+payment.id)
                    .then(res => {
                        this.payment = res.data.payment;
                    });
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
                axios.get('/students/finance')
                    .then(res => {
                        this.load_data(res.data);
                    });
            },
        },
    }
</script>

<style scoped>

</style>
