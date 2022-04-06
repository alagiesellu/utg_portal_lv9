<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class StarterData extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        \App\User::create([
            'num' => 220,
            'first_name' => 'Admin',
            'middle_name' => '',
            'last_name' => 'User',
            'email' => 'admin@utg.edu.gm',
            'tel' => 2203615110,
            'address' => 'Kanifing',
            'gender' => 'm',
            'dob' => '2000-11-11',
            'profile_id' => 1,
            'profile_type' => 'ad',
        ]);

        \App\Model\General\Profile::create([
            'roles' => array_keys(config('roles')),
            'user_id' => 1,
            'department_id' => 1,
            'group_id' => 1,
            'type' => 'ad',
        ]);

        \App\Model\General\Group::create([
            'name' => 'System Admin',
            'description' => 'System Admin',
            'department_id' => 1,
            'roles' => array_keys(config('roles'))
        ]);

        \App\Model\General\Department::create([
            'name' => 'University of The Gambia',
            'description' => 'UTG',
            'department_id' => 0,
            'email' => 'info@utg.edu.gm',
            'tel' => 2203015255,
        ]);
    }
}
