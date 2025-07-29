// 全局变量
let currentPage = 'start';
let answers = {};
let questionCount = 0;

// 性格类型数据
const personalityTypes = {
    'INTJ': {
        name: '建筑师',
        emoji: '🏛️',
        description: '你是一个富有想象力和战略性的思想家，对一切事物都有计划。',
        traits: [
            '独立思考，具有战略眼光',
            '追求知识和能力的提升',
            '喜欢制定长期计划',
            '在复杂问题中寻找创新解决方案'
        ]
    },
    'INTP': {
        name: '逻辑学家',
        emoji: '🧠',
        description: '你是一个富有创造性的思想家，对自己的独特视角充满自信。',
        traits: [
            '热爱理论和抽象概念',
            '善于分析和逻辑思考',
            '追求理解事物的本质',
            '独立性强，不受传统束缚'
        ]
    },
    'ENTJ': {
        name: '指挥官',
        emoji: '👑',
        description: '你是一个大胆、富有想象力、意志强烈的领导者，总能找到或创造解决方法。',
        traits: [
            '天生的领导者和组织者',
            '善于制定和执行计划',
            '目标导向，追求效率',
            '乐于接受挑战和责任'
        ]
    },
    'ENTP': {
        name: '辩论家',
        emoji: '🎭',
        description: '你是一个聪明好奇的思想家，不会拒绝任何智力上的挑战。',
        traits: [
            '富有创造力和创新精神',
            '善于发现新的可能性',
            '热衷于探索和辩论',
            '适应能力强，思维灵活'
        ]
    },
    'INFJ': {
        name: '提倡者',
        emoji: '🌟',
        description: '你是一个安静的神秘主义者，但也是一个非常鼓舞人心和不知疲倦的理想主义者。',
        traits: [
            '富有同情心和洞察力',
            '追求意义和目的',
            '善于理解他人的情感',
            '坚持自己的价值观和信念'
        ]
    },
    'INFP': {
        name: '调解者',
        emoji: '🌸',
        description: '你是一个诗意的、善良的利他主义者，总是热切地想要帮助好的事业。',
        traits: [
            '重视和谐与个人价值',
            '富有创造力和想象力',
            '善于理解和支持他人',
            '追求个人成长和自我实现'
        ]
    },
    'ENFJ': {
        name: '主人公',
        emoji: '🌈',
        description: '你是一个有魅力、鼓舞人心的领导者，能够吸引听众。',
        traits: [
            '热情开朗，善于激励他人',
            '具有强烈的同理心',
            '善于沟通和建立关系',
            '致力于帮助他人成长'
        ]
    },
    'ENFP': {
        name: '竞选者',
        emoji: '🎨',
        description: '你是一个热情、有创造力的社交家，总能找到微笑的理由。',
        traits: [
            '充满热情和活力',
            '富有创造力和想象力',
            '善于发现新的可能性',
            '重视人际关系和情感连接'
        ]
    },
    'ISTJ': {
        name: '物流师',
        emoji: '📋',
        description: '你是一个实用主义的现实主义者，可靠性无可争议。',
        traits: [
            '责任心强，值得信赖',
            '注重细节和准确性',
            '喜欢有序和稳定的环境',
            '踏实务实，按部就班'
        ]
    },
    'ISFJ': {
        name: '守护者',
        emoji: '🛡️',
        description: '你是一个温暖心软的保护者，总是准备为珍爱的人挺身而出。',
        traits: [
            '关心他人，乐于助人',
            '注重传统和稳定',
            '善于照顾和支持他人',
            '忠诚可靠，值得信赖'
        ]
    },
    'ESTJ': {
        name: '总经理',
        emoji: '💼',
        description: '你是一个出色的管理者，在管理事物或人员方面无与伦比。',
        traits: [
            '组织能力强，善于管理',
            '注重效率和结果',
            '遵循规则和传统',
            '责任感强，领导力突出'
        ]
    },
    'ESFJ': {
        name: '执政官',
        emoji: '🤝',
        description: '你是一个非常受欢迎的人，总是热心地帮助他人。',
        traits: [
            '善于合作和团队工作',
            '关心他人的感受和需要',
            '重视和谐的人际关系',
            '乐于服务和帮助他人'
        ]
    },
    'ISTP': {
        name: '鉴赏家',
        emoji: '🔧',
        description: '你是一个大胆而实际的实验者，擅长使用各种工具。',
        traits: [
            '动手能力强，善于解决问题',
            '冷静理性，适应能力强',
            '喜欢探索和实验',
            '独立性强，不喜欢约束'
        ]
    },
    'ISFP': {
        name: '探险家',
        emoji: '🎯',
        description: '你是一个灵活、有魅力的艺术家，时刻准备着探索新的可能性。',
        traits: [
            '追求美感和和谐',
            '重视个人价值和自由',
            '善于表达和创造',
            '温和友善，富有同情心'
        ]
    },
    'ESTP': {
        name: '企业家',
        emoji: '⚡',
        description: '你是一个聪明、精力充沛、善于感知的人，真正享受生活在边缘的感觉。',
        traits: [
            '充满活力，善于行动',
            '适应能力强，反应迅速',
            '喜欢冒险和新体验',
            '善于激励和影响他人'
        ]
    },
    'ESFP': {
        name: '娱乐家',
        emoji: '🎉',
        description: '你是一个自发的、精力充沛、热情的人，生活对你来说永远不会无聊。',
        traits: [
            '热情开朗，充满活力',
            '善于娱乐和鼓舞他人',
            '重视当下的体验',
            '富有同情心，关心他人'
        ]
    }
};

