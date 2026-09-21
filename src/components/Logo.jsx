function Logo({ compact = false }) {
    return (
        <span className={`brand-logo ${compact ? 'brand-logo-compact' : ''}`} aria-label="NeuroBridge">
            <svg className="brand-mark" viewBox="0 0 48 40" aria-hidden="true">
                <circle cx="8" cy="30" r="5" />
                <circle cx="40" cy="10" r="5" />
                <path d="M8 30C15 30 16 18 24 18S33 10 40 10" />
                <path className="brand-mark-dash" d="M14 28L19 22M28 16L34 12" />
            </svg>
            {!compact && <span className="logo-text">Neuro<span>Bridge</span></span>}
        </span>
    )
}

export default Logo
