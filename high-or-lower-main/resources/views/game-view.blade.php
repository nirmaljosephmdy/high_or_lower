<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <title>Higher or Lower Game</title>
</head>
<body>
    <div class="game-container">
        
        <div id="top-section" class="top-section">
            <div class="score-box">
                <p>Total Score</p>
                <span id="totalScore"></span>
            </div>
            <div class="chances-box">
                <p>Chances Remaining</p>
                <span id="remainingChances">3</span>
            </div>
        </div>
        <!-- <div id="card" class="card">Card</div> -->
        <div id="card" class="">
             <p id="card-value"></p>
        </div>  
        
        <div class="button-container" id="buttons-cards">
            <p style="text-align: center;">Will the next card be higher or lower than the one above?</p>
            <button onclick="guess('higher')">Higher</button>
            <button onclick="guess('lower')">Lower</button>
        </div>
        
        <div id="result" class="result"></div>
        <button id="restartBtn" onclick="restartGame()">Restart</button>
    </div>
    <script>
        var cards = @json($cards);
    </script>
    <script src="{{ asset('js/scripts.js') }}"></script>
</body>

</html>
