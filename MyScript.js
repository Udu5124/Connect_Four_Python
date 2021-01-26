console.log("Connected...");

//  Assignin colours to player1 and player2
var player1Color =  'rgb(65, 105, 225)';
var player2Color = 'rgb(220, 20, 60)';

//  Down symbol on the screen clears the board
$('#down').click(function(){
    $('.circle button').css('background-color', 'rgb(128, 128, 128)')
    location.reload();
})

//  Asking player1 name
var player1 = prompt("Player 1 : Enter your name, you will be Blue")

//  Asking player2 name
var player2 = prompt("Player 2 : Enter your name, you will be Red")

var game_on = true;
var table = $('table tr')

// Changing color of the circle
function changeColor(rowIndex, columnIndex, color)
{
    return table.eq(rowIndex).find('td').eq(columnIndex).find('button').eq(0).css('background-color', color);
}

// Return color of the given circle
function returnColor(rowIndex, columnIndex)
{
    return table.eq(rowIndex).find('td').eq(columnIndex).find('button').css('background-color');
}

//Returns row of latest blank circle
function checkBottom(columnIndex)
{
    var colorCheck = returnColor(6, columnIndex);
    for (var row = 6; row > -1; row--)
    {
        colorCheck = returnColor(row, columnIndex);
        if(colorCheck === 'rgb(128, 128, 128)')
        {
            return row
        }
    }
}

// Check for chips with same color
function colorMatch(one, two, three, four)
{
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined)
}

// Wins with same color chips in same row
function horizontalWin()
{
    for (var row = 0; row < 7; row++)
    {
        for (var col = 0; col < 4; col++)
        {
            if(colorMatch(returnColor(row,col), returnColor(row,col+1), returnColor(row,col+2), returnColor(row,col+3)))
            {
                console.log("Horizontal Win!!!");
                game_on = false;
                return true;
            }
            else
            {
                continue;
            }
        }
    }
}

// Wins with same color chips in same column
function verticalWin()
{
    for (var col = 0; col <= 6; col++)
    {
        for (var row = 0; row <= 3; row++)
        {
            if(colorMatch(returnColor(row,col), returnColor(row+1,col), returnColor(row+2,col), returnColor(row+3,col)))
            {
                console.log("Vertical Win!!!");
                game_on = false;
                return true;
            }
            else
            {
                continue;
            }
        }
    }
}

// Wins with same color chips diagonally
function diagonalWin()
{
    for (var col = 0; col < 6; col++)
    {
        for (var row = 0; row < 7; row++)
        {
            if(colorMatch(returnColor(row,col), returnColor(row+1,col+1), returnColor(row+2,col+2), returnColor(row+3,col+3)))
            {
                console.log("Diagonal Win!!!");
                game_on = false;
                return true;
            }
            else if(colorMatch(returnColor(row,col), returnColor(row-1,col+1), returnColor(row-2,col+2), returnColor(row-3,col+3)))
            {
                console.log("Diagonal Win!!!");
                game_on = false;
                return true;
            }
            else
            {
                continue;
            }
        }
    }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1 + " it's your turn to pick, choose a column to drop in!");

$('.circle button').on('click', function()
{
    var column = $(this).closest('td').index();
    var bottomAvailable = checkBottom(column);

    changeColor(bottomAvailable, column, currentColor);

    if(horizontalWin() || verticalWin() || diagonalWin() || !game_on)
    {
        $('h1').text(currentName + ", You have won!!!");
        $('h4').text('');
    }

    currentPlayer = currentPlayer * -1;

    if(currentPlayer === 1)
    {
        currentName = player1;
        $('h3').text(currentName + " it's your turn");
        currentColor = player1Color;
        if(game_on === false)
        {
            $('h3').text('');
        }
    }
    else
    {
      currentName = player2;
      $('h3').text(currentName + " it's your turn");
      currentColor = player2Color;
      if(game_on === false)
      {
          $('h3').text('');
      }
    }
})
