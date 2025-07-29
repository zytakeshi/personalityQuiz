// Cloudflare Worker for Personality Quiz
// 性格测试 Cloudflare Worker 部署脚本

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🌈 可爱性格测试 🌈</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
/* 全局样式 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Nunito', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
}

/* 背景动画元素 */
.background-elements {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
}

.floating-shape {
    position: absolute;
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
    opacity: 0.1;
}

.shape-1 {
    width: 80px;
    height: 80px;
    background: #ff9a9e;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
}

.shape-2 {
    width: 120px;
    height: 120px;
    background: #a8e6cf;
    top: 60%;
    right: 15%;
    animation-delay: 1s;
}

.shape-3 {
    width: 60px;
    height: 60px;
    background: #ffd93d;
    top: 80%;
    left: 20%;
    animation-delay: 2s;
}

.shape-4 {
    width: 100px;
    height: 100px;
    background: #74b9ff;
    top: 10%;
    right: 30%;
    animation-delay: 3s;
}

.shape-5 {
    width: 70px;
    height: 70px;
    background: #fd79a8;
    top: 40%;
    left: 5%;
    animation-delay: 4s;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px) rotate(0deg);
    }
    33% {
        transform: translateY(-20px) rotate(120deg);
    }
    66% {
        transform: translateY(-10px) rotate(240deg);
    }
}

/* 容器和布局 */
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.page {
    display: none;
    width: 100%;
    animation: fadeInSlide 0.6s ease-out;
}

.page.active {
    display: block;
}

@keyframes fadeInSlide {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 卡片样式 */
.welcome-card, .quiz-card, .result-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 25px;
    padding: 40px 30px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-align: center;
    position: relative;
    overflow: hidden;
}

.welcome-card::before, .quiz-card::before, .result-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #ff9a9e, #fad0c4, #a8e6cf, #74b9ff, #fd79a8);
    background-size: 300% 100%;
    animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
    0%, 100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}

/* 标题和文本 */
.title {
    font-size: 2.5em;
    font-weight: 800;
    color: #2d3436;
    margin-bottom: 15px;
    animation: titleBounce 2s ease-in-out infinite;
}

@keyframes titleBounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.subtitle {
    font-size: 1.2em;
    color: #636e72;
    margin-bottom: 30px;
    line-height: 1.6;
}

.mascot {
    font-size: 5em;
    margin: 20px 0;
    animation: mascotDance 2s ease-in-out infinite;
}

@keyframes mascotDance {
    0%, 100% {
        transform: rotate(-5deg) scale(1);
    }
    50% {
        transform: rotate(5deg) scale(1.1);
    }
}

/* 进度条 */
.progress-bar {
    background: #e0e0e0;
    border-radius: 20px;
    height: 10px;
    margin-bottom: 30px;
    position: relative;
    overflow: hidden;
}

.progress-fill {
    background: linear-gradient(90deg, #ff9a9e, #fad0c4);
    height: 100%;
    border-radius: 20px;
    transition: width 0.6s ease;
    position: relative;
}

.progress-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
    animation: progressShine 2s infinite;
}

