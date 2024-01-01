document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.fireworks-container');
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const fireworks = [];

    function createFirework() {
        const firework = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            angle: Math.random() * Math.PI * 2,
        };

        firework.velX = Math.cos(firework.angle) * firework.speed;
        firework.velY = Math.sin(firework.angle) * firework.speed;

        fireworks.push(firework);
    }

    function drawFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < fireworks.length; i++) {
            const firework = fireworks[i];

            ctx.beginPath();
            ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
            ctx.fillStyle = firework.color;
            ctx.fill();

            firework.x += firework.velX;
            firework.y += firework.velY;

            if (firework.size > 0.2) {
                firework.size -= 0.1;
            } else {
                fireworks.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        for (let i = 0; i < 5; i++) {
            createFirework();
        }

        drawFireworks();
        requestAnimationFrame(animate);
    }

    animate();

    // Resize canvas on window resize
    window.addEventListener("resize", function () {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    });
});
