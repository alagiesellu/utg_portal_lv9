(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{124:function(t,n,e){"use strict";e.r(n);function r(t,n){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!e){if(Array.isArray(t)||(e=function(t,n){if(!t)return;if("string"==typeof t)return a(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return a(t,n)}(t))||n&&t&&"number"==typeof t.length){e&&(t=e);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,i=!0,l=!1;return{s:function(){e=e.call(t)},n:function(){var t=e.next();return i=t.done,t},e:function(t){l=!0,s=t},f:function(){try{i||null==e.return||e.return()}finally{if(l)throw s}}}}function a(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}var o={name:"Calendar",components:{"full-calendar":e(81)},data:function(){return{events:[],event:null}},mounted:function(){this.get_calendar()},methods:{eventClick:function(t,n,e){this.event=t,this.$modal.show("event")},get_calendar:function(){var t=this;axios.get("/students/current/calendar").then((function(n){var e,a=r(n.data.assessments);try{for(a.s();!(e=a.n()).done;){var o=e.value;t.events.push({title:o.name,start:o.starting_at,end:o.ending_at,more:{info:o.info,course:o.course.code+" - "+o.course.name}})}}catch(t){a.e(t)}finally{a.f()}})).catch((function(n){t.$root.post_errors(n)}))}}},s=e(0),i=Object(s.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"row"},[e("div",{staticClass:"card bg-secondary shadow col-12"},[e("div",{staticClass:"card-body"},[e("full-calendar",{attrs:{events:t.events},on:{eventClick:t.eventClick}}),t._v(" "),e("modal",{attrs:{scrollable:!0,name:"event",height:"auto",draggable:!0}},[t.event?e("div",{staticClass:"modal-body"},[e("h2",[t._v(t._s(t.event.title))]),t._v(" "),e("h3",[e("small",[t._v("Course:")]),t._v("\n                        "+t._s(t.event.more.course)+"\n                    ")]),t._v(" "),e("h4",[e("small",[t._v("Starting At:")]),t._v("\n                        "+t._s(t.$root.moment(t.event.start))+"\n                    ")]),t._v(" "),e("h4",[e("small",[t._v("Ending At:")]),t._v("\n                        "+t._s(t.$root.moment(t.event.end))+"\n                    ")]),t._v(" "),e("p",[t._v("\n                        "+t._s(t.event.more.info)+"\n                    ")])]):t._e()])],1)])])}),[],!1,null,"05df2a4d",null);n.default=i.exports}}]);