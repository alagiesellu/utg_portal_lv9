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
        Schema::create('grades', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('term_class_id');
            //$table->unsignedInteger('assessment_id');
            //$table->unsignedInteger('course_id');
            $table->unsignedBigInteger('student_profile_id');
            $table->unsignedBigInteger('class_registration_id');
            $table->json('scores');
            $table->unsignedInteger('grading_system_id');
            //$table->unsignedDecimal('total_score');
            $table->unsignedBigInteger('uploaded_by_profile_id')->nullable();
            $table->unsignedBigInteger('approved_by_profile_id')->nullable();
            $table->unsignedBigInteger('resit_grade_id')->nullable();
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
        Schema::dropIfExists('grades');
    }
};
