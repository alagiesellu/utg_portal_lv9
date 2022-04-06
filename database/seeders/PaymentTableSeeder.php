<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PaymentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Finance\Payment::create([
            'admin_profile_id' => 2,
            'student_profile_id' => 3,
            'currency_key' => 'GMD',
            'amount' => 8000,
        ]);
    }
}
