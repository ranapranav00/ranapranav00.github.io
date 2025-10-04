import { motion } from 'framer-motion'
import { Mail, FileText } from 'lucide-react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import type { Mode } from '../App'
import Globe, { type Location } from '../components/Globe'
import { useState } from 'react'
import { useSpotifyData } from '../hooks/useSpotifyData'
import { useCloudinaryPhotos } from '../hooks/useCloudinaryPhotos'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import ImageModal from '../components/ImageModal'

interface HomeProps {
  mode: Mode
  toggleMode: () => void
}

export default function Home({ mode, toggleMode }: HomeProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null)
  const { data: spotifyData, loading: spotifyLoading, error: spotifyError } = useSpotifyData()
  const { images, loading: photosLoading, error: photosError } = useCloudinaryPhotos(selectedLocation?.location || null)
  
  const professionalBio = `Welcome to my website! I'm currently a student at Northeastern University pursuing a major in Computer Science with a Concentration in AI and a Minor in Mathematics. I enjoy problem solving and learning new things and am greatly interested in the endless potential applications of generative AI, as well as the role of SWE in Aerospace and predicting Financial Markets.`

  const personalBio = `Hey there! Beyond the code and algorithms, I'm passionate about exploring the world, capturing moments through photography, and experiencing different cultures. Travel isn't just a hobby for me—it's a way to continuously learn, grow, and find inspiration for both my personal and professional life.`

  return (
    <div className={mode === 'personal' ? 'overflow-y-auto' : 'overflow-hidden h-screen'}>
      {/* First Section - Profile and Bio */}
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Profile Image with Flip Animation */}
            <motion.div
              className="relative cursor-pointer profile-flip-container"
              onClick={toggleMode}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{ 
                perspective: "1000px",
                willChange: 'transform'
              }}
            >
              <motion.div
                className="relative w-72 h-72 rounded-3xl shadow-2xl"
                animate={{ rotateY: mode === 'personal' ? 180 : 0 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.25, 0.1, 0.25, 1],
                  type: 'tween'
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
              {/* Professional Image - Front */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg) translateZ(1px)',
                  willChange: 'transform'
                }}
              >
                <img
                  src="/images/professional_pfp.jpg"
                  alt="Professional"
                  className="w-full h-full object-cover"
                  style={{ willChange: 'transform' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>

              {/* Personal Image - Back */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg) translateZ(1px)',
                  willChange: 'transform'
                }}
              >
                <img
                  src="/images/personal_pfp.jpg"
                  alt="Personal"
                  className="w-full h-full object-cover"
                  style={{ willChange: 'transform' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </motion.div>

            <motion.p
              className="text-center mt-4 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Click to flip! 🔄
            </motion.p>
          </motion.div>



          {/* Bio Section */}
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-5xl lg:text-7xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              I'm <motion.span 
                className={mode === 'professional' ? 'text-gradient' : 'text-gradient-personal'}
                key={mode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Pranav Rana
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              key={`bio-${mode}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {mode === 'professional' ? professionalBio : personalBio}
            </motion.p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="contents"
              >
              <a
                href="https://www.linkedin.com/in/pranav-rana-a5b07a250/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 glass-effect rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <FaLinkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/ranapranav00"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 glass-effect rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <FaGithub size={20} />
                <span>GitHub</span>
              </a>
              <a
                href="mailto:ranapranav00@gmail.com"
                className="px-6 py-3 glass-effect rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Mail size={20} />
                <span>Email</span>
              </a>
              <a
                href="https://drive.google.com/file/d/1dcI6lAtX5hoA_ll-oiQd8dOuk37lPfwq/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 glass-effect rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <FileText size={20} />
                <span>Resume</span>
              </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>

      {/* Travel Section - Only visible in personal mode */}
      {mode === 'personal' && (
        <>
          <motion.div
            id="travel"
            className="min-h-screen px-6 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-7xl mx-auto w-full">
              <h2 className="text-4xl font-bold text-center mb-12">
                My <span className="text-gradient-personal">Travel Journey</span>
              </h2>
              
              <div
                className="glass-effect rounded-3xl overflow-hidden"
                style={{ height: 'calc(100vh - 300px)', minHeight: '600px' }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-0">
                  {/* Globe Section - Left Side */}
                  <div className="h-full flex items-center justify-center p-4">
                    <div className="w-full h-full flex items-center justify-center">
                      <Globe onLocationSelect={setSelectedLocation} />
                    </div>
                  </div>
                  
                  {/* Gallery Section - Right Side */}
                  <div className="p-8 overflow-y-auto bg-background/50">
                    {selectedLocation ? (
                      <>
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-2xl font-bold">{selectedLocation.location}</h3>
                            <p className="text-muted-foreground mt-2">{selectedLocation.start} – {selectedLocation.end}</p>
                          </div>
                          <button
                            onClick={() => setSelectedLocation(null)}
                            className="text-muted-foreground hover:text-foreground transition-colors text-xl px-2"
                          >
                            ✕
                          </button>
                        </div>
                        
                        {photosLoading ? (
                          <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                              <p className="text-muted-foreground">Loading photos...</p>
                            </div>
                          </div>
                        ) : photosError ? (
                          <div className="text-center text-muted-foreground py-12">
                            <p className="mb-2">Unable to load photos</p>
                            <p className="text-sm">{photosError}</p>
                          </div>
                        ) : images.length === 0 ? (
                          <div className="text-center text-muted-foreground py-12">
                            <p>No photos found for this location</p>
                            <p className="text-sm mt-2">Upload photos to travel/{selectedLocation.location.toLowerCase().replace(/\s+/g, '-')}</p>
                          </div>
                        ) : (
                          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
                            <Masonry gutter="16px">
                              {images.map((image, index) => (
                                <motion.div
                                  key={image.publicId}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="relative group cursor-pointer overflow-hidden rounded-lg"
                                  onClick={() => setModalImageIndex(index)}
                                >
                                  <img
                                    src={image.thumbnailUrl}
                                    alt={`${selectedLocation.location} photo ${index + 1}`}
                                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.div>
                              ))}
                            </Masonry>
                          </ResponsiveMasonry>
                        )}
                      </>
                    ) : (
                      <div className="h-full flex items-center justify-center text-center">
                        <div>
                          <h3 className="text-2xl font-bold mb-4">Select a location</h3>
                          <p className="text-muted-foreground">Click on a pin on the globe to see photos from my travels</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Music Section */}
          <motion.div
            id="music"
            className="min-h-screen px-6 py-24 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="max-w-7xl mx-auto w-full">
              <h2 className="text-4xl font-bold text-center mb-12">
                What I'm <span className="text-gradient-personal">Listening To</span> Nowadays
              </h2>

              {spotifyLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading your Spotify data...</p>
                  </div>
                </div>
              ) : spotifyError ? (
                <div className="p-8 glass-effect rounded-3xl text-center">
                  <p className="text-muted-foreground mb-4">Unable to load Spotify data</p>
                  <p className="text-sm text-muted-foreground">{spotifyError}</p>
                  <p className="text-xs text-muted-foreground mt-4">
                    Make sure SPOTIFY_REFRESH_TOKEN is set in your Supabase secrets
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Top Artists */}
                  <div className="glass-effect rounded-3xl p-8">
                    <h3 className="text-2xl font-bold mb-6">Top Artists</h3>
                    <div className="space-y-5">
                      {spotifyData?.artists.map((artist, i) => (
                        <a
                          key={artist.id}
                          href={artist.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-5 p-5 rounded-lg hover:bg-background/50 transition-all hover:scale-[1.02] group"
                        >
                          <div className="relative">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-primary to-primary/50 flex-shrink-0">
                              {artist.image ? (
                                <img 
                                  src={artist.image} 
                                  alt={artist.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                                  {i + 1}
                                </div>
                              )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-sm font-bold">
                              {i + 1}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-lg truncate group-hover:text-primary transition-colors">{artist.name}</p>
                            <p className="text-base text-muted-foreground truncate">
                              {artist.genres.slice(0, 2).join(', ') || 'Artist'}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Top Songs */}
                  <div className="glass-effect rounded-3xl p-8">
                    <h3 className="text-2xl font-bold mb-6">Top Songs</h3>
                    <div className="space-y-5">
                      {spotifyData?.tracks.map((track, i) => (
                        <a
                          key={track.id}
                          href={track.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-5 p-5 rounded-lg hover:bg-background/50 transition-all hover:scale-[1.02] group"
                        >
                          <div className="relative">
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-primary to-primary/50 flex-shrink-0">
                              {track.image ? (
                                <img 
                                  src={track.image} 
                                  alt={track.album}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                                  {i + 1}
                                </div>
                              )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-sm font-bold">
                              {i + 1}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-lg truncate group-hover:text-primary transition-colors">{track.name}</p>
                            <p className="text-base text-muted-foreground truncate">{track.artist}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}

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
