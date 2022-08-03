(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{122:function(t,r,e){"use strict";e.r(r);function a(t,r){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!e){if(Array.isArray(t)||(e=function(t,r){if(!t)return;if("string"==typeof t)return s(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return s(t,r)}(t))||r&&t&&"number"==typeof t.length){e&&(t=e);var a=0,n=function(){};return{s:n,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,o=!0,c=!1;return{s:function(){e=e.call(t)},n:function(){var t=e.next();return o=t.done,t},e:function(t){c=!0,i=t},f:function(){try{o||null==e.return||e.return()}finally{if(c)throw i}}}}function s(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,a=new Array(r);e<r;e++)a[e]=t[e];return a}var n={name:"Transcript",data:function(){return{user:null,profile:null,transcript:{}}},mounted:function(){this.$store.state.page="My Transcript",this.get_user()},methods:{get_user:function(){var t=this;axios.post("/students/get/transcript").then((function(r){t.user=r.data.user,t.profile=t.$root.generate_transcript(r.data.profile)}))},generate_transcript:function(){if(null==this.profile.major_department)this.$root.post_errors([["Your student status is invalid."]]);else if(this.profile.major_department.has_rotation){this.transcript={type:"m",data:[]};var t,r=[],e=a(this.profile.grades);try{for(e.s();!(t=e.n()).done;){var s=t.value;null!==s.term_class.term.external_exam_percentage?(this.transcript.data[s.id]=s,this.transcript.data[s.id].grades=[]):r[s.id]=s}}catch(t){e.e(t)}finally{e.f()}for(var n in r)for(var i in this.transcript.data)r[n].term_class.term.term_id===this.transcript.data[i].term_class.term.id&&(this.transcript.data[i].grades[r[n].id]=r[n])}else{this.transcript={type:"n",data:[]};var o,c=a(this.profile.grades);try{for(c.s();!(o=c.n()).done;){var l=o.value;void 0===this.transcript.data[l.term_class.term_id]&&(this.transcript.data[l.term_class.term_id]={term:l.term_class.term,grades:[]}),this.transcript.data[l.term_class.term_id].grades[l.id]=l}}catch(t){c.e(t)}finally{c.f()}}}}},i=e(0),o=Object(i.a)(n,(function(){var t=this,r=t.$createElement,e=t._self._c||r;return t.user&&t.profile.major_department?e("div",{staticClass:"row card shadow"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[t._l(Object.keys(t.profile.transcript.terms),(function(r){return e("table",{staticClass:"table table-borderless"},[e("thead",{staticStyle:{"margin-top":"3px","border-top":"1px solid #8898aa"}},[e("tr",{staticClass:"thead-light"},[e("th",{staticClass:"text-center",attrs:{colspan:"5"}},[e("h5",[t._v(t._s(t.profile.transcript.terms[r].term.name))])])]),t._v(" "),t._m(0,!0)]),t._v(" "),t._l(t.profile.transcript.terms[r].grades,(function(r){return e("tbody",t._l(Object.keys(r.transcript_data),(function(a){return e("tr",[e("td",[t._v("\n                            "+t._s(r.term_class.course.code)+"\n                        ")]),t._v(" "),e("td",[t._v("\n                            "+t._s(r.term_class.course.name)+"\n                            "),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:r.transcript_data[a].is_resit,expression:"grade.transcript_data[si].is_resit"}]},[t._v("\n                                        (Resit)\n                                    ")]),t._v(" "),r.transcript_data[a].is_not_approved?e("span",{staticClass:"float-right text-danger"},[t._v("\n                                        Not Approved\n                                    ")]):t._e()]),t._v(" "),e("td",{staticClass:"text-center"},[t._v("\n                            "+t._s(r.term_class.course.credit_hours)+"\n                        ")]),t._v(" "),e("td",{staticClass:"text-center"},[t._v("\n                            "+t._s(parseFloat(r.transcript_data[a].gs.point).toFixed(2))+"\n                        ")]),t._v(" "),e("td",{staticClass:"text-center"},[t._v("\n                            "+t._s(r.transcript_data[a].gs.grade)+"\n                        ")])])})),0)})),t._v(" "),t._m(1,!0)],2)})),t._v(" "),e("table",{staticClass:"table table-borderless"},[e("thead",{staticStyle:{"margin-top":"3px","border-top":"1px solid #8898aa"}},[e("tr",[e("th",{staticClass:"text-center",attrs:{colspan:"5"}},[e("span",{staticClass:"h5"},[t._v("\n                                    Average Quality Point:\n                                ")]),t._v(" "),e("span",{staticClass:"h3"},[t._v("\n                                    "+t._s(t.profile.transcript.gpa.calculated.toFixed(2))+"\n                                ")])])])])])],2)])])]):e("div",{staticClass:"row card card-stats"},[e("h3",{staticClass:"card-header"},[t._v("\n        Invalid Student Profile\n    ")])])}),[function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("tr",{staticClass:"thead-light"},[e("th",[t._v("Course Code")]),t._v(" "),e("th",[t._v("Course Description")]),t._v(" "),e("th",{staticClass:"text-center"},[t._v("Credit Value")]),t._v(" "),e("th",{staticClass:"text-center"},[t._v("Qualitative Point")]),t._v(" "),e("th",{staticClass:"text-center"},[t._v("Grade")])])},function(){var t=this.$createElement,r=this._self._c||t;return r("thead",[r("tr",[r("td",{attrs:{colspan:"5"}})])])}],!1,null,"9f451b70",null);r.default=o.exports}}]);