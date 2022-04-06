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
        Schema::create('term_classes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('course_id');
            $table->unsignedInteger('term_id');
//            $table->json('lecturers');
//            $table->json('assistance');
            $table->unsignedInteger('venue_id');
            $table->unsignedInteger('term_class_id')->nullable();
            $table->json('times')->nullable();
            $table->unsignedInteger('size');
//            $table->integer('day')->nullable();
//            $table->time('starting_time')->nullable();
//            $table->time('ending_time')->nullable();
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
        Schema::dropIfExists('term_classes');
    }
};
