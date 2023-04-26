<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fuel_stations', function (Blueprint $table) {
            $table->id();
            $table->string("NameStation");
            $table->string("LocationStation");
            $table->foreignId("State_id")->references("id")->on("states")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId("City_id")->references("id")->on("cities")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId("Owner_id")->references("id")->on("fuel_station_owners")->onDelete("cascade")->onUpdate("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fuel_stations');
    }
};
