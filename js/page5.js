class Page5 extends BasePage {
    constructor() {
        super(5);
        this.init();
    }

    init() {
        this.element.className = 'page-common page-5';
        this.element.innerHTML = `
            <div class="page-content">
                <div class="background-layer"></div>
                <div class="content-layer">
                    <div class="calendar glass-container">
                        <div class="calendar-header">2024年6月</div>
                        <div class="calendar-grid">
                            ${this.generateCalendar()}
                        </div>
                    </div>
                </div>
                <div class="text-layer">
                    <div class="text-container">
                        <div class="text-line">了不起的开始</div>
                        <div class="text-line">
                            <span class="highlight">06</span>月
                            <span class="highlight">28</span>日
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 修���日历样式
        const style = document.createElement('style');
        style.textContent = `
            .calendar {
                width: 80%;
                max-width: 400px;
                margin: 0 auto;
                padding: 20px;
                background: rgba(255, 255, 255, 0.1);
                margin-top: 2rem;
            }
            
            .calendar-header {
                text-align: center;
                font-size: 1.2em;
                margin-bottom: 20px;
                color: #ffffff;
            }
            
            .calendar-grid {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 5px;
                color: #ffffff;
            }
            
            .calendar-cell {
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.9em;
                border-radius: 5px;
                background: rgba(255, 255, 255, 0.05);
            }
            
            .calendar-cell.weekday {
                background: none;
                font-weight: bold;
                color: rgba(255, 255, 255, 0.8);
            }
            
            .calendar-cell.highlight span {
                display: inline-block;
                background: linear-gradient(135deg, #ffb6e1, #ff98c3);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-weight: bold;
                font-size: 1.5em;
                animation: pulse 1s infinite;
                
                /* 多层文字阴影创造发光效果 */
                text-shadow: 
                    0 0 10px rgba(255, 182, 225, 0.8),
                    0 0 20px rgba(255, 152, 195, 0.5),
                    0 0 30px rgba(255, 203, 233, 0.3);
                filter: drop-shadow(0 0 8px rgba(255, 182, 225, 0.5));
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(2); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    generateCalendar() {
        const days = ['日', '一', '二', '三', '四', '五', '六'];
        const firstDay = new Date(2024, 5, 1).getDay();
        const totalDays = 30;
        let calendarHTML = '';
        
        // 添加星期头部
        days.forEach(day => {
            calendarHTML += `<div class="calendar-cell weekday">${day}</div>`;
        });
        
        // 添加月初的空白天数
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += `<div class="calendar-cell"></div>`;
        }
        
        // 添加日期，为28号添加span包裹
        for (let i = 1; i <= totalDays; i++) {
            if (i === 28) {
                calendarHTML += `<div class="calendar-cell highlight"><span>${i}</span></div>`;
            } else {
                calendarHTML += `<div class="calendar-cell">${i}</div>`;
            }
        }
        
        // 添加月末的空白天数
        const totalCells = Math.ceil((firstDay + totalDays) / 7) * 7;
        const remainingCells = totalCells - (firstDay + totalDays);
        for (let i = 0; i < remainingCells; i++) {
            calendarHTML += `<div class="calendar-cell"></div>`;
        }
        
        return calendarHTML;
    }

    onShow() {
        this.element.classList.add('active');
    }

    resetElements() {
        // 不需要重置文本状态
    }
}

window.Page5 = Page5; 