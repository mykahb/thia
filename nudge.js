const notes = [
  "I do miss you incase you're wondering.",
  "Your smile is so contagious, keep showing all 32.",
  "Weirdo. It's cute tho.",
  "I'm genuinely so proud of you.",
  "I love you",
  "Hmu anytime.",
  "Hope your day feels gentle today.",
  "You crossed my mind — in a good way.",
  "You deserve something good today.",
  "You're doing better than you think.",
  "I hope something small makes you smile today."
];

document.getElementById("note-btn").onclick = () => {
  const random = notes[Math.floor(Math.random() * notes.length)];
  const text = document.getElementById("note-text");
  text.textContent = random;
  text.classList.add("bounce");
  setTimeout(() => text.classList.remove("bounce"), 500);
};

document.getElementById("nudge-btn").onclick = () => {
  const msg = document.getElementById("nudge-msg");
  msg.textContent = "twin tf do you want? lemme come see you";
  msg.classList.add("bounce");
  setTimeout(() => msg.classList.remove("bounce"), 500);
};
