import React, { useState, useRef, useEffect } from 'react';
import './AIChatbot.css';

function AIChatbot({ onClose, onSnippetGenerated }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '안녕하세요! 👋 Daily Snippet 작성을 도와드리겠습니다.\n\n오늘 하루 어떤 일을 하셨나요? 편하게 말씀해주세요!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // AI 응답 시뮬레이션
    setTimeout(() => {
      const aiResponse = generateAIResponse(input, messages);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const generateAIResponse = (userInput, conversationHistory) => {
    const lowerInput = userInput.toLowerCase();

    // 간단한 AI 응답 로직 (프론트엔드 시뮬레이션)
    if (conversationHistory.length === 1) {
      return {
        role: 'assistant',
        content: `좋아요! "${userInput}"\n\n그 일을 왜 하셨나요? 어떤 목적이나 이유가 있었나요?`
      };
    } else if (conversationHistory.length === 3) {
      return {
        role: 'assistant',
        content: `이해했습니다! 그럼 오늘 하루 중 특별히 잘했다고 생각하는 점이 있나요? (Highlight)`
      };
    } else if (conversationHistory.length === 5) {
      return {
        role: 'assistant',
        content: `좋네요! 그럼 아쉬웠던 점이나 개선하고 싶은 점은 무엇인가요? (Lowlight)`
      };
    } else if (conversationHistory.length === 7) {
      return {
        role: 'assistant',
        content: `마지막으로, 내일은 어떤 일을 할 계획이신가요? (Tomorrow)`
      };
    } else if (conversationHistory.length >= 9) {
      // 스니펫 생성
      const snippet = generateSnippetFromConversation(conversationHistory);
      return {
        role: 'assistant',
        content: `완벽해요! 스니펫이 작성되었습니다. 👍\n\n아래 버튼을 눌러 저장하시거나, 수정이 필요하면 말씀해주세요!`,
        snippet: snippet
      };
    }

    return {
      role: 'assistant',
      content: '계속 말씀해주세요!'
    };
  };

  const generateSnippetFromConversation = (history) => {
    const userMessages = history.filter(msg => msg.role === 'user').map(msg => msg.content);
    
    return {
      what: userMessages[0] || '',
      why: userMessages[1] || '',
      highlight: userMessages[2] || '',
      lowlight: userMessages[3] || '',
      tomorrow: userMessages[4] || ''
    };
  };

  const handleSaveSnippet = (snippet) => {
    const formattedContent = `What (무엇을 했나요?)
${snippet.what}

Why (왜 했나요?)
${snippet.why}

Highlight (잘한 점)
${snippet.highlight}

Lowlight (아쉬운 점)
${snippet.lowlight}

Tomorrow (내일 할 일)
${snippet.tomorrow}`;

    onSnippetGenerated(formattedContent);
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    '오늘 프로젝트 작업했어요',
    '팀 회의에 참석했어요',
    '새로운 기능을 개발했어요',
    '버그를 수정했어요'
  ];

  return (
    <div className="chatbot-overlay" onClick={onClose}>
      <div className="chatbot-container" onClick={(e) => e.stopPropagation()}>
        <div className="chatbot-header">
          <div className="chatbot-title">
            <div className="chatbot-avatar">🤖</div>
            <div>
              <h3>AI 스니펫 어시스턴트</h3>
              <p>대화하면서 스니펫을 작성해보세요</p>
            </div>
          </div>
          <button className="chatbot-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-content">
                {message.content}
                {message.snippet && (
                  <button
                    className="save-snippet-btn"
                    onClick={() => handleSaveSnippet(message.snippet)}
                  >
                    💾 스니펫 저장하기
                  </button>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message assistant">
              <div className="message-content typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="quick-action-btn"
                onClick={() => setInput(action)}
              >
                {action}
              </button>
            ))}
          </div>
        )}

        <div className="chatbot-input">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요... (Enter로 전송)"
            rows="2"
          />
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIChatbot;
