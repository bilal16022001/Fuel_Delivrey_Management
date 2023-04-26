<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string("Name");
            $table->foreignid("State_id")->references("id")->on("states")->onUpdate("cascade")->onDelete("cascade");
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
