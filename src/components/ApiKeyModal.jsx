import React from 'react';
import { Key, ShieldCheck, X, Check } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, openaiKey, setOpenaiKey, geminiKey, setGeminiKey, onSave }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      {/* Click backdrop to close */}
      <div style={{ flex: 1 }} onClick={onClose}></div>

      {/* Drawer Panel */}
      <div style={{
        width: '480px',
        maxWidth: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff',
        borderLeft: '1px solid #e2e8f0',
        padding: '32px 28px',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        boxSizing: 'border-box'
      }}>
        <div>
          {/* Top Badge & Close Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', width: '100%', marginBottom: '16px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#047857',
              fontSize: '12px',
              fontWeight: '800',
              padding: '4px 12px',
              borderRadius: '20px'
            }}>
              <Key style={{ width: '12px', height: '12px' }} /> 설정
            </div>

            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '28px',
                right: '28px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#f1f5f9',
                border: 'none',
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X style={{ width: '18px', height: '18px' }} />
            </button>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: '0 0 6px 0' }}>
            AI API 키 설정
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 24px 0', leadingHeight: '1.5' }}>
            이 앱은 서버 기본 키 없이, 사용자 본인의 Gemini 또는 OpenAI API 키로 동작합니다. 입력한 키는 이 브라우저에만 저장됩니다.
          </p>

          {/* Card 1: 개인 AI API 키 */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8' }}>현재 연결</span>
              <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 10px', borderRadius: '12px' }}>
                {geminiKey || openaiKey ? '연동 완료' : '미설정'}
              </span>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '0 0 16px 0' }}>
              개인 AI API 키
            </h3>

            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #f1f5f9',
              borderRadius: '12px',
              padding: '14px',
              fontSize: '12px',
              color: '#64748b',
              marginBottom: '12px'
            }}>
              <span style={{ fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '4px' }}>현재 표시</span>
              <span>{geminiKey || openaiKey ? '저장된 개인 API 키가 적용 중입니다.' : '아직 저장된 개인 API 키가 없습니다.'}</span>
            </div>

            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '13px',
              fontWeight: '800',
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <span>👤 Gemini</span>
              <span style={{ fontWeight: '900', color: geminiKey ? '#15803d' : '#0f172a' }}>
                {geminiKey ? '저장됨' : '아직 없음'}
              </span>
            </div>

            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '13px',
              fontWeight: '800',
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>🤖 OpenAI</span>
              <span style={{ fontWeight: '900', color: openaiKey ? '#15803d' : '#0f172a' }}>
                {openaiKey ? '저장됨' : '아직 없음'}
              </span>
            </div>
          </div>

          {/* Card 2: 초록색 서버 기본키 안 함 안내 */}
          <div style={{
            backgroundColor: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '16px',
            padding: '16px',
            color: '#047857',
            fontSize: '12px',
            fontWeight: '700',
            lineHeight: '1.5',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <ShieldCheck style={{ width: '20px', height: '20px', flexShrink: 0 }} />
            <div>
              공개 배포 안전을 위해 서버 기본 키는 사용하지 않습니다. 개인 키는 localStorage에만 저장됩니다.
            </div>
          </div>

          {/* Preset Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <button style={{
              flex: 1,
              padding: '14px',
              borderRadius: '14px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              fontWeight: '900',
              fontSize: '14px',
              color: '#0f172a',
              cursor: 'pointer'
            }}>
              Gemini 기본
            </button>

            <button style={{
              flex: 1,
              padding: '14px',
              borderRadius: '14px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              fontWeight: '900',
              fontSize: '14px',
              color: '#0f172a',
              cursor: 'pointer'
            }}>
              OpenAI 기본
            </button>
          </div>

          {/* Form Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '900', color: '#475569', display: 'block', marginBottom: '6px' }}>
                GEMINI API 키
              </label>
              <input 
                type="password"
                placeholder="AIza..."
                value={geminiKey}
                onChange={e => setGeminiKey(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '14px',
                  fontSize: '13px',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '900', color: '#475569', display: 'block', marginBottom: '6px' }}>
                OPENAI API 키
              </label>
              <input 
                type="password"
                placeholder="sk-..."
                value={openaiKey}
                onChange={e => setOpenaiKey(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '14px',
                  fontSize: '13px',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <p style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
              Gemini는 기존 생성 경로를 사용합니다. OpenAI는 분석에 GPT-5.5, 이미지 생성에 gpt-image-2-2026-04-21을 사용합니다.
            </p>
          </div>
        </div>

        {/* Save Action Button */}
        <button 
          onClick={onSave}
          style={{
            width: '100%',
            marginTop: '24px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            fontWeight: '900',
            fontSize: '13px',
            padding: '16px',
            borderRadius: '14px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          API 키 저장 및 적용 완료
        </button>
      </div>
    </div>
  );
}
