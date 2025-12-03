class AnimationMemory {
    private views: { [key: string]: number } = {};
    private animations: { [key: string]: string } = {};

    constructor() {
        // Initialize with some settings if needed
    }

    // Track views of animations
    public trackView(animationId: string): void {
        if (this.views[animationId]) {
            this.views[animationId]++;
        } else {
            this.views[animationId] = 1;
        }
    }

    // Check if an animation should be played based on views
    public shouldPlay(animationId: string): boolean {
        return this.views[animationId] <= 3; // Example condition to reduce animations
    }

    // Store animation data
    public addAnimation(animationId: string, animationData: string): void {
        this.animations[animationId] = animationData;
    }

    // Get animation data
    public getAnimation(animationId: string): string | undefined {
        return this.animations[animationId];
    }
}

export default AnimationMemory;