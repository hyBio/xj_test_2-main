class Page19 extends BasePage {
    constructor() {
        super(19);
        this.contentContainer = null;
        this.textContainer = null;
        this.init();
    }

    init() {
        this.element.className = 'page-common page-19';
        
        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'page19Content';
        this.contentContainer.className = 'page-content';
        
        this.textContainer = document.createElement('div');
        this.textContainer.id = 'page19TextContainer';
        
        this.element.appendChild(this.contentContainer);
        this.element.appendChild(this.textContainer);
    }

    async onShow() {
        this.element.style.display = 'block';
        this.element.style.opacity = '1';
        
        this.contentContainer.innerHTML = '';
        this.textContainer.innerHTML = '';
        
        await this.showMainContent();
        await this.showTexts();
    }

    onHide() {
        this.element.style.display = 'none';
        this.element.style.opacity = '0';
        this.contentContainer.innerHTML = '';
        this.textContainer.innerHTML = '';
    }

    async showMainContent() {
        const contentContainer = document.createElement('div');
        contentContainer.className = 'story-container';
        
        const dateLabel = document.createElement('div');
        dateLabel.className = 'date-label';
        dateLabel.textContent = '10月11日';
        
        const mainText = document.createElement('div');
        mainText.className = 'main-text';
        mainText.textContent = '你们聊到了很晚';
        
        const subText = document.createElement('div');
        subText.className = 'sub-text';
        subText.textContent = '看起来是个有趣的故事';
        
        contentContainer.appendChild(dateLabel);
        contentContainer.appendChild(mainText);
        contentContainer.appendChild(subText);
        
        this.contentContainer.appendChild(contentContainer);
        
        setTimeout(() => {
            dateLabel.classList.add('fade-in');
            mainText.classList.add('fade-in');
            subText.classList.add('fade-in');
        }, 100);
    }

    async showTexts() {
        const texts = [
            { text: "原来是有人", isHighlight: false },
            { text: "先睡着了", isHighlight: true }
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

window.Page19 = Page19; 