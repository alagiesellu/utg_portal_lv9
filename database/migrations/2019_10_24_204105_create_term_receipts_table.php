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
        Schema::create('term_receipts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('term_id');
            $table->unsignedInteger('admin_profile_id');
            $table->unsignedInteger('cancelled_by_admin_profile_id')->nullable();
            $table->unsignedInteger('student_profile_id');
            $table->string('currency_key');
            $table->double('rate')->nullable();
            $table->double('amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('term_receipts');
    }
};
