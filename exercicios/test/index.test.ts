import { describe, it, expect } from 'vitest'
import somar from '../src/index'

console.clear()
describe('soma', () => {
  it('soma 2 numeros', () => {
    expect(somar(10, 20)).toBe(30)
  })
})
