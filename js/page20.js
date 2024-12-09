class Page20 extends BasePage {
    constructor() {
        super(20);
        this.contentContainer = null;
        this.textContainer = null;
        this.imageContainer = null;
        this.init();
    }

    init() {
        this.element.className = 'page-common page-20';
        
        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'page20Content';
        this.contentContainer.className = 'page-content';
        
        this.textContainer = document.createElement('div');
        this.textContainer.id = 'page20TextContainer';
        
        this.imageContainer = document.createElement('div');
        this.imageContainer.id = 'page20ImageContainer';
        
        this.element.appendChild(this.contentContainer);
        this.element.appendChild(this.textContainer);
        this.element.appendChild(this.imageContainer);
    }

    async onShow() {
        this.element.style.display = 'block';
        this.element.style.opacity = '1';
        
        this.contentContainer.innerHTML = '';
        this.textContainer.innerHTML = '';
        this.imageContainer.innerHTML = '';
        
        await this.showMainContent();
        await this.showImage();
    }

    onHide() {
        this.element.style.display = 'none';
        this.element.style.opacity = '0';
        this.contentContainer.innerHTML = '';
        this.textContainer.innerHTML = '';
        this.imageContainer.innerHTML = '';
    }

    async showMainContent() {
        const contentContainer = document.createElement('div');
        contentContainer.className = 'story-container';
        
        const dateLabel = document.createElement('div');
        dateLabel.className = 'date-label';
        dateLabel.textContent = '12月04日';
        
        const mainText = document.createElement('div');
        mainText.className = 'main-text';
        mainText.textContent = `${BasePage.sharedData.my_name}收到了你的礼物`;
        
        const subText = document.createElement('div');
        subText.className = 'sub-text';
        subText.textContent = '是一只快乐的小猪';
        
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

    async showImage() {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'pig-image-wrapper';
        
        const image = document.createElement('img');
        image.src = 'resource/pig.jpg';  // 需要准备一张可爱的小猪图片
        image.alt = '快乐的小猪';
        image.className = 'pig-image';
        
        imageWrapper.appendChild(image);
        this.imageContainer.appendChild(imageWrapper);
        
        setTimeout(() => {
            imageWrapper.classList.add('fade-in');
        }, 500);  // 延迟显示图片，让文字先出现
    }
}

window.Page20 = Page20; 