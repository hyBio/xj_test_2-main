class Page23 extends BasePage {
    constructor() {
        super(23);
        this.init();
    }

    init() {
        this.element.className = 'page-common page-23';
        
        // 创建内容容器
        const contentContainer = document.createElement('div');
        contentContainer.className = 'content-container';
        
        // 创建文本容器
        this.textContainer = document.createElement('div');  // 保存为实例属性
        this.textContainer.className = 'text-container';
        
        contentContainer.appendChild(this.textContainer);
        this.element.appendChild(contentContainer);
    }

    onShow() {
        this.element.style.display = 'block';
        this.element.style.opacity = '1';
        
        // 清空之前的内容
        this.textContainer.innerHTML = '';
        
        // 动态创建文本
        const texts = [
            {text: `看看`, isHighlight: false},
            {text: `${BasePage.sharedData.my_name}`, isHighlight: true},
            {text: `给你准备了什么`, isHighlight: false}
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
            
            this.textContainer.appendChild(textDiv);
        });
    }

    onHide() {
        this.element.style.display = 'none';
        this.element.style.opacity = '0';
        this.textContainer.innerHTML = '';  // 清空内容
    }
}

window.Page23 = Page23; 