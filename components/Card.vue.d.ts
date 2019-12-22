import { Vue } from 'vue-property-decorator';
export default class CardDefault extends Vue {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly duration: number;
    readonly easing: string;
    readonly initialOpen: boolean;
    open: boolean;
    get directiveArg(): string | number | undefined;
    toggleFeatures(): void;
    slideOpenStart(): void;
    slideOpenEnd(): void;
    slideCloseStart(): void;
    slideCloseEnd(): void;
}
