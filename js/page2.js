class Page2 extends BasePage {
    constructor() {
        super(2);
        this.my_name = '';
        this.init();
    }

    init() {
        this.element.innerHTML = `
            <div class="input-container">
                <input type="text" class="input-field" placeholder="作者希望你称呼他？" maxlength="20">
                <div class="error-message">请输入称呼</div>
                <button class="start-button" title="点击开启您的专属报告">开启报告</button>
            </div>
        `;
        this.bindEvents();
    }

    bindEvents() {
        const input = this.element.querySelector('.input-field');
        const button = this.element.querySelector('.start-button');
        const errorMsg = this.element.querySelector('.error-message');

        if (!input || !button || !errorMsg) {
            console.error('页面元素初始化失败');
            return;
        }

        button.addEventListener('click', (e) => this.handleButtonClick(e, input, errorMsg));
        input.addEventListener('input', () => this.handleInput(input, errorMsg));
        input.addEventListener('keypress', (e) => this.handleKeyPress(e, button));
    }

    resetElements() {
        const input = this.element.querySelector('.input-field');
        const errorMsg = this.element.querySelector('.error-message');
        
        if (input) {
            input.value = '';
            input.classList.remove('shake');
        }
        if (errorMsg) {
            errorMsg.classList.remove('show');
        }
    }

    handleButtonClick(e, input, errorMsg) {
        e.preventDefault();  // 阻止事件冒泡
        e.stopPropagation();
        
        const value = input.value.trim();
        if (value === '') {
            errorMsg.classList.add('show');
            input.classList.add('shake');
            input.focus();
            // 震动反馈
            if (window.navigator.vibrate) {
                window.navigator.vibrate(200);
            }
            // 移除抖动动画类和错误提示
            setTimeout(() => {
                input.classList.remove('shake');
                errorMsg.classList.remove('show');
            }, 1200);
            return;
        }
        
        BasePage.sharedData.my_name = value;  // 设置共享数据
        
        // 添加淡出动画
        this.element.classList.add('fade-out');
        
        // 切换到下一页
        if (window.pageManager) {
            setTimeout(() => {
                window.pageManager.showPage(3);
                // 重置淡出动画类
                this.element.classList.remove('fade-out');
                // 重置输入框
                input.value = '';
            }, 2000);
        }
    }

    handleInput(input, errorMsg) {
        errorMsg.classList.remove('show');
        input.classList.remove('shake');
        const value = input.value.trim();
        if (value) {
            BasePage.sharedData.my_name = value;  // 更新共享数据
            // 显示开始按钮
            const button = this.element.querySelector('.start-button');
            if (button) {
                button.style.display = 'block';
                button.style.opacity = '1';
            }
        } else {
            BasePage.sharedData.my_name = '哥哥';  // 如果清空输入，恢复默认值
            // 隐藏开始按钮
            const button = this.element.querySelector('.start-button');
            if (button) {
                button.style.display = 'none';
                button.style.opacity = '0';
            }
        }
    }

    handleKeyPress(e, button) {
        if (e.key === 'Enter') {
            e.preventDefault();
            button.click();
        }
    }

    showContent() {
        // ... 其他代码
        const my_name = "秀杰";  // 或者从其他地方获取
        BasePage.sharedData.my_name = my_name;  // 保存到共享数据中
        // ... 其他代码
    }
} 