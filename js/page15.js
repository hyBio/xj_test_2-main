class Page15 extends BasePage {
    constructor() {
        super(15);
        this.contentContainer = null;
        this.textContainer = null;
        this.init();
    }

    init() {
        this.element.className = 'page-common page-15';
        
        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'page15Content';
        this.contentContainer.className = 'page-content';
        
        this.textContainer = document.createElement('div');
        this.textContainer.id = 'page15TextContainer';
        
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
        label.textContent = `你一共对${BasePage.sharedData.my_name}扮了`;
        
        const numberText = document.createElement('div');
        numberText.className = 'big-number';
        numberText.textContent = '5544';
        
        const subLabel = document.createElement('div');
        subLabel.className = 'sub-label';
        subLabel.textContent = '次表情';
        
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
            { text: "表情包", isHighlight: true },
            { text: "才是真爱", isHighlight: false }
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

window.Page15 = Page15; 