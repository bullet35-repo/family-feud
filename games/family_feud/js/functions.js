    const startButton = document.getElementById('startbtn');
    const container = document.querySelector('.container');
    const card = document.querySelector('.card');
    const audio = document.getElementById('themeAudio');
    let isAudioOn = true;
    const buttons = document.querySelectorAll('body button');
    const clickEffect = document.getElementById('effect');
    const settingBtn = document.getElementById('settingsbtn');
    const setting_cont = document.querySelector('.setting_container');
    const close = document.getElementById('closeBtn');
    const choose_cont = document.querySelector('.choose_cont');
    const playbtn = document.getElementById('playbtn');
    const returnBtn = document.getElementById('return');
    const continuebtn = document.getElementById('continuebtn');
    const instructions = document.querySelectorAll(".instructions p");
    const singlebtn = document.getElementById('singlebtn');
    const instruction = document.querySelector('.instructions');
    const single_player = document.querySelector('.choose_cont .single_player ');
    const two_payer = document.querySelector('.choose_cont .two_player ');
    const start_game = document.querySelector('.start_game');
    const round = document.querySelector('.start_game h3');
    const twoPround = document.querySelector('.twoPstart_game_cont h3');
    const timerSpan = document.querySelector('.timer span');
    const timeDisplay = document.getElementById('timeDisplay');
    const topcont = document.querySelector('.topcont');
    const inputanswer = document.querySelector('.start_game input');
    const twopanswerInput = document.querySelector('.middlecont input');
    const undercont = document.querySelector('.undercont'); 
    const homebtn = document.querySelectorAll('.homebtn');
    const leftOut = document.querySelector(".left_out");
    const revealed = document.querySelector(".revealed");
    const end = document.querySelector('.end');
    const p1 = document.querySelector(".p1");
    const p2 = document.querySelector(".p2");
    const twop1 = document.querySelector(".twop1");
    const twop2 = document.querySelector(".twop2");
    const questionElement = document.querySelector('.question');
    const survequestion = document.querySelector('.twopquestion');
    const pointsDisplay = document.getElementById("points");
    const pausebtn = document.getElementById('pause');
    const pausecont = document.querySelector('.pause_container');
    const pause =document.querySelector('.pause');
    const resumebtn = document.getElementById('resume');
    const nextroundbtn = document.getElementById('nextround');
    const  twoplayer_cont = document.querySelector('.twoplayer_content');
    const twoplayer_instruction = document.querySelector('.instructions_content');
    const twostartbtn = document.getElementById('startTwoPlayerBtn');
    const backTwoPlayerBtn = document.getElementById('backTwoPlayerBtn');
    const start_twoplayer = document.getElementById('startTwoPlayerGameBtn');
    const twoPstargame = document.querySelector('.twoplayer_startGame');
    const vs_cont = document.querySelector('.vs-container');
    const strtplayer1 = document.querySelector('.startplayer1');
    const strtplayer2 = document.querySelector('.startplayer2');
    const vs = document.querySelector('.vs');
    const twoplayerhomebtn = document.querySelector('.twoplayerhomebtn');
    const twoplayerctnt = document.querySelector('.twoPstart_game_cont');
    const Player1 = document.querySelector('.player1');
    const middcont = document.querySelector('.middlecont');
    const Player2 = document.querySelector('.player2');
    const countdownEl = document.querySelector('.buzzCountdown');
    const showwmessage = document.querySelector('.messageDisplay');
    const p1wrong = document.querySelector('.p1wrong');
    const p2wrong = document.querySelector('.p2wrong');
    const p1keyDisplay = document.querySelector('.player1 .key-display');
    const p2keyDisplay = document.querySelector('.player2 .key-display');
    const answeringRound = document.getElementById('answeringround');
    const correctSound = new Audio('assets/audio/corectanswer.mp3');
    const gameover = new Audio('assets/audio/gameover.mp3');
    const twoProundResult = document.querySelector('.towPround_result_proceed');
    const twopnextround = document.querySelector('.twoPnxtRound');
    const finalhomebtn = document.querySelector('.finalhomebtn');
    const winnerMessage = document.querySelector('.winner_message');
    const winnerText = document.querySelector('.winner_text');
    const proceedBtn = document.getElementById('proceedToFinal');
    const finalround_cont = document.querySelector('.twoPfinal_round');
    const finalScore = document.querySelector('.final_score');
    const finalRoundTimer = document.getElementById('finalRoundTimer');
    const lastMessage1 = document.querySelector('.last_message1');
    const lastMessage2 = document.querySelector('.last_message2');
    const lastMessage3 = document.querySelector('.last_message3');
    let timerInterval;
    let earnedPoints = 0;
    let timeoutIds = [];
    let player1RoundPoints = 0;
    let player2RoundPoints = 0;
    let player1totalpoints = 0;
    let player2Totalpoints = 0;
    let player1 = "";
    let player2 = "";
    let points = 0;
    let currentRound = 1;
    let timeLeft = 10;
    let timer;
    let currentStep = 0;
    let isSoundOn = true;
    let correctAnswers = 0; 
    const maxcorrectAnswers = 5;
    let wrongGuesses = 0;
    let p1WrongGuesses = 0;
    let p2WrongGuesses = 0;
    let roundPoints = 0;
    const maxWrongGuesses = 3;
    let isPaused = false;
    let buzzedPlayer = "";
    let stealingPlayer ="";
    let stealMode = false;
    let questions = [];
    let currentQuestion = {};
    let revealedAnswers = [];
    let randomIndex = Math.floor(Math.random() * questions.length);
    let rounds = [];
    let currentQuestionIndex = 0;
    let allQuestions = [];
    
    
      
    
    
    let xMark = document.getElementById('x');
    let img = document.createElement("img");
    const xImageContainer = document.querySelector('.xImageContainer');
    const round2 = document.querySelector('.round2');
    const round3 = document.querySelector('.round3');
    let totalPoints = 0;
    let pointValue =0;
    const goodJob = document.querySelector('.goodJob');
    const SETTINGS_STORAGE_KEY = 'familyFeudSettings';
    const musicToggleButtons = [
      document.getElementById('audioBtn'),
      document.getElementById('pauseaudioBtn')
    ].filter(Boolean);
    const soundToggleButtons = [
      document.getElementById('soundBtn'),
      document.getElementById('pausesoundBtn')
    ].filter(Boolean);
    const musicTracks = [audio, answeringRound, gameover].filter(Boolean);

    function updateToggleButtons(buttons, enabled) {
      buttons.forEach(button => {
        button.innerText = enabled ? 'ON' : 'OFF';
        button.classList.toggle('off', !enabled);
        button.style.backgroundColor = enabled ? '' : 'gray';
      });
    }

    function saveGlobalSettings() {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({
        music: isAudioOn,
        sound: isSoundOn
      }));
    }

    function syncSettingsUi() {
      updateToggleButtons(musicToggleButtons, isAudioOn);
      updateToggleButtons(soundToggleButtons, isSoundOn);
    }

    function loadGlobalSettings() {
      const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!savedSettings) {
        syncSettingsUi();
        return;
      }

      try {
        const parsedSettings = JSON.parse(savedSettings);
        isAudioOn = parsedSettings.music !== false;
        isSoundOn = parsedSettings.sound !== false;
      } catch (error) {
        localStorage.removeItem(SETTINGS_STORAGE_KEY);
      }

      syncSettingsUi();
    }

    function playMusic(track) {
      if (!isAudioOn || !track) return;
      track.play().catch(error => {
        console.error('Error playing music:', error);
      });
    }

    function stopMusic(track) {
      if (track) {
        track.pause();
      }
    }

    function playSound(sound) {
      if (!isSoundOn || !sound) return;
      sound.currentTime = 0;
      sound.play().catch(error => {
        console.error('Error playing sound:', error);
      });
    }

    function setMusicEnabled(enabled, trackToResume = null) {
      isAudioOn = enabled;
      if (!enabled) {
        musicTracks.forEach(stopMusic);
      } else if (trackToResume) {
        playMusic(trackToResume);
      }
      syncSettingsUi();
      saveGlobalSettings();
    }

    function setSoundEnabled(enabled) {
      isSoundOn = enabled;
      syncSettingsUi();
      saveGlobalSettings();
    }
    

