<?php

return [

    'options' => [
        'file_storage' => [
            'data' => [
                'key' => 'class_storage',   // class files storage capacity
                'value' => '50',            // capacity in megabytes
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
    ],

    'departments' => [
        [
            'name' => 'University of The Gambia',
            'description' => 'UTG',
            'department_id' => 0,
            'email' => 'info@utg.edu.gm',
            'tel' => '2203615110',
            'is_admin' => 0,
            'is_major' => 0,
        ],
        [
            'name' => 'Academics',
            'description' => 'AC',
            'department_id' => 1,
            'email' => 'info@utg.edu.gm',
            'tel' => '2203615110',
            'is_admin' => 0,
            'is_major' => 0,
        ],
        [
            'name' => 'Admin',
            'description' => 'CS',
            'department_id' => 1,
            'email' => 'info@utg.edu.gm',
            'tel' => '2203615110',
            'is_admin' => 1,
            'is_major' => 0,
        ],
        [
            'name' => 'School of ICT',
            'description' => 'ICT',
            'department_id' => 2,
            'email' => 'info@utg.edu.gm',
            'tel' => '2203615110',
            'is_admin' => 0,
            'is_major' => 0,
        ],
        [
            'name' => 'School Medicine & Allied Sciences',
            'description' => 'MAS',
            'department_id' => 2,
            'email' => 'info@utg.edu.gm',
            'tel' => '2203615110',
            'is_admin' => 0,
            'is_major' => 0,
        ],
        [
            'name' => 'Medical Department',
            'description' => 'Medicine',
            'department_id' => 5,
            'email' => 'info@utg.edu.gm',
            'tel' => '2203615110',
            'is_admin' => 0,
            'has_rotation' => 1,
            'is_major' => 1,
            'fee_per_term' => [
                'local' => 8000,
                'foreign' => 1000,
            ],
        ],
        [
            'name' => 'School of Agriculture',
            'description' => 'Agric',
            'department_id' => 2,
            'email' => 'info@utg.edu.gm',
            'tel' => '2203615110',
            'is_admin' => 0,
            'is_major' => 0,
        ],
        [
            'name' => 'Law Faculty',
            'description' => 'Law',
            'department_id' => 2,
            'email' => 'info@utg.edu.gm',
            'tel' => '2203615110',
            'is_admin' => 0,
            'is_major' => 0,
        ],
        [
            'name' => 'School of Business and Public Administration',
            'description' => 'BPA',
            'department_id' => 2,
            'email' => 'info@utg.edu.gm',
            'tel' => '3615110',
            'is_admin' => 0,
            'is_major' => 0,
        ],
        [
            'name' => 'Information Technology',
            'description' => 'IT',
            'department_id' => 3,
            'email' => 'info@utg.edu.gm',
            'tel' => '3615110',
            'is_admin' => 1,
            'is_major' => 0,
        ],
        [
            'name' => 'Human Resources',
            'description' => 'HR',
            'department_id' => 3,
            'email' => 'info@utg.edu.gm',
            'tel' => '3615110',
            'is_admin' => 1,
            'is_major' => 0,
        ],
        [
            'name' => 'Relations',
            'description' => 'R',
            'department_id' => 3,
            'email' => 'info@utg.edu.gm',
            'tel' => '3615110',
            'is_admin' => 1,
            'is_major' => 0,
        ],
    ],

];
