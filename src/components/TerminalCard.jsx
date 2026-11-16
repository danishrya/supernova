import React, { useState } from 'react';

export default function TerminalCard() {
  const [activeTab, setActiveTab] = useState('arch');

  return (
    <div className="code-terminal-card" id="terminalCard">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="terminal-title">supernova-architecture.config.ts</div>
        <div className="terminal-status">
          <span className="live-pulse"></span> Production Ready
        </div>
      </div>

      {/* Terminal Tabs */}
      <div className="terminal-tabs">
        <button
          className={`t-tab ${activeTab === 'arch' ? 'active' : ''}`}
          onClick={() => setActiveTab('arch')}
        >
          Arsitektur
        </button>
        <button
          className={`t-tab ${activeTab === 'perf' ? 'active' : ''}`}
          onClick={() => setActiveTab('perf')}
        >
          Performance Benchmark
        </button>
        <button
          className={`t-tab ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security & SEO
        </button>
      </div>

      {/* Terminal Code Body */}
      <div className="terminal-body">
        {activeTab === 'arch' && (
          <div className="tab-content active">
            <pre>
              <code>
                <span className="c-keyword">import</span> &#123;{' '}
                <span className="c-func">defineSupernovaStandard</span> &#125;{' '}
                <span className="c-keyword">from</span>{' '}
                <span className="c-str">'@supernova/core'</span>;{'\n\n'}
                <span className="c-keyword">export default</span>{' '}
                <span className="c-func">defineSupernovaStandard</span>(&#123;{'\n'}
                {'  '}<span className="c-prop">framework</span>:{' '}
                <span className="c-str">'React + Vite Enterprise'</span>,{'\n'}
                {'  '}<span className="c-prop">engineeringLevel</span>:{' '}
                <span className="c-str">'Senior Full-Stack'</span>,{'\n'}
                {'  '}<span className="c-prop">codebase</span>: &#123;{'\n'}
                {'    '}<span className="c-prop">modularArchitecture</span>:{' '}
                <span className="c-bool">true</span>,{'\n'}
                {'    '}<span className="c-prop">zeroBloatGuarantee</span>:{' '}
                <span className="c-bool">true</span>,{'\n'}
                {'    '}<span className="c-prop">customHandCrafted</span>:{' '}
                <span className="c-str">'100% No WordPress Clutter'</span>,{'\n'}
                {'  '}&#125;,{'\n'}
                {'  '}<span className="c-prop">responsiveness</span>: [
                <span className="c-str">'Mobile'</span>,{' '}
                <span className="c-str">'Tablet'</span>,{' '}
                <span className="c-str">'Desktop 4K'</span>],{'\n'}
                {'  '}<span className="c-prop">clientOwnership</span>:{' '}
                <span className="c-str">'Full Source Code & No Vendor Lock-in'</span>{'\n'}
                &#125;);
              </code>
            </pre>
          </div>
        )}

        {activeTab === 'perf' && (
          <div className="tab-content active">
            <div className="perf-stats-display">
              <div className="perf-metric-bar">
                <div className="p-info">
                  <span>First Contentful Paint (FCP)</span>
                  <span className="p-val c-green">0.4s</span>
                </div>
                <div className="p-bar">
                  <div className="p-fill" style={{ width: '98%' }}></div>
                </div>
              </div>
              <div className="perf-metric-bar">
                <div className="p-info">
                  <span>Largest Contentful Paint (LCP)</span>
                  <span className="p-val c-green">0.7s</span>
                </div>
                <div className="p-bar">
                  <div className="p-fill" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div className="perf-metric-bar">
                <div className="p-info">
                  <span>Cumulative Layout Shift (CLS)</span>
                  <span className="p-val c-green">0.00</span>
                </div>
                <div className="p-bar">
                  <div className="p-fill" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="perf-badge-row">
                <span className="perf-chip">99+ Desktop Speed</span>
                <span className="perf-chip">97+ Mobile Speed</span>
                <span className="perf-chip">A+ Security SSL</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="tab-content active">
            <pre>
              <code>
                <span className="c-comment">// Enterprise Hardening & Organic Discovery</span>{'\n'}
                <span className="c-keyword">const</span>{' '}
                <span className="c-var">seoEngine</span> = &#123;{'\n'}
                {'  '}<span className="c-prop">structuredData</span>:{' '}
                <span className="c-str">'Schema.org (JSON-LD)'</span>,{'\n'}
                {'  '}<span className="c-prop">openGraphTags</span>:{' '}
                <span className="c-str">'Full Meta Preview Socials'</span>,{'\n'}
                {'  '}<span className="c-prop">protection</span>: &#123;{'\n'}
                {'    '}<span className="c-prop">xssSanitization</span>:{' '}
                <span className="c-bool">true</span>,{'\n'}
                {'    '}<span className="c-prop">csrfDefense</span>:{' '}
                <span className="c-bool">true</span>,{'\n'}
                {'    '}<span className="c-prop">rateLimiting</span>:{' '}
                <span className="c-str">'Active on all contact forms'</span>{'\n'}
                {'  '}&#125;{'\n'}
                &#125;;
              </code>
            </pre>
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="terminal-footer">
        <span className="t-badge">✓ Zero Vulnerabilities</span>
        <span className="t-badge">✓ 100% SEO Ready</span>
      </div>
    </div>
  );
}
