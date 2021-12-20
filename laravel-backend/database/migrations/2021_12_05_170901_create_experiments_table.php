<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExperimentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experiments', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->string('description');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('min_subjects')->default(1);
            $table->integer('max_subjects')->default(1);
            $table->unsignedBigInteger('experimentalist_id');
            $table->foreign('experimentalist_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('duration');
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
        Schema::dropIfExists('experiments');
    }
}
