<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TermReceiptTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Finance\TermReceipt::create([
            'term_id' => 1,
            'admin_profile_id' => 2,
            'student_profile_id' => 3,
            'currency_key' => 'GMD',
            'amount' => 10000,
        ]);
    }
}
