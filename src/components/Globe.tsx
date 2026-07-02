import { useEffect, useRef, useState } from 'react'
import GlobeGL from 'react-globe.gl'

export interface Location {
  location: string
  lat: number
  lng: number
  countryCode: string
  start: string
  end: string
}

interface GlobeProps {
  onLocationSelect: (location: Location) => void
}

const locations: Location[] = [
  { location: "Japan", lat: 35.6762, lng: 139.6503, countryCode: "JP", start: "May 2026", end: "Jun 2026" },
  { location: "China", lat: 39.9042, lng: 116.4074, countryCode: "CN", start: "May 2026", end: "May 2026" },
  { location: "Lisbon", lat: 38.7223, lng: -9.1393, countryCode: "PT", start: "Feb 2026", end: "Mar 2026" },
  // Before & After Antarctica cruise: Dec 16-19 and Dec 27-31, 2025
  { location: "Argentina", lat: 34.6037, lng: -58.3816, countryCode: "AR", start: "Dec 2025", end: "Dec 2025" },
  { location: "Chile", lat: -53.1638, lng: -70.9171, countryCode: "CL", start: "Dec 2025", end: "Dec 2025" },
  { location: "Antarctica", lat: -63.5, lng: -57.0, countryCode: "AQ", start: "Dec 2025", end: "Dec 2025" },
  { location: "Bogota", lat: 4.7110, lng: -74.0721, countryCode: "CO", start: "Dec 2025", end: "Dec 2025" },
  { location: "El Salvador", lat: 13.6929, lng: -89.2182, countryCode: "SV", start: "Aug 2025", end: "Aug 2025" },
  // Pre & Post Morocco Layovers
  { location: "Istanbul", lat: 41.0082, lng: 28.9784, countryCode: "TR", start: "Apr 2025", end: "May 2025" },
  { location: "Morocco", lat: 31.6295, lng: -7.9811, countryCode: "MA", start: "Apr 2025", end: "May 2025" },
  { location: "Jordan", lat: 30.3285, lng: 35.4444, countryCode: "JO", start: "Nov 2024", end: "Nov 2024" },
  { location: "Guatemala", lat: 14.5573, lng: -90.7332, countryCode: "GT", start: "May 2024", end: "May 2024" },
  { location: "Dominican Republic", lat: 18.7357, lng: -70.1627, countryCode: "DO", start: "Dec 2023", end: "Jan 2024" },
  { location: "Tanzania", lat: -6.3690, lng: 34.8888, countryCode: "TZ", start: "Jul 2023", end: "Aug 2023" },
  { location: "Dubai", lat: 25.2048, lng: 55.2708, countryCode: "AE", start: "Mar 2023", end: "Mar 2023" },
  { location: "India", lat: 20.5937, lng: 78.9629, countryCode: "IN", start: "Dec 2022", end: "Jan 2023" },
  { location: "Banff", lat: 51.1784, lng: -115.5708, countryCode: "CA", start: "Aug 2022", end: "Aug 2022" },
  { location: "Bahamas", lat: 25.0343, lng: -77.3963, countryCode: "BS", start: "Jul 2022", end: "Jul 2022" },
  { location: "Mexico City", lat: 19.4326, lng: -99.1322, countryCode: "MX", start: "Apr 2022", end: "Apr 2022" },
  { location: "Egypt", lat: 26.8206, lng: 30.8025, countryCode: "EG", start: "Dec 2021", end: "Jan 2022" },
  { location: "Greece", lat: 39.0742, lng: 21.8243, countryCode: "GR", start: "Aug 2021", end: "Aug 2021" },
  { location: "Bermuda", lat: 32.3078, lng: -64.7505, countryCode: "BM", start: "Aug 2021", end: "Aug 2021" },
  { location: "Italy", lat: 41.8967, lng: 12.4822, countryCode: "IT", start: "Oct 2019", end: "Nov 2019" },
  { location: "Peru", lat: -9.19, lng: -75.0152, countryCode: "PE", start: "Apr 2019", end: "Apr 2019" },
  { location: "Puerto Rico", lat: 18.2208, lng: -66.5901, countryCode: "PR", start: "Dec 2018", end: "Dec 2018" },
  { location: "Kenya", lat: -0.0236, lng: 37.9062, countryCode: "KE", start: "Jul 2017", end: "Aug 2017" },
  { location: "Costa Rica", lat: 9.7489, lng: -83.7534, countryCode: "CR", start: "Jun 2017", end: "Jun 2017" },
]

function pinSvg(location: Location) {
  const code = location.countryCode.toLowerCase()
  const clipId = `flag-clip-${location.location.toLowerCase().replace(/\s+/g, '-')}`
  return `<svg viewBox="0 0 24 24" width="40" height="40">
    <defs><clipPath id="${clipId}"><circle cx="12" cy="8.5" r="6"/></clipPath></defs>
    <path d="M12 0C7.31 0 3.5 3.81 3.5 8.5C3.5 15.15 12 24 12 24C12 24 20.5 15.15 20.5 8.5C20.5 3.81 16.69 0 12 0Z" fill="#ffffff"/>
    <image href="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/1x1/${code}.svg" x="6" y="2.5" width="12" height="12" clip-path="url(#${clipId})" preserveAspectRatio="xMidYMid slice"/>
  </svg>`
}

export default function Globe({ onLocationSelect }: GlobeProps) {
  const globeEl = useRef<any>()
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  // Measure container and keep Globe sized correctly
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      setSize({ width: el.clientWidth, height: el.clientHeight })
    }
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Ensure predictable state on every mount/visit
  const resetGlobe = () => {
    try {
      const globe = globeEl.current
      if (!globe || typeof globe.controls !== 'function') return

      const controls = globe.controls()
      if (!controls) return

      // Reset controls and POV to a predictable state
      controls.reset()
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.5
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.minDistance = 180
      controls.maxDistance = 1000
      controls.enableZoom = true
      controls.enablePan = false

      globe.pointOfView({ lat: 0, lng: 0, altitude: 2.2 }, 0)
    } catch (error) {
      console.error('Error resetting globe:', error)
    }
  }

  // Attempt a reset shortly after mount
  useEffect(() => {
    if (size.width === 0 || size.height === 0) return
    let raf = requestAnimationFrame(() => {
      resetGlobe()
    })
    return () => cancelAnimationFrame(raf)
  }, [size.width, size.height])

  return (
    <div ref={containerRef} className="relative w-full aspect-square min-h-[320px] max-w-[min(720px,90vw)] mx-auto flex items-center justify-center">
      {size.width > 0 && size.height > 0 && (
          <GlobeGL
            ref={globeEl}
            width={size.width}
            height={size.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundColor="rgba(0,0,0,0)"
            enablePointerInteraction={true}
            htmlElementsData={locations}
            htmlLat="lat"
            htmlLng="lng"
            htmlAltitude={0.01}
            htmlTransitionDuration={0}
            htmlElement={(d: any) => {
              const el = document.createElement('div')
              el.innerHTML = pinSvg(d)
              el.style.cursor = 'pointer'
              el.style.pointerEvents = 'auto'
              el.style.filter = 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))'
              el.onclick = () => onLocationSelect(d)
              return el
            }}
        />
      )}
    </div>
  )
}
