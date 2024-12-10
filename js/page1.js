class Page1 extends BasePage {
    constructor() {
        super(1);
        this.init();
    }

    init() {
        this.element.innerHTML = `
            <div class="title-container">
                <div class="main-title">2024年度小秀杰</div>
                <div class="sub-title">微信聊天分析报告</div>
            </div>
        `;
    }
}