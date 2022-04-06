<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ProfilesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        \App\Models\General\Profile::create([
            'roles' => [],
            'user_id' => 1,
            'department_id' => 1,
            'type' => 'ac',
        ]);

        \App\Models\General\Profile::create([
            'roles' => array_keys(config('roles')),
            'user_id' => 2,
            'department_id' => 1,
            'group_id' => 1,
            'type' => 'ad',
        ]);

        \App\Models\General\Profile::create([
            'roles' => [],
            'set_id' => 1,
            'user_id' => 3,
            'department_id' => 6,
            'type' => 's',
        ]);
    }
}
