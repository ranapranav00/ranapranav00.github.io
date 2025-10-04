import { motion } from 'framer-motion'
import Globe, { type Location } from '../components/Globe'
import { useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useCloudinaryPhotos } from '../hooks/useCloudinaryPhotos'
import ImageModal from '../components/ImageModal'

export default function PersonalMode() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null)
  const { images, loading, error } = useCloudinaryPhotos(selectedLocation?.location || null)

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">
            My <span className="text-gradient">Travel Journey</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click on the pins to explore my photography from around the world
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-3xl overflow-hidden"
          style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}
        >
          <div className={`grid ${selectedLocation ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} h-full gap-0`}>
            <Globe onLocationSelect={setSelectedLocation} />
            
            {selectedLocation && (
              <div className="glass-effect overflow-y-auto h-full border-l border-border/50">
                <div className="sticky top-0 z-10 glass-effect p-6 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-bold text-gradient">{selectedLocation.location}</h3>
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className="text-muted-foreground hover:text-foreground transition-colors text-2xl px-3"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {loading && (
                    <p className="text-muted-foreground text-center">Loading photos...</p>
                  )}
                  
                  {error && (
                    <p className="text-destructive text-center">{error}</p>
                  )}
                  
                  {!loading && !error && images.length > 0 && (
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 1, 1200: 2 }}>
                      <Masonry gutter="20px">
                        {images.map((image, index) => (
                          <div key={image.publicId} className="relative group">
                            <img
                              src={image.thumbnailUrl}
                              alt={`${selectedLocation.location} photo ${index + 1}`}
                              className="w-full h-auto rounded-lg hover:scale-[1.02] transition-transform cursor-pointer"
                              onClick={() => setModalImageIndex(index)}
                            />
                          </div>
                        ))}
                      </Masonry>
                    </ResponsiveMasonry>
                  )}
                  
                  {!loading && !error && images.length === 0 && (
                    <p className="text-muted-foreground text-center">No photos available for this location.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      {modalImageIndex !== null && images.length > 0 && (
        <ImageModal
          images={images}
          currentIndex={modalImageIndex}
          onClose={() => setModalImageIndex(null)}
          onNavigate={setModalImageIndex}
        />
      )}
    </div>
  )
}
