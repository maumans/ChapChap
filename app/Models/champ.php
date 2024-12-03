<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Champ extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'label',
        'type',
        'description',
        'options',
        'ordre'
    ];

    protected $casts = [
        'options' => 'array'
    ];

    public function categories()
    {
        return $this->belongsToMany(Categorie::class, 'categorie_champ')
            ->withTimestamps();
    }

    public function annonces()
    {
        return $this->belongsToMany(Annonce::class, 'annonce_champ')
            ->withPivot('valeur')
            ->withTimestamps();
    }
}
