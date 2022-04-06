(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Classes/EditClasses.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Classes/EditClasses.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layouts_FakeFormInputs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../layouts/FakeFormInputs */ "./resources/js/components/layouts/FakeFormInputs.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    FakeFormInputs: _layouts_FakeFormInputs__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  name: "EditClasses",
  data: function data() {
    return {
      window: window,
      courses: [],
      major_term_classes: [],
      venues: [],
      errors: null,
      search: {
        course: '',
        venue: ''
      },
      week_days: window.week_days,
      times: this.$parent.form.input.times
    };
  },
  created: function created() {
    this.venues.push(this.$parent.form.input.term_class.venue); // this.loadMajorCourses(this.$parent.term_class.term_id);
  },
  methods: {
    removeDayInput: function removeDayInput(index) {
      this.$parent.form.input.term_class.times.splice(index, 1);
    },
    addDayInput: function addDayInput() {
      this.$parent.form.input.term_class.times.push({
        day: '',
        time: ''
      });
    },
    submitForm: function submitForm(e) {
      var _this = this;

      e.preventDefault();
      axios.post('/admin/classes/edit', this.$parent.form.input.term_class).then(function (res) {
        _this.$root.post_success(res.data.success);

        _this.$router.push({
          name: 'ad.show.classes',
          params: {
            "class": _this.$parent.form.input.term_class.id
          }
        });
      });
    },
    searchVenue: function searchVenue() {
      var _this2 = this;

      axios.post('/admin/search/venues', {
        search: this.search.venue
      }).then(function (res) {
        _this2.venues = res.data.venues;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Classes/ViewClasses.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Classes/ViewClasses.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layouts_FakeFormInputs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../layouts/FakeFormInputs */ "./resources/js/components/layouts/FakeFormInputs.vue");
/* harmony import */ var _EditClasses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditClasses */ "./resources/js/components/admin/Classes/EditClasses.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    EditClasses: _EditClasses__WEBPACK_IMPORTED_MODULE_1__["default"],
    FakeFormInputs: _layouts_FakeFormInputs__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  name: "ViewClasses",
  data: function data() {
    return {
      term_class: {},
      reset: {
        assessment: null,
        form: {}
      },
      form: {
        input: {
          profile_id: null,
          remove_id: null,
          password: null,
          search: '',
          term_class: null
        },
        "delete": {
          id: null,
          password: null
        }
      },
      lecturers: [],
      errors: null,
      class_registrations: {}
    };
  },
  created: function created() {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    registerAllStudents: function registerAllStudents() {
      var _this = this;

      axios.post('/admin/classes/register-all-students', {
        "class": this.$route.params["class"]
      }).then(function (res) {
        _this.$root.post_success(res.data.success);

        _this.term_class = res.data.term_class;
      });
    },
    resetAssessmentForm: function resetAssessmentForm(e) {
      var _this2 = this;

      e.preventDefault();
      axios.post('/admin/classes/reset/assessment', this.reset.form).then(function (res) {
        _this2.$root.post_success(res.data.success);

        _this2.term_class = res.data.term_class;
      });
    },
    reset_assessment: function reset_assessment(assessment) {
      this.reset.assessment = assessment;
      this.reset.form.id = assessment.id;
      this.reset.form.score = assessment.score;
      this.reset.form.term_class_id = this.term_class.id;
      this.reset.form.password = null;
      this.$modal.show('reset_assessment');
    },
    view_students: function view_students() {
      this.get_students();
      this.$modal.show('students');
    },
    get_students: function get_students() {
      var _this3 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      axios.get('/admin/classes/registrations=' + this.term_class.id + '?page=' + page).then(function (res) {
        _this3.class_registrations = res.data.class_registrations;
      });
    },
    search: function search() {
      var _this4 = this;

      this.lecturers = {};
      axios.post('/admin/search/lecturers', {
        search: this.form.input.search
      }).then(function (res) {
        _this4.lecturers = res.data.lecturers;
      });
    },
    submitDeleteForm: function submitDeleteForm(e) {
      var _this5 = this;

      e.preventDefault();
      this.form["delete"].id = this.term_class.id;
      this.form["delete"].term = this.term_class.term;
      axios.post('/admin/classes/destroy', this.form["delete"]).then(function (res) {
        _this5.$root.post_success(res.data.success);

        _this5.$router.push({
          name: 'ad.term.classes',
          params: {
            term: _this5.form["delete"].term.id
          }
        });
      });
    },
    submitForm: function submitForm(e) {
      var _this6 = this;

      e.preventDefault();
      this.form.input.term_class_id = this.term_class.id;

      if (this.form.type === 'al') {
        axios.post('/admin/classes/add-lecturer', this.form.input).then(function (res) {
          _this6.term_class = res.data.term_class;

          _this6.$root.post_success(res.data.success);

          _this6.get_class(_this6.$route.params["class"]);

          _this6.$modal.hide('add_lecturer');
        });
      }
    },
    addLecturer: function addLecturer() {
      this.$modal.show('add_lecturer');
      this.form.input = {
        password: '',
        profile_id: null,
        remove_id: 0
      };
      this.form.type = 'al';
    },
    fetchData: function fetchData() {
      this.get_class(this.$route.params["class"]);
      if (this.$route.params.ops === undefined) this.form.input.term_class = null;
    },
    get_class: function get_class(id) {
      var _this7 = this;

      axios.get('/admin/classes/show=' + id).then(function (res) {
        _this7.term_class = res.data.term_class; // console.log(this.term_class)

        if (_this7.$route.params.ops === 'edit') _this7.form.input.term_class = _this7.term_class;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Classes/EditClasses.vue?vue&type=template&id=56849e18&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Classes/EditClasses.vue?vue&type=template&id=56849e18&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "card shadow mb-4 mb-xl-0 col-md-10" }, [
    _c("div", { staticClass: "card-header bg-transparent" }, [
      _c(
        "div",
        { staticClass: "float-right" },
        [
          _c(
            "router-link",
            {
              staticClass: "btn btn-outline-primary btn-sm",
              attrs: {
                to: {
                  name: "ad.show.classes",
                  params: { term: _vm.$parent.form.input.term_class.id },
                },
              },
            },
            [
              _c("i", { staticClass: "ni ni-bold-left" }),
              _vm._v(" Back\n                "),
            ]
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c("h3", { staticClass: "mb-0" }, [
        _vm._v("\n                Edit Class\n            "),
      ]),
      _vm._v(" "),
      _vm._m(0),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "card-body" }, [
      _c(
        "form",
        { on: { submit: _vm.submitForm } },
        [
          _c("fake-form-input"),
          _vm._v(" "),
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "form-group col-md-4" }, [
              _c("small", [_vm._v("Search venue by room number")]),
              _vm._v(" "),
              _c("div", { staticClass: "input-group mb-4" }, [
                _vm._m(1),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.search.venue,
                      expression: "search.venue",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: { placeholder: "...", type: "text" },
                  domProps: { value: _vm.search.venue },
                  on: {
                    input: [
                      function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.search, "venue", $event.target.value)
                      },
                      _vm.searchVenue,
                    ],
                  },
                }),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group mb-3 col-md-8" }, [
              _c("small", [_vm._v("Venues found")]),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.venues.length > 0,
                      expression: "venues.length > 0",
                    },
                  ],
                  staticClass: "input-group",
                },
                [
                  _vm._m(2),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.$parent.form.input.term_class.venue_id,
                          expression: "$parent.form.input.term_class.venue_id",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: { required: "" },
                      on: {
                        change: function ($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function (o) {
                              return o.selected
                            })
                            .map(function (o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.$set(
                            _vm.$parent.form.input.term_class,
                            "venue_id",
                            $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          )
                        },
                      },
                    },
                    _vm._l(_vm.venues, function (venue) {
                      return _c("option", { domProps: { value: venue.id } }, [
                        _vm._v(
                          "\n                                    " +
                            _vm._s(venue.name) +
                            "\n                                "
                        ),
                      ])
                    }),
                    0
                  ),
                ]
              ),
            ]),
          ]),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _vm._l(
            Object.keys(_vm.$parent.form.input.term_class.times),
            function (day) {
              return _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "form-group mb-3 col-md-6" }, [
                  _c("div", { staticClass: "input-group" }, [
                    _vm._m(3, true),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value:
                              _vm.$parent.form.input.term_class.times[day].day,
                            expression:
                              "$parent.form.input.term_class.times[day].day",
                          },
                        ],
                        staticClass: "form-control",
                        attrs: { required: "" },
                        on: {
                          change: function ($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function (o) {
                                return o.selected
                              })
                              .map(function (o) {
                                var val = "_value" in o ? o._value : o.value
                                return val
                              })
                            _vm.$set(
                              _vm.$parent.form.input.term_class.times[day],
                              "day",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          },
                        },
                      },
                      _vm._l(_vm.week_days, function (w_day) {
                        return _c("option", { domProps: { value: w_day } }, [
                          _vm._v(
                            "\n                                    " +
                              _vm._s(w_day) +
                              "\n                                "
                          ),
                        ])
                      }),
                      0
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-4" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value:
                            _vm.$parent.form.input.term_class.times[day].time,
                          expression:
                            "$parent.form.input.term_class.times[day].time",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "time",
                        placeholder: "Time",
                        required: "",
                      },
                      domProps: {
                        value:
                          _vm.$parent.form.input.term_class.times[day].time,
                      },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.$parent.form.input.term_class.times[day],
                            "time",
                            $event.target.value
                          )
                        },
                      },
                    }),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-2" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-outline-danger btn-block",
                      on: {
                        click: function ($event) {
                          return _vm.removeDayInput(day)
                        },
                      },
                    },
                    [_c("i", { staticClass: "ni ni-fat-remove" })]
                  ),
                ]),
              ])
            }
          ),
          _vm._v(" "),
          _c(
            "button",
            { staticClass: "btn btn-default", on: { click: _vm.addDayInput } },
            [
              _c("i", { staticClass: "ni ni-fat-add" }),
              _vm._v(" Add\n                "),
            ]
          ),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-md-6 form-group mb-3" }, [
              _c("div", { staticClass: "input-group" }, [
                _vm._m(4),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.$parent.form.input.term_class.size,
                      expression: "$parent.form.input.term_class.size",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: {
                    type: "number",
                    min: _vm.window.options.min_class_size,
                    max: _vm.window.options.max_class_size,
                    required: "",
                  },
                  domProps: { value: _vm.$parent.form.input.term_class.size },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.$parent.form.input.term_class,
                        "size",
                        $event.target.value
                      )
                    },
                  },
                }),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            _c(
              "button",
              { staticClass: "btn btn-primary", attrs: { type: "submit" } },
              [_vm._v("Save changes")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-link ml-auto",
                attrs: { type: "button" },
                on: {
                  click: function ($event) {
                    return _vm.$router.go(-1)
                  },
                },
              },
              [_vm._v("\n                        Back\n                    ")]
            ),
          ]),
        ],
        2
      ),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("small", [
      _vm._v("\n                Can edit the following;\n                "),
      _c("ul", [
        _c("li", [_vm._v("Venue")]),
        _vm._v(" "),
        _c("li", [_vm._v("Days")]),
        _vm._v(" "),
        _c("li", [_vm._v("Class Size")]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [
        _c("i", { staticClass: "ni ni-zoom-split-in" }),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [
        _vm._v(
          "\n                                            Venue:\n                                        "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [
        _vm._v(
          "\n                                            Day:\n                                        "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("Class Size:")]),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Classes/ViewClasses.vue?vue&type=template&id=1474729d&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Classes/ViewClasses.vue?vue&type=template&id=1474729d&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "col-md-12" },
    [
      _vm.form.input.term_class
        ? _c("EditClasses")
        : _c(
            "div",
            { staticClass: "card shadow mb-4 mb-xl-0", attrs: { id: "view" } },
            [
              _c("div", { staticClass: "card-header bg-transparent" }, [
                _c(
                  "h2",
                  { staticClass: "mb-0" },
                  [
                    _c("i", { staticClass: "ni ni-calendar-grid-58" }),
                    _vm._v(" "),
                    _vm.term_class.term
                      ? _c(
                          "router-link",
                          {
                            attrs: {
                              to: {
                                name: "ad.term.classes",
                                params: { term: _vm.term_class.term.id },
                              },
                            },
                          },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(_vm.term_class.term.name) +
                                "\n                    "
                            ),
                          ]
                        )
                      : _vm._e(),
                    _vm._v("\n                    Class\n                    "),
                    _c(
                      "div",
                      { staticClass: "float-right" },
                      [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-danger btn-sm",
                            on: {
                              click: function ($event) {
                                return _vm.$modal.show("delete_modal")
                              },
                            },
                          },
                          [_vm._v("Delete")]
                        ),
                        _vm._v(" "),
                        _c(
                          "router-link",
                          {
                            staticClass: "btn btn-warning btn-sm",
                            attrs: {
                              to: {
                                name: "ad.show.classes",
                                params: {
                                  term: _vm.term_class.id,
                                  ops: "edit",
                                },
                              },
                            },
                          },
                          [
                            _vm._v(
                              "\n                            Edit\n                        "
                            ),
                          ]
                        ),
                      ],
                      1
                    ),
                  ],
                  1
                ),
              ]),
              _vm._v(" "),
              _c(
                "modal",
                {
                  attrs: {
                    scrollable: true,
                    name: "delete_modal",
                    height: "auto",
                  },
                },
                [
                  _c("h2", { staticClass: "modal-header" }, [
                    _vm._v("Delete Class"),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "modal-body" }, [
                    _c(
                      "form",
                      { on: { submit: _vm.submitDeleteForm } },
                      [
                        _c("fake-form-input"),
                        _vm._v(" "),
                        _c("div", { staticClass: "modal-footer" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-primary",
                              attrs: { type: "submit" },
                            },
                            [_vm._v("Save changes")]
                          ),
                        ]),
                      ],
                      1
                    ),
                  ]),
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "table-responsive" }, [
                _c(
                  "table",
                  { staticClass: "table align-items-center table-flush" },
                  [
                    _c(
                      "tbody",
                      [
                        _c("tr", [
                          _c("td", [_vm._v("Course")]),
                          _vm._v(" "),
                          _vm.term_class.course
                            ? _c("th", [
                                _vm.term_class.term_class
                                  ? _c(
                                      "span",
                                      { staticClass: "text-underline" },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            _vm.term_class.term_class.course
                                              .name
                                          ) + " "
                                        ),
                                        _c("br"),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(_vm.term_class.course.name) +
                                    "\n                        "
                                ),
                              ])
                            : _vm._e(),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", [_vm._v("Venue")]),
                          _vm._v(" "),
                          _vm.term_class.venue_id !== 0
                            ? _c("th", [
                                _vm._v(_vm._s(_vm.term_class.venue.name)),
                              ])
                            : _vm._e(),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", [_vm._v("Times")]),
                          _vm._v(" "),
                          _vm.term_class.times
                            ? _c(
                                "th",
                                _vm._l(_vm.term_class.times, function (time) {
                                  return _c("li", [
                                    _c("strong", [_vm._v(_vm._s(time.day))]),
                                    _vm._v(
                                      ", " +
                                        _vm._s(_vm.$root.moment(time.time)) +
                                        "\n                            "
                                    ),
                                  ])
                                }),
                                0
                              )
                            : _vm._e(),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", [_vm._v("Size")]),
                          _vm._v(" "),
                          _c("th", [
                            _vm._v(
                              "\n                            " +
                                _vm._s(_vm.term_class.taken) +
                                " "
                            ),
                            _c("small", [_vm._v("taken")]),
                            _vm._v(
                              "\n                            +\n                            " +
                                _vm._s(
                                  _vm.term_class.size - _vm.term_class.taken
                                ) +
                                " "
                            ),
                            _c("small", [_vm._v("available")]),
                            _vm._v(
                              "\n                            /\n                            "
                            ),
                            _c("small", [_vm._v("total")]),
                            _vm._v(
                              " " +
                                _vm._s(_vm.term_class.size) +
                                "\n                            "
                            ),
                            _c("div", { staticClass: "progress" }, [
                              _c("div", {
                                staticClass: "progress-bar bg-danger",
                                style:
                                  "width: " +
                                  (_vm.term_class.taken / _vm.term_class.size) *
                                    100 +
                                  "%;",
                                attrs: {
                                  role: "progressbar",
                                  "aria-valuenow": _vm.term_class.taken,
                                  "aria-valuemin": "0",
                                  "aria-valuemax": _vm.term_class.size,
                                },
                              }),
                            ]),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", [_vm._v("Students")]),
                          _vm._v(" "),
                          _c("th", [
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-primary btn-sm",
                                on: { click: _vm.view_students },
                              },
                              [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(_vm.term_class.taken) +
                                    " registered students.\n                            "
                                ),
                              ]
                            ),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c(
                          "modal",
                          {
                            attrs: {
                              name: "students",
                              height: "auto",
                              draggable: true,
                            },
                          },
                          [
                            _c("div", { staticClass: "modal modal-content" }, [
                              _c("div", { staticClass: "modal-header" }, [
                                _vm._v(
                                  "\n                                Registered Students\n                            "
                                ),
                              ]),
                              _vm._v(" "),
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-danger btn-sm float-right",
                                  on: { click: _vm.registerAllStudents },
                                },
                                [_vm._v("Register All Students from Set")]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "modal-body" },
                                [
                                  _c("table", { staticClass: "table" }, [
                                    _c("thead", [
                                      _c("tr", [
                                        _c("th", [_vm._v("#")]),
                                        _vm._v(" "),
                                        _c("th", [_vm._v("Student")]),
                                        _vm._v(" "),
                                        _c("th"),
                                      ]),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "tbody",
                                      _vm._l(
                                        _vm.class_registrations.data,
                                        function (regs) {
                                          return _c("tr", [
                                            _c("td", [
                                              _vm._v(
                                                _vm._s(regs.profile.user.num)
                                              ),
                                            ]),
                                            _vm._v(" "),
                                            _c("td", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$root.full_name(
                                                    regs.profile.user
                                                  )
                                                )
                                              ),
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "td",
                                              [
                                                _c(
                                                  "router-link",
                                                  {
                                                    staticClass:
                                                      "btn btn-sm btn-primary",
                                                    attrs: {
                                                      to: {
                                                        name: "ad.student.classes",
                                                        params: {
                                                          class:
                                                            _vm.term_class.id,
                                                          id: regs.profile.id,
                                                        },
                                                      },
                                                      target: "_blank",
                                                    },
                                                  },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "ni ni-bullet-list-67",
                                                    }),
                                                  ]
                                                ),
                                              ],
                                              1
                                            ),
                                          ])
                                        }
                                      ),
                                      0
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("laravel-vue-pagination", {
                                    attrs: {
                                      limit: 5,
                                      data: _vm.class_registrations,
                                      align: "center",
                                    },
                                    on: {
                                      "pagination-change-page":
                                        _vm.get_students,
                                    },
                                  }),
                                ],
                                1
                              ),
                            ]),
                          ]
                        ),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", [_vm._v("Lecturers")]),
                          _vm._v(" "),
                          _vm.term_class.class_lecturers
                            ? _c(
                                "th",
                                [
                                  _vm._l(
                                    _vm.term_class.class_lecturers,
                                    function (lect) {
                                      return _c("li", [
                                        _vm._v(
                                          "\n                                " +
                                            _vm._s(
                                              _vm.$root.full_name(
                                                lect.profile.user
                                              )
                                            ) +
                                            "\n                                "
                                        ),
                                        _c(
                                          "small",
                                          { staticClass: "text-underline" },
                                          [
                                            _vm._v(
                                              _vm._s(lect.profile.user.email)
                                            ),
                                          ]
                                        ),
                                      ])
                                    }
                                  ),
                                  _vm._v(" "),
                                  _c("br"),
                                  _vm._v(" "),
                                  _c(
                                    "button",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value:
                                            _vm.$store.state.auth.hasRole(
                                              "ad-6"
                                            ),
                                          expression:
                                            "$store.state.auth.hasRole('ad-6')",
                                        },
                                      ],
                                      staticClass:
                                        "btn btn-sm btn-outline-dark",
                                      on: { click: _vm.addLecturer },
                                    },
                                    [
                                      _c("i", {
                                        staticClass: "ni ni-ruler-pencil",
                                      }),
                                      _vm._v(
                                        " Lecturer Allocation\n                            "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "modal",
                                    {
                                      attrs: {
                                        scrollable: true,
                                        name: "add_lecturer",
                                        height: "auto",
                                      },
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "modal modal-content" },
                                        [
                                          _c(
                                            "h1",
                                            { staticClass: "modal-header" },
                                            [_vm._v("Lecturer Allocation")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "form",
                                            {
                                              staticClass: "modal-body",
                                              on: { submit: _vm.submitForm },
                                            },
                                            [
                                              _c("fake-form-input"),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "row" },
                                                [
                                                  _c(
                                                    "div",
                                                    { staticClass: "col-12" },
                                                    [
                                                      _c("label", [
                                                        _vm._v("Add Lecturer"),
                                                      ]),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "form-group  col-md-4",
                                                    },
                                                    [
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "input-group mb-4",
                                                        },
                                                        [
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "input-group-prepend",
                                                            },
                                                            [
                                                              _c(
                                                                "span",
                                                                {
                                                                  staticClass:
                                                                    "input-group-text",
                                                                },
                                                                [
                                                                  _c("i", {
                                                                    staticClass:
                                                                      "ni ni-zoom-split-in",
                                                                  }),
                                                                ]
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c("input", {
                                                            directives: [
                                                              {
                                                                name: "model",
                                                                rawName:
                                                                  "v-model",
                                                                value:
                                                                  _vm.form.input
                                                                    .search,
                                                                expression:
                                                                  "form.input.search",
                                                              },
                                                            ],
                                                            staticClass:
                                                              "form-control",
                                                            attrs: {
                                                              placeholder:
                                                                "Search lecturer by name or email..",
                                                              type: "text",
                                                            },
                                                            domProps: {
                                                              value:
                                                                _vm.form.input
                                                                  .search,
                                                            },
                                                            on: {
                                                              change:
                                                                _vm.search,
                                                              input: function (
                                                                $event
                                                              ) {
                                                                if (
                                                                  $event.target
                                                                    .composing
                                                                ) {
                                                                  return
                                                                }
                                                                _vm.$set(
                                                                  _vm.form
                                                                    .input,
                                                                  "search",
                                                                  $event.target
                                                                    .value
                                                                )
                                                              },
                                                            },
                                                          }),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "form-group mb-3 col-md-8",
                                                    },
                                                    [
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "input-group",
                                                        },
                                                        [
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "input-group-prepend",
                                                            },
                                                            [
                                                              _c(
                                                                "span",
                                                                {
                                                                  staticClass:
                                                                    "input-group-text",
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                        User:\n                                                    "
                                                                  ),
                                                                ]
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _vm.lecturers.length
                                                            ? _c(
                                                                "select",
                                                                {
                                                                  directives: [
                                                                    {
                                                                      name: "model",
                                                                      rawName:
                                                                        "v-model",
                                                                      value:
                                                                        _vm.form
                                                                          .input
                                                                          .profile_id,
                                                                      expression:
                                                                        "form.input.profile_id",
                                                                    },
                                                                  ],
                                                                  staticClass:
                                                                    "form-control",
                                                                  attrs: {
                                                                    required:
                                                                      "",
                                                                  },
                                                                  on: {
                                                                    change:
                                                                      function (
                                                                        $event
                                                                      ) {
                                                                        var $$selectedVal =
                                                                          Array.prototype.filter
                                                                            .call(
                                                                              $event
                                                                                .target
                                                                                .options,
                                                                              function (
                                                                                o
                                                                              ) {
                                                                                return o.selected
                                                                              }
                                                                            )
                                                                            .map(
                                                                              function (
                                                                                o
                                                                              ) {
                                                                                var val =
                                                                                  "_value" in
                                                                                  o
                                                                                    ? o._value
                                                                                    : o.value
                                                                                return val
                                                                              }
                                                                            )
                                                                        _vm.$set(
                                                                          _vm
                                                                            .form
                                                                            .input,
                                                                          "profile_id",
                                                                          $event
                                                                            .target
                                                                            .multiple
                                                                            ? $$selectedVal
                                                                            : $$selectedVal[0]
                                                                        )
                                                                      },
                                                                  },
                                                                },
                                                                _vm._l(
                                                                  _vm.lecturers,
                                                                  function (
                                                                    lecturer
                                                                  ) {
                                                                    return _c(
                                                                      "option",
                                                                      {
                                                                        domProps:
                                                                          {
                                                                            value:
                                                                              lecturer
                                                                                .profile
                                                                                .id,
                                                                          },
                                                                      },
                                                                      [
                                                                        _vm._v(
                                                                          "\n                                                            " +
                                                                            _vm._s(
                                                                              _vm.$root.full_name(
                                                                                lecturer.user
                                                                              ) +
                                                                                " - " +
                                                                                lecturer
                                                                                  .user
                                                                                  .email
                                                                            ) +
                                                                            "\n                                                        "
                                                                        ),
                                                                      ]
                                                                    )
                                                                  }
                                                                ),
                                                                0
                                                              )
                                                            : _vm._e(),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "form-group mb-3 col-12",
                                                    },
                                                    [
                                                      _c("label", [
                                                        _vm._v(
                                                          "Remove Lecturer"
                                                        ),
                                                      ]),
                                                      _vm._v(" "),
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "input-group",
                                                        },
                                                        [
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "input-group-prepend",
                                                            },
                                                            [
                                                              _c(
                                                                "span",
                                                                {
                                                                  staticClass:
                                                                    "input-group-text",
                                                                },
                                                                [
                                                                  _c("i", {
                                                                    staticClass:
                                                                      "ni ni-fat-remove",
                                                                  }),
                                                                ]
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "select",
                                                            {
                                                              directives: [
                                                                {
                                                                  name: "model",
                                                                  rawName:
                                                                    "v-model",
                                                                  value:
                                                                    _vm.form
                                                                      .input
                                                                      .remove_id,
                                                                  expression:
                                                                    "form.input.remove_id",
                                                                },
                                                              ],
                                                              staticClass:
                                                                "form-control",
                                                              on: {
                                                                change:
                                                                  function (
                                                                    $event
                                                                  ) {
                                                                    var $$selectedVal =
                                                                      Array.prototype.filter
                                                                        .call(
                                                                          $event
                                                                            .target
                                                                            .options,
                                                                          function (
                                                                            o
                                                                          ) {
                                                                            return o.selected
                                                                          }
                                                                        )
                                                                        .map(
                                                                          function (
                                                                            o
                                                                          ) {
                                                                            var val =
                                                                              "_value" in
                                                                              o
                                                                                ? o._value
                                                                                : o.value
                                                                            return val
                                                                          }
                                                                        )
                                                                    _vm.$set(
                                                                      _vm.form
                                                                        .input,
                                                                      "remove_id",
                                                                      $event
                                                                        .target
                                                                        .multiple
                                                                        ? $$selectedVal
                                                                        : $$selectedVal[0]
                                                                    )
                                                                  },
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "option",
                                                                {
                                                                  attrs: {
                                                                    value: "0",
                                                                  },
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "*** None"
                                                                  ),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _vm._l(
                                                                _vm.term_class
                                                                  .class_lecturers,
                                                                function (
                                                                  lect
                                                                ) {
                                                                  return _c(
                                                                    "option",
                                                                    {
                                                                      domProps:
                                                                        {
                                                                          value:
                                                                            lect.id,
                                                                        },
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        "\n                                                            " +
                                                                          _vm._s(
                                                                            _vm.$root.full_name(
                                                                              lect
                                                                                .profile
                                                                                .user
                                                                            )
                                                                          ) +
                                                                          " -\n                                                            " +
                                                                          _vm._s(
                                                                            lect
                                                                              .profile
                                                                              .user
                                                                              .email
                                                                          ) +
                                                                          "\n                                                        "
                                                                      ),
                                                                    ]
                                                                  )
                                                                }
                                                              ),
                                                            ],
                                                            2
                                                          ),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "modal-footer",
                                                    },
                                                    [
                                                      _c(
                                                        "button",
                                                        {
                                                          staticClass:
                                                            "btn btn-primary",
                                                          attrs: {
                                                            type: "submit",
                                                          },
                                                        },
                                                        [_vm._v("Save changes")]
                                                      ),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                            ],
                                            1
                                          ),
                                        ]
                                      ),
                                    ]
                                  ),
                                ],
                                2
                              )
                            : _vm._e(),
                        ]),
                        _vm._v(" "),
                        _vm.term_class.assessments
                          ? _c(
                              "tr",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value:
                                      _vm.$store.state.auth.hasRole("ad-5.1"),
                                    expression:
                                      "$store.state.auth.hasRole('ad-5.1')",
                                  },
                                ],
                              },
                              [
                                _c("td", [_vm._v("Assessments")]),
                                _vm._v(" "),
                                _c(
                                  "th",
                                  _vm._l(
                                    _vm.term_class.assessments,
                                    function (assessment) {
                                      return _c(
                                        "li",
                                        [
                                          _vm._v(
                                            "\n                                " +
                                              _vm._s(assessment.name) +
                                              "\n                                "
                                          ),
                                          _c(
                                            "small",
                                            { staticClass: "text-underline" },
                                            [
                                              _vm._v(
                                                _vm._s(assessment.score) +
                                                  " / 100"
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "button",
                                            {
                                              staticClass:
                                                "btn btn-link text-warning",
                                              on: {
                                                click: function ($event) {
                                                  return _vm.reset_assessment(
                                                    assessment
                                                  )
                                                },
                                              },
                                            },
                                            [
                                              _c("i", {
                                                staticClass:
                                                  "ni ni-settings-gear-65",
                                              }),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "modal",
                                            {
                                              attrs: {
                                                name: "reset_assessment",
                                                height: "auto",
                                                draggable: true,
                                              },
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "modal modal-content",
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "modal-header",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                            Reset Assessment\n                                        "
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "modal-body",
                                                    },
                                                    [
                                                      _c("p", [
                                                        _vm._v(
                                                          "\n                                                When save changes clicked, all grades uploaded under this assessment\n                                                "
                                                        ),
                                                        _c("br"),
                                                        _vm._v(
                                                          "\n                                                will be reset. Assessment score can be changed from this form.\n                                            "
                                                        ),
                                                      ]),
                                                      _vm._v(" "),
                                                      _vm.reset.assessment
                                                        ? _c(
                                                            "table",
                                                            {
                                                              staticClass:
                                                                "table align-items-center table-flush",
                                                            },
                                                            [
                                                              _c("tbody", [
                                                                _c("tr", [
                                                                  _c("td", [
                                                                    _vm._v(
                                                                      "Assessment"
                                                                    ),
                                                                  ]),
                                                                  _vm._v(" "),
                                                                  _c("th", [
                                                                    _vm._v(
                                                                      _vm._s(
                                                                        _vm
                                                                          .reset
                                                                          .assessment
                                                                          .name
                                                                      )
                                                                    ),
                                                                  ]),
                                                                ]),
                                                                _vm._v(" "),
                                                                _c("tr", [
                                                                  _c("td", [
                                                                    _vm._v(
                                                                      "Current Score"
                                                                    ),
                                                                  ]),
                                                                  _vm._v(" "),
                                                                  _c("th", [
                                                                    _vm._v(
                                                                      _vm._s(
                                                                        _vm
                                                                          .reset
                                                                          .assessment
                                                                          .score
                                                                      ) +
                                                                        " / 100"
                                                                    ),
                                                                  ]),
                                                                ]),
                                                              ]),
                                                            ]
                                                          )
                                                        : _vm._e(),
                                                      _vm._v(" "),
                                                      _c("hr"),
                                                      _vm._v(" "),
                                                      _c(
                                                        "form",
                                                        {
                                                          on: {
                                                            submit:
                                                              _vm.resetAssessmentForm,
                                                          },
                                                        },
                                                        [
                                                          _c("fake-form-input"),
                                                          _vm._v(" "),
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "form-group mb-3",
                                                            },
                                                            [
                                                              _c(
                                                                "div",
                                                                {
                                                                  staticClass:
                                                                    "input-group",
                                                                },
                                                                [
                                                                  _c(
                                                                    "div",
                                                                    {
                                                                      staticClass:
                                                                        "input-group-prepend",
                                                                    },
                                                                    [
                                                                      _c(
                                                                        "span",
                                                                        {
                                                                          staticClass:
                                                                            "input-group-text",
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "i",
                                                                            {
                                                                              staticClass:
                                                                                "ni ni-lock-circle-open",
                                                                            }
                                                                          ),
                                                                        ]
                                                                      ),
                                                                    ]
                                                                  ),
                                                                  _vm._v(" "),
                                                                  _c("input", {
                                                                    directives:
                                                                      [
                                                                        {
                                                                          name: "model",
                                                                          rawName:
                                                                            "v-model",
                                                                          value:
                                                                            _vm
                                                                              .reset
                                                                              .form
                                                                              .password,
                                                                          expression:
                                                                            "reset.form.password",
                                                                        },
                                                                      ],
                                                                    staticClass:
                                                                      "form-control",
                                                                    attrs: {
                                                                      placeholder:
                                                                        "Password confirmation",
                                                                      type: "password",
                                                                      required:
                                                                        "",
                                                                    },
                                                                    domProps: {
                                                                      value:
                                                                        _vm
                                                                          .reset
                                                                          .form
                                                                          .password,
                                                                    },
                                                                    on: {
                                                                      input:
                                                                        function (
                                                                          $event
                                                                        ) {
                                                                          if (
                                                                            $event
                                                                              .target
                                                                              .composing
                                                                          ) {
                                                                            return
                                                                          }
                                                                          _vm.$set(
                                                                            _vm
                                                                              .reset
                                                                              .form,
                                                                            "password",
                                                                            $event
                                                                              .target
                                                                              .value
                                                                          )
                                                                        },
                                                                    },
                                                                  }),
                                                                ]
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "modal-footer",
                                                            },
                                                            [
                                                              _c(
                                                                "button",
                                                                {
                                                                  staticClass:
                                                                    "btn btn-primary",
                                                                  attrs: {
                                                                    type: "submit",
                                                                  },
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "Save changes"
                                                                  ),
                                                                ]
                                                              ),
                                                            ]
                                                          ),
                                                        ],
                                                        1
                                                      ),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                            ]
                                          ),
                                        ],
                                        1
                                      )
                                    }
                                  ),
                                  0
                                ),
                              ]
                            )
                          : _vm._e(),
                      ],
                      1
                    ),
                  ]
                ),
              ]),
            ],
            1
          ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/Classes/EditClasses.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/admin/Classes/EditClasses.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditClasses_vue_vue_type_template_id_56849e18_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditClasses.vue?vue&type=template&id=56849e18&scoped=true& */ "./resources/js/components/admin/Classes/EditClasses.vue?vue&type=template&id=56849e18&scoped=true&");
