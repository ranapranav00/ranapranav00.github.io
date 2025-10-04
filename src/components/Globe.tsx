import { useEffect, useRef, useState } from 'react'
import GlobeGL from 'react-globe.gl'
import * as SVGS from '../flagSvgs'

export interface Location {
  location: string
  lat: number
  lng: number
  svg: string
  start: string
  end: string
}

interface GlobeProps {
  onLocationSelect: (location: Location) => void
}

// NEW IMPLEMENTATION - Using SVG pins from original globe
const locations: Location[] = [
  { location: "Dominican Republic", lat: 18.7357, lng: -70.1627, svg: SVGS.domincanRepublicFlag, start: "Dec 2023", end: "Jan 2024" },
  { location: "Dubai", lat: 25.2048, lng: 55.2708, svg: SVGS.uaeFlag, start: "Mar 2023", end: "Mar 2023" },
  { location: "India", lat: 20.5937, lng: 78.9629, svg: SVGS.indiaFlag, start: "Dec 2022", end: "Jan 2023" },
  { location: "Bahamas", lat: 25.0343, lng: -77.3963, svg: SVGS.bahamasFlag, start: "Jul 2022", end: "Jul 2022" },
  { location: "Costa Rica", lat: 9.7489, lng: -83.7534, svg: SVGS.costaRicaFlag, start: "Jun 2022", end: "Jun 2022" },
  { location: "Puerto Rico", lat: 18.2208, lng: -66.5901, svg: SVGS.puertoRicoFlag, start: "Apr 2022", end: "Apr 2022" },
  { location: "Egypt", lat: 26.8206, lng: 30.8025, svg: SVGS.egyptFlag, start: "Dec 2021", end: "Jan 2022" },
  { location: "Bermuda", lat: 32.3078, lng: -64.7505, svg: SVGS.bermudaFlag, start: "Aug 2021", end: "Aug 2021" },
  { location: "Peru", lat: -9.19, lng: -75.0152, svg: SVGS.peruFlag, start: "Jul 2021", end: "Jul 2021" },
  { location: "Italy", lat: 41.8967, lng: 12.4822, svg: SVGS.italyFlag, start: "Jun 2019", end: "Jul 2019" },
  { location: "Greece", lat: 39.0742, lng: 21.8243, svg: SVGS.greeceFlag, start: "Jun 2019", end: "Jul 2019" },
  { location: "Mexico", lat: 19.4326, lng: -99.1322, svg: SVGS.mexicoFlag, start: "Dec 2018", end: "Jan 2019" },
  { location: "Canada", lat: 51.4968, lng: -115.9281, svg: SVGS.canadaFlag, start: "Aug 2018", end: "Aug 2018" },
  { location: "Kenya", lat: -0.0236, lng: 37.9062, svg: SVGS.kenyaFlag, start: "Jul 2017", end: "Aug 2017" },
  { location: "Tanzania", lat: -6.3690, lng: 34.8888, svg: SVGS.tanzaniaFlag, start: "Jul 2017", end: "Aug 2017" },
  { location: "Guatemala", lat: 14.5573, lng: -90.7332, svg: SVGS.guatemalaFlag, start: "Dec 2016", end: "Jan 2017" },
]

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
              el.innerHTML = d.svg
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
