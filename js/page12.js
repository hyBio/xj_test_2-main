class Page12 extends BasePage {
    constructor() {
        super(12);
        this.contentContainer = null;
        this.textContainer = null;
        this.init();
    }

    init() {
        this.element.className = 'page-common page-12';
        
        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'page12Content';
        this.contentContainer.className = 'page-content';
        
        this.textContainer = document.createElement('div');
        this.textContainer.id = 'page12TextContainer';
        
        this.element.appendChild(this.contentContainer);
        this.element.appendChild(this.textContainer);
    }

    async onShow() {
        this.element.style.display = 'block';
        this.element.style.opacity = '1';
        
        this.contentContainer.innerHTML = '';
        this.textContainer.innerHTML = '';
        
        await this.drawChart();
        await this.showTexts();
    }

    onHide() {
        this.element.style.display = 'none';
        this.element.style.opacity = '0';
        this.contentContainer.innerHTML = '';
        this.textContainer.innerHTML = '';
    }

    async drawChart() {
        const hourlyData = this.processData();
        
        const width = window.innerWidth * 0.9;
        const height = window.innerHeight * 0.6;
        const margin = { 
            top: 80, 
            right: 30, 
            bottom: 20, 
            left: 60 
        };
        
        const svg = d3.select('#page12Content')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        // 添加标题
        svg.append('text')
            .attr('class', 'chart-title')
            .attr('x', width / 2)
            .attr('y', margin.top / 2)
            .attr('text-anchor', 'middle')
            .style('fill', '#ffffff')
            .style('font-size', '16px')
            .text('分时段消息条数');

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // 创建比例尺
        const xScale = d3.scaleLinear()
            .domain([0, d3.max([...hourlyData.values()].map(d => Math.max(Math.abs(d.huyan), Math.abs(d.xiujie))))])
            .range([0, innerWidth / 2]);

        const yScale = d3.scaleBand()
            .domain(d3.range(24))
            .range([margin.top, height - margin.bottom])
            .padding(0.1);

        // 添加坐标轴
        const xAxisTop = d3.axisTop(xScale).ticks(5);
        const xAxisBottom = d3.axisBottom(xScale).ticks(5);
        const yAxis = d3.axisLeft(yScale).tickFormat(d => `${d}:00`);

        // 创建渐变
        const myGradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'myGradient')
            .attr('x1', '0%')
            .attr('x2', '100%');

        myGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#4169E1');  // 蓝色系

        myGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#1E90FF');

        const xiujieGradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'xiujieGradient')
            .attr('x1', '0%')
            .attr('x2', '100%');

        xiujieGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#FF69B4');  // 粉色系

        xiujieGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#FF1493');

        // 绘制图表主体
        const g = svg.append('g')
            .attr('transform', `translate(${width/2}, 0)`);

        // 绘制我的柱状图（左侧）
        g.selectAll('.bar-my')
            .data(Array.from(hourlyData.values()))
            .enter()
            .append('rect')
            .attr('class', 'bar-my')
            .attr('x', d => -xScale(d.huyan))
            .attr('y', (d, i) => yScale(i))
            .attr('width', d => xScale(d.huyan))
            .attr('height', yScale.bandwidth())
            .attr('fill', 'url(#myGradient)')
            .attr('opacity', 0)
            .transition()
            .duration(1000)
            .attr('opacity', 0.8);

        // 绘制秀杰的柱状图（右侧）
        g.selectAll('.bar-xiujie')
            .data(Array.from(hourlyData.values()))
            .enter()
            .append('rect')
            .attr('class', 'bar-xiujie')
            .attr('x', 0)
            .attr('y', (d, i) => yScale(i))
            .attr('width', d => xScale(d.xiujie))
            .attr('height', yScale.bandwidth())
            .attr('fill', 'url(#xiujieGradient)')
            .attr('opacity', 0)
            .transition()
            .duration(1000)
            .attr('opacity', 0.8);

        // 添加坐标轴
        g.append('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${-xScale.range()[1]}, 0)`)
            .call(yAxis)
            .selectAll('text')
            .style('fill', '#ffffff')
            .style('font-size', '12px');

        // 调整图例位置和布局
        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${width - margin.right - 100}, ${height/2 - 30})`);  // 移到图表右侧中间位置

        // 我的图例
        legend.append('rect')
            .attr('x', 0)
            .attr('width', 20)
            .attr('height', 10)
            .attr('fill', 'url(#myGradient)');

        legend.append('text')
            .attr('x', 25)
            .attr('y', 9)
            .text(BasePage.sharedData.my_name)
            .style('fill', '#ffffff')
            .style('font-size', '12px');

        // 秀杰图例 - 放在下一行
        legend.append('rect')
            .attr('x', 0)
            .attr('y', 25)  // 向下移动25px
            .attr('width', 20)
            .attr('height', 10)
            .attr('fill', 'url(#xiujieGradient)');

        legend.append('text')
            .attr('x', 25)
            .attr('y', 34)  // 向下移动25px
            .text('秀杰')
            .style('fill', '#ffffff')
            .style('font-size', '12px');

        // 添加中心分界线
        g.append('line')
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('y1', margin.top)
            .attr('y2', height - margin.bottom)
            .style('stroke', '#ffffff')
            .style('stroke-width', '1px')
            .style('stroke-opacity', '0.3');
    }

    processData() {
        // 移除多余的数组包装
        const rawData = [{"hour":0,"mesDes":0,"count":15097},{"hour":0,"mesDes":1,"count":8273},{"hour":1,"mesDes":0,"count":5818},{"hour":1,"mesDes":1,"count":2807},{"hour":2,"mesDes":0,"count":809},{"hour":2,"mesDes":1,"count":332},{"hour":3,"mesDes":0,"count":85},{"hour":3,"mesDes":1,"count":33},{"hour":5,"mesDes":0,"count":3},{"hour":5,"mesDes":1,"count":3},{"hour":6,"mesDes":0,"count":2},{"hour":7,"mesDes":0,"count":17},{"hour":7,"mesDes":1,"count":12},{"hour":8,"mesDes":0,"count":194},{"hour":8,"mesDes":1,"count":104},{"hour":9,"mesDes":0,"count":350},{"hour":9,"mesDes":1,"count":188},{"hour":10,"mesDes":0,"count":497},{"hour":10,"mesDes":1,"count":277},{"hour":11,"mesDes":0,"count":864},{"hour":11,"mesDes":1,"count":535},{"hour":12,"mesDes":0,"count":2585},{"hour":12,"mesDes":1,"count":1401},{"hour":13,"mesDes":0,"count":2717},{"hour":13,"mesDes":1,"count":1462},{"hour":14,"mesDes":0,"count":1295},{"hour":14,"mesDes":1,"count":659},{"hour":15,"mesDes":0,"count":1944},{"hour":15,"mesDes":1,"count":1019},{"hour":16,"mesDes":0,"count":1933},{"hour":16,"mesDes":1,"count":1103},{"hour":17,"mesDes":0,"count":2584},{"hour":17,"mesDes":1,"count":1468},{"hour":18,"mesDes":0,"count":2700},{"hour":18,"mesDes":1,"count":1499},{"hour":19,"mesDes":0,"count":2788},{"hour":19,"mesDes":1,"count":1533},{"hour":20,"mesDes":0,"count":1826},{"hour":20,"mesDes":1,"count":956},{"hour":21,"mesDes":0,"count":1904},{"hour":21,"mesDes":1,"count":956},{"hour":22,"mesDes":0,"count":3333},{"hour":22,"mesDes":1,"count":1787},{"hour":23,"mesDes":0,"count":6805},{"hour":23,"mesDes":1,"count":3843}];

        const hourlyData = new Map();
        
        // 初始化24小时的数据
        for (let i = 0; i < 24; i++) {
            hourlyData.set(i, { huyan: 0, xiujie: 0 });
        }
        
        // 填充实际数据
        rawData.forEach(d => {
            const hour = d.hour;
            const current = hourlyData.get(hour);
            if (d.mesDes === 0) {
                // 如果是同一小时的数据,累加count值
                current.huyan += d.count;
            } else {
                current.xiujie += d.count;
            }
            hourlyData.set(hour, current);
        });
        
        return hourlyData;
    }

    async showTexts() {
        const texts = [
            { text: "两只", isHighlight: false },
            { text: "小夜猫", isHighlight: true }
        ];
        
        const textContainer = document.createElement('div');
        textContainer.style.position = 'absolute';
        textContainer.style.width = '100%';
        textContainer.style.bottom = '15%';  // 设置下边距为15%
        textContainer.style.left = '50%';
        textContainer.style.transform = 'translateX(-50%)';
        textContainer.style.textAlign = 'center';
        
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
            
            textContainer.appendChild(textDiv);
        });
        
        this.textContainer.appendChild(textContainer);
    }
}

window.Page12 = Page12; 