// DOM 元素
const elements = {
    startPage: document.getElementById('start-page'),
    questionsPage1: document.getElementById('questions-page-1'),
    questionsPage2: document.getElementById('questions-page-2'),
    resultPage: document.getElementById('result-page'),
    startBtn: document.getElementById('start-btn'),
    nextPage1Btn: document.getElementById('next-page-1'),
    getResultBtn: document.getElementById('get-result'),
    restartBtn: document.getElementById('restart-btn'),
    shareBtn: document.getElementById('share-btn'),
    progressFill: document.querySelector('.progress-fill'),
    personalityType: document.getElementById('personality-type'),
    personalityName: document.getElementById('personality-name'),
    personalityEmoji: document.getElementById('personality-emoji'),
    personalityDescription: document.getElementById('personality-description'),
    personalityTraits: document.getElementById('personality-traits')
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    attachEventListeners();
    addClickAnimations();
});

function initializeQuiz() {
    // 初始化问题选项事件
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            handleOptionClick(this);
        });
    });
}

function attachEventListeners() {
    elements.startBtn.addEventListener('click', () => {
        switchPage('questions-page-1');
        updateProgress(10);
    });

    elements.nextPage1Btn.addEventListener('click', () => {
        switchPage('questions-page-2');
        updateProgress(60);
    });

    elements.getResultBtn.addEventListener('click', () => {
        calculateAndShowResult();
    });

    elements.restartBtn.addEventListener('click', () => {
        restartQuiz();
    });

    elements.shareBtn.addEventListener('click', () => {
        shareResult();
    });
}

function handleOptionClick(clickedBtn) {
    const questionItem = clickedBtn.closest('.question-item');
    const questionNumber = questionItem.dataset.question;
    const value = clickedBtn.dataset.value;
    
    // 移除同一问题其他选项的选中状态
    questionItem.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 添加当前选项的选中状态
    clickedBtn.classList.add('selected');
    
    // 添加点击动画
    clickedBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickedBtn.style.transform = '';
    }, 150);
    
    // 保存答案
    answers[questionNumber] = value;
    questionCount = Object.keys(answers).length;
    
    console.log(`问题 ${questionNumber}: ${value}`);
    console.log('当前答案:', answers);
    
    // 检查当前页面是否所有问题都已回答
    checkPageCompletion();
    
    // 更新进度条
    updateProgress((questionCount / 10) * 100);
}

function checkPageCompletion() {
    if (currentPage === 'questions-page-1') {
        // 检查前5个问题
        const page1Complete = [1, 2, 3, 4, 5].every(q => answers[q]);
        elements.nextPage1Btn.classList.toggle('disabled', !page1Complete);
    } else if (currentPage === 'questions-page-2') {
        // 检查所有10个问题
        const allComplete = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].every(q => answers[q]);
        elements.getResultBtn.classList.toggle('disabled', !allComplete);
    }
}

function switchPage(pageId) {
    // 淡出当前页面
    const currentPageElement = document.querySelector('.page.active');
    currentPageElement.style.opacity = '0';
    currentPageElement.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        // 隐藏当前页面
        currentPageElement.classList.remove('active');
        
        // 显示新页面
        const newPageElement = document.getElementById(pageId);
        newPageElement.classList.add('active');
        newPageElement.style.opacity = '0';
        newPageElement.style.transform = 'translateY(20px)';
        
        // 动画显示新页面
        setTimeout(() => {
            newPageElement.style.opacity = '1';
            newPageElement.style.transform = 'translateY(0)';
        }, 50);
        
        currentPage = pageId;
    }, 300);
}