@keyframes progressShine {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

.progress-text {
    position: absolute;
    top: -25px;
    right: 0;
    font-size: 0.9em;
    color: #636e72;
    font-weight: 600;
}

/* 问题样式 */
.questions-container {
    margin-bottom: 30px;
}

.question-item {
    margin-bottom: 25px;
    text-align: left;
}

.question-title {
    font-size: 1.3em;
    color: #2d3436;
    margin-bottom: 15px;
    font-weight: 700;
    padding: 15px;
    background: linear-gradient(135deg, #ffeef8, #f0f8ff);
    border-radius: 15px;
    border-left: 5px solid #fd79a8;
    animation: questionAppear 0.6s ease-out;
}

@keyframes questionAppear {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 20px;
}

/* 按钮样式 */
.btn, .option-btn {
    position: relative;
    padding: 15px 30px;
    border: none;
    border-radius: 50px;
    font-size: 1.1em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    font-family: 'Nunito', sans-serif;
}

.btn-primary {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
    background: linear-gradient(135deg, #a8e6cf, #88d8c0);
    color: #2d3436;
    box-shadow: 0 8px 20px rgba(168, 230, 207, 0.4);
}

.option-btn {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    color: #495057;
    text-align: left;
    border: 2px solid transparent;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.option-btn:hover {
    background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.option-btn.selected {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border-color: #667eea;
    transform: scale(1.02);
}

.btn:hover:not(.disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

.btn.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
}

.btn-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.6s;
}

.btn:hover .btn-shine {
    left: 100%;
}

.pulse {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
    }
    70% {
        box-shadow: 0 0 0 20px rgba(102, 126, 234, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
    }
}

/* 结果页面样式 */
.result-header {
    margin-bottom: 30px;
}

.personality-type {
    font-size: 3em;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 15px 0;
    animation: typeGlow 2s ease-in-out infinite;
}

@keyframes typeGlow {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

.personality-name {
    font-size: 1.5em;
    color: #636e72;
    font-weight: 600;
}

.personality-emoji {
    font-size: 6em;
    margin: 20px 0;
    animation: emojiRotate 3s ease-in-out infinite;
}

@keyframes emojiRotate {
    0%, 100% {
        transform: rotate(-10deg);
    }
    50% {
        transform: rotate(10deg);
    }
}

.personality-description {
    font-size: 1.2em;
    color: #2d3436;
    margin: 20px 0;
    line-height: 1.6;
    padding: 20px;
    background: linear-gradient(135deg, #ffeef8, #f0f8ff);
    border-radius: 15px;
}

.personality-traits {
    text-align: left;
    margin: 25px 0;
}

.personality-traits h4 {
    color: #2d3436;
    margin-bottom: 15px;
    font-size: 1.3em;
}

.personality-traits ul {
    list-style: none;
    padding-left: 0;
}

.personality-traits li {
    padding: 10px 0;
    padding-left: 30px;
    position: relative;
    color: #636e72;
    line-height: 1.5;
}

.personality-traits li::before {
    content: '✨';
    position: absolute;
    left: 0;
    top: 10px;
    animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
    0%, 100% {
        transform: scale(1) rotate(0deg);
    }
    50% {
        transform: scale(1.2) rotate(180deg);
    }
}

.result-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 30px;
    flex-wrap: wrap;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .container {
        padding: 15px;
    }
    
    .welcome-card, .quiz-card, .result-card {
        padding: 25px 20px;
    }
    
    .title {
        font-size: 2em;
    }
    
    .subtitle {
        font-size: 1em;
    }
    
    .mascot, .personality-emoji {
        font-size: 4em;
    }
    
    .btn, .option-btn {
        padding: 12px 25px;
        font-size: 1em;
    }
    
    .result-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .result-actions .btn {
        width: 200px;
    }
}

@media (max-width: 480px) {
    .options {
        margin-left: 0;
    }
    
    .question-title {
        font-size: 1.1em;
        padding: 12px;
    }
    
    .personality-type {
        font-size: 2.5em;
    }
}

/* 特殊动画效果 */
.bounce-in {
    animation: bounceIn 0.6s ease-out;
}

@keyframes bounceIn {
    0% {
        opacity: 0;
        transform: scale(0.3);
    }
    50% {
        opacity: 1;
        transform: scale(1.05);
    }
    70% {
        transform: scale(0.9);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.slide-up {
    animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 鼠标悬停特效 */
.btn::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.btn:active::after {
    width: 300px;
    height: 300px;
}

@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

@keyframes toastShow {
    from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
    </style>
</head>
<body>
    <!-- 背景装饰 -->
    <div class="background-elements">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
        <div class="floating-shape shape-4"></div>
        <div class="floating-shape shape-5"></div>
    </div>

    <div class="container">
        <!-- 开始页面 -->
        <div id="start-page" class="page active">
            <div class="welcome-card">
                <h1 class="title">🌟 发现你的独特性格 🌟</h1>
                <p class="subtitle">通过10个有趣的问题，探索你内心的秘密世界</p>
                <div class="mascot">🦄</div>
                <button id="start-btn" class="btn btn-primary pulse">
                    <span>开始测试</span>
                    <div class="btn-shine"></div>
                </button>
            </div>
        </div>

        <!-- 问题页面1 -->
        <div id="questions-page-1" class="page">
            <div class="quiz-card">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                    <span class="progress-text">第1页 / 共2页</span>
                </div>
                
                <div class="questions-container">
                    <!-- 问题1 -->
                    <div class="question-item" data-question="1">
                        <h3 class="question-title">🎉 在聚会上，你通常会...</h3>
                        <div class="options">
                            <button class="option-btn" data-value="E">主动和陌生人聊天</button>
                            <button class="option-btn" data-value="I">找熟悉的朋友待在一起</button>
                        </div>
                    </div>

                    <!-- 问题2 -->
                    <div class="question-item" data-question="2">
                        <h3 class="question-title">📚 学习新知识时，你更喜欢...</h3>
                        <div class="options">
                            <button class="option-btn" data-value="S">一步步按照指导来</button>
                            <button class="option-btn" data-value="N">先理解整体概念</button>
                        </div>
                    </div>

                    <!-- 问题3 -->
                    <div class="question-item" data-question="3">
                        <h3 class="question-title">🤔 做决定时，你更依赖...</h3>
                        <div class="options">
                            <button class="option-btn" data-value="T">逻辑分析</button>
                            <button class="option-btn" data-value="F">内心感受</button>
                        </div>
                    </div>

                    <!-- 问题4 -->
                    <div class="question-item" data-question="4">
                        <h3 class="question-title">⏰ 对于计划，你的态度是...</h3>
                        <div class="options">
                            <button class="option-btn" data-value="J">喜欢提前安排好</button>
                            <button class="option-btn" data-value="P">保持灵活性</button>
                        </div>
                    </div>

                    <!-- 问题5 -->
                    <div class="question-item" data-question="5">
                        <h3 class="question-title">🌙 理想的周末是...</h3>
                        <div class="options">
                            <button class="option-btn" data-value="E">和朋友们一起活动</button>
                            <button class="option-btn" data-value="I">安静地享受独处时光</button>
                        </div>
                    </div>
                </div>

                <button id="next-page-1" class="btn btn-secondary disabled">
                    <span>下一页</span>
                    <div class="btn-shine"></div>
                </button>
            </div>
        </div>

        <!-- 问题页面2 -->
        <div id="questions-page-2" class="page">
            <div class="quiz-card">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 50%"></div>
                    <span class="progress-text">第2页 / 共2页</span>
                </div>
                
                <div class="questions-container">
                    <!-- 问题6 -->
                    <div class="question-item" data-question="6">
                        <h3 class="question-title">🎨 你更欣赏...</h3>
                        <div class="options">
                            <button class="option-btn" data-value="S">具体的艺术作品</button>
                            <button class="option-btn" data-value="N">抽象的创意表达</button>
                        </div>
                    </div>

                    <!-- 问题7 -->
                    <div class="question-item" data-question="7">
                        <h3 class="question-title">💭 处理冲突时，你会...</h3>
                        <div class="options">
                            <button class="option-btn" data-value="T">分析问题的根源</button>
                            <button class="option-btn" data-value="F">考虑每个人的感受</button>
                        </div>
                    </div>

                    <!-- 问题8 -->
                    <div class="question-item" data-question="8">
                        <h3 class="question-title">📝 工作方式上，你偏向...</h3>
                        <div class="options">
                            <button class="option-btn" data-value="J">按计划有序进行</button>
                            <button class="option-btn" data-value="P">根据情况调整</button>
                        </div>
                    </div>

                    <!-- 问题9 -->
                    <div class="question-item" data-question="9">
                        <h3 class="question-title">🗣️ 表达想法时，你更喜欢...</h3>
                        <div class="options">
                            <button class="option-btn" data-value="E">说出来讨论</button>
                            <button class="option-btn" data-value="I">先在心里整理好</button>
                        </div>
                    </div>

                    <!-- 问题10 -->
                    <div class="question-item" data-question="10">
                        <h3 class="question-title">🌟 你认为成功更需要...</h3>
                        <div class="options">
                            <button class="option-btn" data-value="S">扎实的基础和经验</button>
                            <button class="option-btn" data-value="N">创新的想法和直觉</button>
                        </div>
                    </div>
                </div>

                <button id="get-result" class="btn btn-primary disabled">
                    <span>查看结果</span>
                    <div class="btn-shine"></div>
                </button>
            </div>
        </div>

        <!-- 结果页面 -->
        <div id="result-page" class="page">
            <div class="result-card">
                <div class="result-header">
                    <h2>🎊 你的性格类型是 🎊</h2>
                    <div class="personality-type" id="personality-type">ENFP</div>
                    <div class="personality-name" id="personality-name">热情的鼓励者</div>
                </div>
                
                <div class="result-content">
                    <div class="personality-emoji" id="personality-emoji">🌈</div>
                    <div class="personality-description" id="personality-description">
                        你是一个充满活力和创造力的人！
                    </div>
                    
                    <div class="personality-traits" id="personality-traits">
                        <h4>你的特质：</h4>
                        <ul>
                            <li>热情开朗，善于激励他人</li>
                            <li>富有创造力和想象力</li>
                            <li>善于发现新的可能性</li>
                        </ul>
                    </div>
                </div>

                <div class="result-actions">
                    <button id="restart-btn" class="btn btn-secondary">
                        <span>重新测试</span>
                        <div class="btn-shine"></div>
                    </button>
                    <button id="share-btn" class="btn btn-primary">
                        <span>分享结果</span>
                        <div class="btn-shine"></div>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
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
    
    console.log(\`问题 \${questionNumber}: \${value}\`);
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
        const traitsHtml = \`
            <h4>你的特质：</h4>
            <ul>
                \${data.traits.map(trait => \`<li>\${trait}</li>\`).join('')}
            </ul>
        \`;
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
            text: \`我是 \${personalityType} - \${personalityName}！快来测试你的性格类型吧！\`,
            url: window.location.href
        });
    } else {
        // 复制到剪贴板
        const shareText = \`我是 \${personalityType} - \${personalityName}！快来测试你的性格类型吧！ \${window.location.href}\`;
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('结果已复制到剪贴板！');
        });
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = \`
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
    \`;
    toast.textContent = message;
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = \`
        @keyframes toastShow {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
    \`;
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
            
            ripple.style.cssText = \`
                position: absolute;
                width: \${size}px;
                height: \${size}px;
                left: \${x}px;
                top: \${y}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            \`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
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
    </script>
</body>
</html>`;

// Cloudflare Worker 主函数
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 处理 GET 和 HEAD 请求
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405 });
    }
    
    // 返回 HTML 页面
    return new Response(HTML_CONTENT, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400', // 缓存1天
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block'
      }
    });
  }
}; 