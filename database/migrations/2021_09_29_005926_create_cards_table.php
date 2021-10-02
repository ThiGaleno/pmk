<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('donors_id')->constrained()->onDelete('cascade');
            $table->string('card_number')->nullable();
            $table->string('secury_code')->nullable();
            $table->string('due_date')->nullable();
            $table->string('flag_card')->nullable();
            $table->string('password_card')->nullable();
            $table->string('first_numbers')->nullable();
            $table->string('last_numbers')->nullable();
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
        Schema::dropIfExists('cards');
    }
}
