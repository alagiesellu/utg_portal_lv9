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
        Schema::create('terms', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->date('starting_at');
            $table->date('ending_at');
            $table->date('registration_deadline')->nullable();
            $table->date('unregistration_deadline')->nullable();
            $table->integer('department_id')->nullable();
            $table->json('departments_excepted')->nullable();
            $table->json('departments_only')->nullable();
            $table->json('sets_excepted')->nullable();
            $table->integer('set_id')->nullable();
            $table->boolean('registration_required')->default(1);
            $table->boolean('pay_per_class')->default(0);
            $table->integer('external_exam_percentage')->nullable();
            $table->integer('term_id')->nullable();
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
        Schema::dropIfExists('terms');
    }
};
