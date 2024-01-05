import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from "./App";
import emojiList from './emojiList.json'

describe('App Test', () => {
    
    beforeEach(() => {
        render(<App />);
    })

    test('Header Test', () => {
        const header = screen.getByText("Emoji Search")
        expect(header).toBeInTheDocument();
    })

    test('Emoji List Render Test', () => {
        const emojiListElement = screen.getByTestId('emoji-list-container');
        expect(emojiListElement).toBeInTheDocument();
        const emojiTitles = emojiList.slice(0, 20).map(emoji => emoji.title);
        emojiTitles.forEach(emojiTitle => {
        const emojiTitleElement = screen.getByText(emojiTitle);
        expect(emojiTitleElement).toBeInTheDocument();
        });
    });

    test('Emoji Filter Render Test', () => {
        const emojiListElement = screen.getByTestId('emoji-list-container');
        expect(emojiListElement).toBeInTheDocument();
        const searchInput = screen.getByTestId('input')
        const value = "Grinning"
        userEvent.type(searchInput, value)
        expect(screen.getByText(value)).toBeInTheDocument();
    })

    test('Copy Emoji Test', () => {
        const emojiTitle = 'Grin';
        const emojiItem = screen.getByText(emojiTitle);
        fireEvent.click(emojiItem);
        const copiedEmojis = screen.getAllByText(/Click to copy emoji/i);
        copiedEmojis.forEach(copiedEmoji => {
        expect(copiedEmoji).toBeInTheDocument();
        });
    })
})

