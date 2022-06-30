(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/GradingSystem.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GradingSystem_IndexGS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GradingSystem/IndexGS */ "./resources/js/components/admin/GradingSystem/IndexGS.vue");
/* harmony import */ var _GradingSystem_FormGS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GradingSystem/FormGS */ "./resources/js/components/admin/GradingSystem/FormGS.vue");
/* harmony import */ var _GradingSystem_ViewGS__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GradingSystem/ViewGS */ "./resources/js/components/admin/GradingSystem/ViewGS.vue");
//
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
  name: "GradingSystem",
  components: {
    ViewGS: _GradingSystem_ViewGS__WEBPACK_IMPORTED_MODULE_2__["default"],
    FormGS: _GradingSystem_FormGS__WEBPACK_IMPORTED_MODULE_1__["default"],
    IndexGS: _GradingSystem_IndexGS__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      grading_systems: null,
      grading_system: null,
      form: null
    };
  },
  created: function created() {
    this.$store.state.page = "Grading Systems";
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function fetchData() {
      this.grading_systems = this.grading_system = this.form = null;
      if (this.$route.params.id === 'create') this.create_form();else if (this.$route.params.id === undefined) this.get_index();else this.get_show();
    },
    get_index: function get_index() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      axios.get('/admin/grading-systems?page=' + page).then(function (res) {
        _this.grading_systems = res.data.grading_systems;
      });
    },
    get_show: function get_show() {
      var _this2 = this;

      axios.get('/admin/grading-systems/' + this.$route.params.id).then(function (res) {
        _this2.grading_system = res.data.grading_system;
        if (_this2.$route.params.ops === 'edit') _this2.form = {
          type: 'e',
          title: 'Edit ' + _this2.grading_system.name,
          input: {
            id: _this2.grading_system.id,
            active: _this2.grading_system.active,
            name: _this2.grading_system.name,
            grades: _this2.grading_system.grades //*pass password: '',

          }
        };else if (_this2.$route.params.ops === 'delete') _this2.form = {
          type: 'd',
          title: 'Delete ' + _this2.grading_system.name,
          input: {
            id: _this2.grading_system.id //*pass password: '',

          }
        };
      });
    },
    create_form: function create_form() {
      this.form = {
        type: 'c',
        title: 'Adda new Grading System',
        input: {
          name: '',
          active: false,
          grades: [] //*pass password: '',

        }
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem/FormGS.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/GradingSystem/FormGS.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "FormGS",
  methods: {
    submitForm: function submitForm(e) {
      var _this = this;

      e.preventDefault();

      if (this.$parent.form.type === 'c') {
        axios.post('/admin/grading-systems/store', this.$parent.form.input).then(function (res) {
          _this.$parent.grading_system = res.data.grading_system;

          _this.$root.post_success(res.data.success);

          _this.$router.push({
            name: 'ad.grading-systems',
            params: {
              id: res.data.grading_system.id
            }
          });
        });
      } else if (this.$parent.form.type === 'e') {
        axios.post('/admin/grading-systems/update', this.$parent.form.input).then(function (res) {
          _this.$parent.grading_system = res.data.grading_system;

          _this.$root.post_success(res.data.success);

          _this.$router.push({
            name: 'ad.grading-systems',
            params: {
              id: res.data.grading_system.id
            }
          });
        });
      } else if (this.$parent.form.type === 'd') {
        axios.post('/admin/grading-systems/delete', this.$parent.form.input).then(function (res) {
          _this.$parent.grading_systems = res.data.grading_systems;

          _this.$root.post_success(res.data.success);

          _this.$router.push({
            name: 'ad.grading-systems'
          });
        });
      }
    },
    add_grade: function add_grade() {
      this.$parent.form.input.grades.push({
        grade: '',
        point: '',
        from: '',
        to: ''
      });
    },
    remove_grade: function remove_grade(gs) {
      var grades = [];

      var _iterator = _createForOfIteratorHelper(this.$parent.form.input.grades.keys()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var i = _step.value;
          if (i !== gs) grades.push(this.$parent.form.input.grades[i]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.$parent.form.input.grades = grades;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem/IndexGS.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/GradingSystem/IndexGS.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "IndexGS"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem/ViewGS.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/GradingSystem/ViewGS.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "ViewGS"
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem.vue?vue&type=template&id=4b95c070&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/GradingSystem.vue?vue&type=template&id=4b95c070&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-md-12" },
      [
        _vm.grading_systems ? _c("IndexGS") : _vm._e(),
        _vm._v(" "),
        _vm.grading_system && !_vm.form ? _c("ViewGS") : _vm._e(),
        _vm._v(" "),
        _vm.form ? _c("FormGS") : _vm._e(),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem/FormGS.vue?vue&type=template&id=3450d9a7&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/GradingSystem/FormGS.vue?vue&type=template&id=3450d9a7&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "card shadow mb-4 mb-xl-0" }, [
    _c("div", { staticClass: "card-header bg-transparent" }, [
      _c("h3", { staticClass: "mb-0" }, [
        _vm._v(
          "\n                " +
            _vm._s(_vm.$parent.form.title) +
            "\n            "
        ),
      ]),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "card-body" }, [
      _c(
        "form",
        { on: { submit: _vm.submitForm } },
        [
          _c("fake-form-input"),
          _vm._v(" "),
          _vm.$parent.form.input.name !== undefined
            ? _c("div", { staticClass: "form-group mb-3" }, [
                _c("div", { staticClass: "input-group" }, [
                  _vm._m(0),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.$parent.form.input.name,
                        expression: "$parent.form.input.name",
                      },
                    ],
                    staticClass: "form-control",
                    attrs: { placeholder: "....", type: "text", required: "" },
                    domProps: { value: _vm.$parent.form.input.name },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(
                          _vm.$parent.form.input,
                          "name",
                          $event.target.value
                        )
                      },
                    },
                  }),
                ]),
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.$parent.form.input.active !== undefined
            ? _c("div", { staticClass: "form-group mb-3" }, [
                _c("div", { staticClass: "input-group" }, [
                  _vm._m(1),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.$parent.form.input.active,
                          expression: "$parent.form.input.active",
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
                            _vm.$parent.form.input,
                            "active",
                            $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          )
                        },
                      },
                    },
                    [
                      _c("option", { attrs: { value: "1" } }, [
                        _vm._v("Activate"),
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "0" } }, [
                        _vm._v("Deactivate"),
                      ]),
                    ]
                  ),
                ]),
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.$parent.form.input.grades !== undefined
            ? _c(
                "div",
                { staticClass: "form-group mb-3" },
                [
                  _c("hr"),
                  _vm._v(" "),
                  _vm._l(_vm.$parent.form.input.grades.keys(), function (i) {
                    return _c("div", { staticClass: "row" }, [
                      _c("div", { staticClass: "input-group col-2" }, [
                        _vm._m(2, true),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.$parent.form.input.grades[i].grade,
                              expression: "$parent.form.input.grades[i].grade",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            placeholder: "....",
                            type: "text",
                            required: "",
                          },
                          domProps: {
                            value: _vm.$parent.form.input.grades[i].grade,
                          },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.$parent.form.input.grades[i],
                                "grade",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "input-group col-3" }, [
                        _vm._m(3, true),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.$parent.form.input.grades[i].point,
                              expression: "$parent.form.input.grades[i].point",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            placeholder: "....",
                            type: "text",
                            required: "",
                          },
                          domProps: {
                            value: _vm.$parent.form.input.grades[i].point,
                          },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.$parent.form.input.grades[i],
                                "point",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "input-group col-3" }, [
                        _vm._m(4, true),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.$parent.form.input.grades[i].from,
                              expression: "$parent.form.input.grades[i].from",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            placeholder: "....",
                            type: "text",
                            required: "",
                          },
                          domProps: {
                            value: _vm.$parent.form.input.grades[i].from,
                          },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.$parent.form.input.grades[i],
                                "from",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "input-group col-3" }, [
                        _vm._m(5, true),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.$parent.form.input.grades[i].to,
                              expression: "$parent.form.input.grades[i].to",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            placeholder: "....",
                            type: "text",
                            required: "",
                          },
                          domProps: {
                            value: _vm.$parent.form.input.grades[i].to,
                          },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.$parent.form.input.grades[i],
                                "to",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-1" }, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-danger btn-sm",
                            attrs: { type: "button" },
                            on: {
                              click: function ($event) {
                                return _vm.remove_grade(i)
                              },
                            },
                          },
                          [_c("i", { staticClass: "ni ni-fat-remove" })]
                        ),
                      ]),
                    ])
                  }),
                  _vm._v(" "),
                  _c("br"),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-primary",
                      attrs: { type: "button" },
                      on: { click: _vm.add_grade },
                    },
                    [_vm._v("Add")]
                  ),
                  _vm._v(" "),
                  _c("hr"),
                ],
                2
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.$parent.$route.params.ops === "delete"
            ? _c("h1", { staticClass: "text-danger" }, [
                _vm._v(
                  "\n                    Are you sure you want to process with this delete operation?\n                "
                ),
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm._m(6),
        ],
        1
      ),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("Name :")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [
        _vm._v(
          "\n                                Activation\n                            "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v(" :")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("Point :")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("From :")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("To :")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-footer" }, [
      _c(
        "button",
        { staticClass: "btn btn-primary", attrs: { type: "submit" } },
        [_vm._v("Save changes")]
      ),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem/IndexGS.vue?vue&type=template&id=5a312b52&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/GradingSystem/IndexGS.vue?vue&type=template&id=5a312b52&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "card shadow mb-4 mb-xl-0" }, [
    _c("div", { staticClass: "card-header bg-transparent" }, [
      _c("h3", { staticClass: "mb-0" }, [
        _c(
          "div",
          { staticClass: "float-right" },
          [
            _c(
              "router-link",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.$store.state.auth.hasRole("ad-9"),
                    expression: "$store.state.auth.hasRole('ad-9')",
                  },
                ],
                staticClass: "btn btn-sm btn-outline-primary mb-3",
                attrs: {
                  to: { name: "ad.grading-systems", params: { id: "create" } },
                },
              },
              [
                _vm._v(
                  "\n                    Add New Grading System\n                "
                ),
              ]
            ),
          ],
          1
        ),
      ]),
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "table-responsive" },
      [
        _c("table", { staticClass: "table align-items-center table-flush" }, [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.$parent.grading_systems.data, function (gs) {
              return _c("tr", [
                _c(
                  "td",
                  [
                    _c(
                      "router-link",
                      {
                        staticClass: "btn btn-sm btn-primary",
                        attrs: {
                          to: {
                            name: "ad.grading-systems",
                            params: { id: gs.id },
                          },
                        },
                      },
                      [_c("i", { staticClass: "ni ni-bold-right" })]
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(gs.name))]),
                _vm._v(" "),
                _c("td", [
                  gs.active
                    ? _c("span", [_vm._v("Activated")])
                    : _c("span", [_vm._v("Deactivated")]),
                ]),
              ])
            }),
            0
          ),
        ]),
        _vm._v(" "),
        _c("laravel-vue-pagination", {
          attrs: {
            limit: 5,
            data: _vm.$parent.grading_systems,
            align: "center",
          },
          on: { "pagination-change-page": _vm.$parent.get_index },
        }),
      ],
      1
    ),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", { staticClass: "thead-light" }, [
      _c("tr", [
        _c("th", { attrs: { scope: "col" } }),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Grading Systems")]),
        _vm._v(" "),
        _c("th", [_vm._v("Status")]),
      ]),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem/ViewGS.vue?vue&type=template&id=6c474a70&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/GradingSystem/ViewGS.vue?vue&type=template&id=6c474a70&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "card shadow mb-4 mb-xl-0" }, [
    _c("div", { staticClass: "card-header bg-transparent" }, [
      _c("h3", { staticClass: "mb-0" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-sm btn-outline-primary mb-3",
            on: {
              click: function ($event) {
                return _vm.$router.go(-1)
              },
            },
          },
          [
            _c("i", { staticClass: "ni ni-bold-left" }),
            _vm._v(" Back\n            "),
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "float-right" },
          [
            _c(
              "router-link",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.$store.state.auth.hasRole("ad-9"),
                    expression: "$store.state.auth.hasRole('ad-9')",
                  },
                ],
                staticClass: "btn btn-sm btn-outline-warning mb-3",
                attrs: {
                  to: {
                    name: "ad.grading-systems",
                    params: { id: _vm.$parent.grading_system.id, ops: "edit" },
                  },
                },
              },
              [_vm._v("\n                    Edit\n                ")]
            ),
            _vm._v(" "),
            _c(
              "router-link",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.$store.state.auth.hasRole("ad-9"),
                    expression: "$store.state.auth.hasRole('ad-9')",
                  },
                ],
                staticClass: "btn btn-sm btn-outline-danger mb-3",
                attrs: {
                  to: {
                    name: "ad.grading-systems",
                    params: {
                      id: _vm.$parent.grading_system.id,
                      ops: "delete",
                    },
                  },
                },
              },
              [_vm._v("\n                    Delete\n                ")]
            ),
          ],
          1
        ),
      ]),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "table-responsive" }, [
      _c("table", { staticClass: "table" }, [
        _c("tbody", [
          _c("tr", [
            _c("td", [_vm._v("Name")]),
            _vm._v(" "),
            _c("th", [_vm._v(_vm._s(_vm.$parent.grading_system.name))]),
          ]),
          _vm._v(" "),
          _c("tr", [
            _c("td", [_vm._v("Status")]),
            _vm._v(" "),
            _c("th", [
              _vm.$parent.grading_system.active
                ? _c("span", [_vm._v("Activated")])
                : _c("span", [_vm._v("Deactivated")]),
            ]),
          ]),
          _vm._v(" "),
          _c("tr", [
            _c("td", [_vm._v("Grades")]),
            _vm._v(" "),
            _c("th", {
              domProps: {
                innerHTML: _vm._s(
                  _vm.$root.view_grades(_vm.$parent.grading_system.grades)
                ),
              },
            }),
          ]),
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/GradingSystem.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/admin/GradingSystem.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GradingSystem_vue_vue_type_template_id_4b95c070_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GradingSystem.vue?vue&type=template&id=4b95c070&scoped=true& */ "./resources/js/components/admin/GradingSystem.vue?vue&type=template&id=4b95c070&scoped=true&");
/* harmony import */ var _GradingSystem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GradingSystem.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/GradingSystem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _GradingSystem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GradingSystem_vue_vue_type_template_id_4b95c070_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GradingSystem_vue_vue_type_template_id_4b95c070_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4b95c070",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/GradingSystem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/GradingSystem.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/admin/GradingSystem.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GradingSystem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./GradingSystem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GradingSystem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/GradingSystem.vue?vue&type=template&id=4b95c070&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/admin/GradingSystem.vue?vue&type=template&id=4b95c070&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GradingSystem_vue_vue_type_template_id_4b95c070_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./GradingSystem.vue?vue&type=template&id=4b95c070&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem.vue?vue&type=template&id=4b95c070&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GradingSystem_vue_vue_type_template_id_4b95c070_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GradingSystem_vue_vue_type_template_id_4b95c070_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/GradingSystem/FormGS.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/admin/GradingSystem/FormGS.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormGS_vue_vue_type_template_id_3450d9a7_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormGS.vue?vue&type=template&id=3450d9a7&scoped=true& */ "./resources/js/components/admin/GradingSystem/FormGS.vue?vue&type=template&id=3450d9a7&scoped=true&");
/* harmony import */ var _FormGS_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormGS.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/GradingSystem/FormGS.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FormGS_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormGS_vue_vue_type_template_id_3450d9a7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FormGS_vue_vue_type_template_id_3450d9a7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3450d9a7",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/GradingSystem/FormGS.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/GradingSystem/FormGS.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/admin/GradingSystem/FormGS.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGS_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormGS.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem/FormGS.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGS_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/GradingSystem/FormGS.vue?vue&type=template&id=3450d9a7&scoped=true&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/admin/GradingSystem/FormGS.vue?vue&type=template&id=3450d9a7&scoped=true& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGS_vue_vue_type_template_id_3450d9a7_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormGS.vue?vue&type=template&id=3450d9a7&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem/FormGS.vue?vue&type=template&id=3450d9a7&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGS_vue_vue_type_template_id_3450d9a7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGS_vue_vue_type_template_id_3450d9a7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/GradingSystem/IndexGS.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/components/admin/GradingSystem/IndexGS.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IndexGS_vue_vue_type_template_id_5a312b52_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IndexGS.vue?vue&type=template&id=5a312b52&scoped=true& */ "./resources/js/components/admin/GradingSystem/IndexGS.vue?vue&type=template&id=5a312b52&scoped=true&");
/* harmony import */ var _IndexGS_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IndexGS.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/GradingSystem/IndexGS.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IndexGS_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IndexGS_vue_vue_type_template_id_5a312b52_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IndexGS_vue_vue_type_template_id_5a312b52_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5a312b52",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/GradingSystem/IndexGS.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/GradingSystem/IndexGS.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/admin/GradingSystem/IndexGS.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexGS_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexGS.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem/IndexGS.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexGS_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/GradingSystem/IndexGS.vue?vue&type=template&id=5a312b52&scoped=true&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/admin/GradingSystem/IndexGS.vue?vue&type=template&id=5a312b52&scoped=true& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexGS_vue_vue_type_template_id_5a312b52_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexGS.vue?vue&type=template&id=5a312b52&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem/IndexGS.vue?vue&type=template&id=5a312b52&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexGS_vue_vue_type_template_id_5a312b52_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexGS_vue_vue_type_template_id_5a312b52_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/GradingSystem/ViewGS.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/admin/GradingSystem/ViewGS.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewGS_vue_vue_type_template_id_6c474a70_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewGS.vue?vue&type=template&id=6c474a70&scoped=true& */ "./resources/js/components/admin/GradingSystem/ViewGS.vue?vue&type=template&id=6c474a70&scoped=true&");
/* harmony import */ var _ViewGS_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewGS.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/GradingSystem/ViewGS.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ViewGS_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ViewGS_vue_vue_type_template_id_6c474a70_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ViewGS_vue_vue_type_template_id_6c474a70_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6c474a70",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/GradingSystem/ViewGS.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/GradingSystem/ViewGS.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/admin/GradingSystem/ViewGS.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewGS_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewGS.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem/ViewGS.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewGS_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/GradingSystem/ViewGS.vue?vue&type=template&id=6c474a70&scoped=true&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/admin/GradingSystem/ViewGS.vue?vue&type=template&id=6c474a70&scoped=true& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewGS_vue_vue_type_template_id_6c474a70_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewGS.vue?vue&type=template&id=6c474a70&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradingSystem/ViewGS.vue?vue&type=template&id=6c474a70&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewGS_vue_vue_type_template_id_6c474a70_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewGS_vue_vue_type_template_id_6c474a70_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);