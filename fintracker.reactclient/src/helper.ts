import Moment from "moment";


const USDollar = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatCurrency(value: number, abs: boolean = false): string {
    value /= 100 // value passed as cents
    return USDollar.format(abs ? Math.abs(value) : value)
}

export function addToColour(hex: string, amt: number): string {
    const hexNum = Number("0x" + hex)
    const r = Math.min((hexNum >>> 16) + amt, 0xff)
    const g = Math.min((hexNum >>> 8 & 0xff) + amt, 0xff)
    const b = Math.min((hexNum & 0xff) + amt, 0xff)
    return ((r << 16) + (g << 8) + b).toString(16)
}

export function colourAvgValue(hex: string): number {
    const hexNum = Number("0x" + hex)
    const r = hexNum >>> 16
    const g = hexNum >>> 8 & 0xff
    const b = hexNum & 0xff
    return (r+b+g)/3
}

export function toFixed(num: number, places: number = 2) {
    const factor = 10 ** places
    return Math.floor(num * factor) / factor
}

export function dateOnly(date: Date): string {
    return Moment(date).format("yyyy-MM-DD")
}

export function addMonths(date: Date, months: number): Date {
    return new Date(new Date(date).setMonth(date.getMonth() + months))
}