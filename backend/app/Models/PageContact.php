<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageContact extends Model
{
    use HasFactory;
    protected $fillable = ['Title', 'Description', 'Phone', 'Email', 'Copyright'];
    protected $table = "page_contact";
}
