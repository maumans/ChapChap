<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Champ extends Model
{
    use HasFactory;

    protected $table = 'champs';

    protected $fillable = [
        'nom',
        'label',
        'type',
        'placeholder',
        'description',
        'options',
        'ordre'
    ];

    protected $casts = [
        'options' => 'array'
    ];

    public function getFormattedValueAttribute($value)
    {
        if (!$value) return null;

        // Si le champ a des options spécifiques pour les unités
        if (isset($this->options['unite'])) {
            return "{$value} {$this->options['unite']}";
        }

        // Sinon, utiliser l'unité par défaut selon le type
        if (isset(self::$typeUnits[$this->type])) {
            return "{$value} " . self::$typeUnits[$this->type];
        }

        return $value;
    }

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
