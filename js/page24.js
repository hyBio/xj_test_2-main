class Page24 extends BasePage {
    constructor() {
        super(24);
        this.init();
        this.originalBgm = document.getElementById('bgMusic');
        this.birthdayBgm = null;
        this.particles = [];
        this.initBirthdayMusic();
        this.autoFireworkInterval = null;
    }

    initBirthdayMusic() {
        this.birthdayBgm = document.createElement('audio');
        this.birthdayBgm.src = 'resource/birthday.mp3';
        this.birthdayBgm.volume = 0.5;
        document.body.appendChild(this.birthdayBgm);
    }

    init() {
        this.element.className = 'page-common page-24';
        
        // 创建内容容器
        const contentContainer = document.createElement('div');
        contentContainer.className = 'content-container';
        
        // 创建文本容器
        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';
        
        // 创建文本
        const texts = [
            {text: "Happy Birthday", isHighlight: true},
            {text: "祝亲爱的小秀杰", isHighlight: false},
            {text: "生日快乐", isHighlight: true}
        ];
        
        texts.forEach(textConfig => {
            const textDiv = document.createElement('div');
            textDiv.className = 'text-line';
            
            if (textConfig.isHighlight) {
                const highlightSpan = document.createElement('span');
                highlightSpan.className = 'highlight';
                highlightSpan.textContent = textConfig.text;
                textDiv.appendChild(highlightSpan);
            } else {
                textDiv.textContent = textConfig.text;
            }
            
            textContainer.appendChild(textDiv);
        });
        
        contentContainer.appendChild(textContainer);
        this.element.appendChild(contentContainer);

        // 创建烟花画布
        const canvas = document.createElement('canvas');
        canvas.className = 'fireworks';
        this.element.appendChild(canvas);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    async onShow() {
        this.element.style.display = 'block';
        this.element.style.opacity = '1';
        
        // 切换音乐
        this.originalBgm.pause();
        this.birthdayBgm.currentTime = 0;
        this.birthdayBgm.play();
        
        // 调整画布大小
        this.resizeCanvas();
        // 开始自动烟花效果
        this.startAutoFireworks();
    }

    onHide() {
        this.element.style.display = 'none';
        this.element.style.opacity = '0';
        
        // 恢复原背景音乐
        this.birthdayBgm.pause();
        this.originalBgm.play();
        
        // 停止烟花效果
        this.stopAutoFireworks();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    startAutoFireworks() {
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
        // 每隔一段随机时间在随机位置创建烟花
        this.autoFireworkInterval = setInterval(() => {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * (this.canvas.height * 0.6);
            this.createFirework(x, y);
        }, 800);
    }

    stopAutoFireworks() {
        cancelAnimationFrame(this.animationFrame);
        clearInterval(this.autoFireworkInterval);
        this.particles = [];
    }

    createFirework(x, y) {
        const colors = [
            '#FF69B4', // 粉红
            '#FFB6C1', // 浅粉
            '#FF1493', // 深粉
            '#FF69B4', // 热粉
            '#4169E1', // 皇家蓝
            '#1E90FF', // 道奇蓝
            '#00BFFF', // 深天蓝
            '#87CEEB', // 天蓝
            '#9370DB', // 中紫
            '#BA55D3', // 兰花紫
            '#FF00FF', // 洋红
            '#FF4500', // 橙红
            '#FFD700', // 金色
            '#FFA500'  // 橙色
        ];
        
        const mainColor = colors[Math.floor(Math.random() * colors.length)];
        const subColor = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < 60; i++) {
            const angle = (Math.PI * 2 * i) / 60;
            const velocity = 4 + Math.random() * 4;
            const color = i % 2 === 0 ? mainColor : subColor;
            
            this.particles.push({
                x,
                y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                color,
                alpha: 1,
                life: 1,
                radius: 2 + Math.random() * 2
            });
        }
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05;  // 轻微重力效果
            p.alpha *= 0.99;
            p.radius *= 0.99;

            if (p.y > this.canvas.height || 
                p.x < 0 || 
                p.x > this.canvas.width || 
                p.alpha < 0.01) {
                return false;
            }

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `${p.color}${Math.floor(p.alpha * 255).toString(16).padStart(2, '0')}`;
            this.ctx.fill();

            return true;
        });

        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    }
}

window.Page24 = Page24; 