function updateProgress(percentage) {
    elements.progressFill.style.width = percentage + '%';
    
    // 添加闪光效果
    elements.progressFill.style.boxShadow = '0 0 20px rgba(255, 154, 158, 0.8)';
    setTimeout(() => {
        elements.progressFill.style.boxShadow = '';
    }, 500);
}

function calculatePersonalityType() {
    let E = 0, I = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0;
    
    // 统计各个维度的分数
    Object.values(answers).forEach(answer => {
        switch(answer) {
            case 'E': E++; break;
            case 'I': I++; break;
            case 'S': S++; break;
            case 'N': N++; break;
            case 'T': T++; break;
            case 'F': F++; break;
            case 'J': J++; break;
            case 'P': P++; break;
        }
    });
    
    // 确定性格类型
    const type = 
        (E >= I ? 'E' : 'I') +
        (S >= N ? 'S' : 'N') +
        (T >= F ? 'T' : 'F') +
        (J >= P ? 'J' : 'P');
    
    console.log('分数统计:', { E, I, S, N, T, F, J, P });
    console.log('性格类型:', type);
    
    return type;
}

function calculateAndShowResult() {
    const personalityType = calculatePersonalityType();
    const typeData = personalityTypes[personalityType];
    
    // 切换到结果页面
    switchPage('result-page');
    
    // 延迟显示结果以增加悬念
    setTimeout(() => {
        showPersonalityResult(personalityType, typeData);
    }, 800);
}

function showPersonalityResult(type, data) {
    // 添加打字机效果显示性格类型
    elements.personalityType.textContent = '';
    typeWriterEffect(elements.personalityType, type, 150);
    
    setTimeout(() => {
        elements.personalityName.textContent = data.name;
        elements.personalityName.classList.add('bounce-in');
    }, 1000);
    
    setTimeout(() => {
        elements.personalityEmoji.textContent = data.emoji;
        elements.personalityEmoji.classList.add('bounce-in');
    }, 1500);
    
    setTimeout(() => {
        elements.personalityDescription.textContent = data.description;
        elements.personalityDescription.classList.add('slide-up');
    }, 2000);
    
    setTimeout(() => {
        // 显示特质列表
        const traitsHtml = `
            <h4>你的特质：</h4>
            <ul>
                ${data.traits.map(trait => `<li>${trait}</li>`).join('')}
            </ul>
        `;
        elements.personalityTraits.innerHTML = traitsHtml;
        elements.personalityTraits.classList.add('slide-up');
        
        // 为每个特质添加延迟动画
        const traitItems = elements.personalityTraits.querySelectorAll('li');
        traitItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                item.style.transition = 'all 0.5s ease';
            }, index * 200);
        });
    }, 2500);
}

function typeWriterEffect(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(timer);
        }
    }, speed);
}

function restartQuiz() {
    // 重置所有数据
    answers = {};
    questionCount = 0;
    currentPage = 'start';
    
    // 重置所有选项
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 重置按钮状态
    elements.nextPage1Btn.classList.add('disabled');
    elements.getResultBtn.classList.add('disabled');
    
    // 重置进度条
    updateProgress(0);
    
    // 重置结果页面动画类
    elements.personalityName.classList.remove('bounce-in');
    elements.personalityEmoji.classList.remove('bounce-in');
    elements.personalityDescription.classList.remove('slide-up');
    elements.personalityTraits.classList.remove('slide-up');
    
    // 返回开始页面
    switchPage('start-page');
}

function shareResult() {
    const personalityType = elements.personalityType.textContent;
    const personalityName = elements.personalityName.textContent;
    
    if (navigator.share) {
        navigator.share({
            title: '我的性格测试结果',
            text: `我是 ${personalityType} - ${personalityName}！快来测试你的性格类型吧！`,
            url: window.location.href
        });
    } else {
        // 复制到剪贴板
        const shareText = `我是 ${personalityType} - ${personalityName}！快来测试你的性格类型吧！ ${window.location.href}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('结果已复制到剪贴板！');
        });
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: 600;
        animation: toastShow 0.3s ease-out;
    `;
    toast.textContent = message;
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes toastShow {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(toast);
            document.head.removeChild(style);
        }, 300);
    }, 2000);
}

function addClickAnimations() {
    // 为所有按钮添加点击波纹效果
    document.querySelectorAll('.btn, .option-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // 添加CSS动画
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('btn') || activeElement.classList.contains('option-btn')) {
            activeElement.click();
        }
    }
});

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 页面重新可见时，重新启动动画
        document.querySelectorAll('.floating-shape').forEach(shape => {
            shape.style.animationPlayState = 'running';
        });
    }
});

console.log('性格测试初始化完成！'); 