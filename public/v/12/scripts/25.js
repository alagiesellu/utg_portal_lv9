(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{119:function(t,e,a){"use strict";a.r(e);function n(t,e){var a="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!a){if(Array.isArray(t)||(a=function(t,e){if(!t)return;if("string"==typeof t)return s(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return s(t,e)}(t))||e&&t&&"number"==typeof t.length){a&&(t=a);var n=0,r=function(){};return{s:r,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,o=!0,l=!1;return{s:function(){a=a.call(t)},n:function(){var t=a.next();return o=t.done,t},e:function(t){l=!0,i=t},f:function(){try{o||null==a.return||a.return()}finally{if(l)throw i}}}}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}var r={name:"Finance",data:function(){return{user:null,profile:null,payments:[],payment:null,receipt:null,term_receipts:[],balance:0,currency:"",filter:{search:null},form:{type:null,input:{term_id:null,amount:null},terms:[]},cancel_form:{}}},created:function(){this.fetchData()},watch:{$route:"fetchData"},mounted:function(){this.$store.state.page="Finance"},methods:{cancelSubmit:function(t){var e=this;t.preventDefault(),axios.post(window.api_url+"/admin/finance/cancel/"+("c_p"===this.cancel_form.type?"payment":"receipt"),this.cancel_form).then((function(t){e.$root.post_success(t.data.success),e.$modal.hide("view"),e.$modal.hide("cancel"),e.cancel_form={},e.get_user()}))},cancel_this:function(t){this.cancel_form={type:t.term_id?"c_tr":"c_p",id:t.id,password:null},this.$modal.show("cancel")},view_receipt:function(t){var e=this;this.$modal.show("view"),this.payment=this.receipt=null,axios.get("/admin/finance/get/receipt/"+t.id).then((function(t){e.receipt=t.data.receipt}))},view_payment:function(t){var e=this;this.$modal.show("view"),this.payment=this.receipt=null,axios.get("/admin/finance/get/payment/"+t.id).then((function(t){e.payment=t.data.payment}))},can_reg_terms:function(){var t=this;axios.get("/admin/get/can-register-terms").then((function(e){t.form.terms=e.data.terms,1===e.data.terms.length&&(t.form.input.term_id=e.data.terms[0].id)}))},submitForm:function(t){var e=this;t.preventDefault(),this.form.input.student_profile_id=this.profile.id,this.form.input.currency=this.currency,axios.post("/admin/finance/"+this.form.type,this.form.input).then((function(t){e.$root.post_success(t.data.success),e.$modal.hide(e.form.type),e.form={type:null,input:{term_id:null,amount:null,password:null}},e.load_data(t.data)}))},add_modal:function(t){this.$modal.show(t),this.form.type=t,"clearance"===t&&this.can_reg_terms()},fetchData:function(){void 0===this.$route.params.id?this.user=null:null==this.user&&this.get_user()},load_data:function(t){this.balance=0,this.user=t.user,this.profile=t.profile,this.currency="GM"===this.user.nationality?"GMD":"$",this.payments=t.profile.payments;var e,a=n(this.payments);try{for(a.s();!(e=a.n()).done;){var s=e.value;null===s.cancelled_by_admin_profile_id&&(this.balance+=s.amount)}}catch(t){a.e(t)}finally{a.f()}this.term_receipts=t.profile.term_receipts;var r,i=n(this.term_receipts);try{for(i.s();!(r=i.n()).done;){var o=r.value;null===o.cancelled_by_admin_profile_id&&(this.balance-=o.amount)}}catch(t){i.e(t)}finally{i.f()}},get_user:function(){var t=this;axios.get("/admin/finance/"+this.$route.params.id).then((function(e){t.load_data(e.data)}))},filter_users:function(t){var e=this;t.preventDefault(),axios.post("/admin/finance/search",{search:this.filter.search}).then((function(t){e.filter.search=null,e.load_data(t.data),e.$router.push({name:"ad.finance",params:{id:e.user.num}})}))}}},i=a(0),o=Object(i.a)(r,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.user?a("div",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-6"},[a("div",{staticClass:"card shadow"},[a("div",{staticClass:"card-header bg-transparent"},[a("h3",{staticClass:"mb-0"},[a("div",{staticClass:"float-left"},[a("router-link",{staticClass:"btn btn-sm btn-outline-primary mb-3",attrs:{to:{name:"ad.finance"}}},[a("i",{staticClass:"ni ni-bold-left"}),t._v(" Back\n                                    ")])],1)])]),t._v(" "),a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table align-items-center table-flush"},[a("tbody",[a("tr",[a("td"),t._v(" "),a("td",[a("img",{staticClass:"img-thumbnail",attrs:{src:"/storage/profiles/"+t.user.img}})])]),t._v(" "),a("tr",[a("td",[t._v("#")]),t._v(" "),a("th",[t._v("\n                                        "+t._s(t.user.num)+"\n                                    ")])]),t._v(" "),a("tr",[a("td",[t._v("First Name")]),t._v(" "),a("th",[t._v("\n                                        "+t._s(t.user.first_name)+"\n                                    ")])]),t._v(" "),a("tr",[a("td",[t._v("Middle Name")]),t._v(" "),a("th",[t._v("\n                                        "+t._s(t.user.middle_name)+"\n                                    ")])]),t._v(" "),a("tr",[a("td",[t._v("Last Name")]),t._v(" "),a("th",[t._v("\n                                        "+t._s(t.user.last_name)+"\n                                    ")])]),t._v(" "),a("tr",[a("td",[t._v("Email")]),t._v(" "),a("th",[t._v("\n                                        "+t._s(t.user.email)+"\n                                    ")])]),t._v(" "),a("tr",[a("td",[t._v("Tel")]),t._v(" "),a("th",[t._v("\n                                        "+t._s(t.user.tel)+"\n                                    ")])]),t._v(" "),a("tr",[a("td",[t._v("Address")]),t._v(" "),a("th",[t._v("\n                                        "+t._s(t.user.address)+"\n                                    ")])]),t._v(" "),a("tr",[a("td",[t._v("Gender")]),t._v(" "),a("th",[t._v("\n                                        "+t._s(this.$root.gender(t.user.gender))+"\n                                    ")])]),t._v(" "),a("tr",[a("td",[t._v("Date of Birth")]),t._v(" "),a("th",[t._v("\n                                        "+t._s(this.$root.format_date(t.user.dob))+"\n                                    ")])]),t._v(" "),a("tr",[a("td",[t._v("Nationality")]),t._v(" "),a("th",[t._v("\n                                        "+t._s(this.$root.country(t.user.nationality))+"\n                                    ")])])])])])])]),t._v(" "),a("div",{staticClass:"col-6"},[a("div",{staticClass:"card shadow"},[a("div",{staticClass:"card-header"},[a("button",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ad-18"),expression:"$store.state.auth.hasRole('ad-18')"}],staticClass:"btn btn-sm btn-primary mb-3",on:{click:function(e){return t.add_modal("payment")}}},[a("i",{staticClass:"ni ni-money-coins"}),t._v(" Record Payment\n                            ")]),t._v(" "),a("button",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ad-19"),expression:"$store.state.auth.hasRole('ad-19')"}],staticClass:"btn btn-sm btn-danger mb-3",on:{click:function(e){return t.add_modal("clearance")}}},[a("i",{staticClass:"ni ni-check-bold"}),t._v(" Issue Clearance\n                            ")])]),t._v(" "),a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table align-items-center table-flush"},[t._m(0),t._v(" "),a("tbody",[t._l(t.payments,(function(e){return a("tr",{class:[null==e.cancelled_by_admin_profile_id?"":"text-danger"]},[a("td",[a("button",{staticClass:"btn btn-sm btn-primary",on:{click:function(a){return t.view_payment(e)}}},[a("i",{staticClass:"ni ni-bold-right"})]),t._v("\n                                        "+t._s(t.$root.format_date(e.created_at))+"\n                                    ")]),t._v(" "),a("td",[t._v(t._s(e.currency_key)+" "+t._s(t.$root.amount(e.amount)))])])})),t._v(" "),t.payments.length?t._e():a("tr",[a("td",{staticClass:"text-danger"},[t._v("No payment records..")])])],2),t._v(" "),t._m(1),t._v(" "),a("tbody",[t._l(t.term_receipts,(function(e){return a("tr",{class:[null==e.cancelled_by_admin_profile_id?"":"text-danger"]},[a("td",[a("button",{staticClass:"btn btn-sm btn-primary",on:{click:function(a){return t.view_receipt(e)}}},[a("i",{staticClass:"ni ni-bold-right"})]),t._v("\n                                        "+t._s(e.term.name)+"\n                                    ")]),t._v(" "),a("td",[t._v(t._s(e.currency_key)+" "+t._s(t.$root.amount(e.amount)))])])})),t._v(" "),t.term_receipts.length?t._e():a("tr",[a("td",{staticClass:"text-danger"},[t._v("No term receipts records..")])])],2),t._v(" "),a("thead",[a("tr",{staticClass:"text-underline"},[t._m(2),t._v(" "),a("th",[a("h4",[t._v(t._s(t.currency)+" "+t._s(t.$root.amount(t.balance)))])])])])])])])]),t._v(" "),a("modal",{attrs:{scrollable:!0,name:"payment",height:"auto"}},[a("h2",{staticClass:"modal-header"},[t._v("Record Payment")]),t._v(" "),a("div",{staticClass:"modal-body"},[a("form",{on:{submit:t.submitForm}},[a("fake-form-input"),t._v(" "),a("div",{staticClass:"form-group mb-3"},[a("div",{staticClass:"input-group"},[a("div",{staticClass:"input-group-prepend"},[a("strong",{staticClass:"input-group-text text-danger"},[t._v("\n                                            Amount in "+t._s(t.currency)+" :\n                                        ")])]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.input.amount,expression:"form.input.amount"}],staticClass:"form-control",attrs:{placeholder:"Amount",min:"0",type:"number",step:"0.01",required:""},domProps:{value:t.form.input.amount},on:{input:function(e){e.target.composing||t.$set(t.form.input,"amount",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Save changes")])])],1)])]),t._v(" "),a("modal",{attrs:{scrollable:!0,name:"clearance",height:"auto"}},[a("h2",{staticClass:"modal-header"},[t._v("Issue Clearance")]),t._v(" "),a("div",{staticClass:"modal-body"},[a("form",{on:{submit:t.submitForm}},[a("fake-form-input"),t._v(" "),a("div",{staticClass:"form-group mb-3"},[a("v-select",{staticClass:"form-control",attrs:{options:t.form.terms,reduce:function(t){return t.id},label:"name"},scopedSlots:t._u([{key:"search",fn:function(e){var n=e.attributes,s=e.events;return[a("input",t._g(t._b({staticClass:"vs__search"},"input",n,!1),s))]}}],null,!1,411681397),model:{value:t.form.input.term_id,callback:function(e){t.$set(t.form.input,"term_id",e)},expression:"form.input.term_id"}})],1),t._v(" "),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Save changes")])])],1)])])],1)]):a("div",[a("div",{staticClass:"col-md-8"},[a("div",{staticClass:"card shadow mb-4 mb-xl-0"},[t._m(3),t._v(" "),a("form",{staticClass:"card-body col-md-12",on:{submit:t.filter_users}},[a("div",{staticClass:"form-group"},[a("div",{staticClass:"input-group mb-4"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.search,expression:"filter.search"}],staticClass:"form-control",attrs:{placeholder:"Search by MAT number",type:"number"},domProps:{value:t.filter.search},on:{input:function(e){e.target.composing||t.$set(t.filter,"search",e.target.value)}}}),t._v(" "),t._m(4)])])])])])]),t._v(" "),a("modal",{attrs:{scrollable:!0,name:"view",height:"auto"}},[t.receipt?a("div",{staticClass:"modal-body"},[t.receipt.cancelled_by_admin_profile_id?t._e():a("button",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ad-21"),expression:"$store.state.auth.hasRole('ad-21')"}],staticClass:"btn btn-sm btn-outline-danger float-right",on:{click:function(e){return t.cancel_this(t.receipt)}}},[t._v("\n                    Cancel Clearance\n                ")]),t._v(" "),a("h3",[a("small",[t._v("Academic Term: ")]),t._v(t._s(t.receipt.term.name)+"\n                ")]),t._v(" "),t.receipt.admin_profile_id?a("h3",[a("small",[t._v("Issued By: ")]),t._v(t._s(t.$root.full_name(t.receipt.admin_profile.user))+"\n                ")]):t._e(),t._v(" "),t.receipt.cancelled_by_admin_profile_id?a("h3",{staticClass:"text-danger"},[a("small",[t._v("Cancelled By: ")]),t._v(t._s(t.$root.full_name(t.receipt.cancelled_by_admin_profile.user))+"\n                ")]):t._e(),t._v(" "),a("h3",[a("small",[t._v("Amount: ")]),t._v(t._s(t.receipt.currency_key)+" "+t._s(t.$root.amount(t.receipt.amount))+"\n                ")])]):t._e(),t._v(" "),t.payment?a("div",{staticClass:"modal-body"},[t.payment.cancelled_by_admin_profile_id?t._e():a("button",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ad-20"),expression:"$store.state.auth.hasRole('ad-20')"}],staticClass:"btn btn-sm btn-outline-danger float-right",on:{click:function(e){return t.cancel_this(t.payment)}}},[t._v("\n                    Cancel Payment\n                ")]),t._v(" "),t.payment.admin_profile_id?a("h3",[a("small",[t._v("Issued By: ")]),t._v(t._s(t.$root.full_name(t.payment.admin_profile.user))+"\n                ")]):t._e(),t._v(" "),t.payment.cancelled_by_admin_profile_id?a("h3",{staticClass:"text-danger"},[a("small",[t._v("Cancelled By: ")]),t._v(t._s(t.$root.full_name(t.payment.cancelled_by_admin_profile.user))+"\n                ")]):t._e(),t._v(" "),a("h3",[a("small",[t._v("Amount: ")]),t._v(t._s(t.payment.currency_key)+" "+t._s(t.$root.amount(t.payment.amount))+"\n                ")])]):t._e()]),t._v(" "),a("modal",{attrs:{scrollable:!0,name:"cancel",height:"auto"}},[a("h3",{staticClass:"modal-header"},["c_p"===t.cancel_form.type?a("span",[t._v("Cancel Payment")]):a("span",[t._v("Cancel Clearance")]),t._v(" "),a("button",{staticClass:"btn btn-sm btn-danger float-right",on:{click:function(e){return t.$modal.hide("cancel")}}},[t._v("\n                    x\n                ")])]),t._v(" "),a("div",{staticClass:"modal-body"},[a("form",{on:{submit:t.cancelSubmit}},[a("fake-form-input"),t._v(" "),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-danger",attrs:{type:"submit"}},[t._v("Cancel")])])],1)])])],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{staticClass:"text-center",attrs:{colspan:"2"}},[e("h4",[this._v("Payments")])])]),this._v(" "),e("tr",[e("th",[this._v("Date")]),this._v(" "),e("th",[this._v("Amount")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{staticClass:"text-center",attrs:{colspan:"2"}},[e("h4",[this._v("Term Receipts (Clearances)")])])]),this._v(" "),e("tr",[e("th",[this._v("Term")]),this._v(" "),e("th",[this._v("Amount")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("h4",[this._v("Balance")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header bg-transparent"},[e("h3",{staticClass:"mb-0"},[this._v("\n                            Search Student Profile\n                        ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-append"},[e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e("i",{staticClass:"ni ni-zoom-split-in"}),this._v("\n                                        Search\n                                    ")])])}],!1,null,"b38bf27a",null);e.default=o.exports}}]);