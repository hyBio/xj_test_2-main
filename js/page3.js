class Page3 extends BasePage {
    constructor() {
        super(3);
        this.init();
    }

    init() {
        this.element.className = 'page-common page-3';
        this.element.innerHTML = `
            <div class="page-content">
                <div class="text-container"></div>
            </div>
        `;
    }

    onShow() {
        this.element.classList.add('active');
        const textContainer = this.element.querySelector('.text-container');
        textContainer.innerHTML = `
            <div class="text-line">Hi~</div>
            <div class="text-line">小<span class="highlight">秀杰</span></div>
            <div class="text-line">我是${BasePage.sharedData.my_name}</div>
            <div class="text-line">快来一起看看吧!</div>
        `;
    }

    resetElements() {
        // 不需要重置文本状态
    }

    async showText() {
        const texts = [
            { text: BasePage.sharedData.my_name, isHighlight: true },
            { text: "，你的专属报告来了", isHighlight: false }
        ];
        
        // ... 其他代码保持不变
    }
} 