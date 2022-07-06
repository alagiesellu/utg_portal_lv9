(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{133:function(t,s,e){"use strict";e.r(s);function a(t,s){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!e){if(Array.isArray(t)||(e=function(t,s){if(!t)return;if("string"==typeof t)return n(t,s);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return n(t,s)}(t))||s&&t&&"number"==typeof t.length){e&&(t=e);var a=0,i=function(){};return{s:i,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,o=!0,m=!1;return{s:function(){e=e.call(t)},n:function(){var t=e.next();return o=t.done,t},e:function(t){m=!0,r=t},f:function(){try{o||null==e.return||e.return()}finally{if(m)throw r}}}}function n(t,s){(null==s||s>t.length)&&(s=t.length);for(var e=0,a=new Array(s);e<s;e++)a[e]=t[e];return a}var i={name:"AssessmentsClasses",data:function(){return{assessments:{},assessment:null,total:0,form:{input:{}}}},created:function(){this.fetchData(),this.$parent.fetchData()},watch:{$route:"fetchData"},methods:{deleteAss:function(){this.form={title:"Delete "+this.assessment.name,type:"delete",input:{id:this.assessment.id,term_class_id:this.assessment.term_class_id}},this.$modal.show("form-modal"),this.$modal.hide("view-ass")},editAss:function(){this.form={title:"Edit "+this.assessment.name,type:"update",input:{id:this.assessment.id,name:this.assessment.name,starting_at:this.assessment.starting_at,ending_at:this.assessment.ending_at,info:this.assessment.info,score:this.assessment.score,term_class_id:this.assessment.term_class_id}},this.$modal.show("form-modal"),this.$modal.hide("view-ass")},viewAss:function(t){var s=this;axios.get("/academic/assessments/"+t.id).then((function(t){s.assessment=t.data.assessment,s.$modal.show("view-ass")}))},submitForm:function(t){var s=this;t.preventDefault(),axios.post("/academic/assessments/"+this.form.type,this.form.input).then((function(t){s.assessments=t.data.assessments,s.$root.post_success(t.data.success),s.cal_assessments(t.data.assessments),s.$modal.hide("form-modal")}))},new_assessment:function(){this.form={title:"Create a New Assessment",type:"store",input:{name:"",starting_at:"",ending_at:"",info:"",score:"",term_class_id:this.$route.params.id}},this.$modal.show("form-modal")},fetchData:function(){this.get_assessments()},cal_assessments:function(t){this.total=0;var s,e=a(t);try{for(e.s();!(s=e.n()).done;){var n=s.value;this.total+=n.score}}catch(t){e.e(t)}finally{e.f()}},get_assessments:function(){var t=this;axios.get("/academic/classes/"+this.$route.params.id+"/assessments").then((function(s){t.assessments=s.data.assessments,t.cal_assessments(s.data.assessments)}))}}},r=e(0),o=Object(r.a)(i,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-xl-12 order-xl-1"},[e("div",{staticClass:"card bg-secondary shadow"},[e("div",{staticClass:"card-header "},[e("h3",[e("i",{staticClass:"ni ni-ruler-pencil"}),t._v(" "),t.$parent.term_class.course?e("router-link",{attrs:{to:{name:"ac.classes.show",params:{id:t.$parent.term_class.id}}}},[t._v("\n                            "+t._s(t.$parent.term_class.course.name)+"\n                        ")]):t._e(),t._v("\n                        Assessments\n                        "),e("div",{staticClass:"float-right"},[e("button",{staticClass:"btn btn-outline-primary btn-sm",on:{click:function(s){return t.$parent.$router.back()}}},[e("i",{staticClass:"ni ni-bold-left"}),t._v(" Back\n                            ")]),t._v(" "),e("button",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ac-2"),expression:"$store.state.auth.hasRole('ac-2')"}],staticClass:"btn btn-primary btn-sm",on:{click:t.new_assessment}},[t._v("\n                                Create New\n                            ")])])],1)]),t._v(" "),e("div",{staticClass:"card-body"},[e("table",{staticClass:"table"},[t._m(0),t._v(" "),e("tbody",[t._l(t.assessments,(function(s){return e("tr",[e("td",[e("button",{staticClass:"btn btn-primary btn-sm",on:{click:function(e){return t.viewAss(s)}}},[e("i",{staticClass:"ni ni-bold-right"})])]),t._v(" "),e("td",[t._v(t._s(s.name))]),t._v(" "),e("td",[e("li",[t._v(t._s(t.$root.moment(s.starting_at)))]),t._v(" "),e("li",[t._v(t._s(t.$root.moment(s.ending_at)))])]),t._v(" "),e("td",[t._v(t._s(s.score))]),t._v(" "),e("td",[e("router-link",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ac-3"),expression:"$store.state.auth.hasRole('ac-3')"}],staticClass:"btn btn-sm btn-link",attrs:{to:{name:"ac.classes.assessment.grade",params:{ass:s.id,tc:t.$parent.term_class.id}}}},[t._v("\n                                    Grades\n                                ")])],1)])})),t._v(" "),e("tr",[e("th",{staticClass:"text-right",attrs:{colspan:"3"}},[t._v("Total")]),t._v(" "),e("th",{staticClass:"text-underline"},[e("h3",[t._v(t._s(t.total)+" / 100")])]),t._v(" "),e("td")])],2)]),t._v(" "),e("modal",{attrs:{scrollable:!0,name:"form-modal",height:"auto"}},[e("div",{staticClass:"modal modal-content"},[e("h2",{staticClass:"modal-header"},[t._v("\n                                "+t._s(t.form.title)+"\n                            ")]),t._v(" "),e("div",{staticClass:"modal-body"},[e("form",{on:{submit:t.submitForm}},[e("fake-form-input"),t._v(" "),void 0!==t.form.input.name?e("div",{staticClass:"form-group mb-3"},[e("div",{staticClass:"input-group"},[e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[t._v("Name :")])]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.input.name,expression:"form.input.name"}],staticClass:"form-control",attrs:{placeholder:"....",type:"text",required:""},domProps:{value:t.form.input.name},on:{input:function(s){s.target.composing||t.$set(t.form.input,"name",s.target.value)}}})])]):t._e(),t._v(" "),void 0!==t.form.input.starting_at?e("div",{staticClass:"form-group mb-3"},[e("div",{staticClass:"input-group"},[e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[t._v("Starting At :")])]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.input.starting_at,expression:"form.input.starting_at"}],staticClass:"form-control",attrs:{type:"datetime-local",required:""},domProps:{value:t.form.input.starting_at},on:{input:function(s){s.target.composing||t.$set(t.form.input,"starting_at",s.target.value)}}})])]):t._e(),t._v(" "),void 0!==t.form.input.ending_at?e("div",{staticClass:"form-group mb-3"},[e("div",{staticClass:"input-group"},[e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[t._v("Ending At :")])]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.input.ending_at,expression:"form.input.ending_at"}],staticClass:"form-control",attrs:{type:"datetime-local",required:""},domProps:{value:t.form.input.ending_at},on:{input:function(s){s.target.composing||t.$set(t.form.input,"ending_at",s.target.value)}}})])]):t._e(),t._v(" "),void 0!==t.form.input.info?e("div",{staticClass:"form-group mb-3"},[e("label"),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.form.input.info,expression:"form.input.info"}],staticClass:"form-control form-control",attrs:{required:"",rows:"4",placeholder:"Provide Venue and other necessary informations here..."},domProps:{value:t.form.input.info},on:{input:function(s){s.target.composing||t.$set(t.form.input,"info",s.target.value)}}})]):t._e(),t._v(" "),void 0!==t.form.input.score?e("div",{staticClass:"form-group col-8"},[e("div",{staticClass:"input-group"},[e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[t._v("Score :")])]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.input.score,expression:"form.input.score"}],staticClass:"form-control",attrs:{placeholder:"....",type:"number",step:"0.01",min:"1",max:"100",required:""},domProps:{value:t.form.input.score},on:{input:function(s){s.target.composing||t.$set(t.form.input,"score",s.target.value)}}})])]):t._e(),t._v(" "),e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Save changes")])],1)])])]),t._v(" "),e("modal",{attrs:{scrollable:!0,name:"view-ass",height:"auto"}},[t.assessment?e("div",{staticClass:"modal modal-content"},[e("div",{staticClass:"modal-body"},[e("button",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ac-2"),expression:"$store.state.auth.hasRole('ac-2')"}],staticClass:"btn btn-warning btn-sm",on:{click:t.editAss}},[t._v("\n                                    Edit\n                                ")]),t._v(" "),e("button",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ac-2"),expression:"$store.state.auth.hasRole('ac-2')"}],staticClass:"btn btn-danger btn-sm",on:{click:t.deleteAss}},[t._v("\n                                    Delete\n                                ")]),t._v(" "),e("table",{staticClass:"table"},[e("tr",[e("td",[t._v("Name")]),t._v(" "),e("th",[t._v(t._s(t.assessment.name))])]),t._v(" "),e("tr",[e("td",[t._v("Starting At")]),t._v(" "),e("th",[t._v(t._s(t.$root.moment(t.assessment.starting_at)))])]),t._v(" "),e("tr",[e("td",[t._v("Ending At")]),t._v(" "),e("th",[t._v(t._s(t.$root.moment(t.assessment.ending_at)))])]),t._v(" "),e("tr",[e("td",[t._v("Score")]),t._v(" "),e("th",[t._v(t._s(t.assessment.score)+"%")])]),t._v(" "),e("tr",[e("td",[t._v("Info")]),t._v(" "),e("th",[t._v(t._s(t.assessment.info))])])])])]):t._e()])],1)])])])}),[function(){var t=this.$createElement,s=this._self._c||t;return s("thead",[s("tr",[s("th"),this._v(" "),s("th",[this._v("Name")]),this._v(" "),s("th",[this._v("Times")]),this._v(" "),s("th",[this._v("Score")]),this._v(" "),s("th")])])}],!1,null,"679ecf78",null);s.default=o.exports}}]);