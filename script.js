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
});