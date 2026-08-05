import React from 'react';
import { ShieldCheck, UserCheck, X, Check, Clock, Trash2, Building2, Crown, Mail } from 'lucide-react';

export default function AdminUserApprovalModal({ isOpen, onClose, pendingUsers = [], onApproveUser, onRejectUser }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 99999,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '640px',
        maxWidth: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        boxSizing: 'border-box'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
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

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Crown style={{ width: '24px', height: '24px', color: '#d97706' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                마스터 계정 관리 ⚙️ 신규 가입 승인
              </h2>
              <span style={{ fontSize: '11px', backgroundColor: '#d97706', color: '#ffffff', padding: '2px 8px', borderRadius: '12px', fontWeight: '900' }}>
                lmhyeok@naver.com 전용
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
              국세청 실시간 인증을 통과한 사업자 회원가입 신청 목록입니다. 승인 시 접속 권한이 부여됩니다.
            </p>
          </div>
        </div>

        {/* User Requests List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
          {pendingUsers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#fafbf8', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
              <UserCheck style={{ width: '32px', height: '32px', color: '#94a3b8', marginBottom: '8px' }} />
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#64748b', display: 'block' }}>
                현재 승인 대기 중인 회원가입 신청서가 없습니다.
              </span>
            </div>
          ) : (
            pendingUsers.map((user) => (
              <div 
                key={user.email}
                style={{
                  backgroundColor: user.status === 'approved' ? '#f0fdf4' : '#ffffff',
                  border: user.status === 'approved' ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a' }}>{user.bizName || '사업자명'}</span>
                    <span style={{ fontSize: '10px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '2px 6px', borderRadius: '4px', fontWeight: '800' }}>
                      {user.bizNo || '사업자번호'}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      backgroundColor: user.status === 'approved' ? '#d1fae5' : '#fef3c7',
                      color: user.status === 'approved' ? '#059669' : '#b45309',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: '800'
                    }}>
                      {user.status === 'approved' ? '✅ 승인 완료' : '⏳ 승인 대기중'}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail style={{ width: '13px', height: '13px', color: '#64748b' }} />
                    <span>신청 이메일: <b>{user.email}</b></span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {user.status !== 'approved' && (
                    <button 
                      onClick={() => onApproveUser(user.email)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '10px',
                        backgroundColor: '#10b981',
                        color: '#ffffff',
                        fontWeight: '900',
                        fontSize: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      <Check style={{ width: '14px', height: '14px' }} /> 승인
                    </button>
                  )}

                  <button 
                    onClick={() => onRejectUser(user.email)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '10px',
                      backgroundColor: '#fee2e2',
                      color: '#ef4444',
                      fontWeight: '800',
                      fontSize: '12px',
                      border: '1px solid #fca5a5',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Trash2 style={{ width: '14px', height: '14px' }} /> 삭제
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
