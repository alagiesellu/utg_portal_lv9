(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{120:function(t,s,e){"use strict";e.r(s);var o={name:"Logs",data:function(){return{db_logs:{},db_log:{},filter:{form:{user:null,model:null,model_id:null,user_id:null},data:{users:[],models:[]}},models:[],infos:[]}},mounted:function(){this.$store.state.page="Activity Logs",this.get_logs()},watch:{"filter.form.model":"search_modal"},methods:{search_modal:function(){var t=this;this.filter.form.model?axios.post("/admin/logs/find-models",{search:this.filter.form.model}).then((function(s){t.filter.data.models=s.data.models})):this.filter.data.models=[]},search_user:function(){var t=this;axios.post("/admin/search/users",{search:this.filter.form.user}).then((function(s){t.filter.data.users=s.data.users}))},filter_logs:function(t){var s=this;t.preventDefault(),axios.post("/admin/logs/filter",this.filter.form).then((function(t){s.db_logs=t.data.db_logs,s.infos=t.data.db_infos}))},get_logs:function(){var t=this,s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;axios.post("/admin/logs?page="+s,this.filter.form).then((function(s){t.db_logs=s.data.db_logs,t.infos=s.data.db_infos})),axios.get("/admin/logs/models").then((function(s){t.models=s.data.db_models}))},get_log:function(t){var s=this;axios.get("/admin/logs/"+t.id).then((function(t){s.db_log=t.data.db_log,s.$modal.show("modal")}))}}},a=e(0),l=Object(a.a)(o,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"card shadow mb-4 mb-xl-0"},[e("h2",{staticClass:"card-header bg-transparent"},[t._v("\n            Logs\n        ")]),t._v(" "),e("form",{staticClass:"card-footer col-md-12",on:{submit:t.filter_logs}},[e("div",{staticClass:"form-group"},[e("div",{staticClass:"input-group mb-4"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.form.user,expression:"filter.form.user"}],staticClass:"form-control",attrs:{placeholder:"Search user by email",type:"text"},domProps:{value:t.filter.form.user},on:{change:t.search_user,input:function(s){s.target.composing||t.$set(t.filter.form,"user",s.target.value)}}}),t._v(" "),e("v-select",{staticClass:"form-control",attrs:{options:t.filter.data.users,reduce:function(t){return t.id},label:"email"},scopedSlots:t._u([{key:"search",fn:function(s){var o=s.attributes,a=s.events;return[e("input",t._g(t._b({staticClass:"vs__search"},"input",o,!1),a))]}}]),model:{value:t.filter.form.user_id,callback:function(s){t.$set(t.filter.form,"user_id",s)},expression:"filter.form.user_id"}})],1)]),t._v(" "),e("div",{staticClass:"form-group"},[e("div",{staticClass:"input-group mb-4"},[e("v-select",{staticClass:"form-control",attrs:{options:t.models,reduce:function(t){return t.model},label:"model"},scopedSlots:t._u([{key:"search",fn:function(s){var o=s.attributes,a=s.events;return[e("input",t._g(t._b({staticClass:"vs__search"},"input",o,!1),a))]}}]),model:{value:t.filter.form.model,callback:function(s){t.$set(t.filter.form,"model",s)},expression:"filter.form.model"}}),t._v(" "),e("v-select",{staticClass:"form-control",attrs:{options:t.infos,reduce:function(t){return t.info},label:"info"},scopedSlots:t._u([{key:"search",fn:function(s){var o=s.attributes,a=s.events;return[e("input",t._g(t._b({staticClass:"vs__search"},"input",o,!1),a))]}}]),model:{value:t.filter.form.info,callback:function(s){t.$set(t.filter.form,"info",s)},expression:"filter.form.info"}}),t._v(" "),e("v-select",{staticClass:"form-control",attrs:{options:t.filter.data.models,reduce:function(t){return t.id},label:"id"},scopedSlots:t._u([{key:"search",fn:function(s){var o=s.attributes,a=s.events;return[e("input",t._g(t._b({staticClass:"vs__search"},"input",o,!1),a))]}}]),model:{value:t.filter.form.model_id,callback:function(s){t.$set(t.filter.form,"model_id",s)},expression:"filter.form.model_id"}})],1)]),t._v(" "),e("button",{staticClass:"btn btn-outline-primary float-right",attrs:{type:"submit"}},[t._v("\n                Filter Logs\n            ")])]),t._v(" "),e("table",{staticClass:"table align-items-center table-flush"},[t._m(0),t._v(" "),e("tbody",t._l(t.db_logs.data,(function(s){return e("tr",[e("td",[t._v(t._s(t.$root.full_name(s.user)))]),t._v(" "),e("td",[t._v(t._s(s.model))]),t._v(" "),e("td",[t._v(t._s(s.info))]),t._v(" "),e("td",[e("button",{staticClass:"btn btn-primary btn-sm",on:{click:function(e){return t.get_log(s)}}},[e("i",{staticClass:"ni ni-bullet-list-67"})])])])})),0)]),t._v(" "),e("laravel-vue-pagination",{attrs:{limit:5,data:t.db_logs,align:"center"},on:{"pagination-change-page":t.get_logs}})],1),t._v(" "),e("modal",{attrs:{scrollable:!0,name:"modal",height:"auto"}},[e("button",{staticClass:"btn btn-danger btn-sm float-right",on:{click:function(s){return t.$modal.hide("modal")}}},[t._v("❌")]),t._v(" "),e("div",{staticClass:"modal-header"},[t._v("Activity Log")]),t._v(" "),e("div",{staticClass:"modal-body"},[e("table",{staticClass:"table"},[e("tbody",[t.db_log.user?e("tr",[e("td",[t._v("User")]),t._v(" "),e("th",[t._v(t._s(t.$root.full_name(t.db_log.user)))])]):t._e(),t._v(" "),e("tr",[e("td",[t._v("Info")]),t._v(" "),e("th",[t._v(t._s(t.db_log.info))])]),t._v(" "),e("tr",[e("td",[t._v("Model")]),t._v(" "),e("th",[t._v(t._s(t.db_log.model))])]),t._v(" "),t.db_log.data?e("tr",[e("td",[t._v("Data")]),t._v(" "),e("th",t._l(Object.keys(t.db_log.data),(function(s){return e("li",[t._v("\n                            "+t._s(s)+": "+t._s(t.db_log.data[s])+"\n                        ")])})),0)]):t._e(),t._v(" "),e("tr",[e("td",[t._v("Timestamp")]),t._v(" "),e("th",[t._v(t._s(t.db_log.created_at))])])])])])])],1)}),[function(){var t=this.$createElement,s=this._self._c||t;return s("thead",{staticClass:"thead-light"},[s("tr",[s("th",{attrs:{scope:"col"}},[this._v("User")]),this._v(" "),s("th",{attrs:{scope:"col"}},[this._v("Model")]),this._v(" "),s("th",{attrs:{scope:"col"}},[this._v("Info")]),this._v(" "),s("th",{attrs:{scope:"col"}})])])}],!1,null,"7cd633c7",null);s.default=l.exports}}]);