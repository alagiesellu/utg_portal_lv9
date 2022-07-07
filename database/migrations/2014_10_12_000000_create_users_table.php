<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->integer('num')->unique();
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('email');
            $table->bigInteger('tel');
            $table->string('address');
            $table->enum('gender', ['m','f']);
            $table->date('dob');
            $table->string('nationality', 2)->default('GM');
            $table->string('img', 30)->default('default.png');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();

            $table->unsignedBigInteger('profile_id');
            $table->enum('profile_type', ['ad','ac','s'])->default('s');// admin, academic, student
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
