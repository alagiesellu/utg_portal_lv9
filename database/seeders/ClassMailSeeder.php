<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ClassMailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ([1,3] as $i) {

            \App\Models\General\ClassMail::create([
                'term_class_id' => 1,
                'profile_id' => $i,
                'subject' => $i.' Test Subject',
                'message' => $i.' Test Message',
            ]);
        }
    }
}
