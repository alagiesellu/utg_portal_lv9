<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        \App\Models\Academics\Course::create([
            'code' => 'CPS101',
            'name' => 'Intro to Computer Science',
            'description' => 'Intro to Computer Science',
            'department_id' => 5,
            'credit_hours' => 3,
        ]);
    }
}
