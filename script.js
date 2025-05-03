const ranks = [
    { name: "Unranked", url: "ranks/Unknown.webp" },
    { name: "Bronze", url: "ranks/Bronze.webp" },
    { name: "Silver", url: "ranks/Silver.webp" },
    { name: "Gold", url: "ranks/Gold.webp" },
    { name: "Platinum", url: "ranks/Platinum.webp" },
    { name: "Diamond", url: "ranks/Diamond.webp" },
    { name: "Elite", url: "ranks/Elite.webp" },
    { name: "Champion", url: "ranks/Champion.webp" },
    { name: "Unreal", url: "ranks/Unreal.webp" },
];

let videos = [
    {
        url: "https://www.youtube.com/watch?v=j_Wq_xObKbw",
        start: 0,
        end: 0,
        rank: "Unreal",
        format: "16by9",
    }
]
let currentVideoIndex = 0;

const rankSelect = document.getElementById("startScreenContentImg");

function changeRank() {
    const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
    const rankImg = document.createElement("img");
    rankImg.src = randomRank.url;
    rankImg.alt = randomRank.name;
    rankImg.className = "rankImage";

    rankSelect.appendChild(rankImg);

    setTimeout(() => {
        rankSelect.removeChild(rankImg);
    }, 4000);
}

setInterval(() => {
    changeRank();
}, 4000);
changeRank();

document.getElementById("startButton").addEventListener("click", () => {
    const startScreen = document.getElementById("startScreen");
    startScreen.classList.add("fade-out");

    setTimeout(() => {
        startScreen.style.display = "none";
        showVideo();
    }, 1000);
});

function showVideo() {
    const video = videos[currentVideoIndex];

    const videoId = new URL(video.url).searchParams.get("v");

    const videoContainer = document.getElementById("game");

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0&rel=0&start=${video.start || 0}&end=${video.end || 0}`;
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
    iframe.setAttribute("allowfullscreen", "");
    iframe.classList.add("res" + video.format);

    const rankImg = document.createElement("div");
    rankImg.style.backgroundImage = `url(ranks/Unknown.webp)`;
    rankImg.className = "rankImage";

    const rankName = document.createElement("div");
    rankName.className = "rankName";
    rankName.innerText = "Unranked";

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = 0;
    slider.max = ranks.length - 1;
    slider.value = 0;
    slider.className = "rankSlider";
    slider.classList.add("Unranked");


    const ueberpruefenButton = document.createElement("button");
    ueberpruefenButton.innerText = "Überprüfen";
    ueberpruefenButton.className = "ueberpruefenButton";
    ueberpruefenButton.disabled = true;
    ueberpruefenButton.addEventListener("click", () => {

        const overlay = document.createElement("div");
        overlay.className = "overlay";

        let images = [];

        //alle ranks bilder adden
        ranks.forEach(rank => {
            const rankImg = document.createElement("img");
            rankImg.src = rank.url;
            rankImg.alt = rank.name;
            rankImg.className = "rankImage";
            overlay.appendChild(rankImg);

            if (video.rank !== rank.name) {
                images.push(rankImg);
            }
        });

        setTimeout(() => {
            let i = 0;
            let delay = 100; // Anfangsgeschwindigkeit (kleiner = schneller)

            function hideNextImage() {

                const randomIndex = Math.floor(Math.random() * images.length);
                images[randomIndex].classList.add("fade-out");
                images.splice(randomIndex, 1);

                if (images.length === 0) {
                    const lastImage = overlay.querySelector(`:scope img:not(.fade-out)`);
                    if (lastImage) lastImage.classList.add("winner");
                    return;
                }

                delay *= 1.35; // Geschwindigkeit erhöhen

                setTimeout(hideNextImage, delay);
            }

            hideNextImage();
        }, 900);

        document.body.appendChild(overlay);

    });

    slider.addEventListener("input", (event) => {
        const selectedRank = ranks[event.target.value];
        rankImg.style.backgroundImage = `url(${selectedRank.url})`;
        rankName.innerText = selectedRank.name;

        slider.classList.remove(...ranks.map(rank => rank.name));
        slider.classList.add(selectedRank.name);
        ueberpruefenButton.disabled = false;
    });

    videoContainer.appendChild(rankImg);
    videoContainer.appendChild(rankName);
    videoContainer.appendChild(iframe);
    videoContainer.appendChild(slider);
    videoContainer.appendChild(ueberpruefenButton);
}