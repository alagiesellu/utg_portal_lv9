<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ClassTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Academics\TermClass::create([
            'course_id' => 1,
            'term_id' => 1,
            'venue_id' => 1,
            'times' => [
                ["day" => "Monday", "time" => "10:00"]
            ],
            'size' => 100,
        ]);

        \App\Models\Academics\ClassLecturer::create([
            'term_class_id' => 1,
            'profile_id' => 1,
            'active' => 1,
        ]);
    }
}
