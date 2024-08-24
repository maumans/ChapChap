<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;

    protected $guarded = [];

    function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    function categories()
    {
        return $this->hasMany(Categorie::class);
    }

    function parents()
    {
        $parents = [];
        $categorie = $this->categorie;

        while ($categorie) {
            array_push($parents, ['id'=>$categorie->id,'nom'=>$categorie->nom]);
            $categorie = $categorie->categorie;
        }

        return $parents;
    }

}
