(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{108:function(t,s,e){"use strict";e.r(s);var a={name:"ViewUsers",data:function(){return{grade:null,resit:{grade:null,input:{}},assessment:null,grade_resit:null,form:{input:{grade:null,score:null,assessment:null,password:null,grade_resit:null}}}},methods:{submitResitForm:function(t){var s=this;t.preventDefault(),this.resit.input.grade_id=this.resit.grade.id,this.resit.input.score*=1,axios.post("/admin/grades/resit",this.resit.input).then((function(t){s.$root.post_success(t.data.success),s.grade=t.data.grade,s.cal_grades(),s.$modal.hide("resit_score")}))},resit_grade:function(t){this.resit.grade=t,this.$modal.show("resit_score")},edit_resit:function(t){this.grade_resit=t,this.assessment=null,this.form.input.assessment=0,this.form.input.grade=this.grade_resit.id,this.form.input.score=this.grade_resit.scores[0],this.$modal.show("edit_score")},edit_score:function(t){this.assessment=t,this.grade_resit=null,this.form.input.assessment=t.id,this.form.input.grade=this.grade.id,this.form.input.score=this.grade.scores[t.id],this.$modal.show("edit_score")},submitForm:function(t){var s=this;t.preventDefault(),this.form.input.score*=1,axios.post("/admin/grades/update",this.form.input).then((function(t){s.$root.post_success(t.data.success),s.grade=t.data.grade,s.cal_grades(),s.$modal.hide("edit_score"),s.$parent.get_user()}))},view_grade:function(t){var s=this;axios.get("/admin/grades/get="+t.id).then((function(t){s.grade=t.data.grade,s.cal_grades(),s.$modal.show("view_grade")}))},cal_grades:function(){for(var t in this.grade.total=0,this.grade.scores)null!=this.grade.scores[t]&&(this.grade.total+=1*this.grade.scores[t]);if(this.grade.resit_grade)for(var s in this.grade.resit_grade.total=0,this.grade.resit_grade.scores)null!=this.grade.resit_grade.scores[s]&&(this.grade.resit_grade.total+=1*this.grade.resit_grade.scores[s])}}},r=e(0),i=Object(r.a)(a,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-8"},[e("div",{staticClass:"card shadow"},[t._m(0),t._v(" "),e("div",{staticClass:"table-responsive"},[e("table",{staticClass:"table align-items-center table-flush"},[t._m(1),t._v(" "),e("tbody",t._l(t.$parent.profile.grades,(function(s){return e("tr",[e("td",[e("button",{staticClass:"btn btn-sm btn-primary mb-3",on:{click:function(e){return t.view_grade(s)}}},[e("i",{staticClass:"ni ni-bold-right"})])]),t._v(" "),e("th",[t._v("\n                            "+t._s(s.total)+"%\n                        ")]),t._v(" "),e("td",[s.term_class.course?e("span",[t._v("\n                                "+t._s(s.term_class.course.name)+"\n                            ")]):e("span",[t._v("\n                                External Exam\n                            ")])]),t._v(" "),e("td",[t._v("\n                            "+t._s(s.term_class.term.name)+"\n                        ")])])})),0)])])])]),t._v(" "),e("div",{staticClass:"col-4"},[e("div",{staticClass:"card shadow"},[e("div",{staticClass:"card-body"},[e("router-link",{staticClass:"btn btn-sm btn-outline-primary mb-3",attrs:{to:{name:"ad.transcripts"}}},[e("i",{staticClass:"ni ni-bold-left"}),t._v(" Back\n                ")]),t._v(" "),e("img",{staticClass:"img-thumbnail",attrs:{src:"/storage/profiles/"+t.$parent.user.img}}),t._v(" "),e("div",{staticClass:"table-responsive"},[e("table",{staticClass:"table align-items-center table-flush"},[e("tbody",[e("tr",[e("th",[e("small",[t._v("MAT #")]),e("br"),t._v("\n                                "+t._s(t.$parent.user.num)+"\n                            ")])]),t._v(" "),e("tr",[e("th",[e("small",[t._v("First Name")]),e("br"),t._v("\n                                "+t._s(t.$parent.user.first_name)+"\n                            ")])]),t._v(" "),e("tr",[e("th",[e("small",[t._v("Middle Name")]),e("br"),t._v("\n                                "+t._s(t.$parent.user.middle_name)+"\n                            ")])]),t._v(" "),e("tr",[e("th",[e("small",[t._v("Last Name")]),e("br"),t._v("\n                                "+t._s(t.$parent.user.last_name)+"\n                            ")])]),t._v(" "),e("tr",[e("th",[e("small",[t._v("Email")]),e("br"),t._v("\n                                "+t._s(t.$parent.user.email)+"\n                            ")])]),t._v(" "),e("tr",[e("th",[e("small",[t._v("Tel")]),e("br"),t._v("\n                                "+t._s(t.$parent.user.tel)+"\n                            ")])]),t._v(" "),e("tr",[e("th",[e("small",[t._v("Address")]),e("br"),t._v("\n                                "+t._s(t.$parent.user.address)+"\n                            ")])]),t._v(" "),e("tr",[e("th",[e("small",[t._v("Gender")]),e("br"),t._v("\n                                "+t._s(this.$root.gender(t.$parent.user.gender))+"\n                            ")])]),t._v(" "),e("tr",[e("th",[e("small",[t._v("Date of Birth")]),e("br"),t._v("\n                                "+t._s(this.$root.format_date(t.$parent.user.dob))+"\n                            ")])]),t._v(" "),e("tr",[e("th",[e("small",[t._v("Nationality")]),e("br"),t._v("\n                                "+t._s(this.$root.country(t.$parent.user.nationality))+"\n                            ")])])])])])],1)])]),t._v(" "),e("modal",{attrs:{scrollable:!0,name:"view_grade",height:"auto"}},[e("h2",{staticClass:"modal-header"},[t._v("\n            Grade\n        ")]),t._v(" "),t.grade?e("div",{staticClass:"modal-body"},[e("button",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ad-23.1"),expression:"$store.state.auth.hasRole('ad-23.1')"}],staticClass:"btn btn-sm btn-warning float-right",on:{click:function(s){return t.resit_grade(t.grade)}}},[t._v("\n                Enter Reset Score\n            ")]),t._v(" "),e("table",{staticClass:"table"},[e("tbody",[t._l(t.grade.term_class.assessments,(function(s){return e("tr",[e("td",{attrs:{width:"75%"}},[t._v(t._s(s.name))]),t._v(" "),e("td",[t.grade.scores[s.id]?e("span",[t._v("\n                                "+t._s(t.grade.scores[s.id]+" / "+s.score)+"\n                                "),e("button",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ad-23.1"),expression:"$store.state.auth.hasRole('ad-23.1')"}],staticClass:"btn btn-sm btn-warning",on:{click:function(e){return t.edit_score(s)}}},[e("i",{staticClass:"ni ni-settings-gear-65"})])]):t._e()])])})),t._v(" "),e("tr",[e("th",{attrs:{width:"75%"}},[t._v("\n                        Total\n                    ")]),t._v(" "),e("th",[t._v(t._s(t.grade.total)+" / 100")])])],2),t._v(" "),t.grade.resit_grades?e("tbody",t._l(t.grade.resit_grades,(function(s){return e("tr",[e("th",{attrs:{width:"75%"}},[t._v("\n                        Resit Grade\n                        "),e("small",[t._v("- "+t._s(t.$root.format_date(s.created_at)))])]),t._v(" "),e("th",[e("span",[t._v("\n                            "+t._s(s.scores[0])+" / 100\n                                "),e("button",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ad-23.1"),expression:"$store.state.auth.hasRole('ad-23.1')"}],staticClass:"btn btn-sm btn-warning",on:{click:function(e){return t.edit_resit(s)}}},[e("i",{staticClass:"ni ni-settings-gear-65"})])])])])})),0):t._e()])]):t._e()]),t._v(" "),e("modal",{attrs:{scrollable:!0,name:"edit_score",height:"auto"}},[e("h2",{staticClass:"modal-header"},[t._v("Edit Grade")]),t._v(" "),e("div",{staticClass:"modal-body"},[e("form",{on:{submit:t.submitForm}},[e("fake-form-input"),t._v(" "),t.assessment?e("div",{staticClass:"form-group"},[e("div",{staticClass:"input-group input-group-sm mb-4"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.input.score,expression:"form.input.score"}],staticClass:"form-control",attrs:{placeholder:"score",type:"number",step:"0.01",min:"0",max:t.assessment.score},domProps:{value:t.form.input.score},on:{input:function(s){s.target.composing||t.$set(t.form.input,"score",s.target.value)}}}),t._v(" "),e("div",{staticClass:"input-group-append"},[e("span",{staticClass:"input-group-text"},[t._v("/ "+t._s(t.assessment.score))])])])]):t._e(),t._v(" "),t.grade_resit?e("div",{staticClass:"form-group"},[e("div",{staticClass:"input-group input-group-sm mb-4"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.input.score,expression:"form.input.score"}],staticClass:"form-control",attrs:{placeholder:"score",type:"number",step:"0.01",min:"0",max:"100"},domProps:{value:t.form.input.score},on:{input:function(s){s.target.composing||t.$set(t.form.input,"score",s.target.value)}}}),t._v(" "),e("div",{staticClass:"input-group-append"},[e("span",{staticClass:"input-group-text"},[t._v("/ 100")])])])]):t._e(),t._v(" "),e("div",{staticClass:"form-group mb-3"},[e("div",{staticClass:"input-group"},[e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[e("i",{staticClass:"ni ni-lock-circle-open"})])]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.input.password,expression:"form.input.password"}],staticClass:"form-control",attrs:{placeholder:"Password confirmation",type:"password",required:""},domProps:{value:t.form.input.password},on:{input:function(s){s.target.composing||t.$set(t.form.input,"password",s.target.value)}}})])]),t._v(" "),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Save changes")]),t._v(" "),e("button",{staticClass:"btn btn-danger",attrs:{type:"reset"},on:{click:function(s){return t.$modal.hide("edit_score")}}},[t._v("Cancel")])])],1)])]),t._v(" "),e("modal",{attrs:{scrollable:!0,name:"resit_score",height:"auto"}},[e("h2",{staticClass:"modal-header"},[t._v("\n            Resit Score\n        ")]),t._v(" "),t.resit.grade?e("div",{staticClass:"modal-body"},[e("h3",[e("small",[t._v("Student:")]),t._v(" "+t._s(t.$root.full_name(t.$parent.user))+" #"+t._s(t.$parent.user.num)+"\n            ")]),t._v(" "),e("h3",[e("small",[t._v("Course:")]),t._v(" "+t._s(t.resit.grade.term_class.course.name)+"\n            ")]),t._v(" "),e("form",{on:{submit:t.submitResitForm}},[e("fake-form-input"),t._v(" "),e("div",{staticClass:"form-group"},[e("div",{staticClass:"input-group input-group-sm mb-4"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.resit.input.score,expression:"resit.input.score"}],staticClass:"form-control",attrs:{placeholder:"score",type:"number",step:"0.01",min:"0",max:"100"},domProps:{value:t.resit.input.score},on:{input:function(s){s.target.composing||t.$set(t.resit.input,"score",s.target.value)}}}),t._v(" "),e("div",{staticClass:"input-group-append"},[e("span",{staticClass:"input-group-text"},[t._v("/ 100")])])])]),t._v(" "),e("div",{staticClass:"form-group mb-3"},[e("div",{staticClass:"input-group"},[e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[e("i",{staticClass:"ni ni-lock-circle-open"})])]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.resit.input.password,expression:"resit.input.password"}],staticClass:"form-control",attrs:{placeholder:"Password confirmation",type:"password",required:""},domProps:{value:t.resit.input.password},on:{input:function(s){s.target.composing||t.$set(t.resit.input,"password",s.target.value)}}})])]),t._v(" "),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Save changes")]),t._v(" "),e("button",{staticClass:"btn btn-danger",attrs:{type:"reset"},on:{click:function(s){return t.$modal.hide("resit_score")}}},[t._v("Cancel")])])],1)]):t._e()])],1)}),[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"card-header bg-transparent"},[s("h3",{staticClass:"mb-0"},[this._v("\n                    Grades\n                ")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("thead",[s("tr",[s("th"),this._v(" "),s("th",[this._v("Score")]),this._v(" "),s("th",[this._v("Class")]),this._v(" "),s("th",[this._v("Term")])])])}],!1,null,"852558a0",null).exports,n={name:"IndexUsers"},o={name:"Grades",components:{IndexUsers:Object(r.a)(n,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-8"},[e("div",{staticClass:"card shadow mb-4 mb-xl-0"},[t._m(0),t._v(" "),e("form",{staticClass:"card-body col-md-12",on:{submit:t.$parent.filter_users}},[e("div",{staticClass:"form-group"},[e("div",{staticClass:"input-group mb-4"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.$parent.filter.search,expression:"$parent.filter.search"}],staticClass:"form-control",attrs:{placeholder:"Search by MAT number",type:"number"},domProps:{value:t.$parent.filter.search},on:{input:function(s){s.target.composing||t.$set(t.$parent.filter,"search",s.target.value)}}}),t._v(" "),t._m(1)])])])])]),t._v(" "),e("div",{staticClass:"col-md-4"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("router-link",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.auth.hasRole("ad-23.2"),expression:"$store.state.auth.hasRole('ad-23.2')"}],staticClass:"btn btn-primary btn-block",attrs:{to:{name:"ad.grades.approvals"}}},[t._v("\n                    Grade Approval\n                ")])],1)])])])}),[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"card-header bg-transparent"},[s("h3",{staticClass:"mb-0"},[this._v("\n                    Search Student Profile\n                ")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"input-group-append"},[s("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[s("i",{staticClass:"ni ni-zoom-split-in"}),this._v("\n                                Search\n                            ")])])}],!1,null,"50208ad6",null).exports,ViewUsers:i},data:function(){return{user:null,profile:null,filter:{search:null}}},created:function(){this.fetchData()},watch:{$route:"fetchData"},mounted:function(){this.$store.state.page="Student Grades"},methods:{fetchData:function(){void 0===this.$route.params.id?this.user=null:null==this.user&&this.get_user()},get_user:function(){var t=this;axios.get("/admin/grades/"+this.$route.params.id).then((function(s){t.user=s.data.user,t.profile=s.data.profile,t.prepare_grades()}))},filter_users:function(t){var s=this;t.preventDefault(),axios.post("/admin/grades/search",{search:this.filter.search}).then((function(t){s.filter.search=null,s.user=t.data.user,s.profile=t.data.profile,s.$router.push({name:"ad.grades",params:{id:s.user.num}}),s.prepare_grades()}))},prepare_grades:function(){for(var t in this.profile.grades)for(var s in this.profile.grades[t].total=0,this.profile.grades[t].scores)null!=this.profile.grades[t].scores[s]&&(this.profile.grades[t].total+=1*this.profile.grades[t].scores[s])}}},l=Object(r.a)(o,(function(){var t=this.$createElement,s=this._self._c||t;return s("div",[this.user?s("ViewUsers"):s("IndexUsers")],1)}),[],!1,null,"6c6e55a6",null);s.default=l.exports}}]);