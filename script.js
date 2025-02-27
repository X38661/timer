// 获取DOM元素
const timeDisplay = document.querySelector('.time-display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timerContainer = document.querySelector('.timer');

// 计时器变量
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// 格式化时间显示
function formatTime(timeInMilliseconds) {
    // 计算小时、分钟、秒和毫秒
    const hours = Math.floor(timeInMilliseconds / 3600000);
    const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10);

    // 格式化为 HH:MM:SS.MS
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

// 更新计时器显示
function updateDisplay() {
    const currentTime = isRunning ? Date.now() - startTime + elapsedTime : elapsedTime;
    timeDisplay.textContent = formatTime(currentTime);
}

// 开始计时
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10); // 每10毫秒更新一次
        
        // 切换按钮显示
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'flex';
        
        // 添加运行中的动画类
        timerContainer.classList.add('running');
    }
}

// 暂停计时
function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        
        // 切换按钮显示
        startBtn.style.display = 'flex';
        pauseBtn.style.display = 'none';
        
        // 移除运行中的动画类
        timerContainer.classList.remove('running');
    }
}

// 重置计时器
function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    updateDisplay();
    
    // 确保开始按钮显示
    startBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
    
    // 移除运行中的动画类
    timerContainer.classList.remove('running');
}

// 添加事件监听器
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// 初始化显示
updateDisplay();

// 添加键盘快捷键
document.addEventListener('keydown', (e) => {
    // 空格键开始/暂停
    if (e.code === 'Space') {
        e.preventDefault(); // 防止页面滚动
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    }
    
    // R键重置
    if (e.code === 'KeyR') {
        resetTimer();
    }
});

// 添加页面可见性变化监听，当用户切换标签页时暂停计时
document.addEventListener('visibilitychange', () => {
    if (document.hidden && isRunning) {
        // 保存当前状态并暂停
        pauseTimer();
    }
}); 