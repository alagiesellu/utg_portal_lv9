(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{107:function(t,e,a){"use strict";a.r(e);var n={name:"IndexDepartments"},r=a(0),s=Object(r.a)(n,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-12"},[a("div",{staticClass:"card shadow"},[a("div",{staticClass:"card-header border-0"},[a("div",{staticClass:"clearfix"},[a("div",{staticClass:"float-left"},[t.$parent.department.department_id?a("router-link",{staticClass:"btn btn-sm btn-outline-primary",attrs:{to:{name:"ad.departments",params:{id:t.$parent.department.department_id}}}},[a("i",{staticClass:"ni ni-bold-left"}),t._v(" Back\n                    ")]):t._e()],1),t._v(" "),a("div",{staticClass:"float-right"},[a("router-link",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ad-11"),expression:"$store.state.auth.hasRole('ad-11')"}],staticClass:"btn btn-sm btn-warning",attrs:{to:{name:"ad.departments",params:{id:t.$parent.department.id,ops:"edit"}}}},[t._v("\n                        Edit\n                    ")]),t._v(" "),a("router-link",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ad-11"),expression:"$store.state.auth.hasRole('ad-11')"}],staticClass:"btn btn-sm btn-danger",attrs:{to:{name:"ad.departments",params:{id:t.$parent.department.id,ops:"delete"}}}},[t._v("\n                        Delete\n                    ")])],1)]),t._v(" "),a("h2",{staticClass:"mb-2"},[t._v("\n                "+t._s(t.$parent.department.name)+"\n            ")]),t._v(" "),a("button",{staticClass:"btn btn-sm btn-outline-dark"},[a("i",{staticClass:"ni ni-email-83"}),t._v(" "+t._s(t.$parent.department.email)+"\n            ")]),t._v(" "),a("button",{staticClass:"btn btn-sm btn-outline-dark"},[a("i",{staticClass:"ni ni-mobile-button"}),t._v(" +"+t._s(t.$parent.department.tel)+"\n            ")]),t._v(" "),t.$parent.department.has_rotation?a("button",{staticClass:"btn btn-sm btn-outline-dark"},[a("i",{staticClass:"ni ni-check-bold"}),t._v(" Has Rotation\n            ")]):t._e(),t._v(" "),t.$parent.department.is_admin?a("button",{staticClass:"btn btn-sm btn-outline-dark"},[a("i",{staticClass:"ni ni-check-bold"}),t._v(" Is Admin\n            ")]):t._e(),t._v(" "),t.$parent.department.is_major?a("div",[a("br"),t._v(" "),t._m(0),t._v(" "),a("button",{staticClass:"btn btn-sm btn-outline-dark"},[t._v("\n                    GMD"+t._s(t.$parent.department.fee_per_term.local)+" for local students\n                ")]),t._v(" "),a("button",{staticClass:"btn btn-sm btn-outline-dark"},[t._v("\n                    USD"+t._s(t.$parent.department.fee_per_term.foreign)+" for international students\n                ")])]):t._e(),t._v(" "),a("hr"),t._v(" "),a("p",{staticClass:"mb-2"},[t._v("\n                "+t._s(t.$parent.department.description)+"\n            ")])]),t._v(" "),a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table align-items-center table-flush"},[a("thead",{staticClass:"thead-light"},[a("tr",[a("th",{attrs:{scope:"col"}}),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("\n                        Departments Under "),a("strong",[t._v(t._s(t.$parent.department.name))])])])]),t._v(" "),a("tbody",[t._l(t.$parent.department.departments,(function(e){return a("tr",[a("td",[a("router-link",{staticClass:"btn btn-sm btn-primary",attrs:{to:{name:"ad.departments",params:{id:e.id}}}},[a("i",{staticClass:"ni ni-bold-right"})])],1),t._v(" "),a("th",[t._v("\n                        "+t._s(e.name)+"\n                    ")])])})),t._v(" "),a("tr",[a("td"),t._v(" "),a("td",[a("router-link",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ad-11"),expression:"$store.state.auth.hasRole('ad-11')"}],staticClass:"btn btn-sm btn-outline-primary",attrs:{to:{name:"ad.departments",params:{id:t.$parent.department.id,ops:"create"}}}},[t._v("\n                            Add Department\n                        ")])],1)])],2)])]),t._v(" "),a("div",{staticClass:"card-footer py-4"})])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-sm btn-outline-dark"},[e("i",{staticClass:"ni ni-check-bold"}),this._v(" Is Major\n                ")])}],!1,null,"56148fac",null).exports,i={name:"FormDepartments"},o={name:"Departments",components:{FormDepartments:Object(r.a)(i,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-12"},[a("div",{staticClass:"card shadow mb-4 mb-xl-0"},[a("h3",{staticClass:"card-header bg-transparent"},[a("span",{domProps:{textContent:t._s(t.$parent.form.title)}})]),t._v(" "),a("div",{staticClass:"card-body"},[a("form",{on:{submit:t.$parent.submitForm}},[a("fake-form-input"),t._v(" "),void 0!==t.$parent.form.input.name?a("div",{staticClass:"form-group mb-3"},[a("div",{staticClass:"input-group"},[t._m(0),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.$parent.form.input.name,expression:"$parent.form.input.name"}],staticClass:"form-control",attrs:{placeholder:"Name",type:"text",name:"name",required:""},domProps:{value:t.$parent.form.input.name},on:{input:function(e){e.target.composing||t.$set(t.$parent.form.input,"name",e.target.value)}}})])]):t._e(),t._v(" "),void 0!==t.$parent.form.input.description?a("div",{staticClass:"form-group"},[a("div",{staticClass:"input-group"},[t._m(1),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.$parent.form.input.description,expression:"$parent.form.input.description"}],staticClass:"form-control",attrs:{placeholder:"Description",type:"text",name:"description",required:""},domProps:{value:t.$parent.form.input.description},on:{input:function(e){e.target.composing||t.$set(t.$parent.form.input,"description",e.target.value)}}})])]):t._e(),t._v(" "),void 0!==t.$parent.form.input.email?a("div",{staticClass:"form-group mb-3"},[a("div",{ref:"email",staticClass:"input-group"},[t._m(2),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.$parent.form.input.email,expression:"$parent.form.input.email"}],staticClass:"form-control",attrs:{placeholder:"Email",type:"email",name:"email",required:""},domProps:{value:t.$parent.form.input.email},on:{input:function(e){e.target.composing||t.$set(t.$parent.form.input,"email",e.target.value)}}})])]):t._e(),t._v(" "),void 0!==t.$parent.form.input.tel?a("div",{staticClass:"form-group mb-3"},[a("div",{ref:"tel",staticClass:"input-group"},[t._m(3),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.$parent.form.input.tel,expression:"$parent.form.input.tel"}],staticClass:"form-control",attrs:{placeholder:"Telephone Number: 1234567",type:"tel",name:"tel",pattern:"220[0-9]{7}",required:""},domProps:{value:t.$parent.form.input.tel},on:{input:function(e){e.target.composing||t.$set(t.$parent.form.input,"tel",e.target.value)}}})])]):t._e(),t._v(" "),t.$parent.form.input.is_admin?t._e():a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4"},[void 0!==t.$parent.form.input.is_major?a("div",{staticClass:"custom-control custom-checkbox mb-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.$parent.form.input.is_major,expression:"$parent.form.input.is_major"}],staticClass:"custom-control-input",attrs:{id:"is_major",type:"checkbox"},domProps:{checked:Array.isArray(t.$parent.form.input.is_major)?t._i(t.$parent.form.input.is_major,null)>-1:t.$parent.form.input.is_major},on:{change:function(e){var a=t.$parent.form.input.is_major,n=e.target,r=!!n.checked;if(Array.isArray(a)){var s=t._i(a,null);n.checked?s<0&&t.$set(t.$parent.form.input,"is_major",a.concat([null])):s>-1&&t.$set(t.$parent.form.input,"is_major",a.slice(0,s).concat(a.slice(s+1)))}else t.$set(t.$parent.form.input,"is_major",r)}}}),t._v(" "),a("label",{staticClass:"custom-control-label",attrs:{for:"is_major"}},[t._v("Is a Major")])]):t._e(),t._v(" "),void 0!==t.$parent.form.input.has_rotation?a("div",{staticClass:"custom-control custom-checkbox mb-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.$parent.form.input.has_rotation,expression:"$parent.form.input.has_rotation"}],staticClass:"custom-control-input",attrs:{id:"has_rotation",type:"checkbox"},domProps:{checked:Array.isArray(t.$parent.form.input.has_rotation)?t._i(t.$parent.form.input.has_rotation,null)>-1:t.$parent.form.input.has_rotation},on:{change:function(e){var a=t.$parent.form.input.has_rotation,n=e.target,r=!!n.checked;if(Array.isArray(a)){var s=t._i(a,null);n.checked?s<0&&t.$set(t.$parent.form.input,"has_rotation",a.concat([null])):s>-1&&t.$set(t.$parent.form.input,"has_rotation",a.slice(0,s).concat(a.slice(s+1)))}else t.$set(t.$parent.form.input,"has_rotation",r)}}}),t._v(" "),a("label",{staticClass:"custom-control-label",attrs:{for:"has_rotation"}},[t._v("Has Rotation")])]):t._e()]),t._v(" "),t.$parent.form.input.is_major?a("div",{staticClass:"col-md-12 row"},[a("div",{staticClass:"form-group col-6"},[a("div",{staticClass:"input-group"},[t._m(4),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.$parent.form.input.fee_per_term.local,expression:"$parent.form.input.fee_per_term.local"}],staticClass:"form-control",attrs:{placeholder:"Local Students fees",type:"number",step:"0.01",required:""},domProps:{value:t.$parent.form.input.fee_per_term.local},on:{input:function(e){e.target.composing||t.$set(t.$parent.form.input.fee_per_term,"local",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"form-group col-6"},[a("div",{staticClass:"input-group"},[t._m(5),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.$parent.form.input.fee_per_term.foreign,expression:"$parent.form.input.fee_per_term.foreign"}],staticClass:"form-control",attrs:{placeholder:"Foreign Students fees",type:"number",step:"0.01",required:""},domProps:{value:t.$parent.form.input.fee_per_term.foreign},on:{input:function(e){e.target.composing||t.$set(t.$parent.form.input.fee_per_term,"foreign",e.target.value)}}})])])]):t._e()]),t._v(" "),t._m(6)],1)])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[e("i",{staticClass:"ni ni-align-left-2"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[e("i",{staticClass:"ni ni-align-left-2"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[e("i",{staticClass:"ni ni-email-83"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[e("i",{staticClass:"ni ni-mobile-button"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[this._v("GMD")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[this._v("USD")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[this._v("Save changes")])])}],!1,null,"446cb1b9",null).exports,IndexDepartments:s},data:function(){return{department:null,form:null}},created:function(){this.$store.state.page="Departments",this.fetchData()},watch:{$route:"fetchData"},methods:{submitForm:function(t){switch(t.preventDefault(),this.form.type){case"c":this.postRequest("/admin/departments/store");break;case"d":this.postRequest("/admin/departments/destroy");break;case"e":this.postRequest("/admin/departments/edit")}},postRequest:function(t){var e=this;axios.post(t,this.form.input).then((function(t){e.$router.push({name:"ad.departments",params:{id:t.data.department.id}}),e.$root.post_success(t.data.success)}))},fetchData:function(){var t=this;this.$route.params.id||(this.$route.params.id=1),axios.get("/admin/departments/"+this.$route.params.id).then((function(e){switch(t.department=e.data.department,t.$route.params.ops){case"create":t.form={title:"Create Department Under "+t.department.name,type:"c",input:{name:null,description:null,email:null,tel:null,is_admin:t.department.is_admin,is_major:!1,has_rotation:!1,fee_per_term:{local:null,foreign:null},department_id:t.department.id}};break;case"edit":t.form={title:"Edit "+t.department.name,type:"e",input:{id:t.department.id,name:t.department.name,description:t.department.description,email:t.department.email,tel:t.department.tel,is_admin:t.department.is_admin,is_major:t.department.is_major,has_rotation:t.department.has_rotation,fee_per_term:t.department.fee_per_term}};break;case"delete":t.form={title:"Delete Department "+t.department.name,type:"d",input:{id:t.department.id}};break;default:t.form=null}}))},get_department:function(){var t=this;axios.get("/admin/departments/"+this.$route.params.id).then((function(e){t.department=e.data.department}))}}},p=Object(r.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[this.form?e("FormDepartments"):this.department?e("IndexDepartments"):this._e()],1)}),[],!1,null,"7c519af5",null);e.default=p.exports}}]);