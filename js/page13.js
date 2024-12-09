class Page13 extends BasePage {
    constructor() {
        super(13);
        this.contentContainer = null;
        this.init();
    }

    init() {
        this.element.className = 'page-common page-13';
        
        this.contentContainer = document.createElement('div');
        this.contentContainer.className = 'text-container';
        
        this.element.appendChild(this.contentContainer);
    }

    async onShow() {
        this.element.style.display = 'block';
        this.element.style.opacity = '1';
        
        this.contentContainer.innerHTML = '';
        await this.showText();
    }

    onHide() {
        this.element.style.display = 'none';
        this.element.style.opacity = '0';
        this.contentContainer.innerHTML = '';
    }

    async showText() {
        const texts = [
            { text: "看看", isHighlight: true },
            { text: "都在聊什么", isHighlight: false }
        ];
        
        const textContainer = document.createElement('div');
        textContainer.className = 'transition-text';
        
        texts.forEach(textConfig => {
            const textSpan = document.createElement('span');
            
            if (textConfig.isHighlight) {
                textSpan.className = 'highlight';
            }
            
            textSpan.textContent = textConfig.text;
            textContainer.appendChild(textSpan);
        });
        
        this.contentContainer.appendChild(textContainer);
        
        setTimeout(() => {
            textContainer.classList.add('fade-in');
        }, 100);
    }
}

window.Page13 = Page13; 