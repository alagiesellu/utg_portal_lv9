<?php

return [
    'file_storage' => [
        'data' => [
            'key' => 'file_storage',   // class files storage capacity
            'value' => 200,            // capacity in megabytes
        ],
        'info' => [
            'type' => 'number',
            'min' => 0,
//                'max' => 10000,
            'name' => 'Class file storage capacity in megabytes',
        ],
    ],
    'min_class_size' => [
        'data' => [
            'key' => 'min_class_size',
            'value' => 0,
        ],
        'info' => [
            'type' => 'number',
            'name' => 'Minimum class size'
        ],
    ],
    'max_class_size' => [
        'data' => [
            'key' => 'max_class_size',
            'value' => 100,
        ],
        'info' => [
            'type' => 'number',
            'name' => 'Maximum class size'
        ],
    ],
    'max_class_registration' => [
        'data' => [
            'key' => 'max_class_registration',
            'value' => 6,
        ],
        'info' => [
            'type' => 'number',
            'name' => 'Maximum number of classes a student can register'
        ],
    ],
    'exchange_rate' => [
        'data' => [
            'key' => 'exchange_rate', // $1 => GMD
            'value' => '50.83',
        ],
        'info' => [
            'type' => 'number',
            'step' => 0.01,
            'name' => 'Exchange rate from $1 to GMD'
        ],
    ],
    'ppc' => [
        'data' => [
            'key' => 'ppc', // payment percentage to clear students
            'value' => '40',
        ],
        'info' => [
            'type' => 'number',
            'min' => 0,
            'max' => 100,
            'name' => 'Payment percentage to clear students',
        ],
    ],
];
