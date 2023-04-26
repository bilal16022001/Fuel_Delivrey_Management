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
        Schema::create('order_fuels', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("Order_Number");
            $table->foreignId("user_id")->references("id")->on("users")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId("State_id")->references("id")->on("states")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId("City_id")->references("id")->on("cities")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId("FuelStation_id")->references("id")->on("fuel_stations")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId("Fuel_id")->references("id")->on("fuels")->onDelete("cascade")->onUpdate("cascade");
            $table->integer("PriceFuel");
            $table->integer("QuantityFuel");
            $table->string("AdressFuel");
            $table->integer("Statuts", 0);
            $table->date("Date");
            $table->time("Time");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_fuels');
    }
};
