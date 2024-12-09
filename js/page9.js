class Page9 extends BasePage {
    constructor() {
        super(9);
        this.contentContainer = null;
        this.textContainer = null;
        this.init();
    }

    init() {
        this.element.className = 'page-common page-9';
        
        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'page9Content';
        this.contentContainer.className = 'page-content';
        
        this.textContainer = document.createElement('div');
        this.textContainer.id = 'page9TextContainer';
        
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
        
        // 每天互动数据
        const numberText = document.createElement('div');
        numberText.className = 'big-number';
        numberText.textContent = '584';
        
        const label = document.createElement('div');
        label.className = 'number-label';
        label.textContent = '每日收发消息';
        
        // 平均字数数据
        const avgContainer = document.createElement('div');
        avgContainer.className = 'avg-container';
        
        const avgNumber = document.createElement('div');
        avgNumber.className = 'avg-number';
        avgNumber.textContent = '7.42';
        
        const avgLabel = document.createElement('div');
        avgLabel.className = 'avg-label';
        avgLabel.textContent = '平均字数';
        
        avgContainer.appendChild(avgLabel);
        avgContainer.appendChild(avgNumber);
        
        numberContainer.appendChild(label);
        numberContainer.appendChild(numberText);
        numberContainer.appendChild(avgContainer);
        
        this.contentContainer.appendChild(numberContainer);
        
        // 添加动画类
        setTimeout(() => {
            numberText.classList.add('number-animated');
            label.classList.add('fade-in');
            avgContainer.classList.add('fade-in');
        }, 100);
    }

    async showTexts() {
        const texts = [
            { text: "千", isHighlight: true },
            { text: "言", isHighlight: false },
            { text: "万", isHighlight: true },
            { text: "语", isHighlight: false }
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

window.Page9 = Page9; 