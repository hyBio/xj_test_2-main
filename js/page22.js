class Page22 extends BasePage {
    constructor() {
        super(22);
        this.contentContainer = null;
        this.textContainer = null;
        this.init();
    }

    init() {
        this.element.className = 'page-common page-22';
        
        // 创建内容容器
        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'page22Content';
        this.contentContainer.className = 'page-content';
        
        // 创建画布容器
        const canvasContainer = document.createElement('div');
        canvasContainer.style.position = 'absolute';
        canvasContainer.style.top = '10%';
        canvasContainer.style.bottom = '20%';
        canvasContainer.style.left = '5%';
        canvasContainer.style.right = '5%';
        
        const canvas = document.createElement('canvas');
        canvas.id = 'wordCloudCanvas';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvasContainer.appendChild(canvas);
        this.contentContainer.appendChild(canvasContainer);
        
        // 创建文本容器
        this.textContainer = document.createElement('div');
        this.textContainer.id = 'page22TextContainer';
        
        // 直接显示文本
        const texts = [
            {text: "这些话，", isHighlight: false},
            {text: "反复来到", isHighlight: true}
        ];
        
        texts.forEach(textConfig => {
            const textDiv = document.createElement('div');
            textDiv.className = 'text-line';
            
            if (textConfig.isHighlight) {
                const highlightSpan = document.createElement('span');
                highlightSpan.className = 'highlight';
                highlightSpan.textContent = textConfig.text;
                textDiv.appendChild(highlightSpan);
            } else {
                textDiv.textContent = textConfig.text;
            }
            
            this.textContainer.appendChild(textDiv);
        });
        
        this.element.appendChild(this.textContainer);
        this.element.appendChild(this.contentContainer);
    }

    async onShow() {
        this.element.style.display = 'block';
        this.element.style.opacity = '1';
        
        await this.drawWordCloud();
    }

    onHide() {
        this.element.style.display = 'none';
        this.element.style.opacity = '0';
    }

    async drawWordCloud() {
        // 频数据
        const words = [["时候",953],["消息",784],["撤回",739],["感觉",686],["应该",643],["可能",598],["老师",563],["还有",483],["不会",459],["好像",431],["确实",410],["有点",397],["觉得",397],["睡觉",396],["哦哦哦",387],["不能",384],["秀杰",378],["问题",374],["喜欢",370],["出来",345],["事情",325],["肯定",307],["开始",294],["起来",294],["看看",281],["需要",259],["没事",257],["晚安",253],["学习",252],["看到",239],["直接",231],["好看",224],["下班",214],["时间",213],["发现",212],["学生",205],["学校",204],["吃饭",199],["一般",199],["不行",198],["师弟",189],["宿舍",174],["视频",174],["大家",170],["聊天",169],["办公室",164],["师姐",159],["东西",158],["博士",156],["毕业",156],["女孩子",152],["表情",151],["回来",149],["不了",147],["理解",146],["姐姐",139],["厉害",138],["继续",138],["孩子",138],["休息",137],["女生",136],["武汉",133],["加油",133],["师妹",130],["属于",128],["不错",127],["男孩子",126],["玩儿",124],["洗漱",124],["不想",123],["哥哥",122],["容易",121],["打算",121],["工作",120],["不用",120],["影响",119],["有没有",118],["手机",118],["同学",117],["认",117],["记得",116],["地方",116],["出去",113],["男生",112],["开心",111],["不到",111],["回去",110],["师兄",109],["关系",107],["李秀杰",106],["室友",103],["估计",103],["还好",101],["朋友",100],["小时",100]];  // 这里放完整的词频数据
        
        const canvas = document.getElementById('wordCloudCanvas');
        const containerWidth = canvas.parentElement.clientWidth;
        const containerHeight = canvas.parentElement.clientHeight;
        
        canvas.width = containerWidth;
        canvas.height = containerHeight;
        
        const colors = [
            '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', 
            '#00FFFF', '#0000FF', '#8B00FF', '#FF1493',
            '#FF69B4', '#FFB6C1', '#4169E1', '#1E90FF',
            '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C'
        ];
        
        let wordIndex = 0;  // 用于跟踪当前绘制的词的索引
        
        const options = {
            list: words,
            gridSize: 4,
            weightFactor: size => Math.pow(size, 0.35) * 5,
            fontFamily: 'sans-serif',
            color: (word, weight) => {
                return colors[Math.floor(Math.random() * colors.length)];
            },
            rotateRatio: 0.5,  // 增加旋转概率
            rotationSteps: 8,   // 增加旋转步数
            backgroundColor: 'transparent',
            wait: 20,  // 每个词之间等待20ms
            shape: 'square',
            drawOutOfBound: false,
            shrinkToFit: true,
            clearCanvas: true,
            minSize: 12,
            shuffle: true,  // 启用随机排列
            fontWeight: 'bold',
            classes: word => 'word-item',
            // 添加每个词的绘制回调
            afterWordRender: (item) => {
                const word = item.item[0];
                const element = item.info.el;
                if (element) {
                    element.style.transition = 'all 0.5s ease-out';
                    element.style.opacity = '0';
                    element.style.transform = 'scale(0.1) rotate(180deg)';
                    
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'scale(1) rotate(0deg)';
                    }, 50);
                }
                wordIndex++;
            }
        };

        // 添加CSS样式
        const style = document.createElement('style');
        style.textContent = `
            .word-item {
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .word-item:hover {
                transform: scale(1.2) !important;
                text-shadow: 0 0 10px currentColor;
            }
        `;
        document.head.appendChild(style);

        // 绘制词云
        WordCloud(canvas, options);
    }
}

window.Page22 = Page22; 