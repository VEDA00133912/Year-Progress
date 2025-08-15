function getYearProgress() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const percent = ((now - start) / (end - start) * 100).toFixed(2);
    return { year: now.getFullYear(), percent };
}

function getBarGradient(percent) {
    if (percent < 25) 
        return 'linear-gradient(90deg, #ff4d4d, #ff0000, #ff4d4d)';
    if (percent < 50) 
        return 'linear-gradient(90deg, #ffb84d, #ff9900, #ffb84d)';
    if (percent < 75) 
        return 'linear-gradient(90deg, #ffd700, #fff700, #ffd700)';
    return 'linear-gradient(90deg, #4dff4d, #00ff00, #4dff4d)';
}

window.addEventListener('load', () => {
    const progress = getYearProgress();
    const textEl = document.getElementById('progressText');
    const barEl = document.getElementById('progressBar');

    textEl.textContent = `${progress.year} is ${progress.percent}% complete.`;
    barEl.style.background = `${getBarGradient(progress.percent)}, linear-gradient(90deg, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) 75%)`;

    setTimeout(() => {
        barEl.style.width = progress.percent + '%';
    }, 100);
});