<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageAbout extends Model
{
    use HasFactory;
    protected $fillable = ['Title', 'Description'];
    protected $table = "page_About";
}
