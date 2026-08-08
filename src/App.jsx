import { useCallback, useState } from 'react'
import { ThemeProvider } from './hooks/useTheme'
import Header from './components/Header'
import Hero from './components/Hero'
import Partners from './components/Partners'
import MarketGrid from './components/MarketGrid'
import Advantages from './components/Advantages'
import Showcase from './components/Showcase'
import Screener from './components/Screener'
import AccountTypes from './components/AccountTypes'
import Steps from './components/Steps'
import ToolsInsights from './components/ToolsInsights'
import Results from './components/Results'
import Testimonials from './components/Testimonials'
import Protected from './components/Protected'
import FAQ from './components/FAQ'
import Support from './components/Support'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import SignupModal from './components/SignupModal'

function Page() {
  const [signupOpen, setSignupOpen] = useState(false)
  const openSignup = useCallback(() => setSignupOpen(true), [])
  const closeSignup = useCallback(() => setSignupOpen(false), [])

  return (
    <>
      <Header onOpenSignup={openSignup} />
      <main>
        <Hero onOpenSignup={openSignup} />
        {/* <Partners /> */}
        <MarketGrid onOpenSignup={openSignup} />
        <Advantages />
        <Screener onOpenSignup={openSignup} />
        {/* <Showcase /> */}
        <AccountTypes onOpenSignup={openSignup} />
        {/* <Steps /> */}
        {/* <ToolsInsights /> */}
        <Results onOpenSignup={openSignup} />
        {/* <Testimonials /> */}
        {/* <Protected /> */}
        {/* <FAQ /> */}
        {/* <Support /> */}
        {/* <FinalCTA onOpenSignup={openSignup} /> */}
      </main>
      <Footer />
      <SignupModal open={signupOpen} onClose={closeSignup} />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  )
}
