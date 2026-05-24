"use client"

import { useEffect, useRef } from "react"
import {
  Renderer,
  Camera,
  Geometry,
  Program,
  Mesh
} from "ogl"

import "./Particles.css"

export default function Particles({

  particleCount = 120,

  moveParticlesOnHover = true

}) {

  const containerRef = useRef(null)

  useEffect(() => {

    const container = containerRef.current

    if (!container) return

    const renderer = new Renderer({
      alpha: true,
      antialias: true
    })

    const gl = renderer.gl

    gl.clearColor(0, 0, 0, 0)

    container.appendChild(gl.canvas)

    const camera = new Camera(gl, {
      fov: 45
    })

    camera.position.z = 5

    function resize() {

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      )

      camera.perspective({
        aspect:
          window.innerWidth /
          window.innerHeight
      })
    }

    resize()

    window.addEventListener(
      "resize",
      resize
    )

    const positions = []
    const randoms = []

    for (let i = 0; i < particleCount; i++) {

      positions.push(

        (Math.random() - 0.5) * 10,

        (Math.random() - 0.5) * 10,

        (Math.random() - 0.5) * 10
      )

      randoms.push(Math.random())
    }

    const geometry = new Geometry(gl, {

      position: {

        size: 3,

        data: new Float32Array(
          positions
        )
      },

      random: {

        size: 1,

        data: new Float32Array(
          randoms
        )
      }

    })

    let mouseX = 0
    let mouseY = 0

    function handleMouseMove(e) {

      mouseX =
        (e.clientX /
          window.innerWidth -
          0.5)

      mouseY =
        -(
          e.clientY /
            window.innerHeight -
          0.5
        )
    }

    if (moveParticlesOnHover) {

      window.addEventListener(
        "mousemove",
        handleMouseMove
      )
    }

    const vertex = `

      attribute vec3 position;
      attribute float random;

      uniform float uTime;
      uniform vec2 uMouse;

      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;

      varying float vRandom;

      void main() {

        vRandom = random;

        vec3 pos = position;

        pos.x +=
          sin(
            uTime * 2.0 +
            random * 20.0
          ) * 0.4;

        pos.y +=
          cos(
            uTime * 2.0 +
            random * 20.0
          ) * 0.4;

        pos.z +=
          sin(
            uTime * 1.5 +
            random * 15.0
          ) * 0.3;

        pos.x +=
          uMouse.x *
          random *
          0.6;

        pos.y +=
          uMouse.y *
          random *
          0.6;

        gl_Position =
          projectionMatrix *
          modelViewMatrix *
          vec4(pos, 1.0);

        gl_PointSize =
          2.0 +
          random * 4.0;
      }
    `

    const fragment = `

      precision highp float;

      varying float vRandom;

      void main() {

        float dist =
          length(
            gl_PointCoord -
            vec2(0.5)
          );

        if (dist > 0.5)
          discard;

        gl_FragColor =
          vec4(1.0, 1.0, 1.0, 0.8);
      }
    `

    const program = new Program(gl, {

      vertex,

      fragment,

      uniforms: {

        uTime: {
          value: 0
        },

        uMouse: {
          value: [0, 0]
        }

      }

    })

    const particles = new Mesh(gl, {

      mode: gl.POINTS,

      geometry,

      program

    })

    let animationFrame

    function update(t) {

      animationFrame =
        requestAnimationFrame(update)

      program.uniforms.uTime.value =
        t * 0.001

      program.uniforms.uMouse.value = [
        mouseX,
        mouseY
      ]

      renderer.render({
        scene: particles,
        camera
      })
    }

    animationFrame =
      requestAnimationFrame(update)

    return () => {

      cancelAnimationFrame(
        animationFrame
      )

      window.removeEventListener(
        "resize",
        resize
      )

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      )

      container.removeChild(gl.canvas)
    }

  }, [
    particleCount,
    moveParticlesOnHover
  ])

  return (

    <div
      ref={containerRef}
      className="particles-container"
    />

  )
}