<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $num = 21516025;

        \App\User::create([
            'num' => $num++,
            'first_name' => 'Academic',
            'middle_name' => '',
            'last_name' => 'User',
            'email' => 'academic@utg.edu.gm',
            'tel' => 2203615110,
            'address' => 'Kanifing',
            'gender' => 'm',
            'dob' => '2000-11-11',
            'profile_id' => 1,
            'profile_type' => 'ac',
            'password' => bcrypt('acpassword'),
        ]);

        \App\User::create([
            'num' => $num++,
            'first_name' => 'Admin',
            'middle_name' => '',
            'last_name' => 'User',
            'email' => 'msbaldeh@utg.edu.gm',
            'tel' => 2203615110,
            'address' => 'Kanifing',
            'gender' => 'm',
            'dob' => '2000-11-11',
            'profile_id' => 2,
            'profile_type' => 'ad',
            'password' => bcrypt('msbpassword'),
        ]);

        \App\User::create([
            'num' => $num,
            'first_name' => 'Student',
            'middle_name' => '',
            'last_name' => 'User',
            'email' => 'student@utg.edu.gm',
            'tel' => 2203615110,
            'address' => 'Kanifing South',
            'gender' => 'm',
            'dob' => '2000-11-11',
            'profile_id' => 3,
            'profile_type' => 's',
            'password' => bcrypt('spassword'),
        ]);

        if (false) {
            $data = \Carbon\Carbon::now()->addYears(-1);
            $ac = 2203000000;
            while($ac++ < 2203000010) {
                $profile =
                    \App\Models\General\Profile::create([
                        'roles' => [],
                        'user_id' => 1,
                        'department_id' => 1,
                        'type' => 'ac',
                    ]);

                $user = \App\User::create([
                    'num' => $ac-100000000,
                    'first_name' => 'Academic',
                    'middle_name' => '',
                    'last_name' => 'User',
                    'email' => $ac.'@utg.edu.gm',
                    'tel' => $ac,
                    'address' => 'Kanifing',
                    'gender' => 'm',
                    'dob' => '2000-11-11',
                    'profile_id' => $profile->id,
                    'profile_type' => 'ac',
                ]);

                $profile->update([
                    'user_id' => $user->id,
                ]);
            }

            $ac = 2204000000;
            while($ac++ < 2204000010) {
                $profile =
                    \App\Models\General\Profile::create([
                        'roles' => [],
                        'user_id' => 1,
                        'department_id' => 1,
                        'type' => 'ad',
                    ]);

                $user = \App\User::create([
                    'num' => $ac-100000000,
                    'first_name' => 'Admin',
                    'middle_name' => '',
                    'last_name' => 'User',
                    'email' => $ac.'@utg.edu.gm',
                    'tel' => $ac,
                    'address' => 'Kanifing',
                    'gender' => 'm',
                    'dob' => '2000-11-11',
                    'profile_id' => $profile->id,
                    'profile_type' => 'ad',
                ]);

                $profile->update([
                    'user_id' => $user->id,
                ]);
            }

            $ac = 2205000000;
            while($ac++ < 2205000010) {
                $profile =
                    \App\Models\General\Profile::create([
                        'roles' => [],
                        'user_id' => 1,
                        'department_id' => 1,
                        'type' => 's',
                        'set_id' => 1,
                    ]);

                $user = \App\User::create([
                    'num' => $ac-100000000,
                    'first_name' => 'Student',
                    'middle_name' => '',
                    'last_name' => 'User',
                    'email' => $ac.'@utg.edu.gm',
                    'tel' => $ac,
                    'address' => 'Kanifing South',
                    'gender' => 'm',
                    'dob' => '2000-11-11',
                    'profile_id' => $profile->id,
                    'profile_type' => 's',
                ]);

                $profile->update([
                    'user_id' => $user->id,
                ]);
            }
        }

    }
}
