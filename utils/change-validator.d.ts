export default class ChangeValidator {
    dto: Record<string, any>;
    data: Record<string, any>;
    private errorsMap;
    private inversePatches;
    private patches;
    constructor(data: any);
    get changes(): {
        path: string;
        op: "replace" | "remove" | "add";
        value?: any;
    }[];
    get errors(): any;
    get isInvalid(): boolean;
    get isValid(): boolean;
    setError(key: string, value: any): void;
    removeError(key: string): void;
    hasError(key: string): boolean;
    removeErrors(): void;
    set(key: any, value: any): void;
    get(key: any): any;
    rollback(): void;
    execute(): void;
    private resetPatches;
}
//# sourceMappingURL=change-validator.d.ts.map