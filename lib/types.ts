import { z } from "zod"
import {
  pcbDesignSchema,
  parserSchema,
  resolutionSchema,
  structureSchema,
  layerSchema,
  boundarySchema,
  keepoutSchema,
  viaSchema,
  ruleSchema,
  controlSchema,
  autorouteSettingsSchema,
  placementSchema,
  librarySchema,
  imageSchema,
  padstackSchema,
  networkSchema,
  netSchema,
  netClassSchema,
  netConnectionSchema,
  wiringSchema,
  wireSchema,
} from "./zod-schema"

export type PcbDesign = z.infer<typeof pcbDesignSchema>
export type Parser = z.infer<typeof parserSchema>
export type Resolution = z.infer<typeof resolutionSchema>
export type Structure = z.infer<typeof structureSchema>
export type Layer = z.infer<typeof layerSchema>
export type Boundary = z.infer<typeof boundarySchema>
export type Keepout = z.infer<typeof keepoutSchema>
export type Via = z.infer<typeof viaSchema>
export type Rule = z.infer<typeof ruleSchema>
export type Control = z.infer<typeof controlSchema>
export type AutorouteSettings = z.infer<typeof autorouteSettingsSchema>
export type Placement = z.infer<typeof placementSchema>
export type Library = z.infer<typeof librarySchema>
export type Image = z.infer<typeof imageSchema>
export type Padstack = z.infer<typeof padstackSchema>
export type Network = z.infer<typeof networkSchema>
export type Net = z.infer<typeof netSchema>
export type NetClass = z.infer<typeof netClassSchema>
export type NetConnection = z.infer<typeof netConnectionSchema>
export type Wiring = z.infer<typeof wiringSchema>
export type Wire = z.infer<typeof wireSchema>
