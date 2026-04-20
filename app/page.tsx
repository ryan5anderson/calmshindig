import SkipLink from '@/components/SkipLink'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import WaveDivider from '@/components/WaveDivider'
import PerformanceInfo from '@/components/PerformanceInfo'
import SpotlightArtists from '@/components/SpotlightArtists'
import SupportingSounds from '@/components/SupportingSounds'
import Gallery from '@/components/Gallery'
import About from '@/components/About'
import Partners from '@/components/Partners'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main-content">
        <Hero />
        <WaveDivider />
        <PerformanceInfo />
        <SpotlightArtists />
        <SupportingSounds />
        <Gallery />
        <About />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
