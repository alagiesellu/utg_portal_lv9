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
        Schema::create('class_registrations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('term_class_id');
            $table->unsignedInteger('profile_id');
            $table->unsignedInteger('approved_by_profile_id')->nullable();
            $table->boolean('active')->default(1);
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
        Schema::dropIfExists('class_registrations');
    }
};
