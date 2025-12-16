import { useEffect, useState } from 'react'
import './CloudflareCaptcha.css'

interface CloudflareCaptchaProps {
  onVerified: () => void
}

function CloudflareCaptcha({ onVerified }: CloudflareCaptchaProps) {
  const [isChecking, setIsChecking] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleCheckboxClick = () => {
    if (isChecking || isVerified) return
    
    setIsChecking(true)
    setProgress(0)

    // Simulate verification progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    // Complete verification after ~1.5 seconds
    setTimeout(() => {
      clearInterval(progressInterval)
      setProgress(100)
      setIsChecking(false)
      setIsVerified(true)
      
      // Proceed to main site after a brief delay
      setTimeout(() => {
        onVerified()
      }, 800)
    }, 1500)
  }

  return (
    <div className="cloudflare-page">
      <div className="cloudflare-header">
        <svg className="cloudflare-logo" viewBox="0 0 256 100" xmlns="http://www.w3.org/2000/svg">
          <text x="10" y="60" fontSize="48" fontWeight="bold" fill="#F38020">Cloudflare</text>
        </svg>
      </div>

      <div className="cloudflare-container">
        <div className="cloudflare-card">
          <div className="cloudflare-title">
            <div className="shield-icon">🛡️</div>
            <h1>Checking your browser</h1>
          </div>
          
          <p className="cloudflare-subtitle">lorence-mae-bonane.com</p>
          
          <div className="verification-section">
            <div className="captcha-box">
              <div className="checkbox-container" onClick={handleCheckboxClick}>
                <div className={`checkbox ${isVerified ? 'verified' : ''} ${isChecking ? 'checking' : ''}`}>
                  {isVerified ? (
                    <svg className="checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : isChecking ? (
                    <div className="spinner"></div>
                  ) : null}
                </div>
                <span className="checkbox-label">
                  {isVerified ? 'Verified' : isChecking ? 'Verifying...' : 'Verify you are human'}
                </span>
              </div>
              
              {isChecking && (
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              )}
            </div>
          </div>

          <div className="cloudflare-info">
            <p>This process is automatic. Your browser will redirect to your requested content shortly.</p>
            <p className="cloudflare-notice">Please allow up to 5 seconds...</p>
          </div>
        </div>

        <div className="cloudflare-footer">
          <p>
            Performance & security by <strong>Cloudflare</strong>
          </p>
          <p className="ray-id">Ray ID: 8a7b9c2d1e4f5g6h • Your IP: {generateFakeIP()}</p>
        </div>
      </div>
    </div>
  )
}

function generateFakeIP(): string {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`
}

export default CloudflareCaptcha
