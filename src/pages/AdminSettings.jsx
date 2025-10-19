import React, { useState } from 'react';
import './AdminSettings.css';

function AdminSettings() {
  const [activeTab, setActiveTab] = useState('scoring');

  // ADM-001: 채점 기준 설정
  const [scoringCriteria, setScoringCriteria] = useState({
    what: { weight: 20, description: '무엇을 했는지 명확히 기술' },
    why: { weight: 25, description: '왜 그 일을 했는지 이유와 배경' },
    highlight: { weight: 20, description: '잘한 점, 성과' },
    lowlight: { weight: 15, description: '아쉬운 점, 개선점' },
    tomorrow: { weight: 20, description: '내일 할 일 계획' }
  });

  // ADM-002: 팀 구성 정보
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: '김개발', role: 'Frontend Developer', email: 'kim@company.com' },
    { id: 2, name: '이디자인', role: 'UI/UX Designer', email: 'lee@company.com' },
    { id: 3, name: '박백엔드', role: 'Backend Developer', email: 'park@company.com' }
  ]);

  const [teamInfo, setTeamInfo] = useState({
    teamName: 'Daily Snippet Team',
    department: '개발팀'
  });

  // ADM-003: API 키 관리
  const [apiKeys, setApiKeys] = useState({
    gemini: '',
    openai: ''
  });

  const [showApiKeys, setShowApiKeys] = useState({
    gemini: false,
    openai: false
  });

  // ADM-004: 팀 퍼포먼스 데이터 (샘플)
  const [performanceData, setPerformanceData] = useState({
    weekly: {
      avgScore: 78,
      completionRate: 85,
      growthRate: 12
    },
    monthly: {
      avgScore: 75,
      completionRate: 82,
      growthRate: 8
    }
  });

  // ADM-005: 보상 시스템
  const [rewardSystem, setRewardSystem] = useState({
    dailyBonus: 10,
    weeklyBonus: 50,
    monthlyBonus: 200,
    missedPenalty: -5,
    lateSubmissionPenalty: -3
  });

  // ADM-006: 커스터마이징 항목
  const [customFields, setCustomFields] = useState([
    { id: 1, name: 'What', maxScore: 20, required: true, placeholder: '무엇을 했나요?' },
    { id: 2, name: 'Why', maxScore: 25, required: true, placeholder: '왜 했나요?' },
    { id: 3, name: 'Highlight', maxScore: 20, required: true, placeholder: '잘한 점' },
    { id: 4, name: 'Lowlight', maxScore: 15, required: true, placeholder: '아쉬운 점' },
    { id: 5, name: 'Tomorrow', maxScore: 20, required: true, placeholder: '내일 할 일' }
  ]);

  // INT-001: Todo 연동 설정
  const [todoIntegrations, setTodoIntegrations] = useState({
    notion: { enabled: false, apiKey: '', databaseId: '' },
    todoist: { enabled: false, apiKey: '' },
    supabase: { enabled: false, url: '', apiKey: '' }
  });

  // ORG-001: 기업 내 점수 비교 데이터
  const [orgComparison, setOrgComparison] = useState({
    company: '코코네 주식회사',
    departments: [
      { id: 1, name: '개발팀', avgScore: 82, memberCount: 15, growthRate: 8 },
      { id: 2, name: '디자인팀', avgScore: 78, memberCount: 8, growthRate: 5 },
      { id: 3, name: '기획팀', avgScore: 85, memberCount: 10, growthRate: 12 },
      { id: 4, name: '마케팅팀', avgScore: 75, memberCount: 12, growthRate: -2 },
      { id: 5, name: '경영지원팀', avgScore: 80, memberCount: 6, growthRate: 6 }
    ]
  });

  // ORG-002: 조직 단위별 순위
  const [orgRankings, setOrgRankings] = useState({
    type: 'company', // 'company', 'school', 'department'
    rankings: [
      { rank: 1, name: '코코네 주식회사', avgScore: 87, memberCount: 120, completionRate: 92 },
      { rank: 2, name: 'ABC 테크놀로지', avgScore: 85, memberCount: 95, completionRate: 88 },
      { rank: 3, name: 'XYZ 소프트웨어', avgScore: 83, memberCount: 80, completionRate: 85 },
      { rank: 4, name: '디지털 솔루션즈', avgScore: 81, memberCount: 110, completionRate: 82 },
      { rank: 5, name: '혁신 IT', avgScore: 79, memberCount: 70, completionRate: 80 }
    ]
  });

  // ORG-003: 주간 리포트 설정
  const [reportSettings, setReportSettings] = useState({
    enabled: true,
    frequency: 'weekly', // 'daily', 'weekly', 'monthly'
    sendDay: 'monday', // 요일
    sendTime: '09:00',
    recipients: [
      { id: 1, email: 'team@company.com', type: 'team' },
      { id: 2, email: 'manager@company.com', type: 'manager' }
    ],
    includeCharts: true,
    includeComments: true,
    includeComparison: true
  });

  // 채점 기준 가중치 변경
  const handleWeightChange = (field, value) => {
    const numValue = parseInt(value) || 0;
    setScoringCriteria(prev => ({
      ...prev,
      [field]: { ...prev[field], weight: Math.min(100, Math.max(0, numValue)) }
    }));
  };

  // 총 가중치 계산
  const getTotalWeight = () => {
    return Object.values(scoringCriteria).reduce((sum, item) => sum + item.weight, 0);
  };

  // 팀원 추가
  const handleAddMember = () => {
    const newMember = {
      id: Date.now(),
      name: '',
      role: '',
      email: ''
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  // 팀원 정보 수정
  const handleMemberChange = (id, field, value) => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  // 팀원 삭제
  const handleDeleteMember = (id) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
  };

  // API 키 저장
  const handleSaveApiKey = (provider) => {
    alert(`${provider === 'gemini' ? 'Gemini' : 'OpenAI'} API 키가 저장되었습니다.`);
  };

  // 설정 저장
  const handleSaveSettings = () => {
    const totalWeight = getTotalWeight();
    if (totalWeight !== 100) {
      alert(`가중치 합계가 ${totalWeight}%입니다. 100%로 맞춰주세요.`);
      return;
    }
    alert('설정이 저장되었습니다!');
  };

  return (
    <div className="admin-settings">
      <div className="admin-header">
        <h1>⚙️ 관리자 설정</h1>
        <p>AI 채점 기준, 팀 구성, API 키를 관리합니다</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'scoring' ? 'active' : ''}`}
          onClick={() => setActiveTab('scoring')}
        >
          📊 채점 기준
        </button>
        <button
          className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => setActiveTab('team')}
        >
          👥 팀 구성
        </button>
        <button
          className={`tab-btn ${activeTab === 'api' ? 'active' : ''}`}
          onClick={() => setActiveTab('api')}
        >
          🔑 API 키
        </button>
        <button
          className={`tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          📈 퍼포먼스
        </button>
        <button
          className={`tab-btn ${activeTab === 'rewards' ? 'active' : ''}`}
          onClick={() => setActiveTab('rewards')}
        >
          🎁 보상 시스템
        </button>
        <button
          className={`tab-btn ${activeTab === 'customize' ? 'active' : ''}`}
          onClick={() => setActiveTab('customize')}
        >
          ✏️ 항목 커스터마이징
        </button>
        <button
          className={`tab-btn ${activeTab === 'integrations' ? 'active' : ''}`}
          onClick={() => setActiveTab('integrations')}
        >
          🔗 연동 설정
        </button>
        <button
          className={`tab-btn ${activeTab === 'orgComparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('orgComparison')}
        >
          🏢 부서별 비교
        </button>
        <button
          className={`tab-btn ${activeTab === 'orgRankings' ? 'active' : ''}`}
          onClick={() => setActiveTab('orgRankings')}
        >
          🏆 조직 순위
        </button>
        <button
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          📧 주간 리포트
        </button>
      </div>

      <div className="admin-content">
        {/* ADM-001: 채점 기준 설정 */}
        {activeTab === 'scoring' && (
          <div className="scoring-settings">
            <h2>AI 채점 기준 설정</h2>
            <p className="description">각 항목의 가중치를 조정하세요 (합계: {getTotalWeight()}%)</p>
            
            <div className="total-weight-indicator">
              <div className="weight-bar">
                <div 
                  className="weight-fill" 
                  style={{ 
                    width: `${getTotalWeight()}%`,
                    backgroundColor: getTotalWeight() === 100 ? '#10b981' : '#f59e0b'
                  }}
                />
              </div>
              <span className={getTotalWeight() === 100 ? 'valid' : 'invalid'}>
                {getTotalWeight()}%
              </span>
            </div>

            <div className="criteria-list">
              {Object.entries(scoringCriteria).map(([key, value]) => (
                <div key={key} className="criteria-item">
                  <div className="criteria-header">
                    <h3>{key.toUpperCase()}</h3>
                    <div className="weight-input">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={value.weight}
                        onChange={(e) => handleWeightChange(key, e.target.value)}
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <p className="criteria-desc">{value.description}</p>
                  <div className="criteria-bar">
                    <div 
                      className="criteria-fill" 
                      style={{ width: `${value.weight}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="save-btn" onClick={handleSaveSettings}>
              💾 설정 저장
            </button>
          </div>
        )}

        {/* ADM-002: 팀 구성 관리 */}
        {activeTab === 'team' && (
          <div className="team-settings">
            <h2>팀 구성 관리</h2>
            
            <div className="team-info-section">
              <h3>팀 정보</h3>
              <div className="team-info-inputs">
                <div className="input-group">
                  <label>팀명</label>
                  <input
                    type="text"
                    value={teamInfo.teamName}
                    onChange={(e) => setTeamInfo(prev => ({ ...prev, teamName: e.target.value }))}
                    placeholder="팀 이름"
                  />
                </div>
                <div className="input-group">
                  <label>부서</label>
                  <input
                    type="text"
                    value={teamInfo.department}
                    onChange={(e) => setTeamInfo(prev => ({ ...prev, department: e.target.value }))}
                    placeholder="소속 부서"
                  />
                </div>
              </div>
            </div>

            <div className="team-members-section">
              <div className="section-header">
                <h3>팀원 관리 ({teamMembers.length}명)</h3>
                <button className="add-member-btn" onClick={handleAddMember}>
                  ➕ 팀원 추가
                </button>
              </div>

              <div className="members-list">
                {teamMembers.map(member => (
                  <div key={member.id} className="member-card">
                    <div className="member-inputs">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                        placeholder="이름"
                        className="name-input"
                      />
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => handleMemberChange(member.id, 'role', e.target.value)}
                        placeholder="역할"
                        className="role-input"
                      />
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) => handleMemberChange(member.id, 'email', e.target.value)}
                        placeholder="이메일"
                        className="email-input"
                      />
                    </div>
                    <button
                      className="delete-member-btn"
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className="save-btn" onClick={handleSaveSettings}>
              💾 팀 정보 저장
            </button>
          </div>
        )}

        {/* ADM-003: API 키 관리 */}
        {activeTab === 'api' && (
          <div className="api-settings">
            <h2>API 키 관리</h2>
            <p className="description">AI 채점에 사용할 API 키를 등록하세요</p>

            <div className="api-key-section">
              <div className="api-provider">
                <div className="provider-header">
                  <div className="provider-info">
                    <h3>🤖 Google Gemini API</h3>
                    <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
                      API 키 발급받기 →
                    </a>
                  </div>
                </div>
                <div className="api-input-group">
                  <input
                    type={showApiKeys.gemini ? 'text' : 'password'}
                    value={apiKeys.gemini}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, gemini: e.target.value }))}
                    placeholder="Gemini API 키를 입력하세요"
                    className="api-key-input"
                  />
                  <button
                    className="toggle-visibility-btn"
                    onClick={() => setShowApiKeys(prev => ({ ...prev, gemini: !prev.gemini }))}
                  >
                    {showApiKeys.gemini ? '🙈' : '👁️'}
                  </button>
                  <button
                    className="save-api-btn"
                    onClick={() => handleSaveApiKey('gemini')}
                    disabled={!apiKeys.gemini}
                  >
                    저장
                  </button>
                </div>
              </div>

              <div className="api-provider">
                <div className="provider-header">
                  <div className="provider-info">
                    <h3>🧠 OpenAI API</h3>
                    <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
                      API 키 발급받기 →
                    </a>
                  </div>
                </div>
                <div className="api-input-group">
                  <input
                    type={showApiKeys.openai ? 'text' : 'password'}
                    value={apiKeys.openai}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, openai: e.target.value }))}
                    placeholder="OpenAI API 키를 입력하세요"
                    className="api-key-input"
                  />
                  <button
                    className="toggle-visibility-btn"
                    onClick={() => setShowApiKeys(prev => ({ ...prev, openai: !prev.openai }))}
                  >
                    {showApiKeys.openai ? '🙈' : '👁️'}
                  </button>
                  <button
                    className="save-api-btn"
                    onClick={() => handleSaveApiKey('openai')}
                    disabled={!apiKeys.openai}
                  >
                    저장
                  </button>
                </div>
              </div>
            </div>

            <div className="api-status">
              <h3>연결 상태</h3>
              <div className="status-list">
                <div className="status-item">
                  <span className={`status-indicator ${apiKeys.gemini ? 'active' : 'inactive'}`} />
                  <span>Gemini API</span>
                  <span className="status-text">
                    {apiKeys.gemini ? '✅ 연결됨' : '⭕ 미연결'}
                  </span>
                </div>
                <div className="status-item">
                  <span className={`status-indicator ${apiKeys.openai ? 'active' : 'inactive'}`} />
                  <span>OpenAI API</span>
                  <span className="status-text">
                    {apiKeys.openai ? '✅ 연결됨' : '⭕ 미연결'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADM-004: 팀 퍼포먼스 대시보드 */}
        {activeTab === 'performance' && (
          <div className="performance-dashboard">
            <h2>팀 퍼포먼스 대시보드</h2>
            <p className="description">팀의 주간/월간 성과를 확인하세요</p>

            <div className="performance-cards">
              <div className="perf-card">
                <div className="perf-icon">📊</div>
                <div className="perf-content">
                  <h3>주간 평균 점수</h3>
                  <div className="perf-value">{performanceData.weekly.avgScore}점</div>
                  <div className="perf-change positive">+5점</div>
                </div>
              </div>

              <div className="perf-card">
                <div className="perf-icon">✍️</div>
                <div className="perf-content">
                  <h3>주간 작성률</h3>
                  <div className="perf-value">{performanceData.weekly.completionRate}%</div>
                  <div className="perf-change positive">+3%</div>
                </div>
              </div>

              <div className="perf-card">
                <div className="perf-icon">📈</div>
                <div className="perf-content">
                  <h3>주간 성장률</h3>
                  <div className="perf-value">+{performanceData.weekly.growthRate}%</div>
                  <div className="perf-change positive">향상 중</div>
                </div>
              </div>
            </div>

            <div className="chart-section">
              <h3>월간 트렌드</h3>
              <div className="chart-placeholder">
                <div className="chart-bars">
                  <div className="chart-bar" style={{ height: '60%' }}>
                    <span className="bar-label">1주차</span>
                    <span className="bar-value">72점</span>
                  </div>
                  <div className="chart-bar" style={{ height: '70%' }}>
                    <span className="bar-label">2주차</span>
                    <span className="bar-value">75점</span>
                  </div>
                  <div className="chart-bar" style={{ height: '85%' }}>
                    <span className="bar-label">3주차</span>
                    <span className="bar-value">78점</span>
                  </div>
                  <div className="chart-bar active" style={{ height: '95%' }}>
                    <span className="bar-label">4주차</span>
                    <span className="bar-value">82점</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="team-rankings">
              <h3>팀원별 순위</h3>
              <div className="ranking-list">
                <div className="ranking-item rank-1">
                  <span className="rank-badge">🥇</span>
                  <span className="member-name">김개발</span>
                  <span className="member-score">92점</span>
                  <span className="member-rate">100%</span>
                </div>
                <div className="ranking-item rank-2">
                  <span className="rank-badge">🥈</span>
                  <span className="member-name">이디자인</span>
                  <span className="member-score">88점</span>
                  <span className="member-rate">95%</span>
                </div>
                <div className="ranking-item rank-3">
                  <span className="rank-badge">🥉</span>
                  <span className="member-name">박백엔드</span>
                  <span className="member-score">85점</span>
                  <span className="member-rate">90%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADM-005: 당근과 채찍 시스템 */}
        {activeTab === 'rewards' && (
          <div className="rewards-system">
            <h2>보상 시스템 설정</h2>
            <p className="description">목표 달성 시 포인트 보상과 미작성 시 감점을 설정하세요</p>

            <div className="rewards-section">
              <h3>🎁 보상 설정 (당근)</h3>
              <div className="reward-items">
                <div className="reward-item">
                  <label>데일리 작성 완료</label>
                  <input
                    type="number"
                    value={rewardSystem.dailyBonus}
                    onChange={(e) => setRewardSystem(prev => ({ ...prev, dailyBonus: parseInt(e.target.value) || 0 }))}
                  />
                  <span className="points-label">포인트</span>
                </div>
                <div className="reward-item">
                  <label>주간 연속 작성</label>
                  <input
                    type="number"
                    value={rewardSystem.weeklyBonus}
                    onChange={(e) => setRewardSystem(prev => ({ ...prev, weeklyBonus: parseInt(e.target.value) || 0 }))}
                  />
                  <span className="points-label">포인트</span>
                </div>
                <div className="reward-item">
                  <label>월간 우수 스니펫</label>
                  <input
                    type="number"
                    value={rewardSystem.monthlyBonus}
                    onChange={(e) => setRewardSystem(prev => ({ ...prev, monthlyBonus: parseInt(e.target.value) || 0 }))}
                  />
                  <span className="points-label">포인트</span>
                </div>
              </div>
            </div>

            <div className="penalties-section">
              <h3>⚠️ 감점 설정 (채찍)</h3>
              <div className="penalty-items">
                <div className="penalty-item">
                  <label>미작성</label>
                  <input
                    type="number"
                    value={rewardSystem.missedPenalty}
                    onChange={(e) => setRewardSystem(prev => ({ ...prev, missedPenalty: parseInt(e.target.value) || 0 }))}
                  />
                  <span className="points-label">포인트</span>
                </div>
                <div className="penalty-item">
                  <label>지각 제출</label>
                  <input
                    type="number"
                    value={rewardSystem.lateSubmissionPenalty}
                    onChange={(e) => setRewardSystem(prev => ({ ...prev, lateSubmissionPenalty: parseInt(e.target.value) || 0 }))}
                  />
                  <span className="points-label">포인트</span>
                </div>
              </div>
            </div>

            <div className="reward-preview">
              <h3>포인트 시뮬레이션</h3>
              <div className="simulation-box">
                <div className="sim-item gain">
                  <span>7일 연속 작성 시</span>
                  <span className="sim-value">+{rewardSystem.dailyBonus * 7 + rewardSystem.weeklyBonus}P</span>
                </div>
                <div className="sim-item loss">
                  <span>3일 미작성 시</span>
                  <span className="sim-value">{rewardSystem.missedPenalty * 3}P</span>
                </div>
              </div>
            </div>

            <button className="save-btn" onClick={handleSaveSettings}>
              💾 보상 시스템 저장
            </button>
          </div>
        )}

        {/* ADM-006: 스니펫 항목 커스터마이징 */}
        {activeTab === 'customize' && (
          <div className="customize-fields">
            <h2>스니펫 항목 커스터마이징</h2>
            <p className="description">스니펫 작성 항목과 점수 기준을 자유롭게 수정하세요</p>

            <button className="add-field-btn" onClick={() => {
              const newField = {
                id: Date.now(),
                name: '',
                maxScore: 10,
                required: false,
                placeholder: ''
              };
              setCustomFields([...customFields, newField]);
            }}>
              ➕ 항목 추가
            </button>

            <div className="custom-fields-list">
              {customFields.map((field, index) => (
                <div key={field.id} className="custom-field-item">
                  <div className="field-order">{index + 1}</div>
                  <div className="field-inputs">
                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) => {
                        setCustomFields(prev => prev.map(f =>
                          f.id === field.id ? { ...f, name: e.target.value } : f
                        ));
                      }}
                      placeholder="항목명 (예: What, Why)"
                      className="field-name-input"
                    />
                    <input
                      type="number"
                      value={field.maxScore}
                      onChange={(e) => {
                        setCustomFields(prev => prev.map(f =>
                          f.id === field.id ? { ...f, maxScore: parseInt(e.target.value) || 0 } : f
                        ));
                      }}
                      className="field-score-input"
                    />
                    <input
                      type="text"
                      value={field.placeholder}
                      onChange={(e) => {
                        setCustomFields(prev => prev.map(f =>
                          f.id === field.id ? { ...f, placeholder: e.target.value } : f
                        ));
                      }}
                      placeholder="안내 문구 (예: 무엇을 했나요?)"
                      className="field-placeholder-input"
                    />
                    <label className="field-required">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => {
                          setCustomFields(prev => prev.map(f =>
                            f.id === field.id ? { ...f, required: e.target.checked } : f
                          ));
                        }}
                      />
                      필수
                    </label>
                    <button
                      className="delete-field-btn"
                      onClick={() => setCustomFields(prev => prev.filter(f => f.id !== field.id))}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="total-score-info">
              <h3>총 배점</h3>
              <div className="total-score-value">
                {customFields.reduce((sum, field) => sum + field.maxScore, 0)}점
              </div>
            </div>

            <button className="save-btn" onClick={handleSaveSettings}>
              💾 항목 설정 저장
            </button>
          </div>
        )}

        {/* INT-001: Todo 연동 설정 */}
        {activeTab === 'integrations' && (
          <div className="integrations-settings">
            <h2>외부 서비스 연동</h2>
            <p className="description">Notion, Todoist, Supabase와 연동하여 Today/Tomorrow를 자동으로 가져옵니다</p>

            <div className="integration-cards">
              {/* Notion 연동 */}
              <div className="integration-card">
                <div className="integration-header">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="integration-logo" />
                  <div className="integration-info">
                    <h3>Notion</h3>
                    <p>Notion 데이터베이스와 동기화</p>
                  </div>
                  <label className="integration-toggle">
                    <input
                      type="checkbox"
                      checked={todoIntegrations.notion.enabled}
                      onChange={(e) => setTodoIntegrations(prev => ({
                        ...prev,
                        notion: { ...prev.notion, enabled: e.target.checked }
                      }))}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                {todoIntegrations.notion.enabled && (
                  <div className="integration-config">
                    <input
                      type="password"
                      placeholder="Notion API Key"
                      value={todoIntegrations.notion.apiKey}
                      onChange={(e) => setTodoIntegrations(prev => ({
                        ...prev,
                        notion: { ...prev.notion, apiKey: e.target.value }
                      }))}
                    />
                    <input
                      type="text"
                      placeholder="Database ID"
                      value={todoIntegrations.notion.databaseId}
                      onChange={(e) => setTodoIntegrations(prev => ({
                        ...prev,
                        notion: { ...prev.notion, databaseId: e.target.value }
                      }))}
                    />
                    <button className="test-connection-btn">연결 테스트</button>
                  </div>
                )}
              </div>

              {/* Todoist 연동 */}
              <div className="integration-card">
                <div className="integration-header">
                  <div className="integration-icon">✓</div>
                  <div className="integration-info">
                    <h3>Todoist</h3>
                    <p>Todoist 작업 목록 동기화</p>
                  </div>
                  <label className="integration-toggle">
                    <input
                      type="checkbox"
                      checked={todoIntegrations.todoist.enabled}
                      onChange={(e) => setTodoIntegrations(prev => ({
                        ...prev,
                        todoist: { ...prev.todoist, enabled: e.target.checked }
                      }))}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                {todoIntegrations.todoist.enabled && (
                  <div className="integration-config">
                    <input
                      type="password"
                      placeholder="Todoist API Token"
                      value={todoIntegrations.todoist.apiKey}
                      onChange={(e) => setTodoIntegrations(prev => ({
                        ...prev,
                        todoist: { ...prev.todoist, apiKey: e.target.value }
                      }))}
                    />
                    <button className="test-connection-btn">연결 테스트</button>
                  </div>
                )}
              </div>

              {/* Supabase 연동 */}
              <div className="integration-card">
                <div className="integration-header">
                  <div className="integration-icon">⚡</div>
                  <div className="integration-info">
                    <h3>Supabase</h3>
                    <p>Supabase DB와 실시간 동기화</p>
                  </div>
                  <label className="integration-toggle">
                    <input
                      type="checkbox"
                      checked={todoIntegrations.supabase.enabled}
                      onChange={(e) => setTodoIntegrations(prev => ({
                        ...prev,
                        supabase: { ...prev.supabase, enabled: e.target.checked }
                      }))}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                {todoIntegrations.supabase.enabled && (
                  <div className="integration-config">
                    <input
                      type="url"
                      placeholder="Supabase URL"
                      value={todoIntegrations.supabase.url}
                      onChange={(e) => setTodoIntegrations(prev => ({
                        ...prev,
                        supabase: { ...prev.supabase, url: e.target.value }
                      }))}
                    />
                    <input
                      type="password"
                      placeholder="Supabase API Key"
                      value={todoIntegrations.supabase.apiKey}
                      onChange={(e) => setTodoIntegrations(prev => ({
                        ...prev,
                        supabase: { ...prev.supabase, apiKey: e.target.value }
                      }))}
                    />
                    <button className="test-connection-btn">연결 테스트</button>
                  </div>
                )}
              </div>
            </div>

            <button className="save-btn" onClick={handleSaveSettings}>
              💾 연동 설정 저장
            </button>
          </div>
        )}

        {/* ORG-001: 기업 내 점수 비교 */}
        {activeTab === 'orgComparison' && (
          <div className="org-comparison-settings">
            <h2>기업 내 부서별 점수 비교</h2>
            <p className="description">동일 기업 내 부서별 평균 점수를 비교하고 분석합니다</p>

            <div className="company-info-card">
              <div className="company-header">
                <span className="company-icon">🏢</span>
                <h3>{orgComparison.company}</h3>
              </div>
              <div className="company-stats">
                <div className="stat-item">
                  <span className="stat-label">전체 부서</span>
                  <span className="stat-value">{orgComparison.departments.length}개</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">전체 인원</span>
                  <span className="stat-value">
                    {orgComparison.departments.reduce((sum, dept) => sum + dept.memberCount, 0)}명
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">평균 점수</span>
                  <span className="stat-value">
                    {Math.round(orgComparison.departments.reduce((sum, dept) => sum + dept.avgScore, 0) / orgComparison.departments.length)}점
                  </span>
                </div>
              </div>
            </div>

            <div className="departments-comparison">
              <h3>부서별 성과 비교</h3>
              <div className="comparison-table">
                <div className="table-header">
                  <div className="col-rank">순위</div>
                  <div className="col-dept">부서명</div>
                  <div className="col-score">평균 점수</div>
                  <div className="col-members">인원</div>
                  <div className="col-growth">성장률</div>
                </div>
                {[...orgComparison.departments]
                  .sort((a, b) => b.avgScore - a.avgScore)
                  .map((dept, index) => (
                    <div key={dept.id} className={`table-row ${index === 0 ? 'top-rank' : ''}`}>
                      <div className="col-rank">
                        {index === 0 && '🥇'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index > 2 && `${index + 1}위`}
                      </div>
                      <div className="col-dept">{dept.name}</div>
                      <div className="col-score">
                        <div className="score-bar-container">
                          <div className="score-bar" style={{ width: `${dept.avgScore}%` }}></div>
                          <span className="score-text">{dept.avgScore}점</span>
                        </div>
                      </div>
                      <div className="col-members">{dept.memberCount}명</div>
                      <div className="col-growth">
                        <span className={`growth-badge ${dept.growthRate >= 0 ? 'positive' : 'negative'}`}>
                          {dept.growthRate >= 0 ? '↑' : '↓'} {Math.abs(dept.growthRate)}%
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="comparison-chart-section">
              <h3>부서별 성과 시각화</h3>
              <div className="chart-container">
                {orgComparison.departments.map(dept => (
                  <div key={dept.id} className="chart-bar-item">
                    <div className="chart-label">{dept.name}</div>
                    <div className="chart-bar-wrapper">
                      <div 
                        className="chart-bar-fill" 
                        style={{ width: `${(dept.avgScore / 100) * 100}%` }}
                      >
                        <span className="chart-value">{dept.avgScore}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ORG-002: 기업/학교/부서별 순위 */}
        {activeTab === 'orgRankings' && (
          <div className="org-rankings-settings">
            <h2>조직 단위별 순위</h2>
            <p className="description">기업, 학교, 부서 단위의 전체 순위와 리포트</p>

            <div className="ranking-type-selector">
              <button 
                className={`type-btn ${orgRankings.type === 'company' ? 'active' : ''}`}
                onClick={() => setOrgRankings(prev => ({ ...prev, type: 'company' }))}
              >
                🏢 기업별
              </button>
              <button 
                className={`type-btn ${orgRankings.type === 'school' ? 'active' : ''}`}
                onClick={() => setOrgRankings(prev => ({ ...prev, type: 'school' }))}
              >
                🎓 학교별
              </button>
              <button 
                className={`type-btn ${orgRankings.type === 'department' ? 'active' : ''}`}
                onClick={() => setOrgRankings(prev => ({ ...prev, type: 'department' }))}
              >
                📁 부서별
              </button>
            </div>

            <div className="rankings-podium">
              {orgRankings.rankings.slice(0, 3).map((org, index) => (
                <div key={org.rank} className={`podium-item rank-${index + 1}`}>
                  <div className="podium-medal">
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                  </div>
                  <div className="podium-info">
                    <div className="podium-rank">#{org.rank}</div>
                    <div className="podium-name">{org.name}</div>
                    <div className="podium-score">{org.avgScore}점</div>
                    <div className="podium-details">
                      <span>👥 {org.memberCount}명</span>
                      <span>✓ {org.completionRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rankings-list">
              <h3>전체 순위</h3>
              {orgRankings.rankings.map((org) => (
                <div key={org.rank} className={`ranking-item ${org.rank <= 3 ? 'top-three' : ''}`}>
                  <div className="ranking-position">
                    <span className="rank-number">#{org.rank}</span>
                  </div>
                  <div className="ranking-content">
                    <div className="ranking-main">
                      <h4>{org.name}</h4>
                      <div className="ranking-metrics">
                        <span className="metric">
                          <span className="metric-icon">⭐</span>
                          <span className="metric-value">{org.avgScore}점</span>
                        </span>
                        <span className="metric">
                          <span className="metric-icon">👥</span>
                          <span className="metric-value">{org.memberCount}명</span>
                        </span>
                        <span className="metric">
                          <span className="metric-icon">✓</span>
                          <span className="metric-value">{org.completionRate}%</span>
                        </span>
                      </div>
                    </div>
                    <div className="ranking-progress">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${org.avgScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ranking-export">
              <button className="export-btn">
                📊 리포트 다운로드 (PDF)
              </button>
              <button className="export-btn">
                📈 엑셀 내보내기
              </button>
            </div>
          </div>
        )}

        {/* ORG-003: 주간 리포트 기능 */}
        {activeTab === 'reports' && (
          <div className="reports-settings">
            <h2>주간 리포트 자동 발송</h2>
            <p className="description">개인 및 팀 리포트를 자동으로 생성하고 이메일로 발송합니다</p>

            <div className="report-toggle-card">
              <div className="toggle-header">
                <div>
                  <h3>리포트 자동 발송</h3>
                  <p>정기적으로 성과 리포트를 이메일로 전송합니다</p>
                </div>
                <label className="report-main-toggle">
                  <input
                    type="checkbox"
                    checked={reportSettings.enabled}
                    onChange={(e) => setReportSettings(prev => ({
                      ...prev,
                      enabled: e.target.checked
                    }))}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            {reportSettings.enabled && (
              <>
                <div className="report-schedule-section">
                  <h3>발송 스케줄</h3>
                  <div className="schedule-options">
                    <div className="option-group">
                      <label>발송 주기</label>
                      <select
                        value={reportSettings.frequency}
                        onChange={(e) => setReportSettings(prev => ({
                          ...prev,
                          frequency: e.target.value
                        }))}
                      >
                        <option value="daily">매일</option>
                        <option value="weekly">매주</option>
                        <option value="monthly">매월</option>
                      </select>
                    </div>

                    {reportSettings.frequency === 'weekly' && (
                      <div className="option-group">
                        <label>발송 요일</label>
                        <select
                          value={reportSettings.sendDay}
                          onChange={(e) => setReportSettings(prev => ({
                            ...prev,
                            sendDay: e.target.value
                          }))}
                        >
                          <option value="monday">월요일</option>
                          <option value="tuesday">화요일</option>
                          <option value="wednesday">수요일</option>
                          <option value="thursday">목요일</option>
                          <option value="friday">금요일</option>
                        </select>
                      </div>
                    )}

                    <div className="option-group">
                      <label>발송 시간</label>
                      <input
                        type="time"
                        value={reportSettings.sendTime}
                        onChange={(e) => setReportSettings(prev => ({
                          ...prev,
                          sendTime: e.target.value
                        }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="report-content-section">
                  <h3>리포트 내용 설정</h3>
                  <div className="content-options">
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={reportSettings.includeCharts}
                        onChange={(e) => setReportSettings(prev => ({
                          ...prev,
                          includeCharts: e.target.checked
                        }))}
                      />
                      <span>📊 성과 차트 포함</span>
                    </label>
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={reportSettings.includeComments}
                        onChange={(e) => setReportSettings(prev => ({
                          ...prev,
                          includeComments: e.target.checked
                        }))}
                      />
                      <span>💬 AI 코멘트 포함</span>
                    </label>
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={reportSettings.includeComparison}
                        onChange={(e) => setReportSettings(prev => ({
                          ...prev,
                          includeComparison: e.target.checked
                        }))}
                      />
                      <span>📈 팀 비교 분석 포함</span>
                    </label>
                  </div>
                </div>

                <div className="report-recipients-section">
                  <h3>수신자 관리</h3>
                  <div className="recipients-list">
                    {reportSettings.recipients.map((recipient) => (
                      <div key={recipient.id} className="recipient-item">
                        <span className="recipient-icon">
                          {recipient.type === 'team' ? '👥' : '👤'}
                        </span>
                        <div className="recipient-info">
                          <span className="recipient-email">{recipient.email}</span>
                          <span className="recipient-type">
                            {recipient.type === 'team' ? '팀 전체' : '관리자'}
                          </span>
                        </div>
                        <button className="remove-recipient-btn">✕</button>
                      </div>
                    ))}
                  </div>
                  <button className="add-recipient-btn">+ 수신자 추가</button>
                </div>

                <div className="report-preview-section">
                  <h3>리포트 미리보기</h3>
                  <div className="preview-card">
                    <div className="preview-header">
                      <h4>📊 주간 성과 리포트</h4>
                      <span className="preview-date">2025년 10월 14일 - 10월 18일</span>
                    </div>
                    <div className="preview-body">
                      <div className="preview-section">
                        <h5>개인 성과</h5>
                        <div className="preview-stats">
                          <div className="preview-stat">
                            <span className="stat-label">평균 점수</span>
                            <span className="stat-value">82점</span>
                          </div>
                          <div className="preview-stat">
                            <span className="stat-label">작성률</span>
                            <span className="stat-value">100%</span>
                          </div>
                          <div className="preview-stat">
                            <span className="stat-label">주간 성장</span>
                            <span className="stat-value">+8%</span>
                          </div>
                        </div>
                      </div>
                      <div className="preview-section">
                        <h5>팀 순위</h5>
                        <p className="preview-text">개발팀 내 3위 / 15명 중</p>
                      </div>
                      {reportSettings.includeComments && (
                        <div className="preview-section">
                          <h5>AI 코멘트</h5>
                          <p className="preview-comment">
                            "이번 주는 특히 프로젝트 완성도가 높았습니다. 
                            Tomorrow 계획의 실행률도 우수합니다."
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="report-actions">
                  <button className="test-send-btn">
                    ✉️ 테스트 발송
                  </button>
                  <button className="save-btn" onClick={handleSaveSettings}>
                    💾 설정 저장
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSettings;
