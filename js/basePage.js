class BasePage {
    static sharedData = {
        my_name: '哥哥'  // 默认值
    };

    constructor(pageNumber) {
        this.element = document.createElement('div');
        this.element.className = `page-common page-${pageNumber}`;
        this.pageNumber = pageNumber;
    }

    async show() {
        // 先设置display为block但opacity为0
        this.element.style.display = 'block';
        this.element.style.opacity = '0';
        
        // 等待一帧以确保初始状态被应用
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        // 添加过渡效果
        this.element.style.transition = 'opacity 2s ease';
        
        // 触发渐变显示
        this.element.style.opacity = '1';
        
        // 等待过渡完成
        await new Promise(resolve => {
            const transitionEnd = () => {
                this.element.removeEventListener('transitionend', transitionEnd);
                resolve();
            };
            this.element.addEventListener('transitionend', transitionEnd);
        });
        
        // 调用onShow回调
        this.onShow && await this.onShow();
    }

    async hide() {
        // 添加过渡效果
        this.element.style.transition = 'opacity 2s ease';
        
        // 触发渐变隐藏
        this.element.style.opacity = '0';
        
        // 等待过渡完成
        await new Promise(resolve => {
            const transitionEnd = () => {
                this.element.removeEventListener('transitionend', transitionEnd);
                this.element.style.display = 'none';
                resolve();
            };
            this.element.addEventListener('transitionend', transitionEnd);
        });
        
        // 调用onHide回调
        this.onHide && await this.onHide();
    }

    resetElements() {
        // 子类可以重写此方法来重置特定元素
    }
} 