'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const followerRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()

    useEffect(() => {
        const cursor = cursorRef.current
        const follower = followerRef.current

        if (!cursor || !follower) return

        // Initial hide
        gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 })
        gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 0 })

        // Fade in on load
        gsap.to(cursor, { scale: 1, duration: 0.5, ease: 'power2.out' })
        gsap.to(follower, { scale: 1, duration: 0.5, ease: 'power2.out' })

        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            })
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5, // Slower follow effect
                ease: 'power2.out'
            })
        }

        window.addEventListener('mousemove', onMouseMove)

        // Interactive hover effects
        const handleHover = () => {
            gsap.to(cursor, { scale: 0.5, duration: 0.3 })
            gsap.to(follower, { scale: 2, backgroundColor: 'rgba(235, 94, 40, 0.2)', borderColor: 'transparent', duration: 0.3 })
        }

        const handleHoverOut = () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 })
            gsap.to(follower, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.5)', duration: 0.3 })
        }

        // Add listeners to all interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, [data-interactive]')
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleHover)
            el.addEventListener('mouseleave', handleHoverOut)
        })

        // Cleanup on route change (re-bind needed for new elements, simplified by pathname dependency)
        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleHover)
                el.removeEventListener('mouseleave', handleHoverOut)
            })
        }
    }, [pathname])

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[99998] mix-blend-difference transition-colors"
            />
        </>
    )
}
