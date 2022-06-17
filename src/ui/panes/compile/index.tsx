import React, { useState } from 'react'

import Request from 'superagent'
import Files from '../../../files'
import KiCad from '../../../kicad'
import KbHGenerator from '../../../files/generators/kb.h'

import C from '../../../const'
import State from '../../../state'

interface ICompileProps {
  state: State
}

function Compile({ state }: ICompileProps) {
  const { keyboard } = state
  const [compileWorking, setCompileWorking] = useState<boolean>(false)

  const downloadKiCad = () => {
    // Disable buttons.
    setCompileWorking(true)

    // Generate KiCad files.
    const files = KiCad.generate(keyboard)

    // Get the PCB stencil.
    JSZipUtils.getBinaryContent('/files/kicad.zip', (err, data) => {
      if (err) {
        console.error(err)
        state.error('Unable to retrieve files')
        setCompileWorking(false)
        return
      }

      JSZip.loadAsync(data)
        .then((zip) => {
          // Insert the files.
          for (const file in files) {
            zip.file(file, files[file])
          }

          // Download the file.
          zip
            .generateAsync({ type: 'blob' })
            .then(
              (blob) => {
                // Generate a friendly name.
                const friendly = keyboard.settings.name
                  ? keyboard.slug
                  : 'layout'

                saveAs(blob, `${friendly}_pcb` + `.zip`)

                // Re-enable buttons.
                setCompileWorking(false)
              },
              (err) => {
                console.error(err)
                state.error('Unable to generate files')
                setCompileWorking(false)
              }
            )
            .catch((e) => {
              console.error(err)
              state.error('Unable to generate files')
              setCompileWorking(false)
            })
        })
        .catch((e) => {
          console.error(err)
          state.error('Unable to retrieve files')
          setCompileWorking(false)
        })
    })
  }

  const downloadHex = () => {
    // Disable buttons.
    setCompileWorking(true)

    // Generate source files.
    const files = Files.generate(keyboard)

    // Send the request.
    Request.post(C.LOCAL.API)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(files))
      .end((err, res) => {
        res = JSON.parse(res.text)

        if (err) {
          console.error(err)
          state.error('Unable to connect to API server.')
          setCompileWorking(false)
          return
        }

        // Check if there was an error.
        if (res.error) {
          console.error(res.error)
          state.error(`Server error:\n${res.error}`)
          setCompileWorking(false)
          return
        }

        // Generate a friendly name.
        const friendly = keyboard.settings.name ? keyboard.slug : 'layout'

        // Download the hex file.
        const blob = new Blob([res.hex], { type: 'application/octet-stream' })
        saveAs(blob, `${friendly}.hex`)

        // Re-enable buttons.
        setCompileWorking(false)
      })
  }

  const downloadZip = async () => {
    // Disable buttons.
    setCompileWorking(true)

    // Get new vial uid.
    const vialUid = await fetch('/vial-uid').then((response) => response.text())

    // Generate source files.
    const files = Files.generate(keyboard, vialUid)

    // Get the firmware stencil.
    JSZipUtils.getBinaryContent('/files/firmware.zip', (err, data) => {
      if (err) {
        console.error(err)
        state.error('Unable to retrieve files')
        setCompileWorking(false)
        return
      }

      JSZip.loadAsync(data)
        .then((zip) => {
          // Insert the files.
          for (const file in files) {
            zip.file(file, files[file])
          }

          // Download the file.
          zip
            .generateAsync({ type: 'blob' })
            .then((blob) => {
              // Generate a friendly name.
              const friendly = keyboard.settings.name ? keyboard.slug : 'layout'

              saveAs(blob, `${friendly}_firmware` + `.zip`)

              // Re-enable buttons.
              setCompileWorking(false)
            })
            .catch((e) => {
              console.error(err)
              state.error('Unable to generate files')
              setCompileWorking(false)
            })
        })
        .catch((e) => {
          console.error(err)
          state.error('Unable to retrieve files')
          setCompileWorking(false)
        })
    })
  }

  const generateKeyboardH = () => {
    return new KbHGenerator(keyboard).generate()
  }

  return (
    <div className="pane-compile">
      <div style={{ height: '0.5rem' }} />
      <button onClick={downloadKiCad}>Download KiCad PCB</button>
      <div style={{ height: '0.5rem' }} />
      <button onClick={downloadZip}>Download Firmware (Experimental)</button>
    </div>
  )
}

export default Compile
