export const enum TokenType {
    /** Обычный текстовый фрагмент */
    Text = 'text',

    /** Ссылка на внешний ресурс */
    Link = 'link',

    /** Эмоджи: 😎 👍 */
    Emoji = 'emoji',

    /** Текстовый эмоджи: :) */
    TextEmoji = 'text_emoji',

    /**
     * Специальный пользовательский стикер с древних времён OK:
     * #u123456789s#
     */
    UserSticker = 'user_sticker',

    /** Упоминание: @user_name */
    Mention = 'mention',

    /** Команда: /command */
    Command = 'command',

    /** Хэштэг: #hashtag */
    HashTag = 'hashtag',

    /** Символ форматирования Markdown */
    Markdown = 'markdown'
}

export const enum TokenFormat {
    /** Жирный текст */
    BOLD = 1 << 0,

    /** Курсивный текст */
    ITALIC = 1 << 1,

    /** Подчёркнутый текст */
    UNDERLINE = 1 << 2,

    /** Перечёркнутый текст */
    STRIKE = 1 << 3,

    /** Моноширинный текст */
    MONOSPACE = 1 << 4,
}

export type Token = TokenText | TokenLink | TokenEmoji | TokenTextEmoji
    | TokenUserSticker | TokenMention | TokenCommand | TokenHashTag | TokenMarkdown;

export interface TokenBase {
    /** Тип токена */
    type: TokenType;

    /** Текстовое содержимое токена */
    value: string;

    /** Текущий формат токена */
    format: TokenFormat;
}

export interface TokenText extends TokenBase {
    type: TokenType.Text;

    /**
     * Признак, указывающий, что при добавлении текста точно на границу текущего
     * и предыдущего токена, текст будет добавлен именно в текущий, а не в
     * предыдущий токен
     */
    sticky: boolean;
}

export interface TokenLink extends TokenBase {
    type: TokenType.Link;
    link: string;
}

export interface TokenEmoji extends TokenBase {
    type: TokenType.Emoji;
}

export interface TokenTextEmoji extends TokenBase {
    type: TokenType.TextEmoji;
    /** Эмоджи-представление токена */
    value: string;
}

export interface TokenUserSticker extends TokenBase {
    type: TokenType.UserSticker;
    /** ID стикера */
    value: string;
}

export interface TokenMention extends TokenBase {
    type: TokenType.Mention;
    /** Значение упоминания */
    value: string;
}

export interface TokenCommand extends TokenBase {
    type: TokenType.Command;
    /** Команда */
    value: string;
}

export interface TokenHashTag extends TokenBase {
    type: TokenType.HashTag;
    /** Значение хэштэга */
    value: string;
}

export interface TokenMarkdown extends TokenBase {
    type: TokenType.Markdown;
    /** Тип формата, к которому относится токен */
    mdType: TokenFormat;
    /** Токен начинает (true) или завершает (false) форматирование */
    start: boolean;
}

/**
 * Объект для обновления формата формата
 */
export interface TokenFormatUpdate {
    /** Типы форматирования, которые надо добавить */
    add?: TokenFormat;
    /** Типы форматирования, которые надо удалить */
    remove?: TokenFormat;
}
