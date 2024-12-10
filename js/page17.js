class Page17 extends BasePage {
    constructor() {
        super(17);
        this.contentContainer = null;
        this.textContainer = null;
        this.init();
    }

    init() {
        this.element.className = 'page-common page-17';
        
        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'page17Content';
        this.contentContainer.className = 'page-content';
        
        this.textContainer = document.createElement('div');
        this.textContainer.id = 'page17TextContainer';
        
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
        label.textContent = '你最长的一条消息字数';
        
        const numberText = document.createElement('div');
        numberText.className = 'big-number';
        numberText.textContent = '414';
        
        const contentLabel = document.createElement('div');
        contentLabel.className = 'content-label';
        contentLabel.textContent = '居然是学校停水通知';
        
        numberContainer.appendChild(label);
        numberContainer.appendChild(numberText);
        numberContainer.appendChild(contentLabel);
        
        this.contentContainer.appendChild(numberContainer);
        
        setTimeout(() => {
            numberText.classList.add('number-animated');
            label.classList.add('fade-in');
            contentLabel.classList.add('fade-in');
        }, 100);
    }

    async showTexts() {
        const texts = [
            { text: `让${BasePage.sharedData.my_name}`, isHighlight: false },
            { text: "笑一会儿", isHighlight: true }
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

window.Page17 = Page17; 