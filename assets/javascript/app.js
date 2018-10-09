var panel = $('#quiz-area');
var countStartNumber = 30;


///////////////////////////////////////////////////////////////////////////////

//CLICK EVENTS

///////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

///////////////////////////////////////////////////////////////////////////////


//Question set


///////////////////////////////////////////////////////////////////////////////

var questions = [{
  question: "Which country has won the most FIFA World Cups?",
  answers: ["Italy", "France", "Brazil", "Mexico"],
  correctAnswer: "Brazil",
  image:"assets/images/brazil.gif"
}, {
  question: " Which country has won the second most number of World Cups?",
  answers: ["England", "Africa", "Spain", "Italy"],
  correctAnswer: "Italy",
  image:"assets/images/italy.gif"
}, {
  question: "Which two countries have reached the final of the football World Cup the most number of times?",
  answers: ["England & Spain", "Germany & Brazil", "Brazil & France", "Portugal & Argentina"],
  correctAnswer: "Germany & Brazil",
  image:"assets/images/germanybrazil.gif"
}, {
  question: 'In what year was the first World Cup held, and in which country?',
  answers: ["1986 Mexico", "1930 Uruguay", "1947 Germany", "1970 Russia"],
  correctAnswer: "1930 Uruguay",
  image:"assets/images/uruguay.gif"
}, {
  question: 'How many teams participated in the first World Cup',
  answers: ["13", "16", "24", "32"],
  correctAnswer: "13",
  image:"assets/images/13.gif"
}, {
  question: 'Which is the only country to have reached three finals without winning any?',
  answers: ["Mexico", "Spain", "USA", "Netherlands"],
  correctAnswer: "Netherlands",
  image:"assets/images/netherlands.gif"
}, {
  question: 'In the 2014 World Cup, the Maracana will become the second stadium to host two World Cup finals. Which was the first?',
  answers: ["Rio Tinto", "Camp Nou", "Estadio Azteca", "Fenway Park"],
  correctAnswer: "Estadio Azteca",
  image:"assets/images/estadioazteca.gif"
}, {
  question: "Who is Mexico's all time scoring leader?",
  answers: ["Carlos Hermosillo", "Luis Hernandez", "Chicharito", "Jared Borgetti"],
  correctAnswer: "Chicharito",
  image:"assets/images/chicharito.gif"
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};