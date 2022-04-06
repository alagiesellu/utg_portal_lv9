<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class GroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\General\Group::create([
            'name' => 'System Admin',
            'description' => 'System Admin',
            'department_id' => 10,
            'roles' => array_keys(config('roles'))
        ]);
    }
}
