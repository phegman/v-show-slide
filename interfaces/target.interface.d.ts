export default interface Target {
    el: HTMLElement;
    duration: number;
    durationInSeconds: string;
    easing: string;
    isAnimating: boolean;
    timeout?: number;
}
