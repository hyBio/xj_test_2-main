class Page1 extends BasePage {
    constructor() {
        super(1);
        this.init();
    }

    init() {
        this.element.innerHTML = `
            <div class="title-container">
                <div class="main-title">小秀杰的2024年</div>
                <div class="sub-title">专属数据分析报告</div>
            </div>
        `;
    }
} 