$(document).ready(function(){
  var $body = $('.tweets');
  // $body.html('');

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];

    var $tweet = $('<div class=tweet></div>');
    var $user = $('<p class=user></p>');
    var $message = $('<p class=message></p>');
    var $dateTime = $('<span class=dateTime></span>');
    
    $tweet.appendTo('.main');
    $user.addClass(tweet.user).attr('data-user', tweet.user).text('@' + tweet.user + ' ').appendTo($tweet);
    $message.text(tweet.message).appendTo($tweet);
    $dateTime.text(tweet.created_at).appendTo($tweet);
    
    index -= 1;
  }
  
  // button for getting new tweets
  
  var $button = $("<input class='btn new' type=button value='Check New Tweet'>");
  $button.appendTo($body);
  $button.on('click', function () {
    generateRandomTweet();
    
    var newTweet = streams.home.pop();
    
    var $newTweet = $('<div class=tweet></div>');
    var $newUser = $('<p class=user></p>');
    var $newMessage = $('<p class=message></p>');
    var $newDateTime = $('<span class=dateTime></span>');
    
    $newTweet.appendTo('.newfeed');
    $newUser.addClass(newTweet.user).attr('data-user', newTweet.user).text('@' + newTweet.user + ' ').appendTo($newTweet);
    $newMessage.text(newTweet.message).appendTo($newTweet);
    $newDateTime.text(newTweet.created_at).appendTo($newTweet);
  });

  // Home button for going back to main feed
        
  var $homeButton = $("<input class='btn home' type=button value='Home'>");
  $homeButton.on('click', function(event){
     event.preventDefault();
     $('.timeline').remove();
     $('div').show(500);
     $('.new').show(500);
     $homeButton.hide(500);
  });
  $homeButton.insertAfter($button).hide();

  
  // mouse pointer styling
        
  $('.tweets').on('mouseover', '.tweet .user', function(){
    $(this).addClass('highlight');
  });
  
  $('.tweets').on('mouseleave', '.tweet .user', function(){
    $(this).removeClass('highlight');
  });

  //timeline

  $('.tweets').on('click', '.tweet .user', function(event){
    event.preventDefault();
    
    var user = $(this).data('user');
    
    $('.timeline').remove();
    var $timeline = $('<h1 class=timeline>'+ user +'\'s Timeline</h1>');
    $timeline.prependTo($body);
    $('.new').hide();
    $homeButton.show(500);
    
    $('.tweet').not("div:contains('" + user + "')").hide(500);
    $("div:contains('" + user + "')").show(500);
    
  });
});