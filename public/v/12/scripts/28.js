(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{102:function(t,e,a){"use strict";a.r(e);var s={name:"IndexGS"},r=a(0),n=Object(r.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card shadow mb-4 mb-xl-0"},[a("div",{staticClass:"card-header bg-transparent"},[a("h3",{staticClass:"mb-0"},[a("div",{staticClass:"float-right"},[a("router-link",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ad-9"),expression:"$store.state.auth.hasRole('ad-9')"}],staticClass:"btn btn-sm btn-outline-primary mb-3",attrs:{to:{name:"ad.grading-systems",params:{id:"create"}}}},[t._v("\n                    Add New Grading System\n                ")])],1)])]),t._v(" "),a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table align-items-center table-flush"},[t._m(0),t._v(" "),a("tbody",t._l(t.$parent.grading_systems.data,(function(e){return a("tr",[a("td",[a("router-link",{staticClass:"btn btn-sm btn-primary",attrs:{to:{name:"ad.grading-systems",params:{id:e.id}}}},[a("i",{staticClass:"ni ni-bold-right"})])],1),t._v(" "),a("td",[t._v(t._s(e.name))]),t._v(" "),a("td",[e.active?a("span",[t._v("Activated")]):a("span",[t._v("Deactivated")])])])})),0)]),t._v(" "),a("laravel-vue-pagination",{attrs:{limit:5,data:t.$parent.grading_systems,align:"center"},on:{"pagination-change-page":t.$parent.get_index}})],1)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",{staticClass:"thead-light"},[e("tr",[e("th",{attrs:{scope:"col"}}),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Grading Systems")]),this._v(" "),e("th",[this._v("Status")])])])}],!1,null,"4d042ceb",null).exports;function i(t,e){var a="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!a){if(Array.isArray(t)||(a=function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return o(t,e)}(t))||e&&t&&"number"==typeof t.length){a&&(t=a);var s=0,r=function(){};return{s:r,n:function(){return s>=t.length?{done:!0}:{done:!1,value:t[s++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,i=!0,d=!1;return{s:function(){a=a.call(t)},n:function(){var t=a.next();return i=t.done,t},e:function(t){d=!0,n=t},f:function(){try{i||null==a.return||a.return()}finally{if(d)throw n}}}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,s=new Array(e);a<e;a++)s[a]=t[a];return s}var d={name:"FormGS",methods:{submitForm:function(t){var e=this;t.preventDefault(),"c"===this.$parent.form.type?axios.post("/admin/grading-systems/store",this.$parent.form.input).then((function(t){e.$parent.grading_system=t.data.grading_system,e.$root.post_success(t.data.success),e.$router.push({name:"ad.grading-systems",params:{id:t.data.grading_system.id}})})):"e"===this.$parent.form.type?axios.post("/admin/grading-systems/update",this.$parent.form.input).then((function(t){e.$parent.grading_system=t.data.grading_system,e.$root.post_success(t.data.success),e.$router.push({name:"ad.grading-systems",params:{id:t.data.grading_system.id}})})):"d"===this.$parent.form.type&&axios.post("/admin/grading-systems/delete",this.$parent.form.input).then((function(t){e.$parent.grading_systems=t.data.grading_systems,e.$root.post_success(t.data.success),e.$router.push({name:"ad.grading-systems"})}))},add_grade:function(){this.$parent.form.input.grades.push({grade:"",point:"",from:"",to:""})},remove_grade:function(t){var e,a=[],s=i(this.$parent.form.input.grades.keys());try{for(s.s();!(e=s.n()).done;){var r=e.value;r!==t&&a.push(this.$parent.form.input.grades[r])}}catch(t){s.e(t)}finally{s.f()}this.$parent.form.input.grades=a}}},p=Object(r.a)(d,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card shadow mb-4 mb-xl-0"},[a("div",{staticClass:"card-header bg-transparent"},[a("h3",{staticClass:"mb-0"},[t._v("\n                "+t._s(t.$parent.form.title)+"\n            ")])]),t._v(" "),a("div",{staticClass:"card-body"},[a("form",{on:{submit:t.submitForm}},[a("fake-form-input"),t._v(" "),void 0!==t.$parent.form.input.name?a("div",{staticClass:"form-group mb-3"},[a("div",{staticClass:"input-group"},[t._m(0),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.$parent.form.input.name,expression:"$parent.form.input.name"}],staticClass:"form-control",attrs:{placeholder:"....",type:"text",required:""},domProps:{value:t.$parent.form.input.name},on:{input:function(e){e.target.composing||t.$set(t.$parent.form.input,"name",e.target.value)}}})])]):t._e(),t._v(" "),void 0!==t.$parent.form.input.active?a("div",{staticClass:"form-group mb-3"},[a("div",{staticClass:"input-group"},[t._m(1),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.$parent.form.input.active,expression:"$parent.form.input.active"}],staticClass:"form-control",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.$parent.form.input,"active",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"1"}},[t._v("Activate")]),t._v(" "),a("option",{attrs:{value:"0"}},[t._v("Deactivate")])])])]):t._e(),t._v(" "),void 0!==t.$parent.form.input.grades?a("div",{staticClass:"form-group mb-3"},[a("hr"),t._v(" "),t._l(t.$parent.form.input.grades.keys(),(function(e){return a("div",{staticClass:"row"},[a("div",{staticClass:"input-group col-2"},[t._m(2,!0),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.$parent.form.input.grades[e].grade,expression:"$parent.form.input.grades[i].grade"}],staticClass:"form-control",attrs:{placeholder:"....",type:"text",required:""},domProps:{value:t.$parent.form.input.grades[e].grade},on:{input:function(a){a.target.composing||t.$set(t.$parent.form.input.grades[e],"grade",a.target.value)}}})]),t._v(" "),a("div",{staticClass:"input-group col-3"},[t._m(3,!0),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.$parent.form.input.grades[e].point,expression:"$parent.form.input.grades[i].point"}],staticClass:"form-control",attrs:{placeholder:"....",type:"text",required:""},domProps:{value:t.$parent.form.input.grades[e].point},on:{input:function(a){a.target.composing||t.$set(t.$parent.form.input.grades[e],"point",a.target.value)}}})]),t._v(" "),a("div",{staticClass:"input-group col-3"},[t._m(4,!0),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.$parent.form.input.grades[e].from,expression:"$parent.form.input.grades[i].from"}],staticClass:"form-control",attrs:{placeholder:"....",type:"text",required:""},domProps:{value:t.$parent.form.input.grades[e].from},on:{input:function(a){a.target.composing||t.$set(t.$parent.form.input.grades[e],"from",a.target.value)}}})]),t._v(" "),a("div",{staticClass:"input-group col-3"},[t._m(5,!0),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.$parent.form.input.grades[e].to,expression:"$parent.form.input.grades[i].to"}],staticClass:"form-control",attrs:{placeholder:"....",type:"text",required:""},domProps:{value:t.$parent.form.input.grades[e].to},on:{input:function(a){a.target.composing||t.$set(t.$parent.form.input.grades[e],"to",a.target.value)}}})]),t._v(" "),a("div",{staticClass:"col-1"},[a("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(a){return t.remove_grade(e)}}},[a("i",{staticClass:"ni ni-fat-remove"})])])])})),t._v(" "),a("br"),t._v(" "),a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.add_grade}},[t._v("Add")]),t._v(" "),a("hr")],2):t._e(),t._v(" "),"delete"===t.$parent.$route.params.ops?a("h1",{staticClass:"text-danger"},[t._v("\n                    Are you sure you want to process with this delete operation?\n                ")]):t._e(),t._v(" "),t._m(6)],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[this._v("Name :")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[this._v("\n                                Activation\n                            ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[this._v(" :")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[this._v("Point :")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[this._v("From :")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[this._v("To :")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-footer"},[e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[this._v("Save changes")])])}],!1,null,"0a74b60d",null).exports,u={name:"ViewGS"},m={name:"GradingSystem",components:{ViewGS:Object(r.a)(u,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card shadow mb-4 mb-xl-0"},[a("div",{staticClass:"card-header bg-transparent"},[a("h3",{staticClass:"mb-0"},[a("button",{staticClass:"btn btn-sm btn-outline-primary mb-3",on:{click:function(e){return t.$router.go(-1)}}},[a("i",{staticClass:"ni ni-bold-left"}),t._v(" Back\n            ")]),t._v(" "),a("div",{staticClass:"float-right"},[a("router-link",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ad-9"),expression:"$store.state.auth.hasRole('ad-9')"}],staticClass:"btn btn-sm btn-outline-warning mb-3",attrs:{to:{name:"ad.grading-systems",params:{id:t.$parent.grading_system.id,ops:"edit"}}}},[t._v("\n                    Edit\n                ")]),t._v(" "),a("router-link",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ad-9"),expression:"$store.state.auth.hasRole('ad-9')"}],staticClass:"btn btn-sm btn-outline-danger mb-3",attrs:{to:{name:"ad.grading-systems",params:{id:t.$parent.grading_system.id,ops:"delete"}}}},[t._v("\n                    Delete\n                ")])],1)])]),t._v(" "),a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table"},[a("tbody",[a("tr",[a("td",[t._v("Name")]),t._v(" "),a("th",[t._v(t._s(t.$parent.grading_system.name))])]),t._v(" "),a("tr",[a("td",[t._v("Status")]),t._v(" "),a("th",[t.$parent.grading_system.active?a("span",[t._v("Activated")]):a("span",[t._v("Deactivated")])])]),t._v(" "),a("tr",[a("td",[t._v("Grades")]),t._v(" "),a("th",{domProps:{innerHTML:t._s(t.$root.view_grades(t.$parent.grading_system.grades))}})])])])])])}),[],!1,null,"4900fd0c",null).exports,FormGS:p,IndexGS:n},data:function(){return{grading_systems:null,grading_system:null,form:null}},created:function(){this.$store.state.page="Grading Systems",this.fetchData()},watch:{$route:"fetchData"},methods:{fetchData:function(){this.grading_systems=this.grading_system=this.form=null,"create"===this.$route.params.id?this.create_form():void 0===this.$route.params.id?this.get_index():this.get_show()},get_index:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;axios.get("/admin/grading-systems?page="+e).then((function(e){t.grading_systems=e.data.grading_systems}))},get_show:function(){var t=this;axios.get("/admin/grading-systems/"+this.$route.params.id).then((function(e){t.grading_system=e.data.grading_system,"edit"===t.$route.params.ops?t.form={type:"e",title:"Edit "+t.grading_system.name,input:{id:t.grading_system.id,active:t.grading_system.active,name:t.grading_system.name,grades:t.grading_system.grades}}:"delete"===t.$route.params.ops&&(t.form={type:"d",title:"Delete "+t.grading_system.name,input:{id:t.grading_system.id}})}))},create_form:function(){this.form={type:"c",title:"Adda new Grading System",input:{name:"",active:!1,grades:[]}}}}},l=Object(r.a)(m,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[t.grading_systems?a("IndexGS"):t._e(),t._v(" "),t.grading_system&&!t.form?a("ViewGS"):t._e(),t._v(" "),t.form?a("FormGS"):t._e()],1)])}),[],!1,null,"3ef00f7f",null);e.default=l.exports}}]);