/* harmony import */ var _EditClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditClasses.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Classes/EditClasses.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditClasses_vue_vue_type_template_id_56849e18_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditClasses_vue_vue_type_template_id_56849e18_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "56849e18",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Classes/EditClasses.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Classes/EditClasses.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/admin/Classes/EditClasses.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EditClasses.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Classes/EditClasses.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Classes/EditClasses.vue?vue&type=template&id=56849e18&scoped=true&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/admin/Classes/EditClasses.vue?vue&type=template&id=56849e18&scoped=true& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditClasses_vue_vue_type_template_id_56849e18_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EditClasses.vue?vue&type=template&id=56849e18&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Classes/EditClasses.vue?vue&type=template&id=56849e18&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditClasses_vue_vue_type_template_id_56849e18_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditClasses_vue_vue_type_template_id_56849e18_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/Classes/ViewClasses.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/admin/Classes/ViewClasses.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewClasses_vue_vue_type_template_id_1474729d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewClasses.vue?vue&type=template&id=1474729d&scoped=true& */ "./resources/js/components/admin/Classes/ViewClasses.vue?vue&type=template&id=1474729d&scoped=true&");
/* harmony import */ var _ViewClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewClasses.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Classes/ViewClasses.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ViewClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ViewClasses_vue_vue_type_template_id_1474729d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ViewClasses_vue_vue_type_template_id_1474729d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1474729d",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Classes/ViewClasses.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Classes/ViewClasses.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/admin/Classes/ViewClasses.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewClasses.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Classes/ViewClasses.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Classes/ViewClasses.vue?vue&type=template&id=1474729d&scoped=true&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/admin/Classes/ViewClasses.vue?vue&type=template&id=1474729d&scoped=true& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewClasses_vue_vue_type_template_id_1474729d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewClasses.vue?vue&type=template&id=1474729d&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Classes/ViewClasses.vue?vue&type=template&id=1474729d&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewClasses_vue_vue_type_template_id_1474729d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewClasses_vue_vue_type_template_id_1474729d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);