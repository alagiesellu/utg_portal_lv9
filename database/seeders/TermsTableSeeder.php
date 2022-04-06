<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TermsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Academics\Term::create([
            'name' => '1st Semester, 2019',
            'starting_at' => now(),
            'ending_at' => now()->addYear(),
            'registration_deadline' => now()->addDays(20),
            'unregistration_deadline' => now()->addDays(30),
            'department_id' => 1,
            'registration_required' => 1,
        ]);
    }
}
