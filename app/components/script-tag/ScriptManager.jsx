'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSettings } from '@/features/store/settingsSlice'
import ScriptInjector from './ScriptInjector'

export default function ScriptManager() {
  const dispatch = useDispatch()
  const settings = useSelector((state) => state.settings.data)

  useEffect(() => {
    dispatch(fetchSettings())
  }, [dispatch])

  return (
    <ScriptInjector
      headScript={settings.head_scripts}
      bodyScript={settings.body_scripts}
      footerScript={settings.footer_scripts}
    />
  )
}
