import "core-js"
import "regenerator-runtime/runtime"
import { createRoot } from "react-dom/client"

import React from "react"
import Index from "./main/index"

const container = document.getElementById("content")
const root = createRoot(container)
root.render(<Index />)
