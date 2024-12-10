class PageManager {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 24;
        this.pageContainer = document.getElementById('pageContainer');
        this.pages = {
            1: new Page1(),
            2: new Page2(),
            3: new Page3(),
            4: new Page4(),
            5: new Page5(),
            6: new Page6(),
            7: new Page7(),
            8: new Page8(),
            9: new Page9(),
            10: new Page10(),
            11: new Page11(),
            12: new Page12(),
            13: new Page13(),
            14: new Page14(),
            15: new Page15(),
            16: new Page16(),
            17: new Page17(),
            18: new Page18(),
            19: new Page19(),
            20: new Page20(),
            21: new Page21(),
            22: new Page22(),
            23: new Page23(),
            24: new Page24()
        };
        this.pageControl = null;
        this.currentAnimation = null;
        this.initDebugBox();
        this.initializePages();
    }

    initDebugBox() {
        // 创建调试框
        this.debugBox = document.createElement('div');
        this.debugBox.className = 'debug-box';
        document.body.appendChild(this.debugBox);
        this.updateDebugInfo();
    }

    updateDebugInfo() {
        if (this.debugBox) {
            this.debugBox.innerHTML = `Page: <span class="page-number">${this.currentPage}</span> / ${this.totalPages}`;
        }
    }

    initializePages() {
        // 清空容器
        this.pageContainer.innerHTML = '';
        
        // 初始化所有页面
        const pageClasses = {
            1: Page1,
            2: Page2,
            3: Page3,
            4: Page4,
            5: Page5,
            6: Page6,
            7: Page7,
            8: Page8,
            9: Page9,
            10: Page10,
            11: Page11,
            12: Page12,
            13: Page13,
            14: Page14,
            15: Page15,
            16: Page16,
            17: Page17,
            18: Page18,
            19: Page19,
            20: Page20,
            21: Page21,
            22: Page22,
            23: Page23,
            24: Page24
        };

        // 创建页面实例
        Object.entries(pageClasses).forEach(([pageNum, PageClass]) => {
            this.pages[pageNum] = new PageClass();
            // 先隐藏所有页面
            this.pages[pageNum].element.style.display = 'none';
            this.pageContainer.appendChild(this.pages[pageNum].element);
        });

        // 显示第一页
        this.showPage(1);
    }

    async showPage(pageNumber) {
        const currentPageObj = this.pages[this.currentPage];
        const nextPageObj = this.pages[pageNumber];

        if (!nextPageObj) {

            console.error(`Page ${pageNumber} not found`);
            return;
        }

        // 直接隐藏当前页面
        if (currentPageObj) {
            currentPageObj.hide();
        }

        // 直接显示新页面
        nextPageObj.show();

        this.currentPage = pageNumber;
        requestAnimationFrame(() => {
            this.updateDebugInfo();
        });
        this.updateFloatingImages(pageNumber);

    }

    updateFloatingImages(pageNumber) {
        const rightImage = document.getElementById('rightImage');
        if (pageNumber === 1) {
            rightImage.classList.add('first-page-active');
        } else {
            rightImage.classList.remove('first-page-active');
        }
    }

    setPageControl(pageControl) {
        this.pageControl = pageControl;
    }
}