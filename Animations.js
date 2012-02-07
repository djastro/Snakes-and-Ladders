// Define the entry point
$(document).ready(function()
{
	animation.resetTokens();
});
var animation = new function(board_height, board_width, preamble){
	var self = this;
	var board_height = board_height;
	var board_width = board_width;
	
	function integerDivide(numerator, denominator){
		var remainder = numerator % denominator;
		return ( numerator - remainder ) / denominator;
	}
	
	var square_width = integerDivide( board_width, 10);
	var square_height = integerDivide( board_height, 10);
	
	//Assumes a 10*10 board, calculates the image top and left for position then moves the token.
	self.animateToken =	function(token, position) {
							var x = position % 10;
							var y = integerDivide(position,10);
							if (y % 2 == 1)
							{// if y is odd x is inversed for the alternating left to right movement
								x = 10 - x;
								if(x==10){x=x-1;}
							} else {
								if( x != 0){ x = x - 1;}
							}
							if (x == 0) {
								y = 10 - y; //board is completed from bottom up.
							} else {
								if (y % 2 == 1 && x==9 && position != 91) {
									y = 10 - y;
								} else {
									y = 9 - y;
								}
							}
							move(token,x,y);
						}
	
	function move(token,x,y){
		$("#" + token).animate({
				left: 		x*square_width,
				top:		y*square_height
			}, {
				queue:		true,
				duration:	"fast",
				easing:		"easeOutQuint"
			});
	}
	
	function moveLeftOrRight(token) {
		$("#" + token).animate({
			left: 		horizontal
		}, {
			queue:		true,
			duration:	"fast",
			easing:		"easeOutBounce",
			complete: 	function() {
							if ($("#" + token).css("left").replace("px","") >= board_width - square_width )
							{
								horizontal = "-=" + square_width;
							} else if ($("#" + token).css("left").replace("px","") <= 0 ){
								horizontal = "+=" + square_width;
							}
						}
		});
	}
	
	self.resetTokens = 	function(players){
							$(".tokens").css({
								top: 	function(index, value){
											return square_height * 9;
										},
								left:	function(index, value){
											return -square_width;
										}
							});
						}
}(1760,1760);


//Border 22 pixels
//Spacing 6 pixels
//height 170 pixels
//width 170 pixels