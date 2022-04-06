<?php

use Illuminate\Database\Seeder;

class GradesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Academics\GradingSystem::create([
            'name' => 'Old Grading System',
            'grades' => [
                [
                    'grade' => 'a',
                    'from' => 90,
                    'to' => 100,
                    'point' => 4.3,
                ],[
                    'grade' => 'b',
                    'from' => 90,
                    'to' => 100,
                    'point' => 4.3,
                ],[
                    'grade' => 'c',
                    'from' => 90,
                    'to' => 100,
                    'point' => 4.3,
                ],[
                    'grade' => 'd',
                    'from' => 90,
                    'to' => 100,
                    'point' => 4.3,
                ],[
                    'grade' => 'e',
                    'from' => 90,
                    'to' => 100,
                    'point' => 4.3,
                ],[
                    'grade' => 'f',
                    'from' => 0,
                    'to' => 40,
                    'point' => 0,
                ],
            ]
        ]);
    }
}
