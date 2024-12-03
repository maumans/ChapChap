<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Annonce extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function annonciateur()
    {
        return $this->belongsTo(User::class, 'annonciateur_id');
    }

    public function annonceLikes()
    {
        return $this->hasMany(AnnonceLike::class);
    }
    public function annonceNotes()
    {
        return $this->hasMany(AnnonceNote::class);
    }

    public function annonceImages()
    {
        return $this->hasMany(AnnonceImage::class);
    }

    public function annonceTailles()
    {
        return $this->hasMany(AnnonceTaille::class);
    }

    public function champs()
    {
        return $this->belongsToMany(Champ::class, 'annonce_champ')
            ->withPivot('valeur')
            ->withTimestamps();
    }
}
