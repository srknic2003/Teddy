const heartsLayer = document.getElementById("hearts-layer");
const teddy = document.getElementById("teddy");
const hugBtn = document.getElementById("hug-btn");
const teddyBtn = document.getElementById("teddy-btn");
const loveBtn = document.getElementById("love-btn");

let loveClickCount = 0;

function spawnHeart(x, y, emoji = "❤") {
  if (!heartsLayer) return;
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = emoji;
  const rect = heartsLayer.getBoundingClientRect();
  const left = x === null ? Math.random() * rect.width : x - rect.left;
  heart.style.left = `${left}px`;
  heart.style.bottom = '0'; // Start from bottom
  heartsLayer.appendChild(heart);
  setTimeout(() => heart.remove(), 5000); // Longer duration
}

function burstHearts(count = 12, emojiSet = ["❤", "🩷", "💕", "🧸"]) {
  const width = window.innerWidth;
  const centerX = width / 2;
  for (let i = 0; i < count; i++) {
    const offset = (Math.random() - 0.5) * width * 0.4;
    const emoji = emojiSet[Math.floor(Math.random() * emojiSet.length)];
    spawnHeart(centerX + offset, null, emoji);
  }
}

if (hugBtn && teddy) {
  hugBtn.addEventListener("click", (e) => {
    teddy.style.transition = "transform 0.18s ease";
    teddy.style.transform = "scale(1.08) translateY(-6px)";
    teddy.classList.add("dancing");

    const leftArm = teddy.querySelector(".arm-left");
    const rightArm = teddy.querySelector(".arm-right");
    if (leftArm && rightArm) {
      leftArm.style.transition = rightArm.style.transition =
        "transform 0.22s ease";
      leftArm.style.transform = "rotate(40deg) translateX(8px)";
      rightArm.style.transform = "rotate(-40deg) translateX(-8px)";
    }

    burstHearts(14);

    // Show hug modal
    const hugModal = document.getElementById("hug-modal");
    if (hugModal) {
      hugModal.style.display = "block";
    }

    setTimeout(() => {
      teddy.style.transform = "";
      teddy.classList.remove("dancing");
      if (leftArm && rightArm) {
        leftArm.style.transform = "rotate(18deg)";
        rightArm.style.transform = "rotate(-18deg)";
      }
    }, 550);
  });
}

if (teddyBtn && teddy) {
  // Function for button click: animation + popup
  teddyBtn.addEventListener("click", () => {
    teddy.classList.add("teddy-blush");
    teddy.classList.add("surprise");
    burstHearts(18, ["💕", "💗", "💖", "🧸"]);

    // Show the modal with the teddy picture
    const modal = document.getElementById("teddy-modal");
    if (modal) {
      modal.style.display = "block";
    }

    setTimeout(() => {
      teddy.classList.remove("teddy-blush");
      teddy.classList.remove("surprise");
    }, 800);
  });

  // Function for clicking teddy directly: ONLY animation, NO popup
  teddy.addEventListener("click", (e) => {
    // Prevent event bubbling to avoid triggering button click
    e.stopPropagation();
    
    teddy.classList.add("teddy-blush");
    teddy.classList.add("surprise");
    burstHearts(12, ["💕", "💗", "💖", "🧸"]);

    setTimeout(() => {
      teddy.classList.remove("teddy-blush");
      teddy.classList.remove("surprise");
    }, 800);
  });
}

// Modal close functionality for teddy modal
const closeTeddyBtn = document.getElementById("close-teddy-modal");
if (closeTeddyBtn) {
  closeTeddyBtn.addEventListener("click", () => {
    const modal = document.getElementById("teddy-modal");
    if (modal) {
      modal.style.display = "none";
    }
  });
}

// Modal close functionality for hug modal
const closeHugBtn = document.getElementById("close-hug-modal");
if (closeHugBtn) {
  closeHugBtn.addEventListener("click", () => {
    const modal = document.getElementById("hug-modal");
    if (modal) {
      modal.style.display = "none";
    }
  });
}

// "I love you" button game functionality
if (loveBtn) {
  loveBtn.addEventListener("click", (e) => {
    loveClickCount++;
    
    // Spawn hearts on click
    burstHearts(8, ["💕", "💖", "💗", "❤", "💝"]);
    
    // Ensure button is visible first to get accurate dimensions
    loveBtn.style.visibility = "visible";
    loveBtn.style.opacity = "1";
    
    // Get actual button dimensions
    const rect = loveBtn.getBoundingClientRect();
    const btnWidth = rect.width || 180;
    const btnHeight = rect.height || 50;
    
    // Viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Position within central 60% of viewport to keep it in view
    const minX = viewportWidth * 0.2;
    const maxX = viewportWidth * 0.8 - btnWidth;
    const minY = viewportHeight * 0.2;
    const maxY = viewportHeight * 0.8 - btnHeight;

    // Ensure max values are greater than min values
    const safeMaxX = Math.max(minX + 10, maxX);
    const safeMaxY = Math.max(minY + 10, maxY);
    
    // Generate random position within safe bounds
    const randomX = Math.floor(Math.random() * (safeMaxX - minX + 1)) + minX;
    const randomY = Math.floor(Math.random() * (safeMaxY - minY + 1)) + minY;
    
    // Apply position
    loveBtn.classList.add("moving");
    loveBtn.style.position = "fixed";
    loveBtn.style.left = `${randomX}px`;
    loveBtn.style.top = `${randomY}px`;
    loveBtn.style.zIndex = "999999";
    loveBtn.style.pointerEvents = "auto";
    loveBtn.style.margin = "0";
    loveBtn.style.visibility = "visible";
    loveBtn.style.opacity = "1";
    
    // Force it to stay on top by removing and re-adding to DOM
    const parent = loveBtn.parentNode;
    const nextSibling = loveBtn.nextSibling;
    parent.removeChild(loveBtn);
    parent.appendChild(loveBtn);
    
    // Check if 5 clicks reached
    if (loveClickCount >= 5) {
      setTimeout(() => {
        const loveModal = document.getElementById("love-modal");
        if (loveModal) {
          loveModal.style.display = "block";
        }
        burstHearts(30, ["💕", "💖", "💗", "❤", "💝", "💘", "💞"]);
      }, 400);
    }
  });
}

// Modal close functionality for love modal
const closeLoveBtn = document.getElementById("close-love-modal");
if (closeLoveBtn) {
  closeLoveBtn.addEventListener("click", () => {
    const modal = document.getElementById("love-modal");
    if (modal) {
      modal.style.display = "none";
    }
  });
}

// Close modals when clicking outside
window.addEventListener("click", (event) => {
  const teddyModal = document.getElementById("teddy-modal");
  const hugModal = document.getElementById("hug-modal");
  const loveModal = document.getElementById("love-modal");
  if (event.target === teddyModal) {
    teddyModal.style.display = "none";
  }
  if (event.target === hugModal) {
    hugModal.style.display = "none";
  }
  if (event.target === loveModal) {
    loveModal.style.display = "none";
  }
});



