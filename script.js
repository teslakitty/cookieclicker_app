let count = 0; // Initialize the cookie count

function init() {
  const music = document.getElementById('music');
  const musicToggle = document.getElementById('musicToggle');
  const volumeSlider = document.getElementById('volumeSlider');

  // Initialize the music based on the toggle status
  if (musicToggle.checked) {
    music.play();
  } else {
    music.pause();
  }

  // Set initial volume
  music.volume = volumeSlider.value;

  // Event listeners for toggle and volume
  musicToggle.addEventListener('click', toggleMusic);
  volumeSlider.addEventListener('input', function() {
    adjustVolume(this.value);
  });

  // Load the saved score from localStorage
  const savedCount = localStorage.getItem('cookieCount');
  if (savedCount !== null) {
    count = parseInt(savedCount, 10);
    document.getElementById('count').textContent = count;
  } else {
    count = 0; // Initialize count if no saved score
  }
}

function handleClick() {
  // Increment the cookie count
  count++;
  
  // Update the score display
  document.getElementById('count').textContent = count;

  // Save the score to localStorage
  localStorage.setItem('cookieCount', count);

  // Play the click sound effect
  const clickSound = new Audio('click.mp3'); // Update with the correct path to your sound effect file
  clickSound.play();
}

function handleRestartClick() {
  // Reset the cookie count
  count = 0;
  
  // Update the score display
  document.getElementById('count').textContent = count;

  // Save the reset score to localStorage
  localStorage.setItem('cookieCount', count);
}

function toggleMusic() {
  const music = document.getElementById('music');
  const musicToggle = document.getElementById('musicToggle');
  if (musicToggle.checked) {
    music.play();
  } else {
    music.pause();
  }
}

function adjustVolume(volume) {
  const music = document.getElementById('music');
  music.volume = volume;
}
