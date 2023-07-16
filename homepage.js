document.addEventListener('DOMContentLoaded', function() {
  const modals = {
    videoModal: document.querySelector('#videoModal'),
    textModal: document.querySelector('#textModal'),
    loginModal: document.querySelector('.loginModal'), // Updated selector
    chatModal: document.querySelector('#chatModal'),
    riddleModal: document.querySelector('#riddleModal'),
    konamiCodeModal: document.querySelector('#konamiCodeModal'),
    approvedModal: document.querySelector('#approvedModal'),
    pillModal: document.querySelector('#pillModal'),
    HHmodal: document.querySelector('.HHmodal'),
  };

  const pictogramLetters = document.querySelectorAll('.pictogram-letter');
  const closeModal = document.querySelectorAll('.close');
  const openSound = new Audio('open_sound.mp3');
  const closeSound = new Audio('closing_sound.mp3');
  const successSound = new Audio('music.mp3');
  const successsSound = new Audio('succes.mp3');

  let activeModal = null;

  const coordinates = {
    initialX: 0,
    initialY: 0,
    currentX: 0,
    currentY: 0,
  };

  function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
  }

  function dragStart(e) {
    if (e.target === activeModal) {
      coordinates.initialX = e.clientX - coordinates.currentX;
      coordinates.initialY = e.clientY - coordinates.currentY;
      activeModal.style.cursor = 'grabbing';

      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', dragEnd);
    }
  }

  function drag(e) {
    e.preventDefault();
    if (activeModal) {
      coordinates.currentX = e.clientX - coordinates.initialX;
      coordinates.currentY = e.clientY - coordinates.initialY;
      activeModal.style.transform = `translate(${coordinates.currentX}px, ${coordinates.currentY}px)`;
    }
  }

  function dragEnd() {
    if (activeModal) {
      activeModal.style.cursor = 'grab';
      coordinates.currentX = 0;
      coordinates.currentY = 0;
      coordinates.initialX = 0;
      coordinates.initialY = 0;
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', dragEnd);
    }
  }

  function activateModal(e) {
    const classList = Array.from(e.target.classList);

    if (classList.includes('video-pictogram')) {
      modals.videoModal.style.display = 'block';
      activeModal = modals.videoModal;
      const video = activeModal.querySelector('video');
      video.play();
    } else if (classList.includes('text-pictogram')) {
      modals.textModal.style.display = 'block';
      activeModal = modals.textModal;
      if (classList.includes('pictogram-letter-d')) { // Show loginModal only when D is clicked
        modals.loginModal.style.display = 'block';
        activeModal = modals.loginModal;
        playSound(openSound);
      }
    } else if (classList.includes('pictogram-letter-e')) {
      modals.konamiCodeModal.style.display = 'block';
      activeModal = modals.konamiCodeModal;
    } else if (classList.includes('pictogram-letter-h')) {
      modals.HHmodal.style.display = 'block';
      activeModal = modals.HHmodal;
      playSound(successsSound);
    }
  }

  function deactivateModal(e) {
    const modal = e.target.closest('.modal');
    modal.style.display = 'none';
    activeModal = null;
    playSound(closeSound);
    if (modal === modals.videoModal) {
      const video = modal.querySelector('video');
      video.pause();
    }
  }

  pictogramLetters.forEach((letter) => {
    letter.addEventListener('click', activateModal);
    letter.addEventListener('mouseover', () => {
      letter.classList.add('glowing');
    });
    letter.addEventListener('mouseout', () => {
      letter.classList.remove('glowing');
    });
  });

  closeModal.forEach((button) => {
    button.addEventListener('click', deactivateModal);
  });

  document.addEventListener('mousedown', dragStart);

  // Password functionality
  const loginForm = document.querySelector('#loginForm');
  const passwordInput = document.querySelector('#password');
  const error = document.querySelector('#error');

  function handleLogin(e) {
    e.preventDefault();
    const password = passwordInput.value.trim();
    if (password === 'FIREWALL') {
      error.style.display = 'none';
      modals.loginModal.style.display = 'none';
      modals.approvedModal.style.display = 'block';
      activeModal = modals.approvedModal;
      setTimeout(() => {
        window.location.href = 'presale.html';
      }, 2000);
    } else {
      error.style.display = 'block';
    }
  }

  loginForm.addEventListener('submit', handleLogin);

  // Konami Code
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA',
  ];
  let konamiCodeIndex = 0;

  document.addEventListener('keydown', function(e) {
    if (e.code === konamiCode[konamiCodeIndex]) {
      konamiCodeIndex++;
      if (konamiCodeIndex === konamiCode.length) {
        modals.riddleModal.style.display = 'block';
        activeModal = modals.riddleModal;
        konamiCodeIndex = 0;
        playSound(successSound);

        modals.konamiCodeModal.style.display = 'none';
      }
    } else {
      konamiCodeIndex = 0;
    }
  });

  // Pill functionality
  const pillModal = document.querySelector('#pillModal');
  const redPillBtn = pillModal.querySelector('#redPillBtn');
  const bluePillBtn = pillModal.querySelector('#bluePillBtn');
  const successMessage = pillModal.querySelector('#successMessage');
  const errorMessage = pillModal.querySelector('#errorMessage');

  function handlePillSelection(selectedPill) {
    if (selectedPill.classList.contains('correct')) {
      successMessage.style.display = 'block';
      errorMessage.style.display = 'none';
      // Allow user to proceed to the next level or perform any other actions
    } else {
      successMessage.style.display = 'none';
      errorMessage.style.display = 'block';
      // Provide user with another chance or perform any other actions
    }
  }

  redPillBtn.addEventListener('click', () => {
    handlePillSelection(redPillBtn);
  });

  bluePillBtn.addEventListener('click', () => {
    handlePillSelection(bluePillBtn);
  });

  // Function to play the sound
  function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
  }

  // Popup Modal
  const popupModal = document.querySelector('.container1 .popupmodal');
  const fullscreenButton1 = popupModal.querySelector('.popupmodal-button.fullscreen');
  const reduceButton1 = popupModal.querySelector('.popupmodal-button.reduce');
  const closeButton1 = popupModal.querySelector('.popupmodal-button.close');

  function goFullscreen1() {
    popupModal.style.width = '600px';
    popupModal.style.height = '400px';
  }

  function reduceSize1() {
    popupModal.style.width = '370px';
    popupModal.style.height = '200px';
  }

  function closePopupModal1() {
    popupModal.style.display = 'none';
  }

  popupModal.style.display = 'none';

  setTimeout(() => {
    popupModal.style.display = 'block';
  }, 3000);

  fullscreenButton1.addEventListener('click', goFullscreen1);
  reduceButton1.addEventListener('click', reduceSize1);
  closeButton1.addEventListener('click', closePopupModal1);

  // HHmodal
  const HHmodal = document.querySelector('.HHmodal');
  const HHmodalModal = HHmodal.querySelector('.HHmodal-modal');
  const fullscreenButton2 = HHmodal.querySelector('.HHmodal-button.fullscreen');
  const reduceButton2 = HHmodal.querySelector('.HHmodal-button.reduce');
  const closeButton2 = HHmodal.querySelector('.HHmodal-button.close');

  function goFullscreen2() {
    HHmodalModal.style.width = '600px';
    HHmodalModal.style.height = '400px';
  }

  function reduceSize2() {
    HHmodalModal.style.width = '370px';
    HHmodalModal.style.height = '200px';
  }

  function closeHHmodal() {
    HHmodal.style.display = 'none';
  }

  fullscreenButton2.addEventListener('click', goFullscreen2);
  reduceButton2.addEventListener('click', reduceSize2);
  closeButton2.addEventListener('click', closeHHmodal);

  // Login Modal
  const loginFullscreenButton = document.querySelector('.window.loginModal .window-button.fullscreen');
  const loginReduceButton = document.querySelector('.window.loginModal .window-button.reduce');
  const loginCloseButton = document.querySelector('.window.loginModal .window-button.close');

  function goFullscreenLogin() {
    modals.loginModal.style.width = '600px';
    modals.loginModal.style.height = '400px';
  }

  function reduceSizeLogin() {
    modals.loginModal.style.width = '370px';
    modals.loginModal.style.height = '200px';
  }

  function closeLoginModal() {
    modals.loginModal.style.display = 'none';
  }

  loginFullscreenButton.addEventListener('click', goFullscreenLogin);
  loginReduceButton.addEventListener('click', reduceSizeLogin);
  loginCloseButton.addEventListener('click', closeLoginModal);
});
