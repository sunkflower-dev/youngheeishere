// ---------- PHONE SETTINGS (edit these!) ----------
const CONFIG = {
  junVideo: "videos/younghee_is_here.mp4",   // Jun's first video. Put your real file here. Use "" to show the blurry picture instead.
  passcode: "1006",
  showHint: true,
  time: "3:07",
  date: "Tuesday, 27 October",
  apps: [
    { id: "chat",    name: "WhatsApp", icon: "💬", color: "#25d366" },
    { id: "chrome",  name: "Chrome",   icon: "🌐", color: "#4285f4" },
    { id: "gmail",   name: "Gmail",    icon: "✉️", color: "#ea4335" },
    { id: "notes",   name: "Notes",    icon: "📝", color: "#f5c518" },
    { id: "gallery", name: "Gallery",  icon: "🖼️", color: "#e91e63" },
    { id: "wave",    name: "Waveform", icon: "〰️", color: "#7b2ff7" }
  ],
  // 4 notes
  notes: [
    { title: "grocery list", body: "- Oat milk\n- 2 dozen eggs\n- Shokupan bread (ask Jun)\n- Coke Zero\n- Sunlight strawberry?? (confirm with Jun)\n- Salt\n- Pepper\n- Chicken breast" },
    { title: "June 10", body: "I don't know why I keep looking back at that day, or how you managed to anchor me when everything else was slipping away.\n Sometimes the silence in this house is unbearable, but just knowing you're somewhere out there... watching, waiting, making sure I don't forget, changes everything.\n I am so endlessly thankful to have you.\n Even when the lights flicker and I hear footsteps right outside the door, I know you're keeping me safe.\n Don't ever leave." },
    { title: "Untitled Draft (2)", body: "Please never change your perfume, because I love the scent you leave in the air every time you walk past me.\nI always walk ten paces behind you, keeping my distance so you won't hear how loud my heartbeat is.\nSomeday, you're bound to realize that no one else in this world pays attention to you down to the smallest detail like I do.\nAnd when that day comes, you won't have to look anywhere else, because I'll already be there... standing right behind your door." },
    { title: "Untitled Draft (1)", body: "I keep a piece of the glass you broke\nA little souvenir of the day you spoke\nYou said you needed space to breathe\nSo I watch from the tree line, just beneath\nYou don’t have to miss me,\nI’m already there In the static on your TV, in the cold night air\nSleep tight, my love, lock every door I know where you hide the key under the floor\nIt’s sweet how you think you’re ever alone\nWhen every step you take is already my home" }
  ],
  // 7 photos + 2 videos
  gallery: [
    { name: "Photo 1.jpg", type: "photo", thumb: "images/gallery/photo1.jpg" },
    { name: "Photo 2.jpg", type: "photo", thumb: "images/gallery/photo2.jpg" },
    { name: "Photo 3.jpg", type: "photo", thumb: "images/gallery/photo3.jpg" },
    { name: "Photo 4.jpg", type: "photo", thumb: "images/gallery/photo4.jpg" },
    { name: "Photo 5.jpg", type: "photo", thumb: "images/gallery/photo5.jpg" },
    { name: "Photo 6.jpg", type: "photo", thumb: "images/gallery/photo6.jpg" },
    { name: "Photo 7.jpg", type: "photo", thumb: "images/gallery/photo7.jpg" },
    { name: "Video 1.mp4", type: "video", thumb: "images/gallery/video1.jpg" },
    { name: "Video 2.mp4", type: "video", thumb: "images/gallery/video2.jpg" }
  ],
  // 7 emails
  emails: [
    { from: "Pledis A&R Team", color: "#1a73e8", time: "3:01 AM", subject: "RE: Track Demo Feedback - 'Spell' Revision 04", body: "Jihoon,\n\nOverall this track is solid, but management feels the bridge still isn't quite right to be the main title track. Could you re-arrange the vocals before tomorrow afternoon? We need to lock in the final stems before the mixing session with Bumzu.\n\n- Minho", unread: true },
    { from: "Bumzu", color: "#e8710a", time: "Yesterday", subject: "Studio B Stems", body: "Hey Hoon, I just updated the multi-track for the new instrumental on the server. Take a look at track 14, I tweaked the synth lead earlier, but let me know if it doesn't vibe with you. By the way, are we still on for the midnight vocal recording?", unread: false },
    { from: "Studio Booking Admin", color: "#188038", time: "Mon", subject: "CONFIRMED: Studio A Reservation (Oct 28 - Nov 02)", body: "Your booking for Studio A (Main Mixing Suite) has been confirmed for the upcoming week. Access card required for entry after 10 PM. Please ensure all personal equipment is cleared out by the end of the slot.", unread: false },
    { from: "KOMCA Licensing", color: "#a142f4", time: "Sun", subject: "Song Registration Notice: ID 10049281", body: "Dear WOOZI (PU-08492), your latest work registration has been successfully processed and verified in the database. Please review the attached metadata sheet to confirm the co-writer split percentages.", unread: false },
    { from: "Melon Publishing", color: "#d93025", time: "Oct 20", subject: "Quarterly Streaming Royalty Report & Payout", body: "Your Q3 royalty report is now available on the portal. Direct deposit transfer will be processed within 3 business days to your registered account ending in 4082.", unread: false },
    { from: "Vocal Director / Coach", color: "#12b5cb", time: "Oct 18", subject: "Guide track vocals for unit project", body: "Hey Jihoon, I uploaded the rough guide for the unit song, but dropped it down an octave since I couldn't quite hit the high notes, just adjust it later during the actual recording. HMU if you need a re-take.", unread: false },
    { from: "Unknown Sender", color: "#5f6368", time: "Oct 12", subject: "still awake?", body: "the sound of your typing can be heard all the way over here. why do you always stop every time the wall clock chimes three times?", unread: true }
  ]
};

