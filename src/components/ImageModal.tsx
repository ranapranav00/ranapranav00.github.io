import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'

interface ImageModalProps {
  images: { fullUrl: string; url: string }[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function ImageModal({ images, currentIndex, onClose, onNavigate }: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1)
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, images.length, onClose, onNavigate])

  const handlePrevious = () => {
    if (currentIndex > 0) onNavigate(currentIndex - 1)
  }

  const handleNext = () => {
    if (currentIndex < images.length - 1) onNavigate(currentIndex + 1)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/20 hover:bg-background/40 text-white transition-colors"
          aria-label="Close modal"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Navigation buttons */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrevious()
            }}
            className="absolute left-4 z-50 p-3 rounded-full bg-background/20 hover:bg-background/40 text-white transition-colors"
            aria-label="Previous image"
          >
            <FiChevronLeft className="w-8 h-8" />
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className="absolute right-4 z-50 p-3 rounded-full bg-background/20 hover:bg-background/40 text-white transition-colors"
            aria-label="Next image"
          >
            <FiChevronRight className="w-8 h-8" />
          </button>
        )}

        {/* Image */}
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          src={images[currentIndex].fullUrl}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-[70vw] max-h-[75vh] object-contain"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-background/20 text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
