class Page18 extends BasePage {
    constructor() {
        super(18);
        this.contentContainer = null;
        this.textContainer = null;
        this.init();
    }

    init() {
        this.element.className = 'page-common page-18';
        
        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'page18Content';
        this.contentContainer.className = 'page-content';
        
        this.textContainer = document.createElement('div');
        this.textContainer.id = 'page18TextContainer';
        
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
        
        const dateLabel = document.createElement('div');
        dateLabel.className = 'date-label';
        dateLabel.textContent = '07月13日';
        
        const label = document.createElement('div');
        label.className = 'number-label';
        label.textContent = `你和${BasePage.sharedData.my_name}一共发送了`;
        
        const numberText = document.createElement('div');
        numberText.className = 'big-number';
        numberText.textContent = '2402';
        
        const subLabel = document.createElement('div');
        subLabel.className = 'sub-label';
        subLabel.textContent = '条消息';
        
        numberContainer.appendChild(dateLabel);
        numberContainer.appendChild(label);
        numberContainer.appendChild(numberText);
        numberContainer.appendChild(subLabel);
        
        this.contentContainer.appendChild(numberContainer);
        
        setTimeout(() => {
            dateLabel.classList.add('fade-in');
            numberText.classList.add('number-animated');
            label.classList.add('fade-in');
            subLabel.classList.add('fade-in');
        }, 100);
    }

    async showTexts() {
        const texts = [
            { text: "那天", isHighlight: false },
            { text: "发生", isHighlight: true },
            { text: "了什么", isHighlight: false }
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

window.Page18 = Page18; 