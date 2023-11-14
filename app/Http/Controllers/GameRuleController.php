<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GameRuleController extends Controller
{
    public function index()
    {
        $apiUrl = "https://higherorlower-api.netlify.app/json";
        $cards = Http::get($apiUrl)->json();
      

        // Shuffle the cards
        shuffle($cards);
        return view('game-view', compact('cards'));
    }
}
