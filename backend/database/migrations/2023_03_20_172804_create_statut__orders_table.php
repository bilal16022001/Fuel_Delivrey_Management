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
        Schema::create('statut__orders', function (Blueprint $table) {
            $table->id();
            $table->string("Remark");
            $table->string("Statuts");
            $table->foreignId("Order_id")->references("id")->on("order_fuels")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId("User_id")->references("id")->on("users")->onDelete("cascade")->onUpdate("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statut__orders');
    }
};
