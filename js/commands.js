// 命令速查功能

document.addEventListener('DOMContentLoaded', function() {
    // 命令搜索功能
    const searchInput = document.querySelector('.command-search input');
    const commandCategories = document.querySelectorAll('.category');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            commandCategories.forEach(category => {
                const commands = category.querySelectorAll('li');
                let hasVisibleCommands = false;
                
                commands.forEach(command => {
                    const commandText = command.textContent.toLowerCase();
                    if (commandText.includes(searchTerm)) {
                        command.style.display = 'block';
                        hasVisibleCommands = true;
                    } else {
                        command.style.display = 'none';
                    }
                });
                
                // 隐藏没有匹配命令的分类
                category.style.display = hasVisibleCommands ? 'block' : 'none';
            });
        });
    }
    
    // 命令复制功能
    const commandCards = document.querySelectorAll('.command-card, .category li');
    commandCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 避免在点击链接时触发
            if (e.target.tagName === 'A') return;
            
            // 获取命令文本
            let commandText = '';
            const codeElement = this.querySelector('code');
            const directText = this.textContent.trim();
            
            if (codeElement) {
                commandText = codeElement.textContent;
            } else {
                // 从文本中提取命令（假设以 / 开头）
                const match = directText.match(/\/\w+/);
                if (match) {
                    commandText = match[0];
                }
            }
            
            if (commandText) {
                // 复制到剪贴板
                navigator.clipboard.writeText(commandText).then(() => {
                    // 显示复制成功的提示
                    showToast(`已复制: ${commandText}`);
                }).catch(err => {
                    console.error('复制失败: ', err);
                });
            }
        });
    });
    
    // 创建浮动提示
    function showToast(message) {
        // 移除已存在的提示
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // 创建新提示
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        // 添加样式
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = '#34A853';
        toast.style.color = 'white';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '4px';
        toast.style.zIndex = '3000';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        
        document.body.appendChild(toast);
        
        // 显示动画
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 10);
        
        // 3秒后隐藏并移除
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
    
    // 键盘快捷键支持
    document.addEventListener('keydown', function(e) {
        // Ctrl + Shift + ? 打开命令速查
        if (e.ctrlKey && e.shiftKey && e.key === '?') {
            e.preventDefault();
            const quickReferencePanel = document.getElementById('quick-reference-panel');
            if (quickReferencePanel) {
                quickReferencePanel.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    });
});