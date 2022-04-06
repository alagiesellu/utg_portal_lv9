(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Departments.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Departments.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Departments_IndexDepartments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Departments/IndexDepartments */ "./resources/js/components/admin/Departments/IndexDepartments.vue");
/* harmony import */ var _Departments_FormDepartments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Departments/FormDepartments */ "./resources/js/components/admin/Departments/FormDepartments.vue");
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Departments",
  components: {
    FormDepartments: _Departments_FormDepartments__WEBPACK_IMPORTED_MODULE_1__["default"],
    IndexDepartments: _Departments_IndexDepartments__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      department: null,
      form: null
    };
  },
  created: function created() {
    this.$store.state.page = 'Departments';
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    submitForm: function submitForm(e) {
      e.preventDefault();

      switch (this.form.type) {
        case 'c':
          this.postRequest('/admin/departments/store');
          break;

        case 'd':
          this.postRequest('/admin/departments/destroy');
          break;

        case 'e':
          this.postRequest('/admin/departments/edit');
          break;
      }
    },
    postRequest: function postRequest(link) {
      var _this = this;

      axios.post(link, this.form.input).then(function (res) {
        _this.$router.push({
          name: 'ad.departments',
          params: {
            id: res.data.department.id
          }
        });

        _this.$root.post_success(res.data.success); //*pass this.form.input.password = null;

      });
    },
    fetchData: function fetchData() {
      var _this2 = this;

      // if department id not provide, load first department
      if (!this.$route.params.id) this.$route.params.id = 1;
      axios.get('/admin/departments/' + this.$route.params.id).then(function (res) {
        _this2.department = res.data.department;

        switch (_this2.$route.params.ops) {
          case 'create':
            _this2.form = {
              title: 'Create Department Under ' + _this2.department.name,
              type: 'c',
              input: {
                name: null,
                description: null,
                email: null,
                tel: null,
                is_admin: _this2.department.is_admin,
                is_major: false,
                has_rotation: false,
                fee_per_term: {
                  local: null,
                  foreign: null
                },
                department_id: _this2.department.id //*pass password: null,

              }
            };
            break;

          case 'edit':
            _this2.form = {
              title: 'Edit ' + _this2.department.name,
              type: 'e',
              input: {
                id: _this2.department.id,
                name: _this2.department.name,
                description: _this2.department.description,
                email: _this2.department.email,
                tel: _this2.department.tel,
                is_admin: _this2.department.is_admin,
                is_major: _this2.department.is_major,
                has_rotation: _this2.department.has_rotation,
                fee_per_term: _this2.department.fee_per_term //*pass password: null,

              }
            };
            break;

          case 'delete':
            _this2.form = {
              title: 'Delete Department ' + _this2.department.name,
              type: 'd',
              input: {
                id: _this2.department.id //*pass password: null,

              }
            };
            break;

          default:
            _this2.form = null;
            break;
        }
      });
    },
    get_department: function get_department() {
      var _this3 = this;

      axios.get('/admin/departments/' + this.$route.params.id).then(function (res) {
        _this3.department = res.data.department;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Departments/FormDepartments.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Departments/FormDepartments.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "FormDepartments"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Departments/IndexDepartments.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Departments/IndexDepartments.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "IndexDepartments"
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Departments.vue?vue&type=template&id=4451f574&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Departments.vue?vue&type=template&id=4451f574&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "row" },
    [
      _vm.form
        ? _c("FormDepartments")
        : _vm.department
        ? _c("IndexDepartments")
        : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Departments/FormDepartments.vue?vue&type=template&id=716ea614&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Departments/FormDepartments.vue?vue&type=template&id=716ea614&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "col-12" }, [
    _c("div", { staticClass: "card shadow mb-4 mb-xl-0" }, [
      _c("h3", { staticClass: "card-header bg-transparent" }, [
        _c("span", {
          domProps: { textContent: _vm._s(_vm.$parent.form.title) },
        }),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "card-body" }, [
        _c(
          "form",
          { on: { submit: _vm.$parent.submitForm } },
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
                      attrs: {
                        placeholder: "Name",
                        type: "text",
                        name: "name",
                        required: "",
                      },
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
            _vm.$parent.form.input.description !== undefined
              ? _c("div", { staticClass: "form-group" }, [
                  _c("div", { staticClass: "input-group" }, [
                    _vm._m(1),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.$parent.form.input.description,
                          expression: "$parent.form.input.description",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        placeholder: "Description",
                        type: "text",
                        name: "description",
                        required: "",
                      },
                      domProps: { value: _vm.$parent.form.input.description },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.$parent.form.input,
                            "description",
                            $event.target.value
                          )
                        },
                      },
                    }),
                  ]),
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$parent.form.input.email !== undefined
              ? _c("div", { staticClass: "form-group mb-3" }, [
                  _c("div", { ref: "email", staticClass: "input-group" }, [
                    _vm._m(2),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.$parent.form.input.email,
                          expression: "$parent.form.input.email",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        placeholder: "Email",
                        type: "email",
                        name: "email",
                        required: "",
                      },
                      domProps: { value: _vm.$parent.form.input.email },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.$parent.form.input,
                            "email",
                            $event.target.value
                          )
                        },
                      },
                    }),
                  ]),
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$parent.form.input.tel !== undefined
              ? _c("div", { staticClass: "form-group mb-3" }, [
                  _c("div", { ref: "tel", staticClass: "input-group" }, [
                    _vm._m(3),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.$parent.form.input.tel,
                          expression: "$parent.form.input.tel",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        placeholder: "Telephone Number: 1234567",
                        type: "tel",
                        name: "tel",
                        pattern: "220[0-9]{7}",
                        required: "",
                      },
                      domProps: { value: _vm.$parent.form.input.tel },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.$parent.form.input,
                            "tel",
                            $event.target.value
                          )
                        },
                      },
                    }),
                  ]),
                ])
              : _vm._e(),
            _vm._v(" "),
            !_vm.$parent.form.input.is_admin
              ? _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-md-4" }, [
                    _vm.$parent.form.input.is_major !== undefined
                      ? _c(
                          "div",
                          {
                            staticClass: "custom-control custom-checkbox mb-3",
                          },
                          [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.$parent.form.input.is_major,
                                  expression: "$parent.form.input.is_major",
                                },
                              ],
                              staticClass: "custom-control-input",
                              attrs: { id: "is_major", type: "checkbox" },
                              domProps: {
                                checked: Array.isArray(
                                  _vm.$parent.form.input.is_major
                                )
                                  ? _vm._i(
                                      _vm.$parent.form.input.is_major,
                                      null
                                    ) > -1
                                  : _vm.$parent.form.input.is_major,
                              },
                              on: {
                                change: function ($event) {
                                  var $$a = _vm.$parent.form.input.is_major,
                                    $$el = $event.target,
                                    $$c = $$el.checked ? true : false
                                  if (Array.isArray($$a)) {
                                    var $$v = null,
                                      $$i = _vm._i($$a, $$v)
                                    if ($$el.checked) {
                                      $$i < 0 &&
                                        _vm.$set(
                                          _vm.$parent.form.input,
                                          "is_major",
                                          $$a.concat([$$v])
                                        )
                                    } else {
                                      $$i > -1 &&
                                        _vm.$set(
                                          _vm.$parent.form.input,
                                          "is_major",
                                          $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1))
                                        )
                                    }
                                  } else {
                                    _vm.$set(
                                      _vm.$parent.form.input,
                                      "is_major",
                                      $$c
                                    )
                                  }
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              {
                                staticClass: "custom-control-label",
                                attrs: { for: "is_major" },
                              },
                              [_vm._v("Is a Major")]
                            ),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.$parent.form.input.has_rotation !== undefined
                      ? _c(
                          "div",
                          {
                            staticClass: "custom-control custom-checkbox mb-3",
                          },
                          [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.$parent.form.input.has_rotation,
                                  expression: "$parent.form.input.has_rotation",
                                },
                              ],
                              staticClass: "custom-control-input",
                              attrs: { id: "has_rotation", type: "checkbox" },
                              domProps: {
                                checked: Array.isArray(
                                  _vm.$parent.form.input.has_rotation
                                )
                                  ? _vm._i(
                                      _vm.$parent.form.input.has_rotation,
                                      null
                                    ) > -1
                                  : _vm.$parent.form.input.has_rotation,
                              },
                              on: {
                                change: function ($event) {
                                  var $$a = _vm.$parent.form.input.has_rotation,
                                    $$el = $event.target,
                                    $$c = $$el.checked ? true : false
                                  if (Array.isArray($$a)) {
                                    var $$v = null,
                                      $$i = _vm._i($$a, $$v)
                                    if ($$el.checked) {
                                      $$i < 0 &&
                                        _vm.$set(
                                          _vm.$parent.form.input,
                                          "has_rotation",
                                          $$a.concat([$$v])
                                        )
                                    } else {
                                      $$i > -1 &&
                                        _vm.$set(
                                          _vm.$parent.form.input,
                                          "has_rotation",
                                          $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1))
                                        )
                                    }
                                  } else {
                                    _vm.$set(
                                      _vm.$parent.form.input,
                                      "has_rotation",
                                      $$c
                                    )
                                  }
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              {
                                staticClass: "custom-control-label",
                                attrs: { for: "has_rotation" },
                              },
                              [_vm._v("Has Rotation")]
                            ),
                          ]
                        )
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _vm.$parent.form.input.is_major
                    ? _c("div", { staticClass: "col-md-12 row" }, [
                        _c("div", { staticClass: "form-group col-6" }, [
                          _c("div", { staticClass: "input-group" }, [
                            _vm._m(4),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value:
                                    _vm.$parent.form.input.fee_per_term.local,
                                  expression:
                                    "$parent.form.input.fee_per_term.local",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: {
                                placeholder: "Local Students fees",
                                type: "number",
                                step: "0.01",
                                required: "",
                              },
                              domProps: {
                                value:
                                  _vm.$parent.form.input.fee_per_term.local,
                              },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.$parent.form.input.fee_per_term,
                                    "local",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "form-group col-6" }, [
                          _c("div", { staticClass: "input-group" }, [
                            _vm._m(5),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value:
                                    _vm.$parent.form.input.fee_per_term.foreign,
                                  expression:
                                    "$parent.form.input.fee_per_term.foreign",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: {
                                placeholder: "Foreign Students fees",
                                type: "number",
                                step: "0.01",
                                required: "",
                              },
                              domProps: {
                                value:
                                  _vm.$parent.form.input.fee_per_term.foreign,
                              },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.$parent.form.input.fee_per_term,
                                    "foreign",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]),
                        ]),
                      ])
                    : _vm._e(),
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm._m(6),
          ],
          1
        ),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [
        _c("i", { staticClass: "ni ni-align-left-2" }),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [
        _c("i", { staticClass: "ni ni-align-left-2" }),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [
        _c("i", { staticClass: "ni ni-email-83" }),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [
        _c("i", { staticClass: "ni ni-mobile-button" }),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("GMD")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("USD")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-footer" }, [
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Departments/IndexDepartments.vue?vue&type=template&id=b3128fb0&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Departments/IndexDepartments.vue?vue&type=template&id=b3128fb0&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "col-12" }, [
    _c("div", { staticClass: "card shadow" }, [
      _c("div", { staticClass: "card-header border-0" }, [
        _c("div", { staticClass: "clearfix" }, [
          _c(
            "div",
            { staticClass: "float-left" },
            [
              _vm.$parent.department.department_id
                ? _c(
                    "router-link",
                    {
                      staticClass: "btn btn-sm btn-outline-primary",
                      attrs: {
                        to: {
                          name: "ad.departments",
                          params: { id: _vm.$parent.department.department_id },
                        },
                      },
                    },
                    [
                      _c("i", { staticClass: "ni ni-bold-left" }),
                      _vm._v(" Back\n                    "),
                    ]
                  )
                : _vm._e(),
            ],
            1
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
                      value: _vm.$store.state.auth.hasRole("ad-11"),
                      expression: "$store.state.auth.hasRole('ad-11')",
                    },
                  ],
                  staticClass: "btn btn-sm btn-warning",
                  attrs: {
                    to: {
                      name: "ad.departments",
                      params: { id: _vm.$parent.department.id, ops: "edit" },
                    },
                  },
                },
                [_vm._v("\n                        Edit\n                    ")]
              ),
              _vm._v(" "),
              _c(
                "router-link",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.$store.state.auth.hasRole("ad-11"),
                      expression: "$store.state.auth.hasRole('ad-11')",
                    },
                  ],
                  staticClass: "btn btn-sm btn-danger",
                  attrs: {
                    to: {
                      name: "ad.departments",
                      params: { id: _vm.$parent.department.id, ops: "delete" },
                    },
                  },
                },
                [
                  _vm._v(
                    "\n                        Delete\n                    "
                  ),
                ]
              ),
            ],
            1
          ),
        ]),
        _vm._v(" "),
        _c("h2", { staticClass: "mb-2" }, [
          _vm._v(
            "\n                " +
              _vm._s(_vm.$parent.department.name) +
              "\n            "
          ),
        ]),
        _vm._v(" "),
        _c("button", { staticClass: "btn btn-sm btn-outline-dark" }, [
          _c("i", { staticClass: "ni ni-email-83" }),
          _vm._v(" " + _vm._s(_vm.$parent.department.email) + "\n            "),
        ]),
        _vm._v(" "),
        _c("button", { staticClass: "btn btn-sm btn-outline-dark" }, [
          _c("i", { staticClass: "ni ni-mobile-button" }),
          _vm._v(" +" + _vm._s(_vm.$parent.department.tel) + "\n            "),
        ]),
        _vm._v(" "),
        _vm.$parent.department.has_rotation
          ? _c("button", { staticClass: "btn btn-sm btn-outline-dark" }, [
              _c("i", { staticClass: "ni ni-check-bold" }),
              _vm._v(" Has Rotation\n            "),
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.$parent.department.is_admin
          ? _c("button", { staticClass: "btn btn-sm btn-outline-dark" }, [
              _c("i", { staticClass: "ni ni-check-bold" }),
              _vm._v(" Is Admin\n            "),
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.$parent.department.is_major
          ? _c("div", [
              _c("br"),
              _vm._v(" "),
              _vm._m(0),
              _vm._v(" "),
              _c("button", { staticClass: "btn btn-sm btn-outline-dark" }, [
                _vm._v(
                  "\n                    GMD" +
                    _vm._s(_vm.$parent.department.fee_per_term.local) +
                    " for local students\n                "
                ),
              ]),
              _vm._v(" "),
              _c("button", { staticClass: "btn btn-sm btn-outline-dark" }, [
                _vm._v(
                  "\n                    USD" +
                    _vm._s(_vm.$parent.department.fee_per_term.foreign) +
                    " for international students\n                "
                ),
              ]),
            ])
          : _vm._e(),
        _vm._v(" "),
        _c("hr"),
        _vm._v(" "),
        _c("p", { staticClass: "mb-2" }, [
          _vm._v(
            "\n                " +
              _vm._s(_vm.$parent.department.description) +
              "\n            "
          ),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "table-responsive" }, [
        _c("table", { staticClass: "table align-items-center table-flush" }, [
          _c("thead", { staticClass: "thead-light" }, [
            _c("tr", [
              _c("th", { attrs: { scope: "col" } }),
              _vm._v(" "),
              _c("th", { attrs: { scope: "col" } }, [
                _vm._v("\n                        Departments Under "),
                _c("strong", [_vm._v(_vm._s(_vm.$parent.department.name))]),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c(
            "tbody",
            [
              _vm._l(_vm.$parent.department.departments, function (department) {
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
                              name: "ad.departments",
                              params: { id: department.id },
                            },
                          },
                        },
                        [_c("i", { staticClass: "ni ni-bold-right" })]
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("th", [
                    _vm._v(
                      "\n                        " +
                        _vm._s(department.name) +
                        "\n                    "
                    ),
                  ]),
                ])
              }),
              _vm._v(" "),
              _c("tr", [
                _c("td"),
                _vm._v(" "),
                _c(
                  "td",
                  [
                    _c(
                      "router-link",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.$store.state.auth.hasRole("ad-11"),
                            expression: "$store.state.auth.hasRole('ad-11')",
                          },
                        ],
                        staticClass: "btn btn-sm btn-outline-primary",
                        attrs: {
                          to: {
                            name: "ad.departments",
                            params: {
                              id: _vm.$parent.department.id,
                              ops: "create",
                            },
                          },
                        },
                      },
                      [
                        _vm._v(
                          "\n                            Add Department\n                        "
                        ),
                      ]
                    ),
                  ],
                  1
                ),
              ]),
            ],
            2
          ),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "card-footer py-4" }),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("button", { staticClass: "btn btn-sm btn-outline-dark" }, [
      _c("i", { staticClass: "ni ni-check-bold" }),
      _vm._v(" Is Major\n                "),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/Departments.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/admin/Departments.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Departments_vue_vue_type_template_id_4451f574_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Departments.vue?vue&type=template&id=4451f574&scoped=true& */ "./resources/js/components/admin/Departments.vue?vue&type=template&id=4451f574&scoped=true&");
/* harmony import */ var _Departments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Departments.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Departments.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Departments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Departments_vue_vue_type_template_id_4451f574_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Departments_vue_vue_type_template_id_4451f574_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4451f574",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Departments.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Departments.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/admin/Departments.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Departments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Departments.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Departments.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Departments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Departments.vue?vue&type=template&id=4451f574&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/admin/Departments.vue?vue&type=template&id=4451f574&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Departments_vue_vue_type_template_id_4451f574_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Departments.vue?vue&type=template&id=4451f574&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Departments.vue?vue&type=template&id=4451f574&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Departments_vue_vue_type_template_id_4451f574_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Departments_vue_vue_type_template_id_4451f574_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/Departments/FormDepartments.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/components/admin/Departments/FormDepartments.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormDepartments_vue_vue_type_template_id_716ea614_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormDepartments.vue?vue&type=template&id=716ea614&scoped=true& */ "./resources/js/components/admin/Departments/FormDepartments.vue?vue&type=template&id=716ea614&scoped=true&");
/* harmony import */ var _FormDepartments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormDepartments.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Departments/FormDepartments.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FormDepartments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormDepartments_vue_vue_type_template_id_716ea614_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FormDepartments_vue_vue_type_template_id_716ea614_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "716ea614",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Departments/FormDepartments.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Departments/FormDepartments.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/admin/Departments/FormDepartments.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormDepartments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormDepartments.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Departments/FormDepartments.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormDepartments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Departments/FormDepartments.vue?vue&type=template&id=716ea614&scoped=true&":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/components/admin/Departments/FormDepartments.vue?vue&type=template&id=716ea614&scoped=true& ***!
  \******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormDepartments_vue_vue_type_template_id_716ea614_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormDepartments.vue?vue&type=template&id=716ea614&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Departments/FormDepartments.vue?vue&type=template&id=716ea614&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormDepartments_vue_vue_type_template_id_716ea614_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormDepartments_vue_vue_type_template_id_716ea614_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/Departments/IndexDepartments.vue":
/*!************************************************************************!*\
  !*** ./resources/js/components/admin/Departments/IndexDepartments.vue ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IndexDepartments_vue_vue_type_template_id_b3128fb0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IndexDepartments.vue?vue&type=template&id=b3128fb0&scoped=true& */ "./resources/js/components/admin/Departments/IndexDepartments.vue?vue&type=template&id=b3128fb0&scoped=true&");
/* harmony import */ var _IndexDepartments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IndexDepartments.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Departments/IndexDepartments.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IndexDepartments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IndexDepartments_vue_vue_type_template_id_b3128fb0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IndexDepartments_vue_vue_type_template_id_b3128fb0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "b3128fb0",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Departments/IndexDepartments.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Departments/IndexDepartments.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/admin/Departments/IndexDepartments.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexDepartments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexDepartments.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Departments/IndexDepartments.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexDepartments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Departments/IndexDepartments.vue?vue&type=template&id=b3128fb0&scoped=true&":
/*!*******************************************************************************************************************!*\
  !*** ./resources/js/components/admin/Departments/IndexDepartments.vue?vue&type=template&id=b3128fb0&scoped=true& ***!
  \*******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexDepartments_vue_vue_type_template_id_b3128fb0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexDepartments.vue?vue&type=template&id=b3128fb0&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Departments/IndexDepartments.vue?vue&type=template&id=b3128fb0&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexDepartments_vue_vue_type_template_id_b3128fb0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexDepartments_vue_vue_type_template_id_b3128fb0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);