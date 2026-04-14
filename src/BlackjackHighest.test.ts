import { describe, expect, test } from 'vitest'
import { blackjackHighest } from './BlackjackHighest'

describe('BlackjackHighest', () => {
    test('Play cards', () => {
        expect(blackjackHighest(['king', 'ace', 'two'])).toBe('below king')
        expect(blackjackHighest(['queen', 'ace', 'ten'])).toBe('blackjack queen')
        expect(blackjackHighest(['queen', 'ace', 'seven'])).toBe('below queen')
        expect(blackjackHighest(['five', 'six', 'king'])).toBe('blackjack king')
        expect(blackjackHighest(['five', 'eight', 'jack'])).toBe('above jack')
        expect(blackjackHighest(['four', 'four', 'four', 'four', 'four', 'ace'])).toBe('blackjack four')
        expect(blackjackHighest(['three', 'eight', 'queen'])).toBe('blackjack queen')
        expect(blackjackHighest(['four', 'seven', 'ace'])).toBe('below seven')
        expect(blackjackHighest(['jack', 'ace'])).toBe('blackjack ace')
        expect(blackjackHighest(['two', 'three', 'four', 'five', 'six', 'ace'])).toBe('blackjack six')
        expect(blackjackHighest(['ace', 'ace', 'four', 'five'])).toBe('blackjack ace')
    })
})
