/* 
 Word bank strictly alternating every other word with "Kindred" 
 using global translations and proper RTL support.
*/
const words = [
    "Kindred", "亲属",       /* Chinese */
    "Kindred", "القرابة",   /* Arabic (RTL) */
    "Kindred", "सजातीय",    /* Hindi */
    "Kindred", "خویشاوند",   /* Persian (RTL) */
    "Kindred", "親類",       /* Japanese */
    "Kindred", "قרוב",      /* Hebrew (RTL) */
    "Kindred", "친척",       /* Korean */
    "Kindred", "родня",     /* Russian */
    "Kindred", "Parientes",  /* Spanish */
    "Kindred", "Proches",    /* French */
    "Kindred", "Verwandte",  /* German */
    "Kindred", "Sjælevenner",/* Danish */
    "Kindred", "Blodsbånd"   /* Norwegian */
];

const middleLineElement = document.getElementById("middle-line");
const typedTextElement = document.getElementById("typed-text");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 120;

// Words that require Right-to-Left text and cursor adjustments
const rtlWords = ["القرابة", "خویشاوند", "قרוב"];

function typeWriter() {
    const currentWord = words[wordIndex];

    // Dynamically apply RTL styling if the language requires it
    if (rtlWords.includes(currentWord)) {
        middleLineElement.classList.add("rtl");
    } else {
        middleLineElement.classList.remove("rtl");
    }

    if (isDeleting) {
        // Delete a character
        typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 55; // Faster speed when deleting
    } else {
        // Type a character
        typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110; // Normal typing speed
    }

    // Finished typing the current word
    if (!isDeleting && charIndex === currentWord.length) {
        // Longer pause on "Kindred", shorter on translations
        typingSpeed = currentWord === "Kindred" ? 2400 : 1600;
        isDeleting = true;
    } 
    // Finished deleting the word completely
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        // Move to the next word in the pool sequentially
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 400; // Brief pause before next word starts
    }

    setTimeout(typeWriter, typingSpeed);
}

// Initialize animation when page loads
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeWriter, 800);
});
