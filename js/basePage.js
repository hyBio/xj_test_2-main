class BasePage {
    static sharedData = {
        my_name: '哥哥'  // 默认值
    };

    constructor(pageNumber) {
        this.element = document.createElement('div');
        this.element.className = `page-common page-${pageNumber}`;
        this.pageNumber = pageNumber;
    }

    show() {
        this.element.style.display = 'block';
        this.element.style.opacity = '1';
        this.onShow && this.onShow();
    }

    hide() {
        this.element.style.display = 'none';
        this.element.style.opacity = '0';
        this.resetElements();
        this.onHide && this.onHide();
    }

    resetElements() {
        // 子类可以重写此方法来重置特定元素
    }
} 