window.addEventListener('DOMContentLoaded', () => { 
  loadGlobalSettings();
  fetch(`api/data.php?round=${currentRound}`)
      .then(res => res.json())
      .then(data => {
        // Create a deep copy of the data to avoid reference issues
        questions = JSON.parse(JSON.stringify(data));
        
        // Shuffle questions array while maintaining question-answer relationships
        for (let i = questions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          // Swap entire question objects including their answers
          [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        
        // Select a random question
        randomIndex = Math.floor(Math.random() * questions.length);
        currentQuestion = questions[randomIndex];
        
        // Initialize revealed answers array
        revealedAnswers = new Array(currentQuestion.answers.length).fill(false);
        
        // Log for debugging
        console.log('Selected question:', currentQuestion.question);
        console.log('Associated answers:', currentQuestion.answers);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
      
  fetch('api/get_user_points.php')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('trophyCount').textContent = data.points;
                }
            })
            .catch(error => console.error('Error loading points:', error));
    

  fetch('api/get_user_data.php')
            .then(response => response.json())
            .then(data => {
                document.getElementById('usernameDisplay').textContent = data.username;
                
                const profilePic = document.getElementById('profilePic');
                profilePic.src = `../../public/assets/images/profiles/${data.profile_image}`;
                profilePic.onerror = function() {
                    this.src = '../../public/assets/images/profiles/default.png';
                };
            })
            .catch(error => console.error('Error fetching user data:', error));
    startButton.addEventListener('click', () => {
        container.style.display = 'flex';
        card.style.display = 'none';      

        // Try to play the audio
        playMusic(audio);
        if (isAudioOn && audio.paused) {
            // If autoplay is blocked, wait for a user interaction
            document.body.addEventListener('click', () => {
                playMusic(audio);
            }, { once: true });
        }
    });

    // Add event listener for final home button
    const finalHomeBtn = document.querySelector('.final_home_btn');
    if (finalHomeBtn) {
        finalHomeBtn.addEventListener('click', () => {
            resetTwoplayer();
            resetFinalRound();
        });
    }

    container.classList.add('fade-in');
    settingBtn.addEventListener('click', () =>{
        setting_cont.style.display = 'flex';
    });
    close.addEventListener('click',() => {
        setting_cont.style.display = 'none';
    } );
    setting_cont.classList.add('fade-in');
    document.getElementById('audioBtn').addEventListener('click', () => {
        setMusicEnabled(!isAudioOn, audio);
    });
    buttons.forEach(button => {
    button.addEventListener('click', () => {
        playSound(clickEffect);
    });
  });
    
    document.getElementById('soundBtn').addEventListener('click', () => {
        setSoundEnabled(!isSoundOn);
    });
    document.getElementById('pauseaudioBtn').addEventListener('click', () => {
      setMusicEnabled(!isAudioOn, answeringRound);
  });
    document.getElementById('pausesoundBtn').addEventListener('click', () => {
      setSoundEnabled(!isSoundOn);
  });
     playbtn.addEventListener('click', () =>{
      container.style.display = 'none';
        choose_cont.style.display = 'flex';
        
    });
    returnBtn.addEventListener('click', () =>{
         container.style.display = 'flex';
         choose_cont.style.display = 'none';
       
    });
    continuebtn.addEventListener('click', () =>{
        if (currentStep < instructions.length - 1) {
            instructions[currentStep].style.display = "none";
            currentStep++;
            instructions[currentStep].style.display = "block";
        } else {
            // Optional: Hide everything or close the instructions
            instruction.style.display = "none";
            startgame();
            audio.pause();
        }

    });
    singlebtn.addEventListener('click', () =>{
        instruction.style.display = 'flex';
        choose_cont.style.display ='none';
        currentStep = 0;
        instructions.forEach((step, index) => {
          step.style.display = index === 0 ? 'block' : 'none';
      });
    });
    
    homebtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      
      container.style.display = 'flex';
      currentStep = 0;
      answeringRound.pause();
      audio.currentTime = 0;
      if (isAudioOn) {
        playMusic(audio); 
      }
      resetgame();
      pausecont.style.display= 'none';
      gameover.pause();
    });
  });
  pausebtn.addEventListener('click',() => {
    pausecont.style.display= 'flex';
    clearInterval(timer);
  });
  resumebtn.addEventListener('click', () =>{
    pausecont.style.display= 'none';
    timer = setInterval(() => {
      timeLeft--; 
      timeDisplay.textContent = `${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        mistakes();
    }
    if (wrongGuesses === maxWrongGuesses) {
        clearInterval(timer);
        return;
    }
    }, 1000);

  });
  nextroundbtn.addEventListener( 'click', () =>{
    answeringRound.currentTime = 0;
    if(isAudioOn){
      playMusic(answeringRound);
    }
    nextRound();
  });
  two_payer.addEventListener('click', () =>{
      choose_cont.style.display = 'none';
      twoplayer_cont.style.display = 'flex';
      twoplayer_cont.classList.add('fade-in');

  });
  twostartbtn.addEventListener('click', () =>{
    twoplayer_instruction.style.display = 'none';
    twoPstargame.style.display = 'flex';

  });
  backTwoPlayerBtn.addEventListener('click', () => {
    twoplayer_cont.style.display = 'none';
    choose_cont.style.display = 'flex';
    twoplayer_instruction.style.display = 'flex';
    twoPstargame.style.display = 'none';
  });
  start_twoplayer.addEventListener('click', () =>{
     player1 = document.getElementById('player1Name').value.trim();
     player2 = document.getElementById('player2Name').value.trim();
   
    if (player1 === "" || player2 === "") {
      alert("Please enter both family names.");
      return;
    }
    else{
      twoPstargame.style.display = 'none';
      twoPlayer(player1, player2);
    }
   

  });
  twoplayerhomebtn.addEventListener('click', () =>{
    resetTwoplayer();
    
  });
  twopnextround.addEventListener('click', ()=>{
    answeringRound.currentTime = 0;
    if(isAudioOn){
      playMusic(answeringRound);
    }
    twoPlayerNextRound();
  });
  finalhomebtn.addEventListener('click', () => {
    resetTwoplayer();
  });
  proceedBtn.addEventListener('click', () => {
    final_round();
  });

});
round.addEventListener('animationend', (e) => {
  undercont.style.display = 'flex';
});
function startgame(){
  
  playMusic(answeringRound);
  start_game.style.display = 'flex';
  round.textContent = `Round ${currentRound}`;
  round.classList.add('fade-out');
  p1.classList.add('fade-in');
  p1.addEventListener('animationend', (e) => {
    if (e.animationName === 'fadeIn') {
      // Step 2: After fade-in ends, wait a moment then fade out
      setTimeout(() => {
        p1.classList.remove('fade-in'); // remove previous animation
        p1.classList.add('fade-out');
      }, 1500); // adjust the delay as needed
    } else if (e.animationName === 'fadeOut') {
      // Step 3: When fade-out is done, hide p1 and show p2
      p1.style.display = 'none';
      p2.classList.add('fade-in'); 
      p2.style.display = 'block';
    }
  });
  p2.addEventListener('animationend', (e) => {
    if (e.animationName === 'fadeIn') {
      p2.classList.remove('fade-in');
      p2.classList.add('fade-out');
    } else if (e.animationName === 'fadeOut') {
      p2.style.display = 'none';
      questionElement.classList.add('fade-in');
      questionElement.style.display = 'block';
      showQuestion(); // ✅ Show question after p2 fades out
    }
  });
  questionElement.addEventListener('animationend', (e) => {
    if (e.animationName === 'fadeIn') {
      startTimer();
      topcont.style.display = 'flex';
      inputanswer.style.display = 'flex';
      pause.style.display ='flex';
      input();
    }
  });
  
 
  
}
function resetgame(){
  currentRound = 1;
  fetch(`api/data.php?round=${currentRound}`)
      .then(res => res.json())
      .then(data => {
        // Create a deep copy of the data to avoid reference issues
        questions = JSON.parse(JSON.stringify(data));
        
        // Shuffle questions array while maintaining question-answer relationships
        for (let i = questions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          // Swap entire question objects including their answers
          [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        
        // Select a random question
        randomIndex = Math.floor(Math.random() * questions.length);
        currentQuestion = questions[randomIndex];
        
        // Initialize revealed answers array
        revealedAnswers = new Array(currentQuestion.answers.length).fill(false);
        
        // Log for debugging
        console.log('Selected question:', currentQuestion.question);
        console.log('Associated answers:', currentQuestion.answers);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  
  wrongGuesses = 0;
  start_game.style.display = 'none';
  // reset back to Round 1
  round.textContent = ''; // clear round text
  round.classList.remove('fade-out'); // remove fade animation
  undercont.style.display = 'none'; 
  
  p1.style.display = 'block';
  p1.classList.remove('fade-in', 'fade-out');
  p1.style.opacity = 0;

  // Reset p2
  p2.style.display = 'none';
  p2.classList.remove('fade-in', 'fade-out');
  p2.style.opacity = 0;

  questionElement.textContent = ''; // Clear the previously shown question
  questionElement.classList.remove('fade-in', 'fade-out'); // Reset animations
  questionElement.style.display = 'none'; 

  
  correctAnswers = 0; 
  points = 0; 
  totalPoints = 0;
  pointsDisplay.textContent = points; 

    currentQuestion.answers.forEach((item, index) => {
    document.querySelector(`.answer${index + 1}`).textContent = ''; 
    document.querySelector(`.points${index + 1}`).textContent = ''; 
  
    const answerContainer = document.querySelector(`.answer_cont${index + 1}`);
    const point_cont = document.querySelector(`.point_cont${index + 1}`);
    answerContainer.style.visibility = "hidden";
    point_cont.style.visibility = "hidden";

    
  });
  showQuestion();
   
  
  topcont.style.display = 'none';
  pause.style.display = 'none';
  inputanswer.style.display = 'none';
  inputanswer.textContent ='';

 

  // Clear all X marks
  for (let i = 1; i <= maxWrongGuesses; i++) {
    const xMark = document.getElementById(`x${i}`);
    if (xMark) {
      xMark.classList.remove('xfill');
      xMark.style.color = "transparent";
    }
  }

  // Hide and clear image container
  xImageContainer.innerHTML = "";
  xImageContainer.style.display = 'none';

  // Reset the timer
  inputanswer.disabled = false;
  clearInterval(timer);
  timeLeft = 10;
  timeDisplay.textContent = `${timeLeft}s`;
  
  questionElement.classList.remove('fade-out');
  goodJob.classList.remove('fade-in');
  goodJob.style.display = 'none';
  end.classList.remove('fade-in', 'fade1-out');
  end.style.display = 'none';
  leftOut.classList.remove('fade-in');
  leftOut.style.display = 'none';
      
  
  correctAnswers = 0;
  points = 0;
  document.querySelector(".round_result_proceed").style.display = "none";
  document.querySelector(".round_result_over").style.display = 'none';
  document.querySelector(".round_result_proceed .sp span").textContent = ''; 
  document.querySelector(".round_result_proceed .tp span").textContent = '';

  document.querySelector('.final_round').style.display = 'none';
  document.querySelector('.points-display').textContent = '';

}
function showQuestion() {
  questionElement.textContent = currentQuestion.question;  
}

function startTimer() {
clearInterval(timer);
timeLeft = 30;
timeDisplay.textContent = `${timeLeft}s`;

timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
        clearInterval(timer);
        mistakes();
    }
    if(wrongGuesses === maxWrongGuesses){
      clearInterval(timer);
      return;
    }
}, 1000);
}
function input(){
  inputanswer.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
 const userAnswer = inputanswer.value.trim().toLowerCase();
 if (userAnswer === "") return;
 let found = false;


  currentQuestion.answers.forEach((item, index) => {
   const answerText = item.text.toLowerCase();
   
   if (
    !revealedAnswers[index] &&
    (userAnswer.length >= 2) && // Minimum 2 characters (or 1 for numbers)
    (
      answerText === userAnswer || 
      answerText.includes(userAnswer) ||
      (parseInt(answerText) === parseInt(userAnswer)) // Compare numbers as integers
    )
  )   {
           revealedAnswers[index] = true;
           correctAnswers++;
           playSound(correctSound);
           setTimeout(() => {
            document.querySelector(`.answer${index + 1}`).textContent = item.text;
            document.querySelector(`.points${index + 1}`).textContent = item.points;
            const answerContainer = document.querySelector(`.answer_cont${index + 1}`);
            const point_cont = document.querySelector(`.point_cont${index + 1}`);
            answerContainer.style.background = "rgb(66, 191, 66)";
            point_cont.style.background = "#c68204";
            answerContainer.style.visibility = "visible";
            point_cont.style.visibility = "visible";
          }, 600);
          pointValue = item.points;
          if (currentRound === 2) {
            pointValue *= 2;
          } else if (currentRound === 3) {
            pointValue *= 3;
          }
          points += pointValue;
          pointsDisplay.textContent = points;
          totalPoints +=pointValue;
          earnedPoints += pointValue;
          if (correctAnswers === maxcorrectAnswers) {
            twopanswerInput.disabled = true;
            clearInterval(timer); 
            setTimeout(() =>{
              questionElement.classList.remove('fade-in');
              questionElement.classList.add('fade-out');
              setTimeout(() =>{
                questionElement.style.display = 'none';
                goodJob.style.display = 'flex';
                goodJob.classList.add('fade-in');
                setTimeout(() =>{
                    document.querySelector(".round_result_proceed").style.display = "flex";
                    document.querySelector(".round_result_proceed .sp span").textContent = points;
                    document.querySelector(".round_result_proceed .tp span").textContent = totalPoints;
                },1500);
              },1500);
            },1500);
        
        }
          found = true;
       
        }
     
 });
   if(!found){
    mistakes();
   }

 inputanswer.value = "";
  if (correctAnswers !== maxcorrectAnswers) {
     startTimer();
  }
  }
  });
   
}   
function mistakes(){
  const wrongSound = new Audio('assets/audio/wrongGuess.mp3');
  playSound(wrongSound);
  if(wrongGuesses <= maxWrongGuesses){
    wrongGuesses++;
    xMark = document.getElementById(`x${wrongGuesses}`);
    if(xMark){
      xMark.classList.add('xfill');
      xMark.style.color = "red";
    }  
     xImageContainer.innerHTML ="";
     for (let i = 0; i < wrongGuesses; i++) {
      img = document.createElement("img");
      img.src = "assets/images/x-png.png";
      img.alt = "X";
      img.style.opacity = "1";
      img.classList.add("fade-in");
      xImageContainer.appendChild(img);
      
  }
      xImageContainer.style.display = "flex";
      inputanswer.disabled = true;

    setTimeout(() => {
      xImageContainer.style.display = "none";
      if (wrongGuesses < maxWrongGuesses) {
        inputanswer.disabled = false;
        inputanswer.focus();
      }
      
    }, 1500);
    
    if(wrongGuesses === maxWrongGuesses){
      goodJob.style.display = 'none';
      goodJob.classList.remove('fade-in');
      answeringRound.pause();
      setTimeout(() =>{
        questionElement.classList.remove('fade-in');
        questionElement.classList.add('fade-out');
      },1500);

      // Remove any existing listeners
      const oldQuestionListener = questionElement.onanimationend;
      const oldEndListener = end.onanimationend;
      const oldLeftOutListener = leftOut.onanimationend;
      
      questionElement.onanimationend = null;
      end.onanimationend = null;
      leftOut.onanimationend = null;

      questionElement.addEventListener('animationend', function questionFadeOut(e) {
        if (e.animationName === 'fadeOut') {
          questionElement.style.display = 'none';
          end.style.display = 'flex';
          end.classList.add('fade-in');
          questionElement.removeEventListener('animationend', questionFadeOut);
        }
      });

      end.addEventListener('animationend', function endFadeIn(e) {
        setTimeout(() => {
          end.classList.remove('fade-in');
          end.classList.add('fade1-out');
          end.style.display = 'none';
          leftOut.classList.add('fade-in');
          leftOut.style.display = 'flex';
          end.removeEventListener('animationend', endFadeIn);
        }, 2500);
      });

      leftOut.addEventListener('animationend', function leftOutFadeIn() {
        const missedAnswers = currentQuestion.answers.filter((_, index) => !revealedAnswers[index]);
      
        missedAnswers.forEach((item, index) => {
          const originalIndex = currentQuestion.answers.findIndex((a) => a.text === item.text);
      
          setTimeout(() => {
            const answerContainer = document.querySelector(`.answer_cont${originalIndex + 1}`);
            const pointContainer = document.querySelector(`.point_cont${originalIndex + 1}`);
      
            document.querySelector(`.answer${originalIndex + 1}`).textContent = item.text;
            document.querySelector(`.points${originalIndex + 1}`).textContent = item.points;
      
            answerContainer.style.background = "#d84f4f";
            pointContainer.style.background = "#d68404";
      
            answerContainer.style.visibility = "visible";
            pointContainer.style.visibility = "visible";
          }, index * 1500);
        });
        const totalDelay = missedAnswers.length * 1500;

        setTimeout(() => {
          if(currentRound === 3){
            document.querySelector('.final_round').style.display = 'flex';
            document.querySelector(".round_result_over").style.display = "none";
            document.querySelector(".round_result_proceed").style.display = "none";
            document.querySelector('.points-display').textContent = totalPoints;
          }
          else{
            if (correctAnswers >= 2) {
              document.querySelector(".round_result_proceed").style.display = "flex";
              document.querySelector(".round_result_proceed .sp span").textContent = points;
              document.querySelector(".round_result_proceed .tp span").textContent = totalPoints;
              savePointsToServer(points);
            }
           
            else {
              document.querySelector(".round_result_over").style.display = "flex";
              gameover.currentTime = 0;
              playMusic(gameover);
            }
          }
        }, totalDelay + 100);
        leftOut.removeEventListener('animationend', leftOutFadeIn);
      });
    }
   
    startTimer();
  }
   
  inputanswer.value = '';
}
round2.addEventListener('animationend', (e) =>{
  setTimeout(() =>{
    round2.classList.remove('fade-in');
    round2.classList.add('fade-out');
  }, 1000);
  setTimeout(() =>{
    if(e.animationName === 'fadeOut'){
      round2.style.display = 'none';
      p1.style.display = 'block';
      p1.classList.add('fade-in');
    }
  }, 1300);
  
 
});
round3.addEventListener('animationend', (e) =>{
  setTimeout(() =>{
    round3.classList.remove('fade-in');
    round3.classList.add('fade-out');
  }, 1000);
  setTimeout(() =>{
    if(e.animationName === 'fadeOut'){
      round3.style.display = 'none';
      p1.style.display = 'block';
      p1.classList.add('fade-in');
    }
  }, 1300);
  
 
});
function nextRound() {
  console.log("Fetching for round:", currentRound);
  if (currentRound >= 3) return;
  currentRound++; 
  
  // First update the round display
  round.textContent = "Round " + (currentRound);
  round.classList.add('fade-in');
  
  // Reset the game state before loading new data
  resetflow();
  
  // Fetch new questions and wait for them to load
  fetch(`api/data.php?round=${currentRound}`)
    .then(res => res.json())
    .then(data => {
      // Create a deep copy of the data to avoid reference issues
      questions = JSON.parse(JSON.stringify(data));
      
      // Shuffle questions array while maintaining question-answer relationships
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap entire question objects including their answers
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }
      
      // Select a random question
      randomIndex = Math.floor(Math.random() * questions.length);
      currentQuestion = questions[randomIndex];
      
      // Initialize revealed answers array
      revealedAnswers = new Array(currentQuestion.answers.length).fill(false);
      
      // Log for debugging
      console.log('Selected question:', currentQuestion.question);
      console.log('Associated answers:', currentQuestion.answers);
      
      // Now that we have the new question data, show the question
      showQuestion();
      
      // Continue with the round transition animations
      setTimeout(() => {
        round.classList.remove('fade-in');
        round.classList.add('fade-out');
      }, 1000);
      
      setTimeout(() => {
        if(currentRound === 2) {
          round2.style.display = 'flex';
          round2.classList.add('fade-in'); 
        }
        else if(currentRound === 3) {
          round3.style.display = 'flex';
          round3.classList.add('fade-in');
        }
      }, 2500);
    });
}

  function resetflow(){
    points = 0;
    pointsDisplay.textContent = points;
    round.classList.remove('fade-out');
    document.querySelector(".round_result_proceed").style.display = "none";
    clearInterval(timer);
    topcont.style.display = 'none';
    undercont.style.display = 'none';
    inputanswer.style.display = 'none';

    p1.style.display = 'none';
    p1.classList.remove('fade-in', 'fade-out');
    p1.style.opacity = 0;
  
    // Reset p2
    p2.style.display = 'none';
    p2.classList.remove('fade-in', 'fade-out');
    p2.style.opacity = 0;
  
    questionElement.textContent = ''; // Clear the previously shown question
    questionElement.classList.remove('fade-in', 'fade-out'); // Reset animations
    questionElement.style.display = 'none'; 
  
    
    correctAnswers = 0; // Reset correct answers count
    currentQuestion.answers.forEach((item, index) => {
      document.querySelector(`.answer${index + 1}`).textContent = ''; // Clear text
      document.querySelector(`.points${index + 1}`).textContent = ''; // Clear points
    
      const answerContainer = document.querySelector(`.answer_cont${index + 1}`);
      const point_cont = document.querySelector(`.point_cont${index + 1}`);
      answerContainer.style.visibility = "hidden";
      point_cont.style.visibility = "hidden";
    });
    showQuestion();
    wrongGuesses = 0;

    // Clear all X marks
    for (let i = 1; i <= maxWrongGuesses; i++) {
      const xMark = document.getElementById(`x${i}`);
      if (xMark) {
        xMark.classList.remove('xfill');
        xMark.style.color = "transparent";
      }
    }
  
    // Hide and clear image container
    xImageContainer.innerHTML = "";
    xImageContainer.style.display = 'none';
  
    // Reset the timer
    
    inputanswer.disabled = false;
    clearInterval(timer);
    timeLeft = 30;
    timeDisplay.textContent = `${timeLeft}s`;
    
    questionElement.classList.remove('fade-out');
    goodJob.classList.remove('fade-in');
    goodJob.style.display = 'none';
    end.classList.remove('fade-in');
    end.style.display = 'none';
    end.style.opacity = 0;
    leftOut.classList.remove('fade-in');
    leftOut.style.display = 'none';
    pause.style.display = 'none';
    correctAnswers = 0;

  }
  function twoPlayer(player1, player2) {
    document.querySelector(".play1").textContent = player1;
    document.querySelector(".play2").textContent = player2;
    document.querySelector(".P1teamName").textContent = player1;
    document.querySelector(".P2teamName").textContent = player2;
    vs_cont.classList.add('vs-show');
    vs_cont.style.display = 'flex';
    
    // Add delay before starting animations
    // setTimeout(() => {
    //     strtplayer1.classList.add('fade-in');
    // }, 500);

    // strtplayer1.addEventListener('animationend', (e) => {
    //     vs.classList.add('flip-animate');
    //     vs.style.opacity = '1';
    // }, {once: true});

    // vs.addEventListener('animationend', (e) => {
    //     strtplayer2.classList.add('fade-in');
    //     strtplayer2.style.opacity = '1';
    // }, {once: true});

    strtplayer2.addEventListener('animationend', (e) => {
        // Add delay before hiding VS container
        setTimeout(() => {
           
            vs_cont.classList.add('fade-out');
            vs_cont.addEventListener('animationend', () => {
                 playMusic(answeringRound);
                vs_cont.style.display = 'none';
                twoplayerctnt.classList.add('fade-in');
                twoplayerctnt.style.display = 'flex';
                twoPround.textContent = `Round ${currentRound}`;
                setTimeout(() => {
                    twoPround.classList.add('fade-out');
                }, 1500);
                stopMusic(audio);
            }, {once: true});
        }, 2000); // Increased delay to 2 seconds
    }, {once: true});

    twoPround.addEventListener('animationend', (e) =>{
      Player1.classList.add('fade-in');
      middcont.classList.add('fade-in');
      Player2.classList.add('fade-in');
  
      Player1.style.display = 'flex';
      middcont.style.display = 'flex';
      Player2.style.display = 'flex';
  });
  middcont.addEventListener('animationend', (e) =>{
    twop1.classList.add('fade-in');
    setTimeout(() => {
      twop1.classList.remove('fade-in');
      twop1.classList.add('fade-out');
  
      twop1.addEventListener('animationend', (e) => {
          twop1.style.display = 'none';
          twop2.classList.add('fade-in'); 
      });
    
    }, 2000); //
});
survequestion.textContent = currentQuestion.question;
  twop2.addEventListener('animationend', (e) =>{
    setTimeout(() => {
     twop2.classList.remove('fade-in');
     twop2.classList.add('fade-out');
     twop2.style.display = 'none';
     survequestion.classList.add('fade-in'); 
     survequestion.addEventListener('animationend', onSurveyQuestionFadeInEnd, { once: true });
    }, 2000); 
  });
  
  }
  function onSurveyQuestionFadeInEnd() {
    setTimeout(() => {
      survequestion.classList.remove('fade-in');
      survequestion.classList.add('fade-out');
      survequestion.style.display = 'none';
      startBuzzCountdown(); 
    }, 2000);
  }
  
  function resetTwoplayer() {
    currentRound = 1;
    fetch(`api/data.php?round=${currentRound}`)
    .then(res => res.json())
    .then(data => {
      // Create a deep copy of the data to avoid reference issues
      questions = JSON.parse(JSON.stringify(data));
      
      // Shuffle questions array while maintaining question-answer relationships
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap entire question objects including their answers
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }
      
      // Select a random question
      randomIndex = Math.floor(Math.random() * questions.length);
      currentQuestion = questions[randomIndex];
      
      // Initialize revealed answers array
      revealedAnswers = new Array(currentQuestion.answers.length).fill(false);
      
      // Log for debugging
      console.log('Selected question:', currentQuestion.question);
      console.log('Associated answers:', currentQuestion.answers);
      
      survequestion.textContent = currentQuestion.question;
    });
    player1 = "";
    player2 = "";
    container.style.display = 'flex';
    twoplayer_cont.style.display = 'none';
    twoplayer_instruction.style.display = 'flex';
    twoPstargame.style.display = 'none';
  
    document.querySelector(".play1").textContent = '';
    document.querySelector(".play2").textContent = '';
    document.getElementById('player1Name').value = '';
    document.getElementById('player2Name').value = '';
  
    // Reset VS container and animations
    vs_cont.classList.remove('vs-show', 'fade-out');
    vs_cont.style.display = 'none';
    vs_cont.style.opacity = '1';
  
    // Reset player containers
    strtplayer1.classList.remove('fade-in');
    strtplayer1.style.opacity = '0';
    strtplayer2.classList.remove('fade-in');
    strtplayer2.style.opacity = '0';
  
    // Reset VS image
    vs.classList.remove('flip-animate');
    vs.style.opacity = '0';
  
    // Remove round display and reset styles
    twoplayerctnt.style.display = 'none';
    twoplayerctnt.classList.remove('fade-in');
    twoPround.classList.remove('fade-out');
    twoPround.textContent = '';
  
    // Reset player screens
    Player1.classList.remove('fade-in');
    Player2.classList.remove('fade-in');
    Player1.style.opacity = '0';
    Player2.style.opacity = '0';
  
    // Reset middle container
    middcont.classList.remove('fade-in');
    middcont.style.opacity = '0';
    survequestion.textContent = '';
   

    // Reset screen messages
    twop1.classList.remove('fade-in', 'fade-out');
    twop2.classList.remove('fade-in','fade-out');
    survequestion.classList.remove('fade-in','fade-out');
    twop1.style.display = '';
    twop2.style.display = '';
    survequestion.style.display = '';
    player1RoundPoints = 0;
    player2RoundPoints = 0;
    player1totalpoints = 0;
    player2Totalpoints = 0;
    let count = 3;
    buzzedPlayer = "";
    stealingPlayer = "";
    correctAnswers = 0;
    p1WrongGuesses = 0;
    p2WrongGuesses = 0;
    wrongGuesses = 0;
    stealMode = false;
    roundPoints = 0;
    countdownEl.textContent = count;
    countdownEl.style.display = 'flex';
    countdownEl.classList.remove('fade-in', 'fade-out');
    p1keyDisplay.style.display = 'none';
    p1keyDisplay.classList.remove('fade-in', 'fade-out');
    p2keyDisplay.style.display = 'none';
    p2keyDisplay.classList.remove('fade-in', 'fade-out');

    const whoBuzzed = document.querySelector('.whoBuzzed');
    whoBuzzed.textContent = '';
    whoBuzzed.classList.remove('fade-in', 'fade-out');
    whoBuzzed.style.display = 'none';
    p1wrong.style.display ='none';
    p1wrong.classList.remove('fade-in');
    p2wrong.style.display ='none';
    p2wrong.classList.remove('fade-in');

    currentQuestion.answers.forEach((item, index) => {
      document.querySelector(`.middlecont .answer${index + 1}`).textContent = '';
      document.querySelector(`.middlecont .points${index + 1}`).textContent = '';

      const answerContainer = document.querySelector(`.middlecont .answer_cont${index + 1}`);
      const point_cont = document.querySelector(`.middlecont .point_cont${index + 1}`);
      answerContainer.style.visibility = "hidden";
      point_cont.style.visibility = "hidden";
    });
    
    let p1scoreEl = document.getElementById("P1points");
    let p2scoreEl = document.getElementById("p2points");
    p1scoreEl.textContent = "0"; 
    p2scoreEl.textContent = "0";

    for (let i = 1; i <= maxWrongGuesses; i++) {
      const p1x = document.getElementById(`p1x${i}`);
      const p2x = document.getElementById(`p2x${i}`);
      if (p1x) {
        p1x.classList.remove('xfill');
        p1x.style.color = "transparent";
      }
      if (p2x) {
        p2x.classList.remove('xfill');
        p2x.style.color = "transparent";
      }
    }
  
    // Reset X image container
    xImageContainer.innerHTML = "";
    xImageContainer.style.display = 'none';

    // Reset input
    twopanswerInput.value = "";
    twopanswerInput.style.display = 'none';
    twopanswerInput.disabled = false;
    twopanswerInput.focus();
    // Clear any displayed messages
    showwmessage.textContent = '';
    showwmessage.classList.remove('fade-in', 'fade-out');
    showwmessage.style.display = 'none';

    twoProundResult.classList.remove('fade-in');
    twoProundResult.style.display = 'none';

    // Reset winner message
    winnerText.textContent = "";
    winnerMessage.style.display = 'none';
    
    proceedBtn.style.display = 'none';
    
   
    
    audio.currentTime = 0;
    playMusic(audio);
  }
  
  function startBuzzCountdown() {
     player1 = document.getElementById('player1Name').value.trim();
     player2 = document.getElementById('player2Name').value.trim();
    
    countdownEl.classList.add('fade-in');
    const whoBuzzedEl = document.querySelector('.whoBuzzed');
    whoBuzzedEl.classList.add('fade-in');

    let count = 3;
    let buzzerActive = false;
    countdownEl.textContent = count;
    p1keyDisplay.classList.add('fade-in');
    p1keyDisplay.style.display = 'flex';
    p2keyDisplay.classList.add('fade-in');
    p2keyDisplay.style.display = 'flex';
    const countdownInterval = setInterval(() => {
        
        count--;
        if (count > 0) {
            countdownEl.textContent = count;
        } else if (count === 0) {
            countdownEl.textContent = "Buzz now!";
            
        } else {
            clearInterval(countdownInterval);
            countdownEl.style.display = 'none';
            buzzerActive = true;
            
            document.addEventListener('keydown', onBuzz);
        }
    }, 1000);

  
    function onBuzz(e) {
        if (!buzzerActive) return;

        if (e.key.toLowerCase() === 'd') {
            buzzedPlayer = player1
            
        } else if (e.key.toLowerCase() === 'l') {
          buzzedPlayer = player2;
         
        } else {
            return;
        }
        const buzzSound = new Audio('assets/audio/wrongGuess.mp3');
        playSound(buzzSound);
        whoBuzzedEl.textContent = `${buzzedPlayer} buzzed first!`;
        whoBuzzedEl.style.display = 'block';
        buzzerActive = false;

        

        document.removeEventListener('keydown', onBuzz);
        setTimeout(() => {
          whoBuzzedEl.classList.remove('fade-in');
          whoBuzzedEl.classList.add('fade-out');
          p1keyDisplay.classList.add('fade-out');
          p2keyDisplay.classList.add('fade-out');
          p1keyDisplay.style.display = 'none';
          p2keyDisplay.style.display = 'none';
  
          setTimeout(() => {
              whoBuzzedEl.classList.remove('fade-out');
              whoBuzzedEl.classList.add('fade-in');
              whoBuzzedEl.textContent = `${buzzedPlayer} will get to answer this round first`;
             
              setTimeout(() => {
                whoBuzzedEl.style.display = 'none';
                survequestion.style.display = 'block';
                survequestion.classList.add('fade-in');
                twopanswerInput.style.display = 'flex';
                if(buzzedPlayer === player1){
                  p1wrong.classList.add('fade-in');
                  p1wrong.style.display = 'inline-flex';
                }else if(buzzedPlayer === player2){
                   p2wrong.style.display ='inline-flex';
                   p2wrong.classList.add('fade-in');
                }
                twopanswerInput.focus();
                TwoPinput();
            }, 2000);
          }, 1000); 
      }, 2000);
    }
}
function TwoPinput() {
   player1 = document.getElementById('player1Name').value.trim();
   player2 = document.getElementById('player2Name').value.trim();
  twopanswerInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const userAnswer = twopanswerInput.value.trim().toLowerCase();
      if (userAnswer === "") return;
      let found = false;

      currentQuestion.answers.forEach((item, index) => {
        const answerText = item.text.toLowerCase();

        if (
          !revealedAnswers[index] &&
          (userAnswer.length >= 2) && 
          (
            answerText === userAnswer || 
            answerText.includes(userAnswer) ||
            (parseInt(answerText) === parseInt(userAnswer)) 
          )
        )    {
          revealedAnswers[index] = true;
          correctAnswers++;
          playSound(correctSound);
          setTimeout(() => {
          document.querySelector(`.middlecont .answer${index + 1}`).textContent = item.text;
          document.querySelector(`.middlecont .points${index + 1}`).textContent = item.points;
          const answerContainer = document.querySelector(`.middlecont .answer_cont${index + 1}`);
          const point_cont = document.querySelector(`.middlecont .point_cont${index + 1}`);
          answerContainer.style.background = "rgb(66, 191, 66)";
          point_cont.style.background = "#c68204";
          answerContainer.style.visibility = "visible";
          point_cont.style.visibility = "visible";
          }, 600);
          // Calculate score
          let pointValue = item.points;
          if (currentRound === 2) {
            pointValue *= 2;
          } else if (currentRound === 3) {
            pointValue *= 3;
          }
          if (stealMode) {
            let p1scoreEl = document.getElementById("P1points");
            let p2scoreEl = document.getElementById("p2points");
            let p1score = parseInt(p1scoreEl.textContent) || 0;
            let p2score = parseInt(p2scoreEl.textContent) || 0;
          
            if (buzzedPlayer === player1) {
              // Player 2 steals Player 1's ROUND points
              const stealAmount = player1RoundPoints;
              player1totalpoints = Math.max(player1totalpoints - stealAmount, 0);
              player2Totalpoints += stealAmount;
              p1scoreEl.textContent = player1totalpoints;
              p2scoreEl.textContent = player2Totalpoints;
            } else if (buzzedPlayer === player2) {
              // Player 1 steals Player 2's ROUND points
              const stealAmount = player2RoundPoints;
              player2Totalpoints = Math.max(player2Totalpoints - stealAmount, 0);
              player1totalpoints += stealAmount;

              p2scoreEl.textContent = player2Totalpoints;
              p1scoreEl.textContent = player1totalpoints;
            }
          
            setTimeout(() => {
              twopanswerInput.disabled = true;
              survequestion.classList.remove('fade-in');
              survequestion.style.display = 'none';
              showwmessage.textContent = `${buzzedPlayer}'s points have been stolen by ${stealingPlayer}!`;
              showwmessage.style.display = "block";
              showwmessage.classList.add("fade-in");
            
              setTimeout(() => {
                showwmessage.classList.remove("fade-in");
                showwmessage.classList.add("fade-out");
                setTimeout(() => {
                  showwmessage.classList.add("fade-in");
                  showwmessage.classList.remove("fade-out");
                  showwmessage.textContent = 'This round is Over';
                  setTimeout(()=>{
                    twoplayerctnt.style.display = 'none';
                    if (currentRound === 3) {
                      // Show winner message after round 3 ends
                      
                      
                      if (player1totalpoints === player2Totalpoints) {
                        winnerText.textContent = "It's a tie! Game Over";
                        proceedBtn.style.display = 'none';
                      } else {
                        let winner = player1totalpoints > player2Totalpoints ? player1 : player2;
                        winnerText.textContent = `Winner: ${winner} with ${Math.max(player1totalpoints, player2Totalpoints)} points!`;
                        proceedBtn.style.display = 'block';
                      }
                      winnerMessage.style.display = 'block';
                    } else {
                      twoProundResult.classList.add('fade-in');
                      twoProundResult.style.display = 'flex';
                      // Update team scores in round result
                      const teamScores = document.querySelectorAll('.team_score');
                      teamScores[0].textContent = `${player1}: ${player1totalpoints}`;
                      teamScores[1].textContent = `${player2}: ${player2Totalpoints}`;
                    }
                  },2500);
                }, 2500);
              }, 2500);
            }, 2500);
            player1RoundPoints = 0;
            player2RoundPoints = 0;
            roundPoints = 0;
            stealMode = false;
          } else {
            if (buzzedPlayer === player1) {
              player1totalpoints  += pointValue;
              let p1scoreEl = document.getElementById("P1points");
              let currentScore = parseInt(p1scoreEl.textContent) || 0;
              p1scoreEl.textContent = player1totalpoints;
            
              // Track this round's points for Player 1
              player1RoundPoints += pointValue;
            } else if (buzzedPlayer === player2) {
              player2Totalpoints  += pointValue;
              let p2scoreEl = document.getElementById("p2points");
              let currentScore = parseInt(p2scoreEl.textContent) || 0;
              p2scoreEl.textContent = player2Totalpoints;
            
              // Track this round's points for Player 2
              player2RoundPoints += pointValue;
            }
            
            roundPoints += pointValue;
          }
          if (correctAnswers === maxcorrectAnswers) {
            twopanswerInput.disabled = true;
            setTimeout(()=>{
              survequestion.classList.remove('fade-in');
              survequestion.style.display = 'none';
              showwmessage.textContent = `Wow! ${buzzedPlayer} Good job on gueesing it all. Keep it up!`;
              showwmessage.style.display = "block";
              showwmessage.classList.add("fade-in");
              setTimeout(() => {
                showwmessage.classList.remove("fade-in");
                showwmessage.classList.add("fade-out");
                setTimeout(() => {
                  showwmessage.classList.add("fade-in");
                  showwmessage.classList.remove("fade-out");
                  showwmessage.textContent = 'This round is Over';
                  setTimeout(()=>{
                    twoplayerctnt.style.display = 'none';
                    if (currentRound === 3) {
                      // Show winner message after round 3 ends
                      
                      if (player1totalpoints === player2Totalpoints) {
                        winnerText.textContent = "It's a tie! Game Over";
                        proceedBtn.style.display = 'none';
                      } else {
                        let winner = player1totalpoints > player2Totalpoints ? player1 : player2;
                        winnerText.textContent = `Winner: ${winner} with ${Math.max(player1totalpoints, player2Totalpoints)} points!`;
                        proceedBtn.style.display = 'block';
                      }
                      winnerMessage.style.display = 'block';


                      // Add event listener for proceed button
                     
                    } else {
                      twoProundResult.classList.add('fade-in');
                      twoProundResult.style.display = 'flex';
                      // Update team scores in round result
                      const teamScores = document.querySelectorAll('.team_score');
                      teamScores[0].textContent = `${player1}: ${player1totalpoints}`;
                      teamScores[1].textContent = `${player2}: ${player2Totalpoints}`;
                    }
                  },2500);
                }, 2500);
              }, 2500);
            },2500);
          }

          found = true;
        }
      });

      if (!found) {
          twoPmistakes(player1, player2); 
      }
      twopanswerInput.value = "";
    }
  });
}
function twoPmistakes(player1, player2) {
  if (buzzedPlayer === player1) {
    
    p1WrongGuesses++;
    wrongGuesses++;
    const wrongSound = new Audio('assets/audio/wrongGuess.mp3');
    playSound(wrongSound);
    if (p1WrongGuesses <= maxWrongGuesses) {
      const xMark = document.getElementById(`p1x${p1WrongGuesses}`);
      if (xMark) {
        xMark.classList.add('xfill');
        xMark.style.color = "red";
      }
    }
    if(p1WrongGuesses === maxWrongGuesses){
      answeringRound.pause();
      stealingPlayer = player2;
      setTimeout(() => {
        survequestion.classList.remove('fade-in');
        survequestion.style.display = 'none';
        showwmessage.style.display = 'block';
        showwmessage.classList.add('fade-in');
        showwmessage.textContent = `${player1} reached 3 mistakes! ${stealingPlayer}, you have a chance to steal!`;
        
        stealMode = true;
        setTimeout(() => {
          showwmessage.classList.remove('fade-in');
          showwmessage.style.display = 'none';
          survequestion.style.display = 'block';
          survequestion.classList.add('fade-in');
          twopanswerInput.disabled = false;
          twopanswerInput.focus();
        }, 2000);
      }, 2000);
    }
  } else if (buzzedPlayer === player2) {
    
    p2WrongGuesses++;
    wrongGuesses++;
    const wrongSound = new Audio('assets/audio/wrongGuess.mp3');
    playSound(wrongSound);
    if (p2WrongGuesses <= maxWrongGuesses) {
      const xMark = document.getElementById(`p2x${p2WrongGuesses}`);
      if (xMark) {
        xMark.classList.add('xfill');
        xMark.style.color = "red";
      }
    }
    if(p2WrongGuesses === maxWrongGuesses){
      answeringRound.pause();
      stealingPlayer = player1;
      setTimeout(() => {
        survequestion.classList.remove('fade-in');
        survequestion.style.display = 'none';
        showwmessage.style.display = 'block';
        showwmessage.classList.add('fade-in');
        showwmessage.textContent = `${player2} reached 3 mistakes! ${stealingPlayer}, you have a chance to steal!`;
        stealMode = true;
        setTimeout(() => {
          showwmessage.classList.remove('fade-in');
          showwmessage.style.display = 'none';
          survequestion.style.display = 'block';
          survequestion.classList.add('fade-in');
          twopanswerInput.disabled = false;
          twopanswerInput.focus();
        }, 2000);
      }, 2000);
    }
  }
  if (stealMode) {
    xImageContainer.innerHTML = "";
    const img = document.createElement("img");
    img.src = "assets/images/x-png.png";
    img.alt = "X";
    img.style.opacity = "1";
    img.classList.add("fade-in");
    xImageContainer.appendChild(img);
    xImageContainer.style.display = "flex";
     setTimeout(() => {
      xImageContainer.style.display = "none";
     }, 1500);
     setTimeout(() => {
      survequestion.classList.remove('fade-in');
      survequestion.style.display = 'none';
      showwmessage.textContent = `${stealingPlayer} failed to steal!${buzzedPlayer} can keep the round score.`;
      showwmessage.style.display = "block";
      showwmessage.classList.add("fade-in");
    
      setTimeout(() => {
        showwmessage.classList.remove("fade-in");
        showwmessage.classList.add("fade-out");
        setTimeout(() => {
          showwmessage.classList.add("fade-in");
          showwmessage.classList.remove("fade-out");
          showwmessage.textContent = 'This round is Over';
          setTimeout(()=>{
            twoplayerctnt.style.display = 'none';
            if (currentRound === 3) {
              // Show winner message after round 3 ends
          
              
              if (player1totalpoints === player2Totalpoints) {
                winnerText.textContent = "It's a tie! Game Over";
                proceedBtn.style.display = 'none';
              } else {
                let winner = player1totalpoints > player2Totalpoints ? player1 : player2;
                winnerText.textContent = `Winner: ${winner} with ${Math.max(player1totalpoints, player2Totalpoints)} points!`;
                proceedBtn.style.display = 'block';
              }
              winnerMessage.style.display = 'block';

            } else {
              twoProundResult.classList.add('fade-in');
              twoProundResult.style.display = 'flex';
              // Update team scores in round result
              const teamScores = document.querySelectorAll('.team_score');
              teamScores[0].textContent = `${player1}: ${player1totalpoints}`;
              teamScores[1].textContent = `${player2}: ${player2Totalpoints}`;
            }
          },2500);
        }, 2500);
      }, 2500);
    }, 2500);
    stealMode = false;
    roundPoints = 0;
    twopanswerInput.disabled = true;
    return;
  }else{
    twopanswerInput.disabled = true;
    setTimeout(() => {
      xImageContainer.innerHTML = "";
      for (let i = 0; i < wrongGuesses; i++) {
        const img = document.createElement("img");
        img.src = "assets/images/x-png.png";
        img.alt = "X";
        img.style.opacity = "1";
        img.classList.add("fade-in");
        xImageContainer.appendChild(img);
      }
      xImageContainer.style.display = "flex";
    
    }, 300); 

  }
   
    setTimeout(() => {
      xImageContainer.style.display = "none";
      if (wrongGuesses < maxWrongGuesses) {
        twopanswerInput.disabled = false;
        twopanswerInput.focus();
      }
      
    }, 1500);
}
 function twoPlayerNextRound(){
   currentRound++;
   twoPResetround();
   twoPround.textContent = `Round ${currentRound}`;
   setTimeout(() => {
       twoPround.classList.add('fade-out');
       setTimeout(() => {
           if (currentRound === 2) {
               twop1.textContent = 'Points in this round is doubled'; 
           } else if (currentRound === 3) {
               twop1.textContent = 'Points in this round is trippled';
           }
       }, 2500);
   }, 1500);
}
function twoPResetround(){
  survequestion.addEventListener('animationend', onSurveyQuestionFadeInEnd, { once: true });
  twoProundResult.classList.remove('fade-in');
  twoProundResult.style.display = 'none';
  twoplayerctnt.classList.add('fade-in');
  twoplayerctnt.style.display = 'flex';
  player1RoundPoints = 0;
  player2RoundPoints = 0;
  buzzedPlayer = "";
  stealingPlayer = "";
  
  twoPround.classList.remove('fade-out');
  twoPround.textContent = '';

  // Reset player screens
  Player1.classList.remove('fade-in');
  Player2.classList.remove('fade-in');
  Player1.style.opacity = '0';
  Player2.style.opacity = '0';

  // Reset middle container
  middcont.classList.remove('fade-in');
  middcont.style.opacity = '0';
  survequestion.textContent = '';
  fetch(`api/data.php?round=${currentRound}`)
  .then(res => res.json())
  .then(data => {
    // Create a deep copy of the data to avoid reference issues
    questions = JSON.parse(JSON.stringify(data));
    
    // Shuffle questions array while maintaining question-answer relationships
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap entire question objects including their answers
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    
    // Select a random question
    randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];
    
    // Initialize revealed answers array
    revealedAnswers = new Array(currentQuestion.answers.length).fill(false);
    
    // Log for debugging
    console.log('Selected question:', currentQuestion.question);
    console.log('Associated answers:', currentQuestion.answers);
    
    survequestion.textContent = currentQuestion.question;
  });

  // Reset screen messages
  twop1.classList.remove('fade-in', 'fade-out');
  twop2.classList.remove('fade-in','fade-out');
  survequestion.classList.remove('fade-in','fade-out');
  twop1.style.display = '';
  twop2.style.display = '';
  survequestion.style.display = '';
  
  let count = 3;
  correctAnswers = 0;
  p1WrongGuesses = 0;
  p2WrongGuesses = 0;
  wrongGuesses = 0;
  stealMode = false;
  roundPoints = 0;
  countdownEl.textContent = count;
  countdownEl.style.display = 'flex';
  countdownEl.classList.remove('fade-in', 'fade-out');
  p1keyDisplay.style.display = 'none';
  p1keyDisplay.classList.remove('fade-in', 'fade-out');
  p2keyDisplay.style.display = 'none';
  p2keyDisplay.classList.remove('fade-in', 'fade-out');

  const whoBuzzed = document.querySelector('.whoBuzzed');
  whoBuzzed.textContent = '';
  whoBuzzed.classList.remove('fade-in', 'fade-out');
  whoBuzzed.style.display = 'none';
  p1wrong.style.display ='none';
  p1wrong.classList.remove('fade-in');
  p2wrong.style.display ='none';
  p2wrong.classList.remove('fade-in');


  currentQuestion.answers.forEach((_, index) => {
    document.querySelector(`.middlecont .answer${index + 1}`).textContent = '';
    document.querySelector(`.middlecont .points${index + 1}`).textContent = '';

    const answerContainer = document.querySelector(`.middlecont .answer_cont${index + 1}`);
    const point_cont = document.querySelector(`.middlecont .point_cont${index + 1}`);
    answerContainer.style.visibility = "hidden";
    point_cont.style.visibility = "hidden";
  });
  

  for (let i = 1; i <= maxWrongGuesses; i++) {
    const p1x = document.getElementById(`p1x${i}`);
    const p2x = document.getElementById(`p2x${i}`);
    if (p1x) {
      p1x.classList.remove('xfill');
      p1x.style.color = "transparent";
    }
    if (p2x) {
      p2x.classList.remove('xfill');
      p2x.style.color = "transparent";
    }
  }


  // Reset X image container
  xImageContainer.innerHTML = "";
  xImageContainer.style.display = 'none';

  // Reset input
  twopanswerInput.value = "";
  twopanswerInput.style.display = 'none';
  twopanswerInput.disabled = false;
  twopanswerInput.focus();
  // Clear any displayed messages
  showwmessage.textContent = '';
  showwmessage.classList.remove('fade-in', 'fade-out');
  showwmessage.style.display = 'none';

  twoProundResult.classList.remove('fade-in');
  twoProundResult.style.display = 'none';

}
function final_round() {
  answeringRound.currentTime = 0;
  playMusic(answeringRound);
  let winner = player1totalpoints > player2Totalpoints ? player1 : player2;
  player1totalpoints = 0;
  player2Totalpoints = 0;
  winnerMessage.style.display = 'none';
  finalround_cont.style.display = 'flex';
  finalround_cont.classList.add('fade-in');

  // Get all the message elements
  const congratsMessage = document.querySelector('.congrats_message');
  const pointsGoal = document.querySelector('.points_goal');
  const goodluckMessage = document.querySelector('.goodluck_message');
  const finalP1 = document.querySelector('.final_p1');
  const finalP2 = document.querySelector('.final_p2');
  const finalQuestion = document.querySelector('.final_question');
  const finalAnswerInput = document.querySelector('.final_answerInput');
  
  let totalPoints = 0;
  let userAnswers = [];
  let timeLeft = 30;
  let timerInterval;
  let currentQuestionIndex = 0;
  let allQuestions = [];

  // Function to update timer display
  function updateTimer() {
    finalRoundTimer.textContent = `${timeLeft}s`;
  }

  // Function to start timer
  function startTimer() {
    timeLeft = 30;
    updateTimer();
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        finalAnswerInput.disabled = true;
        // Time's up, reveal points
        setTimeout(() => {
          revealPoints();
        }, 1000);
      }
    }, 1000);
  }

  // Function to show next question
  function showNextQuestion() {
    if (currentQuestionIndex >= allQuestions.length) {
      // All questions completed
      clearInterval(timerInterval);
      revealPoints();
      return;
    }

    const question = allQuestions[currentQuestionIndex];
    finalQuestion.textContent = question.question;
    finalQuestion.style.display = 'block';
    finalQuestion.classList.add('fade-in');
    finalAnswerInput.style.display = 'block';
    finalAnswerInput.disabled = false;
    finalAnswerInput.value = '';
    finalAnswerInput.focus();
  }

  // Fetch final round questions
  fetch('api/data.php?round=final')
    .then(res => res.json())
    .then(data => {
      // Randomize questions before selecting 5
      allQuestions = data
        .sort(() => Math.random() - 0.5) // Randomize array
        .slice(0, 5); // Take first 5 questions
      
      // Display initial messages
      congratsMessage.style.display = 'block';
      congratsMessage.classList.add('fade-in');
      
      setTimeout(() => {
        congratsMessage.classList.remove('fade-in');
        congratsMessage.style.display = 'none';
        pointsGoal.style.display = 'block';
        pointsGoal.classList.add('fade-in');
      }, 2500);

      setTimeout(() => {
        pointsGoal.classList.remove('fade-in');
        pointsGoal.style.display = 'none';
        goodluckMessage.style.display = 'block';
        goodluckMessage.classList.add('fade-in');
      }, 5000);

      setTimeout(() => {
        goodluckMessage.classList.remove('fade-in');
        goodluckMessage.style.display = 'none';
        finalP1.style.display = 'block';
        finalP1.classList.add('fade-in');
      }, 7500);

      setTimeout(() => {
        finalP1.classList.remove('fade-in');
        finalP1.style.display = 'none';
        finalP2.style.display = 'block';
        finalP2.classList.add('fade-in');
      }, 10000);

      setTimeout(() => {
        finalP2.classList.remove('fade-in');
        finalP2.style.display = 'none';
        startFastMoney();
      }, 12500);
    });

  document.querySelector('.winner_name').textContent = winner;
  document.getElementById('winnerPoints').textContent = Math.max(player1totalpoints, player2Totalpoints);

  function startFastMoney() {
    // Clear all previous answers and points
    for (let i = 1; i <= 5; i++) {
      const answerElement = document.querySelector(`.final_answer${i}`);
      const pointsElement = document.querySelector(`.final_points${i}`);
      const container = document.querySelector(`.final_cont${i}`);
      
      if (answerElement) answerElement.textContent = '';
      if (pointsElement) pointsElement.textContent = '';
      if (container) container.classList.remove('fade-in');
    }

    // Reset state
    currentQuestionIndex = 0;
    userAnswers = new Array(5).fill(null);
    
    // Start with first question and start the timer
    showNextQuestion();
    startTimer();
  }

  // Set up the answer input handler
  finalAnswerInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const userAnswer = this.value.trim();
      
      if (userAnswer === '') return; // Don't proceed if answer is empty
      
      // Store the answer
      userAnswers[currentQuestionIndex] = {
        question: allQuestions[currentQuestionIndex].question,
        answer: userAnswer
      };

      // Show the answer in the corresponding container
      const answerElement = document.querySelector(`.final_answer${currentQuestionIndex + 1}`);
      if (answerElement) {
        answerElement.textContent = userAnswer;
      }

      // Clear input and move to next question
      this.value = '';
      currentQuestionIndex++;
      
      // Add a small delay before showing next question
      setTimeout(() => {
        if (currentQuestionIndex < allQuestions.length) {
          showNextQuestion();
        } else {
          clearInterval(timerInterval);
          revealPoints();
        }
      }, 500);
    }
  });

  function revealPoints() {
    answeringRound.pause();
    finalQuestion.style.display = 'none';
    finalAnswerInput.style.display = 'none';
    totalPoints = 0;

    // Hide all messages initially
    lastMessage1.style.display = 'none';
    lastMessage2.style.display = 'none';
    lastMessage3.style.display = 'none';

    // Show messages in sequence
    setTimeout(() => {
      lastMessage1.style.display = 'block';
      lastMessage1.classList.add('fade-in');
    }, 500);

    setTimeout(() => {
      lastMessage1.classList.remove('fade-in');
      lastMessage1.style.display = 'none';
      lastMessage2.style.display = 'block';
      lastMessage2.classList.add('fade-in');
    }, 3000);

    setTimeout(() => {
      lastMessage2.classList.remove('fade-in');
      lastMessage2.style.display = 'none';
      lastMessage3.style.display = 'block';
      lastMessage3.classList.add('fade-in');
    }, 5500);

    // Start revealing points after all messages are shown
    setTimeout(() => {
      // Function to reveal points one by one
      function revealNextPoint(index) {
        if (index >= userAnswers.length) {
          // All points revealed, show final score
          setTimeout(() => {
            finalScore.querySelector('h2').textContent = `Final Score: ${totalPoints} points`;
            finalScore.querySelector('p').textContent = totalPoints >= 200 ? 'Congratulations! You won!' : 'Better luck next time!';
            finalScore.style.display = 'block';
            finalScore.classList.add('fade-in');
          }, 1000);
          return;
        }

        const userAnswer = userAnswers[index];
        if (!userAnswer) {
          // If no answer was provided for this question, show 0 points
          const pointsElement = document.querySelector(`.final_points${index + 1}`);
          const container = document.querySelector(`.final_cont${index + 1}`);
          if (pointsElement && container) {
            pointsElement.textContent = '0';
            container.classList.add('fade-in');
          }
          setTimeout(() => revealNextPoint(index + 1), 2000);
          return;
        }

        const question = allQuestions[index];
        let points = 0;
        let correctAnswer = '';

        // Check against all possible answers
        question.answers.forEach(answer => {
          if (answer.text.toLowerCase().trim() === userAnswer.answer.toLowerCase().trim()) {
            points = answer.points;
            correctAnswer = answer.text;
          }
        });

        // Update display with points
        const pointsElement = document.querySelector(`.final_points${index + 1}`);
        const answerElement = document.querySelector(`.final_answer${index + 1}`);
        const container = document.querySelector(`.final_cont${index + 1}`);

        if (pointsElement && answerElement && container) {
          // If answer was correct, show points and play sound
          if (points > 0) {
            pointsElement.textContent = points;
            answerElement.textContent = correctAnswer;
            container.classList.add('fade-in');
            const correctSound = new Audio('assets/audio/corectanswer.mp3');
            playSound(correctSound);
          } else {
            // If answer was wrong, show 0 points
            pointsElement.textContent = '0';
            container.classList.add('fade-in');
            const wrongSound = new Audio('assets/audio/wrongGuess.mp3');
            playSound(wrongSound);
          }
        }

        totalPoints += points;
        document.getElementById('winnerPoints').textContent = totalPoints;

        // Wait 2 seconds before revealing next point
        setTimeout(() => {
          revealNextPoint(index + 1);
        }, 2000);
      }

      // Start revealing points from the first question
      revealNextPoint(0);
    }, 7500);
  }
}
function resetFinalRound() {
  if (timerInterval) {
    clearInterval(timerInterval);  // Clear the timer if it exists
    timerInterval = null;  // Nullify the interval to prevent accidental reuse
  }

  timeoutIds.forEach(clearTimeout); // Clear all timeouts
  timeoutIds = [];

  // Reset state variables
  totalPoints = 0;
  timeLeft = 30;
  currentQuestionIndex = 0;
  userAnswers = [];
  allQuestions = [];

  finalround_cont.style.display = 'none';
  finalround_cont.classList.remove('fade-in');

  // Clear final score display
  finalScore.querySelector('h2').textContent = '';
  finalScore.querySelector('p').textContent = '';
  finalScore.style.display = 'none';
  finalScore.classList.remove('fade-in');

  // Hide elements
  const elementsToHide = [
    '.congrats_message',
    '.points_goal',
    '.goodluck_message',
    '.final_p1',
    '.final_p2',
    '.final_question',
    '.final_answerInput',
    '.last_message1',
    '.last_message2',
    '.last_message3',
    '.final_score'
  ];

  elementsToHide.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.display = 'none';
      el.classList.remove('fade-in');
    }
  });

  // Reset answer containers and their content
  for (let i = 1; i <= 5; i++) {
    const answerElement = document.querySelector(`.final_answer${i}`);
    const pointsElement = document.querySelector(`.final_points${i}`);
  
    
    if (answerElement) {
      answerElement.textContent = '';
    }
    if (pointsElement) {
      pointsElement.textContent = '';
    }
  }

  // Reset timer display
  finalRoundTimer.textContent = '30s';

  // Reset winner display
  const winnerName = document.querySelector('.winner_name');
  const winnerPoints = document.getElementById('winnerPoints');
  if (winnerName) winnerName.textContent = '';
  if (winnerPoints) winnerPoints.textContent = '0';

  // Reset input
  const finalAnswerInput = document.querySelector('.final_answerInput');
  if (finalAnswerInput) {
    finalAnswerInput.value = '';
    finalAnswerInput.disabled = false;
    // Remove previous event listener
    if (answerHandler) {
      finalAnswerInput.removeEventListener('keydown', answerHandler);
    }
  }

  // Reset containers
  const surveyContainer = document.querySelector('.twoPfinal_round .survey_container');
  const timerContainer = document.querySelector('.twoPfinal_round .timer_container');
  if (surveyContainer) {
    surveyContainer.style.display = 'flex';
    surveyContainer.style.visibility = 'visible';
  }
  if (timerContainer) {
    timerContainer.style.display = 'flex';
    timerContainer.style.visibility = 'visible';
  }

  // Reset all animations
  const allElements = document.querySelectorAll('.twoPfinal_round *');
  allElements.forEach(el => {
    el.classList.remove('fade-in', 'fade-out');
  });
}

