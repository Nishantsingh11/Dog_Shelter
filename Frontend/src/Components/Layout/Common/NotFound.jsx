import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'
export default function DogNotFound() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 overflow-hidden">
      <motion.div
        className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        animate={{
          x: position.x - 128,
          y: position.y - 128,
        }}
        transition={{ type: 'spring', damping: 10, stiffness: 50 }}
      />

      <motion.h1
        className="text-6xl md:text-8xl font-bold text-primary mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>

      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Oops! This page is playing hide and seek.</h2>
        <p className="text-muted-foreground">It seems our digital dog has buried this page somewhere we can `&#39` t find.</p>
      </motion.div>

      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="relative">
          <motion.img
            src="/placeholder.svg?height=200&width=200&text=🐾"
            alt="Dog paw print"
            className="w-32 h-32"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-6xl">🐶</span>
          </motion.div>
        </div>
        <Button asChild>
          <Link to="/">
            Let{`&apos`}s go back home
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}