class Page16 extends BasePage {
    constructor() {
        super(16);
        this.contentContainer = null;
        this.textContainer = null;
        this.init();
    }

    init() {
        this.element.className = 'page-common page-16';
        
        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'page16Content';
        this.contentContainer.className = 'page-content';
        
        this.textContainer = document.createElement('div');
        this.textContainer.id = 'page16TextContainer';
        
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
        label.innerHTML = '你最爱的emoji是捂脸';
        
        const numberText = document.createElement('div');
        numberText.className = 'big-number';
        numberText.textContent = '958';
        
        const subLabel = document.createElement('div');
        subLabel.className = 'sub-label';

        numberContainer.appendChild(label);
        numberContainer.appendChild(numberText);
        numberContainer.appendChild(subLabel);
        
        this.contentContainer.appendChild(numberContainer);
        
        setTimeout(() => {
            numberText.classList.add('number-animated');
            label.classList.add('fade-in');
            subLabel.classList.add('fade-in');
        }, 100);
    }

    async showTexts() {
        const texts = [
            { text: BasePage.sharedData.my_name, isHighlight: true, isEmoji: true }
        ];
        
        texts.forEach(textConfig => {
            const textDiv = document.createElement('div');
            textDiv.className = 'text-line';
            
            if (textConfig.isHighlight) {
                const span = document.createElement('span');
                span.className = 'highlight';
                if (textConfig.isEmoji) {
                    span.innerHTML = '<img src="resource/wulian.gif" class="emoji-icon">';
                } else {
                    span.textContent = textConfig.text;
                }
                textDiv.appendChild(span);
            } else {
                textDiv.textContent = textConfig.text;
            }
            
            this.textContainer.appendChild(textDiv);
        });
    }
}

window.Page16 = Page16; 