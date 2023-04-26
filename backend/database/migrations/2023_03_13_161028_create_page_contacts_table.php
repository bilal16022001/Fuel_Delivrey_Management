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
        Schema::create('page_contact', function (Blueprint $table) {
            $table->id();
            $table->string("Title");
            $table->string("Description");
            $table->integer("Phone");
            $table->string("Email");
            $table->string("Copyright");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_contacts');
    }
};
