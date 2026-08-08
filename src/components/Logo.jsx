import logoDark from '../assets/explore-markets-logo.png'
import logoLight from '../assets/explore-markets-logo-light.png'
import { useTheme } from '../hooks/useTheme'

export default function Logo({ className = '', compact = false, variant }) {
  const { isDark } = useTheme()
  const useDark = variant ? variant === 'dark' : isDark
  const logoSrc = useDark ? logoDark : logoLight

  return (
    <a
      href="#home"
      className={`brand-logo ${compact ? 'brand-logo--compact' : ''} ${className}`.trim()}
      aria-label="Explore Markets Limited home"
    >
      <img
        src={logoSrc}
        alt="Explore Markets Limited"
        className="brand-logo__img"
        width={compact ? 140 : 180}
        height={compact ? 48 : 62}
      />
    </a>
  )
}
