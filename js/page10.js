class Page10 extends BasePage {
    constructor() {
        super(10);
        this.contentContainer = null;
        this.textContainer = null;
        this.init();
    }

    init() {
        this.element.className = 'page-common page-10';
        
        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'page10Content';
        this.contentContainer.className = 'page-content';
        
        this.textContainer = document.createElement('div');
        this.textContainer.id = 'page10TextContainer';
        
        this.element.appendChild(this.contentContainer);
        this.element.appendChild(this.textContainer);
    }

    async onShow() {
        this.element.style.display = 'block';
        this.element.style.opacity = '1';
        
        this.contentContainer.innerHTML = '';
        this.textContainer.innerHTML = '';
        
        await this.showNumber();
        await this.showTexts();
    }

    onHide() {
        this.element.style.display = 'none';
        this.element.style.opacity = '0';
        this.contentContainer.innerHTML = '';
        this.textContainer.innerHTML = '';
    }

    async showNumber() {
        const numberContainer = document.createElement('div');
        numberContainer.className = 'number-display';
        
        const label = document.createElement('div');
        label.className = 'number-label';
        label.textContent = '平均每';
        
        const numberText = document.createElement('div');
        numberText.className = 'big-number';
        numberText.textContent = '1.55';
        
        const subLabel = document.createElement('div');
        subLabel.className = 'sub-label';
        subLabel.textContent = '条消息收到回复';
        
        numberContainer.appendChild(label);
        numberContainer.appendChild(numberText);
        numberContainer.appendChild(subLabel);
        
        this.contentContainer.appendChild(numberContainer);
        
        // 添加动画类
        setTimeout(() => {
            numberText.classList.add('number-animated');
            label.classList.add('fade-in');
            subLabel.classList.add('fade-in');
        }, 100);
    }

    async showTexts() {
        const texts = [
            { text: "反馈", isHighlight: true },
            { text: "及时", isHighlight: false },
        ];
        
        texts.forEach(textConfig => {
            const textDiv = document.createElement('div');
            textDiv.className = 'text-line';
            
            if (textConfig.isHighlight) {
                const span = document.createElement('span');
                span.className = 'highlight';
                span.textContent = textConfig.text;
                textDiv.appendChild(span);
            } else {
                textDiv.textContent = textConfig.text;
            }
            
            this.textContainer.appendChild(textDiv);
        });
    }
}

window.Page10 = Page10; 