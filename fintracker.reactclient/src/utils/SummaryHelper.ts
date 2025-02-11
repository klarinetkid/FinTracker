import Summary from "../types/Summary"

export function getTotalIn(summaries: Summary[] | undefined): number {
    return !summaries ? 0 :
        summaries.map(s => s.totalIn).reduce((sum, i) => sum + i)
}

export function getTotalOut(summaries: Summary[] | undefined): number {
    return !summaries ? 0 :
        summaries.map(s => s.totalOut).reduce((sum, i) => sum + i)
}