// ---------- LIVE CLOCK FUNCTION (Outside CONFIG) ----------
function updateLiveClock() {
    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const timeString = `${hours}:${minutes}`;
    
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateString = now.toLocaleDateString('en-US', options);

    document.querySelectorAll('.lock-screen-time, .status-bar-time').forEach(el => {
        el.textContent = timeString;
    });
    document.querySelectorAll('.lock-screen-date').forEach(el => {
        el.textContent = dateString;
    });
}

// Run immediately and update every second
setInterval(updateLiveClock, 1000);
updateLiveClock();

// ---------- STORY ----------
const story = [
  // ---------- SCENE 1 ----------
  { w: "Jun", file: "younghee_is_here.mp4", size: "14.2 MB", id: "vid1", thumb: "images/video.jpg" },
  { open: "vid1", secs: 4 },
  { w: "Jun", t: "hey guys, i found a bunch of videos while cleaning out old tapes in my parents' attic, found one containing clips from an old retro tv show we used to watch together after school at soonyoung's house. remember younghee's here?" },
  { w: "Soonyoung", t: "lolol yeah creepy younghee😂😂😂 that show gave me trauma istg" },
  { me: "What show? I don't remember any tv show called that." },
  { w: "Wonwoo", t: "I remember. It aired on cable around 2004, right after Rugrats." },
  { me: "Let me google it real quick." },
  { search: "whats Younghee's here" },
  { me: "This makes no sense guys, I'm searching and I can't find anything at all about a show called Younghee's Here??" },

  // ---------- SCENE 2 ----------
  { w: "Soonyoung", t: "no way? i vividly remember there was this super creepy episode where younghee played hide and seek while singing. but every time she looked back, the kids on screen wouldn't move... they were standing on their heads..." },
  { w: "Jun", t: "no that's not it, as far as i remember the background was just an empty gray room. and she wasn't playing a game, just standing and singing that song in a low voice on loop." },
  { w: "Soonyoung", t: "huh? no way. her voice was so sharp. she was like screaming straight into the mic until my ears hurt" },
  { w: "Jun", t: "screaming? no, quite the opposite actually. she sang so softly that you had to max out the tv volume, but at least she could actually sing." },
  { w: "Wonwoo", t: "Well no. I actually remember her singing like she was crying. Completely pitchy, like she kept choking on her own breath." },
  { w: "Soonyoung", t: "bro are we seriously remembering the same show? her singing voice is even super clear in that video file jun sent earlier, just listen to how loud it is." },
  { open: "vid1", secs: 4 },
  { me: "Guys... what are you even talking about..." },
  { me: "The video doesn't have any sound?" },
  { w: "Jun", t: "what??? how is there no sound? i literally just re-listened, she is definitely singing in that video" },

  // ---------- SCENE 3 ----------
  { download: "vid1" },   // tap Jun's first video -> Download popup
  { analyze: true },      // open Waveform app -> upload the video
  { upload: "Audio Analysis Result", size: "3.1 MB", id: "rec", thumb: "images/gallery/analysis.jpg" },
  { me: "Take a look at this audio track, I analyzed it using Wave. There's no sound at all, the audio waveform is a flat line... literally 0 dB." },
  { w: "Soonyoung", t: "but i genuinely heard a little girl's voice in that mp4 singing 'mugunghwa kkochi pieot seumnida' in the background, wait let me check the analysis" },
  { pause: 4000 },
  { w: "Soonyoung", t: "WJAT THE FYCK JIHOON" },
  { w: "Wonwoo", t: "WTF I literally just fell off my chair????" },
  { me: "What???" },
  { w: "Soonyoung", t: "stop joking around, it's not funny ji" },
  { me: "What? I don't get it." },
  { w: "Wonwoo", t: "Open the video you sent." },
  { open: "rec", secs: 3, video: "videos/audio_analysis.mp4", text: "Hana... Dul... Seet..." },
  { me: "I SWEAR IT WASN'T ME. It wasn't like that before." },
  { w: "Soonyoung", t: "yeah fuck you" },
  { w: "Wonwoo", t: "Guys by the way, where's Jun?" },
  { w: "Jun", t: "hey so.. i just remembered something... younghee isn't the name of a tv show guys..." },
  { w: "Wonwoo", t: "Huh?" },
  { w: "Jun", t: "younghee was a girl who lived next door to soonyoung, she played with us every day after school. she disappeared in mid-2004 before we started middle school" },
  { me: "Jun, we didn't have a friend named younghee. It was just the four of us." },
  { w: "Jun", t: "she used to play hide and seek with us. she was always it, then she'd sing the same flower song as the one in that video. don't any of you remember?" },
  { w: "Jun", voice: "audio/voice.wav" },
  { w: "Soonyoung", t: "what the fuck. im just gonna go ask my mom about this. BRB." },

  // ---------- SCENE 4 ----------
  { search: "Younghee. Year 2004." },
  { search: "Younghee. Seoul. Year 2004." },
  { search: "Younghee. Seoul. Year 2004. Missing.", laugh: "audio/laugh.wav" },
  { w: "Soonyoung", t: "i asked my mom about the show we used to watch at that house." },
  { w: "Soonyoung", t: "she said we never watched tv shows." },
  { w: "Soonyoung", t: "instead every evening, the four of us would just sit in total silence in front of a dead tv showing nothing but static for three whole hours, staring blankly at the screen without blinking." },
  { pause: 2500 },
  { w: "Jihoon", file: "images/reflection.jpeg", size: "1.8 MB", id: "refl" },   // stays in the chat until the reader taps it
  { finale: "YOU REMEMBER ME NOW", image: "images/reflection.jpeg", after: "refl" }
];
