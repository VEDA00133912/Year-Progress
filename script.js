function getYearProgress() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const percent = ((now - start) / (end - start) * 100).toFixed(2);
    return { year: now.getFullYear(), percent };
}

function getBarGradient(percent) {
    if (percent < 25) return 'linear-gradient(90deg, #ff4d4d, #ff0000, #ff4d4d)';
    if (percent < 50) return 'linear-gradient(90deg, #ffb84d, #ff9900, #ffb84d)';
    if (percent < 75) return 'linear-gradient(90deg, #ffd700, #fff700, #ffd700)';
    return 'linear-gradient(90deg, #4dff4d, #00ff00, #4dff4d)';
}

window.addEventListener('load', () => {
    const progress = getYearProgress();
    const textEl = document.getElementById('progressText');
    const barEl = document.getElementById('progressBar');

    barEl.style.background = getBarGradient(progress.percent);

    let current = 0;
    const target = parseFloat(progress.percent);
    const duration = 2000;
    const startTime = performance.now();

    function animateNumber(time) {
        const elapsed = time - startTime;
        const progressRatio = Math.min(elapsed / duration, 1);
        current = (target * progressRatio).toFixed(2);
        textEl.textContent = `${progress.year} is ${current}% complete.`;
        if (progressRatio < 1) {
            requestAnimationFrame(animateNumber);
        }
    }
    requestAnimationFrame(animateNumber);

    setTimeout(() => {
        barEl.style.width = progress.percent + '%';
    }, 100);
});

// 背景描画
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];
const lineCount = 50;

for (let i = 0; i < lineCount; i++) {
    const speed = Math.random() * 2 + 1;
    const angle = Math.random() * Math.PI * 2;
    lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 100 + 50,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: '#b3ffbe'
    });
}

function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    lines.forEach(line => {
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);

        line.x += line.vx;
        line.y += line.vy;

        ctx.lineTo(line.x, line.y);
        ctx.stroke();

        // 跳ね返り判定＋角度ずらし
        if (line.x <= 0 || line.x >= canvas.width) {
            line.vx *= -1;
            const angleAdjust = (Math.random() - 0.5) * 0.3;
            const speed = Math.hypot(line.vx, line.vy);
            const newAngle = Math.atan2(line.vy, line.vx) + angleAdjust;
            line.vx = Math.cos(newAngle) * speed;
            line.vy = Math.sin(newAngle) * speed;
        }
        if (line.y <= 0 || line.y >= canvas.height) {
            line.vy *= -1;
            const angleAdjust = (Math.random() - 0.5) * 0.3;
            const speed = Math.hypot(line.vx, line.vy);
            const newAngle = Math.atan2(line.vy, line.vx) + angleAdjust;
            line.vx = Math.cos(newAngle) * speed;
            line.vy = Math.sin(newAngle) * speed;
        }
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});