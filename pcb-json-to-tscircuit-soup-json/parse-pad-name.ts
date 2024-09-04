import { mm } from "@tscircuit/mm"

type PadInfo = {
  shape: string
  layer: "A" | "B" | "T"
  width: number | null
  height: number | null
  diameter?: number
  roundedCornerRadius?: number
  customParams?: string[]
}

const padNames = [
  "RoundRect[T]Pad_540x640_135.514_um_0.000000_0",
  "RoundRect[T]Pad_975x1400_244.678_um",
  "Round[A]Pad_1524_um",
  "Oval[A]Pad_2286x1524_um",
  "Rect[T]Pad_609.6x1270_um",
  "Rect[B]Pad_1060x650_um",
  "Cust[T]Pad_1000x500_1000x_1500_23_um",
]

export function parsePadName(padName: string): PadInfo {
  const parts = padName.split("_")
  const [shapeAndLayer, ...rest] = parts

  if (!shapeAndLayer) {
    throw new Error(`Unable to parse pad shape and layer from ${padName}`)
  }

  const shapeMatch = shapeAndLayer.match(/([A-Za-z]+)(?:\[([ABT])\])?/)
  if (!shapeMatch) throw new Error(`Invalid pad name: ${padName}`)

  const shape = shapeMatch[1]

  if (!shape) {
    throw new Error(`Unable to parse pad shape from ${padName}`)
  }

  const layer = (shapeMatch[2] || "T") as "A" | "B" | "T" // Default to Top if not specified

  let info: PadInfo = {
    shape,
    layer,
    width: 0,
    height: 0,
  }

  if (shape === "Round") {
    if (!rest[0]) {
      throw new Error(`Unable to parse diameter from ${padName}`)
    }

    info.diameter = mm(parseFloat(rest[0]))
    info.width = null
    info.height = null
  } else if (shape === "RoundRect") {
    const [dimensions, radius] = rest
    if (!dimensions || !radius) {
      throw new Error(`Unable to parse dimensions or radius from ${padName}`)
    }

    const [width, height] = dimensions.split("x").map(parseFloat)
    info.width = mm(width ?? 0)
    info.height = mm(height ?? 0)
    info.roundedCornerRadius = parseFloat(radius)
  } else if (shape === "Oval") {
    const dimensions = rest[0]
    if (!dimensions) {
      throw new Error(`Unable to parse dimensions from ${padName}`)
    }
    const [width, height] = dimensions.split("x").map(parseFloat)
    const mmOvalWidth = mm(width ?? 0)
    const mmOvalHeight = mm(height ?? 0)
    // Transform the oval into a circle by taking the larger dimension because tscircuit json only supports circles
    const transformedCircleDiameter = Math.max(mmOvalWidth, mmOvalHeight)

    info.diameter = transformedCircleDiameter
    info.width = null
    info.height = null
  } else if (shape === "Rect") {
    const dimensions = rest[0]
    if (!dimensions) {
      throw new Error(`Unable to parse dimensions from ${padName}`)
    }
    const [width, height] = dimensions.split("x").map(parseFloat)
    info.width = mm(width ?? 0)
    info.height = mm(height ?? 0)
  } else if (shape === "Cust") {
    if (!rest[0]) {
      throw new Error(`Unable to parse dimensions from ${padName}`)
    }
    const [width, height] = rest[0].split("x").map(parseFloat)
    info.width = mm(width ?? 0)
    info.height = mm(height ?? 0)
    info.customParams = rest.slice(1)
  }

  return info
}

export function extractLayerFromPadName(pinName: string): "B" | "T" | "A" {
  const layerRegex = /\[([BTA])\]/

  const match = pinName.match(layerRegex)

  if (match) {
    return match[1] as "B" | "T" | "A"
  } else {
    throw new Error(`Invalid layer in pin string: ${pinName}`)
  }
}

export const isPlatedHole = (pinName: string): boolean =>
  extractLayerFromPadName(pinName) === "A"

export const isSmtPad = (pinName: string): boolean =>
  extractLayerFromPadName(pinName) !== "A"
