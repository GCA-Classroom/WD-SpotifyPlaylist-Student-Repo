function scrollToApp() {
  document.getElementById("app").scrollIntoView({ behavior: "smooth" });
}

// =====================================================
// STEP 1: Define the playlist data object
// =====================================================
const playlistData = {
  focus: [
    { title: "Tycho — Awake", cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80" },
    { title: "Lo-fi Beats", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80" },
    { title: "Hans Zimmer — Time", cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&q=80" },
    { title: "Bonus: Brian Eno — An Ending", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80" },
  ],
  chill: [
    { title: "Frank Ocean — Pink + White", cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" },
    { title: "SZA — Good Days", cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=300&q=80" },
    { title: "Daniel Caesar — Best Part", cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&q=80" },
    { title: "Bonus: Beach House — Space Song", cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=300&q=80" },
  ],
  hype: [
    { title: "Drake — Nonstop", cover: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&q=80" },
    { title: "Travis Scott — SICKO MODE", cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&q=80" },
    { title: "Kanye West — POWER", cover: "https://images.unsplash.com/photo-1464375117522-1311dd6d0cd1?w=300&q=80" },
    { title: "Bonus: Run The Jewels — Legend Has It", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80" },
  ],
};

/* DOM ELEMENTS */
const selector = document.getElementById("mood-selector");
const modeSelector = document.getElementById("mode-selector");
const container = document.getElementById("playlist-container");
const feedback = document.getElementById("feedback");
const milestone = document.getElementById("milestone");

// Counts songs removed in the current playlist. Powers the
// milestone tracker in Step 10.
let songsRemovedCount = 0;

/* =====================================================
   STEP 2: Basic Event Listener Setup
   What is an event? Why "change" instead of "click"?
   Show students: the page reacts when the user does something
   ===================================================== */
selector.addEventListener("change", buildPlaylist);
modeSelector.addEventListener("change", buildPlaylist);

function buildPlaylist() {

  /* =====================================================
     STEP 3: Getting the Selected Mood
     console.log(selector.value) to show the mood
     Explain: playlistData[mood] vs playlistData.focus
     This is dynamic property access!
     ===================================================== */
  const mood = selector.value;
  console.log("Selected mood:", mood);

  if (!mood) {
    feedback.textContent = "Your personalized playlist will appear here.";
    feedback.className = "feedback-box";
    container.innerHTML = "";
    milestone.textContent = "";
    return;
  }

  /* =====================================================
     STEP 4: Dynamic Data Access (⭐ KEY CONCEPT!)
     💡 Emphasize: playlistData[mood] NOT playlistData.focus
     ===================================================== */
  const allSongs = playlistData[mood];
  console.log("Songs for this mood:", allSongs);

  // STOP. INSTRUCTOR DEMO ENDS HERE — DEV TEAMS TAKE OVER. ⬇️⬇️⬇️

  /* =====================================================
     DEV TEAMS — STEP 5: Listening Mode Logic
     (Your instructor didn't demo this one live — here's
     everything you need to figure it out as a team.)

     🟦 THIS IS THE SAME PATTERN AS A DIFFICULTY MODE.
     In your charity: water game, "Easy / Normal / Hard"
     will change things like time limits, win conditions,
     or how many drops the player needs to collect. The
     shape of the code is identical to what's below — only
     the names change.

     HOW IT WORKS HERE:
     "Quick Play" vs "Full Session" changes WHICH and HOW
     MANY songs get loaded into the playlist.

     WORKED MINI-EXAMPLE (same shape, different scenario):
       let lives;
       if (difficulty === "easy") {
         lives = 5;
       } else if (difficulty === "hard") {
         lives = 1;
       }
     Notice: one variable declared, then ASSIGNED a
     different value depending on the condition. That's
     exactly what `songs` is doing below.

     🤔 GUIDING QUESTION FOR YOUR TEAM:
     If you added a third mode (e.g. "shuffleMode"), what
     would you add — another `else if`? What should it set
     `songs` to? Talk through it before you code your
     game's difficulty modes.
     ===================================================== */
  const mode = modeSelector.value;
  let songs;

  if (mode === "quickPlay") {
    songs = allSongs.slice(0, 3);
  } else if (mode === "fullSession") {
    songs = allSongs; // includes the bonus track
  }

  /* =====================================================
     DEV TEAMS — STEP 6: Conditional Feedback
     (Also not demoed live — read closely before building
     your own win/lose message.)

     🟦 SAME PATTERN as a "You Win!" / "Try Again" message
     in your game: a conditional that changes BOTH the TEXT
     and the STYLE (CSS class) of one element, based on a
     condition.

     WORKED MINI-EXAMPLE (same shape, different scenario):
       if (dropsCollected >= goal) {
         message.textContent = "You win!";
         message.className = "feedback-box success";
       } else {
         message.textContent = "Try again!";
         message.className = "feedback-box error";
       }
     Notice: TWO things change together inside each branch —
     the text AND the class. That's the pattern to copy.

     🤔 GUIDING QUESTION FOR YOUR TEAM:
     Below, the condition checks `songs.length === 0`. What
     condition will YOUR game check — a score, a timer
     running out, a number of drops collected? What are the
     two things (text + class) that should change in each
     branch?
     ===================================================== */
  container.innerHTML = "";   // clear previous playlist
  songsRemovedCount = 0;       // reset milestone tracker for a fresh playlist
  milestone.textContent = "";

  if (songs.length === 0) {
    feedback.textContent = "No songs found for that combination. Try another mood!";
    feedback.className = "feedback-box error";
  } else {
    feedback.textContent = `Loaded ${songs.length} song${songs.length === 1 ? "" : "s"} for your ${mood} ${mode === "fullSession" ? "full session" : "quick play"}.`;
    feedback.className = "feedback-box success";
  }

  /* =====================================================
     DEV TEAMS — STEP 7: The Loop (⭐⭐⭐ MOST IMPORTANT!)
     Loop through `songs` and build a row for each one.
     ===================================================== */
  songs.forEach(function (song, index) {

    /* =====================================================
       DEV TEAMS — STEP 8: Create and Display DOM Elements
       ===================================================== */
    const row = document.createElement("div");
    row.className = "song-row";

    const img = document.createElement("img");
    img.src = song.cover;
    img.alt = song.title;

    // BONUS: Image Fallback Protection
    img.onerror = function () {
      this.src = "https://placehold.co/60x60?text=Music";
    };

    const titleEl = document.createElement("span");
    titleEl.textContent = song.title;

    const hint = document.createElement("span");
    hint.className = "remove-hint";
    hint.textContent = "click to remove";

    row.appendChild(img);
    row.appendChild(titleEl);
    row.appendChild(hint);
    container.appendChild(row);

    /* =====================================================
       DEV TEAMS — STEP 9: DOM Element Removal on Click
       🟦 DIRECT PRACTICE for your game's "DOM Element
       change/add/remove" requirement. This is the EXACT
       pattern you'll use to make a drop disappear when a
       player clicks it: add a class, then remove the
       element after the transition finishes.
       ===================================================== */
    row.addEventListener("click", function () {
      row.classList.add("removing");

      setTimeout(function () {
        row.remove();
        songsRemovedCount++;
        updateMilestone();
      }, 200);
    });
  });

  /* =====================================================
     DEV TEAMS — STEP 10: Milestone Tracking (Bonus pattern)
     🟦 DIRECT PRACTICE for the optional "Track and Display
     Milestones" bonus -- an array of milestone objects
     checked with a conditional, just like you'd use to
     celebrate a player hitting 5, 10, or 20 drops collected.
     ===================================================== */
  function updateMilestone() {
    const milestoneMessages = [
      { count: 1, message: "🎵 First song cleared!" },
      { count: 3, message: "🔥 You're on a roll!" },
      { count: songs.length, message: "🏁 Playlist complete — nice work!" },
    ];

    milestoneMessages.forEach(function (m) {
      if (songsRemovedCount === m.count) {
        milestone.textContent = m.message;
      }
    });
  }
}