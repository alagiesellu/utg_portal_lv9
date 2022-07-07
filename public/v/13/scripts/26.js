(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{107:function(t,e,s){"use strict";s.r(e);function r(t,e){var s="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!s){if(Array.isArray(t)||(s=function(t,e){if(!t)return;if("string"==typeof t)return a(t,e);var s=Object.prototype.toString.call(t).slice(8,-1);"Object"===s&&t.constructor&&(s=t.constructor.name);if("Map"===s||"Set"===s)return Array.from(t);if("Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))return a(t,e)}(t))||e&&t&&"number"==typeof t.length){s&&(t=s);var r=0,n=function(){};return{s:n,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,l=!0,o=!1;return{s:function(){s=s.call(t)},n:function(){var t=s.next();return l=t.done,t},e:function(t){o=!0,i=t},f:function(){try{l||null==s.return||s.return()}finally{if(o)throw i}}}}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var s=0,r=new Array(e);s<e;s++)r[s]=t[s];return r}var n={name:"ViewGrades",data:function(){return{form:{input:{grades:[],all:!0}}}},mounted:function(){this.select_all()},methods:{select_all:function(){this.form.input.all=!0!==this.form.input.all;var t,e=r(this.$parent.grades);try{for(e.s();!(t=e.n()).done;){var s=t.value;this.$refs["grade_"+s.id]&&(this.$refs["grade_"+s.id][0].checked=this.form.input.all)}}catch(t){e.e(t)}finally{e.f()}},submitForm:function(t){var e=this;t.preventDefault(),this.form.input.grades=[];var s,a=r(this.$parent.grades);try{for(a.s();!(s=a.n()).done;){var n=s.value;this.$refs["grade_"+n.id]&&this.$refs["grade_"+n.id][0].checked&&this.form.input.grades.push(n.id)}}catch(t){a.e(t)}finally{a.f()}axios.post("/admin/grades/approvals/store",{grades:this.form.input.grades,term_class:this.$route.params.id}).then((function(t){e.$root.post_success(t.data.success)}))}}},i=s(0),l=Object(i.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"card shadow"},[s("div",{staticClass:"card-header bg-transparent"},[s("h2",[t._v("\n                        Approve Grades\n                        "),s("button",{staticClass:"btn btn-sm btn-outline-primary float-right",on:{click:function(e){return t.$router.push({name:"ad.grades.approvals",params:{id:t.$parent.term_class.term.id}})}}},[s("i",{staticClass:"ni ni-bold-left"}),t._v(" Back\n                        ")])]),t._v(" "),s("h4",[s("small",[t._v("Term:")]),t._v(" "+t._s(t.$parent.term_class.term.name)+"\n                    ")]),t._v(" "),s("h4",[s("small",[t._v("Course:")]),t._v(" "+t._s(t.$parent.term_class.course.name)+"\n                    ")])]),t._v(" "),s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"table align-items-center table-flush"},[s("thead",[s("tr",[s("th",[s("div",{staticClass:"custom-control custom-checkbox btn btn-sm btn-outline-primary"},[s("input",{ref:"select_all",staticClass:"custom-control-input",attrs:{id:"select_all",type:"checkbox"},on:{click:t.select_all}}),t._v(" "),s("label",{staticClass:"custom-control-label",attrs:{for:"select_all"}},[t._v("Approve All")])])]),t._v(" "),s("th",[t._v("Score")]),t._v(" "),s("th",[t._v("Student")]),t._v(" "),s("th",[t._v("#")])])]),t._v(" "),s("tbody",t._l(t.$parent.grades,(function(e){return null!=e.uploaded_by_profile_id&&null===e.approved_by_profile_id?s("tr",[s("td",[s("div",{staticClass:"custom-control custom-checkbox mb-3"},[s("input",{ref:"grade_"+e.id,refInFor:!0,staticClass:"custom-control-input",attrs:{id:"grade_"+e.id,type:"checkbox"}}),t._v(" "),s("label",{staticClass:"custom-control-label",attrs:{for:"grade_"+e.id}},[t._v("Approve")])])]),t._v(" "),s("th",[t._v("\n                                "+t._s(e.total)+"%\n                                "),e.resit_grade_id?s("span",[t._v("\n                                    (Resit)\n                                ")]):t._e()]),t._v(" "),s("td",[t._v("\n                                "+t._s(t.$root.full_name(e.student_profile.user))+"\n                            ")]),t._v(" "),s("td",[t._v("\n                                "+t._s(e.student_profile.user.num)+"\n                            ")])]):t._e()})),0)]),t._v(" "),s("form",{staticClass:"card-body",on:{submit:t.submitForm}},[t._m(0)])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"form-group mb-3"},[e("div",{staticClass:"input-group"},[e("div",{staticClass:"input-group-prepend"},[e("button",{staticClass:"btn btn-sm btn-primary",attrs:{type:"submit"}},[this._v("Approve Grades")])])])])}],!1,null,"98db5de8",null).exports,o={name:"IndexGrades"},c={name:"GradeApproval",components:{IndexGrades:Object(i.a)(o,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card shadow mb-4 mb-xl-0"},[t._m(0),t._v(" "),s("div",{staticClass:"card-body"},[s("form",{staticClass:"col-md-12",on:{submit:t.$parent.submitTerm}},[s("div",{staticClass:"form-group"},[s("div",{staticClass:"form-group mb-3"},[t.$parent.terms?s("div",{staticClass:"input-group"},[t._m(1),t._v(" "),s("v-select",{staticClass:"form-control",attrs:{options:t.$parent.terms,reduce:function(t){return t.id},label:"name"},on:{input:t.$parent.termSelected},scopedSlots:t._u([{key:"search",fn:function(e){var r=e.attributes,a=e.events;return[s("input",t._g(t._b({staticClass:"vs__search"},"input",r,!1),a))]}}],null,!1,411681397),model:{value:t.$parent.input.term.id,callback:function(e){t.$set(t.$parent.input.term,"id",e)},expression:"$parent.input.term.id"}})],1):t._e()])])]),t._v(" "),t.$parent.term_classes?s("table",{staticClass:"table"},[s("thead",[s("tr",[s("th"),t._v(" "),s("th",[t._v("\n                        Course of\n                        "),s("h3",{staticClass:"text-underline"},[t._v(t._s(t.$parent.term.name))])])])]),t._v(" "),s("tbody",t._l(t.$parent.term_classes,(function(e){return s("tr",[s("td",[s("router-link",{staticClass:"btn btn-sm btn-primary",attrs:{to:{name:"ad.grades.approvals",params:{id:t.$parent.term.id,tc:e.id}}}},[s("i",{staticClass:"ni ni-bold-right"})])],1),t._v(" "),s("td",[e.course_id?s("span",[t._v(t._s(e.course.name))]):s("span",[t._v("External Exams")])])])})),0)]):t._e()])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header bg-transparent"},[e("h3",{staticClass:"mb-0"},[this._v("\n                Approve Grades\n            ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[this._v("\n                                        Academic Terms :\n                                    ")])])}],!1,null,"73a33164",null).exports,ViewGrades:l},data:function(){return{grades:null,terms:null,term:null,term_classes:null,term_class:null,filter:{search:null},input:{term:{}}}},created:function(){this.fetchData()},watch:{$route:"fetchData"},mounted:function(){this.$store.state.page="Grade Approvals"},methods:{submitTerm:function(t){t.preventDefault()},termSelected:function(){this.$router.push({name:"ad.grades.approvals",params:{id:this.input.term.id}}),this.get_term_classes()},get_term_classes:function(){var t=this;null==this.terms&&this.get_terms(),axios.get("/admin/grades/approvals/classes/"+this.$route.params.id).then((function(e){t.term_classes=e.data.term_classes,t.term=e.data.term}))},fetchData:function(){void 0!==this.$route.params.id&&void 0===this.$route.params.tc?this.get_term_classes():void 0!==this.$route.params.tc?this.get_grades():this.get_terms()},get_grades:function(){var t=this;axios.get("/admin/grades/approvals/grades/"+this.$route.params.tc).then((function(e){t.grades=e.data.grades,t.term_class=e.data.term_class,t.prepare_grades()}))},get_terms:function(){var t=this;this.grades=null,axios.get("/admin/grades/approvals/terms").then((function(e){t.terms=e.data.terms}))},filter_users:function(t){var e=this;t.preventDefault(),axios.post("/admin/grades/search",{search:this.filter.search}).then((function(t){e.filter.search=null,e.user=t.data.user,e.profile=t.data.profile,e.$router.push({name:"ad.grades",params:{id:e.user.num}}),e.prepare_grades()}))},prepare_grades:function(){for(var t in this.grades)for(var e in this.grades[t].total=0,this.grades[t].scores)null!=this.grades[t].scores[e]&&(this.grades[t].total+=1*this.grades[t].scores[e])}}},u=Object(i.a)(c,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[this.grades?e("ViewGrades"):e("IndexGrades")],1)}),[],!1,null,"05c57f3e",null);e.default=u.exports}}]);