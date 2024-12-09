class Page14 extends BasePage {
    constructor() {
        super(14);
        this.contentContainer = null;
        this.textContainer = null;
        this.init();
    }

    init() {
        this.element.className = 'page-common page-14';
        
        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'page14Content';
        this.contentContainer.className = 'page-content';
        
        this.textContainer = document.createElement('div');
        this.textContainer.id = 'page14TextContainer';
        
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
        label.textContent = `对${BasePage.sharedData.my_name}发送了`;
        
        const numberText = document.createElement('div');
        numberText.className = 'big-number';
        numberText.textContent = '2658';
        
        const subLabel = document.createElement('div');
        subLabel.className = 'sub-label';
        subLabel.innerHTML = '个<span class="emoji-text">emoji</span>';
        
        const circleText = document.createElement('div');
        circleText.className = 'circle-text';
        circleText.innerHTML = '连起来可绕地球<span class="highlight">0.00001</span>圈';
        
        
        numberContainer.appendChild(label);
        numberContainer.appendChild(numberText);
        numberContainer.appendChild(subLabel);
        numberContainer.appendChild(circleText);
        
        this.contentContainer.appendChild(numberContainer);
        
        setTimeout(() => {
            numberText.classList.add('number-animated');
            label.classList.add('fade-in');
            subLabel.classList.add('fade-in');
            circleText.classList.add('fade-in');
        }, 100);
    }

    async showTexts() {
        // 如果需要在底部添加额外文本，可以在这里添加
    }
}

window.Page14 = Page14; 