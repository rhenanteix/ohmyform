import { Spin } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Logo } from '../ui/logo'

const Shell = styled.div`
  --omf-colors-text-primary: #233c35;
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  background: #fcfbf7;
  color: #233c35;
  font-family: Inter, sans-serif;
  .auth-story {
    margin: 20px;
    padding: clamp(28px, 5vw, 72px);
    background: #eaf0e3;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 50px;
  }
  .auth-story h2 {
    font-size: clamp(38px, 4.5vw, 62px);
    font-weight: 500;
    letter-spacing: -2px;
    line-height: 1.12;
    color: #233c35;
    margin: 0 0 24px;
  }
  .auth-story em {
    font-family: Georgia, serif;
    font-weight: 400;
  }
  .auth-story p {
    max-width: 360px;
    font-size: 15px;
    line-height: 1.8;
    color: #657363;
  }
  .auth-note {
    font-size: 11px;
    letter-spacing: 0.6px;
    color: #657363;
  }
  .auth-art {
    background: #fffefb;
    border: 1px solid #dbe1d2;
    border-radius: 14px;
    padding: 28px;
    margin: 42px 0;
    max-width: 350px;
    transform: rotate(-4deg);
    box-shadow: 0 20px 35px -25px #233c3550;
  }
  .auth-art > span {
    font-size: 10px;
    color: #788570;
  }
  .auth-art h3 {
    font-size: 22px;
    color: #233c35;
    margin: 16px 0 22px;
    font-weight: 500;
  }
  .auth-art div {
    display: flex;
    gap: 10px;
  }
  .auth-art i {
    flex: 1;
    text-align: center;
    padding: 12px 0;
    border: 1px solid #dbe1d2;
    border-radius: 6px;
    font-size: 18px;
    font-style: normal;
  }
  .auth-art i:last-child {
    background: #eaf0e3;
    border-color: #79986c;
  }
  .auth-main {
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 80px 20px 24px;
  }
  .auth-back {
    position: absolute;
    top: 32px;
    right: 36px;
    color: #657363;
    font-size: 12px;
  }
  .auth-main > footer {
    margin-top: 30px;
    justify-content: center;
    font-size: 11px;
  }
  .auth-main > footer a,
  .auth-main > footer button,
  .auth-main > footer span,
  .auth-main > footer .ant-select {
    color: #657363 !important;
  }
  .auth-main > footer > div {
    flex: initial !important;
  }
  .ant-input,
  .ant-input-affix-wrapper {
    background: #fffefb !important;
    color: #233c35 !important;
    border-color: #dce1d8 !important;
    min-height: 46px;
  }
  .ant-input-affix-wrapper > input.ant-input {
    min-height: 0;
  }
  .ant-form-item-label > label {
    color: #344e41 !important;
    font-size: 12px !important;
  }
  .ant-btn-primary {
    background: #245d4c !important;
    color: white !important;
    height: 46px;
    border-color: #245d4c !important;
    box-shadow: none !important;
  }
  .ant-btn-link {
    color: #245d4c !important;
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    .auth-story {
      display: none;
    }
    .auth-main {
      min-height: 100vh;
      padding: 75px 8px 24px;
    }
  }
`
export const AuthLayout: React.FC<{ loading?: boolean }> = ({ loading = false, children }) => (
  <Spin spinning={loading}>
    <Shell className="auth-page">
      <aside className="auth-story">
        <Logo />
        <div>
          <h2>
            Uma pergunta.
            <br />
            Infinitas <em>possibilidades.</em>
          </h2>
          <p>Crie conversas que aproximam pessoas e transforme respostas em novas ideias.</p>
          <div className="auth-art" aria-hidden="true">
            <span>FEEDBACK QUE FAZ A DIFERENÇA</span>
            <h3>Como foi sua experiência?</h3>
            <div>
              <i>1</i>
              <i>2</i>
              <i>3</i>
              <i>4</i>
              <i>5 ✦</i>
            </div>
          </div>
        </div>
        <span className="auth-note">Simples de criar. Feito para conectar.</span>
      </aside>
      <main className="auth-main">
        <a className="auth-back" href="/">
          ← Voltar para o início
        </a>
        {children}
      </main>
    </Shell>
  </Spin>
)
