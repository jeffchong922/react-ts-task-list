import React from 'react'

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, className }) => {
  return (
    <header className={'hero is-dark has-text-centered ' + className}>
      <div className="hero-body">
        <div className="container">
          <h1 className="title mb-3">{title}</h1>
          <h2 className="subtitle mt-0">{subtitle}</h2>
        </div>
      </div>
    </header>
  )
}

export default Header
