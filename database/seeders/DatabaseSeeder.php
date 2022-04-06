<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
//        $this->call(StarterData::class);
//        return;

        $this->call([
            GradesTableSeeder::class,
            VenuesTableSeeder::class,
            AssessmentsTableSeeder::class,
            TermClassesTableSeeder::class,
            PaymentTableSeeder::class,
            TermReceiptTableSeeder::class,
            OptionTableSeeder::class,
            ProfilesTableSeeder::class,
            UsersTableSeeder::class,
            SetsTableSeeder::class,
            DepartmentsTableSeeder::class,
            GroupsTableSeeder::class,
            TermsTableSeeder::class,
            CoursesTableSeeder::class,
            ClassTableSeeder::class,
            ClassMailSeeder::class,
        ]);
    }
}
