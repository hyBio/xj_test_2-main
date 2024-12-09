class Page6 extends BasePage {
    constructor() {
        super(6);
        this.contentContainer = null;
        this.textContainer = null;
        this.init();
    }

    init() {
        this.element.className = 'page-common page-6';
        
        // 创建内容容器
        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'mainContent';
        this.contentContainer.className = 'page-content';
        
        // 创建文本容器
        this.textContainer = document.createElement('div');
        this.textContainer.id = 'page6TextContainer';
        
        this.element.appendChild(this.contentContainer);
        this.element.appendChild(this.textContainer);
    }

    async onShow() {
        this.element.style.display = 'block';
        this.element.style.opacity = '1';
        
        this.contentContainer.innerHTML = '';
        this.textContainer.innerHTML = '';  // 清空之前的文本
        
        // 创建文本
        const texts = [
            {text: "148", isHighlight: true},
            {text: "天被填满", isHighlight: false}
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
        
        await this.drawBoxes();
    }

    onHide() {
        this.element.style.display = 'none';
        this.element.style.opacity = '0';
        
        // 清理内容
        this.contentContainer.innerHTML = '';
        this.textContainer.innerHTML = '';
    }

    async drawBoxes() {
        const dateValueMap = await this.getDateValueMap();
        const colorScale = this.createColorScale(dateValueMap);
        
        const { width, height, boxSize, gap, cols, rows, offsetX } = this.calculateLayout();
        const svg = this.createSvg(width, height);
        const group = this.createBoxGroup(svg, width, height);
        
        await this.drawAllBoxes(group, dateValueMap, colorScale, boxSize, gap, cols);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getDateValueMap() {
        // 直接返回内嵌的数据
        const data = [{"date":"2024-07-06","count":144},{"date":"2024-07-07","count":829},{"date":"2024-07-08","count":923},{"date":"2024-07-09","count":997},{"date":"2024-07-10","count":1052},{"date":"2024-07-11","count":1362},{"date":"2024-07-12","count":956},{"date":"2024-07-13","count":2443},{"date":"2024-07-14","count":1091},{"date":"2024-07-15","count":1359},{"date":"2024-07-16","count":1117},{"date":"2024-07-17","count":862},{"date":"2024-07-18","count":888},{"date":"2024-07-19","count":423},{"date":"2024-07-20","count":1389},{"date":"2024-07-21","count":680},{"date":"2024-07-22","count":459},{"date":"2024-07-23","count":1133},{"date":"2024-07-24","count":1431},{"date":"2024-07-25","count":844},{"date":"2024-07-26","count":1077},{"date":"2024-07-27","count":1246},{"date":"2024-07-28","count":173},{"date":"2024-07-29","count":587},{"date":"2024-07-30","count":207},{"date":"2024-07-31","count":281},{"date":"2024-08-01","count":1700},{"date":"2024-08-02","count":529},{"date":"2024-08-03","count":1381},{"date":"2024-08-04","count":680},{"date":"2024-08-05","count":722},{"date":"2024-08-06","count":497},{"date":"2024-08-07","count":855},{"date":"2024-08-08","count":708},{"date":"2024-08-09","count":1282},{"date":"2024-08-10","count":1225},{"date":"2024-08-11","count":747},{"date":"2024-08-12","count":791},{"date":"2024-08-13","count":628},{"date":"2024-08-14","count":1363},{"date":"2024-08-15","count":169},{"date":"2024-08-16","count":1254},{"date":"2024-08-17","count":1486},{"date":"2024-08-18","count":971},{"date":"2024-08-19","count":867},{"date":"2024-08-20","count":253},{"date":"2024-08-21","count":575},{"date":"2024-08-22","count":800},{"date":"2024-08-23","count":1421},{"date":"2024-09-02","count":73},{"date":"2024-09-03","count":980},{"date":"2024-09-04","count":354},{"date":"2024-09-05","count":843},{"date":"2024-09-06","count":1051},{"date":"2024-09-07","count":394},{"date":"2024-09-08","count":745},{"date":"2024-09-09","count":377},{"date":"2024-09-10","count":810},{"date":"2024-09-11","count":591},{"date":"2024-09-12","count":486},{"date":"2024-09-13","count":507},{"date":"2024-09-14","count":706},{"date":"2024-09-15","count":319},{"date":"2024-09-16","count":408},{"date":"2024-09-17","count":501},{"date":"2024-09-18","count":640},{"date":"2024-09-19","count":589},{"date":"2024-09-20","count":307},{"date":"2024-09-21","count":190},{"date":"2024-09-22","count":269},{"date":"2024-09-23","count":841},{"date":"2024-09-24","count":480},{"date":"2024-09-25","count":1029},{"date":"2024-09-26","count":336},{"date":"2024-09-27","count":76},{"date":"2024-09-28","count":592},{"date":"2024-09-29","count":95},{"date":"2024-09-30","count":75},{"date":"2024-10-01","count":53},{"date":"2024-10-02","count":384},{"date":"2024-10-03","count":149},{"date":"2024-10-04","count":152},{"date":"2024-10-05","count":298},{"date":"2024-10-06","count":212},{"date":"2024-10-07","count":157},{"date":"2024-10-08","count":200},{"date":"2024-10-09","count":294},{"date":"2024-10-10","count":96},{"date":"2024-10-11","count":115},{"date":"2024-10-12","count":927},{"date":"2024-10-13","count":1046},{"date":"2024-10-14","count":476},{"date":"2024-10-15","count":409},{"date":"2024-10-16","count":540},{"date":"2024-10-17","count":203},{"date":"2024-10-18","count":769},{"date":"2024-10-19","count":31},{"date":"2024-10-20","count":548},{"date":"2024-10-21","count":438},{"date":"2024-10-22","count":379},{"date":"2024-10-23","count":85},{"date":"2024-10-24","count":351},{"date":"2024-10-25","count":386},{"date":"2024-10-26","count":323},{"date":"2024-10-27","count":418},{"date":"2024-10-28","count":297},{"date":"2024-10-29","count":916},{"date":"2024-10-30","count":285},{"date":"2024-10-31","count":688},{"date":"2024-11-01","count":615},{"date":"2024-11-02","count":345},{"date":"2024-11-03","count":399},{"date":"2024-11-04","count":305},{"date":"2024-11-05","count":213},{"date":"2024-11-06","count":197},{"date":"2024-11-07","count":200},{"date":"2024-11-08","count":261},{"date":"2024-11-09","count":1028},{"date":"2024-11-10","count":170},{"date":"2024-11-11","count":473},{"date":"2024-11-12","count":304},{"date":"2024-11-13","count":521},{"date":"2024-11-14","count":129},{"date":"2024-11-15","count":390},{"date":"2024-11-16","count":245},{"date":"2024-11-17","count":536},{"date":"2024-11-18","count":549},{"date":"2024-11-19","count":523},{"date":"2024-11-20","count":515},{"date":"2024-11-21","count":836},{"date":"2024-11-22","count":750},{"date":"2024-11-23","count":902},{"date":"2024-11-24","count":501},{"date":"2024-11-25","count":136},{"date":"2024-11-26","count":282},{"date":"2024-11-27","count":182},{"date":"2024-11-28","count":911},{"date":"2024-11-29","count":394},{"date":"2024-11-30","count":252},{"date":"2024-12-01","count":276},{"date":"2024-12-02","count":303},{"date":"2024-12-03","count":295},{"date":"2024-12-04","count":292},{"date":"2024-12-05","count":91},{"date":"2024-12-06","count":123},{"date":"2024-12-07","count":217},{"date":"2024-12-08","count":185},{"date":"2024-12-09","count":408}];
        return new Map(data.map(item => [item.date, item.count]));
    }

    createColorScale(dateValueMap) {
        return d3.scaleLinear()
            .domain([0, d3.max([...dateValueMap.values()])])
            .range(["#FFC0CB", "#8B0000"]);
    }

    calculateLayout() {
        const daysIn2024 = 366;
        const spacerCount = 22;
        const totalBoxes = daysIn2024 + spacerCount;
        
        const width = window.innerWidth * 0.9;
        const height = window.innerHeight * 0.45;
        
        const aspectRatio = width / height;
        const rows = Math.floor(Math.sqrt(totalBoxes / aspectRatio));
        const cols = Math.ceil(totalBoxes / rows);
        
        const boxSize = Math.min(width / cols, height / rows) * 0.8;
        const gap = boxSize * 0.2;
        
        // 计算实际使用的总宽度
        const totalUsedWidth = cols * (boxSize + gap) - gap;
        // 计算水平偏移以居中方格组
        const offsetX = (width - totalUsedWidth) / 2;
        
        return { width, height, boxSize, gap, cols, rows, offsetX };
    }

    createSvg(width, height) {
        // 创建一个固定宽度的容器
        const container = d3.select("#mainContent")
            .style("width", `${width}px`)
            .style("height", "100%")
            .style("margin", "0 auto")
            .style("display", "flex")
            .style("justify-content", "center")
            .style("align-items", "center");

        // 创建SVG，使用完整宽度
        const svg = container
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet");
        
        return svg;
    }

    createBoxGroup(svg, width, height) {
        const totalHeight = height * 0.9;
        const offsetY = height * 0.1;
        const { offsetX } = this.calculateLayout();  // 获取计算好的水平偏移量
        
        // 使用计算出的水平偏移量
        return svg.append("g")
            .attr("transform", `translate(${offsetX}, ${offsetY})`);
    }

    async drawAllBoxes(group, dateValueMap, colorScale, boxSize, gap, cols) {
        let dayCount = 0;
        let monthIndex = 0;
        let boxIndex = 0;
        let currentDate = new Date(2024, 0, 1);
        let spacerInserted = false;

        const months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        const drawBox = async (x, y, value, isSpace = false) => {
            await new Promise(resolve => setTimeout(resolve, 20));
            
            group.append("rect")
                .attr("x", x)
                .attr("y", y)
                .attr("width", boxSize)
                .attr("height", boxSize)
                .attr("rx", 2)
                .attr("ry", 2)
                .attr("fill", isSpace ? "#ffffff10" : (value ? colorScale(value) : "rgba(128, 128, 128, 0.5)")) // 修改灰色透明度为50%
                .style("opacity", 0)
                .transition()
                .duration(300)
                .style("opacity", isSpace ? 0.1 : (value ? 0.9 : 0.5)); // 修改灰色透明度为50%
        };

        while (monthIndex < 12) {
            if (monthIndex > 0 && !spacerInserted && dayCount === 0) {
                for (let i = 0; i < 2; i++) {
                    const row = Math.floor(boxIndex / cols);
                    const col = boxIndex % cols;
                    const x = col * (boxSize + gap);
                    const y = row * (boxSize + gap);

                    await drawBox(x, y, null, true);
                    boxIndex++;
                }
                spacerInserted = true;
                continue;
            }

            const row = Math.floor(boxIndex / cols);
            const col = boxIndex % cols;
            const x = col * (boxSize + gap);
            const y = row * (boxSize + gap);

            const dateString = currentDate.toISOString().slice(0, 10);
            const value = dateValueMap.get(dateString);

            await drawBox(x, y, value);

            boxIndex++;
            dayCount++;
            currentDate.setDate(currentDate.getDate() + 1);

            if (dayCount >= months[monthIndex]) {
                dayCount = 0;
                monthIndex++;
                spacerInserted = false;
            }
        }
    }

    resetElements() {
        this.contentContainer.innerHTML = '';
        this.textContainer.innerHTML = '';
    }
}

window.Page6 = Page6;
