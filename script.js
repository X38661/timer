class Timer {
    constructor() {
        this.isRunning = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.intervalId = null;
        
        // 获取DOM元素
        this.display = document.querySelector('.time-display');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        
        // 初始状态
        this.pauseBtn.style.display = 'none';
        
        // 绑定事件
        this.startBtn.addEventListener('click', () => this.startTimer());
        this.pauseBtn.addEventListener('click', () => this.pauseTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
    }

    startTimer() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = Date.now() - this.elapsedTime;
            this.intervalId = setInterval(() => this.updateDisplay(), 10);
            this.startBtn.style.display = 'none';
            this.pauseBtn.style.display = 'flex';
        }
    }

    pauseTimer() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.intervalId);
            this.elapsedTime = Date.now() - this.startTime;
            this.startBtn.style.display = 'flex';
            this.pauseBtn.style.display = 'none';
        }
    }

    resetTimer() {
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.elapsedTime = 0;
        this.updateDisplay();
        this.startBtn.style.display = 'flex';
        this.pauseBtn.style.display = 'none';
        
        // 添加重置动画效果
        this.display.style.animation = 'none';
        this.display.offsetHeight; // 触发重排
        this.display.style.animation = 'pulse 2s infinite ease-in-out';
    }

    updateDisplay() {
        const currentTime = this.isRunning ? Date.now() - this.startTime : this.elapsedTime;
        const hours = Math.floor(currentTime / 3600000);
        const minutes = Math.floor((currentTime % 3600000) / 60000);
        const seconds = Math.floor((currentTime % 60000) / 1000);
        const milliseconds = Math.floor((currentTime % 1000) / 10); // 取毫秒的前两位
        
        this.display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    }
}

// 初始化计时器
const timer = new Timer(); 