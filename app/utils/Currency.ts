export class Currency {
    private static readonly LOCALE = 'pt-BR';
    private static readonly CURRENCY = 'BRL';

    static toStripeAmount(amount: number) {
        return amount * 100
    }
    static fromStripeAmount(amount: number) {
        return amount / 100
    }
    static format(amount: number) {
        return new Intl.NumberFormat(Currency.LOCALE, {
            style: "currency",
            currency: Currency.CURRENCY,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    }
    static getCurrencyCode() {
        return "BRL";
    }
}