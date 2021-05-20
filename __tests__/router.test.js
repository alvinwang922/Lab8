/**
 * @jest-environment jsdom
 */
import { pushToHistory } from '../scripts/router.js';

describe('test pushToHistory', () => {
    test('test settings case', () => {
        const currState = pushToHistory('settings', 0);
        expect(currState.state.page).toBe('settings');
        expect(currState.length).toBe(history.length);
    });

    test('test entry case', () => {
        const currState = pushToHistory('entry', 5);
        expect(currState.state.page).toBe('entry5');
        expect(currState.length).toBe(history.length);
    });

    test('test default case', () => {
        const currState = pushToHistory('', 0);
        expect(currState.state.page).toBe(undefined);
        expect(currState.length).toBe(history.length);
    });
}); 