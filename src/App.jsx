import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Step1MaterialUpload from './components/Step1MaterialUpload';
import Step2GenerationSettings from './components/Step2GenerationSettings';
import Step3Workbench from './components/Step3Workbench';
import Step4Export from './components/Step4Export';
import Step4WebpPromoGenerator from './components/Step4WebpPromoGenerator';
import Step5Mp4FastConverter from './components/Step5Mp4FastConverter';
import ApiKeyModal from './components/ApiKeyModal';
import KnowledgeModal from './components/KnowledgeModal';
import OpenTaskModal from './components/OpenTaskModal';
import AuthModal from './components/AuthModal';
import AdminUserApprovalModal from './components/AdminUserApprovalModal';
import LoadingOverlay from './components/LoadingOverlay';
import { MASTER_26_SLIDES } from './data/slidesBlueprint';

export default function App() {
  // Master Account Pre-configured & Auth State
  const [currentUser, setCurrentUser] = useState({ email: 'lmhyeok@naver.com', role: 'master' });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminApprovalOpen, setIsAdminApprovalOpen] = useState(false);

  // Master Admin User Approval Database State
  const [pendingUsers, setPendingUsers] = useState([
    { email: 'seller1@farm.com', bizName: '성주 참외 직영농원', bizNo: '214-88-12345', status: 'pending_approval' },
    { email: 'seafood@ocean.co.kr', bizName: '동해수산 주식회사', bizNo: '105-86-99887', status: 'pending_approval' }
  ]);

  // Navigation tabs: 'dashboard' (01), 'work' (02), 'result' (03), 'webp_promo' (04), 'mp4_fast' (05)
  const [activeTab, setActiveTab] = useState('dashboard');
  const [subStep, setSubStep] = useState(1);

  // Strict Sequential Step Locking States
  const [step1Done, setStep1Done] = useState(false); // True after 01 Dashboard material upload & AI generation
  const [step2Done, setStep2Done] = useState(false); // True after 02 Workbench slide review/export

  const [slides, setSlides] = useState(MASTER_26_SLIDES);
  const [canvasWidth, setCanvasWidth] = useState('860');

  // Step 1 State
  const [productImages, setProductImages] = useState([]);
  const [modelImages, setModelImages] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [reviewFile, setReviewFile] = useState(null);

  // Knowledge Files State
  const [knowledgeFiles, setKnowledgeFiles] = useState([
    { id: 1, name: '[나노바나나 최적화] 인물 구도 프롬프트 모음.pdf', size: '53.6 KB' },
    { id: 2, name: 'SNS 수익화 단계별 전략_일침스튜디오.pdf', size: '193.8 KB' },
    { id: 3, name: '실사형 AI 인물 디테일 종결! - 제작 가이드북.pdf', size: '10872.6 KB' }
  ]);

  // Loading Modal State
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(22);
  const [loadingTitle, setLoadingTitle] = useState('AI가 상세페이지 구조를 만드는 중입니다');

  // Modals State
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false);
  const [isOpenTaskModalOpen, setIsOpenTaskModalOpen] = useState(false);

  // Sample API keys
  const [openaiKey, setOpenaiKey] = useState('sk-proj-sample-linked-key');
  const [geminiKey, setGeminiKey] = useState('AIzaSy-sample-linked-key');

  useEffect(() => {
    const savedOpenai = localStorage.getItem('openai_key');
    const savedGemini = localStorage.getItem('gemini_key');
    if (savedOpenai) setOpenaiKey(savedOpenai);
    if (savedGemini) setGeminiKey(savedGemini);
  }, []);

  const handleSaveApiKeys = () => {
    localStorage.setItem('openai_key', openaiKey);
    localStorage.setItem('gemini_key', geminiKey);
    setIsApiModalOpen(false);
    alert('🎉 API 키가 성공적으로 연동되었습니다!');
  };

  // Step 1 -> Step 2 Unlock & AI Generation Transition
  const handleGenerateHero = () => {
    setIsLoading(true);
    setLoadingProgress(22);
    setLoadingTitle('AI가 상세페이지 구조를 만드는 중입니다');

    let current = 22;
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        clearInterval(interval);
        setIsLoading(false);
        setStep1Done(true); // Unlock Step 2 (02 상세페이지 작업)!
        setSubStep(3);
        setActiveTab('work');
      } else {
        setLoadingProgress(current);
      }
    }, 400);
  };

  const handleSubStepChange = (targetSubStep) => {
    if (targetSubStep === 2) {
      if (productImages.length === 0 && modelImages.length === 0 && !additionalInfo.trim()) {
        const proceed = window.confirm('⚠️ 아직 등록된 상품 이미지나 설명 문구가 없습니다. 기본 예시 샘플 자료로 진행하시겠습니까?');
        if (!proceed) return;
      }
    }
    setSubStep(targetSubStep);
  };

  const handleLoadTask = (taskData) => {
    setStep1Done(true);
    setStep2Done(true);
    setActiveTab('work');
    alert(`📂 '${taskData?.title || '기존 작업'}' 기획안이 성공적으로 연동되었습니다!`);
  };

  const handleNewTask = () => {
    const confirmReset = window.confirm('✨ 새로 작성을 시작하시겠습니까?\n기존에 입력된 자료 및 작업 내용이 새로 초기화됩니다.');
    if (!confirmReset) return;

    setProductImages([]);
    setModelImages([]);
    setAdditionalInfo('');
    setReviewFile(null);
    setStep1Done(false);
    setStep2Done(false);
    setSubStep(1);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
  };

  // Admin Approval Handlers
  const handleApproveUser = (email) => {
    setPendingUsers(pendingUsers.map(u => u.email === email ? { ...u, status: 'approved' } : u));
    alert(`🎉 '${email}' 회원가입 승인이 완료되었습니다. 해당 회원으로 로그인이 가능합니다.`);
  };

  const handleRejectUser = (email) => {
    setPendingUsers(pendingUsers.filter(u => u.email !== email));
    alert(`❌ '${email}' 신청 건이 거절/삭제되었습니다.`);
  };

  const pendingCount = pendingUsers.filter(u => u.status === 'pending_approval').length;

  return (
    <div className="app-container">
      {/* Left Sidebar (01 ~ 05) WITH STRICT STEP LOCKING & MASTER-ONLY ADMIN SETTINGS */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        openaiKey={openaiKey}
        geminiKey={geminiKey}
        knowledgeCount={knowledgeFiles.length}
        step1Done={step1Done}
        step2Done={step2Done}
        currentUser={currentUser}
        onOpenAdminApproval={() => setIsAdminApprovalOpen(true)}
        pendingApprovalCount={pendingCount}
      />

      {/* Main Content Workspace */}
      <div className="main-wrapper">
        {/* Top Header Bar */}
        <TopBar 
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenApiKeyModal={() => setIsApiModalOpen(true)}
          onOpenKnowledgeModal={() => setIsKnowledgeModalOpen(true)}
          onOpenTaskModal={() => setIsOpenTaskModalOpen(true)}
          onNewTask={handleNewTask}
        />

        {/* Sub Stepper Tabs for Dashboard (01 대시보드 내 1 자료등록 -> 2 생성설정) */}
        {activeTab === 'dashboard' && (
          <div className="sub-stepper-wrap">
            <div className="sub-stepper">
              <button
                onClick={() => handleSubStepChange(1)}
                className={`step-tab ${subStep === 1 ? 'active' : ''}`}
              >
                1 자료 등록
              </button>
              <button
                onClick={() => handleSubStepChange(2)}
                className={`step-tab ${subStep === 2 ? 'active' : ''}`}
              >
                2 생성 설정
              </button>
            </div>
          </div>
        )}

        {/* Main Body Content */}
        <div className="content-scroll">
          {activeTab === 'dashboard' && subStep === 1 && (
            <Step1MaterialUpload 
              productImages={productImages} setProductImages={setProductImages}
              modelImages={modelImages} setModelImages={setModelImages}
              additionalInfo={additionalInfo} setAdditionalInfo={setAdditionalInfo}
              reviewFile={reviewFile} setReviewFile={setReviewFile}
              onNextStep={() => handleSubStepChange(2)}
            />
          )}

          {activeTab === 'dashboard' && subStep === 2 && (
            <Step2GenerationSettings 
              productImages={productImages}
              modelImages={modelImages}
              additionalInfo={additionalInfo}
              reviewFile={reviewFile}
              geminiKey={geminiKey}
              openaiKey={openaiKey}
              onEditMaterial={() => handleSubStepChange(1)}
              onGenerateHero={handleGenerateHero}
            />
          )}

          {activeTab === 'work' && (
            <Step3Workbench 
              slides={slides} setSlides={setSlides}
              canvasWidth={canvasWidth} setCanvasWidth={setCanvasWidth}
              onExport={() => {
                setStep2Done(true); // Unlock Step 3 (03 결과 확인)!
                setActiveTab('result');
              }}
            />
          )}

          {activeTab === 'result' && (
            <Step4Export 
              slides={slides}
              canvasWidth={canvasWidth}
              productInfo={{ title: additionalInfo || '국내산 프리미엄' }}
              onReset={handleNewTask}
            />
          )}

          {/* Menu 04: 마케팅 움짤 생성기 (780px WebP Dual Preview) */}
          {activeTab === 'webp_promo' && (
            <Step4WebpPromoGenerator />
          )}

          {/* Menu 05: MP4 초고속 변환기 (Strict 5MB Engine) */}
          {activeTab === 'mp4_fast' && (
            <Step5Mp4FastConverter />
          )}
        </div>
      </div>

      {/* Auth Modal (Business Verification + Google OTP 2FA + Pending Approval + Master lmhyeok@naver.com) */}
      <AuthModal 
        isOpen={!currentUser || isAuthModalOpen}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Master Admin Account Approval Modal (VISIBLE ONLY TO MASTER lmhyeok@naver.com) */}
      <AdminUserApprovalModal 
        isOpen={isAdminApprovalOpen}
        onClose={() => setIsAdminApprovalOpen(false)}
        pendingUsers={pendingUsers}
        onApproveUser={handleApproveUser}
        onRejectUser={handleRejectUser}
      />

      {/* Modals & Overlays */}
      <ApiKeyModal 
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        openaiKey={openaiKey} setOpenaiKey={setOpenaiKey}
        geminiKey={geminiKey} setGeminiKey={setGeminiKey}
        onSave={handleSaveApiKeys}
      />

      <KnowledgeModal 
        isOpen={isKnowledgeModalOpen}
        onClose={() => setIsKnowledgeModalOpen(false)}
        files={knowledgeFiles}
        onAddFiles={(newFiles) => setKnowledgeFiles([...knowledgeFiles, ...newFiles])}
        onDeleteFile={(id) => setKnowledgeFiles(knowledgeFiles.filter(f => f.id !== id))}
      />

      <OpenTaskModal 
        isOpen={isOpenTaskModalOpen}
        onClose={() => setIsOpenTaskModalOpen(false)}
        onLoadTask={handleLoadTask}
      />

      <LoadingOverlay 
        isOpen={isLoading}
        progress={loadingProgress}
        title={loadingTitle}
      />
    </div>
  );
}
