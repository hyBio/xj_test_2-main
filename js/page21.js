class Page21 extends BasePage {
    constructor() {
        super(21);
        this.contentContainer = null;
        this.textContainer = null;
        this.init();
    }

    init() {
        this.element.className = 'page-common page-21';
        
        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'page21Content';
        this.contentContainer.className = 'page-content';
        
        this.textContainer = document.createElement('div');
        this.textContainer.id = 'page21TextContainer';
        
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
        
        const mainText = document.createElement('div');
        mainText.className = 'main-text';
        mainText.textContent = '还有好多零食';
        
        const subText = document.createElement('div');
        subText.className = 'sub-text';
        subText.textContent = '以及一堆彩虹屁';
        
        const nameText = document.createElement('div');
        nameText.className = 'name-text';
        nameText.textContent = `${BasePage.sharedData.my_name}应该很开心`;
        
        contentContainer.appendChild(mainText);
        contentContainer.appendChild(subText);
        contentContainer.appendChild(nameText);
        
        this.contentContainer.appendChild(contentContainer);
        
        setTimeout(() => {
            mainText.classList.add('fade-in');
            subText.classList.add('fade-in');
            nameText.classList.add('fade-in');
        }, 100);
    }

    async showTexts() {
        const texts = [
            { text: `希望你和${BasePage.sharedData.my_name}能一直`, isHighlight: false },
            { text: "保持", isHighlight: true },
            { text: "这样的关系", isHighlight: false }
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

window.Page21 = Page21; 