// 交互式终端模拟器

document.addEventListener('DOMContentLoaded', function() {
    // 首页终端模拟器
    const terminalBody = document.querySelector('.terminal-body');
    
    if (terminalBody) {
        // 打字机效果
        const lines = [
            { text: '$ gemini', delay: 0 },
            { text: 'Welcome to Gemini-CLI!', delay: 1000 },
            { text: 'Type /help to see all available commands.', delay: 2000 },
            { text: 'Try asking: 请帮我用 Python 写一个快速排序算法', delay: 3000 }
        ];
        
        let lineIndex = 0;
        let charIndex = 0;
        let currentLine = '';
        
        function typeLine() {
            if (lineIndex < lines.length) {
                const line = lines[lineIndex];
                
                if (charIndex < line.text.length) {
                    currentLine += line.text.charAt(charIndex);
                    terminalBody.innerHTML = getTerminalHTML() + '<div class="terminal-cursor"></div>';
                    charIndex++;
                    setTimeout(typeLine, 50);
                } else {
                    lineIndex++;
                    charIndex = 0;
                    currentLine = '';
                    setTimeout(typeLine, line.delay);
                }
            }
        }
        
        function getTerminalHTML() {
            let html = '';
            // 添加已完成的行
            for (let i = 0; i < lineIndex; i++) {
                const className = i === 0 ? 'terminal-line' : 'terminal-line';
                html += `<div class="${className}">${formatLine(lines[i].text)}</div>`;
            }
            // 添加当前正在输入的行
            if (currentLine) {
                html += `<div class="terminal-line">${formatLine(currentLine)}</div>`;
            }
            return html;
        }
        
        function formatLine(text) {
            // 简单的格式化，将命令部分高亮
            return text.replace(/(\/\w+|请帮我用[\s\S]*算法)/g, '<span class="command">$1</span>');
        }
        
        // 开始打字机效果
        setTimeout(typeLine, 1000);
    }
    
    // 可交互的终端模拟器（简化实现）
    const interactiveTerminals = document.querySelectorAll('.interactive-terminal');
    
    interactiveTerminals.forEach(terminal => {
        const input = terminal.querySelector('.terminal-input');
        const output = terminal.querySelector('.terminal-output');
        
        if (input && output) {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    const command = this.value.trim();
                    if (command) {
                        // 显示用户输入
                        const inputLine = document.createElement('div');
                        inputLine.className = 'terminal-line';
                        inputLine.innerHTML = `<span class="command">$ ${command}</span>`;
                        output.appendChild(inputLine);
                        
                        // 处理命令（简化实现）
                        const responseLine = document.createElement('div');
                        responseLine.className = 'terminal-line';
                        
                        if (command === 'help' || command === '/help') {
                            responseLine.textContent = 'Available commands: /help, /chat, /memory, /tools, /quit';
                        } else if (command === '/help') {
                            responseLine.textContent = '显示所有可用的斜杠命令及其简要说明';
                        } else if (command === '/chat') {
                            responseLine.textContent = '管理对话会话的生命周期';
                        } else if (command === '/memory') {
                            responseLine.textContent = '管理从 GEMINI.md 文件中加载的长期记忆';
                        } else if (command === '/tools') {
                            responseLine.textContent = '列出当前会话所有可用的工具及其状态';
                        } else if (command === '/quit' || command === 'exit') {
                            responseLine.textContent = '退出 Gemini-CLI 交互式会话';
                        } else {
                            responseLine.textContent = `Command not found: ${command}. Type /help for available commands.`;
                        }
                        
                        output.appendChild(responseLine);
                        
                        // 滚动到底部
                        terminal.scrollTop = terminal.scrollHeight;
                        
                        // 清空输入
                        this.value = '';
                    }
                }
            });
        }
    });
});