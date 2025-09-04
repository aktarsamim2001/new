'use client'

import { useEffect } from 'react'

export default function ScriptInjector({ headScript = '', bodyScript = '', footerScript = '' }) {
  useEffect(() => {
    const insertScript = (html, location) => {
      if (!html || html === 'N/A') return

      const container = document.createElement('div')
      container.innerHTML = html
      const scripts = Array.from(container.getElementsByTagName('script'))

      scripts.forEach((script) => {
        const newScript = document.createElement('script')
        Array.from(script.attributes).forEach((attr) => newScript.setAttribute(attr.name, attr.value))
        newScript.innerHTML = script.innerHTML

        if (location === 'head') document.head.appendChild(newScript)
        else if (location === 'body') document.body.appendChild(newScript)
        else document.body.appendChild(newScript)
      })
    }

    insertScript(headScript, 'head')
    insertScript(bodyScript, 'body')
    insertScript(footerScript, 'footer')
  }, [headScript, bodyScript, footerScript])

  return null
}
