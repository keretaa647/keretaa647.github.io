document.addEventListener("DOMContentLoaded", () => {
    // Reveal elements on scroll using IntersectionObserver
    const reveals = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before making it into viewport
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Stop observing once it's revealed
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Handle Cover & Music
    const btnOpen = document.getElementById("btn-open");
    const cover = document.getElementById("cover");
    const bgMusic = document.getElementById("bg-music");
    const musicPlayer = document.getElementById("music-player");
    const musicBtn = document.getElementById("music-btn");
    const musicIcon = document.getElementById("music-icon");
    let isPlaying = false;

    // Open Invitation Handling
    btnOpen.addEventListener("click", () => {
        // Slide up the cover
        cover.classList.add("opened");
        
        // Allow body scroll
        document.body.style.overflow = "auto";
        document.body.classList.add("allow-scroll");

        // Show music player
        setTimeout(() => {
            musicPlayer.classList.remove("hidden");
        }, 1000); // Show after cover is mostly gone
        
        // Ensure volume starts gracefully (fade in audio optional, sticking to simple play here)
        bgMusic.volume = 0.6;
        
        // Play music (Must be triggered by user interaction)
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add("playing");
        }).catch(err => {
            console.log("Audio autoplay was prevented or failed.", err);
        });
    });

    // Music Player Toggle
    musicBtn.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove("playing");
            musicIcon.classList.remove("fa-compact-disc");
            musicIcon.classList.add("fa-pause"); // Changed icon to pause style logically, or play
            // Actually, if it's paused, it should show a play icon so the user knows they can play it.
            // But let's stick to simple rotation for visual cue.
            musicIcon.className = "fa-solid fa-volume-xmark";
        } else {
            bgMusic.play();
            musicBtn.classList.add("playing");
            musicIcon.className = "fa-solid fa-compact-disc";
        }
        isPlaying = !isPlaying;
    });

    // Slideshow Logic
    let slideIndex = 0;
    const showSlides = () => {
        let slides = document.getElementsByClassName("slide");
        if (slides.length === 0) return;
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        slides[slideIndex-1].style.display = "block";  
        setTimeout(showSlides, 3500); // Change image every 3.5 seconds
    };
    showSlides();
});