function savePointsToServer(points) {
  const formData = new FormData();
  formData.append('earned_points', points);

  fetch('api/save_points.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          console.log('Points saved successfully');
      } else {
          console.error('Error saving points:', data.message);
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

// Leaderboard functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menubtn');
    const menuCont = document.querySelector('.menucont');
    const leaderboardBtn = document.querySelector('.leaderboardBtn');
    const leaderboardCont = document.querySelector('.leaderboardcont');
    const closeLeaderboard = document.querySelector('.x_button');
    const exitBtn = document.querySelector('.exit');

    function escapeHtml(value) {
        const div = document.createElement('div');
        div.textContent = value ?? '';
        return div.innerHTML;
    }

    if (exitBtn) {
        exitBtn.addEventListener('click', () => {
            window.location.href = '../../index.php';
        });
    }
    // Toggle menu
    menuBtn.addEventListener('click', function() {
        menuCont.style.display = menuCont.style.display === 'none' ? 'block' : 'none';
    });

    // Show leaderboard
    leaderboardBtn.addEventListener('click', function() {
        leaderboardCont.style.display = 'block';
        menuCont.style.display = 'none';
        loadLeaderboard();
    });

    // Close leaderboard
    closeLeaderboard.addEventListener('click', function() {
        leaderboardCont.style.display = 'none';
    });

    // Load leaderboard data
    function loadLeaderboard() {
        const topplayers = document.querySelector('.topplayers');
        topplayers.innerHTML = '<div class="loading">Loading leaderboard...</div>';

        fetch('api/get_leaderboard.php')
            .then(response => response.json())
            .then(response => {
                if (response.status === 'error') {
                    throw new Error(response.message);
                }

                if (response.status === 'success' && (!response.data || response.data.length === 0)) {
                    topplayers.innerHTML = `
                        <div class="no-data">
                            <p>No players yet!</p>
                            <p>Be the first to play and get on the leaderboard!</p>
                        </div>`;
                    return;
                }

                topplayers.innerHTML = '';
                response.data.forEach((player, index) => {
                    const playerElement = document.createElement('div');
                    playerElement.className = 'player';
                    const username = escapeHtml(player.username || 'Player');
                    const profileImage = encodeURIComponent(player.profile_image || 'default.png');
                    const totalPoints = Number.parseInt(player.total_points, 10) || 0;
                    playerElement.innerHTML = `
                        <div class="rank">${index + 1}</div>
                        <img src="../../public/assets/images/profiles/${profileImage}" alt="Player Avatar" class="avatar" onerror="this.src='../../public/assets/images/profiles/default.png'">
                        <div class="info">
                            <div class="username" title="${username}">${username}</div>
                        </div>
                        <div class="score-container">
                            <img src="assets/images/trophy.png" alt="Trophy" class="trophy-icon">
                            <span class="score">${totalPoints}</span>
                        </div>
                    `;
                    topplayers.appendChild(playerElement);
                });
            })
            .catch(error => {
                topplayers.innerHTML = `
                    <div class="error-message">
                        Error loading leaderboard data
                        <div class="error-details">${error.message}</div>
                    </div>`;
            });
    }
});
