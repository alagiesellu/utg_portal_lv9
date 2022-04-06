<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->json('roles');
            $table->boolean('active')->default(1);
            $table->enum('type', ['ad','ac','s'])->default('s');// admin, academic, student

            $table->unsignedBigInteger('set_id')->nullable();
            //$table->foreign('set_id')->references('id')->on('sets');

            $table->unsignedBigInteger('user_id');
            //$table->foreign('user_id')->references('id')->on('users');

            $table->unsignedBigInteger('department_id');
            //$table->foreign('department_id')->references('id')->on('departments');

            $table->unsignedBigInteger('major_department_id')->nullable();
            $table->unsignedBigInteger('minor_department_id')->nullable();

            $table->unsignedBigInteger('group_id')->nullable();
            //$table->foreign('group_id')->references('id')->on('groups');

            $table->date('completed_at')->nullable();
            $table->date('enrolled_at')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
};
