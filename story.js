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
    { title: "Alfa Besok", body: "- Oat Milk\n- Telor 2 lusin\n- Roti shokupan (tanya jun)\n- Coke Zero\n- Sunlight strawberry?? (konfirm ke jun)\n- Garem\n- Lada\n- dada ayam" },
    { title: "June 10", body: "I don't know why I keep looking back at that day, or how you managed to anchor me when everything else was slipping away.\n Sometimes the silence in this house is unbearable, but just knowing you're somewhere out there... watching, waiting, making sure I don't forget, changes everything.\n I am so endlessly thankful to have you.\n Even when the lights flicker and I hear footsteps right outside the door, I know you're keeping me safe.\n Don't ever leave." },
    { title: "Untitled Draft (2)", body: "Tolong jangan pernah ganti parfummu, karena aku menyukai bau yang kamu tinggalkan di udara setiap kali kamu melintas di depanku.\nAku selalu berjalan sepuluh langkah di belakangmu, menjaga jarak agar kamu tidak mendengar betapa bisingnya detak jantungku.\nSuatu hari nanti, kamu pasti akan sadar bahwa tidak ada seorang pun di dunia ini yang memperhatikanmu sedetail aku.\nDan saat hari itu tiba, kamu tidak perlu mencari kemana-mana lagi, karena aku sudah ada di sana...berdiri tepat di balik pintumu." },
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
    { from: "Pledis A&R Team", color: "#1a73e8", time: "3:01 AM", subject: "RE: Track Demo Feedback - 'Spell' Revision 04", body: "Jihoon,\n\nIn general ini lagu sudah mantap, tapi manajemen ngerasa bagian bridge-nya masih kurang oke untuk dijadiin main title track. Bisa tolong aransemen ulang vokalnya sebelum besok sore ga? Kita perlu ngefix-in final stems sebelum sesi mixing sama Bumzu.\n\n- Minho", unread: true },
    { from: "Bumzu", color: "#e8710a", time: "Yesterday", subject: "Studio B Stems", body: "Hei Hoon, gua baru update multi-track buat instrumental baru di server. Coba cek track 14, udah gua otak-atik tadi synth leadnya, tapi kabarin aja kalau lu kurang sreg. Oia, kita jadi rekaman vokal tengah malam nanti?", unread: false },
    { from: "Studio Booking Admin", color: "#188038", time: "Mon", subject: "CONFIRMED: Studio A Reservation (Oct 28 - Nov 02)", body: "Your booking for Studio A (Main Mixing Suite) has been confirmed for the upcoming week. Access card required for entry after 10 PM. Please ensure all personal equipment is cleared out by the end of the slot.", unread: false },
    { from: "KOMCA Licensing", color: "#a142f4", time: "Sun", subject: "Pemberitahuan Pendaftaran Lagu: ID 10049281", body: "Kepada WOOZI Yth. (PU-08492), pendaftaran karya terbaru Anda telah berhasil diproses dan diverifikasi dalam basis data. Silakan tinjau lembar metadata terlampir untuk mengonfirmasi pembagian persentase penulis bersama.", unread: false },
    { from: "Melon Publishing", color: "#d93025", time: "Oct 20", subject: "Laporan & Pelunasan Royalti Streaming Triwulanan", body: "Laporan royalti Anda untuk Q3 sekarang sudah tersedia di portal. Transfer deposit langsung akan diproses dalam 3 hari kerja ke rekening terdaftar Anda yang berakhiran 4082.", unread: false },
    { from: "Vocal Director / Coach", color: "#12b5cb", time: "Oct 18", subject: "Guide track vocals for unit project", body: "Halo Jihoon, aku udah unggah rough guide buat lagu unit, tapi turun satu oktaf karena ga sampe nadanya ketinggian, tapi sesuaikan aja lah nanti pas rekaman beneran. HMU kalau butuh rekaman ulang.", unread: false },
    { from: "Unknown Sender", color: "#5f6368", time: "Oct 12", subject: "masih bangun ga?", body: "suara ketikan kamu kedengaran sampai ke sini. kenapa kamu selalu berhenti setiap kali jam dinding berdenting tiga kali?", unread: true }
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
  { w: "Jun", t: "eh guys, gue nemu banyak video pas lagi beresin kaset lama di loteng ortu, nemu satu yang isinya klip dari acara tv jadul yang dulu sering kita tonton bareng sepulang sekolah di rumah soonyoung. inget gak sama younghee's here?" },
  { w: "Soonyoung", t: "dapet aja luuu😂😂😂 acara itu bikin gw trauma sumpah" },
  { me: "Bentarr, acara apa? Gue gak inget ada acara tv kayak gitu." },
  { w: "Wonwoo", t: "Inget gue. Acaranya tayang di tv kabel sekitar 2004an, pas banget abis Rugrats." },
  { me: "Bentar googling dulu." },
  { search: "whats Younghee's here" },
  { me: "Gak masuk akal deh guys, gue searching sama sekali ga nemu apa-apa tentang'Younghee's Here'." },

  // ---------- SCENE 2 ----------
  { w: "Soonyoung", t: "masa si? inget bgt gw ada episode yg serem bgtt pas si younghee main sembunyi-sembunyian sambil nyanyi. tapi tiap dia nengok ke belakang, anak-anak di layar gak gerak... mereka malah berdiri pake kepala... headstand gt..." },
  { w: "Jun", t: "no gak gitu, seinget gue latarnya cuma ruangan kosong warna abu-abu. dan dia gak lagi main game, cuma berdiri sambil nyanyi lagu itu pake suara pelan berulang-ulang." },
  { w: "Soonyoung", t: "ha? enggak deh. suaranya tajem banget melengking gitu. dia kayak teriak langsung ke mikrofon sampe sakit telinga gw" },
  { w: "Jun", t: "teriak? enggak, justru kebalikannya kali. dia nyanyinya pelan banget sampe harus full-in volume tv, tapi at least bisa nyanyi lah dia." },
  { w: "Wonwoo", t: "Lah malah seinget gue dia nyanyinya kayak sambil nangis gitu. Fals parah, kayak sering kesedak napas sendiri." },
  { w: "Soonyoung", t: "brow kita beneran inget acara yang sama gak si? suara dia nyanyi bahkan kedengeran jelas banget di file video si jun tadi, dengerin aja nyaring banget itu." },
  { open: "vid1", secs: 4 },
  { me: "Guys... kalian ngomongin apa sih..." },
  { me: "Kan videonya ga ada suara?" },
  { w: "Jun", t: "ngawur kok gak ada suara? gw baru aja dengerin ulang, dia nyanyi kok di video itu" },

  // ---------- SCENE 3 ----------
  { download: "vid1" },   // tap Jun's first video -> Download popup
  { analyze: true },      // open Waveform app -> upload the video
  { upload: "Audio Analysis Result", size: "3.1 MB", id: "rec", thumb: "images/gallery/analysis.jpg" },
  { me: "Coba lihat trek audio ini deh, udah gue analisis pake Wave. Sama sekali gak ada suara, gelombang audionya garis lurus... literally 0 dB." },
  { w: "Soonyoung", t: "tapi gw beneran denger kok di mp4 itu ada suara anak cewek nyanyi 'mugunghwa kkochi pieot seumnida' di background, waitt gw cek dl analisisnya" },
  { pause: 4000 },
  { w: "Soonyoung", t: "WJAT THE FYCK JIHOON" },
  { w: "Wonwoo", t: "WTF gue barusan jatoh dari kursi????" },
  { me: "Apaan??" },
  { w: "Soonyoung", t: "stop becanda, ga lucu ya ji" },
  { me: "Apa? Ga paham gue." },
  { w: "Wonwoo", t: "Buka deh itu video yang lo kirim." },
  { open: "rec", secs: 3, video: "videos/audio_analysis.mp4", text: "Hana... Dul... Seet..." },
  { me: "SUMPAH BUKAN GUE. Sebelumnya gak kayak gitu." },
  { w: "Soonyoung", t: "nyenyenyenye fuck you" },
  { w: "Wonwoo", t: "Guys btw, Jun mana?" },
  { w: "Jun", t: "gue baru inget sesuatu... younghee itu bukan nama acara tv guys..." },
  { w: "Wonwoo", t: "Hah?" },
  { w: "Jun", t: "younghee itu cewek yang tinggal di sebelah rumah soonyoung, dia main bareng kita tiap hari pas pulang sekolah. dia ilang pertengahan 2004 sebelum kita masuk SMP" },
  { me: "Jun, kita gak punya teman namanya younghee. Dulu cuma kita berempat." },
  { w: "Jun", t: "dia sering main petak umpet bareng kita. dia selalu jadi yang jaga, trus dia nyanyiin lagu bunga yang sama kayak di video itu. lo semua gak inget?" },
  { w: "Jun", voice: "audio/voice.wav" },
  { w: "Soonyoung", t: "what the fuck. gwe mau tanya aja lah ke mama soal ini. BRB." },

  // ---------- SCENE 4 ----------
  { search: "Younghee. Tahun 2004." },
  { search: "Younghee. Seoul. Tahun 2004." },
  { search: "Younghee. Seoul. Tahun 2004. Hilang.", laugh: "audio/laugh.wav" },
  { w: "Soonyoung", t: "gw nanya ke mama soal acara yang biasa kita tonton di rumah itu." },
  { w: "Soonyoung", t: "kata beliau kita gak pernah nonton acara tv kabel apa pun. tv kabel aja ga punya." },
  { w: "Soonyoung", t: "tapi tiap sore, kita berempat cuma duduk diam total di depan tv mati yang cuma nampilin semut selama tiga jam penuh, natap layar itu tanpa kedip." },
  { pause: 2500 },
  { w: "Jihoon", file: "images/reflection.jpeg", size: "1.8 MB", id: "refl" },   // stays in the chat until the reader taps it
  { finale: "SEKARANG KALIAN INGAT AKU KAN?", image: "images/reflection.jpeg", after: "refl" }
];
